let html = "";
let inputFieldElement = document.getElementById("inputField");
let searchbuttonElement = document.getElementById("searchButton")
const getWeatherData = ((location = "Sangrur") => {
    let apiResponse = fetch(`https://api.weatherapi.com/v1/forecast.json?key=09e7a1b8b2844ba990b110125243108&q=${location}&days=7&aqi=yes&alerts=no`);
    console.log(apiResponse)
    apiResponse.then((response) => {
        return response.json()
    })
        .then((json) => {
            console.log(json)

            html = `<div class=" min-h-screen flex bg-gray-500 border border-blue-700 justify-center">
        <div class="shadow-xl rounded-xl p-10 w-full max-w-lg bg-gray-700 text-center">
            <h1 class="text-white">📍${json.location.region},  ${json.location.country}</h1>
            <h1 class="font-bold text-4xl text-white mt-2">${json.location.name}</h1>
            <h1 class="font-bold text-6xl text-white mt-4">${json.current.temp_c}</h1>
            <h1 class="text-gray-300 mt-2">Feels like: ${json.current.feelslike_c}&deg;c</h1>
            <div class="flex justify-center gap-4 text-white mt-2">
                <h1>sunrise:🌅 ${json.forecast.forecastday[0].astro.sunrise}</h1>
                <h1>sunset: 🌇 ${json.forecast.forecastday[0].astro.sunset}</h1>
            </div>
            <div class="shadow-xl rounded-xl p-10 w-full max-w-lg bg-gray-500 mt-6">
                <p class="text-white mb-4">${json.current.condition.text}</p>
                <hr>
                <div class="flex flex-row gap-4 text-white overflow-auto">
                    ${json.forecast.forecastday[0].hour.map((data) => {
                let time = new Date(data.time)
                let currentTime = new Date()
                const options = {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                };
                const formattedTime = time.toLocaleTimeString('en-US', options)
                console.log(time.getHours(), currentTime.getHours());
                if (time.getHours() >= currentTime.getHours()) {
                    return `<div>
                        <h1>${formattedTime}</h1>
                        <img src="${data.condition.icon}"/>
                        <h1>${data.temp_c}</h1>
                    </div>`
                }

            }).join("")}
                    
                </div>
                <div class="shadow-xl rounded-xl p-10 w-full max-w-lg bg-gray-300 mt-6">
                    <h1 class="text-left">📅3-Day Forcast</h1>
                    <hr>
                    <div>
                        ${json.forecast.forecastday.map((data) => {
                console.log(data);
                return `<div class="flex flex-row gap-4 mt-2">
                                <h1>${data.date}</h1>
                                <img src="${data.day.condition.icon}"/>
                                <h1>${data.day.maxtemp_c}</h1>
                                <progress></progress>
                                <h1>${data.day.mintemp_c}</h1>
                    </div>`
            }).join("")} 
                       
                    </div>
                </div>
            </div>
        </div>
    </div>`
            let contentElement = document.getElementById("content");
            contentElement.innerHTML = html;
        })
});
searchbuttonElement.addEventListener("click", () => {
    console.log(inputFieldElement.value);
    getWeatherData(inputFieldElement.value);
});
getWeatherData();

