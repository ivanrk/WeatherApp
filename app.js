function search() {
    const searchBtn = document.querySelector('input#search');

    searchBtn.addEventListener('click', () => {
        const city = document.querySelector('input#city').value;
        const api = `http://api.weatherapi.com/v1/current.json?key=f971ee304b6f47578ed152303201108&q=${city}`;
        const temperature = document.querySelector('.temperature');
        const description = document.querySelector('.description');
        const currentLocation = document.querySelector('h1.location');
        const icon = document.querySelector('.icon');

        fetch(api)
            .then(response => response.json())
            .then(data => {
                const { location, current } = data;
                currentLocation.textContent = `${location.name}, ${location.country}`;
                description.textContent = current.condition.text;
                temperature.textContent = Math.round(current.temp_c) + '°C';
                icon.src = current.condition.icon;
            })
            .catch(() => showAlert());
    });
}

function showAlert() {
    let div = document.createElement('div');
    div.className = 'alert alert-danger';
    div.innerHTML = 'Invalid city!';

    const weather = document.querySelector('div.weather');
    const h1 = document.querySelector('h1.location');
    weather.insertBefore(div, h1);

    setTimeout(() => document.querySelector('.alert').remove(), 3000);
}