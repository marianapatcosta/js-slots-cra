export type Styles = {
  'enter': string;
  'fade': string;
  'icon': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
