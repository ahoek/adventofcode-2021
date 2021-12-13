const fs = require('fs'), filename = process.argv[2];
fs.readFile(filename, 'utf8', (err, data) => {
  const fish = data.trim().split(',').map(n => parseInt(n));

  for (let day = 1; day <= 80; day++) {
    fish.forEach((f,i) => {
      if (f === 0) {
        fish[i] = 6;
        fish.push(8);
      } else {
        fish[i]--
      }
    })
  }
  const solution = fish.length;
  console.log(`Solution: ${solution}`)
});
