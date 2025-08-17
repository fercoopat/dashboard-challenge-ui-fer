import { AlertCircle } from 'lucide-react';
import { memo } from 'react';

import { Alert, AlertDescription } from '@/components/ui/alert';

type Props = {
  showError: boolean;
  errorMessage: string | undefined;
};
const ErrorAlertMessage = ({
  errorMessage = 'Ha ocurrido un error al cargar los datos del dashboard.',
  showError = false,
}: Props) => {
  if (!showError) {
    return null;
  }

  return (
    <Alert variant='destructive'>
      <AlertCircle className='h-4 w-4' />
      <AlertDescription>{errorMessage}</AlertDescription>
    </Alert>
  );
};
export default memo(ErrorAlertMessage);
