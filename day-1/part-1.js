console.log('Day 1')
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
  console.log('OK: ' + filename);
  const values = data.trim().split(/\s/).map((n) => parseInt(n, 10));

  let solution = 0;
  let previous;
  values.forEach((value) => {
    if (previous && value > previous) {
      solution += 1;
    }
    previous = value
  })
  console.log(`Solution: ${solution}`)
});
