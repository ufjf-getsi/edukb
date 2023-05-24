import { read } from "../../../lib/neo4j";
import Link from "next/link";
import { Material } from "../../../types";
interface  MaterialRecord {
  material: Material;
}
//Busca as materiais que estão no banco
async function getMaterias() {
  const res = await read<MaterialRecord >(`
  MATCH (m:Material) RETURN m {id: ID(m), .*} AS material ORDER BY m.nome ASC`);
  const materiais = res.map((row) => row.material);
  return materiais;
}

export default async function MateriasPage() {
  const materiais = await getMaterias();
  return (
    <div>
      <h1>Materiais</h1>
      <ul>
        {materiais.map((material) => (
          <li key={material.id.toString()}>
            <Link href={`/materiais/${material.id}`}>{material.nome}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}