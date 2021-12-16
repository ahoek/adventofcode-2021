const fs = require('fs'), filename = process.argv[2];
fs.readFile(filename, 'utf8', (err, data) => {
  let grid = data.trim().split("\n").map(l => {
    return l.split('').map(x => parseInt(x))
  })
  const s = 10 // grid size
  let solution = 0;

  let flashP = []
  for (let i = 0; i < 3; i++) {
    step()
  }

  console.log(`Solution: ${solution}`)

  function step() {
    flashP = []
    draw()
    increaseOne()
    // console.log('fl')
    // draw()
    flash();
    flashP = [];
    zero()

    function increaseOne() {
      grid.forEach((row,y) => {
        row.forEach((col, x) => {
          row[x] += 1
        })
      })
    }

    function flash() {
      console.log('F', flashP.length)
      flashP.forEach(f => {
        const ns = neighbors(f)
        ns.forEach(n => {
          if (grid[n.y][n.x] < 10) {
            grid[n.y][n.x] += 1
            flashP = flashP.filter(p => p.x !== n.x && p.y !== n.y)
          } else {
            if (!flashP.find(p => p.x === n.x && p.y === n.y)) {
              flashP.push(n)
            }
          }
        })
      })
      console.log(flashP.length)
      if (flashP.length) {
        flash();
      }
    }

    function zero() {
      for (let x = 0; x < s; x++){
        for (let y = 0; y < s; y++) {
          if (grid[y][x] > 9) {
            grid[y][x] = 0
          }
        }
      }
    }

    function neighbors(p) {
      const ns = []
      for (let x = p.x-1; x <= p.x+1; x++){
        for (let y = p.y-1; y <= p.y+1; y++) {
          const n = { x, y }
          if (JSON.stringify(n) != JSON.stringify(p) && inGrid(n)) {
            ns.push(n)
          }
        }
      }
      return ns;
    }

    function inGrid(p) {

      return p.x < s && p.x >= 0 && p.y < s && p.y >= 0
    }

    function draw() {
      console.log(grid.map(c => c.join(' ')).join("\n"), '\n------------')
    }


  }
});

