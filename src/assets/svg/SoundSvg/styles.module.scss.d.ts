export type Styles = {
  'icon': string;
  'icon__line--off': string;
  'icon__wave--off': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
