import { read } from "@/../lib/neo4j";
import Link from "next/link";
import { Material } from "@/../types";
export const dynamic='force-dynamic'

//Mostra materiais e suas quantidades de downloads em ordem decrescente
async function getMaterias() {
  const materiais = await read<Material >(`
  MATCH (m:Material) RETURN ID(m) AS id, m.nome AS nome, m.n_downloads AS n_downloads ORDER BY n_downloads DESC`);
  return materiais;
}

export default async function MateriasPage() {
  const materiais = await getMaterias();
  return (
    <div>
      <h1>Downloads</h1>
      <ol>
        {materiais.map((material) => (
          <li key={material.id.toString()}>
            <Link href={`/materiais/${material.id}`}>{material.nome} | Quantidade de Downloads: {material.n_downloads.toString()}</Link>
          </li>
        ))}
      </ol>
    </div>
  );
}