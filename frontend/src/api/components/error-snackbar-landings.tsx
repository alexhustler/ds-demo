import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import CloseIcon from "@material-ui/icons/Close";
import {
  createStyles,
  WithStyles,
  Snackbar,
  IconButton,
} from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    close: {
      padding: theme.spacing(0.5),
    },
  });

interface Props extends WithStyles<typeof styles> {
  error: string;
  onClose: any;
}

class ErrorSnackbar extends React.Component<Props> {
  render() {
    const { classes, error, onClose } = this.props;
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          open={error.length > 0}
          autoHideDuration={6000}
          onClose={onClose}
          ContentProps={{
            "aria-describedby": "message-id",
          }}
          message={<span id="message-id">{error}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={onClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ErrorSnackbar);
