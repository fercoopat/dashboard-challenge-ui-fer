import { memo, PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  active: boolean;
  alternative?: React.ReactNode;
}>;

/**
 * Renders `children` if `active` is true, otherwise renders `alternative`.
 *
 * @param active - Whether to render children.
 * @param alternative - Optional fallback content to render when inactive.
 */
const ConditionContainer = ({
  children,
  active = false,
  alternative = null,
}: Props) => {
  return active ? children : alternative;
};

export default memo(ConditionContainer);
