"use client"; //Ativa a renderização do componentes somente no cliente
import { write } from "../../lib/neo4j";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Material } from "../../types";

interface  MaterialRecord {
  material: Material;
}
export default function ResgisterMaterial() {
  const [nomeMaterial, setNomeMaterial] = useState("");
  const router = useRouter();

  //Envia as informação para o neo4j
  const resgister = async () => {
    const res = await write<MaterialRecord>(`MERGE (m1: Material {nome: '${nomeMaterial}'}) RETURN m1`);
    setNomeMaterial("");
    router.refresh();
  };
  return (
    //Formulario para cadastrar um material
    <form onSubmit={resgister}>
      <h3>Cadastrar um Material </h3>
      <input
        type="text"
        placeholder="Nome"
        value={nomeMaterial}
        onChange={(e) => setNomeMaterial(e.target.value)}
      />
      <button type="submit">Cadastrar Material</button>
    </form>
  );
}