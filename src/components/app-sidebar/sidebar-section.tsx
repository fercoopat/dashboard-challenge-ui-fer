import { memo } from 'react';

import { AppSidebarSection } from '@/components/app-sidebar/app-sidebar-options';
import SidebarOption from '@/components/app-sidebar/sidebar-option';
import { SidebarGroup, SidebarGroupLabel } from '@/components/ui/sidebar';

type Props = {
  section: AppSidebarSection;
};

const SidebarSection = ({ section }: Props) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{section?.title}</SidebarGroupLabel>

      {section?.options?.map((option, index) => (
        <SidebarOption key={`${option?.title}_${index}`} option={option} />
      ))}
    </SidebarGroup>
  );
};

export default memo(SidebarSection);
