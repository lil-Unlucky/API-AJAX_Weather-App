const app = document.querySelector('.weather-app');
if(app != null) {
    const searchButton = document.querySelector('.search-btn');

    const generalBlockInfo = document.querySelector('.weather-app__bottom-general-info');
    const hourlyBlockInfo = document.querySelector('.weather-app__bottom-hourly-info');

    searchButton.addEventListener('click', () => {
        const APIkey = 'c24259219e1cc33ab49ef34605eac7cd';
        const searchInput = document.querySelector('input[name="searchInput"').value;

        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${searchInput}&units=metric&appid=${APIkey}`)
        .then(response => response.json())
        .then(data => {
            // Current weather info
            const desc = data.weather[0].description;
            const temp = data.main.temp;
            const wind = data.wind.speed;
            const humidity = data.main.humidity;

            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
            generalBlockInfo.innerHTML = '';

            const generalInfo = `
            <div class="general-info">
                <div class="general-info__weather-ico"><img src='${iconUrl}'></div>
                <div class="general-info__weather-desc">${desc}</div>
                <div class="general-info__weather-temp">${temp} <i class="ri-celsius-line"></i></div>
                <div class="general-info__weather-wind-speed">${wind} <i class="ri-windy-line"></i></div>
                <div class="general-info__weather-humidity">${humidity} <i class="ri-water-percent-line"></i></div>
            </div>
            `;

            generalBlockInfo.innerHTML = generalInfo;
        })
        .catch(error => console.error(error));

        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchInput}&appid=${APIkey}`)
        .then(response => response.json())
        .then(data => {
            // Hourly weather info
            hourlyForecast(data.list);
        })
        .catch(error => console.error(error));
    });

    async function hourlyForecast(hourlyData) {
        hourlyBlockInfo.innerHTML = '';
        const next24Hours = hourlyData.slice(0, 3);
        next24Hours.forEach(item => {
            const dateTime = new Date(item.dt * 1000);
            const hour = dateTime.getHours();
            const icon24Code = item.weather[0].icon;
            const icon24Url = `https://openweathermap.org/img/wn/${icon24Code}.png`;
            const desc = item.weather[0].description;
            const temp = Math.round(item.main.temp - 273.15);
            const wind = item.wind.speed;
    
    
            const houlryInfo = `
            <div class="hourly-item">
                <div class="hourly-item__time">${hour}:00</div>
                <div class="hourly-item__icon"><img src='${icon24Url}'></div>
                <div class="hourly-item__desc">${desc}</div>
                <div class="hourly-item__temp">${temp} <i class="ri-celsius-line"></i></div>
                <div class="hourly-item__wind">${wind} <i class="ri-windy-line"></i></div>
            </div>
            `;
    
            hourlyBlockInfo.innerHTML += houlryInfo;
        });
    }
}