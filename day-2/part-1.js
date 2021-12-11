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
  const commands = data.trim().split(/\n/).map((line) => {

    const [c, v] = line.split(' ');
    // console.log(line, comm)
    return { c, v: parseInt(v, 10)};
  });


  let x = 0, y = 0
  commands.forEach((com) => {
    if (com.c === 'forward') {
      x += com.v;
    } else if (com.c === 'up') {
      y += com.v;
    } else if (com.c === 'down') {
      y -= com.v;
    }
    if (x < 30) {
      console.log(com, x, y);
    }
  });

  let solution = x * -1 * y;
  console.log(`Solution: ${solution} (${x} ${y})`)
});
