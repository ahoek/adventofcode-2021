const fs = require('fs'), filename = process.argv[2];
fs.readFile(filename, 'utf8', (err, data) => {
  let e = data.trim()
    .split("\n")
    .map(l => l.split('').map(x => parseInt(x)))
  const size = e.length

  const g  = new Graph()
  // const inGrid = (x, y) => { x > 0}
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      const v = `${y * size + x}`;
      g.addVertex(v)
      if (x > 0) {
        g.addEdge(`${y * size + (x - 1)}`, v, e[y][x]) // right
      }
      if (y > 0) {
        g.addEdge(`${(y - 1) * size + x}`, v, e[y][x]) // down
      }
      // if (x+1 < size) {
      //   g.addEdge(v, `${(y * size) + (x + 1)}`, e[y][x+1]) // left
      // }
      // if (y+1 < size) {
      //   g.addEdge(v, (y + 1) * size + x, e[y+1][x]) // up
      // }
    }
  }

  const { parents, distances } = g.dijkstra('0');
  console.log(parents, distances)
  let solution = Infinity
  solution = distances[`${size * size -1}`]
  console.log(`Solution: ${solution}`)
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

  changeWeight(vertex1, vertex2, weight) {
    this.adjacencyList[vertex1][vertex2] = weight;
  }

  dijkstra(source) {
    let distances = {},
      parents = {},
      visited = new Set();
    for (let i = 0; i < this.vertices.length; i++) {
      if (this.vertices[i] === source) {
        distances[source] = 0;
      } else {
        distances[this.vertices[i]] = Infinity;
      }
      parents[this.vertices[i]] = null;
    }

    let currVertex = this.vertexWithMinDistance(distances, visited);

    while (currVertex !== null) {
      let distance = distances[currVertex],
        neighbors = this.adjacencyList[currVertex];
      for (let neighbor in neighbors) {
        let newDistance = distance + neighbors[neighbor];
        if (distances[neighbor] > newDistance) {
          distances[neighbor] = newDistance;
          parents[neighbor] = currVertex;
        }
      }
      visited.add(currVertex);
      currVertex = this.vertexWithMinDistance(distances, visited);
    }
    return {parents, distances}
  }

  vertexWithMinDistance(distances, visited) {
    let minDistance = Infinity,
      minVertex = null;
    for (let vertex in distances) {
      let distance = distances[vertex];
      if (distance < minDistance && !visited.has(vertex)) {
        minDistance = distance;
        minVertex = vertex;
      }
    }
    return minVertex;
  }
}
