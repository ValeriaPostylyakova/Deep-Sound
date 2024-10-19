import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { RiNeteaseCloudMusicLine } from 'react-icons/ri';
import InputBlockContainer from '../components/Registration/InputBlockContainer.tsx';

export type FormValues = {
    firstName: string;
    lastName: string;
    email: string;
};

const Registration: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        mode: 'onChange',
    });

    const navigate = useNavigate();
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        await axios.post('https://985cc4acb156d262.mokky.dev/users', data);
        navigate('/');
    };
    return (
        <div className="registration-wrapper">
            <form onSubmit={handleSubmit(onSubmit)} className="registration">
                <div className="registration__container">
                    <h1>Регистрация</h1>
                    <InputBlockContainer register={register} errors={errors} />
                </div>
                <div className="registration__container-bottom">
                    <div className="header__logo">
                        <RiNeteaseCloudMusicLine className="registration__logo_icon" />
                        <div>
                            <p>DEEP</p>
                            <p>SOUND</p>
                        </div>
                    </div>
                    <button type="submit">Зарегистироваться</button>
                </div>
            </form>
        </div>
    );
};

export default Registration;
