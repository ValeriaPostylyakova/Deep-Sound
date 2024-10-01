export type ObjCurrentTime = {
    min: number;
    sec: number | string;
};

export type PlayerState = {
    song: SongId;
    isPlay: boolean;
    loop: false;
    currentTime: ObjCurrentTime;
    trackWidth: number;
    volume: number;
};

export type SongId = {
    id: number;
};
