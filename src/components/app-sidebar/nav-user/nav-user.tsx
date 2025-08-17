import { ChevronRightIcon } from 'lucide-react';

import NavUserMenu from '@/components/app-sidebar/nav-user/nav-user-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { User } from '@/modules/security/user/schemas/user.schema';

type Props = {
  user: User | null;
  onLogout: () => void;
};
const NavUser = ({ user, onLogout }: Props) => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer'
            >
              <Avatar className='h-8 w-8 rounded-lg'>
                <AvatarImage src={user?.avatar} alt={user?.name} />

                <AvatarFallback className='rounded-lg'>
                  {user?.name}
                </AvatarFallback>
              </Avatar>

              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>{user?.name}</span>
                <span className='truncate text-xs'>{user?.email}</span>
              </div>
              <ChevronRightIcon className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <NavUserMenu user={user} onLogout={onLogout} />
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default NavUser;
