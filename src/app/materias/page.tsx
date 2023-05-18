// pages/genres/index.jsx
import { read } from "../../../lib/neo4j";
import Link from "next/link";
import { Area } from "../../../types";
import ButtonReset from "../../components/ButtonReset";
import ResgisterMaterial from "../../components/RegisterMaterial";
interface  AreaRecord {
  area: Area;
}
async function getArea() {
  const res = await read<AreaRecord >(`
  MATCH (m:Area) RETURN m {.*} AS area ORDER BY m.nome ASC`);
  const areas = res.map((row) => row.area);
  return areas;
}
export default async function MateriasPage() {
  const areas = await getArea();
  return (
    <div>
      <h1>Materias</h1>
      <h2>Área da Computação</h2>
      <ul>
        {areas.map((area) => (
          <li key={area.nome}>
            <Link href={`/materias/${area.nome.replaceAll(' ','_')}`}>{area.nome}</Link>
          </li>
        ))}
      </ul>
      <ButtonReset />
      <ResgisterMaterial />
    </div>
  );
}