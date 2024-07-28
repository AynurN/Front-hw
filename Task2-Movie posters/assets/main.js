let listURL = "https://api.tvmaze.com/shows";
let items = document.getElementById("items");
let det = document.getElementById("detail");

fetch(listURL)
  .then(response => response.json())
  .then(data => {
    data.forEach(element => {
      items.innerHTML += `
        <div class="card" style="width: 18rem;">
          <img class="card-img-top" src="${element.image.medium}" alt="under-the-dome" style="object-fit: cover;">
          <div class="card-body">
            <h5 class="card-title">${element.name}</h5>
            <p class="card-text">Premiere: ${element.premiered}</p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">IMDB Rating: ${element.rating.average}</li>
            <li class="list-group-item">Genre: ${element.genres[0]}</li>
            <li class="list-group-item">Language: ${element.language}</li>
          </ul>
          <div class="card-body">
            <a href="${element.officialSite}" ><button type="button" class="btn btn-primary" style="margin-bottom:5px;">Go to website</button></a>
            <button type="button" class="detail btn btn-success" id="${element.id}">Go to detail</button>
          </div>
        </div>
      `
    })

    let sBTn = document.getElementsByClassName("detail");
    Array.from(sBTn).forEach(btn => {
      btn.addEventListener("click", function(e) {
        e.preventDefault();
        items.style.display= "none";
        let showId = this.id;

        fetch("https://api.tvmaze.com/shows/" + showId)
          .then(response => response.json())
          .then(data => {
            det.innerHTML = `
              <div class="detail" style="display: flex; justify-content-center; padding:20px ">
              <div  style="display: flex;">
                <img src="${data.image.original}" alt="" style="width: 40%; height:60%">
                <div class="desc" style="margin-left:20px; padding-right:370px">
                  <h1 style="margin-block: 10px;">${data.name}</h1>
                  <p style="margin-bottom: 10px;">${data.summary}</p>
                  <p><span style="font-weight: bold;">IMDB Point: ${data.rating.average}</span></p>
                  <p><span style="font-weight: bold;">Language: ${data.language}</span></p>
                  <p><span style="font-weight: bold;">Genre: ${data.genres}</span></p>
                  <p><span style="font-weight: bold;">Premiere: ${data.premiered}</span></p>
                  <p><span style="font-weight: bold;">Ended: ${data.ended}</span></p>
                  <div class="buttons" style="display: flex;">
                    <a href="${data.officialSite}" style="margin-right: 5px;"><button type="button" class="btn btn-primary">Go to website</button></a>
                    <button type="button" id="back" class=" btn btn-success">Go back</button>
                  </div>
                </div>
                </div>
              </div>
            `
            let backBtn= document.getElementById("back");
            backBtn.addEventListener("click", function(e){
                e.preventDefault();
                det.innerHTML="";
                items.style.display="flex";
            })
          })
      })
    })

 
  })



