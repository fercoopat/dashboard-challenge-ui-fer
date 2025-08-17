import { Fragment, useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default function AppBreadcrumb() {
  const { pathname } = useLocation();

  const paths = useMemo(
    () => pathname?.split('/')?.filter((path) => !!path),
    [pathname]
  );

  const showSeparator = useCallback(
    (index: number): boolean => index !== paths?.length - 1,
    [paths?.length]
  );

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {paths?.map((path, index) => (
          <Fragment key={`${path}_${index}`}>
            <BreadcrumbItem className='hidden md:block'>
              <BreadcrumbLink href='#' asChild>
                <Link to={path}>{path}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            {showSeparator(index) && (
              <BreadcrumbSeparator className='hidden md:block' />
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
