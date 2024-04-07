import PocketBase from 'pocketbase';
import { type UsersResponse, type CountsRecord, type CountsResponse, Collections } from '~/server/types/pocketbase-types';


const pb = new PocketBase('http://127.0.0.1:8090');

export const pbClient = pb;


export const UserCollection = pb.collection<UsersResponse>(Collections.Users);

export const CounterCollection = pb.collection<CountsRecord>(Collections.Counts);

export const CreateCount = async (user_id: string) => {
    const count = await CounterCollection.create<CountsResponse>({ user_id, value: 0 });
    return count;
}

export const UpdateCount = async (usersCount: CountsRecord, value: number) => {
    const count = await CounterCollection.update<CountsResponse>(usersCount.user_id!, { value });
    return count;
}

