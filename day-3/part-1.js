// Make sure we got a filename on the command line.
if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' FILENAME');
  process.exit(1);
}
// Read the file and print its contents.
var fs = require('fs')
  , filename = process.argv[2];
fs.readFile(filename, 'utf8', (err, data) => {
  if (err) throw err;
  const numbers = data.trim().split(/\n/).map((line) => {
    const number = eval(`0b${line}`);
    return number;
  });
  // 12 bit numbers
  //console.log(numbers.length, numbers);
  // let pos = 0;
  const gammas = []
  for (let pos = 0; pos < 12; pos++) {
    gammas[pos] = numbers.reduce((acc, val) => {
      const isOne = !(Math.pow(2, pos) & val);
      return acc + (isOne ? 1 : -1);
      console.log(isOne, val);
    }, 0) > 0 ? 1 : 0;
  }
  const gamma = eval(`0b${gammas.reverse().join('')}`);
  const eps = 0b111111111111 ^ gamma;
  console.log(gammas, gamma, eps);

  let solution = gamma * eps;
  console.log(`Solution: ${solution}`)
});
