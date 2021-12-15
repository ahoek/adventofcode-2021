const fs = require('fs'), filename = process.argv[2];
fs.readFile(filename, 'utf8', (err, data) => {
  const lines = data.trim().split("\n").map(l => {
    return l.split('')
  })
  let solution = 0;
  let completions = [];
  const incomplete = lines.filter((line, idx) => {
    const stack = [];
    const validLine = !line.some(token => {
      let isValid;
      let pop;
      switch (token) {
        case '(':
        case '[':
        case '<':
        case '{':
          isValid = true
          pop = undefined
          stack.push(token)
          break;
        case ')':
          pop = stack.pop()
          isValid = pop === '('
          break;
        case ']':
          pop = stack.pop()
          isValid = pop === '['
          break;
        case '>':
          pop = stack.pop()
          isValid = pop === '<'
          break;
        case '}':
          pop = stack.pop()
          isValid = pop === '{'
          break;
      }

      // console.log(stack, isValid, token, idx);

      return !isValid;
    })
    if (validLine) {
      completions.push(stack.reverse());
    }
  })

  let scores = [];
  completions.forEach(c => {
    console.log('---')
    let s = 0;
    c.forEach(t => {
      switch (t) {
        case '(': s = s * 5 + 1; break
        case '[': s = s * 5 + 2; break
        case '{': s = s * 5 + 3; break
        case '<': s = s * 5 + 4; break
      }
      console.log(t,s)
    })
    scores.push(s);
  })

  scores = scores.sort((a,b) => a - b);
  console.log(scores);
  solution = scores[(scores.length-1) / 2]

  console.log(`Solution: ${solution}`)

});

