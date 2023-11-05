import {Box} from '@mui/material';
import {Input} from '../Inputs/Input';
import {SubmitHandler, useForm} from 'react-hook-form';
import {CustomButton} from '../Button/Button';

type UpdateProfileForm = {
  userName: string;
  userSurname: string;
  email: string;
  phone: number;
  confirmPassword: string;
};

const UpdateProfileForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<UpdateProfileForm>();

  const submitHadler: SubmitHandler<UpdateProfileForm> = async () => {};

  return (
    <Box
      component="form"
      sx={{display: 'flex', flexDirection: 'column', maxWidth: '100%'}}
      onSubmit={handleSubmit(submitHadler)}
    >
      <Box sx={{mb: 7}}>
        <Input
          defaultValue={'Jane'}
          labelText="Name"
          name="userName"
          register={register}
          validationSchema={{
            pattern: {
              required: true,
            },
          }}
          style={{marginBottom: 24}}
        />
        <Input
          defaultValue={'Meldrum'}
          labelText="Surname"
          name="userSurname"
          register={register}
          validationSchema={{
            required: true,
          }}
          style={{marginBottom: 24}}
        />
        <Input
          defaultValue={'rhc23@mail.com'}
          labelText="Email"
          name="email"
          register={register}
          validationSchema={{
            pattern: {
              value: /^(\d{3})\s\d{3}-\d{4}/,
            },
          }}
          style={{marginBottom: 24}}
        />
        <Input
          defaultValue={'(949) 354-2574'}
          labelText="Phone number"
          name="phoneNumber"
          register={register}
          validationSchema={{
            required: true,
            pattern: {
              value: /\S+@\S+\.\S+/,
            },
          }}
        />
      </Box>
      <CustomButton width="152" alignSelf="flex-end">
        Save changes
      </CustomButton>
    </Box>
  );
};

export default UpdateProfileForm;
