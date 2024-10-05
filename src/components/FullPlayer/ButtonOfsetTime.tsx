import { TbRewindForward10 } from 'react-icons/tb';
import * as React from 'react';
import { MutableRefObject } from 'react';

type ButtonOfsetTimeProps = {
    audioRef: MutableRefObject<HTMLAudioElement | null>
}

const ButtonOfsetTime: React.FC<ButtonOfsetTimeProps> = ({ audioRef }) => {

    const onClickTime = () => {
        if (audioRef.current && 'currentTime' in audioRef.current) {
            audioRef.current.currentTime = audioRef.current.currentTime + 10;
        }
    };


    return (
        <button onClick={onClickTime}>
            <TbRewindForward10 className="button" />
        </button>
    )
}

export default ButtonOfsetTime