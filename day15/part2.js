const fs = require('fs'), filename = process.argv[2];
fs.readFile(filename, 'utf8', (err, data) => {
  let start = process.hrtime();
  const multi = 5
  const g  = new Graph()
  let e = data.trim()
    .split("\n")
    .map(l => l.split('').map(x => parseInt(x)))

  const size = e.length
  const ts = size*multi
  for (let x = 0; x < size * multi; x++) {
    for (let y = 0; y < size * multi; y++) {
      const v = y*ts + x;
      g.addVertex(v)
    }
  }
  for (let y = 0; y < ts; y++) {
    for (let x = 0; x < ts; x++) {
      const v = y*ts + x;
      const add = Math.floor(x / size) + Math.floor(y / size)
      let risk = e[y%size][x%size] + add;
      if (risk > 9) {
        risk -= 9
      }
      if (x > 0) {
        g.addEdge((x - 1) + y * ts, v, risk) // right
      }
      if (y > 0) {
        g.addEdge(x + (y - 1) * ts, v, risk) // down
      }
      if (x+1 < size*multi) {
        g.addEdge((x + 1) + y * ts, v, risk) // left
      }
      if (y+1 < size*multi) {
        g.addEdge(x + (y + 1) * ts, v, risk) // up
      }
    }
  }
  const { distances } = g.dijkstra(0);
  let solution = Infinity
  solution = distances[ts * ts - 1]
  console.log(`Solution: ${solution} (${process.hrtime(start)[0]+process.hrtime(start)[1] / 1000000000}s)`)
});

class Graph {
  constructor() {
    this.vertices = [];
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    this.vertices.push(vertex);
    this.adjacencyList[vertex] = {};
  }

  addEdge(vertex1, vertex2, weight) {
    this.adjacencyList[vertex1][vertex2] = weight;
  }

  dijkstra(source) {
    let distances = {},
      visited = new Set();
    for (let i = 0; i < this.vertices.length; i++) {
      if (this.vertices[i] === source) {
        distances[source] = 0;
      } else {
        distances[this.vertices[i]] = Infinity;
      }
    }

    let currVertex = this.vertexWithMinDistance(distances, visited);

    while (currVertex !== null) {
      let distance = distances[currVertex],
        neighbors = this.adjacencyList[currVertex];
      for (let neighbor in neighbors) {
        let newDistance = distance + neighbors[neighbor];
        if (distances[neighbor] > newDistance) {
          distances[neighbor] = newDistance;
        }
      }
      visited.add(currVertex);
      currVertex = this.vertexWithMinDistance(distances, visited);
    }
    return { distances }
  }

  vertexWithMinDistance(distances, visited) {
    let minDistance = Infinity,
      minVertex = null;
    for (let vertex in distances) {
      const distance = distances[vertex];
      if (distance < minDistance && !visited.has(vertex)) {
        minDistance = distance;
        minVertex = vertex;
      }
    }
    return minVertex;
  }
}
