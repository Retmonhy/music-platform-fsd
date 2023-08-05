import { Box, Link } from '@material-ui/core';
import { useRouter } from 'next/router';

import { useAppDispatch } from '@shared/hooks';

import { menuList } from '../const';

interface IMenuItem {
  name: string;
  isSelected: boolean;
  href: string;
}
export const LeftSideMenu = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const navigateToRoute = (route: string) => {
    router.push(route);
  };
  // useEffect(() => {
  //   if (window) {
  //     dispatch(changeRouteTo(window.location.pathname));
  //   }
  // }, []);
  return (
    <Box className='menu'>
      <Box className='menu__wrapper'>
        <ul className='menu__list'>
          {menuList.map((item) => {
            return (
              <li className={item.isSelected ? 'list-item list-item_selected' : 'list-item'} key={item.name}>
                <Link onClick={() => navigateToRoute(item.href)}>{item.name}</Link>
              </li>
            );
          })}
        </ul>
      </Box>
    </Box>
  );
};
