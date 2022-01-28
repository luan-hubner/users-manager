import styles from './styles.module.css';
import users__manager from '../../assets/images/usersmanager.png';

import Mail from '@mui/icons-material/Mail';
import Lock from '@mui/icons-material/Lock';

import { InputAdornment, OutlinedInputProps } from '@mui/material';
import { InputText } from '../../components/InputText';

export default function Login() {
  return (
    <main>
      <div className={styles.container}>
        <div className={styles.login__box}>
          <img src={users__manager} alt="users-manager" />

          <form onSubmit={(e) => e.preventDefault()}>
            <InputText
              label="e-mail"
              variant="filled"
              InputProps={{ disableUnderline: true, endAdornment: (
                <InputAdornment position="end">
                  <Mail style={{ color: 'var(--input-text-color)'}} />
                </InputAdornment>
              )} as Partial<OutlinedInputProps>}
              style={{ marginTop: 11, width: '100%' }}
            />
            <InputText
              label="password"
              variant="filled"
              type="password"
              InputProps={{ disableUnderline: true, endAdornment: (
                <InputAdornment position="end">
                  <Lock style={{ color: 'var(--input-text-color)'}} />
                </InputAdornment>
              )} as Partial<OutlinedInputProps>}
              style={{ marginTop: 11, width: '100%' }}
            />

            <button type='submit' onClick={() => window.location.pathname = '/users'}>LOGIN</button>
          </form>
        </div>
      </div>
    </main>
  );
}