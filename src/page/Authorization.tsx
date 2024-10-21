import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type AutorizationValues = {
    email: string;
};

const Authorization = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AutorizationValues>({ mode: 'onChange' });

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<AutorizationValues> = async (data) => {
        const response = await axios.post(
            'https://985cc4acb156d262.mokky.dev/auth',
            {
                ...data,
                password: '12345',
            }
        );

        if (response.status === 201) {
            localStorage.setItem('user', JSON.stringify(response.data));
            navigate('/');
            window.location.reload();
        }
    };

    return (
        <div className="registration-wrapper">
            <form onSubmit={handleSubmit(onSubmit)} className="authorization">
                <div className="registration__container">
                    <h1>Авторизация</h1>
                    <div className="registration__block">
                        <label>Почта</label>
                        <input
                            {...register('email', {
                                required: true,
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Введите корретный адрес',
                                },
                            })}
                            placeholder="Введите вашу почту"
                            type="text"
                        />
                        {errors?.email && (
                            <p className="registration__error-message">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    <button className="authorization__button">Войти</button>
                </div>
            </form>
        </div>
    );
};
export default Authorization;
