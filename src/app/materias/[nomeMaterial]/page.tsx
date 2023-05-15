// pages/genres/index.jsx
import { read } from "../../../../lib/neo4j";
import { Material } from "../../../../types";
interface  MaterialRecord {
    material: Material;
}

async function getMaterial(nomeMaterial: string) {
    const res = await read<MaterialRecord >(`
    MATCH (m:Material{nome:'${nomeMaterial}'}) RETURN m{.*} AS material;
    `);
    const material = res.map((row) => row.material);
    return material;

}   

export default async function MaterialPage({ params }: any) {
  const material = await getMaterial(params.nomeMaterial);
  return (
    <div>
      <h3>Titulo: {material[0].nome}</h3>
      <h5>Descrição: {material[0].descricao}</h5>
      <h5>Idioma: {material[0].idioma}</h5>
      <h5>Lincença Creative Commons: {material[0].licença_creative_commons}</h5>
    </div>
  );
}