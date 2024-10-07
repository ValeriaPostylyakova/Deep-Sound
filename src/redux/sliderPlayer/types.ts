import { SongObj, Status } from '../songs/types.ts';
import { ObjCurrentTime } from '../player/types.ts';

export type DataObj = {
    id: number;
    imageUrl?: string;
    sliderSongs: SongObj[];
};

export interface SliderState {
    dataSongs: DataObj[];
    status: Status;
    activePlayerSlide: boolean;
    slideFilterData: SongObj[];
    slideActive: DataObj[];
    isPlay: boolean;
    currentTime: ObjCurrentTime;
    trackWidth: number;
}
