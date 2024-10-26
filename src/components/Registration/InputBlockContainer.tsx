import * as React from 'react';
import { Link } from 'react-router-dom';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormValues } from '../../page/Registration.tsx';

type InputBlockContainerProps = {
    register: UseFormRegister<FormValues>;
    errors: FieldErrors<FormValues>;
};

const InputBlockContainer: React.FC<InputBlockContainerProps> = ({
    register,
    errors,
}) => {
    return (
        <div className="registration__container-blocks">
            <div className="registration__block">
                <label>Имя</label>
                <input
                    {...register('firstName', {
                        required: true,
                        pattern: {
                            value: /^[A-ZА-ЯЁ][a-zа-яё'’-]+$/i,
                            message: 'Введите корректное имя',
                        },
                    })}
                    placeholder="Введите ваше имя"
                    type="text"
                />
                {errors?.firstName && (
                    <p className="registration__error-message">
                        {errors.firstName.message}
                    </p>
                )}
            </div>
            <div className="registration__block">
                <label>Фамилия</label>
                <input
                    {...register('lastName', {
                        pattern: {
                            value: /^[A-ZА-ЯЁ][a-zа-яё'’-]+$/i,
                            message: 'Введите корректную фамилию',
                        },
                    })}
                    placeholder="Введите вашу фамилию (необязательно)"
                    type="text"
                />
                {errors?.lastName && (
                    <p className="registration__error-message">
                        {errors.lastName.message}
                    </p>
                )}
            </div>
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
            <p className="registration__block-bottom">
                Уже есть аккаунт?
                <Link to="/Deep-Sound/authorization">
                    <span>Войти</span>
                </Link>
            </p>
        </div>
    );
};

export default InputBlockContainer;
