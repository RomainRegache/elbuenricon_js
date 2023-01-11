export interface Article {
  _id?: string;
  idTypeProduit: number;
  idEtatProduit: number;
  pseudo: string;
  nom: string;
  description: string;
  prix: number;
  datePublication: Date;
}
