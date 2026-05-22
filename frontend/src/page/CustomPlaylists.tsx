import * as React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store.ts';
import { fetchCustomPlaylists } from '../redux/createPlaylist/asyncAction.ts';
import { CustomPlaylistObj } from '../redux/createPlaylist/types.ts';

import EmptyBlock from '../components/EmptyBlock.tsx';
import CustomPlaylistsBlock from '../components/CustomPlaylists/CustomPlaylistsBlock.tsx';
import CustomPlaylistsSkeleton from '../components/CustomPlaylists/CustomPlaylistsSkeleton.tsx';

const CustomPlaylists = () => {
    const dispatch: AppDispatch = useDispatch();
    const customPlaylists = useSelector(
        (state: RootState) => state.createPlaylistReducer.customPlaylists
    );
    const status = useSelector(
        (state: RootState) => state.createPlaylistReducer.status
    );

    React.useEffect(() => {
        if (localStorage.getItem('user')) {
            const user = JSON.parse(localStorage.getItem('user') || '');
            dispatch(fetchCustomPlaylists(user.token));
        }
    }, [dispatch]);

    return (
        <section className="favorite">
            <h1>Ваши плейлисты</h1>
            {customPlaylists.length < 1 ? (
                <EmptyBlock title="Список ваших плейлистов пуст" />
            ) : (
                <div className="custplaylist__container-1">
                    {customPlaylists.map((playlist: CustomPlaylistObj) =>
                        status === 'loading' ? (
                            <CustomPlaylistsSkeleton key={playlist.id} />
                        ) : (
                            <CustomPlaylistsBlock
                                {...playlist}
                                key={playlist.id}
                            />
                        )
                    )}
                </div>
            )}
        </section>
    );
};

export default CustomPlaylists;
