const keys = document.querySelectorAll('.key')

function removeTransition (e) {
  if (e.propertyName !== 'transform') {
    return
  }

  this.classList.remove('playing')
}

function playSound (e) {
  e.stopPropagation()
  e.preventDefault()
  let code = null

  if (e.type === 'keydown') {
    code = e.keyCode
  } else {
    code = e.currentTarget.getAttribute('data-key')
  }

  const audio = document.querySelector(`audio[data-key="${code}"]`)
  const key = document.querySelector(`div[data-key="${code}"]`)

  if (!audio) {
    return
  }

  key.classList.add('playing')
  audio.currentTime = 0
  audio.play()
}

window.addEventListener('keydown', playSound)
keys.forEach(key => {
  key.addEventListener('transitionend', removeTransition)
  key.addEventListener('click', playSound)
  key.addEventListener('touchstart', playSound)
})
