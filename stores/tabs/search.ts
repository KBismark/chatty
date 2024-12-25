import { createStore } from "statestorejs"
import { createStoreHook, createStoreUpdater } from "../util"

const databaseName = 'tabs'
const collectionName = 'search'

createStore<SearchTabData>(databaseName, collectionName, {
    'From contacts': [],
    'May Know': [],
    recents: [],
    seacrhText: '',
    isSearching: false
})

// This is a hook to allow easy access to the store without providing database and the store name
export const useSearchTabStore = createStoreHook<SearchTabData>({ provider: databaseName, storeId: collectionName })

// This is used to update store
export const updateSearchTabStore = createStoreUpdater<SearchTabData>({ provider: databaseName, storeId: collectionName })

export default {}

export type SearchTabData = {
    recents: string[],
    'May Know': string[],
    'From contacts': [],
    seacrhText: string;
    isSearching: boolean;
}