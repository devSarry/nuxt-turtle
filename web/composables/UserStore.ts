import type { CountsResponse, UsersResponse } from '../server/types/pocketbase-types';

type UserStore = {
    id: string,
    name: string,
    isAuthenticated: boolean
    record?: UsersResponse
    countRecord?: CountsResponse
}


export const useUserStore = () => {
  return  useState<UserStore>('user', () => ({
    id: '',
    name: '',
    isAuthenticated: false
  }))
}
