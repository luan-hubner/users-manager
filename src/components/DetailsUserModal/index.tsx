import { useState } from 'react';

import styles from './styles.module.css';

import { Modal } from "@mui/material";

import Close from '@mui/icons-material/Close';
import GppGood from '@mui/icons-material/GppGood';
import Email from '@mui/icons-material/Email';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Cake from '@mui/icons-material/Cake';
import Article from '@mui/icons-material/Article';

import UserDefaultImage from '../../assets/images/user_default_image.png';

type DetailsUserModalProps = {
  setDetailsUserModalOpen: (value: boolean) => void;
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

export default function DetailsUserModal({ setDetailsUserModalOpen, user }: DetailsUserModalProps) {
  const [formatedDate, setFormatedDate] = useState(formatDate());

  function formatDate() {
    const date = new Date(user.birthDate);
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <Modal
      open={true}
      onClose={() => setDetailsUserModalOpen(false)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={styles.details__user__modal}>
        <div className={styles.modal__body}>
          <div className={styles.modal__header}>
            <Close
              className={styles.icon}
              onClick={() => setDetailsUserModalOpen(false)}
            />
          </div>

          <div className={styles.user__details}>
            <div
              className={styles.user__image}
              style={{
                backgroundImage: user.photo ? `url(${user.photo})` : `url(${UserDefaultImage})`
              }}
            />

            <h1 className={styles.user__name}>
              {user.firstName}&nbsp;
              {user.lastName}
            </h1>

            <div className={styles.user__role}>
              <div className={styles.role__icon}>
                {
                  user.role === 'ADMIN' ?
                    <GppGood style={{ color: "var(--green)" }} />
                  :
                    <AccountCircle style={{ color: "var(--blue)" }} />
                }
              </div>

              <div className={styles.role__name}>
                <span>
                  {user.role === 'ADMIN' ? 'Administrador' : 'Usuário'}
                </span>
              </div>
            </div>

            <div className={styles.info}>
              <Email />
              <span>{user.email}</span>
            </div>

            <div className={styles.info}>
              <Cake />
              <span>{formatedDate}</span>
            </div>

            <div className={styles.info}>
              <Article />
              <span>{user.document}</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}