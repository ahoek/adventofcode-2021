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
  let solution = 0;

  dots = fold(dots, folds[0])
  solution = dots.length
  console.log(`Solution: ${solution}`)

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
