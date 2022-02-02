import { useState, useContext } from 'react';

import styles from './styles.module.css';

import usersManager from '../../assets/images/usersmanager.png';
import userDefaultImage from '../../assets/images/user_default_image.png';

import Person from '@mui/icons-material/Person';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Logout from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';
import { AuthContext } from '../../contexts/AuthContext';
import ProfileModal from '../ProfileModal';

export default function Header() {
  const { logout, authenticatedUser } = useContext(AuthContext);

  const [profileModalOpened, setProfileModalOpened] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header>
      <div className={styles.container}>
        <div className={styles.content}>
          <img src={usersManager} alt="users-manager" />

          <Tooltip title="Opções da Conta">
            <div
              className={styles.user__image}
              style={{
                backgroundImage: authenticatedUser.photo ? `url(${authenticatedUser.photo})` : `url(${userDefaultImage})`
              }}
              onClick={handleClick}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            />
          </Tooltip>
        </div>
        <Menu
          id="account-menu"
          className={styles.account__menu}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 2,
                right: 32,
                width: 10,
                height: 10,
                bgcolor: 'var(--bg-ultra-dark)',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={() => setProfileModalOpened(true)}>
            <ListItemIcon>
              <Person fontSize="medium" className={styles.menu__icon} />
            </ListItemIcon>
            Meu Perfil
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => logout()}>
            <ListItemIcon>
              <Logout fontSize="medium" className={styles.menu__icon} />
            </ListItemIcon>
            Sair
          </MenuItem>
        </Menu>
      </div>

      {
        profileModalOpened ? (
          <ProfileModal setProfileModalOpened={setProfileModalOpened} />
        ) : null
      }
    </header>
  );
}