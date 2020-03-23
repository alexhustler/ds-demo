import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { createStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

import { StoreState } from "../redux/configure-store";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    primaryLabel: {
      textAlign: "left",
      fontSize: theme.typography.h6.fontSize,
      textTransform: "uppercase",
      paddingBottom: "10px",
    },
  });

class DashboardPage extends React.Component<any> {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={3}></Grid>
      </div>
    );
  }
}

const mapStateToProps = (storeState: StoreState) => ({
  user: storeState.authentication.user,
});

export default connect(
  mapStateToProps,
  {}
)(withStyles(styles)(DashboardPage)) as any;
