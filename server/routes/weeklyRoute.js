const router = require("express").Router();
const axios = require("axios");

router.get("/weekly", (req, res) => {
  const YanaiUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=32.38&lon=34.86&exclude=current,minutely,hourly,alerts&appid=c8f08c8e937aef21399d0f8e4576b5af";
  const SedotUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=32.49&lon=34.89&exclude=current,minutely,hourly,alerts&appid=c8f08c8e937aef21399d0f8e4576b5af";
  const KinneretUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=29.52&lon=34.93&exclude=current,minutely,hourly,alerts&appid=c8f08c8e937aef21399d0f8e4576b5af";
  const EilatUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=32.87&lon=35.63&exclude=current,minutely,hourly,alerts&appid=c8f08c8e937aef21399d0f8e4576b5af";

  const SpotNames = ["Yanai", "Sedot", "Kinneret", "Eilat"];
  const Spots = { Yanai: [], Sedot: [], Kinneret: [], Eilat: [] };
  const Urls = [YanaiUrl, SedotUrl, KinneretUrl, EilatUrl];

  function CreateDataFrame(url, spot) {
    axios({
      method: "get",
      url: url,
    }).then(function (response) {
      var s = 0;
      const data = response.data;
      const windSpeeds = [];

      //Arranging all speed values together
      for (let i = 0; i < data.daily.length; i++) {
        windSpeeds.push(data.daily[i].wind_speed);
      }

      //Finding maximum speed value
      const MaxSpeed = windSpeeds.reduce(function (a, b) {
        return Math.max(a, b);
      }, 0);

      //Finding day values according to maximum speed value
      for (var i in windSpeeds) {
        if (MaxSpeed == windSpeeds[i]) {
          s = i;
        }
      }

      //Unix to readable date conversion
      var myDate = new Date(data.daily[s].dt * 1000);
      const human = myDate.toLocaleDateString();

      //Arranging date, speeds and direction of the selected day in one array
      const topDay = [
        human,
        Math.round((data.daily[s].wind_speed * 1.856 * 100) / 100),
        Math.round((data.daily[s].wind_gust * 1.856 * 100) / 100),
        data.daily[s].wind_deg,
      ];
      Spots[spot] = topDay;
    });
  }

  function CreateSpots() {
    for (let d = 0; d < Urls.length; d++) {
      var url = Urls[d];
      var spot = SpotNames[d];
      CreateDataFrame(url, spot);
    }
  }

  CreateSpots();
  setTimeout(() => {
    res.send(Spots);
  }, 1000);
});

module.exports = router;
