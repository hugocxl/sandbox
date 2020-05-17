'use strict'

import { CONFIG } from '../config/index.mjs'

export class Ball {
  constructor ({ ctx, canvas, x, y, angle, radius, color, frozen, onCollision, level }) {
    this.canvas = canvas
    this.ctx = ctx
    this.x = x
    this.y = y
    this.radius = radius
    this.angle = angle
    this.color = color
    this.collection = []
    this.frozen = frozen
    this.interval = null
    this.onCollision = onCollision
    this.level = level
  }

  update = () => {
    if (this.frozen) {
      return
    }

    const { x, y, radius, angle, canvas: { width, height } } = this
    const degree = angle * (Math.PI / 180)

    if (x > radius && x < width - radius) {
      this.x = x + Math.cos(degree) * CONFIG.ballSpeed

    } else {
      if (x >= width - radius) {
        const newAngle = this.angle < 90
          ? 180 - this.angle
          : 180 - this.angle + 360

        const newDegree = newAngle * (Math.PI / 180)
        this.x = x - Math.round(Math.cos(newDegree * (Math.PI / 180))) * CONFIG.ballSpeed
        this.angle = newAngle

      } else if (x <= radius) {
        const newAngle = this.angle < 180
          ? 90 - (this.angle - 90)
          : 270 + 270 - this.angle

        this.x = x + Math.round(Math.cos(degree * (Math.PI / 180))) * CONFIG.ballSpeed
        this.angle = newAngle
      }
    }

    if (y > radius && y < height - radius) {
      this.y = y + Math.sin(degree) * CONFIG.ballSpeed

    } else {
      if (y >= (height - radius)) {
        const newAngle = this.angle < 90
          ? 360 - this.angle
          : 180 - this.angle + 180

        const newDegree = newAngle * (Math.PI / 180)
        this.y = y - Math.round(Math.cos(newDegree * (Math.PI / 180))) * CONFIG.ballSpeed
        this.angle = newAngle

      } else if (y <= radius) {
        const newAngle = this.angle < 270
          ? 180 - this.angle - 180
          : 360 - this.angle

        this.y = y + Math.round(Math.cos(degree * (Math.PI / 180))) * CONFIG.ballSpeed
        this.angle = newAngle
      }
    }
  }

  isCollisioningWithCollection = () => {
    if (this.frozen) {
      return
    }

    const collision = (p1x, p1y, r1, p2x, p2y, r2) => {
      const a = r1 + r2
      const x = p1x - p2x
      const y = p1y - p2y

      if (a > Math.sqrt((x * x) + (y * y))) {
        return true
      } else {
        return false
      }
    }

    for (let i = 0; i < this.collection.length; i++) {
      if (collision(this.x, this.y, this.radius, this.collection[i].x, this.collection[i].y, this.collection[i].radius) && this.collection[i].frozen) {
        this.frozen = true

        this.interval = setInterval(() => {
          this.radius = this.radius + CONFIG.ballGrowingRate - Math.sqrt(this.level)
        }, 20)

        setTimeout(() => {
          clearInterval(this.interval)
        }, 500)

        return this.onCollision(this.collection[i])
      }
    }

    return false
  }

  render = () => {
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true)
    this.ctx.closePath()
    this.ctx.strokeStyle = 'black'
    this.ctx.shadowBlur = 3
    this.ctx.shadowOffsetY = 1
    this.ctx.shadowColor = 'rgba(0,0,0,0.2)'
    this.ctx.fillStyle = !this.frozen ? 'white' : this.color
    this.ctx.fill()
  }

}
