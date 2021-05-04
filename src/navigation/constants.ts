import {Splash, Home} from '../containers';
import {ComponentType} from 'react';
export enum ScreenNames {
  SPLASH = 'Splash',
  HOME = 'Home',
}
export const Screens: {
  screen: ScreenNames;
  component: ComponentType;
}[] = [
  {
    screen: ScreenNames.SPLASH,
    component: Splash,
  },
  {
    screen: ScreenNames.HOME,
    component: Home,
  },
];
