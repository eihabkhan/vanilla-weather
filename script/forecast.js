class Forecast {
    constructor() {
        this.key = "QYDzR2MWUl1fwLXT4TGzTSJLXavfzRqJ";
        this.cityURI = "http://dataservice.accuweather.com/locations/v1/cities/search";
        this.weatherURI = "http://dataservice.accuweather.com/currentconditions/v1/";
    }

    async updateCity(city) {
        const cityDetails = await this.getCity(city);
        const weather = await this.getWeather(cityDetails.Key);
        
        return { cityDetails, weather }
    }

    async getCity(city) {
        const query = `?apikey=${this.key}&q=${city}`

        return fetch (this.cityURI + query)
            .then(res => res.json())
                .then(data => data[0]); 
    }

    async getWeather(id) {
        const query = `${id}?apikey=${this.key}`
    
        return fetch(this.weatherURI + query)
            .then(res => res.json())
                .then(data => data[0])
    }

}

