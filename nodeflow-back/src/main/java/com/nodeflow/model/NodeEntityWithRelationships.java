package com.nodeflow.model;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NodeEntityWithRelationships {
    private NodeEntity node;
    private List<Long> relatedNodeIds;

}
