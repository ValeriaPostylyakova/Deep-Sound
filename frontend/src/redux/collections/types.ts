import { Genres } from '../genres/types.ts';
import { Status } from '../songs/types.ts';

export interface CollectionsState {
    collections: Genres[];
    title: string | undefined;
    status: Status;
}
