import { AppLayout } from '@/Layouts/AppLayout.jsx';
import { Container, Title } from '@mantine/core';

const Dashboard = (props) => {
  return (
    <AppLayout
      title={props.title}
      user={props.auth.user}
      notification={props.notification}
    >
      <Container flex={1} size="xl">
        <Title mb={32}>{props.title}</Title>
      </Container>
    </AppLayout>
  );
};

export default Dashboard;
