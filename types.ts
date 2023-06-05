
export interface Material {
  id: Number;
  nome: string;
  descricao: string;
  idioma: string;
  licença_creative_commons: string;
  url: string;
}
export interface Area {
  id: Number;
  nome: string;
  nMateriais: Number;
}
export interface Autor {
  id: Number;
  nome: string;
}
export interface PalavraChave {
  id: Number;
  nome: string;
}
export interface TipoConteudo {
  id: Number;
  nome: string;
}
export interface MaterialArea {
  id: Number;
  nome: string;
  descricao: string;
  idioma: string;
  licença_creative_commons: string;
  url: string;
  area: string;
}
export interface MaterialAutor {
  id: Number;
  nome: string;
  descricao: string;
  idioma: string;
  licença_creative_commons: string;
  url: string;
  autor: string;
}
