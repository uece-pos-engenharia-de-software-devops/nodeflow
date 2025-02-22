package com.nodeflow.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.nodeflow.model.NodeEntity;
import com.nodeflow.model.NodeEntityWithRelationships;
import com.nodeflow.repository.NodeRepository;

@Service
public class NodeService {
    private final NodeRepository nodeRepository;

    public NodeService(NodeRepository nodeRepository) {
        this.nodeRepository = nodeRepository;
    }

    public List<NodeEntity> getAllNodes() {
        return nodeRepository.findAll();
    }

    public Optional<NodeEntity> getNodeById(Long id) {
        return nodeRepository.findById(id);
    }

    public List<NodeEntity> getNodesByName(String name) {
        return nodeRepository.findByName(name);
    }

    public NodeEntity saveNode(NodeEntity node) {
        return nodeRepository.save(node);
    }

    public void deleteNode(Long id) {
        nodeRepository.deleteById(id);
    }

    public List<NodeEntity> getConnectedNodes(Long id) {
        return nodeRepository.findConnectedNodes(id);
    }

    public void createRelationship(Long fromId, Long toId) {
        nodeRepository.createRelationship(fromId, toId);
    }

    public void updateRelationship(Long fromId, Long toId) {
        nodeRepository.updateRelationship(fromId, toId);
    }

    public void removeRelationship(Long fromId, Long toId) {
        nodeRepository.removeRelationship(fromId, toId);
    }
    
    public void deleteAllNodes() {
        nodeRepository.deleteAll();
    }
    
    public List<NodeEntityWithRelationships> getAllNodesWithRelationships() {
        List<NodeEntity> nodes = nodeRepository.findAll();
        List<NodeEntityWithRelationships> nodesWithRelationships = new ArrayList<>();

        for (NodeEntity node : nodes) {
            List<Long> relatedNodeIds = nodeRepository.findRelatedNodesIds(node.getId());
            nodesWithRelationships.add(new NodeEntityWithRelationships(node, relatedNodeIds));
        }

        return nodesWithRelationships;
    }
    
    public NodeEntity updateNode(Long id, NodeEntity nodeDetails) {
        return nodeRepository.findById(id).map(existingNode -> {
            existingNode.setName(nodeDetails.getName());
            existingNode.setType(nodeDetails.getType());
            existingNode.setX(nodeDetails.getX()); // Atualiza X
            existingNode.setY(nodeDetails.getY()); // Atualiza Y
            return nodeRepository.save(existingNode);
        }).orElseThrow(() -> new RuntimeException("Nó não encontrado"));
    }


}
