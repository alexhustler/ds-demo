import React from "react";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { withStyles } from "@material-ui/core/styles";
import { colors } from "../../theme/colors";
import Avatar from "@material-ui/core/Avatar";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { createStyles, Fab, IconButton } from "@material-ui/core";

import config from "../../config";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    paper: {
      marginRight: theme.spacing(2),
    },
    avatar: {
      border: `1px solid ${colors.green}`,
      width: theme.spacing(6),
      height: theme.spacing(6),
    },
  });

class AccountDropdown extends React.Component<any> {
  state = {
    open: false,
  };

  handleToggle = () => {
    this.setState({ open: !this.state.open });
  };

  handleClose = (event: any) => {
    if ((this as any).anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const {
      classes,
      userFullName,
      userProfileImage,
      settingsClick,
      logoutClick,
      changePasswordClick,
    } = this.props;
    const { open } = this.state;
    return (
      <div className={classes.root}>
        <div>
          <IconButton
            buttonRef={node => {
              (this as any).anchorEl = node;
            }}
            aria-owns={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={this.handleToggle}
            color="secondary"
            size="small"
          >
            <Avatar
              className={classes.avatar}
              src={
                userProfileImage
                  ? userProfileImage
                  : userFullName && userFullName[0].toUpperCase()
              }
            />
          </IconButton>
          <Popper
            open={open}
            anchorEl={(this as any).anchorEl}
            transition
            disablePortal
          >
            {({ TransitionProps }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin: "left bottom",
                }}
              >
                <Paper elevation={2}>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList onClick={this.handleClose}>
                      <MenuItem onClick={changePasswordClick}>
                        Change Password
                      </MenuItem>
                      <MenuItem onClick={settingsClick}>User Settings</MenuItem>
                      <MenuItem onClick={logoutClick}>Logout</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(AccountDropdown);
