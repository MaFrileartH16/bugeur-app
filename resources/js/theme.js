import { generateColors } from '@mantine/colors-generator';
import {
  ActionIcon,
  Avatar,
  Button,
  createTheme,
  Modal,
  MultiSelect,
  Pagination,
  PasswordInput,
  Select,
  TextInput,
} from '@mantine/core';

export const theme = createTheme({
  colors: {
    navy: generateColors('#000080'),
    crystal: generateColors('#A8DADC'),
    macaroni: generateColors('#FFB385'),
    ghost: generateColors('#F8F9FA'),
    magic: generateColors('#B5EAD7'),
    peach: generateColors('#FFD1BA'),
    soap: generateColors('#D4D8F0'),
  },
  fontFamily: 'Fredoka, serif',
  primaryColor: 'navy',
  headings: {
    sizes: {
      h1: { fontSize: '44px', fontWeight: '700', lineHeight: '56px' },
      h2: { fontSize: '34px', fontWeight: '600', lineHeight: '48px' },
      h3: { fontSize: '26px', fontWeight: '600', lineHeight: '36px' },
      h4: { fontSize: '20px', fontWeight: '500', lineHeight: '28px' },
      h5: { fontSize: '16px', fontWeight: '500', lineHeight: '24px' },
      h6: { fontSize: '14px', fontWeight: '400', lineHeight: '20px' },
    },
  },
  white: '#f2f2f2',
  black: '#0d0d0d',
  // primaryShade: { light: 5, dark: 7 },
  autoContrast: true,
  radius: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '32px',
    xl: '64px',
  },
  defaultRadius: 'md',
  fontSizes: {
    xs: { fontSize: '12px', fontWeight: '400', lineHeight: '16px' },
    sm: { fontSize: '14px', fontWeight: '400', lineHeight: '20px' },
    md: { fontSize: '16px', fontWeight: '500', lineHeight: '24px' },
    lg: { fontSize: '18px', fontWeight: '500', lineHeight: '26px' },
    xl: { fontSize: '20px', fontWeight: '600', lineHeight: '28px' },
    xxl: { fontSize: '24px', fontWeight: '600', lineHeight: '32px' },
  },
  defaultGradient: {
    from: 'crystal',
    to: 'macaroni',
  },
  components: {
    Button: Button.extend({
      styles: {
        root: {
          height: 48,
        },
      },
    }),
    TextInput: TextInput.extend({
      styles: {
        section: { width: 24, margin: '0 16px' },
        wrapper: { marginBottom: 0 },
        // label: { marginBottom: 8 },
        input: {
          padding: '0 16px 0px 56px',
          height: 48,
          // marginTop: 16,
        },
        // error: { marginTop: 8 },
      },
    }),
    PasswordInput: PasswordInput.extend({
      styles: {
        section: { width: 24, margin: '0 16px' },
        wrapper: { marginBottom: 0 },
        // label: { marginBottom: 8 },
        innerInput: {
          padding: '0 56px',
        },
        input: { height: 48 },
        // error: { marginTop: 8 },
      },
    }),
    Textarea: TextInput.extend({
      styles: {
        section: { width: 24, margin: '0 16px' },
        input: {
          padding: '12px 16px 12px 56px',
          height: 96,
        },
      },
    }),
    ActionIcon: ActionIcon.extend({
      defaultProps: {
        size: 48,
      },
    }),
    Select: Select.extend({
      defaultProps: {
        checkIconPosition: 'right',
        comboboxProps: { shadow: 'xs' },
        searchable: true,
        allowDeselect: false,
        nothingFoundMessage: 'Nothing found...',
      },
      styles: {
        section: { width: 24, margin: '0 16px' },
        input: {
          padding: '0 16px 0px 56px',
          height: 48,
        },
        option: {
          height: 48,
          padding: 16,
        },
        dropdown: {
          padding: 0,
        },
      },
    }),
    Modal: Modal.extend({
      defaultProps: {
        withCloseButton: false,
      },
    }),
    Pagination: Pagination.extend({
      styles: {
        control: {
          height: 48,
          width: 48,
          borderRadius: 16,
        },
      },
    }),
    Avatar: Avatar.extend({
      defaultProps: {
        radius: 16,
        color: 'navy',
      },
    }),
    MultiSelect: MultiSelect.extend({
      defaultProps: {
        clearable: true,
        searchable: true,
        checkIconPosition: 'right',
        hidePickedOptions: true,
        comboboxProps: { shadow: 'xs' },
      },
      styles: {
        input: {
          display: 'flex',
          padding: '10px 16px 10px 56px',
          minHeight: 48, // Tinggi input
        },
        dropdown: {
          padding: 0,
        },
        section: { width: 24, margin: '0 16px' },
        option: {
          height: 48,
          padding: 16,
        },
      },
    }),
  },
});
