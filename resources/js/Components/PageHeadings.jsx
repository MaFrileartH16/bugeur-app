import { Anchor, Box, Breadcrumbs, Text, Title } from '@mantine/core';

export const PageHeadings = (props) => {
  return (
    <Box mb={32}>
      {props.breadcrumbs && (
        <Breadcrumbs separator=">" mb={16}>
          {props.breadcrumbs.map((item, index) => (
            <Anchor
              key={index}
              size="sm"
              c={index === props.breadcrumbs.length - 1 ? 'dark' : 'gray'}
              onClick={item.onClick}
            >
              {item.label}
            </Anchor>
          ))}
        </Breadcrumbs>
      )}

      {props.title && <Title order={1}>{props.title}</Title>}

      {props.description && (
        <Text size="sm" c="gray">
          {props.description}
        </Text>
      )}
    </Box>
  );
};
