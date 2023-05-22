// pages/genres/index.jsx
import { read } from "@/../lib/neo4j";
import Link from "next/link";
import { Material } from "@/../types";

interface MaterialRecord {
  material: Material;
}

//Busca materias do autor
async function getMaterias(autor: string) {
  const res = await read<MaterialRecord>(`
  MATCH (m:Material)-[:POSSUI_AUTOR]->(:Autor {nome:'${autor}'}) RETURN m {.*} AS material ORDER BY m.nome ASC`);
  const materias = res.map((row) => row.material);
  return materias;
}

export default async function AutorPage({ params }: any) {
  const autor = params.autor.replaceAll("_", " ");
  const materias = await getMaterias(autor);
  return (
    <div>
      <h1>Materias de {autor}</h1>
      <ul>
        {materias.map((material) => (
          <li key={material.nome}>
            <Link
              href={`/materias/autor/${autor}/${material.nome.replaceAll(
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
