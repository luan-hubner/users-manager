import { useState } from 'react';

import styles from './styles.module.css';

import { Button, Modal } from "@mui/material";

import Close from '@mui/icons-material/Close';
import CButton from '../Button';
import { CameraAlt } from '@mui/icons-material';

type EditProfilePhotoModalProps = {
  setEditProfilePhotoModalOpened: (value: boolean) => void;
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

export default function EditProfilePhotoModal({ setEditProfilePhotoModalOpened, user }: EditProfilePhotoModalProps) {
  const [userImage, setUserImage] = useState<string | ArrayBuffer>("");

  async function updateProfilePhoto() {
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
        password: user.password,
        role: user.role,
        photo: userImage
      })
    })
      .then(response => response.json())
      .then(response => {
        setEditProfilePhotoModalOpened(false);

        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      })
  }

  function compactUserImage(image) {
    var reader = new FileReader();

    let base64String: string | ArrayBuffer;
      
    reader.onload = function () {
      base64String = reader.result;

      setUserImage(base64String);
    }
    reader.readAsDataURL(image);
  }

  return (
    <Modal
      open={true}
      onClose={() => setEditProfilePhotoModalOpened(false)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={styles.edit__profile__photo__modal}>
        <div className={styles.modal__body}>
          <div className={styles.modal__header}>
            <div className={styles.title}>
              <CameraAlt
                style={{
                  color: '#ACACAC',
                  fontSize: 48
                }}
              />

              <h1>editar foto</h1>
            </div>

            <Close
              className={styles.icon}
              onClick={() => setEditProfilePhotoModalOpened(false)}
            />
          </div>

          <div className={styles.modal__content}>
            <Button
              variant="contained"
              component="label"
              color="success"
            >
              <span className={styles.btn__image__upload}>
                SELECIONE UMA FOTO&nbsp;
                <span className={styles.text__into__btn}>
                  {
                    userImage || user.photo ? "(preview abaixo)" : ""
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

          <div className={styles.buttons}>
            <div onClick={() => updateProfilePhoto()}>
              <CButton
                color="success"
                label="CONFIRMAR"
                type="submit"
              />
            </div>
            <div onClick={() => setEditProfilePhotoModalOpened(false)}>
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