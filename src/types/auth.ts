export interface JwtResponse {
    menssage: string,
    token: string 
}

export interface Decode {
    id: string,
    role: string,
    iat: number,
    exp: number
}

export interface VerifyJwt {
    id: string,
    role: string
}