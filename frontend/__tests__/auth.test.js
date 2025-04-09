// __tests__/auth.test.js
import { jest } from '@jest/globals';

// Create the mock function
const mockJwtDecode = jest.fn();

// Register the mock before any imports
jest.unstable_mockModule('jwt-decode', () => ({
  jwtDecode: mockJwtDecode,
}));

// Variables to store dynamically imported functions
let saveUser, getToken, isLoggedIn, getUser, logout;

global.localStorage = {
  store: {},
  getItem(key) {
    return this.store[key] || null;
  },
  setItem(key, value) {
    this.store[key] = value.toString();
  },
  removeItem(key) {
    delete this.store[key];
  },
  clear() {
    this.store = {};
  },
};

beforeAll(async () => {
  // Dynamically import AFTER mocks are registered
  const auth = await import('../src/utils/auth');
  saveUser = auth.saveUser;
  getToken = auth.getToken;
  isLoggedIn = auth.isLoggedIn;
  getUser = auth.getUser;
  logout = auth.logout;
});

describe('auth.js utility functions', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('saveUser stores the user in localStorage', () => {
    const user = { id: 1, role: 'admin' };
    saveUser(user);
    expect(localStorage.getItem('user')).toBe(JSON.stringify(user));
  });

  test('getToken returns token from localStorage', () => {
    localStorage.setItem('token', '123abc');
    expect(getToken()).toBe('123abc');
  });

  describe('isLoggedIn', () => {
    test('returns false if no token', () => {
      expect(isLoggedIn()).toBe(false);
    });

    test('returns false if token is invalid', () => {
      localStorage.setItem('token', 'bad.token');
      mockJwtDecode.mockImplementation(() => {
        throw new Error('invalid');
      });
      expect(isLoggedIn()).toBe(false);
    });

    test('returns true for valid, unexpired token with role', () => {
      const future = Math.floor(Date.now() / 1000) + 1000;
      mockJwtDecode.mockReturnValue({ exp: future, role: 'admin' });
      localStorage.setItem('token', 'valid.token');
      expect(isLoggedIn()).toBe(true);
    });

    test('returns false for expired token', () => {
      const past = Math.floor(Date.now() / 1000) - 1000;
      mockJwtDecode.mockReturnValue({ exp: past, role: 'admin' });
      localStorage.setItem('token', 'expired.token');
      expect(isLoggedIn()).toBe(false);
    });
  });

  describe('getUser', () => {
    test('returns null if no token', () => {
      expect(getUser()).toBeNull();
    });

    test('returns null if token is invalid', () => {
      localStorage.setItem('token', 'bad.token');
      mockJwtDecode.mockImplementation(() => {
        throw new Error('broken');
      });
      expect(getUser()).toBeNull();
    });

    test('returns decoded user for valid token', () => {
      const user = { id: 42, role: 'user' };
      mockJwtDecode.mockReturnValue(user);
      localStorage.setItem('token', 'valid.token');
      expect(getUser()).toEqual(user);
    });
  });

  test('logout returns true if token exists', () => {
    localStorage.setItem('token', 'loggedin');
    expect(logout()).toBe(true);
  });

  test('logout returns false if token does not exist', () => {
    expect(logout()).toBe(false);
  });
});
