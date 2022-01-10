import React, { Component } from "react";
import { Box } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { MenuItems } from "./MenuItem";
import { Button } from "./Button";
import SmallButton from "./SmallButton";
import "../Navbar/styles/Navbar.css";

class Navbar extends Component {
  state = { clicked: false };

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  render() {
    return (
      <nav className="NavbarItems">
        <h1 className="navbar-logo">
          <Link
            to={"/"}
            style={{
              paddingLeft: 13,
              textDecoration: "none",
              color: "inherit",
            }}
          >
            {" "}
            LITE<i className="fas fa-cat"></i> FLIX{" "}
          </Link>
        </h1>
        <Box ml={5} mt={2}>
          <SmallButton startIcon={<Add />}>AGREGAR PELICULA</SmallButton>
        </Box>
        <div className="menu-icon" onClick={this.handleClick}>
          <i
            className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}
          ></i>
        </div>
      
        <Box
          mt={2}
          display="flex"
          flexDirection="column"
          alignItems="stretch"
          padding={1}
        >
          <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
            {MenuItems.map((item, index) => {
              return (
                <>
                  <li key={index}>
                    <Link className={item.cName} to={item.url}>
                      {item.title}
                    </Link>
                  </li>
                </>
              );
            })}
          </ul>
        </Box>
        <Box mt={2} ml={-4} mr={2} mb={2}>
          <Button>
            <i class="fas fa-address-card"></i>
          </Button>
        </Box>
      </nav>
    );
  }
}

export default Navbar;
