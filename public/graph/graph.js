
// GRAPH GENERATION

var graph = {};

// Generates a complete graph kn
function generateCompleteGraph(n) {
    // Number of vertices = n
    graph.vCount = n;

    // Number of edges (from Handshake Lemma)
    graph.eCount = (1/2) * n * (n - 1);

    // Generate vertices
    graph.nodes = [];
    for (var i = 0; i < n; i++) {
        graph.nodes.push({"id": i})
    }

    // Generate edges
    graph.links = [];
    // Using Cartesian Product due to laziness
    // it works, but generates a lot of useless "parallel edges".
    // A better solution would be to generate C(n, 2) combinations.
    for (var u = 0; u < n; u++) {
        for (var v = 0; v < n; v++) {
            if (u != v) {
                graph.links.push({"target": u, "source": v})
            }
        }
    }
}

// Start with kn = 1
generateCompleteGraph(1);


// VIEW
// Based on Bostock's "Modifying a Force Layout II": https://bl.ocks.org/mbostock/0adcc447925ffae87975a3a81628a196

var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    color = d3.scaleOrdinal(d3.schemeCategory10);

// Label
var text = svg.append("text")
              .style("cursor", "pointer")
              .attr("x", 50)
              .attr("y", height-40)
              .attr("font-family", "sans-serif")
              .attr("font-size", "35px")
              .text("Kn = " + graph.vCount)

var simulation = d3.forceSimulation(graph.nodes)
    .force("charge", d3.forceManyBody().strength(-50))
    .force("link", d3.forceLink(graph.links).distance(200))
    .force("x", d3.forceX())
    .force("y", d3.forceY())
    //.alphaTarget(1)
    .on("tick", ticked);

var g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")"),
    link = g.append("g").attr("stroke", "#000").attr("stroke-width", 1.5).selectAll(".link"),
    node = g.append("g").attr("stroke", "#fff").attr("stroke-width", 1.5).selectAll(".node");

restart();

function restart() {

  // Update text label
  d3.select("text").text("Kn = " + graph.vCount);

  // Apply the general update pattern to the nodes.
  node = node.data(graph.nodes, function(d) { return d.id;});

  node.exit().transition()
      .attr("r", 0)
      .remove();

  node = node.enter().append("circle")
      .attr("fill", function(d) { return color(d.id); })
      .call(function(node) { node.transition().attr("r", 8); })
    .merge(node);

  // Apply the general update pattern to the links.
  link = link.data(graph.links, function(d) { return d.source.id + "-" + d.target.id; });

  // Keep the exiting links connected to the moving remaining nodes.
  link.exit().transition()
      .attr("stroke-opacity", 0)
      .attrTween("x1", function(d) { return function() { return d.source.x; }; })
      .attrTween("x2", function(d) { return function() { return d.target.x; }; })
      .attrTween("y1", function(d) { return function() { return d.source.y; }; })
      .attrTween("y2", function(d) { return function() { return d.target.y; }; })
      .remove();

  link = link.enter().append("line")
      .call(function(link) { link.transition().attr("stroke-opacity", 1); })
    .merge(link);

  // Make nodes draggable
  d3.selectAll("circle")
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

  // Update and restart the simulation.
  simulation.nodes(graph.nodes);
  simulation.force("link").links(graph.links);
  simulation.alpha(1).restart();
}

function ticked() {
  node.attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })

  link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });
}

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}

// When text label is clicked, increment (kn -> k(n+1))
d3.select("text").on("click", incrementGraph);
function incrementGraph() {

    // Generate new graph
    generateCompleteGraph(graph.vCount+1);

    // Update view
    restart();

}