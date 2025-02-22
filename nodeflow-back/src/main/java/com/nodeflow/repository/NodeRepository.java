package com.nodeflow.repository;


import java.util.List;
import java.util.Optional;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

import com.nodeflow.model.NodeEntity;

public interface NodeRepository extends Neo4jRepository<NodeEntity, Long> {

    // Buscar nó pelo ID
    Optional<NodeEntity> findById(Long id);

    // Buscar nós por nome
    List<NodeEntity> findByName(String name);

    // Criar/Atualizar nó (método save já cuida disso)

    // Excluir nó
    void deleteById(Long id);

    // Buscar nós conectados a um nó específico
    @Query("MATCH (n:NodeEntity)-[:CONNECTED_TO]->(m) WHERE id(n) = $id RETURN m")
    List<NodeEntity> findConnectedNodes(Long id);

    // Criar um relacionamento entre dois nós
    @Query("MATCH (a:NodeEntity), (b:NodeEntity) WHERE id(a) = $fromId AND id(b) = $toId CREATE (a)-[:CONNECTED_TO]->(b)")
    void createRelationship(Long fromId, Long toId);

    // Atualizar um relacionamento entre dois nós
    @Query("MATCH (a:NodeEntity)-[r:CONNECTED_TO]->(b:NodeEntity) WHERE id(a) = $fromId AND id(b) = $toId DELETE r CREATE (a)-[:CONNECTED_TO]->(b)")
    void updateRelationship(Long fromId, Long toId);

    // Remover um relacionamento entre dois nós
    @Query("MATCH (a:NodeEntity)-[r:CONNECTED_TO]->(b:NodeEntity) WHERE id(a) = $fromId AND id(b) = $toId DELETE r")
    void removeRelationship(Long fromId, Long toId);
}
    