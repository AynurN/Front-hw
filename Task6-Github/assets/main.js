const gitURl="https://api.github.com/users/";
let  input=document.getElementById("input");
let inputBtn=document.getElementById("inputBtn");
let userData=document.getElementById("userData");
let main=document.getElementById("main");
let follow=document.getElementById("follow");
inputBtn.addEventListener("click", function(e){
  userData.innerHTML="";
  e.preventDefault();
  let inputValue=input.value;
  fetch(gitURl+inputValue)
  .then(response => response.json())
  .then(data => {
        userData.innerHTML+=`
        <div class="card" style="width: 18rem; margin-top:10px" >
        <img src="${data.avatar_url}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${data.name}</h5>
          <p class="card-text">${data.id}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item" id="followers">Followers:${data.followers}</li>
          <li class="list-group-item" id="following">Following:${data.following}</li>
          <li class="list-group-item">Public repos:${data.public_repos}</li>
        </ul>
        <div class="card-body">
          <a href="https://github.com/${inputValue}" class="card-link">Go to profile</a>
          <a href="#" class="card-link">Another link</a>
        </div>
        </div>
        `
        let followers=document.getElementById("followers");
        let following=document.getElementById("following");
        followers.addEventListener("click", function(e){
          main.style.display="none";
          e.preventDefault();
          fetch(gitURl+inputValue+"/followers")
          .then(response=> response.json())
          .then(data=>
            {
              data.forEach(element => {
                follow.innerHTML+=`
                <div   style="display: flex; border-style:solid;">
                <img src="${element.avatar_url}" alt="" style="width: 100px; border-radius: 50%; padding:10px;">
                <div style="margin:30px; margin-left: 60px;">
                    <h4>${element.login}</h4>
                <p>Id: ${element.id} </p>
                <a href="" style="background-color: black; color: white; padding: 10px; border-radius: 20px;">Go to gitHub Profile</a>
                </div>
                
            </div>`
              });
            }
          )
        })
        following.addEventListener("click", function(e){
          main.style.display="none";
          e.preventDefault();
          fetch(gitURl+inputValue+"/following")
          .then(response=> response.json())
          .then(data=>
            {
              data.forEach(element => {
                follow.innerHTML+=`
                <div   style="display: flex; border-style:solid;">
                <img src="" alt="" style="width: 100px; border-radius: 50%;">
                <div style="margin:30px; margin-left: 60px;">
                    <h4></h4>
                <p>Id: </p>
                <a href="" style="background-color: black; color: white; padding: 10px; border-radius: 20px;">Go to gitHub Profile</a>
                </div>
                
            </div>`
              });
            }
          )
        })
        
    });
  })

