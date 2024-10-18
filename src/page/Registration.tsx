import InputBlock from '../components/Registration/InputBlock.tsx';
import { RiNeteaseCloudMusicLine } from 'react-icons/ri';

const Registration = () => {
    return (
        <div className="registration-wrapper">
            <form className="registration">
                <div className="registration__container">
                    <h1>Регистрация</h1>
                    <div className="registration__container-blocks">
                        <InputBlock label="Введите ваше имя" inputType="text" />
                        <InputBlock
                            label="Введите вашу фамилию"
                            inputType="text"
                        />
                        <InputBlock
                            label="Введите вашу почту"
                            inputType="email"
                        />
                        <div className="registration__container-bottom">
                            <div className="header__logo">
                                <RiNeteaseCloudMusicLine className="registration__logo_icon" />
                                <div>
                                    <p>DEEP</p>
                                    <p>SOUND</p>
                                </div>
                            </div>
                            <button>Зарегистироваться</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Registration;
