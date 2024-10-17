import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store.ts';
import { CustomPlaylistObj } from '../../redux/createPlaylist/types.ts';
import { SongObj } from '../../redux/songs/types.ts';
import * as React from 'react';
import axios from 'axios';
import { createPlaylistAction } from '../../redux/createPlaylist/slice.ts';

type AddedPlaylistModal = {
    obj: SongObj | undefined;
};

const AddedPlaylistModal: React.FC<AddedPlaylistModal> = ({ obj }) => {
    const dispatch: AppDispatch = useDispatch();
    const customPlaylists = useSelector(
        (state: RootState) => state.createPlaylistReducer.customPlaylists
    );

    const onClickPlaylistTitle = async (parentId: string) => {
        await axios.post('https://985cc4acb156d262.mokky.dev/addSong', {
            ...obj,
            parentId,
        });
        dispatch(createPlaylistAction.setParentId(parentId));
    };

    return (
        <div className="addedModal">
            <ul className="addedModal__list">
                <p className="addedModal__list_item">Добавить в плейлист:</p>
                {customPlaylists.map((playlist: CustomPlaylistObj) => (
                    <li
                        onClick={() => onClickPlaylistTitle(playlist.parentId)}
                        key={playlist.id}
                    >
                        {playlist.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AddedPlaylistModal;
