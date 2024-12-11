import type {WithId, Document} from 'mongodb';

export interface User extends WithId<Document>{
    email: string,
}