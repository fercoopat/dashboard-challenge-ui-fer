import { Form } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

type OmitFormProps = PropsWithChildren<
  Omit<React.ComponentProps<'form'>, 'onSubmit'>
>;

export type FormContainerProps<T extends FieldValues = FieldValues> = {
  form: UseFormReturn<T>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
};

type Props<T extends FieldValues = FieldValues> = OmitFormProps &
  FormContainerProps<T> & {
    className?: string;
  };

export function FormContainer<T extends FieldValues>({
  children,
  className,
  form,
  onSubmit,
  ...props
}: Props<T>) {
  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        className={cn('space-y-6', className)}
        {...props}
      >
        {children}
      </form>
    </Form>
  );
}
