import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  SxProps,
  Typography,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import {destroyCookie} from 'nookies';
import {signOut, useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';

const styles: Record<string, SxProps> = {
  user: {
    display: 'flex',
    alignItems: 'center',
    padding: '35px 16px',
    gap: '16px',
  },
  avatarContainer: {
    width: '64px',
    height: '64px',
    backgroundColor: 'primary.main',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    color: 'grey.A200',
  },
  tabs: {
    marginTop: '30px',
    display: 'flex',
    flexDirection: 'column',
    gap: '36px',
  },
  tab: {
    display: 'flex',
    gap: '15px',
    listStyle: 'none',
    padding: '0 16px',
    cursor: 'pointer',
    transition: 'color 0.2s ease-in-out',
    '&:hover': {
      color: 'primary.main',
    },
  },
};

type SidebarProps = {
  currentTab?: 'products' | 'settings' | 'logout';
  closeDrawer?: () => void;
};

const Sidebar = ({currentTab, closeDrawer}: SidebarProps) => {
  const theme = useTheme();
  const router = useRouter();
  const {data} = useSession();
  const image = data?.user.image;
  const firstName = data?.user.firstName;
  const lastName = data?.user.lastName;
  const username = data?.user.username;

  const logoutFunction = async () => {
    destroyCookie(null, 'rememberMe');
    await signOut();
  };

  return (
    <Box>
      <Box sx={styles.user}>
        <Box sx={styles.avatarContainer}>
          <Avatar src={image} sx={styles.avatarContainer}>
            {(firstName || username || ' ')[0].toUpperCase()}
          </Avatar>
        </Box>
        <Box>
          <Typography variant="body2" sx={styles.welcome}>
            Welcome
          </Typography>
          {firstName && lastName && (
            <Typography>
              <Typography component="span">{firstName}</Typography>{' '}
              <Typography component="span">{lastName}</Typography>
            </Typography>
          )}
          {!(firstName && lastName) && <Typography>{username}</Typography>}
        </Box>
      </Box>
      <Divider />
      <List sx={styles.tabs}>
        <ListItem
          sx={{
            ...styles.tab,
            color: currentTab === 'products' ? 'primary.main' : 'text.primary',
          }}
          onClick={() => {
            router.push('/products/me');
            if (closeDrawer) {
              closeDrawer();
            }
          }}
        >
          <Image
            width={20}
            height={20}
            src="/icons/myProducts.svg"
            alt="my-products"
            style={{
              filter:
                theme.palette.mode === 'dark'
                  ? 'brightness(10)'
                  : 'brightness(1)',
            }}
          />
          <Typography>My products</Typography>
        </ListItem>
        <ListItem
          sx={{
            ...styles.tab,
            color: currentTab === 'settings' ? 'primary.main' : 'text.primary',
          }}
          onClick={() => {
            router.push('/settings');
            if (closeDrawer) {
              closeDrawer();
            }
          }}
        >
          <Image
            width={20}
            height={20}
            src="/icons/settings.svg"
            alt="settings"
            style={{
              filter:
                theme.palette.mode === 'dark'
                  ? 'brightness(10)'
                  : 'brightness(1)',
            }}
          />
          <Typography>Settings</Typography>
        </ListItem>
        <ListItem
          sx={{
            ...styles.tab,
            color: currentTab === 'logout' ? 'primary.main' : 'text.primary',
          }}
          onClick={logoutFunction}
        >
          <Image
            width={20}
            height={20}
            src="/icons/logout.svg"
            alt="logout"
            style={{
              filter:
                theme.palette.mode === 'dark'
                  ? 'brightness(10)'
                  : 'brightness(1)',
            }}
          />
          <Typography>Log out</Typography>
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
