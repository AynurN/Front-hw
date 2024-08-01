let listURL = "https://api.tvmaze.com/shows";
let items = document.getElementById("items");
let inputs = document.getElementById("inputs");
let inputBtn = document.getElementById("inputBtn");
let genreSelect = document.getElementById("genre");
let paginationContainer = document.getElementById("pagination");
let movies = [];
let genres = [];
let uniqueGenres = [];
let imdb = document.getElementById("imdb");
let currentPage = 1;
const itemsPerPage = 15;

fetch(listURL)
  .then(response => response.json())
  .then(data => {
    data.forEach(element => {
      movies.push(element);
      element.genres.forEach(genre => {
        genres.push(genre);
      });
    });
    uniqueGenres = genres.filter((value, index, array) => array.indexOf(value) === index);
    uniqueGenres.forEach(element => {
      let option = document.createElement("option");
      option.value = element;
      option.innerText = element;
      genreSelect.append(option);
    });
    getMovies(movies, currentPage);
  });

function createCard(movie) {
  return `
    <div class="card" style="width: 18rem;">
      <img class="card-img-top" src="${movie.image.medium}" alt="${movie.name}" style="object-fit: cover;">
      <div class="card-body">
        <h5 class="card-title">${movie.name}</h5>
        <p class="card-text">Premiere: ${movie.premiered}</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">IMDB Rating: ${movie.rating.average}</li>
        <li class="list-group-item">Genre: ${movie.genres}</li>
        <li class="list-group-item">Language: ${movie.language}</li>
      </ul>
      <div class="card-body">
        <a href="${movie.url}" ><button type="button" class="btn btn-primary" style="margin-bottom:5px;">Go to website</button></a>
        <a href="./index-detail.html?id=${movie.id}"><button type="button" class="detail btn btn-success">Go to detail</button></a>
      </div>
    </div>
  `;
}

function getMovies(movies, page) {
  items.innerHTML = "";
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedMovies = movies.slice(startIndex, endIndex);
  paginatedMovies.forEach(movie => {
    items.innerHTML += createCard(movie);
  });
  renderPagination(movies.length, page);
}

function renderPagination(totalItems, currentPage) {
  paginationContainer.innerHTML = "";
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const prevItem = document.createElement('li');
  prevItem.classList.add('page-item');
  prevItem.innerHTML = `<a class="page-link" href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a>`;
  if (currentPage == 1) {
    prevItem.classList.add('disabled');
  } else {
    prevItem.addEventListener('click', function(e) {
      e.preventDefault()
      if (currentPage > 1) {
        currentPage--;
        getMovies(movies, currentPage);
      }
    });
  }
  paginationContainer.appendChild(prevItem);

  for (let i = 1; i <= totalPages; i++) {
    const pageItem = document.createElement('li');
    pageItem.classList.add('page-item');
    if (i === currentPage) {
      pageItem.classList.add('active');
    }
    const pageLink = document.createElement('a');
    pageLink.classList.add('page-link');
    pageLink.href = '#';
    pageLink.innerText = i;
    pageLink.addEventListener('click', () => {
      currentPage = i;
      getMovies(movies, currentPage);
    });
    pageItem.appendChild(pageLink);
    paginationContainer.appendChild(pageItem);
  }

  const nextItem = document.createElement('li');
  nextItem.classList.add('page-item');
  nextItem.innerHTML = `<a class="page-link" href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a>`;
  if (currentPage === totalPages) {
    nextItem.classList.add('disabled');
  } else {
    nextItem.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        getMovies(movies, currentPage);
      }
    });
  }
  paginationContainer.appendChild(nextItem);
}

inputs.addEventListener("input", function(e) {
  let filteredMovies = movies.filter(x => x.name.toLowerCase().includes(inputs.value.toLowerCase()));
  e.preventDefault();
  getMovies(filteredMovies, 1);
});

genre.addEventListener("change", function(e) {
  e.preventDefault();
  if (genre.value == "genres") {
    getMovies(movies, 1);
  } else {
    getMovies(movies.filter(x => x.genres.includes(genre.value)), 1);
  }
});

imdb.addEventListener("change", function(e) {
  e.preventDefault();
  if (imdb.value == "imdbs") {
    getMovies(movies, 1);
  } else {
    const filteredMovies = movies.filter(x => x.rating.average >=parseInt(imdb.value)&& x.rating.average < (parseInt(imdb.value) + 1));
    if (filteredMovies.length == 0) {
      alert("Movies not found!");
    } else {
      getMovies(filteredMovies, 1);
    }
  }
});
