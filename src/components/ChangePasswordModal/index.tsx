import { useState } from 'react';

import { Alert, Modal, TextField } from "@mui/material";
import { Lock } from '@mui/icons-material';
import { useForm } from 'react-hook-form';

import styles from './styles.module.css';

import Close from '@mui/icons-material/Close';
import CButton from '../Button';

type ChangePasswordModalProps = {
  setChangePasswordModalOpened: (value: boolean) => void;
  user: UserType;
};

type UserType = {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  document: string;
  password: string;
  role: string;
  photo: string;
}

type ChangePasswordData = {
  password: string;
  confirmPassword: string;
}

export default function ChangePasswordModal({ setChangePasswordModalOpened, user }: ChangePasswordModalProps) {
  const [submitReturn, setSubmitReturn] = useState("");

  const { handleSubmit, register } = useForm();

  async function changeMyPassword(data: ChangePasswordData) {
    if (data.password != data.confirmPassword) {
      return handleError('As senhas são diferentes.')
    };

    await fetch(`http://localhost:3001/users/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: user.firstName,
        lastName: user.lastName,
        birthDate: user.birthDate,
        email: user.email,
        document: user.document,
        password: encryptPassword(data.password),
        role: user.role,
        photo: user.photo
      })
    })
      .then(response => response.json())
      .then(response => {
        setChangePasswordModalOpened(false);
      }).catch(err => {
        console.log(err);
      })
  };

  function encryptPassword(password: string) {
    return btoa(password);
  };

  function handleError(message: string) {
    setSubmitReturn(message);

    setTimeout(() => {
      setSubmitReturn('');
    }, 5000);
  };

  return (
    <Modal
      open={true}
      onClose={() => setChangePasswordModalOpened(false)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={styles.change__password__modal}>
        <div className={styles.modal__body}>
          <div className={styles.modal__header}>
            <div className={styles.title}>
              <Lock
                style={{
                  color: '#ACACAC',
                  fontSize: 48
                }}
              />

              <h1>alterar senha</h1>
            </div>

            <Close
              className={styles.icon}
              onClick={() => setChangePasswordModalOpened(false)}
            />
          </div>

          <div className={styles.modal__content}>
            <form onSubmit={handleSubmit(changeMyPassword)}>
              <TextField
                label="senha"
                type="password"
                variant="filled"
                required
                InputLabelProps={{
                  className: styles.field__label,
                  required: false,
                }}
                InputProps={{
                  className: styles.field,
                }}
                {...register('password')}
              />
              
              <TextField
                label="confirmar senha"
                variant="filled"
                type="password"
                required
                InputLabelProps={{
                  className: styles.field__label,
                  required: false,
                }}
                InputProps={{
                  className: styles.field,
                }}
                {...register('confirmPassword')}
              />

              {
                submitReturn ? (
                  <Alert variant="outlined" severity="error" className={styles.login__return}>
                    {submitReturn}
                  </Alert>
                ) : null
              }

              <div className={styles.buttons}>
                <CButton
                  color="success"
                  label="CONFIRMAR"
                  type="submit"
                />
                <div onClick={() => setChangePasswordModalOpened(false)}>
                  <CButton
                    color="error"
                    label="CANCELAR"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
}