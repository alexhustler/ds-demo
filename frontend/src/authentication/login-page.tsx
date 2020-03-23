import React from "react";
import { connect } from "react-redux";

import { StoreState } from "../redux/configure-store";
import { submitLoginForm } from "./authentication-actions";
import LoginForm from "./login-form";

interface LoginPageProps {
  isLoginFailed: boolean;
  isSubmittingLoginForm: boolean;
  submitLoginForm: Function;
}

const LoginPage = (props: LoginPageProps) => {
  return (
    <LoginForm
      onSubmit={props.submitLoginForm}
      isLoginFailed={props.isLoginFailed}
      isSubmittingLoginForm={props.isSubmittingLoginForm}
    />
  );
};

const mapStateToProps = (storeState: StoreState) => ({
  isLoginFailed: storeState.authentication.isLoginFailed,
  isSubmittingLoginForm: storeState.authentication.isSubmittingLoginForm,
});

export default connect(mapStateToProps, { submitLoginForm })(LoginPage);
