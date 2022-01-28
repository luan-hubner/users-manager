import styles from './styles.module.css';

import Header from '../../components/Header';
import CButton from '../../components/Button';
import { useState } from 'react';
import CreateUserModal from '../../components/CreateUserModal';
//import Button from '@mui/material/Button';

export default function Users() {
  const [createUserModalOpened, setCreateUserModalOpened] = useState<boolean>(false);
  
  return (
    <>
      <main>
        <Header />

        <div className={styles.content}>
          <div className={styles.container}>
            <div className={styles.content__header}>
              <h1>Olá Luan,&nbsp;</h1>
              <h2>seja bem vindo(a).</h2>
            </div>

            <div className={styles.content__table}>
              <div className={styles.table__header}>
                <h1>usuários</h1>

                <div onClick={() => setCreateUserModalOpened(true)}>
                  <CButton
                    label="NOVO USUÁRIO"
                    color="success"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      {createUserModalOpened ? <CreateUserModal setCreateUserModalOpened={setCreateUserModalOpened} /> : null}
    </>
  );
}