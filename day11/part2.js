const fs = require('fs'), filename = process.argv[2];
fs.readFile(filename, 'utf8', (err, data) => {
  let grid = data.trim().split("\n").map(l => {
    return l.split('').map(x => parseInt(x))
  })
  const size = 10 // grid size
  let solution = 0;

  let flashP = []
  for (let i = 0; i < 2000; i++) {
    const stop = step()
    if (stop) {
      break;
    }
  }

  console.log(`Solution: ${solution}`)

  function step() {
    solution++
    flashP = []

    increaseOne()
    flashAll();
    flashP = [];
    const stop = zero()
    //draw()
    return stop;

    function increaseOne() {
      grid.forEach((row) => {
        row.forEach((col, x) => {
          row[x] += 1
        })
      })
    }

    function flashAll() {
      for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
          if (grid[y][x] > 9) {
            if (!flashP.find(p => p.x === x && p.y === y)) {
              flashP.push({x,y})
            }
          }
        }
      }
      flashP.forEach(o => {
        flashOne(o)
      })
    }

    function flashOne(o) {
      const ns = neighbors(o)
      ns.forEach(n => {
        if (grid[n.y][n.x] !== 0) { // already flashed
            grid[n.y][n.x] += 1
          if (grid[n.y][n.x] === 10) {
            flashOne(n)
          }
        }
      })
    }

    function zero() {
      let count = 0;
      for (let x = 0; x < size; x++){
        for (let y = 0; y < size; y++) {
          if (grid[y][x] > 9) {
            count++;
            grid[y][x] = 0
          }
        }
      }
      console.log(count)
      return count === 100
    }

    function neighbors(p) {
      const ns = []
      for (let x = (p.x-1); x <= (p.x+1); x++){
        for (let y = (p.y-1); y <= (p.y+1); y++) {
          const n = { x, y }
          if (!(x === p.x && y === p.y) && inGrid(n)) {
            ns.push(n)
          }
        }
      }
      return ns;
    }

    function inGrid(p) {
      return p.x < size && p.x >= 0 && p.y < size && p.y >= 0
    }

    function draw() {
      console.log(grid.map(c => c.join(' ')).join("\n"), '\n------------')
    }
  }
});
