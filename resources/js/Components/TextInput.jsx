import { Text, TextInput as TextInputMantine } from '@mantine/core';

export const TextInput = ({ description, error, ...props }) => {
  return (
    <>
      {description && (
        <Text c="gray" mb={8}>
          {description}
        </Text>
      )}

      <TextInputMantine
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
