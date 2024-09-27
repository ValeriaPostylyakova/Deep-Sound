import ContentLoader from 'react-content-loader';

const SoundBlockSkeleton = () => {
    return (
        <div className="sound__block_skeleton">
            <ContentLoader
                speed={2}
                width={517}
                height={62}
                viewBox="0 0 517 62"
                backgroundColor="#f2f2f2"
                foregroundColor="#ecebeb"
            >
                <rect x="12" y="27" rx="2" ry="2" width="10" height="17" />
                <rect x="35" y="13" rx="5" ry="5" width="40" height="40" />
                <rect x="102" y="13" rx="2" ry="2" width="97" height="18" />
                <rect x="103" y="38" rx="2" ry="2" width="97" height="13" />
            </ContentLoader>
        </div>
    );
};

export default SoundBlockSkeleton;
