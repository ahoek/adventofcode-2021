const fs = require('fs'), filename = process.argv[2];
fs.readFile(filename, 'utf8', (err, data) => {
  let lines = data.trim().split("\n")
  let poly = lines.shift();
  const rules = lines
    .filter(l => l.includes(' -> '))
    .map(r => r.split(' -> '))
    .reduce((acc, r) => {
      acc[r[0]] = r[1]
      return acc
    }, {})

  for (let i=0; i < 10; i++) {
    insert()
  }

  const counts = {}
  for (let i = 0, len = poly.length; i < len; ++i) {
    const ch = poly[i];
    const count = counts[ch];
    counts[ch] = count ? count + 1 : 1;
  }
  const v = Object.values(counts);
  let solution = Math.max(...v) - Math.min(...v);

  console.log(`Solution: ${solution}`)

  function insert() {
    const p = poly.split('')
    let p2 = p[0]
    p.forEach((c1, i) => {
      const c2 = p[i+1];
      if (c2) {
        const pair = `${c1}${c2}`
        p2 = `${p2}${rules[pair]}${c2}`
      }
    })
    poly = p2;
  }
});
