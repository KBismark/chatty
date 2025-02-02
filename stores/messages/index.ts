import { createStore, getStorageProvider, getStore, updateStore, useStateStore } from "statestorejs";
import { Message, User } from "../types";
import { getMainAccountStore, useMainAccountStore } from "..";

export const createChatMessageStore = ({
  alienUserId,
  store,
}: {
  alienUserId: string;
  store: Message;
}) => {
    const {id} = getMainAccountStore()
    const databaseName = `${id}-${alienUserId}`;
    createStore<Message>(databaseName, store.id, store);
};


export const useChatMessageStore = ({
  alienUserId,
  messageId,
  watch,
}: {
  alienUserId: string;
  messageId: string;
  watch?: (keyof Message)[];
}) => {
  const { id } = useMainAccountStore({ watch: [] })!;
  const databaseName = `${id}-${alienUserId}`;
  const store = useStateStore<Message>(databaseName, messageId, watch);
  return store;
};

export const useAllChatMessages = ({alienUserId}: { alienUserId: string }): Message[] => {
    const { id } = useMainAccountStore({ watch: [] })!;
    const databaseName = `${id}-${alienUserId}`;
    const data = getStorageProvider(databaseName);
    return Object.values(data).map((e) => (e as any).value);
};

export const useAllChatMessageIds = ({
  alienUserId,
}: {
  alienUserId: string;
}) => {
  const { id } = useMainAccountStore({ watch: [] })!;
  const databaseName = `${id}-${alienUserId}`;
  const data = getStorageProvider(databaseName);
  return Object.keys(data);
};

export const updateChatMessageStore = ({
  alienUserId,
  messageId,
  store,
  actors,
}: {
  alienUserId: string;
  messageId: string;
  store: Partial<User>;
  actors?: (keyof Message)[];
}) => {
    const { id } = getMainAccountStore();
    const databaseName = `${id}-${alienUserId}`;
    updateStore<Message>(databaseName, messageId, { actors, store });
};

export default {}


