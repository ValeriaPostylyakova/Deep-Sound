import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { getResponseStatus } from '../utils/getResponseStatus.ts';
import * as React from 'react';

type AutorizationValues = {
    email: string;
};

const Authorization = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AutorizationValues>({ mode: 'onChange' });

    const [searchUser, setSearchUser] = React.useState<boolean>(false);
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<AutorizationValues> = async (data) => {
        try {
            const response = await axios.post(
                'https://985cc4acb156d262.mokky.dev/auth',
                {
                    ...data,
                    password: '12345',
                }
            );
            getResponseStatus(response);
            navigate('/Deep-Sound/');
            window.location.reload();
        } catch (err) {
            console.error(err);
            setSearchUser(true);
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
                    <p
                        className={
                            searchUser
                                ? 'authorization__block-bottom block'
                                : 'authorization__block-bottom'
                        }
                    >
                        Пользователь не найден
                        <Link to="/Deep-Sound/registration">
                            <span>Зарегистрироваться</span>
                        </Link>
                    </p>
                    <button className="authorization__button">Войти</button>
                </div>
            </form>
        </div>
    );
};
export default Authorization;
