"use client"; //Ativa a renderização do componentes somente no cliente
import { write } from "../../lib/neo4j";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Material } from "../../types";

interface MaterialRecord {
  material: Material;
}
export default function ResgisterMaterial() {
  const [nomeMaterial, setNomeMaterial] = useState("");
  const [descricao, setDescricao] = useState("");
  const [nomeAutor, setNomeAutor] = useState("");
  const [idioma, setIdioma] = useState("");
  const [tipoLicenca, setTipoLicenca] = useState("");
  const [tipoConteudo, setTipoConteudo] = useState("");
  const [area, setArea] = useState("");
  const [palavrasChave, setPalavrasChave] = useState("");
  const router = useRouter();

  //Envia as informação para o neo4j
  const resgister = async (event: any) => {
    event.preventDefault();
    const res = await write<MaterialRecord>(`// Cria o Material
    MERGE (m1 : Material {nome: '${nomeMaterial}', descricao: '${descricao}', idioma: '${idioma}', licença_creative_commons:'${tipoLicenca}'})
    
    // Cria os Autores
    MERGE (a1 : Autor {nome: '${nomeAutor}'})
    
    // Cria o tipo de Conteúdo
    MERGE (t1 : TipoConteudo {nome: '${tipoConteudo}'})
    
    // Cria a aréa
    MERGE (ar1 : Area {nome: '${area}'})
    
    // Cria as palavras chaves
    MERGE (ch1 : PalavraChave {nome: '${palavrasChave}'})
    
    // Cria os relacionamentos entre material e autores
    MERGE (m1)-[: POSSUI_AUTOR]->(a1)
    MERGE (m1)-[: POSSUI_AUTOR]->(a2)
    
    // Cria o relacionamento entre material e tipo de Conteúdo
    MERGE (m1)-[: PERTENCE_A_TIPO]->(t1)
    
    // Cria o relacionamento entre material e área
    MERGE (m1)-[: PERTENCE_A_AREA]->(ar1)
    
    // Cria o relacionamento entre material e palavra chave
    MERGE (m1)-[: POSSUI_PALAVRAS_CHAVE]->(ch1)`);
    setNomeMaterial("");
    setArea("");
    setDescricao("");
    setNomeAutor("");
    setIdioma("");
    setTipoLicenca("");
    setTipoConteudo("");
    setArea("");
    setPalavrasChave("");
    //event.target.selectedTipoConteudo.selectedIndex = 0;
    event.target.reset();
    router.refresh();
  };
  return (
    //Formulario para cadastrar um material
    <form onSubmit={resgister}>
      <h3>Cadastrar um Material</h3>
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
        placeholder="Autor"
        value={nomeAutor}
        onChange={(e) => setNomeAutor(e.target.value)}
        required
      />
      <select
        name="selectedTipoConteudo"
        defaultValue=""
        onChange={(e) => setTipoConteudo(e.target.value)}
        required
      >
        <option disabled value= "">
          Tipos de Conteúdo
        </option>
        <option value="Arquivo em Áudio">Arquivo em Áudio</option>
        <option value="Arquivo em PDF">Arquivo em PDF</option>
        <option value="Arquivo de Texto">Arquivo de Texto</option>
        <option value="Link">Link</option>
        <option value="Vídeo">Vídeo</option>
      </select>
      <select name="selectedArea" defaultValue="" onChange={(e) => setArea(e.target.value)} required>
        <option disabled value= "" >
          Área da Computação
        </option>
        <option value="Ciência de Dados">Ciência de Dados</option>
        <option value="Engenharia de Software">Engenharia de Software</option>
        <option value="Segurança">Segurança</option>
      </select>
      <select name="selectedIdioma" defaultValue="" onChange={(e) => setIdioma(e.target.value)} required>
        <option disabled value= "">
          Idioma
        </option>
        <option value="Português">Português</option>
        <option value="Inglês">Inglês</option>
      </select>
      <input
        type="text"
        placeholder="Palavras-chave"
        value={palavrasChave}
        onChange={(e) => setPalavrasChave(e.target.value)}required
      />
      <select
        name="selectedTipoLicenca"
        onChange={(e) => setTipoLicenca(e.target.value)} 
        defaultValue="" required
      >
        <option disabled value= "">
          {" "}
          Tipos de Licença
        </option>
        <option value="CC0">CC0</option>
        <option value="	BY-SA">BY-SA</option>
      </select>
      <button type="submit">Cadastrar Material</button>
    </form>
  );
}
