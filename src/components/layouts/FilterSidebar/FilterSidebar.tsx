import {
  Drawer,
  IconButton,
  Stack,
  SxProps,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import {useGet} from '@/hooks';
import {Category} from './components/Category';

import {
  BrandsResponse,
  ColorsResponse,
  GendersResponse,
  SizesResponse,
  CategoriesResponse,
} from '@/types';
import Image from 'next/image';
import PriceSlider from './components/PriceSlider';

const styles: Record<string, SxProps> = {
  sidebar: {
    '& .MuiDrawer-paper': {
      width: 320,
      height: {md: 'calc(100% - 120px)'},
      marginTop: {md: '120px'},
      backgroundImage: 'none',
      border: 'none',
      overflowX: 'hidden',
    },
    '& .MuiModal-backdrop': {
      backgroundColor: 'grey.A400',
      opacity: '0.9 !important',
      backdropFilter: 'blur(100px)',
    },
    transition: 'width 0.2s ease-in-out',
  },
  header: {
    padding: {xs: '26px 20px', md: '44px 40px 16px'},
    backgroundColor: 'background.paper',
  },
};

type Props = {
  open: boolean;
  searchingString: string;
  productsCount: number;
  onClose: () => void;
};

export const FilterSidebar = ({
  searchingString,
  productsCount,
  open,
  onClose,
}: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const {data: genders} = useGet<GendersResponse>('/genders');
  const {data: colors} = useGet<ColorsResponse>('/colors');
  const {data: brands} = useGet<BrandsResponse>('/brands');
  const {data: categories} = useGet<CategoriesResponse>('/categories');
  const {data: sizes} = useGet<SizesResponse>('/sizes');

  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor={isMobile ? 'right' : 'left'}
      variant={isMobile ? 'temporary' : 'persistent'}
      sx={{...styles.sidebar, width: open ? 320 : 0}}
    >
      <Stack sx={styles.header}>
        {isMobile ? (
          <IconButton onClick={onClose} sx={{marginLeft: 'auto'}}>
            <Image
              src="/icons/burgerClose.svg"
              alt=""
              width={20}
              height={20}
              style={{
                filter:
                  theme.palette.mode === 'dark'
                    ? 'brightness(10)'
                    : 'brightness(1)',
              }}
            />
          </IconButton>
        ) : (
          <>
            <Typography>
              Shoes{searchingString ? `/${searchingString}` : ''}
              {searchingString ? '' : ` (${productsCount})`}
            </Typography>
            {searchingString && (
              <Typography>
                {searchingString} ({productsCount})
              </Typography>
            )}
          </>
        )}
      </Stack>
      <Category
        name="Gender"
        options={genders?.data.map(({id, attributes}) => ({
          id,
          value: attributes.name!,
        }))}
      />
      <Category
        name="Color"
        options={colors?.data.map(({id, attributes}) => ({
          id,
          value: attributes.name!,
        }))}
      />
      <Category
        name="Brand"
        options={brands?.data.map(({id, attributes}) => ({
          id,
          value: attributes.name!,
        }))}
      />
      <Category
        name="Categories"
        options={categories?.data.map(({id, attributes}) => ({
          id,
          value: attributes.name!,
        }))}
      />
      <Category name="Price">
        <PriceSlider />
      </Category>
      <Category
        name="Sizes"
        options={sizes?.data.map(({id, attributes}) => ({
          id,
          value: attributes.value!,
        }))}
      />
    </Drawer>
  );
};
