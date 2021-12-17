const fs = require('fs'), filename = process.argv[2];
fs.readFile(filename, 'utf8', (err, data) => {
  let grid = data.trim()
    .split("\n")
    .map(l => l.split('').map(x => parseInt(x)))
  // console.log(grid.length)
  // let solution = 0
  const size = grid.length
  // const size = 40

  let x = 0
  let y = 0

  const length = 0
  let solution = Infinity
  getPaths(x, y, length)

  console.log(`Solution: ${solution}`)

  function getPaths(x, y, length) {
    // console.log({x,y})
    // End reached
    if (x === size - 1 && y === size - 1) {
      if (length < solution) {
        console.log(length)
        solution = length
      }
      return;
    }

    length += grid[y][x]
    if (length >= solution) {
      // console.log(length)
      return;
    }

    // right
    if ((x + 1) < size && y < size) {
      getPaths(x + 1, y, length)
    }

    // down
    if (x < size &&  (y + 1) < size) {
      getPaths(x, y + 1, length)
    }
  }
});
