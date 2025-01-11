import { AppLayout } from '@/Layouts/AppLayout';

export const GuestLayout = (props) => {
  return <AppLayout title={props.title}>{props.children}</AppLayout>;
};
