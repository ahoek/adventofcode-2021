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

  let oxy = [...numbers];
  let o;
  for (let pos = 11; pos >= 0; pos--) {
    const common = oxy.reduce((acc, val) => {
      const isOne = !(Math.pow(2, pos) & val);
      return acc + (isOne ? 1 : -1);
    }, 0) > 0 ? 1 : 0;
    oxy = oxy.filter((n) => {
      return common ? (n & 1 << pos) !== 0 : (n & 1 << pos) === 0
    })
    console.log(common, oxy.length)
    if (oxy.length === 1) {
      o = oxy[0];
      console.log('found o')
      break;
    }
  }

  let co2 = [...numbers];
  let c;
  for (let pos = 11; pos >= 0; pos--) {
    const common = co2.reduce((acc, val) => {
      const isOne = !(Math.pow(2, pos) & val);
      return acc + (isOne ? 1 : -1);
    }, 0) > 0 ? 1 : 0;

    co2 = co2.filter((n) => {
      return !common ? (n & 1 << pos) !== 0 : (n & 1 << pos) === 0
    })
    console.log(common, co2.length)
    if (co2.length === 1) {
      c = co2[0];
      break;
    }
  }

  let solution = o * c;
  console.log(`Solution: ${solution} ${o} ${c}`)
});
