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
              c={index === props.breadcrumbs.length - 1 ? 'dark' : 'ghost'}
              onClick={item.onClick}
            >
              {item.label}
            </Anchor>
          ))}
        </Breadcrumbs>
      )}

      <Title order={2}>{props.title}</Title>

      {props.description && (
        <Text size="sm" c="ghost">
          {props.description}
        </Text>
      )}
    </Box>
  );
};
