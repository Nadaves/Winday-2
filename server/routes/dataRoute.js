const axios = require("axios");
const router = require("express").Router();
const Data = require("../models/Data");
const moment = require("moment");

router.get("/upcoming", (req, res) => {
  //Variables
  const YanaiUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=32.38&lon=34.86&exclude=current,minutely,daily,alerts&appid=c8f08c8e937aef21399d0f8e4576b5af";
  const SedotUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=32.49&lon=34.89&exclude=current,minutely,daily,alerts&appid=c8f08c8e937aef21399d0f8e4576b5af";
  const KinneretUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=29.52&lon=34.93&exclude=current,minutely,daily,alerts&appid=c8f08c8e937aef21399d0f8e4576b5af";
  const EilatUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=32.87&lon=35.63&exclude=current,minutely,daily,alerts&appid=c8f08c8e937aef21399d0f8e4576b5af";
  const PolegUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=32.31&lon=34.84&exclude=current,minutely,daily,alerts&appid=c8f08c8e937aef21399d0f8e4576b5af";
  const KshatotUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=31.80&lon=34.63&exclude=current,minutely,daily,alerts&appid=c8f08c8e937aef21399d0f8e4576b5af";

  const SpotNames = ["Yanai", "Sedot", "Kinneret", "Eilat", "Poleg", "Kshatot"];

  const Spots = {
    Yanai: [],
    Sedot: [],
    Kinneret: [],
    Eilat: [],
    Poleg: [],
    Kshatot: [],
  };

  const Urls = [
    YanaiUrl,
    SedotUrl,
    KinneretUrl,
    EilatUrl,
    PolegUrl,
    KshatotUrl,
  ];

  function CreateDataFrame(url, spot) {
    axios({
      method: "get",
      url: url,
    }).then(function (response) {
      var s = 0;
      const data = response.data;
      const windSpeeds = [];

      //Arranging all speed values together
      for (let i = 0; i < data.hourly.length; i++) {
        var myDate = new Date(data.hourly[i].dt * 1000);
        const human = moment(myDate).format("dddd h:mm");
        windSpeeds.push([
          human,
          Math.round(data.hourly[i].wind_speed * 1.856 * 10) / 10,
          Math.round(data.hourly[i].wind_deg * 10) / 10,
          Math.round(data.hourly[i].wind_gust * 1.856 * 10) / 10,
        ]);
      }
      Spots[spot] = windSpeeds;
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
  setTimeout(async () => {
    const newData = new Data({
      WindSpeeds: Spots,
    });
    try {
      const savedData = await newData.save();
      res.status(200).json(savedData);
    } catch (err) {
      res.status(500).json(err);
    }
  }, 1000);
});

module.exports = router;
