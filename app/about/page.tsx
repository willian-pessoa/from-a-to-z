import HeaderConfig from "@/src/layout/HeaderConfig";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
} from "@tabler/icons-react";

interface PageProps {}

export default async function Page({}: PageProps) {
  return (
    <div className="p-2 flex flex-col gap-2">
      <HeaderConfig title={"Sobre"} />
      <div className="flex flex-col mt-4 ml-4 gap-4">
        <label className="font-bold text-lg border-b-2 border-emerald-600 w-fit">
          Sobre o LoL A-Z Tracker
        </label>

        <div className="border-l-2 border-emerald-700 text-left px-2 ml-4">
          O LoL A-Z Tracker é uma ferramenta para acompanhar desafios
          personalizados no League of Legends, permitindo que jogadores
          registrem seu progresso, acompanhem estatísticas e comparem resultados
          através do ranking.
        </div>
      </div>

      <div className="flex flex-col mt-4 ml-4 gap-4">
        <label className="font-bold text-lg border-b-2 border-emerald-600 w-fit">
          Como funciona
        </label>

        <ul className="text-left px-2 ml-4 list-disc list-inside marker:text-emerald-500">
          <li>Escolha um desafio</li>
          <li>Jogue partidas normalmente</li>
          <li>O progresso é atualizado automaticamente</li>
          <li>
            Acompanhe campeões concluídos, vitórias, derrotas e tempo jogado
          </li>
        </ul>
      </div>

      <div className="flex flex-col mt-4 ml-4 gap-4">
        <label className="font-bold text-lg border-b-2 border-emerald-600 w-fit">
          Sobre o projeto
        </label>

        <div className="border-l-2 border-emerald-700 text-left px-2 ml-4">
          Criado como um projeto independente para explorar uma forma diferente
          de jogar League of Legends: focando na experiência e diversão de
          completar desafios, não apenas em subir elo.
        </div>
      </div>

      <div className="flex flex-col mt-4 ml-4 gap-4">
        <label className="font-bold text-lg border-b-2 border-emerald-600 w-fit">
          Contato
        </label>

        <div className="border-l-2 border-emerald-700 text-left px-2 ml-4 flex gap-8">
          <a
            href="https://github.com/willian-pessoa"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
          >
            <IconBrandGithub size={20} />
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/willian-pessoa/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
          >
            <IconBrandLinkedin size={20} />
            LinkedIn
          </a>
        </div>
      </div>

      <div className="flex flex-col mt-4 ml-4 gap-4">
        <label className="font-bold text-lg border-b-2 border-emerald-600 w-fit">
          Desenvolvedor
        </label>

        <div className="border-l-2 border-emerald-700 text-left px-2 ml-4">
          Willian Pessoa de Abreu
        </div>
      </div>

      <div className="flex flex-col mt-4 ml-4 gap-4">
        <label className="font-bold text-lg border-b-2 border-emerald-600 w-fit">
          Tecnologias
        </label>

        <div className="border-l-2 border-emerald-700 text-left px-2 ml-4">
          Next.js, TypeScript, Tailwind CSS, Supabase e Riot Games API.
        </div>
      </div>

      <div className="mb-24 sm:mb-8"></div>
    </div>
  );
}
