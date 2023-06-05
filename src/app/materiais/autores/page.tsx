import { read } from "@/../lib/neo4j";
import Link from "next/link";
import { Autor } from "@/../types";
export const dynamic = "force-dynamic"; //Força a página ser dinâmica

//Busca as autores que estão no banco
async function getAutor() {
  const autores = await read<Autor>(`
  MATCH (m:Material)-[:POSSUI_AUTOR]->(autor:Autor) RETURN ID(autor) as id, autor.nome AS nome, COUNT (m.nome) AS nMateriais ORDER BY nome ASC`);
  return autores;
}

export default async function MateriasPage() {
  const autores = await getAutor();
  return (
    <div>
      <h1>Materiais por Autor</h1>
      <ul>
        {autores.map((autor) => (
          <li key={autor.id.toString()}>
            <Link href={`/materiais/autores/${autor.id}`}>
              {autor.nome} | Quantidade de materiais:{" "}
              {autor.nMateriais.toString()}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
