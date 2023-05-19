// pages/genres/index.jsx
import { read } from "@/../lib/neo4j";
import { Material, Area, Autor, PalavraChave, TipoConteudo } from "@/../types";
interface MaterialRecord {
  material: Material;
  area: Area;
  autor: Autor;
  palavraChave: PalavraChave;
  tipoConteudo: TipoConteudo;
}

async function getMaterial(nomeMaterial: string) {
  const res = await read<MaterialRecord>(`
    MATCH (m:Material{nome:'${nomeMaterial}'})-[:POSSUI_AUTOR]->(a:Autor)
    MATCH (m)-[:PERTENCE_A_AREA]->(ar:Area)
    MATCH (m)-[:PERTENCE_A_TIPO]->(tc:TipoConteudo)
    MATCH (m)-[:POSSUI_PALAVRAS_CHAVE]->(pc:PalavraChave)     
    RETURN m{.*} AS material, a{.*} AS autor, ar{.*} AS area, tc{.*} AS tipoConteudo, 
    pc{.*} AS palavraChave;`);
  return res;
}

export default async function MaterialPage({ params }: any) {
  const materialResult = await getMaterial(
    params.nomeMaterial.replaceAll("_", " ")
  );
  const material: any = [];
  material.push(materialResult.find((material) => material));
  return (
    <div>
      {material?.map((material: MaterialRecord) => (
        <>
          <h3>Titulo: {material.material.nome}</h3>
          <h5>Descrição: {material.material.descricao}</h5>
          <h5>Idioma: {material.material.idioma}</h5>
          <h5>
            Lincença Creative Commons:{" "}
            {material.material.licença_creative_commons}
          </h5>
          {materialResult.map((autor) => (
            <h5>Autor: {autor.autor.nome}</h5>
          ))}
          <h5>URL: {material.material.url}</h5>
        </>
      ))}
    </div>
  );
}
