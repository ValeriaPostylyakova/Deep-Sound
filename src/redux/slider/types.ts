import { SongObj } from '../songs/types.ts';

export type DataObj = {
    id: number;
    sliderSongs: SongObj[];
};

export interface SliderState {
    activePlayerSlide: boolean;
    dataSongs: DataObj[];
    slideFilterData: SongObj[];
}
