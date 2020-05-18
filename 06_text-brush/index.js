const app = document.querySelector('#app')
const inputs = document.querySelectorAll('.controls input')

let stop = true

window.controls = {
  color: 'black',
  fontSize: 20,
  text: 'text'
}

function addElToDOM(ev) {
  if (stop) return
  
  const text = document.createElement('span')
  text.className = 'text'
  text.style.top = `${ev.clientY}px`
  text.style.left = `${ev.clientX}px`
  text.style.fontSize = `${window.controls.fontSize}px`
  text.style.color = window.controls.color
  text.innerHTML = window.controls.text

  app.appendChild(text)
}

function onKeyDown(ev) {
  if (ev.code === 'Space') {
    stop = !stop
  }
}

function onChangeProperty() {
  window.controls[this.name] = this.value
}

app.addEventListener('click', addElToDOM)
app.addEventListener('mousemove', addElToDOM)
inputs.forEach(input => input.addEventListener('change', onChangeProperty))
// window.addEventListener('keydown', onKeyDown)
// window.addEventListener('keypress', onKeyDown)
window.addEventListener('keyup', onKeyDown)