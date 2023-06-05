import { read } from "@/../lib/neo4j";
import Link from "next/link";
import { Area } from "@/../types";
export const dynamic = "force-dynamic"; //Força a página ser dinâmica

//Busca as áreas que estão no banco
async function getArea() {
  const areas = await read<Area>(`
  MATCH (m:Material)-[:PERTENCE_A_AREA]->(area:Area) RETURN ID(area) as id, area.nome AS nome, COUNT (m.nome) AS nMateriais ORDER BY nome ASC`);
  return areas;
}

export default async function AreasPage() {
  const areas = await getArea();
  return (
    <div>
      <h1>Materiais por Área da Computação</h1>
      <ul>
        {areas.map((area) => (
          <li key={area.id.toString()}>
            <Link href={`/materiais/areas/${area.id}`}>
              {area.nome} | Quantidade de materiais:{" "}
              {area.nMateriais.toString()}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
