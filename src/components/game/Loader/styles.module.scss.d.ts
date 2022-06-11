export type Styles = {
  'bouncing': string;
  'loader': string;
  'loader__progress': string;
  'loader__progress-wrapper': string;
  'loader__slot': string;
  'loader-enter': string;
  'loader-enter-active': string;
  'loader-exit': string;
  'loader-exit-active': string;
  'move': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
