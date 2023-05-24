// pages/genres/index.jsx
import { read } from "@/../lib/neo4j";
import Link from "next/link";
import { MaterialAutor } from "@/../types";

interface MaterialRecord {
  material: MaterialAutor;
}

//Busca materias do autor
async function getMaterias(autor: Number) {
  const res = await read<MaterialRecord>(`
  MATCH (m:Material)-[:POSSUI_AUTOR]->(a:Autor WHERE ID(a) = ${autor}) RETURN m {id: ID(m), autor: a.nome, .*} AS material ORDER BY m.nome ASC`);
  const materias = res.map((row) => row.material);
  return materias;
}

export default async function AutorPage({ params }: any) {
  const autor = params.autor;
  const materias = await getMaterias(autor);
  return (
    <div>
      <h1>Materias de {materias[0]?.autor}</h1>
      <ul>
        {materias.map((material) => (
          <li key={material.id.toString()}>
            <Link
              href={`/materias/autor/${autor}/${material.id}`}
            >
              {material.nome}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
