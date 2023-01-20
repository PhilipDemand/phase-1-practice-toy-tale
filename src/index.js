let addToy = false;
fetchAndRenderToys()

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });


const toyCollectionDiv = document.querySelector("#toy-collection")
function fetchAndRenderToys () {
fetch("http://localhost:3000/toys")
.then(response => response.json())
.then( (someData) => {
  //console.log(someData)
  const arrayOfToyObjects = someData
  toyCollectionDiv.innerHTML = ""
  arrayOfToyObjects.map(  
    
    (eachToyObject)=>{

      const divForToyCard = document.createElement("div")
        divForToyCard.className = "card"
      const h2ForToyCard = document.createElement("h2")
        h2ForToyCard.textContent = eachToyObject.name
      const imageForToyCard = document.createElement("img")
        imageForToyCard.src = eachToyObject.image
        imageForToyCard.className = "toy-avatar"
      const pTagForToyCard = document.createElement("p")
        pTagForToyCard.textContent = `${eachToyObject.likes} likes`
        const buttonForToyCard = document.createElement("button")
        buttonForToyCard.innerText = "Like ❤️"
        buttonForToyCard.className = "like-btn"
        buttonForToyCard.id = eachToyObject.id
        buttonForToyCard.addEventListener( "click", e => {
          eachToyObject.likes += 1
          pTagForToyCard.textContent = `${eachToyObject.likes} likes`
          updateLikes(e)
          //console.log(e.target.id)
          //console.log(eachToyObject.likes)
          // console.log("Increment those likes")

        } )
      
      divForToyCard.append(h2ForToyCard , imageForToyCard , pTagForToyCard , buttonForToyCard)

      toyCollectionDiv.append(divForToyCard)
  } 
)
} )
}

toyFormContainer.addEventListener("submit", function(e) {
  e.preventDefault()
  //console.log(toyFormContainer)
  //console.log(e.target.name.value)
  //console.log(e.target.image.value)
  const submittedObject = {
    name:e.target.name.value, 
    image:e.target.image.value,
    likes:0
  }
  fetch("http://localhost:3000/toys", {
    method: "POST", 
    headers: {
      "Content-Type": "application/json", 
      Accept: "application/json"
    },
    body: JSON.stringify(submittedObject)
  })
  .then(response => response.json())
  .then( () => fetchAndRenderToys())
})

function updateLikes(e) {
  e.preventDefault()
  const updatedLikes = parseInt(e.target.previousElementSibling.innerText)
  fetch(`http://localhost:3000/toys/${e.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": updatedLikes
    })
  })
  .then(response => response.json())
  //.then( (response) => console.log(response))
}
