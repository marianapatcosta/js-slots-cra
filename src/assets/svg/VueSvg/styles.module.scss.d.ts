export type Styles = {
  'grow': string;
  'grow-small': string;
  'icon': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
