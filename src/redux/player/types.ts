export type ObjCurrentTime = {
    min: number;
    sec: number;
};

export type PlayerState = {
    song: SongId;
    play: boolean;
    loop: false;
    currentTime: ObjCurrentTime;
    trackWidth: number;
};

export type SongId = {
    id: number;
};
