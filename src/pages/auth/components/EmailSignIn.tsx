import * as React from 'react';
import SignInBtn from "./SignInBtn";

const EmailSignIn = (props: any) => {
  return <SignInBtn text="Sign in with Email" icon="@" {...props} />;
};

export default EmailSignIn;
