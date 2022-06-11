export type Styles = {
  'icon': string;
  'scale': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
