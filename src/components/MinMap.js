import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import Tree from 'react-tree-graph';

var width = 700;
var height = 500;

const MindMap = ({ getTreeData }) => {
  const d3Container = useRef(null);
  const d3Nodes = useRef(null);
  const d3Links = useRef(null);

  useEffect(() => {
    let nodeData = JSON.stringify({ ...getTreeData }, null, 3);
    if (d3Container.current) {
      drawChart(getTreeData);
    }
  }, [getTreeData]);

  const drawChart = (nodeData) => {
    let root = d3.hierarchy(nodeData);
    // var svg = d3
    //   .select(d3Container.current)
    //   .append("svg")
    //   .attr("width", width)
    //   .attr("height", height);

    var tree = d3.tree().size([400, 400]);
    tree(root);
    console.log(d3Nodes.current)
    //Nodes
    d3.select(d3Nodes.current)
      .selectAll('circle.node')
      .data(root.descendants())
      .enter()
      .append("circle")
      .classed("node", true)
      .attr("cx", function (d) {
        console.log(d);
        return d.x;
      })
      .attr("cy", function (d) {
        return d.y;
      })
      .attr("r", 4);

    // Links
    d3.select(d3Links.current)
      .selectAll('line.link')
      .data(root.links())
      .enter()
      .append("line")
      .classed("link", true)
      .attr("x1", function (d) {
        return d.source.x;
      })
      .attr("y1", function (d) {
        return d.source.y;
      })
      .attr("x2", function (d) {
        return d.target.x;
      })
      .attr("y2", function (d) {
        return d.target.y;
      });
  };

  return (
    <div>
      <svg ref={d3Container}>
        <g transform="translate(5, 5)">
          <g className="links" ref={d3Nodes}></g>
          <g className="nodes" ref={d3Links}></g>
        </g>
      </svg>
    </div>
  );
};

export default MindMap;
