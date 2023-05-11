import neo4j from "neo4j-driver";


// lib/neo4j.js
export async function read<RecordShape>(cypher: string, params?: Record<string, any>): Promise<RecordShape[]> {
  // 1. Abre uma sessão
  const driver = neo4j.driver(
    process.env.NEXT_PUBLIC_URI,
    neo4j.auth.basic(
      process.env.NEXT_PUBLIC_USERNAME,
      process.env.NEXT_PUBLIC_PASSWORD
    )
  );
  const session = driver.session();

  try {
    // 2. Executar uma instrução Cypher
    const res = await session.executeRead((tx) => tx.run(cypher, params));

    // 3. Processa os Resultados
    const values = res.records.map(record => record.toObject() as RecordShape);

    return values;
  } finally {
    // 4. Fechar a sessão
    await session.close();
    await driver.close()
  }
}

export async function write<RecordShape>(cypher: string, params?: Record<string, any>): Promise<RecordShape[]> {
  // 1. Abre uma sessão
  const driver = neo4j.driver(
    process.env.NEXT_PUBLIC_URI,
    neo4j.auth.basic(
      process.env.NEXT_PUBLIC_USERNAME,
      process.env.NEXT_PUBLIC_PASSWORD
    )
  );
  const session = driver.session();

  try {
    // 2. Executar uma instrução Cypher
    const res = await session.executeWrite((tx) => tx.run(cypher, params));

    // 3. Processa os Resultados
    const values = res.records.map(record => record.toObject() as RecordShape);

    return values;
  } finally {
    // 4. Fechar a sessão
    await session.close();
    await driver.close();
  }
}
