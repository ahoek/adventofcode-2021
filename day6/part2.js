const fs = require('fs'), filename = process.argv[2];
fs.readFile(filename, 'utf8', (err, data) => {
  let fish = data.trim().split(',').join('');
  for (let day = 1; day <= 150; day++) {
    console.log(day)
    let ng = '';
    let n = 0;
    for (let i = 0; i < fish.length; i++) {
      const f = fish[i];
      if (f === '0') {
        ng = `${ng}6`;
        n++;
      } else {
        ng = `${ng}${parseInt(f) - 1}`;
      }
    }

    fish = `${ng}${'8'.repeat(n)}`;
  }
  const solution = fish.length;
  console.log(`Solution: ${solution}`)
});
