import { coll1, coll2, coll3, coll4 } from '../viteImages/images.ts';

const CollectionsBlock = () => {
    return (
        <>
            <a className="genres__link" href="/">
                <div className="collections__playlist">
                    <p className="collections__title">Хиты</p>
                    <img src={coll1} alt="col1" />
                </div>
            </a>
            <a className="genres__link" href="/">
                <div className="collections__playlist">
                    <p className="collections__title">Новая музыка</p>
                    <img src={coll2} alt="col2" />
                </div>
            </a>
            <a className="genres__link" href="/">
                <div className="collections__playlist">
                    <p className="collections__title">Вечеринка</p>
                    <img src={coll3} alt="col3" />
                </div>
            </a>
            <a className="genres__link" href="/">
                <div className="collections__playlist">
                    <p className="collections__title">Для детей</p>
                    <img src={coll4} alt="col4" />
                </div>
            </a>
        </>
    );
};

export default CollectionsBlock;
