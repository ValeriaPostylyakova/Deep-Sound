import { DataObj } from '../sliderPlayer/types';
import { Status } from '../songs/types.ts';

export type GenresState = {
    genres: DataObj[];
    statusGenres: Status;
};
