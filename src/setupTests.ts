import '@testing-library/jest-dom';
global.matchMedia =
  global.matchMedia ||
  (query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));

global.navigator = global.navigator || {
  share: jest.fn().mockImplementation(() => Promise.resolve()),
};
