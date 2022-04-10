import * as React from "react";
import { styled as std } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { SpotsInfo } from "./data";
import styled from "styled-components";
import "./Item.css";
import NavigationIcon from "@mui/icons-material/Navigation";
import Sun from "../../assets/WeatherIcons/sun.svg";
import Clouds from "../../assets/WeatherIcons/cloudy.svg";
import PartlyCloudy from "../../assets/WeatherIcons/partly.svg";
import Rain from "../../assets/WeatherIcons/rain.svg";
import ThunderStorm from "../../assets/WeatherIcons/Thunder.svg";
import WindSock from "../../assets/WeatherIcons/windsock.svg";
import Uv from "../../assets/WeatherIcons/uv.svg";
import ThermostatOutlinedIcon from "@mui/icons-material/ThermostatOutlined";

const ImgContainer = styled.div`
  width: 325px;
  height: 200px;
  background-image: url(${(props) => props.img});
  background-size: cover;
  // @media screen and (min-width: 900px) {
  //   width: 350px;
  // }
`;

const InfoContainer = styled.div`
  font-family: "Open Sans", sans-serif;
  color: white;
`;
const WindirContainer = styled.div``;

const TopLineCont = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
`;

const DirectionCont = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-top: 12px;
  font-size: 15px;
`;
const SpeedsCont = styled.div`
  display: flex;
  align-items: center;
  width: 130px;
  justify-content: space-evenly;
  font-size: 30px;
  font-weight: 700;
`;

const SpotName = styled.h1`
  font-size: 30px;
`;

const SecondLine = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
`;
const UVContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  font-size: 15px;
`;

const TempLineContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;
const TempContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const WeatherCont = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 15px;
`;

const Texty = styled.div``;

const SpeedColor = (speed) => {
  if (speed > 0 && speed <= 9) {
    return "#ff1c1c";
  } else if (speed > 10 && speed <= 15) {
    return "#fcce03";
  } else if (speed > 15) {
    return "#4efc03";
  }
};

const DirectionTranslate = (direction) => {
  if (0 < direction && direction <= 45) {
    return "צפונית";
  } else if (45 < direction && direction <= 135) {
    return "מזרחית";
  } else if (135 < direction && direction <= 225) {
    return "דרומית";
  } else {
    return "מערבית";
  }
};

const WeatherTranslate = (main) => {
  if (main === "Sunny") {
    return Sun;
  } else if (main === "Rain") {
    return Rain;
  } else if (main === "PartlyCloudy") {
    return PartlyCloudy;
  } else if (main === "ThunderStorm") {
    return ThunderStorm;
  } else if (main === "Clouds") {
    return Clouds;
  }
};

const Item = std(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function CardsGrid() {
  return (
    <Box sx={{ width: "100%" }}>
      <Grid
        container
        rowSpacing={2}
        columns={{ xs: 1, sm: 2, md: 3 }}
        columnSpacing={{ xs: 2, sm: 2, md: 3 }}
      >
        {SpotsInfo.map((item) => (
          <Grid
            item
            xs={1}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Item
              id="ItemFrame"
              sx={{
                maxWidth: "325px",
                height: "400px",
                bgcolor: "#5e5e5e",
                boxShadow: 3,
              }}
            >
              <ImgContainer img={item.img} />
              <InfoContainer>
                <TopLineCont>
                  <SpotName>
                    <Texty
                      id="ItemName"
                      sx={{ fontSize: "35px", fontWeight: "800" }}
                    >
                      {item.name}
                    </Texty>
                  </SpotName>
                  <SpeedsCont>
                    <Texty
                      sx={{
                        fontSize: "40px",
                        fontWeight: "800",
                        marginRight: "0.2em",
                        color: `${SpeedColor(item.wind)}`,
                      }}
                      id="itemWindSpeed"
                    >
                      {item.wind}
                    </Texty>
                    <Texty>-</Texty>
                    <Texty>{item.gust}</Texty>
                    <img
                      src={WindSock}
                      style={{ height: "35px" }}
                      className="windSock"
                      alt="windSock"
                    />
                  </SpeedsCont>
                </TopLineCont>
                <SecondLine>
                  <WeatherCont>
                    <img
                      src={WeatherTranslate(item.main)}
                      style={{ height: "70px" }}
                      alt="Weather"
                    />
                    <TempContainer>
                      <TempLineContainer>
                        <ThermostatOutlinedIcon />
                        <Texty>{item.temp}°</Texty>
                      </TempLineContainer>
                      <Texty>{item.feels_like}° מרגיש כמו</Texty>
                    </TempContainer>
                  </WeatherCont>
                  <UVContainer>
                    <img
                      src={Uv}
                      style={{ height: "35px" }}
                      className="Uv"
                      alt="Uv"
                    />
                    <Texty>{item.uvi}UV</Texty>
                  </UVContainer>
                  <DirectionCont>
                    <WindirContainer dir={item.dir}>
                      <NavigationIcon
                        className="itemWinddirArrow"
                        style={{
                          transform: `rotate(${item.dir / 360 + 0.5}turn)`,
                          fontSize: "40px",
                        }}
                      />
                    </WindirContainer>
                    <Texty id="itemWindDir" sx={{ marginTop: "1em" }}>
                      {DirectionTranslate(item.dir)}
                    </Texty>
                  </DirectionCont>
                </SecondLine>
              </InfoContainer>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
