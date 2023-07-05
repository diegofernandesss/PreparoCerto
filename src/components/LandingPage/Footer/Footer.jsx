import { footer, 
    participantes, 
    redesSociais, 
    termos
} from '../../../Data'

export const Footer = () => {
const {titles} = footer;
return (
   <footer className="bg-gray-900" data-aos="fade-down" data-aos-delay="400">
       <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
           <div className="md:flex md:justify-between">
             <div className="mb-6 md:mb-0">
                   <div className="flex items-center bg-gray-900">
                       <h1 className="h-8 mr-3 text-white font-semibold whitespace-nowra text-2xl" >Preparo<span color="orange" className="text-primary self-center text-2xl font-semibold whitespace-nowrap dark:text-primary">Certo</span> </h1>
                   </div>
             </div>
             <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                 <div>
                     <h2 className="mb-6 text-sm font-semibold  uppercase text-white">{titles.title0}</h2>
                     <ul className="text-gray-600 dark:text-gray-400 font-medium">
                       {
                           participantes.map((nomes, index) => (
                               <li key={index} className='mb-2 md:mr-4'>
                                   <div 
                                   className="text-gray-400 cursor-pointer hover:text-white hover:underline"
                                   >
                                   {nomes.nome}
                                   </div>
                               </li>
                           ))
                       }
                     </ul>
                 </div>
                 <div>
                     <h2 className="mb-6 text-sm font-semibold uppercase text-white">{titles.title1}</h2>
                     <ul className="text-gray-600 dark:text-gray-400 font-medium">
                       {
                           redesSociais.map((nomes, index) => (
                               <li key={index} className='mb-4'>
                                   <div className='
                                   text-gray-400 hover:text-white cursor-pointer hover:underline
                                   '>{nomes.nome}</div>
                               </li>
                           ))
                       }
                     </ul>
                 </div>
                 <div>
                     <h2 className="mb-6 text-sm font-semibold uppercase text-white">{titles.title2}</h2>
                     <ul className="text-gray-600 dark:text-gray-400 font-medium">
                       {
                           termos.map((nomes, index) => (
                               <li key={index} className='mb-4'>
                                   <div className='
                                   text-gray-400 hover:text-white cursor-pointer hover:underline'
                                   >{nomes.nome}</div>
                               </li>
                           ))
                       }
                     </ul>
                 </div>
             </div>
         </div>
         <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
         <div className="sm:flex sm:items-center sm:justify-between">
             <span className="text-sm  sm:text-center text-gray-400">© 2023 <button className="hover:underline">Flowbite™</button>. All Rights Reserved.
             </span>
             <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
             </div>
         </div>
       </div>
   </footer>

);
}