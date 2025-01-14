import { generateColors } from '@mantine/colors-generator';
import { Button, createTheme, PasswordInput, TextInput } from '@mantine/core';

export const theme = createTheme({
  colors: {
    crystal: generateColors('#A8DADC'),
    macaroni: generateColors('#FFB385'),
    ghost: generateColors('#F8F9FA'),
  },
  fontFamily: 'Fredoka, serif',
  primaryColor: 'crystal',
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
        label: { marginBottom: 8 },
        input: {
          padding: '0 16px 0px 56px',
          height: 48,
          backgroundColor: '#f2f2f2',
        },
        error: { marginTop: 8 },
      },
    }),
    PasswordInput: PasswordInput.extend({
      styles: {
        section: { width: 24, margin: '0 16px' },
        wrapper: { marginBottom: 0 },
        label: { marginBottom: 8 },
        innerInput: {
          padding: '0 56px',
          backgroundColor: '#f2f2f2',
        },
        input: { height: 48 },
        error: { marginTop: 8 },
      },
    }),
  },
});
