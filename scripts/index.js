// Write your code!

//DOM Elements
const carouselContainer = document.querySelector('.carousel')
const userInput = document.querySelector('.searchValue')
const navLeft = document.querySelector('.left-btn')
const navRight = document.querySelector('.right-btn')


//Carousel photo index
let currentPhotoIndex = 0;
const decrementPhotoIndex = () => {
  currentPhotoIndex = currentPhotoIndex === 0 ? 9 : currentPhotoIndex - 1
}
const incrementPhotoIndex = () => {
  currentPhotoIndex = currentPhotoIndex === 9 ? 0 : currentPhotoIndex + 1
}
//Carousel photo index auto
const autoSlide = () => {
  setTimeout(() => {
    incrementPhotoIndex()
    renderImage(photos[currentPhotoIndex], 1)
    autoSlide()
  }, 3000)
}

//Fetch data on request
const fetchData = userInput => {
  userInput ? fetchQuery = userInput : fetchQuery = "question"
  fetch(`https://api.unsplash.com/search/photos/?query=${fetchQuery}&client_id=${ACCESS_TOKEN}`)
  .then (res => res.json())
  .then(photosFromServer => {
    photos = photosFromServer.results
    console.log(photos)
    photos.length > 0 ? renderImage(photos[currentPhotoIndex]) : console.log("no data")
  });
}

//FetchData on landing
let fetchQuery = "question"
window.onload = () => {
  fetchData(fetchQuery)
  userInput.focus();
  autoSlide()

}

//Render to DOM
const renderImage = (image, direction) => {
  const img = document.createElement('img')
  img.src = image.urls.regular

  if (direction){
    if (direction  === -1){
      img.className = "left active"
    }
    if (direction === 1){
      img.className = "right active"
    }
  }else{
    img.className = "active"
  }
  const previousImage = document.querySelector("img.active")
  if (previousImage) {
    previousImage.className = direction === 1 ? "move_left" : "move_right"
    setTimeout(() => {
      previousImage.remove()
    }, 500)
  }
  carouselContainer.append(img)
  setTimeout(function () {
    img.style.opacity = 1
  },50)
}

//Event listeners
navLeft.addEventListener("click", () =>{
  decrementPhotoIndex()
  renderImage(photos[currentPhotoIndex], -1)
})
navRight.addEventListener("click", () => {
  incrementPhotoIndex()
  renderImage(photos[currentPhotoIndex], 1)
})


document.addEventListener("keyup", e => {
  if (e.key == 'ArrowLeft'){
    //left arrow
    decrementPhotoIndex()
    renderImage(photos[currentPhotoIndex], -1)
  }else if (e.key == 'ArrowRight'){
    //right arrow
    incrementPhotoIndex()
    renderImage(photos[currentPhotoIndex], 1)
  } else {
    fetchData(userInput.value)
  }
})


//Second API source ..under constructiom
const fetchD = () => {
  fetch(`https://pixabay.com/api/?key=14380349-2fb6191091c3327c31c50d39a&q=yellow+flowers&image_type=photo`)
  .then (res => res.json())
  .then(phFrSr => {
    ph = phFrSr
    console.log("pixabay: " + ph)
  })
}
fetchD()
