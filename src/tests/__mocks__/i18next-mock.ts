const i18n = {
  init: () => {},
  t: (k: string) => k,
  use: () => {
    return i18n;
  },
};
export default i18n;
