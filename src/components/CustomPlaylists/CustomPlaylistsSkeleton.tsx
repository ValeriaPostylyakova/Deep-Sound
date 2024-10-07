import ContentLoader from 'react-content-loader';

const CustomPlaylistsSkeleton = () => {
    return (
        <div className="custplaylist__block-skeleton">
            <ContentLoader
                speed={2}
                width={150}
                height={200}
                viewBox="0 0 150 200"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
            >
                <rect x="0" y="0" rx="15" ry="15" width="150" height="150" />
                <rect x="0" y="160" rx="5" ry="5" width="138" height="16" />
                <rect x="0" y="184" rx="3" ry="3" width="65" height="14" />
            </ContentLoader>
        </div>
    );
};

export default CustomPlaylistsSkeleton;
