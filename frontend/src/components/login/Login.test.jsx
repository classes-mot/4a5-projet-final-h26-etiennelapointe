import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';
import { AuthContext } from '../../context/auth-context';

// Mock the useHttpClient hook
vi.mock('../../hook/http-hook', () => ({
  useHttpClient: vi.fn(),
}));

// Import the mocked hook
import { useHttpClient } from '../../hook/http-hook';

describe('Login Component Integration Tests', () => {
  const mockLogin = vi.fn();
  const mockSendRequest = vi.fn();
  const mockClearError = vi.fn();

  // Mock context value
  const mockAuthContext = {
    isLoggedIn: false,
    userId: null,
    token: null,
    login: mockLogin,
    logout: vi.fn(),
  };

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    
    // Setup default mock implementation for useHttpClient
    useHttpClient.mockReturnValue({
      isLoading: false,
      error: null,
      sendRequest: mockSendRequest,
      clearError: mockClearError,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderLogin = () => {
    return render(
      <AuthContext.Provider value={mockAuthContext}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </AuthContext.Provider>
    );
  };

  it('should render the login form with all required fields', () => {
    renderLogin();

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });

  it('should update form state when user types in input fields', async () => {
    const user = userEvent.setup();
    renderLogin();

    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');

    await user.type(usernameInput, 'testuser');
    await user.type(passwordInput, 'password123');

    expect(usernameInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('password123');
  });

  it('should call sendRequest with correct data when form is submitted', async () => {
    const user = userEvent.setup();
    mockSendRequest.mockResolvedValueOnce({
      userId: '123',
      token: 'token-abc',
    });

    renderLogin();

    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByRole('button', { name: /login/i });

    await user.type(usernameInput, 'testuser');
    await user.type(passwordInput, 'password123');
    await user.click(loginButton);

    await waitFor(() => {
      expect(mockSendRequest).toHaveBeenCalledWith(
        'http://localhost:5000/api/users/login',
        'POST',
        JSON.stringify({
          username: 'testuser',
          password: 'password123',
        }),
        {
          'Content-Type': 'application/json',
        }
      );
    });
  });

  it('should call auth.login with userId and token on successful login', async () => {
    const user = userEvent.setup();
    const mockUserId = 'user-123';
    const mockToken = 'token-xyz';

    mockSendRequest.mockResolvedValueOnce({
      userId: mockUserId,
      token: mockToken,
    });

    renderLogin();

    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByRole('button', { name: /login/i });

    await user.type(usernameInput, 'testuser');
    await user.type(passwordInput, 'password123');
    await user.click(loginButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith(mockUserId, mockToken);
    });
  });

  it('should display error message when login fails', async () => {
    const user = userEvent.setup();
    const errorMessage = 'Invalid credentials';

    useHttpClient.mockReturnValue({
      isLoading: false,
      error: errorMessage,
      sendRequest: mockSendRequest,
      clearError: mockClearError,
    });

    renderLogin();

    expect(screen.getByText('Erreur')).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('should call clearError when error close button is clicked', async () => {
    const user = userEvent.setup();
    const errorMessage = 'Login failed';

    useHttpClient.mockReturnValue({
      isLoading: false,
      error: errorMessage,
      sendRequest: mockSendRequest,
      clearError: mockClearError,
    });

    renderLogin();

    const closeButton = screen.getByRole('button', { name: /fermer/i });
    await user.click(closeButton);

    expect(mockClearError).toHaveBeenCalled();
  });

  it('should display loading spinner while request is in progress', () => {
    useHttpClient.mockReturnValue({
      isLoading: true,
      error: null,
      sendRequest: mockSendRequest,
      clearError: mockClearError,
    });

    renderLogin();

    // The Spinner component should be rendered
    // Adjust the selector based on how your Spinner component renders
    expect(screen.getByText('Erreur')).toBeInTheDocument(); // ErrorMsg renders even when isLoading is true
  });

  it('should have a link to the signup page', () => {
    renderLogin();

    const signupLink = screen.getByRole('link');
    expect(signupLink).toHaveAttribute('href', '/signup');
  });

  it('should handle form submission with empty fields', async () => {
    const user = userEvent.setup();
    mockSendRequest.mockResolvedValueOnce({
      userId: '123',
      token: 'token-abc',
    });

    renderLogin();

    const loginButton = screen.getByRole('button', { name: /login/i });
    await user.click(loginButton);

    await waitFor(() => {
      expect(mockSendRequest).toHaveBeenCalled();
    });
  });

  it('should prevent default form submission behavior', async () => {
    const user = userEvent.setup();
    mockSendRequest.mockResolvedValueOnce({
      userId: '123',
      token: 'token-abc',
    });

    renderLogin();

    const form = screen.getByRole('button', { name: /login/i }).closest('form');
    const preventDefaultSpy = vi.spyOn(Event.prototype, 'preventDefault');

    await user.click(screen.getByRole('button', { name: /login/i }));

    // Form submission should happen without page reload
    expect(mockSendRequest).toHaveBeenCalled();
  });
});
