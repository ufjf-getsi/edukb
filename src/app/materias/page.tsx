// pages/genres/index.jsx
import { read } from "../../../lib/neo4j";
import Link from "next/link";
import { Area } from "../../../types";
import { Autor } from "../../../types";
import ButtonReset from "../../components/ButtonReset";
import ResgisterMaterial from "../../components/RegisterMaterial";

interface AreaRecord {
  area: Area;
}

interface AutorRecord {
  autor: Autor;
}

//Busca as areas que estão no banco
async function getArea() {
  const res = await read<AreaRecord>(`
  MATCH (a:Area) RETURN a {id: ID(a), .*} AS area ORDER BY a.nome ASC`);
  const areas = res.map((row) => row.area);
  return areas;
}

//Busca as autores que estão no banco
async function getAutor() {
  const res = await read<AutorRecord>(`
  MATCH (a:Autor) RETURN a {id: ID(a), .*} AS autor ORDER BY a.nome ASC`);
  const autores = res.map((row) => row.autor);
  return autores;
}

export default async function MateriasPage() {
  const areas = await getArea();
  const autores = await getAutor();
  return (
    <div>
      <h1>Materias</h1>
      <h2>Autores</h2>
      <ul>
        {autores.map((autor) => (
          <li key={autor.id.toString()}>
            <Link href={`/materias/autor/${autor.id}`}>
              {autor.nome}
            </Link>
          </li>
        ))}
      </ul>
      <h2>Área da Computação</h2>
      <ul>
        {areas.map((area) => (
          <li key={area.id.toString()}>
            <Link href={`/materias/area/${area.id}`}>
              {area.nome}
            </Link>
          </li>
        ))}
      </ul>
      <ButtonReset />
      <ResgisterMaterial />
    </div>
  );
}
