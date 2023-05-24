import { read } from "@/../lib/neo4j";
import Link from "next/link";
import { Area } from "@/../types";

interface AreaRecord {
  area: Area;
}

//Busca as areas que estão no banco
async function getArea() {
  const res = await read<AreaRecord>(`
  MATCH (a:Area) RETURN a {id: ID(a), .*} AS area ORDER BY a.nome ASC`);
  const areas = res.map((row) => row.area);
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
              {area.nome}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
