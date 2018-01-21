// ====== Hook JS up to DOM UI ======
const $factDiv = document.querySelector('#fact')  // <div> to add display: block once fetch data received
const $factText = document.querySelector('#factText')  // <p> to fill with received data
const $numInput = document.querySelector('#numInput')  // <input> that holds number

const cors = 'https://cors-anywhere.herokuapp.com/'  // this is necessary to use http api on GitHub Pages
const url = 'http://numbersapi.com/'

// react to UI change
$numInput.addEventListener('input', getFactFetch)


// ====== AJAX ======
function getFactAjax() {
  let number = $numInput.value  // get number from

  let xhr = new XMLHttpRequest()
  xhr.open('GET', url + number)

  // onload is what we want to happen after we get the request
  xhr.onload = function() {
    // there's a number? and response success?
    if (number != '') {
      if (this.status === 200) {
        $factDiv.style.display = 'block'
        $factText.innerText = this.responseText
      }
    }
  }
  xhr.send()
}


// ====== Fetch ======
function getFactFetch() {
  let number = $numInput.value  // retrieve UI state

  if (number != '') {  // if there's a number
    fetch(cors + url + number)
      .then(response => response.text())  // if working with json data (response => response.json())
      .then(data => {
          $factDiv.style.display = 'block'
          $factText.innerText = data
      })
      .catch(err => console.log(err))
  }
  else {
    $factDiv.style.display = 'none'
  }
}
