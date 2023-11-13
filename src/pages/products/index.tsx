import {
  Box,
  Button,
  Stack,
  SxProps,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Image from 'next/image';
import {ReactElement, useEffect, useMemo, useState} from 'react';

import Header from '@/components/Header';
import {ProductList} from '@/components/Product';
import useGet from '@/hooks/useGet';
import {FilterSidebar} from '@/layouts/FilterSidebar/FilterSidebar';
import {NextPageWithLayout} from '@/pages/_app';
import theme from '@/styles/theme/commonTheme';
import {Filters} from '@/types/data';
import {ProductsResponse} from '@/types/product';

const styles: Record<string, SxProps> = {
  container: {
    padding: {xs: 0, md: '35px'},
    marginTop: 3,
    width: 1,
  },
  productsContainer: {
    padding: {xs: '0 24px', md: 0},
  },
  productsHeader: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
};

const MyProducts: NextPageWithLayout = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [showFilters, setShowFilters] = useState(!isMobile);
  const [filters, setFilters] = useState<Filters>({
    brand: [],
    color: [],
    gender: [],
    sizes: [],
    minPrice: 0,
    maxPrice: Infinity,
  });

  const params = useMemo(() => {
    const newFilters: Record<string, number> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          newFilters[`filters[${key}][${index}]`] = item;
        });
      }
    });

    newFilters['filters[price][gte]'] = filters.minPrice;
    newFilters['filters[price][lte]'] = filters.maxPrice;
    return newFilters;
  }, [filters]);

  const {data: products, isLoading} = useGet<ProductsResponse>(
    '/products',
    null,
    {
      populate: '*',
      'filters[teamName]': 'team-3',
      ...params,
    },
  );

  useEffect(() => {
    setShowFilters(!isMobile);
  }, [isMobile]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Stack direction="row" justifyContent="center">
      <FilterSidebar
        open={showFilters}
        filters={filters}
        onClose={() => setShowFilters(false)}
        setFilters={setFilters}
      />
      <Box sx={styles.container} marginLeft={showFilters && !isMobile ? 2 : 0}>
        <Box sx={styles.productsContainer}>
          <Stack direction="row" sx={styles.productsHeader}>
            <Typography variant="h1">Search Results</Typography>
            <Button
              variant="text"
              sx={{color: 'text.secondary'}}
              onClick={() => setShowFilters(!showFilters)}
              endIcon={
                <Image
                  src={`/icons/filters${showFilters ? 'Hide' : 'Show'}.svg`}
                  alt=""
                  width={24}
                  height={24}
                />
              }
            >
              {showFilters && 'Hide'} Filters
            </Button>
          </Stack>
          <ProductList products={products} fullWidth={!showFilters} />
        </Box>
      </Box>
    </Stack>
  );
};

MyProducts.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Header />
      {page}
    </>
  );
};

export default MyProducts;
