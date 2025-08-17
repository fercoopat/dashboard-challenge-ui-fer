import { memo } from 'react';
import { Link } from 'react-router';

import { appSidebarSections } from '@/components/app-sidebar/app-sidebar-options';
import SidebarSection from '@/components/app-sidebar/sidebar-section';
import LogoIcon from '@/components/icons/logo.icon';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';

const AppSidebar = (props: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader className='p-4'>
        <Link to='/' className='flex items-center gap-2'>
          <LogoIcon className='size-5' />
          <span className='text-base font-semibold'>Airlytics</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {appSidebarSections?.map((section, index) => (
          <SidebarSection
            key={`${section?.title}_${index}`}
            section={section}
          />
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
};

export default memo(AppSidebar);
