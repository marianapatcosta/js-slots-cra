export type Styles = {
  'slot': string;
  'slot__adapter': string;
  'slot__handler': string;
  'slot__letter': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
