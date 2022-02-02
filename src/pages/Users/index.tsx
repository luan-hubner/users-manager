import { useEffect, useState, useContext } from 'react';

import styles from './styles.module.css';

import Header from '../../components/Header';
import CButton from '../../components/Button';
import CreateUserModal from '../../components/CreateUserModal';
import Table from '../../components/Table';

import { InputText } from '../../components/InputText';
import { InputAdornment, OutlinedInputProps } from '@mui/material';
import { Search } from '@mui/icons-material';
import { AuthContext } from '../../contexts/AuthContext';

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
};

export default function Users() {
  const { authenticatedUser } = useContext(AuthContext);
  const [createUserModalOpened, setCreateUserModalOpened] = useState<boolean>(false);
  const [users, setUsers] = useState<UserType[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserType[]>([]);

  useEffect(() => {
    getUsers();
  }, []);
  
  async function getUsers() {
    await fetch('http://localhost:3001/users')
      .then(response => response.json())
      .then(response => {
        setUsers(response);
        setFilteredUsers(response);
      })
      .catch(err => {
        console.log(err);
      })
  };

  function handleSearch(name: string) {
    const filter = users.filter(user =>
      (`${user.firstName} ${user.lastName}`)
        .toLowerCase()
        .includes(name
          .toLowerCase())
    );

    setFilteredUsers(filter);
  };

  return (
    <>
      <main>
        <Header />

        <div className={styles.content}>
          <div className={styles.container}>
            <div className={styles.content__header}>
              <h1>Olá {authenticatedUser.firstName},&nbsp;</h1>
              <h2>seja bem vindo(a).</h2>
            </div>

            <div className={styles.content__table}>
              <div className={styles.table__header}>
                <h1>usuários</h1>

                <div className={styles.buttons}>
                  <InputText
                    label="pesquisar"
                    variant="filled"
                    InputProps={{ disableUnderline: true, endAdornment: (
                      <InputAdornment position="end">
                        <Search style={{ color: 'var(--input-text-color)'}} />
                      </InputAdornment>
                    )} as Partial<OutlinedInputProps>}
                    onChange={(e) => handleSearch(e.target.value)}
                  />

                  {
                    authenticatedUser.role === "ADMIN" ? (
                      <div onClick={() => setCreateUserModalOpened(true)}>
                        <CButton
                          label="NOVO USUÁRIO"
                          color="success"
                          type="button"
                        />
                      </div>
                    ) : null
                  }
                </div>
              </div>

              <div className={styles.table__content}>
                <Table users={filteredUsers} getUsers={getUsers} />
              </div>
            </div>
          </div>

        </div>
      </main>

      {createUserModalOpened ?
        <CreateUserModal
          setCreateUserModalOpened={setCreateUserModalOpened}
          getUsers={getUsers}
        /> : null}
    </>
  );
}