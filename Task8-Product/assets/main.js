const catURL="https://fakestoreapi.com/products/categories"
const proURL="https://fakestoreapi.com/products/category/"
let  categories=document.getElementById("categories");
let  input=document.getElementById("input")
let product=document.getElementById("products")
fetch(catURL)
 .then(response=> response.json())
 .then(data=>
    data.forEach(element => {
        categories.innerHTML+=
        `<option value="${element}"> ${element}</option> `
    })
 );

 categories.addEventListener("change", function(e){
    e.preventDefault();
    product.innerHTML="";
    fetch(proURL+this.value)
    .then(response=> response.json())
    .then(data=>
        data.forEach(element => {
           product.innerHTML+=`
           <div style="display: flex ; margin: 30px; width=900px; height:200px; " >
           <img src="${element.image}" alt="" style="margin:10px;">
           <div class="desc">
               <h3>${element.title}</h3>
               <h3>${element.price}$</h3>
               <p>${element.description}</p>
               <p>Rate:${element.rating.rate}    Count:${element.rating.count}</p>
               
           </div>
       </div>
           `
        })
     )
 })
 input.addEventListener('change', function(e) {
    e.preventDefault();
    product.innerHTML = "";
  
    fetch(proURL + categories.value)
      .then(response => response.json())
      .then(data => {
        data.forEach(element => {
          if (element.title.includes(input.value)) {
            product.innerHTML += `
              <div style="display: flex; margin: 30px; width: 900px; height: 200px;">
                <img src="${element.image}" alt="" style="margin: 10px;">
                <div class="desc">
                  <h3>${element.title}</h3>
                  <h3>${element.price}$</h3>
                  <p>${element.description}</p>
                  <p>Rate: ${element.rating.rate}    Count: ${element.rating.count}</p>
                </div>
              </div>`;
          }
        });
      });
  });