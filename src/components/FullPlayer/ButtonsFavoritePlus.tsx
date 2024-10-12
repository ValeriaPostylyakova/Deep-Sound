import * as React from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store.ts';

import { SongObj } from '../../redux/songs/types.ts';

import AddedPlaylistModal from './AddedPlaylistModal.tsx';

import ButtonFavorite from './ButtonFavorite.tsx';
import ButtonPlus from './ButtonPlus.tsx';

export type ButtonsFavoriteProps = {
    objFavorite: SongObj | undefined;
};

const ButtonsFavoritePlus: React.FC<ButtonsFavoriteProps> = ({
    objFavorite,
}) => {
    const addedSong = useSelector(
        (state: RootState) => state.playerReducer.addedSong
    );

    return (
        <div className="player__left_buttons">
            <ButtonFavorite objFavorite={objFavorite} />
            <div className="added__container">
                <ButtonPlus />
                {addedSong && <AddedPlaylistModal obj={objFavorite} />}
            </div>
        </div>
    );
};

export default ButtonsFavoritePlus;
