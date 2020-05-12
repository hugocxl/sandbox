'use strict'

window.onload = setDate

const secondHand = document.querySelector('.second-hand')
const minsHand = document.querySelector('.min-hand')
const hourHand = document.querySelector('.hour-hand')

function setDate () {
  const now = new Date()
  const seconds = now.getSeconds()
  const mins = now.getMinutes()
  const hours = now.getHours()

  const secondsDegree = (seconds / 60) * 360 + 90
  const minutesDegree = (mins / 60) * 360 + 90
  const hoursDegree = (hours / 60) * 360 + 90

  secondHand.style.transform = `rotate(${secondsDegree}deg)`
  minsHand.style.transform = `rotate(${minutesDegree}deg)`
  hourHand.style.transform = `rotate(${hoursDegree}deg)`
}

setInterval(setDate, 1000)
