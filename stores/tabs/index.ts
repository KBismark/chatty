import { createStore } from "statestorejs"
import { createStoreHook, createStoreUpdater } from "../util"
import './search'

const databaseName = 'tabs'
const collectionName = 'global'

createStore<GlobalTabsData>(databaseName, collectionName, {
    activeTab: 'chats', // Default tab
})

// This is a hook to allow easy access to the store without providing database and the store name
export const useGlobalTabStore = createStoreHook<GlobalTabsData>({ provider: databaseName, storeId: collectionName })

// This is used to update store
export const updateGlobalTabStore = createStoreUpdater<GlobalTabsData>({ provider: databaseName, storeId: collectionName })

export default {}


export type Tabs = 'chats'|'stories'|'feed'|'search'|'settings'
export type GlobalTabsData = {
    activeTab: Tabs,
}