const fs = require('fs'), filename = process.argv[2];
fs.readFile(filename, 'utf8', (err, data) => {
  const lines = data.trim().split("\n").map(l => {
    const match = l.match(/(\d+),(\d+) -> (\d+),(\d+)/)
    const [_, x0, y0, x1, y1] = match
    return [[parseInt(x0), parseInt(y0)], [parseInt(x1), parseInt(y1)]]
  })

  const grid = [];
  for (let y = 0; y < 1000; y++) {
    grid[y] = []
    for (let x = 0; x < 1000; x++) {
      grid[y][x] = 0
    }
  }

  lines.forEach(l => {
    // length = 1
    if (l[0] == l[1]) {
      grid[ l[0][1] ][ l[0][0] ]++;
    }
    // vertical
    else if (l[0][0] === l[1][0]) {
      const x = l[0][0];
      if (l[0][1] > l[1][1]) {
        l = l.reverse();
      }
      for (let y = l[0][1]; y <= l[1][1]; y++) {
        grid[y][x] += 1;
      }
    }
    // Horizontal
    else if (l[0][1] === l[1][1]) {
      const y = l[0][1];
      if (l[0][0] > l[1][0]) {
        l = l.reverse();
      }
      for (let x = l[0][0]; x <= l[1][0]; x++) {
        grid[y][x] += 1;
      }
    }
  })

  let solution = 0
  for (let x = 0; x < 1000; x++){
    for (let y = 0; y < 1000; y++) {
      if (grid[y][x] >= 2) {
        solution++;
      }
    }
  }


  console.log(`Solution: ${solution}`)
});
