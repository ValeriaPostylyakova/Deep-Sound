import { SongObj } from '../songs/types.ts';
import { ObjCurrentTime } from '../player/types.ts';

export type DataObj = {
    id: number;
    sliderSongs: SongObj[];
};

export interface SliderState {
    activePlayerSlide: boolean;
    dataSongs: DataObj[];
    slideFilterData: SongObj[];
    isPlay: boolean;
    currentTime: ObjCurrentTime;
    trackWidth: number;
}
