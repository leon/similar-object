# Similar Object

A utility to compare objects with numeric fields and get back a score of how close they are.

Can then be used together with `.sort()` to get the most similar objects.

Useful for getting related objects that don't match fully.

# Install

```sh
npm install similar-object
# or
yarn add similar-object
```

```ts
import { similarObject } from 'similar-object'

// we are looking at this
const current = { price: 800, rooms: 3, area: 80 }

// which one of these is closest to current?
const unit1 = { price: 1000, rooms: 3, area: 100 }
const unit2 = { price: 1000, rooms: 5, area: 50 }
const unit3 = { price: 1500, rooms: 5, area: 50 }
const units = [unit1, unit2, unit3]

const similarConfig = {
  price: 1, // weight 1
  rooms: 2, // it's more important so we boost the score of rooms by 2
  area: 3, // area is most important, so we boost it by 3
}

units.sort(
  (a, b) => similarObject(current, a, similarConfig) - similarObject(current, b, similarConfig),
)

// units are now sorted according to how similar they are
```
