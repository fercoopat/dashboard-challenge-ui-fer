import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { AppSidebarSection } from '@/components/app-sidebar/app-sidebar-options';
import SidebarOption from '@/components/app-sidebar/sidebar-option';
import { SidebarGroup, SidebarGroupLabel } from '@/components/ui/sidebar';

type Props = {
  section: AppSidebarSection;
};

const SidebarSection = ({ section }: Props) => {
  const { t } = useTranslation('sidebar');

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{t(section?.title)}</SidebarGroupLabel>

      {section?.options?.map((option, index) => (
        <SidebarOption key={`${option?.title}_${index}`} option={option} />
      ))}
    </SidebarGroup>
  );
};

export default memo(SidebarSection);
