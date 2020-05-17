'use strict'

export class Board {
  constructor ({ ctx, canvas }) {
    this.ctx = ctx
    this.canvas = canvas
  }

  render = () => {
    this.ctx.beginPath()
    this.ctx.moveTo(0, this.canvas.height / 2)
    this.ctx.lineTo(this.canvas.width, this.canvas.height / 2)
    this.ctx.moveTo(this.canvas.width / 2, 0)
    this.ctx.lineTo(this.canvas.width / 2, this.canvas.height)
    this.ctx.lineWidth = 1
    this.ctx.strokeStyle = 'rgba(255,255,255,0.25)'
    this.ctx.stroke()
    this.ctx.closePath()
  }
}
