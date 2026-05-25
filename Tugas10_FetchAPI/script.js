const cityInput = document.getElementById("cityInput");

const loading = document.getElementById("loading");

const errorMessage =
document.getElementById("errorMessage");

const weatherResult =
document.getElementById("weatherResult");

const cityName =
document.getElementById("cityName");

const weatherDescription =
document.getElementById("weatherDescription");

const temperature =
document.getElementById("temperature");

const humidity =
document.getElementById("humidity");

const windSpeed =
document.getElementById("windSpeed");

const rain =
document.getElementById("rain");

const weatherTime =
document.getElementById("weatherTime");

function getWeatherDescription(code) {

  /* Cerah */
  if (code === 0) {

    return "Cerah";

  }

  /* Berawan */
  else if (
    code === 1 ||
    code === 2 ||
    code === 3
  ) {

    return "Berawan";

  }

  /* Berkabut */
  else if (
    code === 45 ||
    code === 48
  ) {

    return "Berkabut";

  }

  /* Gerimis */
  else if (
    code === 51 ||
    code === 53 ||
    code === 55
  ) {

    return "Gerimis";

  }

  /* Hujan */
  else if (
    code === 61 ||
    code === 63 ||
    code === 65
  ) {

    return "Hujan";

  }

  /* Hujan Lebat */
  else if (
    code === 80 ||
    code === 81 ||
    code === 82
  ) {

    return "Hujan Lebat";

  }

  /* Badai */
  else if (
    code === 95 ||
    code === 96 ||
    code === 99
  ) {

    return "Badai Petir";

  }

  else {

    return "Cuaca Tidak Diketahui";

  }

}

function updateTheme(weatherCode) {

  const body = document.body;

  /* ☀️ Cerah */
  if (weatherCode === 0) {

    body.style.background =
      "linear-gradient(135deg, #bfdbfe, #93c5fd, #60a5fa)";

  }

  /* ☁️ Berawan / Mendung */
  else if (
    weatherCode === 1 ||
    weatherCode === 2 ||
    weatherCode === 3
  ) {

    body.style.background =
      "linear-gradient(135deg, #d1d5db, #9ca3af, #6b7280)";

  }

  /* 🌧 Hujan */
  else if (
    weatherCode === 61 ||
    weatherCode === 63 ||
    weatherCode === 65 ||
    weatherCode === 80 ||
    weatherCode === 81 ||
    weatherCode === 82
  ) {

    body.style.background =
      "linear-gradient(135deg, #475569, #334155, #1e293b)";

  }

  /* ⛈ Badai */
  else if (
    weatherCode === 95 ||
    weatherCode === 96 ||
    weatherCode === 99
  ) {

    body.style.background =
      "linear-gradient(135deg, #6d28d9, #5b21b6, #312e81)";

  }

  /* 🌫 Berkabut */
  else if (
    weatherCode === 45 ||
    weatherCode === 48
  ) {

    body.style.background =
      "linear-gradient(135deg, #e5e7eb, #cbd5e1, #94a3b8)";

  }

  /* Default */
  else {

    body.style.background =
      "linear-gradient(135deg, #111827, #1f2937, #374151)";

  }

}

async function getWeather() {

  const city =
    cityInput.value.trim();

  if (city === "") {

    alert(
      "Masukkan nama kota terlebih dahulu"
    );

    return;

  }

  loading.style.display = "block";

  errorMessage.innerHTML = "";

  weatherResult.style.display = "none";

  try {

    /* Ambil koordinat kota */

    const geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=id&format=json`
    );

    const geoData =
      await geoResponse.json();

    if (
      !geoData.results ||
      geoData.results.length === 0
    ) {

      errorMessage.innerHTML =
        "Kota tidak ditemukan.";

      return;

    }

    const location =
      geoData.results[0];

    const latitude =
      location.latitude;

    const longitude =
      location.longitude;

    /* Ambil data cuaca */

    const weatherResponse =
      await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,rain,weather_code,wind_speed_10m&timezone=auto`
      );

    const weatherData =
      await weatherResponse.json();

    const current =
      weatherData.current;

    /* Tampilkan data */

    cityName.innerHTML =
      `${location.name}, ${location.country}`;

    weatherDescription.innerHTML =
      getWeatherDescription(
        current.weather_code
      );

    temperature.innerHTML =
      `${current.temperature_2m}°C`;

    humidity.innerHTML =
      `${current.relative_humidity_2m}%`;

    windSpeed.innerHTML =
      `${current.wind_speed_10m} km/jam`;

    rain.innerHTML =
      `${current.rain} mm`;

    weatherTime.innerHTML =
      current.time;

    /* Ubah warna sesuai cuaca */

    updateTheme(
      current.weather_code
    );

    weatherResult.style.display =
      "block";

  }

  catch (error) {

    errorMessage.innerHTML =
      "Gagal mengambil data cuaca.";

  }

  finally {

    loading.style.display =
      "none";

  }

}

/* Enter keyboard */

cityInput.addEventListener(
  "keyup",
  function(event) {

    if (event.key === "Enter") {

      getWeather();

    }

  }
);