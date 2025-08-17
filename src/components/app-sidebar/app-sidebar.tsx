import { memo } from 'react';

import { appSidebarSections } from '@/components/app-sidebar/app-sidebar-options';
import SidebarSection from '@/components/app-sidebar/sidebar-section';
import { Sidebar, SidebarContent, SidebarRail } from '@/components/ui/sidebar';

const AppSidebar = (props: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible='icon' {...props}>
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
