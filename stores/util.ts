export {createStoreUpdater, createStoreHook} from "statestorejs";

// export const createStoreUpdater = <S>({provider, storeId}:{provider: string; storeId: string})=>{
//     return ({actors,store}:{actors?: Array<keyof S>, store:Partial<S extends { [k: string]: any; [k: number]: any; [k: symbol]: any; } ? S : never>})=>updateStore(provider, storeId, {actors, store} )
// }

// export const createStoreHook = <S>({ provider, storeId}:{provider: string; storeId: string})=>{
//     return function useState({watch}:{watch?: Array<keyof S>}){
//         return useStateStore<S>(provider, storeId, watch)
//     }
// }