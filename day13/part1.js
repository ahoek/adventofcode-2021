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
  // console.log(dots, folds)

  let solution = 0;

  dots = fold(dots, folds[0])
  console.log(dots);
  solution = dots.length
  console.log(`Solution: ${solution}`)

  function fold(dots, fold) {
    console.log(fold)
    const a = fold.axis === 'x' ? 0 : 1;
    dots.forEach(d => {
      if (d[a] > fold.index) {
        console.log ('mirror', d)
        d[a] = fold.index - (d[a] - fold.index)
      }
    })

    return unique(dots)
  }
});

function unique(arr) {
  return Array.from(new Set(arr.map(JSON.stringify)), JSON.parse)
}
