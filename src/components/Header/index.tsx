import styles from './styles.module.css';

import users__manager from '../../assets/images/usersmanager.png';
import user__photo from '../../assets/images/me.png';

export default function Header() {
  return (
    <header>
      <div className={styles.container}>
        <div className={styles.content}>
          <img src={users__manager} alt="users-manager" />

          <span>
            <img src={user__photo} alt="user" />
          </span>
        </div>
      </div>
    </header>
  );
}