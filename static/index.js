const getData = () =>
  fetch("/api/frames", { method: "GET" })
    .then(r => r.json())
    .then(r => r.data);

function main() {
  let map = L.map("map").setView([1, 1], 3);

  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution: `Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, \
         <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, \
         Imagery © <a href="https://www.mapbox.com/">Mapbox</a>`,
      maxZoom: 18,
      id: "mapbox/dark-v10",
      accessToken: ENV.MAPBOX_TOKEN
    }
  ).addTo(map);

  getData().then(r => {
    for (const [_, v] of Object.entries(r)) {
      for (const d of v) {
        console.log(d)
        L.circle([d.latitude, d.longitude], {radius: .01 * d.brightness})
          .addTo(map);
      }
    }
  });
}
