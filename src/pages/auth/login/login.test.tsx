import Login from './index'
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';



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

  //TODO: Write test for Google sign in

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

  //TODO: Write test for navigating to sign up form, forgot password form and reset password form
})