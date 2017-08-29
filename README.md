## Specs/Draft

### Components

* Checkers
* Board - 7x6 
* Top level page

### State shape

```
players: [ 
  { name: 'Ahmad' color: 'red' }, 
  { name: 'Mohammad' color: 'yellow ],
currentPlayer: 'Ahmad'
board: [ 
  { circle: [empty | red | yellow] },
  { circle: [empty | red | yellow] },
  { circle: [empty | red | yellow] },
  { circle: [empty | red | yellow] },
  { circle: [empty | red | yellow] },
]
rows: 6
cols: 7
winner: [null | 'Mohammad' | 'Ahmad']
```