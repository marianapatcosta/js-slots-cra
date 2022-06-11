export type Styles = {
  'modal__content': string;
  'modal__header': string;
  'modal__main': string;
  'modal__overlay': string;
  'modal__overlay-enter-active': string;
  'modal__overlay-enter-done': string;
  'modal__overlay-exit-active': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
