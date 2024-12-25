import { createStore, updateStore, useStateStore } from "statestorejs";
import { User } from "../types";
const databaseName = 'users'

export const createUserStore = ({userId, store}: {userId:string, store: User})=>{
    createStore<User>(databaseName, userId, store);
}


export const useUserStore = ({userId, watch}: {userId:string, watch?: (keyof User)[]})=>{
    const store =  useStateStore<User>(databaseName, userId, watch);
    return store;
}

export const updateUserStore = ({userId, store, actors}: {userId:string, store: Partial<User>, actors?: (keyof User)[]})=>{
    updateStore(databaseName, userId, {actors, store})
}

export default {}


