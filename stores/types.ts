
/** Main user - Logged in user */
export interface AccountUser extends Omit<Omit<User, 'last'>,'isUser'> {
    settings: {

    },
    contactList: string[];
}

/** Aliens - Other users of the app */
export interface User {
    id: string;
    profileImage?: string;
    name?: string;
    contact?: string;
    last: {
        date: string;
        messagePreview: string;
        failed?: boolean;
    },
    isUser?: boolean
}

export interface Conversation {
    id: string;
    with: string[];
    messages: {date: string; data: Message[]}[]
}

type MessageSuccessCount = 'failed'|'first'|'second'|'final'
type Messagemedia = {type: 'image', source: string[]}|{type: 'video', source: string}|{type: 'audio', source: string}
export interface Message {
    id: string;
    time: string;
    type: 'fowarded'|'reply'|'normal';
    senderId: string;
    successCount: MessageSuccessCount;
    data: {
        repliedMessageId?: string;
        text?: string;
        media?: Messagemedia
    }
}




export type UI = {
    scroll:number;
    chatHeaderScroll:number,
    activate: boolean,
    searchSearchOn: boolean;
    storiesSearchOn: boolean
}
export const UIInit: UI = {
    scroll: 0, activate: false,
    chatHeaderScroll: 90,
    searchSearchOn: false,
    storiesSearchOn: false
} 


export type UITabs = {
    'chats': {

    },
    'stories': {

    },
    'feed': {

    },
    'search': {

    },
    'settings': {

    }
}