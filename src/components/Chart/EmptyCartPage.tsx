import React from 'react';
import { Box, Typography } from '@mui/material';
import { CustomButton } from "../Button/Button";
import Image from 'next/image';


const EmptyCartPage = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}
        >
            <Image
                src="/icons/chart.svg"
                alt="cart"
                width={32}
                height={32}
                style={{
                    padding: '24px',
                    background: '#F9FAFB',
                    borderRadius: '50%',
                }}
            />
            <Typography component="p" sx={{ fontWeight: 700, fontSize: 20, marginBottom: 2 }}>
                You don't have any products yet.
            </Typography>
            <Typography component="p" sx={{ color: '#5C5C5C', fontWeight: 300, fontSize: 15, marginBottom: 6 }}>
                Post can contain video, images and text.
            </Typography>

            <CustomButton isTransparent={false} width="10%" height="40px">
                Add product
            </CustomButton>
        </Box>
    );
};

export default EmptyCartPage;