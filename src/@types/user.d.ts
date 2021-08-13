export type UserProfileName = 'client' | 'admin';

export type UserRoles = string[];

export type Token = string;

export type LoginDocuments = {
    username: string,
    password: string
}

export type UserDocuments = {
    _id?: number,
    username: string,
    email: string,
    firstname: string,
    lastname: string,
    phone: String,
    orientation: String,
    point: Number,
    biddingCode: String,
    profileImage: String,
    gender: string,
    birthdate: Date
}