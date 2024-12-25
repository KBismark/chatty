import { createStore, getStore } from "statestorejs"
import { createStoreHook, createStoreUpdater } from "../util"
import { UI, UIInit } from "../types"

const databaseName = 'ui'
const collectionName = 'latestStories'

createStore<UI>(databaseName, collectionName, UIInit)


// This is a hook to allow easy access to the store without providing database and the store name
export const useLatestStoryUIStore = createStoreHook<UI>({ provider: databaseName, storeId: collectionName })

// This is used to update store
export const updateLatestStoryUIStore = createStoreUpdater<UI>({ provider: databaseName, storeId: collectionName })

export const getLatestStoryUIStore = ()=> (getStore<UI>(databaseName, collectionName)||UIInit)

export default {}
