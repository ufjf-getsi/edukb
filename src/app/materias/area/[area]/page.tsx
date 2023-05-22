import { read } from "@/../lib/neo4j";
import Link from "next/link";
import { Material } from "@/../types";

interface MaterialRecord {
  material: Material;
}

//Busca materias da area da computação
async function getMaterias(area: string) {
  const res = await read<MaterialRecord>(`
  MATCH (m:Material)-[:PERTENCE_A_AREA]->(:Area {nome:'${area}'}) RETURN m {.*} AS material ORDER BY m.nome ASC`);
  const materias = res.map((row) => row.material);
  return materias;
}

export default async function AreaPage({ params }: any) {
  const area = params.area.replaceAll("_", " ");
  const materias = await getMaterias(area);
  return (
    <div>
      <h1>Materias de {area}</h1>
      <ul>
        {materias.map((material) => (
          <li key={material.nome}>
            <Link
              href={`/materias/area/${area}/${material.nome.replaceAll(
                " ",
                "_"
              )}`}
            >
              {material.nome}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
