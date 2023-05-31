"use client"; //Ativa a renderização do componentes somente no cliente
import { write } from "../../lib/neo4j";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Material } from "../../types";

interface MaterialRecord {
  material: Material;
}
export default function RegisterMaterial() {
  const [nomeMaterial, setNomeMaterial] = useState("");
  const [descricao, setDescricao] = useState("");
  const [nomeAutores, setNomeAutor] = useState("");
  const [url, setUrl] = useState("");
  const [idioma, setIdioma] = useState("");
  const [tipoLicenca, setTipoLicenca] = useState("");
  const [tipoConteudo, setTipoConteudo] = useState("");
  const [area, setArea] = useState("");
  const [palavrasChaves, setPalavrasChave] = useState("");
  const router = useRouter();

  //Envia as informação para o neo4j
  const resgister = async (event: any) => {
    event.preventDefault();

    //Separa os autores
    const autores = nomeAutores.split(",").map((autor) => autor.trim());

    //Separa as palavras-chaves
    const palavras = palavrasChaves.split(",").map((palavra) => palavra.trim());

    //Cria query de cadastro
    let query: string = `// Cria o Material
    MERGE (m1 : Material {nome: '${nomeMaterial}', descricao: '${descricao}', idioma: '${idioma}', licença_creative_commons:'${tipoLicenca}', url:'${url}', n_downloads: 0})
    
    // Cria o tipo de Conteúdo
    MERGE (t1 : TipoConteudo {nome: '${tipoConteudo}'})
    
    // Cria a aréa
    MERGE (ar1 : Area {nome: '${area}'})
    
    // Cria o relacionamento entre material e tipo de Conteúdo
    MERGE (m1)-[: PERTENCE_A_TIPO]->(t1)
    
    // Cria o relacionamento entre material e área
    MERGE (m1)-[: PERTENCE_A_AREA]->(ar1)
    
    // Cria os autores e relacionamento entre material e autores
    `;

    //Adiciona os autores na query
    let i = 0;
    autores.forEach(
      (autor) =>
        (query += `MERGE (a${i} : Autor {nome: '${autor}'}) 
    MERGE (m1)-[: POSSUI_AUTOR]->(a${i++})
    
    // Cria as palavras-chaves e relacionamento entre material e palavras-chaves
    `)
    );

    //Adiciona as palavras-chaves na query
    i = 0;
    palavras.forEach(
      (palavra) =>
        (query += `MERGE (ch${i} : PalavraChave {nome: '${palavra}'})
            MERGE (m1)-[: POSSUI_PALAVRAS_CHAVE]->(ch${i++})
        `)
    );

    //Realiza o cadastro do material
    const res = await write<MaterialRecord>(query);
    setNomeMaterial("");
    setArea("");
    setDescricao("");
    setNomeAutor("");
    setIdioma("");
    setTipoLicenca("");
    setTipoConteudo("");
    setArea("");
    setUrl("");
    setPalavrasChave("");
    //event.target.selectedTipoConteudo.selectedIndex = 0;
    event.target.reset();
    router.refresh();
  };
  return (
    //Formulario para cadastrar um material
    <>
    <form onSubmit={resgister}>
      <input
        type="text"
        placeholder="Titulo"
        value={nomeMaterial}
        onChange={(e) => setNomeMaterial(e.target.value)}
        required
      />
      <textarea
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Autor(es)"
        value={nomeAutores}
        onChange={(e) => setNomeAutor(e.target.value)}
        required
      />
      <select
        name="selectedTipoConteudo"
        defaultValue=""
        onChange={(e) => setTipoConteudo(e.target.value)}
        required
      >
        <option disabled value="">
          Tipo de Conteúdo
        </option>
        <option value="Arquivo em Áudio">Arquivo em Áudio</option>
        <option value="Arquivo em PDF">Arquivo em PDF</option>
        <option value="Arquivo de Texto">Arquivo de Texto</option>
        <option value="Link">Link</option>
        <option value="Vídeo">Vídeo</option>
        <option value="Outro">Outro</option>
      </select>
      <select
        name="selectedArea"
        defaultValue=""
        onChange={(e) => setArea(e.target.value)}
        required
      >
        <option disabled value="">
          Área da Computação
        </option>
        <option value="Ciência de Dados">Ciência de Dados</option>
        <option value="Engenharia de Software">Engenharia de Software</option>
        <option value="Multidisciplinar">Multidisciplinar</option>
        <option value="Segurança">Segurança</option>
      </select>
      <select
        name="selectedIdioma"
        defaultValue=""
        onChange={(e) => setIdioma(e.target.value)}
        required
      >
        <option disabled value="">
          Idioma
        </option>
        <option value="Português">Português</option>
        <option value="Inglês">Inglês</option>
      </select>
      <input
        type="text"
        placeholder="Palavras-chave"
        value={palavrasChaves}
        onChange={(e) => setPalavrasChave(e.target.value)}
        required
      />
      <select
        name="selectedTipoLicenca"
        onChange={(e) => setTipoLicenca(e.target.value)}
        defaultValue=""
        required
      >
        <option disabled value="">
          {" "}
          Tipos de Licença
        </option>
        <option value="	BY-SA">BY-SA</option>
        <option value="CC BY NC SA">CC BY NC SA</option>
        <option value="CC BY SA">CC BY SA</option>
        <option value="CC0">CC0</option>
      </select>
      <input
        type="text"
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <button type="submit">Cadastrar Material</button>
    </form>
    <p>Obs: separar os autores e as palavras-chaves por vírgula (,)</p>
    </>
  );
}
