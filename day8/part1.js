const fs = require('fs'), filename = process.argv[2];
fs.readFile(filename, 'utf8', (err, data) => {
  const lines = data.trim().split("\n").map(l => {
    const [digits, output] = l.split(' | ');
    return {
      digits: digits.split(' ').map(alph),
      output: output.split(' ').map(alph) }
  })
  console.log(lines)

  let easyD = 0;
  lines.forEach(l => {
    l.output.forEach(o => {
      if (easy(o) != undefined) {
        easyD++
      }
    })
  })
  const solution = easyD
  console.log(`Solution: ${solution}`)
});

function alph(v) {
 return v.split('').sort().join('')
}

function easy(v) {
  switch (v.length) {
    case 2:
      return 1;
    case 4:
      return 4;
    case 3:
      return 7;
    case 7:
      return 8;
    default:
      return undefined;
  }
}

/*
  abcdefg
0 1110111
1 0010010
2 1011101
3 1011011
4 0111010
5 1101011
6 1101111
7 1010010
8 1111111
9 1111011

  0:      1:      2:      3:      4:
 aaaa    ....    aaaa    aaaa    ....
b    c  .    c  .    c  .    c  b    c
b    c  .    c  .    c  .    c  b    c
 ....    ....    dddd    dddd    dddd
e    f  .    f  e    .  .    f  .    f
e    f  .    f  e    .  .    f  .    f
 gggg    ....    gggg    gggg    ....

  5:      6:      7:      8:      9:
 aaaa    aaaa    aaaa    aaaa    aaaa
b    .  b    .  .    c  b    c  b    c
b    .  b    .  .    c  b    c  b    c
 dddd    dddd    ....    dddd    dddd
.    f  e    f  .    f  e    f  .    f
.    f  e    f  .    f  e    f  .    f
 gggg    gggg    ....    gggg    gggg
 */
