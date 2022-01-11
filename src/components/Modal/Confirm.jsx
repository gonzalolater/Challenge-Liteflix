import React from "react";
import PropTypes from "prop-types";
import {
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  makeStyles,
  Typography,
  DialogTitle,
  Grid,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { childrenPropType } from "../common/index";

const useStyles = makeStyles((theme) => ({
  content: { color: "#000000", fontSize: 12 },
  close: { marginRight: -10 },
  actions: {
    padding: theme.spacing(1, 3, 2.5, 3),
    "& .MuiButton-root": { lineHeight: 1.5 },
  },
  dialogContent: { padding: theme.spacing(0, 3, 1, 3) },
}));

const Confirm = ({
  children,
  messageText,
  title,
  onAction,
  openDialog,
  onToggleConfirm,
  okText,
  noText,
  hideCancel,
  hideConfirm,
  loading,
}) => {
  const classes = useStyles();
  return (
    <Dialog open={openDialog} onClose={onToggleConfirm} PaperComponent={Paper}>
      <DialogTitle disableTypography>
        <Grid container alignItems="center" spacing={2} wrap="nowrap">
          <Grid item xs>
            <Typography className="tc-title">{title}</Typography>
          </Grid>
          <Grid item>
            <IconButton
              aria-label="close"
              size="small"
              onClick={onToggleConfirm}
            >
              <Close />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent className={classes.content}>
        {messageText && <div className="tc-mb2">{messageText}</div>}
        {children}
      </DialogContent>
      <DialogActions className={classes.actions}>
        {!hideCancel && (
          <Button
            variant="outlined"
            autoFocus
            onClick={onToggleConfirm}
            color="primary"
            disabled={loading}
          >
            {noText}
          </Button>
        )}
        {!hideConfirm && (
          <Button
            variant="contained"
            onClick={onAction}
            color="primary"
            disabled={loading}
          >
            {okText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

Confirm.propTypes = {
  children: childrenPropType(),
  messageText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onAction: PropTypes.func,
  openDialog: PropTypes.bool,
  onToggleConfirm: PropTypes.func.isRequired,
  okText: PropTypes.string,
  noText: PropTypes.string,
  hideCancel: PropTypes.bool,
  hideConfirm: PropTypes.bool,
  loading: PropTypes.bool,
};

Confirm.defaultProps = {
  children: undefined,
  messageText: "",
  title: "",
  onAction: undefined,
  okText: "Delete",
  openDialog: false,
  noText: "Cancel",
  hideCancel: false,
  hideConfirm: false,
  loading: false,
};

export default Confirm;
