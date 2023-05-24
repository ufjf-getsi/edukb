import { read } from "@/../lib/neo4j";
import Link from "next/link";
import { MaterialArea } from "@/../types";

interface MaterialRecord {
  material: MaterialArea;
}

//Busca materiais da area da computação
async function getMaterias(area: Number) {
  const res = await read<MaterialRecord>(`
  MATCH (m:Material)-[:PERTENCE_A_AREA]->(a:Area WHERE ID(a) = ${area}) RETURN m {id: ID(m), area: a.nome, .*} AS material ORDER BY m.nome ASC`);
  const materiais = res.map((row) => row.material);
  return materiais;
}

export default async function AreaPage({ params }: any) {
  const area = params.area;
  const materiais = await getMaterias(area);
  return (
    <div>
      <h1>Materias de {materiais[0]?.area}</h1>
      <ul>
        {materiais.map((material) => (
          <li key={material.id.toString()}>
            <Link
              href={`/materiais/areas/${area}/${material.id}`}
            >
              {material.nome}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
