import { alpha, styled } from '@mui/material/styles';

import TextField, { TextFieldProps } from '@mui/material/TextField';

const InputText = styled((props: TextFieldProps) => (
  <TextField
    {...props}
  />
))(({ theme }) => ({
  '& .MuiFormControl-root': {
    width: '100%',
  },
  '& .MuiFilledInput-root': {
    overflow: 'hidden',
    borderRadius: 4,
    height: '65px',
    padding: '0 1rem 0 .4rem',
    backgroundColor: 'var(--bg-dark)',
    '&.Mui-focused': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: 'var(--bg-light);',
      color: 'black'
    },
  },
  '& .MuiInputLabel-root': {
    fontFamily: 'var(--archivo-li)',
    color: 'var(--input-text-color)',
    fontSize: '1.5rem',
    width: '100%',
    padding: '0 .5rem',
  },
  '& .MuiFilledInput-input': {
    fontFamily: 'var(--archivo-b)',
    color: 'var(--input-text-color)'
  },
}));

export { InputText };