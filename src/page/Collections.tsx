import GoBack from '../components/GoBack.tsx';
import CollectionsBlock from '../components/CollectionsBlock.tsx';

const Collections = () => {
    return (
        <>
            <GoBack />
            <div className="collections__container">
                <CollectionsBlock />
                <CollectionsBlock />
            </div>
        </>
    );
};

export default Collections;
