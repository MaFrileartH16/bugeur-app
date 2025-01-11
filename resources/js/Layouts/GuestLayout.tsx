import { AppLayout } from '@/Layouts/AppLayout';

export const GuestLayout = (props) => {
  return <AppLayout pageTitle={props.pageTitle}>{props.children}</AppLayout>;
};
