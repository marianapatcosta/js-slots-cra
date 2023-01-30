# JS Slot Machine

JS Slot Machine is a Progressive web app with a regular slot machine game that has the logos of main JS-related tools as symbols. Deployed at [https://marianapatcosta.github.io/js-slots-cra](https://marianapatcosta.github.io/js-slots-cra/).
![Group 732](https://user-images.githubusercontent.com/43031902/173261946-f224abab-e06c-4104-abec-93d62f0d3d25.png)

## Implemented Functionalities

### Game features

- Slot Machine with 5 reels (with > 30 symbols) and 3 rows, with 9 Pay lines.
- Follows the general rules of slot games, i.e, it aims to make the symbols spin and then check if you have combinations of 3 or more equal symbols displayed at one of the 9 possible winning lines;
- Different win factor according to symbol frequency and number of symbol matches (from 3 to 5);
- Customizable bet amount;
- AutoSpin capability;
- Free spinnings;
- Bonus WildCards;
- Big winning due to win amount multipliers;
- Special Symbols;

- ![image](https://user-images.githubusercontent.com/43031902/173920878-d7fe0088-e3c7-486e-a544-32e149eabd07.png)
- Sounds on button click, winning, loss and spinning;
- Lights blinking on winning and animation on matching symbols (including when Bonus wildcards are won);

### General features

- Offline capability;
- Instalable in your device;
- Responsive design;
- Dark theme;
- Background theme;
- Multilanguage (English and Portuguese);
- Share game url;

#### Lighthouse report for Desktop

- ![image](https://user-images.githubusercontent.com/43031902/173262595-c8bd50c2-0060-423d-a21d-75bc51f0596a.png)

## Technical Stack

- **TypeScript**;
- **React** (use of functional components and hooks, portal, context, custom hooks);
- **Redux** (including persistence middleware to store state at localStorage);
- **Webpack /CRA**;
- **SCSS modules** with BEM methodology;
- **typed-scss-modules** (to generate TypeScript definitions for SCSS modules);
- **HTML Canvas** (for drawing Pay Lines);
- **react-i18next** for internationalization;
- **CSS animations** (for symbol SVGs and fake loader);
- **Jest** and **React Testing library** (for some unit tests with test coverage);
- **react-transition-group** (for modal/toast transitions);
- **GreenSock Animation Platform (GSAP)** (for spin animation);
- Basic ESlint and Prettier configs;
- **GitHub actions**
  ![image](https://user-images.githubusercontent.com/43031902/173264210-05fb9ae1-81d5-4b78-b172-5c88f1776cce.png)
- Cypress (basic setup only);

### What I've used but had to let go

#### Vite ([repo](https://github.com/marianapatcosta/js-slots-vite) and [deploy](https://marianapatcosta.github.io/js-slots-vite/) )

- Error on running unit tests due to a supposed error with _react-i18n_ and _vite-plugin-pwa_ mocks;
- Tool to generate type definitions for scss (_vite-plugin-sass-dts_) caused errors;
- Problems when registering web workers;

## Issues
### Spin animation is buggy (after stop spinning, there is a 'jump' to show the win screen)
#### Attempts:
- no tool animation;
- GSAP animation of all symbols, of reel as a whole, both depending on isSpinning redux state; 
- Add the final slot screen symbols at the end of spinning;
- Prepare the shuffled reels with final slot screen symbols before spinning (but reels do not stay at proper position, showing the wrong symbols for final slot screen);
- DOM manipulation with ids and determining the visible reels by assessing top css property (ugly code);
- useImperativeHandle hook to execute reel animation from parent component and overcome the state update issue was not working;

### CRA 
- no support for path alias (add *craco* to overcome this issue);
- Cypress configuration needs several additional packages and I could not run the first test I wrote  because `cypress/webpack-preprocessor` (needed e.g. to load scss files) is incompatible with React v18.1.

## Available Scripts

In the project directory, you can run:

### `yarn install`

Installs all the dependencies required to run and develop this application.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn build`

Build a production-ready application.

### `yarn lint`

Run linter command.

### `yarn validate-ts`

Runs TypeScript validator

### `yarn gen-scss-types`

Runs typed-scss-modules and generates types for scss modules, keeping the namespace using BEM css methodology

### `yarn test:unit`

Launches the unit test runner in the interactive watch mode.

### `yarn test:unit-coverage`

Launches the unit test runner in the interactive watch mode and shows test coverage report.

### `yarn test:e2e`

Launches cypress tests.

### `yarn deploy`

Deploy the build app to GitHub pages.