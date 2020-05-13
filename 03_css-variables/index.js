// querySelectorAll returns a NodeList, a array-type object (NOT an array)
const inputs = document.querySelectorAll('.controls input')

function handleUpdater () {
  // dataset returns and object with all the data-xxx attributes that the element has
  const suffix = this.dataset.sizing || ''

  document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix)
}

function changeThemeMode () {
  const element = document.querySelector('body')
  const style = getComputedStyle(element)

  const darkMode = style.backgroundColor !== 'rgb(255, 255, 255)'
  const background = darkMode ? 'white' : '#1b1e23'
  const color = darkMode ? '#1b1e23' : 'white'

  document.documentElement.style.setProperty('--background', background)
  document.documentElement.style.setProperty('--color', color)
}

// Set listeners
inputs.forEach(input => input.addEventListener('change', handleUpdater))
