let cnv;
let wdth = 800;
let hght = 800;

let verticesP;
let edgesP;

let resetBtn;

const NODE_RADIUS = 16;
const MIN_DISTANCE_BTWN_NODES = 12;

let vertices = [];
let edges = [];

let firstVertex;
let secondVertex;

let first = true;

function setup() {

  cnv = createCanvas(wdth, hght);
  cnv.mousePressed(canvasPressed);

  verticesP = createP("Order (vertices): 0");
  edgesP = createP("Size (edges): 0");

  resetBtn = createButton("Reset");
  resetBtn.mousePressed(resetGraph);
}

function draw() {

  background(200);

  strokeWeight(2.5);
  stroke(0);
  for (let edge of edges) {

    // if cycle then draw differently
    if (edge[0] == edge[1]) {

      noFill();
      ellipse(vertices[edge[0]][0], vertices[edge[0]][1] - 15, 15, 20);
    } else {

      line(vertices[edge[0]][0], vertices[edge[0]][1], vertices[edge[1]][0], vertices[edge[1]][1]);
    }
  }

  if (!first) {

    strokeWeight(3);
    stroke(0);

    line(firstVertex[0], firstVertex[1], mouseX, mouseY);
  }

  fill(255);
  strokeWeight(2);
  stroke(0);
  for (let vertex of vertices) {

    ellipse(vertex[0], vertex[1], NODE_RADIUS);
  }

  verticesP.html("Order (vertices): " + vertices.length);
  edgesP.html("Size (edges): " + edges.length);
}

function createEdge(vertex1, vertex2) {

  let edge = [];
  let i = 0;
  for (let vertex of vertices) {

    if ((vertex1[0] == vertex[0]) && (vertex1[1] == vertex[1])) {
      edge.push(i);
    }
    if ((vertex2[0] == vertex[0]) && (vertex2[1] == vertex[1])) {
      edge.push(i);
    }
    i++;
  }

  // if edge already exist -> dont create one more
  let alreadyExists = false;
  for (let currEdge of edges) {

    if (((edge[0] == currEdge[0]) && (edge[1] == currEdge[1]))
        || ((edge[0] == currEdge[1]) && (edge[1] == currEdge[0]))) {

      alreadyExists = true;
      break;
    }
  }

  !alreadyExists ? edges.push(edge) : "";
}

function canvasPressed() {

  // if not in another vertex, create one
  let found = false;
  let foundVertex;
  for (let vertex of vertices) {

    let dx = abs(mouseX - vertex[0]);
    let dy = abs(mouseY - vertex[1]);

    let d = sqrt(dx*dx + dy*dy);

    if (d <= NODE_RADIUS + MIN_DISTANCE_BTWN_NODES) {
      found = true;
      foundVertex = vertex;
      break;
    }
  }

  if (!found && first) {

    let vertex = [];
    vertex.push(mouseX);
    vertex.push(mouseY);
    vertices.push(vertex);

    return;
  }

  if (!found && !first) {

    let vertex = [];
    vertex.push(mouseX);
    vertex.push(mouseY);
    vertices.push(vertex);

    secondVertex = vertex;

    createEdge(firstVertex, secondVertex);

    first = true;
    return;
  }

  if (found && first) {

    firstVertex = foundVertex;

    first = false;
    return;
  }

  if (found && !first) {

    secondVertex = foundVertex;

    createEdge(firstVertex, secondVertex);

    first = true;
  }
}

function resetGraph() {

  vertices = [];
  edges = [];
}


/* TODO:
    ability to delete edges/vertices
    upload to github
*/
