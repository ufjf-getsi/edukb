"use client"; //Ativa a renderização do componentes somente no cliente
import { read } from "@/../lib/neo4j";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Material } from "@/../types";
import Link from "next/link";
export const dynamic='force-dynamic'

interface MaterialRecord {
    material: Material;
  }



export default async function Search(){


    async function getMaterias() {
        const materiais = await read<Material >(`
        MATCH (m:Material) WHERE m.nome STARTS WITH 'A' RETURN m.nome`);
        return materiais;
      }

      const materials = await getMaterias();

  
      const list = materials.map((material) =>
        <li>{material.toString()}</li>
      );
      return (
        <ul>{list}</ul>
      );
    
    /*

    return (
        <>
        <form onSubmit={Search}>
            <input type = "search" placeholder="Nome Material" value={search} onChange={(e)=>setSearch(e.target.value)} required />
            <button type="submit">Buscar</button>
        </form>
        <>
        <ol>
        {materials.map((material) => (
          <li key={material.id.toString()}>
            <Link href={`/materiais/${material.id}`}>{material.nome} | Quantidade de Downloads: {material.n_downloads.toString()}</Link>
          </li>
        ))}
      </ol>
      </>  
        </>
    );
    */

}

