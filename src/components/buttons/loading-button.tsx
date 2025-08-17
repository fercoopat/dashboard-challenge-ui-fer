import { Loader2Icon } from 'lucide-react';
import { memo } from 'react';

import { Button, ButtonProps } from '@/components/ui/button';

type Props = ButtonProps & {
  isPending: boolean;
};
const LoadingButton = ({ children, isPending, ...props }: Props) => {
  return (
    <Button disabled={isPending || props?.disabled} {...props}>
      {!isPending ? children : <Loader2Icon className='animate-spin' />}
    </Button>
  );
};
export default memo(LoadingButton);
