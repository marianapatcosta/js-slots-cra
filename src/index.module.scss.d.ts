export type Styles = {
  'app': string;
  'app--loading': string;
  'toast-enter': string;
  'toast-enter-active': string;
  'toast-exit': string;
  'toast-exit-active': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
