import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store.ts';
import { SongObj } from '../redux/songs/types.ts';

import { GrFavorite } from 'react-icons/gr';
import { FiPlus } from 'react-icons/fi';
import { IoPlaySkipForward } from 'react-icons/io5';
import ButtonPlayPause from './FullPlayer/ButtonPlayPause.tsx';
import PlayerTracks from './FullPlayer/PlayerTracks.tsx';
import PlayerVolume from './FullPlayer/PlayerVolume.tsx';

const PlayerPlaylist = () => {
    const { playerActive, playlist } = useSelector(
        (state: RootState) => state.playlist
    );
    const obj = playlist[0];

    const [song, setSong] = React.useState<SongObj>(obj);
    const audioPlaylistRef = React.useRef<HTMLAudioElement | null>(null);
    const trackPlaylistRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
        setSong(obj);
    }, [obj]);

    const onClickNextPrev = (event: React.MouseEvent<HTMLButtonElement>) => {
        const classBtn = event.currentTarget.className;
        if (classBtn === 'next') {
            const findNextId = playlist.find((obj) => obj.id === song.id + 1);
            return setSong(findNextId as SongObj);
        } else {
            const findPrevId = playlist.find((obj) => obj.id === song.id - 1);
            return setSong(findPrevId as SongObj);
        }
    };

    return (
        playerActive && (
            <div className="player">
                <div className="player__container">
                    <div className="player__left">
                        <div className="player__left_container">
                            <img src={song?.imageUrl} alt="author" />
                            <div className="player__left_container_info">
                                <h2>{song?.title}</h2>
                                <p>{song?.author}</p>
                            </div>
                            <div className="player__left_buttons">
                                <button>
                                    <GrFavorite className="player__left-button" />
                                </button>
                                <button>
                                    <FiPlus className="player__left-button" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="player__center">
                        <div className="player__center_icon_slider">
                            <button
                                onClick={(e) => onClickNextPrev(e)}
                                className="prev"
                            >
                                <IoPlaySkipForward className="button prev" />
                            </button>

                            <ButtonPlayPause audioRef={audioPlaylistRef} />
                            <button
                                onClick={(e) => onClickNextPrev(e)}
                                className="next"
                            >
                                <IoPlaySkipForward className="button next" />
                            </button>
                        </div>
                        <PlayerTracks
                            audioRef={audioPlaylistRef}
                            obj={song}
                            trackRef={trackPlaylistRef}
                        />
                    </div>
                    <PlayerVolume audioRef={audioPlaylistRef} />
                </div>
            </div>
        )
    );
};

export default PlayerPlaylist;
