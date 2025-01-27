import { Text, Textarea as TextareaMantine } from '@mantine/core';

export const Textarea = ({ description, error, ...props }) => {
  return (
    <>
      {description && (
        <Text c="gray" mb={8}>
          {description}
        </Text>
      )}

      <TextareaMantine
        mt={description ? 0 : 8}
        {...props}
        styles={{
          input: {
            borderColor: error ? 'red' : undefined,
          },
        }}
      />

      {error && (
        <Text c="red" mt={8}>
          {error}
        </Text>
      )}
    </>
  );
};
