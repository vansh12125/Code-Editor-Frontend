interface RegisterUserRequest{
    name:string;
    username:string;
    email:string;
    password:string;
}

interface LoginUserRequest{
    username:string;
    password:string;
}

export type {RegisterUserRequest,LoginUserRequest}