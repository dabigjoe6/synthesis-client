import * as React from 'react';
import SignInBtn from "./SignInBtn";


const GoogleSignIn = (props: any) => {
  return <SignInBtn text="Sign in with Google" icon="G" {...props} />;
};

export default GoogleSignIn;
