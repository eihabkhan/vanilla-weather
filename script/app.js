const form = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details")
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

const updateUI = (data) => {

    const {cityDetails, weather} = data;
    
    // Update Details Section
    details.innerHTML = `
        <h5 class="my-3">${cityDetails.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    // Update time of day image & weather condition icon
    let timeSource = weather.IsDayTime ? "img/day.svg" : "img/night.svg";
    time.setAttribute("src", timeSource);

    const iconSource = `img/icons/${weather.WeatherIcon}.svg`
    icon.setAttribute("src", iconSource)

    // Unhide the forecast card 
    if (card.classList.contains("d-none")) {
        card.classList.remove("d-none")
    }
}

const updateCity = async (city) => {
    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);
    return { cityDetails, weather }
}

form.addEventListener("submit", e => {
    e.preventDefault();
    
    const city = form.city.value.trim();
    form.reset();
    
    updateCity(city)
        .then(data => updateUI(data))
            .catch(err => console.log(err))

    // Set localStorage
    localStorage.setItem("city", city); 
});

if (localStorage.getItem("city")) {
    updateCity(localStorage.getItem("city"))
        .then(data => updateUI(data))
            .catch(err => console.log(err));
}