import { VacuumNavigationItemComponent } from '../desktop-navigation/navigation-item.component';

export const NavigationClicked = 'navigationClicked';

export interface NavigationClickedEvent {
  navItem: VacuumNavigationItemComponent;
}
