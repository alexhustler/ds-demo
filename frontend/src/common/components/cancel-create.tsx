import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { createStyles, WithStyles, Button } from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      marginTop: theme.spacing(4),
    },
    logo: {
      ...theme.typography.h5,
      textTransform: "uppercase",
    },
    createButton: {
      marginLeft: "1em",
    },
    spacer: {
      flex: 1,
    },
  });

interface Props extends WithStyles<typeof styles> {
  onCancel: any;
}

class Createbar extends React.Component<Props> {
  render() {
    const { classes, onCancel } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.spacer} />
        <Button onClick={onCancel}>Cancel</Button>
        <Button
          className={classes.createButton}
          type="submit"
          variant="contained"
          size="medium"
          color="primary"
        >
          Create
        </Button>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Createbar);
