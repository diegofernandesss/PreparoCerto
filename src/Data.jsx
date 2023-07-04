//Importações
import PaginaPrincipal from '../src/assets/receitaFood.svg';
import Logo from './assets/logo.png'

//========================================================================================================

// Utilizado na Landing Page

//Header
export let Links = [
    {name: "Home", link:"/", 
    color: `text-gray-300 hover:text-white 
            px-3 py-2 rounded-md text-sm 
            font-medium`},

    {name: "Entrar", link:"/login", 
    color: `ml-4 bg-primary hover:bg-primary_hover 
           text-white hover:text-white px-4 py-2 
           rounded-full`}
]

//Main
export let heroData = {
    title: 'Bem-Vindo ao Preparo Certo',
    
    subtitle: `Peça suas comidas favoritas a qualquer 
               momento e nós as entregaremos onde 
               você estiver.`,

    btnText: 'Cadastrar',
    image: PaginaPrincipal,
}

// Footer
export const footer = {
    titles: {
        title0: 'Participantes',
        title1: 'Siga-nos',
        title2: 'Termos'
    }
}

export let participantes = [
    {nome: "Diego Fernandes"},
    {nome: "Jardiel Carlos"},
    {nome: "Laís Ribeiro"},
    {nome: "Natália Gomes"},
    {nome: "Rodrigo Santos"},
    {nome: "Samira Kaline"}
]

export let redesSociais = [
    {nome: "GitHub"},
    {nome: "Discord"}
]

export let termos = [
    {nome: "política de Privacidade"},
    {nome: "termos e Condições"}
]

//========================================================================================================


// Utilizado no SideBar


export const image = {
    image: Logo
}