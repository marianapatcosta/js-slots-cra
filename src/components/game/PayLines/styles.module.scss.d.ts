export type Styles = {
  'pay-lines': string;
  'pay-lines__number': string;
  'pay-lines-enter-active': string;
  'pay-lines-enter-done': string;
  'pay-lines-exit': string;
  'pay-lines-exit-active': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
