import { LoaderIcon } from 'lucide-react';

const PageLoader = () => {
  return (
    <div className='bg-background/80 backdrop-blur-sm flex items-center justify-center h-screen w-screen'>
      <LoaderIcon className='animate-spin' />
    </div>
  );
};
export default PageLoader;
