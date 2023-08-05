import { AccountRoutes, Local } from '@shared/const';

export interface IMenuItem {
  name: string;
  isSelected: boolean;
  href: string;
}

export const menuList: IMenuItem[] = [
  {
    name: Local.Account.PersonalData,
    isSelected: false,
    href: AccountRoutes.Profile,
  },
  {
    name: Local.Account.MyMusic,
    isSelected: false,
    href: AccountRoutes.Tracks,
  },
  {
    name: Local.Account.MyPlaylists,
    isSelected: false,
    href: AccountRoutes.Playlists,
  },
  {
    name: Local.Account.Musition,
    isSelected: false,
    href: AccountRoutes.Musition,
  },
];
