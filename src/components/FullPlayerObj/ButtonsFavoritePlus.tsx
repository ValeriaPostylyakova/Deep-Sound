import * as React from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store.ts';

import { SongObj } from '../../redux/songs/types.ts';

import ButtonFavorite from './ButtonFavorite.tsx';
import ButtonPlus from './ButtonPlus.tsx';
import FavoriteModal from './FavoriteModal.tsx';
import PlusPlaylistModal from './PlusPlaylistModal.tsx';

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
            <FavoriteModal />
            <div className="added__container">
                <ButtonPlus />
                {addedSong && <PlusPlaylistModal obj={objFavorite} />}
            </div>
        </div>
    );
};

export default ButtonsFavoritePlus;
