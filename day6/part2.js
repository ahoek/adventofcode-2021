const fs = require('fs'), filename = process.argv[2];
fs.readFile(filename, 'utf8', (err, data) => {
  const fish = data.trim().split(',').map(n => parseInt(n));
  const g = Array(9).fill(0);
  fish.forEach(f => {
    g[f]++;
  })

  for (let day = 1; day <= 256; day++) {
    const ng = g.shift();
    g[8] = ng;
    g[6] += ng;
  }
  let solution = 0;
  g.forEach(v => {
    solution += v
  })
  console.log(`Solution: ${solution}`)
});
