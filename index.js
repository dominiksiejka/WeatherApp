const input = document.querySelector("#data");
const btn = document.querySelector("#submit");
const p = document.querySelectorAll("div.scores p");
const allP = [...p];
const img = document.querySelector("img");
const showText = document.querySelector("p.showtext");
const API = "https://api.openweathermap.org/data/2.5/weather";

const pictures = {
  clouds: "images/cloud.png",
  drizzle: "images/drizzle.png",
  fog: "images/fog.png",
  ice: "images/ice.png",
  rain: "images/rain.png",
  sun: "images/sun.png",
  thunderstorm: "images/thunderstorm.png",
  clear: "images/unknown.png",
  mist: "images/unknown.png",
};

const getData = async (city) => {
  const useAxios = await axios.get(API, {
    params: {
      q: city,
      units: "metric",
      appid: "6902aee046e845d62fe8779cdd3683d4",
    },
  });

  showText.textContent = useAxios.data.name;

  const { temp, humidity } = useAxios.data.main;
  allP[1].textContent = Math.round(temp) + " ℃";
  allP[2].textContent = humidity + "%";

  const currentWeather = useAxios.data.weather[0].main.toLowerCase();
  allP[0].textContent = currentWeather;
  img.src = pictures[currentWeather];
};

const getCurrentData = (e) => {
  if (e.key === "Enter") {
    getData(e.target.value);
    e.target.value = "";
  }
};
input.addEventListener("keydown", getCurrentData);
btn.addEventListener("click", function () {
  getData(input.value);
  input.value = "";
});
