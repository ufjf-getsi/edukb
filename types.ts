import { Integer } from "neo4j-driver";

export interface Material {
    id: Integer;
    nome: string;
    descricao: string;
    idioma: string;
    licença_creative_commons:string;
    url:string;
}
export interface Area {
    id: Integer;
    nome: string;
}
export interface Autor {
    id: Integer;
    nome: string;
}
export interface PalavraChave {
    id: Integer;
    nome: string;
}
export interface TipoConteudo{
    id: Integer;
    nome: string;
}