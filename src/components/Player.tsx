import * as React from 'react';

import { IoPlay } from 'react-icons/io5';
import { IoPlaySkipForward } from 'react-icons/io5';
import { MdOutlineReplay10 } from 'react-icons/md';
import { RiRepeat2Line } from 'react-icons/ri';

import macan from '../../public/song-2.webp';

type PlayerProps = {
    activePlayer: boolean;
};

const Player: React.FC<PlayerProps> = ({ activePlayer }) => {
    return (
        activePlayer && (
            <div className="player">
                <div className="player__container">
                    <div className="player__left">
                        <h1>1</h1>
                        <div className="player__left_container">
                            <img src={macan} alt="macan" />
                            <div className="player__left_container_info">
                                <h2>Привыкаю</h2>
                                <p>Macan, A.V.G</p>
                            </div>
                        </div>
                    </div>
                    <div className="player__center">
                        <div className="player__center_icon">
                            <MdOutlineReplay10 className="button" />
                            <IoPlaySkipForward className="button rotate" />
                            <IoPlay className="button" />
                            <IoPlaySkipForward className="button" />
                            <RiRepeat2Line className="button" />
                        </div>
                        <div className="player__center_time">
                            <p>0:00</p>
                            <input type="text" />
                            <p>2:54</p>
                        </div>
                    </div>
                    <div className="player__right">
                        <p>Lorem ipsum dolor</p>
                    </div>
                </div>
            </div>
        )
    );
};

export default Player;
