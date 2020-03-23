import React from "react";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { createStyles } from "@material-ui/core";

interface MenuDrawerProps {
  classes: any;
  pathname: string;
  open: boolean;
  handleDrawerClose: (event: any) => void;
  ListComponent: any;
}

const drawerWidth = 240;

const styles: any = (theme: Theme) =>
  createStyles({
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 8px",
      margin: "0.6em",
      ...theme.mixins.toolbar,
    },
    drawerPaper: {
      position: "fixed",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    },
  });

const MenuDrawer = (props: any) => {
  const { classes, pathname, open, handleDrawerClose, ListComponent } = props;
  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: classNames(
          classes.drawerPaper,
          !open && classes.drawerPaperClose
        ),
      }}
      open={open}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <ListComponent pathname={pathname} />
    </Drawer>
  );
};

export default withStyles(styles)(MenuDrawer);
