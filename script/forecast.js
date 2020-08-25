const API_KEY = "WTTWzrIOQx3iSkJsX2d1NCYRXdVVcOVi";

// Get city information
const getCity = async (city) => {
    const base = "http://dataservice.accuweather.com/locations/v1/cities/search"
    const query = `?apikey=${API_KEY}&q=${city}`
    
    // const res = await fetch(base + query);
    // const data = await res.json();
    // return data[0]
    
    return fetch (base + query)
        .then(res => res.json())
            .then(data => data[0])  
}

// Get weather information
const getWeather = async (key) => {
    const base = `http://dataservice.accuweather.com/currentconditions/v1/`
    const query = `${key}?apikey=${API_KEY}`

    return fetch(base + query)
        .then(res => res.json())
            .then(data => data)
}

getCity("Frankfurt")
    .then(data => getWeather(data.Key))
        .then(data => console.log(data))
        .catch(err => console.log(err));