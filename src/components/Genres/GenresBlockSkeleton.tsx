import ContentLoader from 'react-content-loader';

const GenresBlockSkeleton = () => {
    return (
        <ContentLoader
            speed={2}
            width={250}
            height={250}
            viewBox="0 0 250 250"
            backgroundColor="#f2f2f2"
            foregroundColor="#ecebeb"
        >
            <rect x="0" y="0" rx="16" ry="16" width="250" height="250" />
        </ContentLoader>
    );
};

export default GenresBlockSkeleton;
