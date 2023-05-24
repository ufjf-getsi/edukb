import ButtonReset from "@/components/ButtonReset";
import ResgisterMaterial from "@/components/RegisterMaterial";

export default async function MateriasPage() {
  return (
    <div>
      <h1>Cadastro de Material</h1>
      <ResgisterMaterial />
      <ButtonReset />
    </div>
  );
}
