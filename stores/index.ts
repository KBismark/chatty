import React from "react";
import { configureForReact, createStore, getStore } from "statestorejs";
import { AccountUser } from "./types";
import { createStoreHook, createStoreUpdater } from "./util";
import './tabs'
import './users'
import './ui'

// Configure store for use in react env 
configureForReact(React);

export const FakeUser: AccountUser = {
    id: 'gh-0594391706',
    profileImage: undefined,
    name: 'KBismark',
    contact: '+233 594 391 706',
    settings: {},
    contactList: [],
}

const databaseName = 'account'
const collectionName = 'main'

createStore<AccountUser>(databaseName, collectionName, FakeUser );

// This is a hook to allow easy access to the store without providing database and the store name
export const useMainAccountStore = createStoreHook<AccountUser>({
  provider: databaseName,
  storeId: collectionName,
});

// This is used to update store
export const updateMainAccountStore = createStoreUpdater<AccountUser>({ provider: databaseName, storeId: collectionName })

export const getMainAccountStore = () => getStore<AccountUser>(databaseName, collectionName)!;

export default {}
