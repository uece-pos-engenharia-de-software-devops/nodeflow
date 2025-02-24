package com.nodeflow.controller;

import java.util.List;
import java.util.Optional;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.nodeflow.model.NodeEntity;
import com.nodeflow.model.NodeEntityWithRelationships;
import com.nodeflow.service.NodeService;

@Tag(name = "Nodes", description = "Endpoints para gerenciar nós no Neo4j")
@RestController
@RequestMapping("/api/v1/nodes")
@CrossOrigin("*")
public class NodeController {
    private final NodeService nodeService;

    public NodeController(NodeService nodeService) {
        this.nodeService = nodeService;
    }

    @Operation(summary = "Listar todos os nós", description = "Retorna uma lista de todos os nós armazenados no Neo4j.")
    @ApiResponse(responseCode = "200", description = "Lista de nós retornada com sucesso")
    @GetMapping
    public List<NodeEntity> getAllNodes() {
        return nodeService.getAllNodes();
    }

    @Operation(summary = "Buscar nó por ID", description = "Retorna um nó específico pelo seu ID.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Nó encontrado",
                     content = @Content(schema = @Schema(implementation = NodeEntity.class))),
        @ApiResponse(responseCode = "404", description = "Nó não encontrado")
    })
    @GetMapping("/{id}")
    public ResponseEntity<NodeEntity> getNodeById(@PathVariable Long id) {
        Optional<NodeEntity> node = nodeService.getNodeById(id);
        return node.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @Operation(summary = "Buscar nós por nome", description = "Retorna uma lista de nós que possuem um determinado nome.")
    @ApiResponse(responseCode = "200", description = "Nós retornados com sucesso")
    @GetMapping("/search")
    public List<NodeEntity> getNodesByName(@RequestParam String name) {
        return nodeService.getNodesByName(name);
    }

    @Operation(summary = "Criar um novo nó", description = "Cria e armazena um novo nó no banco de dados.")
    @ApiResponse(responseCode = "201", description = "Nó criado com sucesso")
    @PostMapping
    public NodeEntity createNode(@RequestBody NodeEntity node) {
        return nodeService.saveNode(node);
    }

    @Operation(summary = "Atualizar um nó existente", description = "Atualiza os detalhes de um nó existente pelo seu ID.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Nó atualizado com sucesso"),
        @ApiResponse(responseCode = "404", description = "Nó não encontrado")
    })
    @PutMapping("/{id}")
    public ResponseEntity<NodeEntity> updateNode(@PathVariable Long id, @RequestBody NodeEntity nodeDetails) {
        return ResponseEntity.ok(nodeService.updateNode(id, nodeDetails));
    }

    @Operation(summary = "Deletar um nó", description = "Remove um nó do banco de dados pelo seu ID.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Nó deletado com sucesso"),
        @ApiResponse(responseCode = "404", description = "Nó não encontrado")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNode(@PathVariable Long id) {
        if (nodeService.getNodeById(id).isPresent()) {
            nodeService.deleteNode(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @Operation(summary = "Criar relacionamento entre dois nós", description = "Cria uma conexão entre dois nós no banco de dados.")
    @ApiResponse(responseCode = "200", description = "Relacionamento criado com sucesso")
    @PostMapping("/{fromId}/connect/{toId}")
    public ResponseEntity<Void> createRelationship(@PathVariable Long fromId, @PathVariable Long toId) {
        nodeService.createRelationship(fromId, toId);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Atualizar relacionamento entre dois nós", description = "Atualiza a conexão entre dois nós existentes.")
    @ApiResponse(responseCode = "200", description = "Relacionamento atualizado com sucesso")
    @PutMapping("/{fromId}/update-connect/{toId}")
    public ResponseEntity<Void> updateRelationship(@PathVariable Long fromId, @PathVariable Long toId) {
        nodeService.updateRelationship(fromId, toId);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Remover relacionamento entre dois nós", description = "Exclui uma conexão entre dois nós.")
    @ApiResponse(responseCode = "200", description = "Relacionamento removido com sucesso")
    @DeleteMapping("/{fromId}/disconnect/{toId}")
    public ResponseEntity<Void> removeRelationship(@PathVariable Long fromId, @PathVariable Long toId) {
        nodeService.removeRelationship(fromId, toId);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Listar nós com relacionamentos", description = "Retorna uma lista de nós e seus respectivos relacionamentos.")
    @ApiResponse(responseCode = "200", description = "Lista de nós com relacionamentos retornada com sucesso")
    @GetMapping("/with-relationships")
    public List<NodeEntityWithRelationships> getAllNodesWithRelationships() {
        return nodeService.getAllNodesWithRelationships();
    }

    @Operation(summary = "Criar múltiplos nós e relacionamentos", description = "Cria múltiplos nós e seus relacionamentos de uma vez.")
    @ApiResponse(responseCode = "200", description = "Nós e relacionamentos criados com sucesso")
    @PostMapping("/bulk")
    public ResponseEntity<Void> createNodesWithRelationships(@RequestBody List<NodeEntityWithRelationships> nodesWithRelationships) {
        for (NodeEntityWithRelationships nodeWithRel : nodesWithRelationships) {
            NodeEntity node = nodeWithRel.getNode();
            nodeService.saveNode(node);
            for (Long relatedNodeId : nodeWithRel.getRelatedNodeIds()) {
                nodeService.createRelationship(node.getId(), relatedNodeId);
            }
        }
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Deletar todos os nós", description = "Remove todos os nós e relacionamentos armazenados no banco de dados.")
    @ApiResponse(responseCode = "204", description = "Todos os nós foram deletados com sucesso")
    @DeleteMapping("/deleteall")
    public ResponseEntity<Void> deleteAllNodes() {
        nodeService.deleteAllNodes();
        return ResponseEntity.noContent().build();
    }
}
