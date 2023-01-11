export interface Auth {
    token: string;
}

export interface DecodedToken {
    pseudo: string;
    exp: number;
    iat: number;
}