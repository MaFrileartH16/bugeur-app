import { Select as SelectMantine, Text } from '@mantine/core';

export const Select = ({ description, error, ...props }) => {
  return (
    <>
      {description && (
        <Text c="gray" mb={8}>
          {description}
        </Text>
      )}

      <SelectMantine
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
