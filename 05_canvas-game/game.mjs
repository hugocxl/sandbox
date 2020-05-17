'use strict'

import { CONFIG } from './config/index.mjs'
import { Ball, Board } from './models/index.mjs'
import { utils } from './utils/utils.mjs'

export class Game {
  constructor ({ ctx, canvas }) {
    this.ctx = ctx
    this.canvas = canvas
    this.gameInterval = null
    this.balls = []
    this.level = CONFIG.initialLevel
    this.levelTimeout = null
    this.score = 0
    this.levelScore = 0
    this.impactedBalls = 0
    this.mouse = { x: 0, y: 0 }
    this.board = new Board({ ctx, canvas })
  }

  getMouse = ev => {
    const rect = this.canvas.getBoundingClientRect()
    return {
      x: ev.clientX - rect.x,
      y: ev.clientY - rect.y,
    }
  }

  setListeners = () => {
    document.getElementById('board').addEventListener('click', this.onClickOnCanvas)
    document.getElementById('board').addEventListener('mousemove', ev => {
      this.mouse = this.getMouse(ev)
    })
  }

  setLevel = () => {
    const balls = []

    for (let i = 0; i < this.level * CONFIG.ballsInRound; i++) {
      balls.push(new Ball({
        canvas: this.canvas,
        ctx: this.ctx,
        level: this.level,
        onCollision: this.onBallCollision,
        ...utils.createNewBall({
          canvas: this.canvas,
          level: this.level
        })
      }))
    }

    this.balls = balls
  }

  onClickOnCanvas = ev => {
    const { x, y } = this.getMouse(ev)
    this.balls = [
      ...this.balls,
      new Ball({
        ...utils.createNewBall({
          canvas: this.canvas
        }),
        canvas: this.canvas,
        ctx: this.ctx,
        x,
        y,
        radius: 20,
        frozen: true,
        color: 'greenyellow'
      })
    ]

    document.getElementById('board').removeEventListener('click', this.onClickOnCanvas)
    this.levelTimeout = setTimeout(this.stop, CONFIG.levelTimeout)
  }

  onBallCollision = ball => {
    clearTimeout(this.levelTimeout)
    this.levelScore += Math.round((1 / ball.radius) * 1000)
    this.impactedBalls++
    this.levelTimeout = setTimeout(this.stop, CONFIG.levelTimeout)
    this.updateGamePanel()
  }

  updateGamePanel = () => {
    document.getElementById('panel-level').innerHTML = this.level
    document.getElementById('panel-score').innerHTML = `${this.score + this.levelScore}`
    document.getElementById('panel-balls').innerHTML = `${this.impactedBalls} / ${CONFIG.ballToCompletePerLevel * this.level}`
  }

  update = () => {
    this.balls.forEach((ball, i) => {
      ball.update()
      ball.isCollisioningWithCollection()
      ball.collection = this.balls.filter((el, index) => index !== i)
    })
  }

  renderCleanUp = () => {
    const { height, width } = this.canvas
    this.ctx.clearRect(0, 0, width, height)
  }

  render = () => {
    this.board.render()
    this.balls.forEach(ball => {
      ball.render()
    })

    // Mouse
    if (!this.levelTimeout) {
      this.ctx.beginPath()
      this.ctx.arc(this.mouse.x, this.mouse.y, 20, 0, Math.PI * 2, true)
      this.ctx.lineWidth = 1
      this.ctx.strokeStyle = 'white'
      this.ctx.stroke()
      this.ctx.closePath()
    }

  }

  stop = () => {
    clearInterval(this.gameInterval)
    document.getElementById('modal-container').classList.toggle('hidden')

    if (this.impactedBalls >= CONFIG.ballToCompletePerLevel * this.level) {
      document.getElementById('modal-next').classList.toggle('hidden')
      this.score += this.levelScore
    } else {
      document.getElementById('modal-reset').classList.toggle('hidden')
    }

    this.impactedBalls = 0
    this.levelScore = 0
    this.levelTimeout = null
    this.gameInterval = null
  }

  start = () => {
    this.updateGamePanel()
    this.setListeners()
    this.setLevel()

    this.gameInterval = window.setInterval(() => {
      this.renderCleanUp()
      this.update()
      this.render()
    }, CONFIG.gameUpdateInterval)
  }
}
