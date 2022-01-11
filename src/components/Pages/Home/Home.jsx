import React from "react";
import { Add } from "@material-ui/icons";
import { Grid, Box } from "@material-ui/core";
import "./styles/Home.css";
import MenuDropdown from "../../Navbar/MenuDropdown";
import houseofcards from "../../../assets/img/houseofcards.png";
import marseille from "../../../assets/img/marseille.png";
import strangerthings from "../../../assets/img/strangerthings.png";
import thecrown from "../../../assets/img/thecrown.png";
import "../../Navbar/styles/Button.css";
import { Button } from "../../Navbar/Button";
import SmallButton from "../../Navbar/SmallButton";

const imgMyimageexample = require("../../../assets/img/fondo.png");
const divStyle = {
  width: "100%",
  height: "100%",
  backgroundImage: `url(${imgMyimageexample})`,
  backgroundSize: "cover",
};

export default class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <div className="cComponent" style={divStyle}>
          {/* ----------------------------------------------------------------- */}
          <Box mt={2}>
            <Grid container spacing={3}>
              <Grid item xs={10}></Grid>
              <Grid item xs={2} align="center">
                <MenuDropdown />
              </Grid>
            </Grid>
          </Box>
          {/* ---------------------------------------------------------------- */}
          <Grid container spacing={2}>
            <Grid item xs={8}>
              {/* ---------------------------------------------------------------- */}
              <Grid container>
                <Box mt={50} ml={4}>
                  <Grid xs={12}>
                    <h6 style={{ color: "white" }}>ORIGINAL DE LITEFLIX</h6>
                  </Grid>
                </Box>
                <Box mt={55} ml={-20}>
                  <Grid xs={12}>
                    <h1 className="papel" style={{ color: "#64EEBC" }}>
                      LA CASA DE PAPEL
                    </h1>
                  </Grid>
                </Box>
                <Grid xs={6}>
                  <Grid container wrap="nowrap">
                    <Box mt={62} ml={-40}>
                      <Grid item xs>
                        <a href="https://www.netflix.com/watch/81012314?trackId=13752289">
                        <Button>REPRODUCIR</Button>
                        </a>
                      </Grid>
                    </Box>
                    <Box mt={62} ml={2}>
                      <Grid xs>
                        <SmallButton size="large" startIcon={<Add />}>
                          MI LISTA
                        </SmallButton>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              {/* ---------------------------------------------------------------- */}
            </Grid>
            <Grid item xs={4}>
              <h2 style={{ color: "white" }}>
                VER: POPULARES <i class="fas fa-angle-down"></i>{" "}
              </h2>
              <div class="img-container">
                <img src={houseofcards} alt="House Of Cards" />
                <img src={marseille} alt="Marseille" />
                <img src={strangerthings} alt="Stranger Things" />
                <img src={thecrown} alt="The Crown" />
              </div>
            </Grid>
            <Grid item xs={3}>
              <h5 style={{ color: "white" }} align="center">
                Dev Gonzalo Daniel Aguilar
              </h5>
            </Grid>
            <Grid item xs={9}>
              <h1 style={{ color: "white" }}> </h1>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}
