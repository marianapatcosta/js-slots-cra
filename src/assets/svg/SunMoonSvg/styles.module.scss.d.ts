export type Styles = {
  'icon__moon': string;
  'icon__moon--dark': string;
  'icon__sun': string;
  'icon__sun--dark': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
