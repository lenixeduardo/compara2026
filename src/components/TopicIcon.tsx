import { categorias } from '../data/propostas';
export default function TopicIcon({id,className,variant='vermelho'}:{id:string;className?:string;variant?:'preto'|'vermelho'|'branco'}) {
  const asset = categorias.find(category=>category.id===id)?.iconAsset;
  if(!asset) return null;
  return <img src={`/icons/${asset}-${variant}.svg`} className={className} alt="" aria-hidden="true" width={24} height={24}/>;
}
