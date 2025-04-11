import { useLocation, useNavigate } from 'react-router-dom';
import PrimaryButton from '../buttons/primary-button/PrimaryButton';
import TertiaryInput from '../inputs/TertiaryInput';
import { useLoginMutation, useSyncCartOnLoginMutation } from '../../store';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext, useEffect } from 'react';
import { ToastContext } from '../../context/ToastContext';
import { loginSchema } from '../../validators/LoginSchema';
import { setToken } from '../../utitlities';
import * as yup from 'yup';

type LoginFormData = yup.InferType<typeof loginSchema>;

function Login() {
  const [login, results] = useLoginMutation();
  const [syncCartOnLogin] = useSyncCartOnLoginMutation();
  const toastContext = useContext(ToastContext);

  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, errors },
  } = useForm<LoginFormData>({
    mode: 'onBlur',
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: location.state?.email || 'test@gmail.com',
      password: 'testtest',
    },
  });

  useEffect(() => {
    if (!toastContext) {
      throw new Error('useContext must be used within a ToastProvider');
    }

    const { showToast } = toastContext;
    showToast(
      'Please login using default credentials',
      'info',
      'right-0 top-10'
    );
    if (results.error) {
      const r = results.error as any;

      showToast(r.data.message ?? r.data.error[0], 'error', 'right-0 top-10');
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results.error, reset]);

  useEffect(() => {
    if (results.isSuccess) {
      setToken(results.data?.token);
      syncCartOnLogin({});
      navigate('/');
    }
  }, [results.isSuccess, navigate, syncCartOnLogin, results.data?.token]);

  const handleLogin = (data: LoginFormData) => {
    login(data);
  };

  if (results.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen flex flex-col md:flex-row justify-between items-center">
      <div className="animate-slideBottom md:animate-slideRight login h-[70%] w-full md:w-[70%] flex items-center justify-center md:h-full p-4 md:p-10">
        <div className="flex flex-col animate-fadeIn gap-4 md:gap-10 items-center justify-center w-max md:w-72">
          <h2 className="text-xl md:text-3xl font-semibold font-serif">
            Welcome back,
          </h2>
          <TertiaryInput
            innerRef={register('email')}
            error={errors.email?.message}
            placeholder="john.dow@gmail.com"
            label="email"
          />
          <TertiaryInput
            innerRef={register('password')}
            error={errors.password?.message}
            placeholder="secret"
            label="password"
            type="password"
          />
          <div className="flex flex-col gap-2">
            <PrimaryButton
              disabled={!isValid}
              onClickHandler={handleSubmit(handleLogin)}
              label="SIGN IN"
              className="rounded-full w-56 md:w-72 md:text-xs py-2 font-semibold"
            />
            <PrimaryButton
              onClickHandler={() => {}}
              label="Connect with Google"
              className="rounded-full w-56 md:w-72 md:text-xs py-2 font-semibold bg-white border-black-900 border-2 text-black-900"
            />
          </div>
        </div>
      </div>
      <div className="register animate-slideTop md:animate-slideLeft h-[30%] w-full md:w-[30%] flex flex-col md:h-full justify-center text-center p-4 md:p-10 bg-cover text-white bg-[url('https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg?auto=compress&cs=tinysrgb&w=600')]">
        <div className="flex flex-col animate-fadeIn gap-2 md:gap-40">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl md:text-3xl font-semibold font-serif">
              New here?
            </h2>
            <p className="text-gray-300 text-xxs md:text-xs text-balance">
              Sign up now and explore a world of delicious meals at your
              doorstep!
            </p>
          </div>
          <div className="pb-4 md:pb-10">
            <PrimaryButton
              onClickHandler={() => navigate('/register')}
              label="SIGN UP"
              className="rounded-full md:text-xs py-1 md:py-2 px-4 w-max font-semibold bg-white hover:bg-transparent hover:text-white transition-all ease-in border-white border-2 text-black-900"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
