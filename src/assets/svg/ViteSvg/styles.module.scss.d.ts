export type Styles = {
  'bolt': string;
  'boom': string;
  'icon__bolt': string;
  'icon__boom': string;
  'icon__star': string;
  'sparkle': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
