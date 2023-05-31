import { read } from "@/../lib/neo4j";
import Link from "next/link";
import { Autor } from "@/../types";
export const dynamic='force-dynamic' //Força a página ser dinâmica

interface AutorRecord {
  autor: Autor;
}

//Busca as autores que estão no banco
async function getAutor() {
  const res = await read<AutorRecord>(`
  MATCH (a:Autor) RETURN a {id: ID(a), .*} AS autor ORDER BY a.nome ASC`);
  const autores = res.map((row) => row.autor);
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
              {autor.nome}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
