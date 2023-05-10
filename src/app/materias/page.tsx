// pages/genres/index.jsx
import { read } from "../../../lib/neo4j";
import Link from "next/link";
import { Material } from "../../../types";
import ResgisterMaterial from "../../components/RegisterMaterial";

interface  MaterialRecord {
  material: Material;
}
export async function getMaterias() {
  const res = await read<MaterialRecord >(`
  MATCH (m:Material) RETURN m {.*} AS material ORDER BY m.nome ASC`);
  const materias = res.map((row) => row.material);
  return materias;
}
export default async function MateriasPage() {
  const materias = await getMaterias();
  return (
    <div>
      <h1>Materias</h1>
      <ul>
        {materias.map((material) => (
          <li key={material.nome}>
            {material.nome}
          </li>
        ))}
      </ul>
      <ResgisterMaterial />
    </div>
  );
}