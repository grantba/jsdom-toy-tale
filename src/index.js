let addToy = false;
const toyCollection = document.querySelector("#toy-collection")
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
const formSubmit = document.querySelector(".add-toy-form");

document.addEventListener("DOMContentLoaded", () => {

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    // toggle syntax
    addToy = !addToy; 
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(toys => {
    // take the toys array and make HTML with them to attach 
    // them to the DOM
    let toysHTML = toys.map(function(toy) {
      // const div = document.createElement('div');
      // toyCollection.append(div);
      // div.id = "card";
      // const h3 = document.createElement("h3");
      // const h2 = document.createElement('h2');
      // const img = document.createElement('img');
      // const p = document.createElement('p');
      // const button = document.createElement('button');
      // h3.innerText = toy.id;
      // h2.innerText = toy.name;
      // img.src = toy.image;
      // img.class = "toy-avatar";
      // p.innerText = toy.likes + " Likes";
      // button.innerHTML = "Like";
      // div.append(h3);
      // h3.style.display = "none";
      // div.append(h2);
      // div.append(img);
      // div.append(p);
      // div.append(button);
      // could also do (much shorter way):
      return `
      <div class="card">
      <h3 style="display:none">${toy.id}</h3>
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar">
      <p>${toy.likes} Likes</p>
      <button class="like-btn">Like</button>
      <button class="delete-btn">Delete</button>
      </div>
      `
    });
    // .join(" ") removes the commas from in between the cards
    toyCollection.innerHTML = toysHTML.join(" ");
  });

  formSubmit.addEventListener('submit', function(event) {
    event.preventDefault();
    postSubmit(event);
  });

  toyCollection.addEventListener('click', function(event) {
    if (event.target.className === 'like-btn') {
      increaseLikes(event);
    }
    if (event.target.className === 'delete-btn') {
      deleteToy(event);
    }
  });
});

function postSubmit(event) {
  let toyName = event.target.name.value;
  let toyImage = event.target.image.value;

  let formData = {
    name: toyName, 
    image: toyImage,
    likes: 0
  }
  
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };

  fetch("http://localhost:3000/toys", configObj)
  .then(resp => resp.json())
  .then(function(object) {
    // this converts the object from json into html in order
    // to add it to the DOM
    object['likes'] = 0;
    const newToy = `
      <div class="card">
      <h3 style="display:none">${object.id}</h3>;
      <h2>${object.name}</h2>
      <img src=${object.image} class="toy-avatar">
      <p>${object.likes} Likes</p>
      <button class="like-btn">Like</button>
      <button class="delete-btn">Delete</button>
      </div>
      `
    // const div = document.createElement('div');
    // toyCollection.appendChild(div);
    // div.id = "card";
    // const h2 = document.createElement('h2');
    // const img = document.createElement('img');
    // const p = document.createElement('p');
    // const button = document.createElement('button');
    // h2.innerText = object.name;
    // img.src = object.image;
    // img.class = "toy-avatar";
    // object['likes'] = 0;
    // p.innerText = object.likes + " Likes";
    // button.innerHTML = "Like";
    // div.append(h2);
    // div.append(img);
    // div.append(p);
    // div.append(button);
    toyCollection.innerHTML += newToy;
  });
  formSubmit.reset();
};

function increaseLikes(event) {
  let toyId = event.target.parentNode.querySelector('h3').innerText;
  // let toyName = event.target.parentNode.querySelector('h2').innerText;
  // let toyImage = event.target.parentNode.querySelector('img').src;
  const likes = event.target.parentNode.querySelector('p').innerText;
  const newLikes = likes.replace(" Likes", "")
  const int = parseInt(newLikes) + 1;
  const intWithLikes = int + " Likes";
  event.target.parentNode.querySelector('p').innerText = intWithLikes;

  // let formData = {
  //   // id: toyId,
  //   // name: toyName, 
  //   // image: toyImage,
  //   likes: intWithLikes
  // }
  
  // let configObj = {
  //   method: "Patch",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Accept": "application/json"
  //   },
  //   body: JSON.stringify(formData)
  // };
  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": `${int}`
    })
  // .then(resp => resp.json())
  // .then(function(object) {
  //   const updatedToy = `
  //     <div class="card">
  //     <h3 style="display:none">${object.id}</h3>;
  //     <h2>${object.name}</h2>
  //     <img src=${object.image} class="toy-avatar">
  //     <p>${object.likes} Likes</p>
  //     <button class="like-btn">Like</button>
  //     </div>
  //     `
  });
};

function deleteToy(event) {
  let toyId = event.target.parentNode.querySelector('h3').innerText;
  event.target.parentNode.remove()
  // let toyName = event.target.parentNode.querySelector('h2').innerText;
  // let toyImage = event.target.parentNode.querySelector('img').src;
  // const likes = event.target.parentNode.querySelector('p').innerText;
  // const newLikes = likes.replace(" Likes", "")
  // const int = parseInt(newLikes) + 1;
  // const intWithLikes = int + " Likes";
  // event.target.parentNode.querySelector('p').innerText = intWithLikes;

  // let formData = {
  //   // id: toyId,
  //   // name: toyName, 
  //   // image: toyImage,
  //   likes: intWithLikes
  // }
  
  // let configObj = {
  //   method: "Patch",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Accept": "application/json"
  //   },
  //   body: JSON.stringify(formData)
  // };
  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: "DELETE"
    // or you can add it down here instead...
    // .then(resp => {
    //   event.target.parentNode.remove();
    // })
  // .then(resp => resp.json())
  // .then(function(object) {
  //   const updatedToy = `
  //     <div class="card">
  //     <h3 style="display:none">${object.id}</h3>;
  //     <h2>${object.name}</h2>
  //     <img src=${object.image} class="toy-avatar">
  //     <p>${object.likes} Likes</p>
  //     <button class="like-btn">Like</button>
  //     </div>
  //     `
  });
};