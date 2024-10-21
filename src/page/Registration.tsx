import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { RiNeteaseCloudMusicLine } from 'react-icons/ri';
import InputBlockContainer from '../components/Registration/InputBlockContainer.tsx';
import { filterAction } from '../redux/headerFilter/slice.ts';
import { AppDispatch } from '../redux/store.ts';
import { useDispatch } from 'react-redux';
import { profileActions } from '../redux/profile/slice.ts';

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
        const fetchData = await axios.post(
            'https://985cc4acb156d262.mokky.dev/register',
            { ...data, password: '12345' }
        );
        if (fetchData.status === 201) {
            localStorage.setItem('user', JSON.stringify(fetchData.data));
            navigate('/');
            window.location.reload();
            dispatch(filterAction.setUser(true));
        }

        const userObj = JSON.parse(localStorage.getItem('user') || '');
        dispatch(profileActions.setUser(userObj));
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
