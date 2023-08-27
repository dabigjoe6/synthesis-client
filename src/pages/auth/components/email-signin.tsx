import * as React from 'react';
import SignInBtn from "./signin-btn";

const EmailSignIn = (props: any) => {
  return <SignInBtn text="Sign in with Email" icon="@" {...props} />;
};

export default EmailSignIn;
