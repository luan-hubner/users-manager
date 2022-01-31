import styles from './styles.module.css';

import { Modal } from "@mui/material";
import { InputText } from '../InputText';

import Person from '@mui/icons-material/Person';
import Close from '@mui/icons-material/Close';
import CButton from '../Button';

import { useForm } from 'react-hook-form';

type EditUserModalProps = {
  setEditUserModalOpened: (value: boolean) => void;
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

export default function EditUserModal({ setEditUserModalOpened, user }: EditUserModalProps) {
  const { register, handleSubmit } = useForm();

  function create(data) {
    console.log(data);
  };

  return (
    <Modal
      open={true}
      onClose={() => setEditUserModalOpened(false)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={styles.edit__user__modal}>
        <div className={styles.modal__body}>
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

          <form onSubmit={handleSubmit(create)}>
            <div className={styles.input__group}>
              <InputText
                label="nome"
                variant="filled"
                defaultValue={user.firstName}
              />
              <InputText
                label="sobrenome"
                variant="filled"
                defaultValue={user.lastName}
              />
            </div>
            <InputText
              label="e-mail"
              variant="filled"
              defaultValue={user.email}
            />
            <div className={styles.input__group}>
              <InputText
                label="data de nascimento"
                variant="filled"
                defaultValue={user.birthDate}
              />
              <InputText
                label="CPF/RG"
                variant="filled"
                defaultValue={user.document}
              />
            </div>
            <div className={styles.input__group}>
              <InputText
                label="tipo de usuário"
                variant="filled"
                defaultValue={user.role}
              />
            </div>
            <div className={styles.input__group}>
              <InputText
                label="senha"
                variant="filled"
              />
              <InputText
                label="confirmar senha"
                variant="filled"
              />
            </div>

            <div className={styles.buttons}>
              <CButton
                color="success"
                label="CADASTRAR"
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
    </Modal>
  );
}