import { useTranslation } from 'react-i18next';

import { genericMemo } from '@/lib/helpers/react.helpers';

type Props = {
  ns: string;
  value: string;
};

const TranslationCell = ({ ns = 'common', value = '' }: Props) => {
  const { t } = useTranslation(ns);

  return <span>{t(value)}</span>;
};

export default genericMemo(TranslationCell);
