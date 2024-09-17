import Title from '../components/Title.tsx';
import SoundBlock from '../components/SoundBlock.tsx';
import GenresBlock from '../components/GenresBlock.tsx';
import CollectionsBlock from '../components/CollectionsBlock.tsx';
import Slider from '../components/Slider.tsx';

const Home = () => {
    return (
        <>
            <Slider />
            <Title text="Чарт DEEP SOUND" />
            <section className="sound">
                <SoundBlock />
                <SoundBlock />
                <SoundBlock />
                <SoundBlock />
            </section>
            <Title text="Жанры" />
            <section className="genres">
                <div className="genres__container">
                    <GenresBlock />
                </div>
            </section>
            <Title text="Подборки" />
            <section className="collections">
                <div className="collections__container">
                    <CollectionsBlock />
                </div>
            </section>
        </>
    );
};

export default Home;
