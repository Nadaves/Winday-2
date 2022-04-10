import React from "react";
import ReactApexChart from "react-apexcharts";
import { regularRequest } from "../../requestMethods";
import styled from "styled-components";

const Datetime = [];
const KinneretSpeed = [];
const KinneretDir = [];
const KinneretGust = [];
const SedotSpeed = [];
const SedotDir = [];
const SedotGust = [];
const YanaiSpeed = [];
const YanaiDir = [];
const YanaiGust = [];
const PolegSpeed = [];
const PolegDir = [];
const PolegGust = [];
const KshatotSpeed = [];
const KshatotDir = [];
const KshatotGust = [];
const EilatSpeed = [];
const EilatDir = [];
const EilatGust = [];

const Spots = {
  Kinneret: {
    NameSpeed: "כנרת",
    NameGust: "כנרת - גאסט",
    Speed: KinneretSpeed,
    Gust: KinneretGust,
  },
  Sedot: {
    NameSpeed: "שדות ים",
    NameGust: "שדות ים - גאסט",
    Speed: SedotSpeed,
    Gust: SedotGust,
  },
  Yanai: {
    NameSpeed: "בית ינאי",
    NameGust: "בית ינאי - גאסט",
    Speed: YanaiSpeed,
    Gust: YanaiGust,
  },
  Poleg: {
    NameSpeed: "פולג",
    NameGust: " פולג- גאסט",
    Speed: PolegSpeed,
    Gust: PolegGust,
  },
  Kshatot: {
    NameSpeed: "אשדוד",
    NameGust: "אשדוד - גאסט",
    Speed: KshatotSpeed,
    Gust: KshatotGust,
  },
  Eilat: {
    NameSpeed: "אילת",
    NameGust: "אילת - גאסט",
    Speed: EilatSpeed,
    Gust: EilatGust,
  },
};
const ControlsContainer = styled.div`
  display: flex;
  justify-content: right;
`;

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

const Select = styled.select`
  width: 150px;
  height: 30px;
  background-color: #332e2d;
  color: white;
  font-size: 15px;
  direction: rtl;
  text-align: center;
`;

const SelectorTitle = styled.h1`
  font-size: 20px;
  color: #5e5e5e;
  text-align: right;
`;

class ApexChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [
        {
          name: "כנרת",
          data: [],
        },
        {
          name: "כנרת-גאסט",
          data: [],
        },
      ],

      options: {
        chart: {
          foreColor: "#ffffff",
          height: 500,
          width: "100%",
          type: "line",
          toolbar: {
            show: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        fill: {
          colors: ["#D6FF04", "#FF8104"],
        },
        grid: {
          borderColor: "#FFFFFF",
          row: {
            colors: ["#332e2d", "#332e2d"],
            opacity: 0.95,
          },
        },
        markers: {
          size: 2,
        },
        yaxis: {
          opposite: true,
          min: 0,
          max: 20,
          forceNiceScale: true,
        },
        legend: {
          position: "bottom",
          horizontalAlign: "left",
          floating: false,
          offsetY: 0,
          offsetX: 0,
        },
      },
    };
    this.getDataset = this.getDataset.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      series: [
        {
          name: Spots[event.target.value].NameSpeed,
          data: Spots[event.target.value].Speed,
        },
        {
          name: Spots[event.target.value].NameGust,
          data: Spots[event.target.value].Gust,
        },
      ],
    });
  }

  getAllWindSpeeds(Dataset) {
    return Dataset.data[0].WindSpeeds[0];
  }

  async getDataset() {
    let Dataset;
    const getWindSpeeds = (cityName) =>
      this.getAllWindSpeeds(Dataset)[cityName].map(
        ([timeStamp, speed, direction, gust]) => ({
          timeStamp,
          speed,
          direction,
          gust,
        })
      );
    try {
      Dataset = await regularRequest.get("/stats/get");
      const allWindSpeeds = this.getAllWindSpeeds(Dataset);
      const kinneretWindSpeeds = getWindSpeeds("Kinneret");

      const Kinneret = allWindSpeeds.Kinneret;
      const Sedot = allWindSpeeds.Sedot;
      const Yanai = allWindSpeeds.Yanai;
      const Poleg = allWindSpeeds.Poleg;
      const Kshatot = allWindSpeeds.Kshatot;
      const Eilat = allWindSpeeds.Eilat;

      Kinneret.forEach((item) => {
        Datetime.push(item[0]);
        KinneretSpeed.push(item[1]);
        KinneretDir.push(item[2]);
        KinneretGust.push(item[3]);
      });
      Sedot.forEach((item) => {
        SedotSpeed.push(item[1]);
        SedotDir.push(item[2]);
        SedotGust.push(item[3]);
      });
      Yanai.forEach((item) => {
        YanaiSpeed.push(item[1]);
        YanaiDir.push(item[2]);
        YanaiGust.push(item[3]);
      });
      Poleg.forEach((item) => {
        PolegSpeed.push(item[1]);
        PolegDir.push(item[2]);
        PolegGust.push(item[3]);
      });
      Kshatot.forEach((item) => {
        KshatotSpeed.push(item[1]);
        KshatotDir.push(item[2]);
        KshatotGust.push(item[3]);
      });
      Eilat.forEach((item) => {
        EilatSpeed.push(item[1]);
        EilatDir.push(item[2]);
        EilatGust.push(item[3]);
      });
    } catch (err) {
      console.log(err);
    }

    const kinneretSpeeds = getWindSpeeds("Kinneret");

    const getAllCities = () => Object.keys(this.getAllWindSpeeds(Dataset));
    const series = getAllCities().map((city) => ({
      name: city,
      data: getWindSpeeds(city),
    }));

    this.setState({
      series0: [
        {
          name: "כנרת",
          data: kinneretSpeeds.speed,
        },
        {
          name: "כנרת-גאסט",
          data: kinneretSpeeds.gust,
        },
      ],
      options: {
        xaxis: {
          categories: kinneretSpeeds.map((speed) => speed.timeStamp),
          tickPlacement: "between",
          tickAmount: 8,
          labels: {
            rotate: -30,
            rotateAlways: true,
            hideOverlappingLabels: true,
            trim: false,
            minHeight: undefined,
            maxHeight: 120,
            style: {
              colors: [],
              fontSize: "12px",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 400,
              cssClass: "apexcharts-xaxis-label",
            },
            offsetX: 30,
            offsetY: 0,
          },
        },
      },
    });
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    this.getDataset();
    this.setState({
      series: [
        {
          name: "ינאי",
          data: YanaiSpeed,
        },
        {
          name: "ינאי-גאסט",
          data: YanaiGust,
        },
      ],
    });
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="line"
          height={350}
        />
        <ControlsContainer>
          <SelectContainer>
            <SelectorTitle>:בחר ספוט</SelectorTitle>
            <Select onChange={this.handleChange}>
              <option value={"Kinneret"}>כנרת</option>
              <option value={"Sedot"}>שדות ים</option>
              <option value={"Yanai"} selected>
                ינאי
              </option>
              <option value={"Poleg"}>פולג</option>
              <option value={"Kshatot"}>אשדוד</option>
              <option value={"Eilat"}>אילת</option>
            </Select>
          </SelectContainer>
        </ControlsContainer>
      </div>
    );
  }
}

export default ApexChart;
