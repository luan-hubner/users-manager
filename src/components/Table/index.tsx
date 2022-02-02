import { useEffect, useState } from 'react';

import emptyBox from '../../assets/images/empty_box.png';

import styles from './styles.module.css';

import Pagination from '@mui/material/Pagination';

import User from '../User';

type TableProps = {
  users: UserType[];
  getUsers: () => void;
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

export default function Table({ users, getUsers }: TableProps) {
  const [listedUsers, setListedUsers] = useState<UserType[]>(users.slice(0, 5));
  const [pages, setPages] = useState<number>(0);

  const COMPONENTS_PER_PAGE = 5;

  useEffect(() => {
    handlePaginationChange(null, 1);
    
    const usersSplited = String(users.length / COMPONENTS_PER_PAGE).split('.');
    
    if (usersSplited[1]) {
      setPages(Number(usersSplited[0]) + 1);
    };
  }, [users]);

  function handlePaginationChange(event: React.ChangeEvent<unknown>, value: number) {
    const startIndex = value * COMPONENTS_PER_PAGE - COMPONENTS_PER_PAGE;
    const lastIndex = startIndex + COMPONENTS_PER_PAGE;

    setListedUsers(users.slice(startIndex, lastIndex));
  };

  return (
    <div className={styles.table}>
      {
        listedUsers.length ? (
          <>
            <div className={styles.content}>
              {
                listedUsers.map(user => (
                  <User key={user.id} user={user} getUsers={getUsers} />
                ))
              }
            </div>

            {
              listedUsers.length > 5 ? (
                <Pagination
                  count={pages}
                  color="primary" variant="outlined" shape="rounded"
                  onChange={handlePaginationChange}
                />
              ) : null
            }
          </>
        ) : (
          <div className={styles.no__content}>
            <img src={emptyBox} alt="no-data" />
            <h1>Não existem usuários para serem listados.</h1>
          </div>
        )
      }
    </div>
  );
}