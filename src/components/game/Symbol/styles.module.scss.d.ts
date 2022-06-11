export type Styles = {
  'bg-color-change': string;
  'fade-in': string;
  'fade-out': string;
  'symbol': string;
  'symbol--colorful': string;
  'symbol--hidden': string;
  'symbol--showing': string;
  'symbol--spinning': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
