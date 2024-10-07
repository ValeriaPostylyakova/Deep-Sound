// import FavoritePlaylistsEmpty from '../components/FavoritePlaylistsEmpty.tsx';

import CustomPlaylistsBlock from '../components/CustomPlaylists/CustomPlaylistsBlock.tsx';

const CustomPlaylists = () => {
    return (
        <section className="favorite">
            <h1>Ваши плейлисты</h1>
            <div className="custplaylist__container-1">
                <CustomPlaylistsBlock />
                <CustomPlaylistsBlock />
            </div>
        </section>
    );
};

export default CustomPlaylists;
