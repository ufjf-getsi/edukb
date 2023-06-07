"use client"; //Ativa a renderização do componentes somente no cliente
import { write } from "../../lib/neo4j";
import { useRouter } from "next/navigation";
import { Material } from "../../types";

interface MaterialRecord {
  material: Material;
}
export default function ButtonReset() {
  const router = useRouter();

  //Envia as informação para o neo4j
  const reset = async (event: any) => {
    const res = await write<MaterialRecord>(`MATCH (m) DETACH DELETE m`);
    alert("Banco resetado!");
    router.refresh();
  };
  return <button onClick={reset}>Resetar Banco</button>;
}
