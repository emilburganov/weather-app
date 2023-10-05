import store from './store.js';

const container = document.querySelector('.container');

const fetchData = async () => {
    const params = new URLSearchParams({
        q: store.weather.city,
    });

    try {
        const response = await fetch(store.url + params, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '5461afdf44msh9bcaa596ef396aap1b962bjsn23d69d633302',
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        });
        const data = await response.json();

        const {
            current: {
                cloud: cloudcover,
                temp_c: temperature,
                humidity,
                pressure_mb: pressure,
                vis_km: visibility,
                uv: uvIndex,
                last_updated: time,
                is_day: isDay,
                condition: description,
                wind_kph: windSpeed,
            },
            location: {name},
        } = data;

        store.weather = {
            ...store.weather,
            city: name,
            isDay,
            temperature,
            time,
            description: description,
            properties: {
                cloudcover: {
                    title: 'Cloud',
                    value: `${cloudcover} %`,
                    icon: '<svg width="30" height="30" viewBox="0 0 512 512"><g><path d="M421 406H91c-24.05 0-46.794-9.327-64.042-26.264C9.574 362.667 0 340.031 0 316s9.574-46.667 26.958-63.736c13.614-13.368 30.652-21.995 49.054-25.038A62.257 62.257 0 0 1 76 226c0-66.168 53.832-120 120-120 24.538 0 48.119 7.387 68.194 21.363 14.132 9.838 25.865 22.443 34.587 37.043C312.86 155.673 329.099 151 346 151c44.886 0 82.202 33.026 88.921 76.056 18.811 2.88 36.244 11.581 50.122 25.208C502.426 269.333 512 291.968 512 316s-9.574 46.667-26.957 63.736C467.794 396.673 445.05 406 421 406zM91 256c-33.636 0-61 26.916-61 60s27.364 60 61 60h330c33.636 0 61-26.916 61-60s-27.364-60-61-60h-15v-15c0-33.084-26.916-60-60-60-15.766 0-30.68 6.12-41.995 17.233l-16.146 15.858-8.315-21.049C265.855 158.391 233.062 136 196 136c-49.626 0-90 40.374-90 90 0 3.544.556 7.349 1.144 11.378L109.831 256z" fill="#1e1e1e"></path></g></svg>',
                },
                humidity: {
                    title: 'Humidity',
                    value: `${humidity} %`,
                    icon: '<svg width="30" height="30" viewBox="0 0 32 32"><g><path d="M29 18.76a2.183 2.183 0 0 1-1.578-.661 4.183 4.183 0 0 0-5.651 0l-.041.032C20.264 12.424 13.117 2.823 12.8 2.4a1.036 1.036 0 0 0-1.6 0C10.258 3.66 2 14.845 2 20a10 10 0 0 0 15.557 8.315 1 1 0 0 0-1.113-1.662A8 8 0 0 1 4 20c0-3.437 5.192-11.39 8-15.3 1.939 2.716 6.8 9.818 7.813 14.025a2.4 2.4 0 0 1-1.191-.624 4.178 4.178 0 0 0-5.648 0 2.178 2.178 0 0 1-1.573.66 1 1 0 0 0 0 2 4.079 4.079 0 0 0 2.823-1.1 2.206 2.206 0 0 1 3.148 0 4.182 4.182 0 0 0 5.65 0 2.213 2.213 0 0 1 3.155 0A4.089 4.089 0 0 0 29 20.76a1 1 0 0 0 0-2z" fill="#1e1e1e"></path><path d="M29 22.88a2.183 2.183 0 0 1-1.578-.661 4.183 4.183 0 0 0-5.651 0 2.209 2.209 0 0 1-3.152 0 4.178 4.178 0 0 0-5.648 0 2.178 2.178 0 0 1-1.573.66 1 1 0 0 0 0 2 4.079 4.079 0 0 0 2.823-1.1 2.206 2.206 0 0 1 3.148 0 4.182 4.182 0 0 0 5.65 0 2.213 2.213 0 0 1 3.155 0A4.089 4.089 0 0 0 29 24.88a1 1 0 0 0 0-2zM25.5 15a4.5 4.5 0 0 0 4.5-4.5c0-2.163-3.087-6.3-3.706-7.108a1.037 1.037 0 0 0-1.588 0C24.087 4.2 21 8.337 21 10.5a4.5 4.5 0 0 0 4.5 4.5zm0-9.3c1.216 1.734 2.5 3.9 2.5 4.8a2.5 2.5 0 0 1-5 0c0-.9 1.284-3.066 2.5-4.8z" fill="#1e1e1e"></path></g></svg>',
                },
                windSpeed: {
                    title: 'Wind',
                    value: `${windSpeed} km/h`,
                    icon: '<svg width="30" height="30" viewBox="0 0 682.667 682.667"><g><defs><clipPath><path d="M0 512h512V0H0Z" fill="#1e1e1e" ></path></clipPath></defs><g clip-path="url(#a)" transform="matrix(1.33333 0 0 -1.33333 0 682.667)"><path d="M0 0c11.288 11.288 26.882 18.269 44.106 18.269 34.449 0 62.375-27.926 62.375-62.375s-27.926-62.375-62.375-62.375h-295.439" style="stroke-width:30;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1" transform="translate(390.519 389.27)" fill="none" stroke="#1e1e1e" stroke-width="30" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-dasharray="none"></path><path d="M0 0c11.288-11.288 26.882-18.269 44.106-18.269 34.449 0 62.375 27.926 62.375 62.375s-27.926 62.375-62.375 62.375h-215.488" style="stroke-width:30;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1" transform="translate(186.381 108.263)" fill="none" stroke="#1e1e1e" stroke-width="30" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-dasharray="none"></path><path d="M0 0c7.592-7.592 18.08-12.288 29.665-12.288 23.17 0 41.953 18.783 41.953 41.953S52.835 71.618 29.665 71.618h-74.804" style="stroke-width:30;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1" transform="translate(388.341 143.126)" fill="none" stroke="#1e1e1e" stroke-width="30" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-dasharray="none"></path><path d="M0 0h248.372" style="stroke-width:30;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1" transform="translate(15 350.835)" fill="#1e1e1e" stroke="#1e1e1e" stroke-width="30" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-dasharray="none"></path><path d="M0 0h136.085" style="stroke-width:30;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1" transform="translate(183.488 422.007)" fill="#1e1e1e" stroke="#1e1e1e" stroke-width="30" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-dasharray="none"></path><path d="M0 0h-17.861" style="stroke-width:30;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1" transform="translate(79.186 282.79)" fill="none" stroke="#1e1e1e" stroke-width="30" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-dasharray="none"></path></g></g></svg>',
                },
                pressure: {
                    title: 'Pressure',
                    value: `${pressure} hPa`,
                    icon: '<svg width="30" height="30" viewBox="0 0 24 24"><g><path d="M12 1.25C6.07 1.25 1.25 6.07 1.25 12S6.07 22.75 12 22.75 22.75 17.93 22.75 12 17.93 1.25 12 1.25zm8 11.5h1.21c-.13 1.66-.71 3.2-1.61 4.5H4.39c-.9-1.3-1.47-2.84-1.61-4.5h1.21c.41 0 .75-.34.75-.75s-.34-.75-.75-.75H2.78c.16-1.99.95-3.8 2.17-5.23l.86.86c.15.15.34.22.53.22s.38-.07.53-.22c.29-.29.29-.77 0-1.06l-.86-.86a9.232 9.232 0 0 1 5.23-2.17V4c0 .41.34.75.75.75s.75-.34.75-.75V2.79c1.99.16 3.8.95 5.23 2.17l-.86.86c-.29.29-.29.77 0 1.06.15.15.34.22.53.22s.38-.07.53-.22l.86-.86a9.232 9.232 0 0 1 2.17 5.23h-1.21c-.41 0-.75.34-.75.75s.34.75.75.75zm-14.3 6h12.61c-1.65 1.55-3.87 2.5-6.3 2.5s-4.65-.95-6.3-2.5zm8.26-11.63c-.4-.13-.82.08-.95.47l-1.5 4.5c-.59.2-1.01.76-1.01 1.41 0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5c0-.44-.2-.84-.5-1.11l1.44-4.32a.753.753 0 0 0-.47-.95z" fill="#1e1e1e"></path></g></svg>',
                },
                uvIndex: {
                    title: 'UV Index',
                    value: `${uvIndex}`,
                    icon: '<svg width="30" height="30" viewBox="0 0 32 32"><g><path d="M15 5.045a10.955 10.955 0 0 0-6.038 2.503L7.515 6.101a.999.999 0 1 0-1.414 1.414l1.447 1.447A10.955 10.955 0 0 0 5.045 15H2a1 1 0 0 0 0 2h3.045a10.955 10.955 0 0 0 2.503 6.038l-1.447 1.447a.999.999 0 1 0 1.414 1.414l1.447-1.447A10.955 10.955 0 0 0 15 26.955V30a1 1 0 0 0 2 0v-3.045a10.955 10.955 0 0 0 6.038-2.503l1.447 1.447a.999.999 0 1 0 1.414-1.414l-1.447-1.447A10.955 10.955 0 0 0 26.955 17H30a1 1 0 0 0 0-2h-3.045a10.955 10.955 0 0 0-2.503-6.038l1.447-1.447a.999.999 0 1 0-1.414-1.414l-1.447 1.447A10.955 10.955 0 0 0 17 5.045V2a1 1 0 0 0-2 0zM16 7c4.967 0 9 4.033 9 9s-4.033 9-9 9-9-4.033-9-9 4.033-9 9-9zm-6.5 6v6a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-6a1 1 0 0 0-2 0v5h-2v-5a1 1 0 0 0-2 0zm7.051.316 2 6a1 1 0 0 0 1.898 0l2-6a1.001 1.001 0 0 0-1.898-.632L19.5 15.838l-1.051-3.154a1.001 1.001 0 0 0-1.898.632z" fill="#1e1e1e"></path></g></svg>',
                },
                visibility: {
                    title: 'Visibility',
                    value: `${visibility} km`,
                    icon: '<svg width="30" height="30" viewBox="0 0 510 510"><g><path d="M506.597 245.486C460.244 189.012 362.107 123.107 255 123.107c-107.491 0-205.632 66.353-251.597 122.379a15 15 0 0 0 0 19.028c47.452 57.84 145.819 122.38 251.597 122.38 109.537 0 207.256-68.357 251.597-122.379a15 15 0 0 0 0-19.029zM356.893 255c0 56.184-45.709 101.894-101.894 101.894-56.186 0-101.894-45.713-101.894-101.894 0-56.184 45.709-101.894 101.894-101.894 56.19.001 101.894 45.716 101.894 101.894zm-321.631.004c16.883-17.547 57.591-55.416 114.736-79.721-35.862 47.122-35.876 112.273-.017 159.412-43.449-18.415-83.811-47.509-114.719-79.691zm324.74 79.713c35.862-47.123 35.875-112.273.017-159.412 43.447 18.415 83.81 47.51 114.719 79.69-16.883 17.549-57.591 55.416-114.736 79.722z" fill="#1e1e1e"></path><path d="M204 255c0 28.122 22.878 51 51 51 28.121 0 51-22.878 51-51s-22.879-51-51-51c-28.122 0-51 22.878-51 51zm72 0c0 11.58-9.421 21-21 21-11.58 0-21-9.42-21-21s9.42-21 21-21c11.579 0 21 9.42 21 21zM255 65c8.284 0 15-6.716 15-15V15c0-8.284-6.716-15-15-15s-15 6.716-15 15v35c0 8.284 6.716 15 15 15zM344.5 85.062c7.192 4.102 16.355 1.601 20.461-5.599l19.962-35c4.104-7.196 1.599-16.356-5.598-20.461-7.198-4.104-16.356-1.599-20.461 5.599l-19.962 35c-4.104 7.195-1.598 16.356 5.598 20.461zM145.039 79.463c4.104 7.196 13.264 9.702 20.461 5.598 7.196-4.104 9.702-13.265 5.598-20.461l-19.962-35c-4.104-7.196-13.266-9.702-20.461-5.598-7.196 4.104-9.702 13.265-5.598 20.461zM255 445c-8.284 0-15 6.716-15 15v35c0 8.284 6.716 15 15 15s15-6.716 15-15v-35c0-8.284-6.716-15-15-15zM165.5 424.939c-7.196-4.103-16.356-1.598-20.461 5.598l-19.962 35c-4.104 7.196-1.598 16.357 5.598 20.461 7.197 4.104 16.357 1.597 20.461-5.598l19.962-35c4.105-7.196 1.598-16.357-5.598-20.461zM364.961 430.537c-4.104-7.197-13.267-9.701-20.461-5.599-7.196 4.104-9.702 13.265-5.598 20.461l19.962 35c4.103 7.196 13.263 9.703 20.461 5.599 7.196-4.104 9.702-13.265 5.598-20.461z" fill="#1e1e1e"></path></g></svg>'
                },
            },
        };

        renderApp();
    }
    catch {
        renderPopup();
    }
};

