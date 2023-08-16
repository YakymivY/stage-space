

export interface Article {
    _id: any,
    username: string,
    userId: string,
    title: string,
    date: string,
    description: string,
    image: string
}

export interface User {
    id: string,
    email: string,
    username: string,
    role: string,
    profilePicture: string
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