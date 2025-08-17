import { LayoutDashboardIcon, type LucideIcon } from 'lucide-react';

import { DASHBOARD_PATHS } from '@/modules/dashboard/constants/dashboard.paths';

export type AppSidebarOption = {
  title: string;
  url: string;
  icon: LucideIcon;
  items?: { title: string; url: string }[];
};

export type AppSidebarSection = {
  title: string;
  options: AppSidebarOption[];
};

export const appSidebarSections: AppSidebarSection[] = [
  {
    title: 'nav-main.title',
    options: [
      {
        icon: LayoutDashboardIcon,
        title: 'nav-main.dashboard',
        url: DASHBOARD_PATHS.MAIN_PATH,
      },
    ],
  },
];
