import collection1 from '../assets/img/collections/1.svg';
import collection2 from '../assets/img/collections/2.svg';
import collection3 from '../assets/img/collections/3.svg';
import collection4 from '../assets/img/collections/4.svg';

const coll1: string = String(collection1);
const coll2: string = String(collection2);
const coll3: string = String(collection3);
const coll4: string = String(collection4);

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
