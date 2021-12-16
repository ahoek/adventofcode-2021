const fs = require('fs'), filename = process.argv[2];
fs.readFile(filename, 'utf8', (err, data) => {
  let lines = data.trim().split("\n")
  const dots = lines
    .filter(l => l.includes(','))
    .map(l => l.split(',').map(x => parseInt(x)))
  const folds = lines
    .filter(l => l.includes('fold'))
    .map(l => {
      const [_, axis, index] = l.match(/fold along (\w)=(\d+)/)
      return { axis, index: parseInt(index)}
    })
  console.log(dots, folds)

  let solution = 0;
  console.log(`Solution: ${solution}`)
});
