const fs = require('fs'), filename = process.argv[2];
fs.readFile(filename, 'utf8', (err, data) => {
  let grid = data.trim()
    .split("\n")
    .map(l => l.split('').map(x => parseInt(x)))
  // console.log(grid.length)
  let solution = 0
  const size = grid.length
  // const size = 3

  let x = 0
  let y = 0

  let lengths = []
  const path = []
  getPaths(x, y, path)

  lengths = lengths.sort()

  console.log('lengths',lengths)

  console.log(`Solution: ${solution}`)

  function getPaths(x, y, length) {
    // End reached
    if (x === size - 1 && y === size - 1) {
      // console.log('end')
      paths.push(path.reduce((a,v) => a + v ,0))
      return;
    }

    path.push(grid[y][x]);

    // right
    if (x < size - 1) {
      getPaths(x + 1, y, path);
    }

    // down
    if (y < size - 1) {
      getPaths(x, y + 1, path);
    }

    // backtrack
    path.pop();
  }


});
