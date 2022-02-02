import { useState } from 'react';

import styles from './styles.module.css';

import { Alert, AlertTitle, Button, FormControlLabel, Dialog, Switch, TextField, Fade } from "@mui/material";
import { InputText } from '../InputText';

import Person from '@mui/icons-material/Person';
import Close from '@mui/icons-material/Close';
import CButton from '../Button';

import { useForm } from 'react-hook-form';

type EditUserModalProps = {
  setEditUserModalOpened: (value: boolean) => void;
  getUsers: () => void;
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

type UpdateUserType = {
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  document: string;
  admin: boolean;
  photo: string;
};

export default function EditUserModal({ setEditUserModalOpened, getUsers, user }: EditUserModalProps) {
  const [userImage, setUserImage] = useState<string | ArrayBuffer>("");
  const { register, handleSubmit } = useForm();

  const [formError, setFormError] = useState('');

  async function updateUser(data: UpdateUserType) {
    if (await findUserByEmail(data.email)) {
      return handleError('Já existe um usuário cadastrado com esse e-mail.');
    }

    await fetch(`http://localhost:3001/users/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        birthDate: data.birthDate,
        email: data.email,
        document: data.document,
        password: user.password,
        role: data.admin ? 'ADMIN' : 'USER',
        photo: userImage ? userImage : user.photo
      })
    })
      .then(response => response.json())
      .then(response => {
        setEditUserModalOpened(false);
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
          return !!response.length && response[0].id != user.id;
        })
        .catch(err => {
          console.log(err);
        });

    return userAlreadyExists;
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
      onClose={() => setEditUserModalOpened(false)}
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
      <div className={styles.edit__user__modal}>
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

                <h1>editar usuário</h1>
              </div>

              <Close
                className={styles.icon}
                onClick={() => setEditUserModalOpened(false)}
              />
            </div>

            <form onSubmit={handleSubmit(updateUser)}>
              <div className={styles.input__group}>
                <TextField
                  label="nome"
                  variant="filled"
                  required
                  defaultValue={user.firstName}
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
                  defaultValue={user.lastName}
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
                defaultValue={user.email}
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
                  defaultValue={user.birthDate}
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
                  defaultValue={user.document}
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
                        userImage || user.photo ? "(preview ao lado)" : ""
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
                    ) : user.photo ? (
                      <span style={{ backgroundImage: `url(${user.photo})`}} />
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
              
              {
                formError ? (
                  <Alert variant="outlined" severity="error" className={styles.error}>
                    <AlertTitle>Oops, temos algo errado.</AlertTitle>
                    {formError}
                  </Alert>
                ) : null
              }

              <div className={styles.buttons}>
                <CButton
                  color="success"
                  label="EDITAR"
                  type="submit"
                />
                <div onClick={() => setEditUserModalOpened(false)}>
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