// import FavoritePlaylistsEmpty from '../components/FavoritePlaylistsEmpty.tsx';

import CustomPlaylistsBlock from '../components/CustomPlaylists/CustomPlaylistsBlock.tsx';
// import CustomPlaylistsSkeleton from '../components/CustomPlaylists/CustomPlaylistsSkeleton.tsx';
const CustomPlaylists = () => {
    return (
        <section className="favorite">
            <h1>Ваши плейлисты</h1>
            <div className="custplaylist__container-1">
                {/*<CustomPlaylistsSkeleton />*/}
                <CustomPlaylistsBlock />
            </div>
        </section>
    );
};

export default CustomPlaylists;
