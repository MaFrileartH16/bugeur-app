import { Affix, Paper } from '@mantine/core';

export const FloatingBottomNavigationBar = (props) => {
  return (
    <Affix
      position={{ bottom: 16, left: '50%', transform: 'translateX(-50%)' }}
    >
      <Paper
        bg="red"
        sx={{
          whiteSpace: 'nowrap', // Mencegah teks dari wrapping
          overflow: 'hidden', // Menyembunyikan teks yang melebihi lebar
          textOverflow: 'ellipsis', // Menambahkan ellipsis (...) jika teks terlalu panjang
          maxWidth: '90vw', // Membatasi lebar maksimum
          padding: '10px 20px', // Padding untuk konten
          borderRadius: '8px', // Sudut melengkung
          textAlign: 'center', // Teks di tengah
        }}
      >
        asddddddddddddddddddddddddddd
      </Paper>
    </Affix>
  );
};
