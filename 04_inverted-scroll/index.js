const cards = document.querySelectorAll('.card')
const container = document.querySelector('#container')
const MARGIN = 50

function updateCardsPosition () {
  const scroll = container.scrollTop
  const cardWidth = cards[0].clientWidth
  const windowWidth = window.innerWidth

  cards.forEach((card, i) => {
    card.style.left = `${i * cardWidth + i * MARGIN - scroll}px`
    card.style.opacity = `${scroll / (cardWidth * i)}`
  })
}

function setContainerHeight () {
  const height = cards[0].clientWidth * (cards.length)

  document.querySelector('#cards-container').style.height = `${height}px`
}

container.addEventListener('scroll', updateCardsPosition)

window.onload = function () {
  updateCardsPosition()
  setContainerHeight()
}
