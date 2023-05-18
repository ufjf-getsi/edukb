// pages/genres/index.jsx
import { read } from "../../../../lib/neo4j";
import { Material } from "../../../../types";
interface MaterialRecord {
  material: Material;
}

async function getMaterial(nomeMaterial: string) {
  const res = await read<MaterialRecord>(`
    MATCH (m:Material{nome:'${nomeMaterial}'}) RETURN m{.*} AS material;
    `);
  const material = res.map((row) => row.material);
  return material;
}

export default async function MaterialPage({ params }: any) {
  const material = await getMaterial(params.nomeMaterial);
  return (
    <div>
      {material.map((material) => (
        <>
          <h3>Titulo: {material.nome}</h3>
          <h5>Descrição: {material.descricao}</h5>
          <h5>Idioma: {material.idioma}</h5>
          <h5>
            Lincença Creative Commons: {material.licença_creative_commons}
          </h5>
          <h5>
            URL: {material.url}
          </h5>
        </>
      ))}
    </div>
  );
}
