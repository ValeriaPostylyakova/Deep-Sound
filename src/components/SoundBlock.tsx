import soundImg from '../assets/img/sound-img.svg';

const sound: string = String(soundImg);

const SoundBlock = () => {
    return (
        <div className="sound__block">
            <div className="sound__left">
                <h2>1</h2>
                <img src={sound} alt="autor" />
                <div className="sound__name">
                    <h3>Привыкаю</h3>
                    <p>Macan, A.V.G</p>
                </div>
            </div>
            <p className="time">2:54</p>
        </div>
    );
};

export default SoundBlock;
