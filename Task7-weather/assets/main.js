const cityURL="https://geocoding-api.open-meteo.com/v1/search?name=";
let  input=document.getElementById("input");
let inputBtn=document.getElementById("inputBtn");
let userData=document.getElementById("userData");
 inputBtn.addEventListener("click", function(e){
    e.preventDefault();
    let inputValue=input.value;
    fetch(cityURL + inputValue)
    .then(response => response.json())
    .then(data => {
            const city = data.results[0];
            const nameOfCity = city.name;
            const lat = city.latitude;
            const longitude = city.longitude;

            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${longitude}&current_weather=true&timezone=Europe/London`)
                .then(response => response.json())
                .then(data2 => {
                    userData.innerHTML += `
                        <div class="card" style="width: 18rem; margin-top:15px;">
                            <div class="card-body">
                                <h5 class="card-title">${nameOfCity}</h5>
                                <p class="card-text">Weather</p>
                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">Temperature: ${data2.current_weather.temperature}°C</li>
                                <li class="list-group-item">Windspeed: ${data2.current_weather.windspeed} m/s</li>
                                <li class="list-group-item">Wind direction: ${data2.current_weather.winddirection}°</li>
                            </ul>
                        </div>`;
                })
            
        
    })
   

 })