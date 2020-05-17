'use strict'

window.onload = function () {
  setDate()
  setAxis()
}

const secondHand = document.querySelector('.second-hand')
const minsHand = document.querySelector('.min-hand')
const hourHand = document.querySelector('.hour-hand')
const clockFace = document.querySelector('.clock-face')

function setAxis () {
  const numberOfSplits = 12
  const innerPartitions = 5

  for (let i = 0; i < numberOfSplits * innerPartitions; i++) {
    const secondsDegree = (i / 60) * 360 + 90
    const indicator = document.createElement('div')
    indicator.className = 'indicator'
    indicator.style.transform = `rotate(${secondsDegree}deg)`

    if (i % 5 === 0) {
      indicator.style.borderLeft = '14px solid #1b1e23'
    }

    clockFace.appendChild(indicator)
  }

}

function setDate () {
  const now = new Date()
  const seconds = now.getSeconds()
  const mins = now.getMinutes()
  const hours = now.getHours()

  const secondsDegree = (seconds / 60) * 360 + 90
  const minutesDegree = (mins / 60) * 360 + 90
  const hoursDegree = (hours / 24) * 360 + 90

  secondHand.style.transform = `rotate(${secondsDegree}deg)`
  minsHand.style.transform = `rotate(${minutesDegree}deg)`
  hourHand.style.transform = `rotate(${hoursDegree}deg)`
}

setInterval(setDate, 1000)
