const fs = require('fs'), filename = process.argv[2];
fs.readFile(filename, 'utf8', (err, data) => {
  const grid = data.trim().split("\n").map(l => {
    return l.split('').map(v => parseInt(v))
  })
  let solution = 0
  grid.forEach((line, y) => {
    line.forEach((val, x) => {
      if (isLower(x, y)) {
        const risk = val + 1;
        solution += risk;
      }
    })
  })

  console.log(`Solution: ${solution}`)

  function isLower(x, y) {
    const sur = [
      grid[y-1] ? grid[y-1][x] : 10,
      grid[y+1] ? grid[y+1][x] : 10,
      grid[y][x-1],
      grid[y][x+1],
    ].map(v => v === undefined ? 10 : v)
    return (Math.min(...sur) > grid[y][x])
  }
});

