import { Store, StoreValue } from 'effector';
import { useStoreMap } from 'effector-react';

type Output =
  | React.InputHTMLAttributes<HTMLInputElement>['value']
  | React.InputHTMLAttributes<HTMLTextAreaElement>['value'];

export const useFormField = ({
  store,
  name,
}: {
  store: Store<any>;
  name: string;
}): Output =>
  useStoreMap({
    store,
    keys: [name],
    fn: (value, [key]) => value[key as keyof StoreValue<typeof store>] ?? '',
  });

type CreateField = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
) => Record<string, string>;

export const createField: CreateField = (e) => ({
  [e.target.name]: e.target.value,
});
