// pages/genres/index.jsx
import { read } from "../../../../lib/neo4j";
import Link from "next/link";
import { Material } from "../../../../types";
import ResgisterMaterial from "../../../components/RegisterMaterial";
import ButtonReset from "../../../components/ButtonReset"

interface  MaterialRecord {
  material: Material;
}
async function getMaterias(area :string) {
  const res = await read<MaterialRecord >(`
  MATCH (m:Material) RETURN m {.*} AS material ORDER BY m.nome ASC`);
  const materias = res.map((row) => row.material);
  console.log(area.replaceAll('_',' '));
  return materias;
}
export default async function AreaPage({ params }: any) {
  const materias = await getMaterias(params.area);
  return (
    <div>
      <h1>Materias</h1>
      <ul>
        {materias.map((material) => (
          <li key={material.nome}>
            <Link href={`/materias/area/${material.nome}`}>{material.nome}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}