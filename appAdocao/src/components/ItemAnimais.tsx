import { AnimalI } from "@/utils/types/animais";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw, faRuler, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { CakeIcon } from "@heroicons/react/24/outline";
import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { Just_Me_Again_Down_Here } from "next/font/google";

const font = Just_Me_Again_Down_Here({
  weight: ["400"],
  subsets: ["latin"],
});

// Função para escolher o ícone de sexo
export const iconeSexo = (sexo: string) => {
  switch (sexo) {
    case "Macho":
      return <FontAwesomeIcon icon={faMars} className="inline me-1 text-blue-500" />;
    case "Femea":
      return <FontAwesomeIcon icon={faVenus} className="inline me-1 text-pink-500" />;
    default:
      return null;
  }
};

export function ItemAnimais({ data }: { data: AnimalI }) {
  return (
    <div className="bg-primary-bg">
      <Link href={`descricao/${data.id}`} className="cursor-pointer bg-gray-300">
        <div className="max-w-sm rounded-3xl overflow-hidden shadow-lg bg-white px-5 py-2">
          <h3
            className={`font-bold text-black text-4xl mb-3 ${font.className} text-5xl text-center`}
          >
            {data.nome}
          </h3>
          <Image
            className="w-full rounded-3xl object-cover"
            src={data.foto}
            alt={`Imagem do ${data.especie.nome} ${data.nome}`}
            width={500}
            height={300}
          />
          <div className="pt-4 pb-2">
            <div className="text-gray-700 text-sm font-light space-y-3">
              <div className="flex items-center">
                <CakeIcon className="inline me-1 text-gray-500 w-5 h-5" />
                <span className="text-gray-700 font-semibold">
                  {data.idade} {data.idade === 1 ? "ano" : "anos"}
                </span>
              </div>
              <div className="flex items-center">
                {iconeSexo(data.sexo)}
                <span className="text-gray-700 font-semibold">{data.sexo}</span>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faPaw} className="inline me-1 text-gray-500 w-5 h-5" />
                <span className="text-gray-700 font-semibold">{data.especie.nome}</span>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faRuler}
                  className="inline me-1 text-gray-500 w-5 h-5"
                />
                <span className="text-gray-700 font-semibold">{data.porte}</span>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  className="inline me-1 text-gray-500 w-5 h-5"
                />
                <span className="text-gray-700 font-semibold">{data.descricao}</span>
              </div>
              
              
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
