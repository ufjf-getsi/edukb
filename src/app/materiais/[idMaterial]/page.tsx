import { read } from "@/../lib/neo4j";
import { Material, Area, Autor, PalavraChave, TipoConteudo } from "@/../types";

interface MaterialRecord {
  material: Material;
  area: Area;
  autor: Autor;
  palavraChave: PalavraChave;
  tipoConteudo: TipoConteudo;
}

//Busca material
async function getMaterial(idMaterial: Number) {
  const res = await read<MaterialRecord>(`
    MATCH (m:Material WHERE ID(m) = ${idMaterial})-[:POSSUI_AUTOR]->(a:Autor)
    MATCH (m)-[:PERTENCE_A_AREA]->(ar:Area)
    MATCH (m)-[:PERTENCE_A_TIPO]->(tc:TipoConteudo)
    MATCH (m)-[:POSSUI_PALAVRAS_CHAVE]->(pc:PalavraChave)     
    RETURN m{.*} AS material, a{.*} AS autor, ar{.*} AS area, tc{.*} AS tipoConteudo, 
    pc{.*} AS palavraChave;`);
  return res;
}

export default async function MaterialPage({ params }: any) {
  const materialResult = await getMaterial(params.idMaterial);

  //Trata os autores e as palavra-chaves
  const palavrasChaves: string[] = [];
  const autores: string[] = [];
  materialResult.forEach((material) => {
    if (!palavrasChaves.includes(material.palavraChave.nome)) {
      palavrasChaves.push(material.palavraChave.nome);
    }
    if (!autores.includes(material.autor.nome)) {
      autores.push(material.autor.nome);
    }
  });
  palavrasChaves.sort();
  autores.sort();

  //Pega somente o primeiro material
  const material: any = [];
  material.push(materialResult.find((material) => material));

  return (
    <div>
      {material?.map((material: MaterialRecord) => (
        <>
          <h3>Titulo: {material?.material.nome}</h3>
          <h5>Descrição: {material?.material.descricao}</h5>
          <h5>Autor(es): {autores.join(", ")}</h5>
          <h5>Tipo de Conteúdo: {material?.tipoConteudo.nome}</h5>
          <h5>Área da Computação: {material?.area.nome}</h5>
          <h5>Idioma: {material?.material.idioma}</h5>
          <h5>Palavras-Chaves: {palavrasChaves.join(", ")}</h5>
          <h5>
            Lincença Creative Commons:{" "}
            {material?.material.licença_creative_commons}
          </h5>
          <h5>URL: {material?.material.url}</h5>
        </>
      ))}
    </div>
  );
}
