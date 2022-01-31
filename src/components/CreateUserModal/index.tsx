import styles from './styles.module.css';

import { Modal } from "@mui/material";
import { InputText } from '../../components/InputText';

import Person from '@mui/icons-material/Person';
import Close from '@mui/icons-material/Close';
import CButton from '../Button';

import { useForm } from 'react-hook-form';

type CreateUserModalProps = {
  setCreateUserModalOpened: (value: boolean) => void;
};

export default function CreateUserModal({ setCreateUserModalOpened }: CreateUserModalProps) {
  const { register, handleSubmit } = useForm();

  function createUser(data) {
    console.log(data);
  };

  return (
    <Modal
      open={true}
      onClose={() => setCreateUserModalOpened(false)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={styles.create__user__modal}>
        <div className={styles.modal__body}>
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
              <InputText
                label="nome"
                variant="filled"
              />
              <InputText
                label="sobrenome"
                variant="filled"
              />
            </div>
            <InputText
              label="e-mail"
              variant="filled"
            />
            <div className={styles.input__group}>
              <InputText
                label="data de nascimento"
                variant="filled"
              />
              <InputText
                label="CPF/RG"
                variant="filled"
              />
            </div>
            <div className={styles.input__group}>
              <InputText
                label="tipo de usuário"
                variant="filled"
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
    </Modal>
  );
}