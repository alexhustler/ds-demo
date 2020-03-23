import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Fab, Tooltip } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { createStyles } from "@material-ui/core";

interface CreateListItemButtonProps {
  classes: any;
  onClick: any;
  toolTip: string;
}

const styles = (theme: Theme) =>
  createStyles({
    fab: {
      margin: theme.spacing(),
      position: "fixed",
      bottom: theme.spacing(5),
      right: theme.spacing(3),
    },
  });

const CreateListItemButton = (props: CreateListItemButtonProps) => {
  const { onClick, classes, toolTip } = props;
  return (
    <Tooltip title={toolTip} placement="left">
      <Fab
        onClick={onClick}
        color="primary"
        aria-label="Add"
        className={classes.fab}
      >
        <AddIcon />
      </Fab>
    </Tooltip>
  );
};

export default withStyles(styles)(CreateListItemButton);
