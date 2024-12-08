const timingsTable = document.getElementById('timingsTable');
const timingsBody = document.getElementById('timingsBody');
const cityForm = document.getElementById('cityForm');
const defaultCity = "Hyderabad";


const fetchPrayerTimings = async (city) => {
    ERROR.innerHTML = "";
  const apiUrl = `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Pakistan`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.code === 200) {
      displayTimings(data.data.timings);
      def0.innerHTML=`Prayer Timings in ${city}`
    } else {
        document.getElementById("ERROR").innerHTML = "Please Enter Valid City Name";
    }
  } catch (error) {
         console.error("Error fetching Namaz timings:", error);
         document.getElementById("ERROR").innerHTML = "Could'nt show response , chechk Internet Connection";
  }
};


const displayTimings = (timings) => {
  timingsBody.innerHTML = ""; 
  const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
  prayers.forEach((prayer) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${prayer}</td><td>${timings[prayer]}</td>`;
    timingsBody.appendChild(row);
  });
  timingsTable.style.display = "table";
};


cityForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const city = document.getElementById("city").value.trim();
  if (city) {
    fetchPrayerTimings(city);
  } else {
    document.getElementById("ERROR").innerHTML = "Please Enter City Name";
  }
});


fetchPrayerTimings(defaultCity);
