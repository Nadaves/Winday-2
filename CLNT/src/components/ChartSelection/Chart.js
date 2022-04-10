import React from "react";
import ReactApexChart from "react-apexcharts";
import { regularRequest } from "../../requestMethods";

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

class ApexChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      series0: [
        {
          name: "כנרת",
          data: [],
        },
        {
          name: "כנרת-גאסט",
          data: [],
        },
      ],
      series1: [
        {
          data: [],
        },
        {
          data: [],
        },
      ],
      series2: [
        {
          data: [],
        },
        {
          data: [],
        },
      ],
      series3: [
        {
          data: [],
        },
        {
          data: [],
        },
      ],
      series4: [
        {
          data: [],
        },
        {
          data: [],
        },
      ],
      series5: [
        {
          data: [],
        },
        {
          data: [],
        },
      ],
      options: {
        chart: {
          zoom: {
            enabled: false,
          },
          height: 350,
          type: "line",
          dropShadow: {
            enabled: false,
            color: "#000",
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2,
          },
          toolbar: {
            show: false,
          },
        },
        colors: ["#77B6EA", "#545454"],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        grid: {
          borderColor: "#e7e7e7",
          row: {
            colors: ["#f3f3f3", "transparent"],
            opacity: 0.7,
          },
        },
        markers: {
          size: 2,
        },
        yaxis: {
          opposite: false,
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
  }

  async getDataset() {
    try {
      const Dataset = await regularRequest.get("/stats/get");
      const Kinneret = Dataset.data[0].WindSpeeds[0].Kinneret;
      const Sedot = Dataset.data[0].WindSpeeds[0].Sedot;
      const Yanai = Dataset.data[0].WindSpeeds[0].Yanai;
      const Poleg = Dataset.data[0].WindSpeeds[0].Poleg;
      const Kshatot = Dataset.data[0].WindSpeeds[0].Kshatot;
      const Eilat = Dataset.data[0].WindSpeeds[0].Eilat;

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
    } catch (err) {}
    this.setState({
      series0: [
        {
          name: "כנרת",
          data: KinneretSpeed,
        },
        {
          name: "כנרת-גאסט",
          data: KinneretGust,
        },
      ],
      series1: [
        {
          name: "ינאי",
          data: YanaiSpeed,
        },
        {
          name: "ינאי-גאסט",
          data: YanaiGust,
        },
      ],
      series2: [
        {
          name: "שדות ים",
          data: YanaiSpeed,
        },
        {
          name: "שדות ים-גאסט",
          data: SedotGust,
        },
      ],
      series3: [
        {
          name: "פולג",
          data: PolegSpeed,
        },
        {
          name: "פולג - גאסט",
          data: SedotGust,
        },
      ],
      series4: [
        {
          name: "אשדוד",
          data: YanaiSpeed,
        },
        {
          name: "אשדוד - גאסט",
          data: SedotGust,
        },
      ],
      series5: [
        {
          name: "אילת",
          data: YanaiSpeed,
        },
        {
          name: "אילת - גאסט",
          data: SedotGust,
        },
      ],

      options: {
        xaxis: {
          categories: Datetime,
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
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series0}
          type="line"
          height={350}
        />

        <ReactApexChart
          options={this.state.options}
          series={this.state.series1}
          type="line"
          height={350}
        />
        <ReactApexChart
          options={this.state.options}
          series={this.state.series2}
          type="line"
          height={350}
        />
        <ReactApexChart
          options={this.state.options}
          series={this.state.series3}
          type="line"
          height={350}
        />
        <ReactApexChart
          options={this.state.options}
          series={this.state.series4}
          type="line"
          height={350}
        />
        <ReactApexChart
          options={this.state.options}
          series={this.state.series5}
          type="line"
          height={350}
        />
      </div>
    );
  }
}

export default ApexChart;
