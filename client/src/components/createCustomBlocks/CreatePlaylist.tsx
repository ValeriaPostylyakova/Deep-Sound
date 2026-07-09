import * as React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store.ts';
import { createPlaylistAction } from '../../redux/createPlaylist/slice.ts';
import { sliderAction } from '../../redux/sliderPlayer/slice.ts';
import { playlistAction } from '../../redux/playlistPlayer/slice.ts';
import { songsAction } from '../../redux/songs/slice.ts';
import { playerAction } from '../../redux/player/slice.ts';
import { playlistTracksActions } from '../../redux/createPlaylistTracks/slice.ts';
import { fetchPlaylistTracks } from '../../redux/createPlaylistTracks/asyncAction.ts';
import { CustomPlaylistObj } from '../../redux/createPlaylist/types.ts';
import { SongObj } from '../../redux/songs/types.ts';
import { FetchData } from '../../utils/getResponseStatus.ts';

import ActiveBarPlaylist from './ActiveBarPlaylist.tsx';
import PlaylistName from './PlaylistName.tsx';

import { RiPlayListLine } from 'react-icons/ri';
import { FaPlay } from 'react-icons/fa6';

export type CreatePlaylistProps = {
    findObj: CustomPlaylistObj | undefined;
};

const CreatePlaylist: React.FC<CreatePlaylistProps> = ({ findObj }) => {
    const dispatch: AppDispatch = useDispatch();

    const playlistTracks = useSelector(
        (state: RootState) => state.playlistTracksReducer.playlistTracks
    );
    const actionBarActive = useSelector(
        (state: RootState) => state.createPlaylistReducer.actionBarActive
    );

    const navigate = useNavigate();
    const id = window.location.pathname.slice(28);

    React.useEffect(() => {
        dispatch(fetchPlaylistTracks(id));

        if (findObj) {
            dispatch(createPlaylistAction.setInputValue(findObj.title));
        }
    }, [dispatch, id, findObj?.title]);

    const handleModal = () => {
        dispatch(createPlaylistAction.setDeletePlaylist(false));
        navigate('/Deep-Sound/');
        window.location.reload();
    };

    const deletePlaylist = async (obj: FetchData) => {
        try {
            await axios.delete(
                `https://985cc4acb156d262.mokky.dev/createPlaylist/${findObj?.id}`,
                { headers: { Authorization: `Bearer ${obj.token}` } }
            );
            dispatch(createPlaylistAction.setDeletePlaylist(true));
        } catch (err) {
            console.error(err);
            alert(
                'Ошибка при удалении плейлиста. Пожалуйста, перезагрузите страницу и попробуйте ещё раз'
            );
        }
    };

    const onClickDeletePlaylist = () => {
        if (localStorage.getItem('user') !== null) {
            const obj = JSON.parse(localStorage.getItem('user') || '');
            deletePlaylist(obj);
            setTimeout(handleModal, 2000);
        }
    };

    const onClickPlay = () => {
        const id = playlistTracks[0].id;
        dispatch(playlistTracksActions.setSongId({ id: id } as SongObj));
        dispatch(playlistTracksActions.setActivePlayer(true));
        dispatch(sliderAction.setActivePlayerSlide(false));
        dispatch(playlistAction.setPlayerActive(false));
        dispatch(songsAction.setClickPlay(false));
        dispatch(playerAction.setPlay(false));
    };

    return (
        <div className="custom">
            <div className="custom__container">
                <div className="custom__images">
                    <RiPlayListLine className="custom__images-icon" />
                </div>
                <div className="custom__container-2">
                    <PlaylistName findObj={findObj} />
                    <div className="custom__container-2_bottom">
                        <button
                            onClick={onClickPlay}
                            disabled={playlistTracks.length === 0}
                            className="custom__button"
                        >
                            <div className="custom__button_container">
                                <FaPlay className="custom__button_container-icon" />
                                <p>Слушать</p>
                            </div>
                        </button>
                        <ActiveBarPlaylist
                            setAction={createPlaylistAction.setActionBarActive}
                            activeBar={actionBarActive}
                            onClickDelete={onClickDeletePlaylist}
                            title="Удалить плейлист"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePlaylist;
