import { Text, TextInput as TextInputMantine } from '@mantine/core';

export const TextInput = ({ description, error, ...props }) => {
  return (
    <>
      <Text c="ghost" mb={8}>
        {description}
      </Text>

      <TextInputMantine
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
