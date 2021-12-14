const fs = require('fs'), filename = process.argv[2];
fs.readFile(filename, 'utf8', (err, data) => {
  const lines = data.trim().split("\n").map(l => {
    const [digits, output] = l.split(' | ');
    return {
      digits: digits.split(' ').map(alph),
      output: output.split(' ').map(alph) }
  })

  let solution = 0
  lines.some(l => {
    const digits = decode(l.digits);
    let num = '';
    l.output.forEach(out => {
      num = `${num}${digits.indexOf(out)}`;
    })
    solution += parseInt(num, 10);
    return false
  })

  console.log(`Solution: ${solution}`)
});

function decode(codes) {
  const mapping = Array(10).fill()
  codes.forEach((code, i) => {
    if (easy(code)) {
      mapping[easy(code)] = code.split('');
    }
  })
  const cf = mapping[1]
  const bcdf = mapping[4]
  const l5 = codes.filter(c => c.length === 5)
  const l6 = codes.filter(c => c.length === 6)
  l5.forEach(code => {
    const spl = code.split('')
    const d1 = diff(spl, cf)
    const d4 = diff(spl, bcdf)
    if (d1.length === 3) {
      mapping[3] = spl
    } else if (d4.length === 3) {
      mapping[2] = spl
    } else {
      mapping[5] = spl
    }
  })
  l6.forEach(code => {
    const spl = code.split('')
    const d5 = diff(spl, mapping[5])
    const d3 = diff(spl, mapping[3])
    if (d5.length === 2) {
      mapping[0] = spl
    } else if (d3.length === 1) {
      mapping[9] = spl
    } else {
      mapping[6] = spl
    }
  })
  const digits = mapping.map(m => m.join(''));
  return digits;
}

/*
  0:6     1:2     2:5     3:5     4:4
 aaaa    ....    aaaa    aaaa    ....
b    c  .    c  .    c  .    c  b    c
b    c  .    c  .    c  .    c  b    c
 ....    ....    dddd    dddd    dddd
e    f  .    f  e    .  .    f  .    f
e    f  .    f  e    .  .    f  .    f
 gggg    ....    gggg    gggg    ....

  5:5     6:6     7:3     8:7     9:6
 aaaa    aaaa    aaaa    aaaa    aaaa
b    .  b    .  .    c  b    c  b    c
b    .  b    .  .    c  b    c  b    c
 dddd    dddd    ....    dddd    dddd
.    f  e    f  .    f  e    f  .    f
.    f  e    f  .    f  e    f  .    f
 gggg    gggg    ....    gggg    gggg
 */

function diff(arr1, arr2) {
  return arr1.filter(x => !arr2.includes(x));
}

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
