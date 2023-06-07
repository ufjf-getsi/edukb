import { read } from "../../../lib/neo4j";
import Link from "next/link";
import { Material } from "../../../types";
export const dynamic='force-dynamic' //Força a página ser dinâmica 

//Busca as materiais que estão no banco
async function getMaterias() {
  const materiais = await read<Material >(`
  MATCH (m:Material) RETURN ID(m) AS id, m.nome AS nome ORDER BY nome ASC`);
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