import styles from './styles.module.css';

import { Modal } from "@mui/material";

import Close from '@mui/icons-material/Close';
import CButton from '../Button';

type DeleteUserModalProps = {
  setDeleteUserModalOpened: (value: boolean) => void;
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

export default function DeleteUserModal({ setDeleteUserModalOpened, getUsers, user }: DeleteUserModalProps) {
  async function removeUser() {
    await fetch(`http://localhost:3001/users/${user.id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(response => {
        setDeleteUserModalOpened(false);
        getUsers();
      })
      .catch(err => {
        console.log(err);
      })
  };

  return (
    <Modal
      open={true}
      onClose={() => setDeleteUserModalOpened(false)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={styles.delete__user__modal}>
        <div className={styles.modal__body}>
          <div className={styles.modal__header}>
            <Close
              className={styles.icon}
              onClick={() => setDeleteUserModalOpened(false)}
            />
          </div>

          <div className={styles.title}>
            <h1>deseja realmente remover o usuário <span>{user.firstName} {user.lastName}</span>?</h1>
          </div>

          <div className={styles.buttons}>
            <div onClick={() => removeUser()}>
              <CButton
                color="success"
                label="CONFIRMAR"
                type="submit"
              />
            </div>
            <div onClick={() => setDeleteUserModalOpened(false)}>
              <CButton
                color="error"
                label="CANCELAR"
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}