const fs = require('fs'), filename = process.argv[2];
fs.readFile(filename, 'utf8', (err, data) => {
  const crabs = data.trim().split(',').map(n => parseInt(n));
  // const total = crabs.reduce((acc, val) => acc += val, 0)
  // console.log(crabs, total)
  const m = median(crabs)
  let solution = 0;
  crabs.forEach(c => {
    solution += Math.abs(c - m)
  })
  console.log(`Solution: ${solution}`)
});

function median(arr) {
  let concat = arr;
  concat = concat.sort((a, b) => a - b);
  let length = concat.length;
  return (length % 2 === 1)
    ? concat[(length / 2) - .5]
    : (concat[length / 2] + concat[(length / 2) - 1]) / 2;
}
