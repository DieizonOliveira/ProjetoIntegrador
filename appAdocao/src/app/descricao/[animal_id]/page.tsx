"use client";

import { AnimalI } from "@/utils/types/animais";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw, faRuler, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { CakeIcon } from '@heroicons/react/24/outline';
import { faMars, faVenus } from '@fortawesome/free-solid-svg-icons';
import { FotoI } from "@/utils/types/fotos";
import { FormularioAdocao } from "@/components/FormularioAdocao";
import { useAdotanteStore } from "@/context/adotante";
import Image from 'next/image';

export default function Detalhes() {
  const params = useParams();
  const [animal, setAnimal] = useState<AnimalI>();
  const [fotos, setFotos] = useState<FotoI[]>([]);
  const { adotante } = useAdotanteStore();

  useEffect(() => {
    async function buscaDados() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/animais/${params.animal_id}`);
      const dados = await response.json();
      setAnimal(dados);
    }
    buscaDados();

    async function buscaFotos() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/fotos/${params.animal_id}`);
      const dados = await response.json();
      setFotos(dados);
    }
    buscaFotos();
  }, [params.animal_id]);

  const listaFotos = fotos.map(foto => (
    <div key={foto.id}>
      <Image
        className="w-full rounded-3xl object-cover"
        src={`data:image/jpg;base64, ${foto.codigoFoto}`}
        alt={foto.descricao}
        width={200}
        height={100}
      />
    </div>
  ));

  const iconeSexo = (sexo: string) => {
    switch (sexo) {
      case 'Macho':
        return <FontAwesomeIcon icon={faMars} className="inline me-1 text-blue-500" />;
      case 'Femea':
        return <FontAwesomeIcon icon={faVenus} className="inline me-1 text-pink-500" />;
      default:
        return null;
    }
  };

  return (
    <>
      <section className="bg-white shadow-lg rounded-3xl overflow-hidden mx-auto mb-10 max-w-5xl flex">
        {/* Foto à esquerda */}
        <div className="w-1/2">
          {animal?.foto && (
            <Image
              className="object-cover w-full rounded-t-lg max-h-96 md:h-6/ md:w-6/6 md:rounded-none md:rounded-s-lg"
              src={animal.foto}
              alt="Foto do Animal"
              width={500}
              height={500}
            />
          )}
        </div>

        {/* Dados e Formulário à direita */}
        <div className="w-1/2 px-6 py-4">
          <h3 className="font-bold text-4xl text-center mb-4">{animal?.nome}</h3>
          <div className="space-y-3">
            <div className="flex items-center text-gray-700">
              <FontAwesomeIcon icon={faPaw} className="w-5 h-5 mr-2 text-gray-500" />
              <span>{animal?.especie.nome}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <CakeIcon className="w-5 h-5 mr-2 text-gray-500" />
              <span>{animal?.idade} {animal?.idade === 1 ? 'ano' : 'anos'}</span>
            </div>
            <div className="flex items-center text-gray-700">
              {iconeSexo(animal?.sexo || '')}
              <span>{animal?.sexo || 'Sexo não disponível'}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <FontAwesomeIcon icon={faRuler} className="w-5 h-5 mr-2 text-gray-500" />
              <span>{animal?.porte}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <FontAwesomeIcon icon={faInfoCircle} className="w-5 h-5 mr-2 text-gray-500" />
              <span>{animal?.descricao}</span>
            </div>
          </div>

          {adotante && adotante.nome ? (
            <div className="px-6 py-4">
              <FormularioAdocao
                adotanteId={String(adotante.id)} // Convertendo para string
                animalId={animal?.id as number}
              />
            </div>
          ) : (
            <div className="px-6 py-4 text-red-500">Por favor, faça login para adotar este animal.</div>
          )}
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
        {listaFotos}
      </div>
    </>
  );
}
