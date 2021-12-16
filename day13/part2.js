const fs = require('fs'), filename = process.argv[2];
fs.readFile(filename, 'utf8', (err, data) => {
  let lines = data.trim().split("\n")
  let dots = lines
    .filter(l => l.includes(','))
    .map(l => l.split(',').map(x => parseInt(x)))
  const folds = lines
    .filter(l => l.includes('fold'))
    .map(l => {
      const [_, axis, index] = l.match(/fold along (\w)=(\d+)/)
      return { axis, index: parseInt(index)}
    })
  folds.forEach(f => {
    dots = fold(dots, f)
  })
  draw(dots)

  function fold(dots, fold) {
    const a = fold.axis === 'x' ? 0 : 1;
    dots.forEach(d => {
      if (d[a] > fold.index) {
        d[a] = fold.index - (d[a] - fold.index)
      }
    })

    return unique(dots)
  }
});

function unique(arr) {
  return Array.from(new Set(arr.map(JSON.stringify)), JSON.parse)
}

function draw(dots) {
  grid = []
  for (let y = 0; y < 10; y++) {
    grid[y] = []
    for (let x = 0; x < 40; x++) {
      grid[y][x] = dots.find(d => d[0] === x && d[1] === y) ? '#' : ' '
    }
  }
  console.log(grid.map(l => l.join('')).join("\n"))
}
