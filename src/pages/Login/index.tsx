import { SyntheticEvent, useContext, useState } from 'react';

import styles from './styles.module.css';
import users__manager from '../../assets/images/usersmanager.png';

import Mail from '@mui/icons-material/Mail';
import Lock from '@mui/icons-material/Lock';

import { InputAdornment, OutlinedInputProps } from '@mui/material';
import { InputText } from '../../components/InputText';
import { AuthContext } from '../../contexts/AuthContext';

export default function Login() {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function login(e: SyntheticEvent) {
    e.preventDefault();
    
    signIn({ email, password });
  };
  
  return (
    <main>
      <div className={styles.container}>
        <div className={styles.login__box}>
          <img src={users__manager} alt="users-manager" />

          <form onSubmit={(e) => login(e)}>
            <InputText
              label="e-mail"
              variant="filled"
              InputProps={{ disableUnderline: true, endAdornment: (
                <InputAdornment position="end">
                  <Mail style={{ color: 'var(--input-text-color)'}} />
                </InputAdornment>
              )} as Partial<OutlinedInputProps>}
              style={{ marginTop: 11, width: '100%' }}
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type='submit'>LOGIN</button>
          </form>
        </div>
      </div>
    </main>
  );
}