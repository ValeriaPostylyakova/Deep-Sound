import ContentLoader from 'react-content-loader';

const PlaylistSkeleton = () => {
    return (
        <ContentLoader
            speed={2}
            width={150}
            height={230}
            viewBox="0 0 150 230"
            backgroundColor="#f2f2f2"
            foregroundColor="#ecebeb"
        >
            <rect x="0" y="0" rx="19" ry="19" width="150" height="150" />
            <rect x="0" y="160" rx="4" ry="4" width="150" height="32" />
            <rect x="0" y="215" rx="4" ry="4" width="150" height="15" />
        </ContentLoader>
    );
};

export default PlaylistSkeleton;
