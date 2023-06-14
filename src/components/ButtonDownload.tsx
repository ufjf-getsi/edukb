"use client";
import { write } from "../../lib/neo4j";
import { useRouter } from "next/navigation";
import { Material } from "../../types";

interface MaterialRecord {
  material: Material;
}
export default function ButtonDownload(props:any) {
  const router = useRouter();

  // Adiciona +1 á quantidade de downloads do material(n_downloads)
  const baixar = async (event: any) => {
    const res = await write<MaterialRecord>(`MATCH (m:Material WHERE ID(m) = ${props.id}) SET m.n_downloads = m.n_downloads + ${1} RETURN m{.*} AS material`);
    router.refresh();
  };
  return <button onClick={baixar}>Download</button>;
}
