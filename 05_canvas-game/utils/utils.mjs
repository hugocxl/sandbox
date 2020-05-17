'use strict'

import { CONFIG } from '../config/index.mjs'

function createNewBall ({ canvas, level }) {
  let radius = CONFIG.ballMaxSize / Math.random() / level
  const minBallSize = CONFIG.ballMinSize
  const maxBallSize = CONFIG.ballMaxSize - level

  if (radius < minBallSize) {
    radius = minBallSize
  }

  if (radius > (maxBallSize - level * 2)) {
    const calcRadius = maxBallSize - level * 2
    radius = calcRadius > minBallSize ? calcRadius : minBallSize
  }

  let x = Math.round(Math.random() * canvas.width)

  if (x - radius < 0) {
    x = radius
  }

  if (x + radius > canvas.width) {
    x = canvas.width - radius
  }

  let y = Math.round(Math.random() * canvas.height)

  if (y - radius < 0) {
    y = radius
  }

  if (y + radius > canvas.height) {
    y = canvas.height - radius
  }

  const angle = Math.random() * 360

  return {
    x,
    y,
    radius,
    angle,
    color: `#${Math.floor(Math.random() * 16777215).toString(16)}`
  }
}

export const utils = {
  createNewBall
}
