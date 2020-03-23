import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { createStyles } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const styles: any = (theme: Theme) =>
  createStyles({
    submit: {
      marginTop: theme.spacing(3),
      float: "right",
    },
    actions: {
      padding: theme.spacing(3),
      margin: "0px",
    },
    capitalize: {
      textTransform: "capitalize",
    },
  });

const ConfirmationDialog = (props: any) => {
  const {
    classes,
    isOpened,
    dialogTitle,
    dialogText,
    onConfirm,
    onClose,
  } = props;

  return (
    <Dialog
      open={isOpened}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        <span>{dialogTitle}</span>
      </DialogTitle>

      <DialogContent>
        <DialogContentText>{dialogText}</DialogContentText>
      </DialogContent>

      <DialogActions className={classes.actions}>
        <Button type="submit" color="primary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={onConfirm}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withStyles(styles)(ConfirmationDialog);
