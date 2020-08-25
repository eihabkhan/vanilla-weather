const API_KEY = "WTTWzrIOQx3iSkJsX2d1NCYRXdVVcOVi";

const getCity = async (city) => {
    const base = "http://dataservice.accuweather.com/locations/v1/cities/search"
    const query = `?apikey=${API_KEY}&q=${city}`
    const res = await fetch(base + query);
    const data = await res.json();
    return data[0];
}

getCity("Frankfurt")
    .then(data => console.log(data))
        .catch(err => console.log(err));