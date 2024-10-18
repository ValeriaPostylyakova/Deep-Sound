import { useSelector } from 'react-redux';
import { RootState } from '../redux/store.ts';
import * as React from 'react';
import { SongObj } from '../redux/songs/types.ts';
import ButtonsFavoritePlus from './FullPlayer/ButtonsFavoritePlus.tsx';
import ButtonOfsetTime from './FullPlayer/ButtonOfsetTime.tsx';
import { IoPlaySkipForward } from 'react-icons/io5';
import ButtonPlayPause from './FullPlayer/ButtonPlayPause.tsx';
import ButtonRepeat from './FullPlayer/ButtonRepeat.tsx';
import PlayerTracks from './FullPlayer/PlayerTracks.tsx';
import PlayerVolume from './FullPlayer/PlayerVolume.tsx';

const PlayerCustomPlaylist = () => {
    const playlistTracks = useSelector(
        (state: RootState) => state.playlistTracksReducer.playlistTracks
    );
    const songId = useSelector(
        (state: RootState) => state.playlistTracksReducer.songId
    );
    const [song, setSong] = React.useState<SongObj | undefined>();
    const audioSliderRef = React.useRef<HTMLAudioElement | null>(null);
    const trackRef = React.useRef<HTMLDivElement | null>(null);

    const songIndex = playlistTracks.findIndex((obj) => obj.id === songId);
    const obj = playlistTracks[songIndex];

    React.useEffect(() => {
        setSong(obj);
    }, [obj]);

    const index = playlistTracks.findIndex(
        (obj: SongObj) => obj.id === song?.id
    );

    const onClickNextPrev = (event: React.MouseEvent<HTMLButtonElement>) => {
        const classBtn = event.currentTarget.className;
        if (classBtn === 'next') {
            return setSong(playlistTracks[index + 1]);
        } else {
            return setSong(playlistTracks[index - 1]);
        }
    };

    const getAutoNextSong = () => {
        return setSong(playlistTracks[index + 1]);
    };

    return (
        <div className="player__container">
            <div className="player__left">
                <div className="player__left_container">
                    <img src={song?.imageUrl} alt="author" />
                    <div className="player__left_container_info">
                        <h2>{song?.title}</h2>
                        <h3>{song?.author}</h3>
                    </div>
                    <div className="player__left_buttons">
                        <ButtonsFavoritePlus objFavorite={song} />
                    </div>
                </div>
            </div>
            <div className="player__center">
                <div className="player__center_icon_slider">
                    <ButtonOfsetTime audioRef={audioSliderRef} />
                    <button
                        disabled={index === 0}
                        className="prev"
                        onClick={(e) => onClickNextPrev(e)}
                    >
                        <IoPlaySkipForward className="button prev" />
                    </button>

                    <ButtonPlayPause audioRef={audioSliderRef} />
                    <button
                        disabled={index === 4}
                        onClick={(e) => onClickNextPrev(e)}
                        className="next"
                    >
                        <IoPlaySkipForward className="button next" />
                    </button>
                    <ButtonRepeat />
                </div>
                <PlayerTracks
                    audioRef={audioSliderRef}
                    trackRef={trackRef}
                    getAutoNextSong={getAutoNextSong}
                    obj={song}
                />
            </div>
            <PlayerVolume audioRef={audioSliderRef} />
        </div>
    );
};

export default PlayerCustomPlaylist;
