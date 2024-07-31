let listURL = "https://api.tvmaze.com/shows";
let items = document.getElementById("items");
let inputs=document.getElementById("inputs")
let inputBtn=document.getElementById("inputBtn")
let genreSelect=document.getElementById("genre")
let movies=[];
let genres=[];
fetch(listURL)
  .then(response => response.json())
  .then(data => {
    data.forEach(element => {
      movies.push(element);
      genres.push(element.genres.filter((value, index, array) => array.indexOf(value) === index))
    })
    genres.forEach(element=>{
      let option=document.createElement("option");
      option.value=element;
      option.innerText=element;
      genreSelect.append(option);
    })
    displayMovies(movies); 
  })
    function displayMovies(movies){
      items.innerHTML = "";
      movies.forEach(
        element => {
          items.innerHTML += `
            <div class="card" style="width: 18rem;">
              <img class="card-img-top" src="${element.image.medium}" alt="under-the-dome" style="object-fit: cover;">
              <div class="card-body">
                <h5 class="card-title">${element.name}</h5>
                <p class="card-text">Premiere: ${element.premiered}</p>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">IMDB Rating: ${element.rating.average}</li>
                <li class="list-group-item">Genre: ${element.genres}</li>
                <li class="list-group-item">Language: ${element.language}</li>
              </ul>
              <div class="card-body">
                <a href="${element.url}" ><button type="button" class="btn btn-primary" style="margin-bottom:5px;">Go to website</button></a>
              <a href="./index-detail.html?id=${element.id}"> <button  type="button" class="detail btn btn-success" >Go to detail</button></a>
              </div>
            </div>
          `
        }
      )
    } 
    
    inputs.addEventListener("input", function(e){
      let filteredMovies=movies.filter(x=>x.name.toLowerCase().includes(inputs.value.toLowerCase()))
  e.preventDefault();
  items.innerHTML="";
     displayMovies(filteredMovies);
    })

 




