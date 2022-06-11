export type Styles = {
  'wins-display': string;
  'wins-display__coin': string;
  'wins-display__display': string;
  'wins-display__display--green': string;
  'wins-display__display-wrapper': string;
  'wins-display__spins': string;
  'wins-display__tag': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
