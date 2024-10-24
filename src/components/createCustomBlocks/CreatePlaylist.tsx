import * as React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { RiPlayListLine } from 'react-icons/ri';
import { MdOutlineModeEdit } from 'react-icons/md';
import { FaPlay } from 'react-icons/fa6';

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

import ActiveBarPlaylist from './ActiveBarPlaylist.tsx';
import { SongObj } from '../../redux/songs/types.ts';

type CreatePlaylistProps = {
    findObj: CustomPlaylistObj | undefined;
};

const CreatePlaylist: React.FC<CreatePlaylistProps> = ({ findObj }) => {
    const dispatch: AppDispatch = useDispatch();

    const inputValue = useSelector(
        (state: RootState) => state.createPlaylistReducer.inputValue
    );
    const playlistTracks = useSelector(
        (state: RootState) => state.playlistTracksReducer.playlistTracks
    );

    const actionBarActive = useSelector(
        (state: RootState) => state.createPlaylistReducer.actionBarActive
    );

    const id = window.location.pathname.slice(28);

    React.useEffect(() => {
        dispatch(fetchPlaylistTracks(id));
    }, [dispatch, id]);

    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const buttonEditRef = React.useRef<HTMLButtonElement | null>(null);

    const navigate = useNavigate();

    const HandleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(createPlaylistAction.setInputValue(event.target.value));
    };

    const HandleMouseEnter = () => {
        if (buttonEditRef.current) {
            buttonEditRef.current.style.display = 'block';
        }
    };

    const HandleMouseLeave = () => {
        if (buttonEditRef.current) {
            buttonEditRef.current.style.display = 'none';
        }
    };

    const handleModal = () => {
        dispatch(createPlaylistAction.setDeletePlaylist(false));
        navigate('/Deep-Sound/');
        window.location.reload();
    };

    const onClickDeletePlaylist = async () => {
        dispatch(createPlaylistAction.setDeletePlaylist(true));
        try {
            if (localStorage.getItem('user') !== null) {
                const obj = JSON.parse(localStorage.getItem('user') || '');
                await axios.delete(
                    `https://985cc4acb156d262.mokky.dev/createPlaylist/${findObj?.id}`,
                    { headers: { Authorization: `Bearer ${obj.token}` } }
                );
                setTimeout(handleModal, 2000);
            }
        } catch (err) {
            console.error(err);
            alert(
                'Ошибка при удалении плейлиста. Пожалуйста, перезагрузите страницу и попробуйте ещё раз'
            );
        }
        dispatch(createPlaylistAction.setActionBarActive(false));
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
                    <div className="custom__container-2_edit">
                        <input
                            className="enter"
                            ref={inputRef}
                            onChange={HandleChangeInput}
                            type="text"
                            value={inputValue}
                            onMouseEnter={HandleMouseEnter}
                            onMouseLeave={HandleMouseLeave}
                        />
                        <button
                            ref={buttonEditRef}
                            className="custom__container-2_edit-button"
                        >
                            <MdOutlineModeEdit className="custom__container-2_edit-icon" />
                        </button>
                    </div>

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
