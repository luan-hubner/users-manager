import { useEffect, useState } from 'react';

import styles from './styles.module.css';

import Pagination from '@mui/material/Pagination';
import User from '../User';

type TableProps = {
  users: UserType[];
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

export default function Table({ users }: TableProps) {
  const [listedUsers, setListedUsers] = useState<UserType[]>(users.slice(0, 5));
  const [pages, setPages] = useState<number>(0);

  const COMPONENT_PER_PAGE = 5;

  useEffect(() => {
    let usersSplited = String(users.length / 5).split('.');
    let pageQuantity: number;
    
    if (usersSplited[1]) {
      pageQuantity = Number(usersSplited[0]) + 1;
    };

    setPages(pageQuantity);
  }, []);

  function handlePaginationChange(event: React.ChangeEvent<unknown>, value: number) {
    const startIndex = value * COMPONENT_PER_PAGE - COMPONENT_PER_PAGE;
    const lastIndex = startIndex + COMPONENT_PER_PAGE;

    setListedUsers(users.slice(startIndex, lastIndex));
  };

  return (
    <div className={styles.table}>
      <div className={styles.content}>
        {
          listedUsers.map(user => (
            <User user={user} />
          ))
        }
      </div>
      <Pagination
        count={pages}
        color="secondary"
        onChange={handlePaginationChange}
      />
    </div>
  );
}