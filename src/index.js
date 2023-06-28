document.addEventListener('DOMContentLoaded', () => {
})
  const dogForm = document.querySelector('form#dog-form')
  const table = document.querySelector('tbody#table-body')
  const desc = document.querySelector('h4.center')
  const state = {
      id: 0,
      path: "create"
  }
  mySound = new sound("/Users/flatironschool/Development/mod3/dog-show-challenge-london-web-career-031119/src/PuppyBark.mp3");
  
  function sound(src) {
      this.sound = document.createElement("audio");
      this.sound.src = src;
      this.sound.setAttribute("preload", "auto");
      this.sound.setAttribute("controls", "none");
      this.sound.style.display = "none";
      document.body.appendChild(this.sound);
      this.play = function () {
          this.sound.play();
      }
      his.stop = function () {
        this.sound.pause();
    }
}

function postItem() {
    dogForm.addEventListener('submit', event => {
        event.preventDefault()
        mySound.play()
        if (state["path"] == "edit") {
            let x = {
                name: dogForm.name.value,
                breed: dogForm.breed.value,
                sex: dogForm.sex.value,
                id: state["id"]
            }
            desc.innerText = "Create New Dog"
            state["path"] = "create"


            updateItem(x).then(() => displayItems())
            dogForm.reset()
        } else {
            let x = {
                name: dogForm.name.value,
                breed: dogForm.breed.value,
                sex: dogForm.sex.value
            }
            createItem(x).then(() => displayItems())
            dogForm.reset()
        }
    })

}


function displayItem(item) {

    //display single item when given object.
    //adds event listener to item
    let tr = document.createElement("tr")
    // div.className = 'card'
    tr.innerHTML = `
    <td>${item.name}</td> 
    <td>${item.breed}</td> 
    <td>${item.sex}</td>
     <td><button class = "edit-btn">Edit</button></td>
     <td><button class = "delete-btn">Delete</button></td>
`
    let editBtn = tr.querySelector('button.edit-btn')
    // let likeText = div.querySelector('p')
    let deleteBtn = tr.querySelector('button.delete-btn')
    editBtn.addEventListener('click', () => {

        desc.innerText = `Edit Existing Dog ${item.id}`
        dogForm.name.value = item.name
        dogForm.breed.value = item.breed
        dogForm.sex.value = item.sex
        state["id"] = item.id
        state["path"] = "edit"
        // likeText.innerText = `${item.likes} Likes`

    })
    deleteBtn.addEventListener('click', () => {
        tr.remove()
        deleteItem(item.id)
    })

    table.append(tr)
}

function displayItems() {
    table.innerHTML = ""
    getItems().then(function (items) {
        items.forEach((x) => {
            displayItem(x)

            // console.log(x)
        })

    })
}

// document.addEventListener('mouseover', event => {


function test() {
    console.log('test')
}

const url = 'http://localhost:3000/dogs'

const getItems = () =>
    fetch(url)
    .then(resp => resp.json())

const createItem = item =>
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    }).then(resp => resp.json())

const updateItem = item =>
    fetch(url + `/${item.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    }).then(resp => resp.json())

const deleteItem = id =>
    fetch(url + `/${id}`, {
        method: 'DELETE'
    }).then(resp => resp.json())

function init() {



    displayItems()
    postItem()
    test()
}

init()
