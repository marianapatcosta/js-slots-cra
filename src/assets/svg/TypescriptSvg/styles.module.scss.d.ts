export type Styles = {
  'icon': string;
  'sparkle': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
