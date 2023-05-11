declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEO4J_URI: string;
      NEO4J_USERNAME: string;
      NEO4J_PASSWORD: string;
      NEXT_PUBLIC_URI: string;
      NEXT_PUBLIC_USERNAME: string;
      NEXT_PUBLIC_PASSWORD: string;
    }
  }
}

export {};
