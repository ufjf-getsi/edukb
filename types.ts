
export interface Material {
  id: number;
  nome: string;
  descricao: string;
  idioma: string;
  licença_creative_commons: string;
  url: string;
  n_downloads: number;
}
export interface Area {
  id: number;
  nome: string;
  nMateriais: Number;
}
export interface Autor {
  id: number;
  nome: string;
  nMateriais: number;
}
export interface PalavraChave {
  id: number;
  nome: string;
}
export interface TipoConteudo {
  id: number;
  nome: string;
}
export interface MaterialArea {
  id: number;
  nome: string;
  descricao: string;
  idioma: string;
  licença_creative_commons: string;
  url: string;
  area: string;
}
export interface MaterialAutor {
  id: number;
  nome: string;
  descricao: string;
  idioma: string;
  licença_creative_commons: string;
  url: string;
  autor: string;
}
