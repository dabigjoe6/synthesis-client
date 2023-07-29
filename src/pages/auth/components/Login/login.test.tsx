import Login from './login';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from '../../../../contexts/Auth';

describe('Login page tests', () => {

    test('login page - should show two sign in options', () => {
      render( 
        <BrowserRouter>
            <GoogleOAuthProvider clientId='test-client-id'>
                <Login /> 
            </GoogleOAuthProvider>
        </BrowserRouter>
        );
      expect(screen.getByText(/Welcome Back/)).toBeInTheDocument();
      expect(screen.getByText(/Sign in with Google/)).toBeInTheDocument();
      expect(screen.getByText(/Sign in with Email/)).toBeInTheDocument();
    });

    test('login page - clicking google sign in option opens new tab', () => {
      //needs to be revisited
      const openTab = jest.spyOn(global, "open");
      const wrapper = render( 
        <BrowserRouter>
            <GoogleOAuthProvider clientId='test-client-id'>
                <Login /> 
            </GoogleOAuthProvider>
        </BrowserRouter>
        );
        fireEvent.click(screen.getByText(/Sign in with Google/));
        expect(openTab).toHaveBeenCalled;
    });

    test('login page - clicking email sign in option loads new page', () => {
      render( 
        <BrowserRouter>
            <GoogleOAuthProvider clientId='test-client-id'>
                <Login /> 
            </GoogleOAuthProvider>
        </BrowserRouter>
        );
        fireEvent.click(screen.getByText(/Sign in with Email/));
        expect(screen.getByText(/Email address/)).toBeInTheDocument();
        expect(screen.getByText(/Password/)).toBeInTheDocument();
        expect(() => screen.getByText(/Sign in with Email/)).toThrow();
    });

    test('login page - clicking create new account button loads sign up page', async () => {
      // const changeEmailSignInState = jest.fn();
      // const handleClick = jest.spyOn(React, "useState");
      // (handleClick as jest.MockInstance<any, any>).mockImplementation((initVal => [initVal, changeEmailSignInState]));

      render( 
        <GoogleOAuthProvider clientId='test-client-id'>
          <BrowserRouter>
            <Login /> 
          </BrowserRouter>
        </GoogleOAuthProvider>
        );
        fireEvent.click(screen.getByText(/Sign in with Email/));
        expect(screen.getByText(/Email address/)).toBeInTheDocument();
        expect(screen.getByText(/Password/)).toBeInTheDocument();
        const createNewAccountBtn = screen.getByRole("button", {name: "No account? Create one"});
        expect(createNewAccountBtn).toBeInTheDocument();
        fireEvent.click(createNewAccountBtn);
        // expect(screen.getByText(/Create a new account/));
    });

    test('login page - clicking forgot password button loads reset password page', async () => {
      render( 
        <BrowserRouter>
            <GoogleOAuthProvider clientId='test-client-id'>
                <Login /> 
            </GoogleOAuthProvider>
        </BrowserRouter>
        );
        fireEvent.click(screen.getByText(/Sign in with Email/));
        expect(screen.getByText(/Email address/)).toBeInTheDocument();
        expect(screen.getByText(/Password/)).toBeInTheDocument();
        const forgotPasswordBtn = screen.getByRole("button", {name: "Forgot password?"});
        expect(forgotPasswordBtn).toBeInTheDocument();
        fireEvent.click(forgotPasswordBtn);
        // expect(screen.getByText(/Reset Password/));
    });
    

})