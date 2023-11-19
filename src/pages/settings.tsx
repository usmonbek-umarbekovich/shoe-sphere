import HeaderLayout from '@/components/layouts/HeaderLayout/HeaderLayout';
import {SidebarLayout} from '@/components/layouts/SidebarLayout/SidebarLayout';
import UpdateForm from '@/components/common/UpdateProfile/UpdateForm';
import useGet from '@/hooks/useGet';
import usePut from '@/hooks/usePut';
import {UserRequest, UserResponse} from '@/types';
import {Box, SxProps, Typography} from '@mui/material';
import {useSession} from 'next-auth/react';
import Head from 'next/head';
import React, {ReactElement} from 'react';
import {toast} from 'react-toastify';
import {NextPageWithLayout} from './_app';
import Loader from '@/components/common/UpdateProfile/Loader';

const styles: Record<string, SxProps> = {
  container: {
    padding: 3,
    margin: {xs: '0 auto', md: 0},
    display: 'flex',
    alignItems: 'center',
    flexDirection: {xs: 'column', md: 'row'},
  },
  box: {flex: 5},
  header: {
    marginBottom: {xs: '12px', sm: 2},
  },
};

const SettingsPage: NextPageWithLayout = () => {
  const {data: session, update} = useSession();
  const sessionUser = session?.user;

  const {data: userData, isLoading} = useGet<UserResponse>(
    `/users/${sessionUser?.id}`,
    {enabled: Boolean(sessionUser)},
    {populate: 'avatar'},
  );

  const {mutate, isPending} = usePut<UserRequest, UserResponse>(
    `/users/${sessionUser?.id}`,
    {
      onSuccess: (responseData, requestData) => {
        update({
          user: {
            ...responseData,
            image: requestData.avatar?.url,
          },
        });
        toast.success('Your profile was successfully updated!');
      },
      onError: error => {
        toast.error(error.message);
      },
    },
  );

  return isLoading ? (
    <Loader />
  ) : (
    <Box sx={styles.container}>
      <Box sx={styles.box}>
        <Typography variant="h1" sx={styles.header}>
          My Profile
        </Typography>
        <UpdateForm
          onSubmit={mutate}
          userData={userData!}
          isUserDataLoading={isPending}
        />
      </Box>
    </Box>
  );
};

SettingsPage.getLayout = function (page: ReactElement) {
  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <HeaderLayout>
        <SidebarLayout currentTab="settings">{page}</SidebarLayout>
      </HeaderLayout>
    </>
  );
};

export default SettingsPage;
