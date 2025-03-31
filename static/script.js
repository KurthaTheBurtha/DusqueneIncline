let index = 0;

function moveSlide(direction) {
    const slides = document.querySelector('.carousel-images');
    const totalSlides = slides.children.length;
    
    index = (index + direction + totalSlides) % totalSlides;
    slides.style.transform = `translateX(${-index * 100}%)`;
}

function validate(){
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const zipcode = document.getElementById("zipcode");
    var msg = document.getElementById("validatemsg");
    if (!name.checkValidity() || !email.checkValidity() || !phone.checkValidity() || zipcode.checkValidity()){
        msg.innerHTML = "The form is filled out incorrectly";
    }
}

function getWeatherDescription(code) {
    const weatherMap = {
        0: "Clear sky", 1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast",
        45: "Fog", 48: "Depositing rime fog", 51: "Light drizzle",
        53: "Moderate drizzle", 55: "Dense drizzle", 61: "Slight rain",
        63: "Moderate rain", 65: "Heavy rain", 80: "Slight rain showers",
        81: "Moderate rain showers", 82: "Heavy rain showers", 95: "Thunderstorm"
    };
    return weatherMap[code] || "Unknown Weather";
}


async function getWeather(lat, lon) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&temperature_unit=fahrenheit`;
    const temperature = document.getElementById("temperature");
    const weather = document.getElementById("weather")
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch weather data');
        const data = await response.json();

        temperature.innerHTML = `${data.current_weather.temperature}°F`;
        weather.innerHTML = getWeatherDescription(data.current_weather.weathercode);
        // console.log(`Temperature: ${data.current_weather.temperature}°C`);
        // console.log(`Weather: ${data.current_weather.weathercode}`);
        return data;
    } catch (error) {
        console.error('Error:', error.message);
    }
}

window.onload = function() {
    getWeather(40.4406, -79.9959);
};