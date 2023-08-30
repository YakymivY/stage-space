

export interface Article {
    _id: any,
    username: string,
    userId: string,
    title: string,
    date: string,
    description: string,
    image: string,
    likedUrlIds: string[],
    likesCount: number,
    isLiked: boolean
}

export interface User {
    _id: string,
    email: string,
    username: string,
    role: string,
    profilePicture: string,
    followed: boolean;
}

export interface Actor {
    _id: string,
    email: string, 
    username: string,
    followed: boolean
}
  
export interface Director {
    _id: string,
    email: string, 
    username: string,
    followed: boolean
}


//CHAT
export interface ChatUser {
    _id: string,
    email: string, 
    username: string
}

export interface Message {
    username: string,
    text: string, 
    image: string,
    time: string,
    isImage: boolean
}
//