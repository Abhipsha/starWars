import {Splash, Home, Details} from '../containers';
import {ComponentType} from 'react';
export enum ScreenNames {
  SPLASH = 'Splash',
  HOME = 'Home',
  DETAILS = 'Details',
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
  {
    screen: ScreenNames.DETAILS,
    component: Details,
  },
];
