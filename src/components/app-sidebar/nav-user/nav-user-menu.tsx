import { LogOutIcon, UserCircleIcon } from 'lucide-react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useSidebar } from '@/components/ui/sidebar';
import { useLogout } from '@/modules/auth/hooks/use-logout';
import { User } from '@/modules/security/user/schemas/user.schema';

type Props = {
  user: User | null;
  onLogout: () => void;
};

const NavUserMenu = ({ user, onLogout }: Props) => {
  const { isMobile } = useSidebar();

  const { t } = useTranslation(['auth', 'sidebar']);

  const { onLogout: handleLogout } = useLogout(onLogout);

  return (
    <DropdownMenuContent
      className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
      side={isMobile ? 'bottom' : 'right'}
      align='end'
      sideOffset={4}
    >
      <DropdownMenuLabel className='p-0 font-normal'>
        <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
          <Avatar className='h-8 w-8 rounded-lg'>
            <AvatarImage src={user?.avatar} alt={user?.name} />

            <AvatarFallback className='rounded-lg'>{user?.name}</AvatarFallback>
          </Avatar>

          <div className='grid flex-1 text-left text-sm leading-tight'>
            <span className='truncate font-semibold'>{user?.name}</span>

            <span className='truncate text-xs'>{user?.email}</span>
          </div>
        </div>
      </DropdownMenuLabel>

      <DropdownMenuSeparator />

      <DropdownMenuGroup>
        <DropdownMenuItem>
          <UserCircleIcon />

          {t('sidebar:nav-user.account')}
        </DropdownMenuItem>
      </DropdownMenuGroup>

      <DropdownMenuSeparator />

      <DropdownMenuItem onClick={handleLogout}>
        <LogOutIcon />

        {t('logout.title')}
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};

export default memo(NavUserMenu);
