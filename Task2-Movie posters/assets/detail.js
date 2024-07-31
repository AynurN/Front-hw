const id=new URLSearchParams(window.location.search).get("id");
let det = document.getElementById("detail");
let items = document.getElementById("items")

fetch("https://api.tvmaze.com/shows/" + id)
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
          <a href="${data.url}" style="margin-right: 5px;"><button type="button" class="btn btn-primary">Go to website</button></a>
         <a href="./index.html"><button type="button" id="back" class=" btn btn-success">Go back</button></a> 
        </div>
      </div>
      </div>
    </div>
  `
})