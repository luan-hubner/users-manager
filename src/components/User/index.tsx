import styles from './styles.module.css';

import RemoveRedEye from '@mui/icons-material/RemoveRedEye';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import GppGood from '@mui/icons-material/GppGood';
import AccountCircle from '@mui/icons-material/AccountCircle';

type UserProps = {
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

export default function User({ user }: UserProps) {
  return (
    <div className={styles.user__box}>
      <img src={user.photo} alt="" />

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

      <div className={styles.buttons}>
        <RemoveRedEye style={{ color: "var(--blue)" }} />
        <Edit style={{ color: "var(--green)" }} />
        <Delete style={{ color: "var(--red)" }} />
      </div>
    </div>
  );
}