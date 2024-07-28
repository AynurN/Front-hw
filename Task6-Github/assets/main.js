const gitURl="https://api.github.com/users/";
let  input=document.getElementById("input");
let inputBtn=document.getElementById("inputBtn");
let userData=document.getElementById("userData");
inputBtn.addEventListener("click", function(e){
  e.preventDefault();
  let inputValue=input.value;
  fetch(gitURl+inputValue)
  .then(response => response.json())
  .then(data => {
        userData.innerHTML+=`
        <div class="card" style="width: 18rem;">
        <img src="${data.avatar_url}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${data.name}</h5>
          <p class="card-text">${data.id}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Followers:${data.followers}</li>
          <li class="list-group-item">Following:${data.following}</li>
          <li class="list-group-item">Public repos:${data.public_repos}</li>
        </ul>
        <div class="card-body">
          <a href="https://github.com/${inputValue}" class="card-link">Go to profile</a>
          <a href="#" class="card-link">Another link</a>
        </div>
        </div>
        `
    });
  })

