import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation('sidebar');

  const Icon = useMemo(() => option?.icon, [option?.icon]);

  return (
    <SidebarMenu>
      {!option?.items?.length ? (
        <SidebarMenuItem>
          <SidebarMenuButton asChild tooltip={t(option?.title)}>
            <Link to={option.url}>
              <Icon />
              <span>{t(option?.title)}</span>
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
