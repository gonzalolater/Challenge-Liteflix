import React from "react";
import "./styles/Home.css";
import { Grid } from "@material-ui/core";
import MenuDropdown from "../../Navbar/MenuDropdown";

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
          <Grid container xs={10}>
            <Grid item>
              <h3 style={{ color: "white" }} align="left">
                ORIGINAL DE LITEFLIX
              </h3>
            </Grid>
            <Grid item>asd</Grid>
          </Grid>
          <Grid container>
            <Grid>
              <MenuDropdown />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}
