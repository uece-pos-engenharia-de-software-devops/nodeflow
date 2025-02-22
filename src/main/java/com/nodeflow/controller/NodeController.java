package com.nodeflow.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nodeflow.model.NodeEntity;
import com.nodeflow.model.NodeEntityWithRelationships;
import com.nodeflow.service.NodeService;

@RestController
@RequestMapping("/api/nodes")
@CrossOrigin("*")
public class NodeController {
    private final NodeService nodeService;

    public NodeController(NodeService nodeService) {
        this.nodeService = nodeService;
    }

    @GetMapping
    public List<NodeEntity> getAllNodes() {
        return nodeService.getAllNodes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<NodeEntity> getNodeById(@PathVariable Long id) {
        Optional<NodeEntity> node = nodeService.getNodeById(id);
        return node.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public List<NodeEntity> getNodesByName(@RequestParam String name) {
        return nodeService.getNodesByName(name);
    }

    @PostMapping
    public NodeEntity createNode(@RequestBody NodeEntity node) {
        return nodeService.saveNode(node);
    }

    @PutMapping("/{id}")
    public ResponseEntity<NodeEntity> updateNode(@PathVariable Long id, @RequestBody NodeEntity nodeDetails) {
        return nodeService.getNodeById(id).map(existingNode -> {
            existingNode.setName(nodeDetails.getName());
            existingNode.setType(nodeDetails.getType());
            NodeEntity updatedNode = nodeService.saveNode(existingNode);
            return ResponseEntity.ok(updatedNode);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNode(@PathVariable Long id) {
        if (nodeService.getNodeById(id).isPresent()) {
            nodeService.deleteNode(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/{fromId}/connect/{toId}")
    public ResponseEntity<Void> createRelationship(@PathVariable Long fromId, @PathVariable Long toId) {
        nodeService.createRelationship(fromId, toId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{fromId}/update-connect/{toId}")
    public ResponseEntity<Void> updateRelationship(@PathVariable Long fromId, @PathVariable Long toId) {
        nodeService.updateRelationship(fromId, toId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{fromId}/disconnect/{toId}")
    public ResponseEntity<Void> removeRelationship(@PathVariable Long fromId, @PathVariable Long toId) {
        nodeService.removeRelationship(fromId, toId);
        return ResponseEntity.ok().build();
    }
    
    @PostMapping("/bulk")
    public ResponseEntity<Void> createNodesWithRelationships(@RequestBody List<NodeEntityWithRelationships> nodesWithRelationships) {
        for (NodeEntityWithRelationships nodeWithRel : nodesWithRelationships) {
            NodeEntity node = nodeWithRel.getNode();
            // Criação do node
            nodeService.saveNode(node);

            // Criação dos relacionamentos
            for (Long relatedNodeId : nodeWithRel.getRelatedNodeIds()) {
                nodeService.createRelationship(node.getId(), relatedNodeId);
            }
        }
        return ResponseEntity.ok().build();
    }
    
    @DeleteMapping("/deleteall")
    public ResponseEntity<Void> deleteAllNodes() {
        nodeService.deleteAllNodes();
        return ResponseEntity.noContent().build();
    }


}
