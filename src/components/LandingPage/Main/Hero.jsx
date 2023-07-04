import { Link } from 'react-router-dom';
import { heroData } from '../../../Data';

export const Hero = () => {
    const {title, subtitle, btnText, image} = heroData;
    return (
        <>

             <section className="bg-gradient-to-r py-16">
                <div className="container mx-auto px-4 items-center justify-between max-w-screen-xl pt-7 pb-8">
                    <div className="md:flex md:items-center md:justify-between">
                        <div className="md:w-1/2 text-center xl:text-left" >
                            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 " data-aos='fade-down' data-aos-delay='600'>{title}</h1>
                            <p className="text-xl md:text-2xl text-gray-600 mb-8 lead xl:max-w-[380px] lg:mb-12 " data-aos='fade-down' data-aos-delay='500'>{subtitle}</p>
                            <Link to="/cadastro">
                                <button className="px-8 py-3 bg-orange-500 rounded-full text-gray-50 font-bold bg-primary hover:bg-primary_hover animate-bounce" data-aos="fade-down" data-aos-delay="400">
                                {btnText}
                                </button>
                            </Link>
                        </div>
                        <div className="md:w-1/2">
                            <img className="rounded-lg shadow-lg" src={image} alt="Imagem de destaque" data-aos='fade-down' data-aos-delay='400' />
                        </div>
                    </div>
                    
                </div>
            </section>
        </>
    );
}