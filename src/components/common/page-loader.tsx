import { LoaderIcon } from 'lucide-react';

const PageLoader = () => {
  return (
    <div className='size-screen flex flex-col items-center justify-center'>
      <LoaderIcon className='animate-spin' />
    </div>
  );
};
export default PageLoader;
