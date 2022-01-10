import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Button, withStyles } from "@material-ui/core";

const SmallButton = withStyles(
  {
    root: { minWidth: "initial", "&.tc-small-button-lower": { textTransform: "initial" } },
    outlined: { "&.tc-small-button-error": { color: "#e74c3c", borderColor: "#e74c3c" } },
    outlinedSizeSmall: { padding: "1px 8px" },
    iconSizeSmall: { marginRight: "4px", "& > *:first-child": { fontSize: "1rem" } }
  },
  { name: "tc-small-button" }
)(({ error, upper, ...props }) => <Button {...props} className={clsx({ "tc-small-button-lower": !upper, "tc-small-button-error": error })} />);

SmallButton.propTypes = { error: PropTypes.bool, upper: PropTypes.bool };
SmallButton.defaultProps = { error: false, size: "small", variant: "outlined", color: "primary", upper: false };

export default SmallButton;