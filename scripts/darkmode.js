function setUserPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    fetchSunsetTime(latitude, longitude);
}

function showError(error) {
    console.error('Error:', error);
}

function fetchSunsetTime(latitude, longitude) {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    const apiUrl = `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&date=${formattedDate}&formatted=0`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'OK') {
                const sunsetTime = new Date(data.results.sunset);
                checkAndEnableDarkMode(sunsetTime);
            } else {
                console.error('Error fetching sunset time:', data);
            }
        })
        .catch(error => console.error('Error fetching sunset time:', error));
}

function checkAndEnableDarkMode(sunsetTime) {
    const currentTime = new Date();
    if (currentTime >= sunsetTime) {
        document.body.classList.add('dark-mode');
    }
}

if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setUserPosition, showError);
} else {
    console.error('Geolocation is not supported by your browser.');
}

