
//the below code will render the to do list items 
function createElement(item) {
  return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
    <span class="item-text">${item.text}</span>
    <div>
      <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
      <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
    </div>
  </li>`
}

// Initial Page Load Render
let ourHTML = items.map(function (item){
    return createElement(item);
}).join("");

document.getElementById("item-list").insertAdjacentHTML("beforeend", ourHTML);

//Create feature
document.getElementById("create-form").addEventListener("submit",function(e) {
  e.preventDefault();
  let createField = document.getElementById("create-field");
  axios.post('/create-item', {text: createField.value}).then(function(response){
    document.getElementById("item-list").insertAdjacentHTML("beforeend",createElement(response.data));
    createField.value = "";
    createField.focus();
  }).catch(function(){
    console.log("Please try again later.")
  });
});

// Delete Feature
document.addEventListener("click", function(e){
  if (e.target.classList.contains("delete-me")){
    if (confirm("Please reconfirm DELETE")) {
      axios.post('/delete-item', {id: e.target.getAttribute("data-id")}).then(function(){
        e.target.parentElement.parentElement.remove();
      }).catch(function(){
        console.log("Please try again later.")
      })
    }
  }

  //Update feature
  if (e.target.classList.contains("edit-me")) {
    let userInput = prompt("Enter you desired new Text", e.target.parentElement.parentElement.querySelector(".item-text").innerHTML);
    if (userInput) {
      axios.post('/update-item', {text: userInput, id: e.target.getAttribute("data-id")}).then(function(){
        e.target.parentElement.parentElement.querySelector(".item-text").innerHTML = userInput;
      }).catch(function(){
        console.log("Please try again later.")
      })
    }
  }

})
