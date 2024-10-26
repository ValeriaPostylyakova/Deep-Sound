import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store.ts';
import { profileActions } from '../redux/profile/slice.ts';

import { getResponseStatus } from '../utils/getResponseStatus.ts';
import { getUser } from '../utils/getUser.ts';
import InputBlockContainer from '../components/Registration/InputBlockContainer.tsx';

import { RiNeteaseCloudMusicLine } from 'react-icons/ri';

export type FormValues = {
    firstName: string;
    lastName: string;
    email: string;
    id?: number;
};

const Registration: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        mode: 'onChange',
    });

    const navigate = useNavigate();
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            const response = await axios.post(
                'https://985cc4acb156d262.mokky.dev/register',
                { ...data, password: '12345' }
            );
            getResponseStatus(response);
            navigate('/Deep-Sound/');
            window.location.reload();

            const user = getUser();
            dispatch(profileActions.setUser(user.data));
        } catch (err) {
            console.error(err);
            alert('Пользователь зарегистрирован');
        }
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
