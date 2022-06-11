export type Styles = {
  'icon': string;
  'moveToBottom': string;
  'moveToLeft': string;
  'moveToRight': string;
  'moveToTop': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
