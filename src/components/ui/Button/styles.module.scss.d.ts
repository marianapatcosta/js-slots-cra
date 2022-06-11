export type Styles = {
  'button': string;
  'button--pressed': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
