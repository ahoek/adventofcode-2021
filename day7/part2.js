const fs = require('fs'), filename = process.argv[2];
fs.readFile(filename, 'utf8', (err, data) => {

  function costs(steps) {
    return steps * (steps + 1) / 2
  }

  let crabs = data.trim().split(',').map(n => parseInt(n));
  const cost = [];
  for (let pos = 0; pos < 2000; pos++) {
    cost[pos] = crabs.reduce((acc, val) => acc + costs(Math.abs(val - pos)), 0);
  }

  const sor = cost.sort((a, b) => a - b)
  console.log(sor)
  let solution = sor[0];
  console.log(`Solution: ${solution}`)
});


// 0 0
// 1 1
// 2 1+2 = 3
// 3 1+2+3 = 6
// 4 1+2+3+4 = 10
// 5 = 15
// 6 = 21
