const fs = require('fs'), filename = process.argv[2];
fs.readFile(filename, 'utf8', (err, data) => {
  const grid = data.trim().split("\n").map(l => {
    return l.split('').map(v => parseInt(v))
  })
  const lows = [];
  grid.forEach((line, y) => {
    line.forEach((val, x) => {
      if (isLower(x, y)) {
        lows.push({x,y});
      }
    })
  })

  const valleys = [];
  lows.some((low => {
    let valley = [low]
    let newPoints = []
    let oldLength = 0;
    do {
      newPoints = grow(valley)
      oldLength = valley.length
      valley = uniq([...valley, ...newPoints])
    }
    while (oldLength < valley.length)
    console.log(valley.length)
    valleys.push(valley);
  }))

  const sorted = valleys.sort((a, b) => a.length > b.length ? -1 : 1);
  console.log(sorted[0].length,sorted[1].length,sorted[2].length)

  let solution = sorted[0].length * sorted[1].length * sorted[2].length
  console.log(`Solution: ${solution}`)
  function grow(points) {
    let newPoints = [];
    points.forEach(p => {
      const val = grid[p.y][p.x]
      if (grid[p.y - 1] && grid[p.y - 1][p.x] !== undefined && grid[p.y - 1][p.x] !== 9
        && grid[p.y - 1][p.x] > val) {
        newPoints.push({x: p.x, y: p.y - 1})
      }
      if (grid[p.y + 1] && grid[p.y + 1][p.x] !== undefined && grid[p.y + 1][p.x] !== 9
        && grid[p.y + 1][p.x] > val) {
        newPoints.push({x: p.x, y: p.y + 1})
      }
      if (grid[p.y][p.x - 1] !== undefined && grid[p.y][p.x - 1] !== 9
        && grid[p.y][p.x - 1] > val) {
        newPoints.push({x: p.x - 1, y: p.y})
      }
      if (grid[p.y][p.x + 1] !== undefined && grid[p.y][p.x + 1] !== 9
        && grid[p.y][p.x + 1] > val) {
        newPoints.push({x: p.x + 1, y: p.y})
      }
    })
    return uniq(newPoints)
  }

  function uniq(things) {
    return things.filter((thing, index) => {
      const _thing = JSON.stringify(thing);
      return index === things.findIndex(obj => {
        return JSON.stringify(obj) === _thing;
      });
    });
  }

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

