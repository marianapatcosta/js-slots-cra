export type Styles = {
  'hide': string;
  'icon__eye': string;
  'icon__eye-ball': string;
  'icon__leaves': string;
  'shake-all': string;
  'shake-middle': string;
  'squeeze': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
