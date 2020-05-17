'use strict'

import { Game } from './game.mjs'

window.onload = function () {
  const canvas = document.getElementById('board')
  const ctx = canvas.getContext('2d')

  function setCanvasDimensions () {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  function setGameListeners () {
    window.addEventListener('resize', setCanvasDimensions)

    document.getElementById('button-start').addEventListener('click', ev => {
      ev.stopPropagation()
      game.start()
      document.getElementById('modal-start').classList.toggle('hidden')
      document.getElementById('modal-container').classList.toggle('hidden')
    })

    document.getElementById('button-reset').addEventListener('click', ev => {
      ev.stopPropagation()
      game.start()
      document.getElementById('modal-reset').classList.toggle('hidden')
      document.getElementById('modal-container').classList.toggle('hidden')
    })

    document.getElementById('button-next').addEventListener('click', ev => {
      ev.stopPropagation()
      game.level++
      game.start()
      document.getElementById('modal-next').classList.toggle('hidden')
      document.getElementById('modal-container').classList.toggle('hidden')
    })
  }

  setCanvasDimensions()
  setGameListeners()

  const game = new Game({
    canvas,
    ctx,
  })
}