const getIconCode = path => {
    const pathArray = path.split('.');

    return pathArray[pathArray.length - 2].split('/').pop();
}

const getWeatherIcon = (path, isDay) => {
    return 'assets/images/' + (isDay ? 'day/' : 'night/') + getIconCode(path) + '.svg';
}

const getTemplate = () => {
    const {city, description, time, temperature, isDay, properties} = store.weather;

    const weatherBackground = !isDay ? 'night' : 'day';

    return `<div class="weather">
                <div class="weather__top ${weatherBackground}">
                    <p class="weather__city-name">${city}</p>
                    <div class="weather__info">
                        <div class="weather__info-left">
                            <img class="icon" src="${getWeatherIcon(description.icon, isDay)}" alt="icon">
                            <p class="weather__description">${description.text}</p>
                        </div>
                        <div class="weather__info-right">
                          <p class="weather__info-time">${time}</p>
                          <p class="weather__info-temperature">${temperature} °C</p>
                        </div>
                    </div>
                </div>
                <div class="weather__bottom">
                    ${renderAppProperties(properties)}
                </div>
            </div>`;
};

const renderAppProperties = properties => {
    return Object.values(properties).map(({title, value, icon}) => {
        return `<div class="weather__property">
                    <div class="weather__property-icon">
                        ${icon}
                    </div>
                    <div class="weather__property-info">
                        <div class="weather__property-value">${value}</div>
                        <div class="weather__property-description">${title}</div>
                    </div>
                </div>`;
    }).join('');
};

const getPopup = () => {
    return `<div class="popup">
                <form>
                    <div class="popup__form-group">
                        <input type="text"
                               class="popup__form-input"
                               placeholder="Kazan"
                               required>
                        <button class="popup__form-btn">Find</button>
                    </div>
                </form>
                <div class="popup__close-btn">
                    <span></span>
                </div>
            </div>`;
};

const renderPopup = () => {
    container.innerHTML = getPopup();

    const textInput = document.querySelector('.popup__form-input');
    const form = document.querySelector('form');
    const exitBtn = document.querySelector('.popup__close-btn');

    form.addEventListener('submit', handleSubmit);
    textInput.addEventListener('input', handleInput);
    exitBtn.addEventListener('click', handleClose);
};

const renderApp = () => {
    container.innerHTML = getTemplate();

    const city = document.querySelector('.weather__city-name');
    city.addEventListener('click', renderPopup);
};

const handleInput = event => {
    store.weather = {
        ...store.weather,
        city: event.target.value,
    };
};

const handleSubmit = event => {
    event.preventDefault();

    fetchData();
};

const handleClose = () => {
    fetchData();
};

window.addEventListener('beforeunload', () => {
    localStorage.setItem('store', JSON.stringify(store));
});

fetchData();