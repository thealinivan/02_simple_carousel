const API_ENDPOINT = `https://api.unsplash.com/photos/?client_id=${API_KEYS.access}`

const carouselEl = document.querySelector('.carousel')
const buttonLeftEl = document.querySelector('.btn_left')
const buttonRightEl = document.querySelector('.btn_right')

let images = []
let activeImageIndex = 0

const getImagesFromAPI = () => {
  return fetch(API_ENDPOINT).then(res => res.json())
}

const loadImages = () => {
  return getImagesFromAPI().then(imagesFromAPI => (images = imagesFromAPI))
}

const createImageEl = src => {
  const img = document.createElement('img')
  img.src = src
  return img
}

const displayActiveImage = direction => {
  const img = createImageEl(images[activeImageIndex].urls.regular)
  img.className = `active ${direction === -1 ? 'left' : 'right'}`
  carouselEl.append(img)
}

const removeActiveImageAfterDelay = direction => {
  const img = document.querySelector('img.active')
  img.className = direction === -1 ? 'move_right' : 'move_left'
  setTimeout(() => img.remove(), 500)
}

loadImages().then(displayActiveImage)

buttonLeftEl.addEventListener('click', () => {
  activeImageIndex =
    activeImageIndex === 0 ? images.length - 1 : activeImageIndex - 1
  removeActiveImageAfterDelay(-1)
  displayActiveImage(-1)
})

buttonRightEl.addEventListener('click', () => {
  activeImageIndex =
    activeImageIndex === images.length - 1 ? 0 : activeImageIndex + 1
  removeActiveImageAfterDelay(1)
  displayActiveImage(1)
})
