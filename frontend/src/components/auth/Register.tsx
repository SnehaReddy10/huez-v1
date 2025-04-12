import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../buttons/primary-button/PrimaryButton';
import TertiaryInput from '../inputs/TertiaryInput';
import { useRegisterMutation } from '../../store';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext, useEffect } from 'react';
import { registerSchema } from '../../validators/RegisterSchema';
import { ToastContext } from '../../context/ToastContext';
import { setToken } from '../../utitlities';
import Loader from '../common/Loader';

function Register() {
  const [register, results] = useRegisterMutation();
  const navigate = useNavigate();
  const toastContext = useContext(ToastContext);

  const {
    register: registerField,
    handleSubmit,
    reset,
    formState: { isValid, errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(registerSchema),
  });

  useEffect(() => {
    if (results.error) {
      const r = results.error as any;

      if (!toastContext) {
        throw new Error('useContext must be used within a ToastProvider');
      }

      const { showToast } = toastContext;
      showToast(r?.data?.message, 'error', 'left-0 top-10');
      reset();
    }
  }, [results.error]);

  const onSubmit = (data: any) => {
    register(data);
  };

  if (results.isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (results.isSuccess) {
    setToken(results.data?.token);
    navigate('/');
  }

  return (
    <div className="h-screen w-full flex max-sm:flex-col justify-center items-center contain-inline-size">
      <div className="register animate-slideBottom md:animate-slideRight h-[30%] w-full md:w-[30%] flex flex-col md:h-full justify-center text-center p-4 md:p-10 bg-cover text-white bg-[url('https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg?auto=compress&cs=tinysrgb&w=600')]">
        <div className="flex flex-col animate-fadeIn gap-4 md:gap-40">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl md:text-3xl font-semibold font-serif">
              One of us?
            </h2>
            <p className="text-gray-300 text-xxs md:text-xs text-balance">
              If you already has an account. just sign in. We've missed you!
            </p>
          </div>
          <div className="pb-4 md:pb-10">
            <PrimaryButton
              onClickHandler={() => navigate('/login')}
              label="SIGN IN"
              className="rounded-full md:text-xs py-1 md:py-2 px-4 w-max font-semibold bg-white hover:bg-transparent hover:text-white transition-all ease-in border-white border-2 text-black-900"
            />
          </div>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="login animate-slideTop md:animate-slideLeft w-full md:w-[70%] flex items-center justify-center h-[70%] md:h-full p-4 md:p-10"
      >
        <div className="flex animate-fadeIn flex-col gap-4 md:gap-10 items-center justify-center text-nowrap">
          <h2 className="text-xl md:text-3xl font-semibold font-serif">
            Time to feel like home,
          </h2>
          <div className="grid grid-cols-2 gap-10">
            <TertiaryInput
              error={errors.name?.message}
              innerRef={registerField('name')}
              required={true}
              placeholder="John Doe"
              label="name"
              inputClassName="w-44"
            />
            <TertiaryInput
              error={errors.username?.message}
              innerRef={registerField('username')}
              placeholder="johndoe"
              label="username"
              inputClassName="w-44"
            />
            <TertiaryInput
              error={errors.email?.message}
              innerRef={registerField('email')}
              placeholder="john.doe@gmail.com"
              label="email"
              inputClassName="w-44"
            />
            <TertiaryInput
              error={errors.password?.message}
              innerRef={registerField('password')}
              placeholder="secret"
              label="password"
              type="password"
              inputClassName="w-44"
            />
          </div>
          <div className="flex flex-col gap-2">
            <PrimaryButton
              type="submit"
              disabled={!isValid}
              onClickHandler={() => {}}
              label="SIGN UP"
              className="rounded-full w-56 md:w-72 md:text-xs py-2 font-semibold"
            />
            <PrimaryButton
              onClickHandler={() => {}}
              label="Connect with Google"
              className="rounded-full w-56 md:w-72 md:text-xs py-2 font-semibold bg-white border-black-900 border-2 text-black-900"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
