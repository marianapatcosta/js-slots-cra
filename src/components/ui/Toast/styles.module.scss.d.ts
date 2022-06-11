export type Styles = {
  'toast': string;
  'toast__close': string;
  'toast__content': string;
  'toast--alert': string;
  'toast--info': string;
  'toast--success': string;
  'toast--warning': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
