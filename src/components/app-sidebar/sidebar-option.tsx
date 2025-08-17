import { memo, useMemo } from 'react';
import { Link } from 'react-router';

import { AppSidebarOption } from '@/components/app-sidebar/app-sidebar-options';
import SidebarOptionCollapsible from '@/components/app-sidebar/sidebar-option-collapsible';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

type Props = {
  option: AppSidebarOption;
};

const SidebarOption = ({ option }: Props) => {
  const Icon = useMemo(() => option?.icon, [option?.icon]);

  return (
    <SidebarMenu>
      {!option?.items?.length ? (
        <SidebarMenuItem>
          <SidebarMenuButton asChild tooltip={option?.title}>
            <Link to={option.url}>
              <Icon />
              <span>{option?.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ) : (
        <SidebarOptionCollapsible option={option} />
      )}
    </SidebarMenu>
  );
};

export default memo(SidebarOption);
