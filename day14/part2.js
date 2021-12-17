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
console.log(poly)
  let pairs = {}
  const counts = {}

  const chars = poly.split('')
  chars.forEach((c1, i) => {
    const c2 = chars[i+1];
    if (c2) {
      const pair = `${c1}${c2}`
      pairs[pair] = inc(pairs[pair])
    }
  })

  for (let i=0; i < 40; i++) {
    insert()
  }

  counts.O = 1
  Object.keys(pairs).forEach(p => {
    counts[p[1]] = inc(counts[p[1]], pairs[p])
  })
  console.log(counts)
  const v = Object.values(counts);

  let solution = Math.max(...v) - Math.min(...v);

  console.log(`Solution: ${solution}`)

  function insert() {
    const pairs2 = {}
    Object.keys(pairs).forEach(p => {
      const [c1, c2] = p.split('')
      const ins = rules[p]
      const p1 = c1+ins
      const p2 = ins+c2
      // console.log({p1, p2, ins, p}, pairs[p])
      pairs2[p1] = inc(pairs2[p1], pairs[p])
      pairs2[p2] = inc(pairs2[p2], pairs[p])
    })
    pairs = {...pairs2}
  }

  function inc(value, add=1) {
    return value ? value + add : add
  }
});
