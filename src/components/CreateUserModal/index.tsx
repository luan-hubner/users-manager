import styles from './styles.module.css';

import { Modal } from "@mui/material";
import { InputText } from '../../components/InputText';

import Person from '@mui/icons-material/Person';
import Close from '@mui/icons-material/Close';

type CreateUserModalProps = {
  setCreateUserModalOpened: (value: boolean) => void;
};

export default function CreateUserModal({ setCreateUserModalOpened }: CreateUserModalProps) {
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
              style={{
                color: '#ACACAC',
                fontSize: 32
              }}
            />
          </div>

          <form action="">
            <InputText
              label="nome"
              variant="filled"
            />
            <InputText
              label="sobrenome"
              variant="filled"
            />
            <InputText
              label="e-mail"
              variant="filled"
            />
            <InputText
              label="data de nascimento"
              variant="filled"
            />
            <InputText
              label="CPF/RG"
              variant="filled"
            />
            <InputText
              label="tipo de usuário"
              variant="filled"
            />
          </form>
        </div>
      </div>
    </Modal>
  );
}