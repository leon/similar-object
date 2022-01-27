import { similarObject } from '../lib'

const score = similarObject(
  { price: 500_000, rooms: 5, area: 2_500 },
  { price: 650_000, rooms: 7, area: 4_000 },
  { price: 1, rooms: 5, area: 3 },
)

console.log(score)
