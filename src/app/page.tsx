
"use client"; //Ativa a renderização do componentes somente no cliente
import { read } from "@/../lib/neo4j";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Material } from "@/../types";
import Link from "next/link";
export const dynamic='force-dynamic'





export default async function Search(){



  const [search, setSearch] = useState('');

  //const letra = 'A';

  // Função para buscar no banco os materiais que começam com as letras digitadas
  async function getMaterias() {
    const materiais = await read<Material >(`
    MATCH (m:Material) WHERE m.nome STARTS WITH '${search}' RETURN ID(m) AS id, m.nome AS nome ORDER BY nome DESC`);
    return materiais;
  }

  const materials = await getMaterias();

  // retorna uma lista ordenada de materiais por ordem decrescente
      return (
        <div>
          <h1>Home</h1>
          <input type="text" 
          placeholder="Digite o nome do material"
          onChange={e => setSearch(e.target.value)}
          value={search} />
          <ol>
            {materials.map((material) => (
              <li key={material.id.toString()}>
                <Link href={`/materiais/${material.id}`}>{material.nome}</Link>
              </li>
            ))}
          </ol>
        </div>
      );
  
}



