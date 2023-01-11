export interface User {
    pseudo: string;
}

export interface Credential {
    pseudo: string;
    password: string;
    email: string;
    id: number;
    idTypeUser: number;
    nom: string;
    prenom: string;
    pathPhotoProfil: string;
    ville: string;
    adresse1: string;
    adresse2: string;
    codePostal: number;
}
