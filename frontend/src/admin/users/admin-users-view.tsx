import React from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import { createStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormLabel";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { isEmail } from "validator";

import { StoreState } from "../../redux/configure-store";
import {
  navigateToDashboardPage,
  navigateToAdminPage,
} from "../../routing/route-actions";
import { passwordRequirements } from "../../authentication/common";
import { isValidPassword } from "../../common/utils";
import ConfirmationDialog from "../../common/components/confirmation-dialog";

import { updateUserForAdmin, impersonateUser } from "../admin-actions";

const styles = (theme: Theme) =>
  createStyles({
    main: {
      width: "auto",
      display: "block", // Fix IE 11 issue.
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
      [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
        width: 400,
        marginLeft: "auto",
        marginRight: "auto",
      },
    },
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
        3
      )}px`,
    },
    avatar: {
      margin: theme.spacing(),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(),
    },
    submit: {
      marginTop: theme.spacing(3),
    },
  });

const createInitialErrorState = () => ({
  firstName: "",
  lastName: "",
  emailAddress: "",
  newPassword: "",
  confirmNewPassword: "",
});

class AdminUsersView extends React.Component<any> {
  state = {
    isInitialized: false,
    makeAdminDialogIsOpened: false,
    data: {
      id: 0,
      isAdmin: false,
      firstName: "",
      lastName: "",
      emailAddress: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    errors: createInitialErrorState(),
  };

  initializeForm = () => {
    const { selectedUser } = this.props;

    this.setState({
      ...this.state,
      isInitialized: true,
      data: {
        ...this.state.data,
        id: selectedUser.id,
        isAdmin: selectedUser.isAdmin,
        firstName: selectedUser.firstName || "",
        lastName: selectedUser.lastName || "",
        emailAddress: selectedUser.emailAddress || "",
        newPassword: "",
        confirmNewPassword: "",
      },
      errors: createInitialErrorState(),
    });
  };

  onChangeConfirmationDialogStatus = (isOpened: boolean) => {
    this.setState({
      ...this.state,
      makeAdminDialogIsOpened: isOpened,
    });
  };

  onChange = (e: any) => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });
  };

  onChangePausedStatus = async () => {
    const { data } = this.state;
    let newData = data;
    await this.props.updateUserForAdmin(newData);
  };

  onChangeAdminStatus = async () => {
    const { data } = this.state;
    let newData = data;
    newData.isAdmin = !data.isAdmin;
    await this.props.updateUserForAdmin(data);
  };

  onSubmit = async (e: any) => {
    e.preventDefault();
    const { updateUserForAdmin, navigateToAdminPage } = this.props;
    const { data } = this.state;
    const errors = createInitialErrorState();
    this.setState({ errors });

    if (data.firstName.length === 0) {
      errors.firstName = "Can't be void";
    }

    if (data.lastName.length === 0) {
      errors.lastName = "Can't be void";
    }

    if (!data.emailAddress || !isEmail(data.emailAddress))
      errors.emailAddress = "Invalid email";

    if (data.newPassword && !isValidPassword(data.newPassword))
      errors.newPassword = "Password is too weak";

    if (data.newPassword !== data.confirmNewPassword) {
      errors.confirmNewPassword = "Passwords do not match";
    }

    const hasErrors = Object.values(errors).some(
      (error: string) => error.length !== 0
    );

    if (!hasErrors) {
      await updateUserForAdmin(data);
      navigateToAdminPage();
    } else {
      this.setState({ errors });
    }
  };

  render() {
    const { classes, user, selectedUser, isEditingUser } = this.props;
    const { isInitialized, makeAdminDialogIsOpened, data, errors } = this.state;

    if (!selectedUser) return null;

    if (!isInitialized) {
      this.initializeForm();
    }

    return (
      <main className={classes.main}>
        <Grid container spacing={4}>
          <Grid item sm={4}>
            <Button
              fullWidth
              variant="contained"
              disabled={isEditingUser}
              onClick={() => {
                this.props.impersonateUser(selectedUser);
                this.props.navigateToDashboardPage();
              }}
              style={{
                marginBottom: "5px",
                width: "auto",
                background: "red",
                color: "white",
                padding: "15px",
              }}
            >
              IMPERSONATE USER
            </Button>
          </Grid>
          <Grid item sm={4}>
            {user.id !== selectedUser.id && (
              <Button
                fullWidth
                variant="contained"
                disabled={
                  isEditingUser ||
                  selectedUser.isPaused ||
                  user.id === selectedUser.id
                }
                onClick={() => this.onChangeConfirmationDialogStatus(true)}
                style={{
                  marginBottom: "5px",
                  width: "auto",
                  padding: "15px",
                }}
              >
                {selectedUser.isAdmin ? "UNMAKE ADMIN" : "MAKE ADMIN"}
              </Button>
            )}
          </Grid>
          <Grid item sm={4}>
            {user.id !== selectedUser.id && (
              <Button
                fullWidth
                variant="contained"
                disabled={
                  isEditingUser ||
                  selectedUser.isAdmin ||
                  user.id === selectedUser.id
                }
                onClick={
                  async () => await this.onChangePausedStatus()
                  //changePausedStatus(selectedUser.id, !selectedUser.isPaused)
                }
                style={{
                  marginBottom: "5px",
                  width: "auto",
                  padding: "15px",
                }}
              >
                {selectedUser.isPaused ? "UNPAUSE USER" : "PAUSE USER "}
              </Button>
            )}
          </Grid>
        </Grid>

        <Paper elevation={2} className={classes.paper}>
          <Typography component="h1" variant="h5">
            Edit User
          </Typography>
          <form className={classes.form} onSubmit={this.onSubmit}>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="firstName">User Id</InputLabel>
              <Input
                id="selectedUsedId"
                name="selectedUserId"
                disabled
                value={data.id}
              />
            </FormControl>

            <FormControl margin="normal" fullWidth error={!!errors.firstName}>
              <InputLabel htmlFor="firstName">First Name</InputLabel>
              <Input
                id="firstName"
                name="firstName"
                autoFocus
                autoComplete="off"
                value={data.firstName}
                onChange={this.onChange}
              />
              {errors.firstName && (
                <FormHelperText>{errors.firstName}</FormHelperText>
              )}
            </FormControl>

            <FormControl margin="normal" fullWidth error={!!errors.lastName}>
              <InputLabel htmlFor="lastName">Last Name</InputLabel>
              <Input
                id="lastName"
                name="lastName"
                autoComplete="off"
                value={data.lastName}
                onChange={this.onChange}
              />
              {errors.lastName && (
                <FormHelperText>{errors.lastName}</FormHelperText>
              )}
            </FormControl>

            <FormControl
              margin="normal"
              fullWidth
              error={!!errors.emailAddress}
            >
              <InputLabel htmlFor="emailAddress" required>
                Email Address
              </InputLabel>
              <Input
                id="emailAddress"
                name="emailAddress"
                value={data.emailAddress}
                autoComplete="off"
                onChange={this.onChange}
              />
              {errors.emailAddress && (
                <FormHelperText>{errors.emailAddress}</FormHelperText>
              )}
            </FormControl>

            <FormControl margin="normal" fullWidth error={!!errors.newPassword}>
              <InputLabel htmlFor="newPassword">Change Password</InputLabel>
              <Input
                name="newPassword"
                type="password"
                id="newPassword"
                value={data.newPassword}
                onChange={this.onChange}
              />
              {errors.newPassword && (
                <FormHelperText style={{ paddingTop: "10px", fontSize: 13 }}>
                  {passwordRequirements}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              margin="normal"
              fullWidth
              error={!!errors.confirmNewPassword}
            >
              <InputLabel htmlFor="confirmPassword">
                Confirm New Password
              </InputLabel>
              <Input
                name="confirmNewPassword"
                type="password"
                id="confirmNewPassword"
                value={data.confirmNewPassword}
                onChange={this.onChange}
              />
              {errors.confirmNewPassword && (
                <FormHelperText>{errors.confirmNewPassword}</FormHelperText>
              )}
            </FormControl>

            <Button
              className={classes.submit}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isEditingUser}
            >
              Submit
            </Button>
          </form>
        </Paper>

        <div>
          <ConfirmationDialog
            isOpened={makeAdminDialogIsOpened}
            dialogTitle="Set Admin status"
            dialogText={
              selectedUser.isAdmin
                ? "Are you sure you want to remove Admin permissions to this user?"
                : "Are you sure you want to give Admin permissions to this user?"
            }
            onConfirm={async () => {
              //await changeAdminStatus(selectedUser.id, !selectedUser.isAdmin);
              await this.onChangeAdminStatus();
              this.onChangeConfirmationDialogStatus(false);
            }}
            onClose={() => this.onChangeConfirmationDialogStatus(false)}
          />
        </div>
      </main>
    );
  }
}

const mapStateToProps = (storeState: StoreState) => ({
  isEditingUser: storeState.admin.isEditingUser,
  user: storeState.authentication.user,
});

export default connect(mapStateToProps, {
  updateUserForAdmin,
  impersonateUser,
  navigateToDashboardPage,
  navigateToAdminPage,
})(withStyles(styles)(AdminUsersView));
