export type Styles = {
  'blink-blue': string;
  'blink-green': string;
  'blink-orange': string;
  'blink-pink': string;
  'blink-yellow': string;
  'blinkRed': string;
  'lights': string;
  'lights__light': string;
  'lights__light--blink': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
