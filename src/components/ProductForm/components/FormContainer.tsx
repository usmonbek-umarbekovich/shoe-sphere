import Dropdown from '@/components/Dropdown/Dropdown';
import {Input} from '@/components/Inputs/Input';
import ProductSizeList from '@/components/ProductSize/ProductSizeList';
import theme from '@/styles/theme/commonTheme';
import {
  BrandsResponse,
  ColorsResponse,
  GendersResponse,
  SizesResponse,
} from '@/types';
import {useQuery} from '@tanstack/react-query';
import axios, {AxiosResponse} from 'axios';
import {ProductData, ProductFormContext} from '../ProductForm';
import {Box, Grid, SxProps} from '@mui/material';
import React, {useContext} from 'react';
import {Controller, UseFormReturn} from 'react-hook-form';
import Textarea from '@/components/Textarea/Textarea';

const styles: Record<string, SxProps> = {
  dropdowns: {
    display: 'flex',
    gap: '1rem',
  },
  form: {
    display: 'flex',
    columnGap: '5rem',
    rowGap: '3rem',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  formContainer: {
    width: 440,
    [theme.breakpoints.down('md')]: {
      width: 'auto',
    },
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    flexShrink: 1,
  },
};

type FormContainerProps = {
  formProps: Pick<
    UseFormReturn<ProductData>,
    'register' | 'control' | 'getValues' | 'setValue'
  >;
};

const FormContainer = ({formProps}: FormContainerProps) => {
  const {gender, setGender, brand, setBrand, choosedSizes, setChoosedSizes} =
    useContext(ProductFormContext);
  const {data: genders} = useQuery<GendersResponse>({
    queryKey: ['genders'],
    queryFn: () => axios.get(`${process.env.API_URL}/genders`),
  });
  const {data: colors} = useQuery<ColorsResponse>({
    queryKey: ['colors'],
    queryFn: () => axios.get(`${process.env.API_URL}/colors`),
  });
  const {data: brands} = useQuery<BrandsResponse>({
    queryKey: ['brands'],
    queryFn: () => axios.get(`${process.env.API_URL}/brands`),
  });
  const {data: sizes} = useQuery<SizesResponse>({
    queryKey: ['sizes'],
    queryFn: () => axios.get(`${process.env.API_URL}/sizes`),
  });

  const sizesMapped =
    sizes?.data.data.map(({id, attributes: {value}}) => ({
      id,
      value,
    })) || [];

  const checkSize = (id: number) => {
    setChoosedSizes((prevState: any) => {
      const newSize = sizesMapped.find(size => size.id === id);
      const isSizeAlreadyChoosed = prevState.find(
        (size: any) => size.id === id,
      );
      if (!newSize) {
        return prevState;
      }
      if (!isSizeAlreadyChoosed) {
        console.log(newSize);
        return [...prevState, newSize];
      } else {
        return prevState.filter((size: any) => size.id !== id);
      }
    });
  };
  return (
    <Grid sx={styles.formContainer}>
      <Input
        labelText="Product name"
        register={formProps.register}
        validationSchema={{required: 'Product name is required'}}
        name="name"
        placeholder="Nike Air Max 90"
      />
      <Input
        name="price"
        labelText="Price"
        register={formProps.register}
        validationSchema={{
          required: 'Price is required',
          min: {
            value: 1,
            message: 'Price must be greater than 0',
          },
          onChange: e =>
            formProps.setValue(
              'price',
              Number(e.target.value.replace(/\D/g, '')),
            ),
        }}
      />
      <Box sx={styles.dropdowns}>
        <Dropdown
          name="gender"
          labelText="Gender"
          options={genders?.data.data.map(({id, attributes}) => ({
            value: id,
            text: attributes.name,
          }))}
          value={gender}
          onChange={e => setGender(e.target.value)}
        />
        <Dropdown
          name="brand"
          labelText="Brand"
          options={brands?.data.data.map(({id, attributes}) => ({
            value: id,
            text: attributes.name,
          }))}
          value={brand}
          onChange={e => setBrand(e.target.value)}
        />
      </Box>
      <Textarea
        labelText="Description"
        register={formProps.register}
        validationSchema={{
          required: 'Description is required',
          onChange: e =>
            formProps.setValue(
              'description',
              e.target.value.length > 300
                ? e.target.value.slice(0, 300)
                : e.target.value,
            ),
        }}
        name="description"
        minRows={8}
        placeholder="Do not exceed 300 characters."
      />
      <ProductSizeList
        header="Add size"
        sizes={sizesMapped}
        choosedSizes={choosedSizes}
        onClick={checkSize}
      />
    </Grid>
  );
};

export default FormContainer;
