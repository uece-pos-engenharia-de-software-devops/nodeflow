package com.nodeflow.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.nodeflow.model.NodeEntity;
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

}
