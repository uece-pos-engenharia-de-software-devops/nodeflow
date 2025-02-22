package com.nodeflow.model;

import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Node
@Data
@NoArgsConstructor
@AllArgsConstructor
public class NodeEntity {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String type;
    private double x;
    private double y;
}
