import { read } from "@/../lib/neo4j";
import Link from "next/link";
import { MaterialAutor } from "@/../types";

interface MaterialRecord {
  material: MaterialAutor;
}

//Busca materiais do autor
async function getMaterias(autor: Number) {
  const res = await read<MaterialRecord>(`
  MATCH (m:Material)-[:POSSUI_AUTOR]->(a:Autor WHERE ID(a) = ${autor}) RETURN m {id: ID(m), autor: a.nome, .*} AS material ORDER BY m.nome ASC`);
  const materiais= res.map((row) => row.material);
  return materiais;
}

export default async function AutorPage({ params }: any) {
  const autor = params.autor;
  const materiais = await getMaterias(autor);
  return (
    <div>
      <h1>Materiais de {materiais[0]?.autor}</h1>
      <ul>
        {materiais.map((material) => (
          <li key={material.id.toString()}>
            <Link
              href={`/materiais/${material.id}`}
            >
              {material.nome}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
