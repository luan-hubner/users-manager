import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, AlertTitle, Button, Dialog, Fade, FormControlLabel, Switch, TextField } from "@mui/material";

import Person from '@mui/icons-material/Person';
import Close from '@mui/icons-material/Close';
import CButton from '../Button';

import styles from './styles.module.css';

type CreateUserModalProps = {
  setCreateUserModalOpened: (value: boolean) => void;
  getUsers: () => void;
};

type CreateUserType = {
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  document: string;
  password: string;
  confirmPassword: string;
  admin: boolean;
}

export default function CreateUserModal({ setCreateUserModalOpened, getUsers }: CreateUserModalProps) {
  const [userImage, setUserImage] = useState<string | ArrayBuffer>("");
  const [formError, setFormError] = useState('');

  const { register, handleSubmit } = useForm();

  async function createUser(data: CreateUserType) {
    if (data.password != data.confirmPassword) {
      return handleError('As senhas são diferentes.');
    };

    if (await findUserByEmail(data.email)) {
      return handleError('Já existe um usuário cadastrado com esse e-mail.');
    }

    await fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        birthDate: data.birthDate,
        email: data.email,
        document: data.document,
        password: encryptPassword(data.password),
        role: data.admin ? 'ADMIN' : 'USER',
        photo: userImage
      })
    })
      .then(response => response.json())
      .then(response => {
        setCreateUserModalOpened(false);
        getUsers();
      })
      .catch(err => {
        console.log(err);
      })
  };

  async function findUserByEmail(email: string) {
    const userAlreadyExists =
      await fetch(`http://localhost:3001/users?email=${email}`)
        .then(response => response.json())
        .then(response => {
          return !!response.length;
        })
        .catch(err => {
          console.log(err);
        });

    return userAlreadyExists;
  };

  function encryptPassword(password: string) {
    return btoa(password);
  };

  function compactUserImage(image) {
    var reader = new FileReader();

    let base64String: string | ArrayBuffer;
      
    reader.onload = function () {
      base64String = reader.result;

      setUserImage(base64String);
    }
    reader.readAsDataURL(image);
  }

  function handleError(message: string) {
    setFormError(message);

    setTimeout(() => {
      setFormError('');
    }, 5000);
  };

  return (
    <Dialog
      open={true}
      onClose={() => setCreateUserModalOpened(false)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      scroll="body"
      TransitionComponent={Fade}
      transitionDuration={200}
      PaperProps={{
        style: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
        }
      }}
    >
      <div className={styles.create__user__modal}>
        <div className={styles.modal__body}>
          <div className={styles.modal__content}>
            <div className={styles.modal__header}>
              <div className={styles.title}>
                <Person
                  style={{
                    color: '#ACACAC',
                    fontSize: 48
                  }}
                />

                <h1>novo usuário</h1>
              </div>

              <Close
                className={styles.icon}
                onClick={() => setCreateUserModalOpened(false)}
              />
            </div>

            <form onSubmit={handleSubmit(createUser)}>
              <div className={styles.input__group}>
                <TextField
                  label="nome"
                  variant="filled"
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '100%' },
                  }}
                  required
                  InputLabelProps={{
                    className: styles.field__label,
                    required: false
                  }}
                  InputProps={{
                    className: styles.field,
                  }}
                  {...register('firstName')}
                />
                <TextField
                  label="sobrenome"
                  variant="filled"
                  required
                  InputLabelProps={{
                    className: styles.field__label,
                    required: false
                  }}
                  InputProps={{
                    className: styles.field,
                  }}
                  {...register('lastName')}
                />
              </div>
              
              <TextField
                label="e-mail"
                variant="filled"
                type="email"
                required
                InputLabelProps={{
                  className: styles.field__label,
                  required: false
                }}
                InputProps={{
                  className: styles.field,
                }}
                {...register('email')}
              />
              
              <div className={styles.input__group}>
                <TextField
                  label="data de nascimento"
                  variant="filled"
                  type="date"
                  required
                  InputLabelProps={{
                    className: styles.field__label,
                    required: false,
                    shrink: true
                  }}
                  InputProps={{
                    className: styles.field,
                  }}
                  {...register('birthDate')}
                />
                
                <TextField
                  label="CPF/RG"
                  variant="filled"
                  required
                  InputLabelProps={{
                    className: styles.field__label,
                    required: false,
                  }}
                  InputProps={{
                    className: styles.field,
                  }}
                  {...register('document')}
                />
              </div>
              
              <div className={styles.input__group}>
                <Button
                  variant="contained"
                  component="label"
                  color="success"
                >
                  <span className={styles.btn__image__upload}>
                    FOTO&nbsp;
                    <span className={styles.text__into__btn}>
                      {
                        userImage ? "(preview ao lado)" : ""
                      }
                    </span>
                  </span>
                  <input
                    onChange={(e) => compactUserImage(e.target.files[0])}
                    type="file"
                    name="file"
                    hidden
                    accept="image/png, image/jpeg"
                  />
                </Button>
                
                <div className={styles.image__preview}>
                  { 
                    userImage ? (
                      <span style={{ backgroundImage: `url(${userImage.toString()})`}} />
                    ) : null
                  }
                </div>
              </div>
              
              <div className={styles.input__group}>
                <div className={styles.select__group}>
                  <FormControlLabel control={<Switch defaultChecked />} label="" {...register('admin')} />
                  <span className={styles.field__label}>administrador</span>
                </div>
              </div>

              <div className={styles.input__group}>
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
              </div>
              
              {
                formError ? (
                  <Alert variant="outlined" severity="error" className={styles.error}>
                    <AlertTitle>Oops, temos algo de errado.</AlertTitle>
                    {formError}
                  </Alert>
                ) : null
              }

              <div className={styles.buttons}>
                <CButton
                  color="success"
                  label="CADASTRAR"
                  type="submit"
                />
                <div onClick={() => setCreateUserModalOpened(false)}>
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
    </Dialog>
  );
}