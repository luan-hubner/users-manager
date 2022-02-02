import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

import { Modal, Tooltip } from '@mui/material';

import userDefaultImage from '../../assets/images/user_default_image.png';

import styles from './styles.module.css';

import CButton from '../../components/Button';

import GppGood from '@mui/icons-material/GppGood';
import CameraAlt from '@mui/icons-material/CameraAlt';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EditProfilePhotoModal from '../../components/EditProfilePhotoModal';
import ChangePasswordModal from '../../components/ChangePasswordModal';
import Person from '@mui/icons-material/Person';
import Close from '@mui/icons-material/Close';

type ProfileModalProps = {
  setProfileModalOpened: (value: boolean) => void;
};

export default function ProfileModal({ setProfileModalOpened }: ProfileModalProps) {
  const { authenticatedUser } = useContext(AuthContext);

  const [editProfilePhotoModalOpened, setEditProfilePhotoModalOpened] = useState(false);
  const [changePasswordModalOpened, setChangePasswordModalOpened] = useState(false);
  
  return (
    <Modal
      open={true}
      onClose={() => setProfileModalOpened(false)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={styles.profile__modal}>
        <div className={styles.modal__body}>
          <div className={styles.modal__header}>
            <div className={styles.title}>
              <Person
                style={{
                  color: '#ACACAC',
                  fontSize: 48
                }}
              />

              <h1>meu perfil</h1>
            </div>

            <Close
              className={styles.icon}
              onClick={() => setProfileModalOpened(false)}
            />
          </div>

          <div className={styles.modal__content}>
            <div
              className={styles.user__image}
              style={{
                backgroundImage: authenticatedUser.photo ? `url(${authenticatedUser.photo})` : `url(${userDefaultImage})`
              }}
            />

            <div className={styles.change__photo} onClick={() => setEditProfilePhotoModalOpened(true)}>
              <Tooltip title="Editar Foto">
                <CameraAlt style={{ color: "var(--green)" }} />
              </Tooltip>
            </div>

            <h1>{`${authenticatedUser.firstName} ${authenticatedUser.lastName}`}</h1>

            <div className={styles.user__role}>
              <div className={styles.role__icon}>
                {
                  authenticatedUser.role === 'ADMIN' ?
                    <GppGood style={{ color: "var(--green)" }} />
                  :
                    <AccountCircle style={{ color: "var(--blue)" }} />
                }
              </div>

              <div className={styles.role__name}>
                <span>
                  {authenticatedUser.role === 'ADMIN' ? 'Administrador' : 'Usuário'}
                </span>
              </div>
            </div>

            <div onClick={() => setChangePasswordModalOpened(true)}>
              <CButton color="info" label="ALTERAR SENHA"></CButton>
            </div>
            
            {
              editProfilePhotoModalOpened ? (
                <EditProfilePhotoModal setEditProfilePhotoModalOpened={setEditProfilePhotoModalOpened} user={authenticatedUser} />
              ) : null
            }

            {
              changePasswordModalOpened ? (
                <ChangePasswordModal setChangePasswordModalOpened={setChangePasswordModalOpened} user={authenticatedUser} />
              ) : null
            }
          </div>
        </div>
      </div>
    </Modal>
  );
}