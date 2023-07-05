import { Link } from "react-router-dom";
import { Links } from '../../../Data';
import { FiMenu, FiX } from 'react-icons/fi';
import { useState } from "react";
import { Button } from "../../Button";

export function NavBar(){
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    return (
        <>
            <nav className="bg-gray-900 " >
                <div className="mx-auto lg:px-5 px-5 w-full h-20 items-center justify-between max-w-screen-xl pt-2 ">
                    <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <h1 className=" text-gray-100 max-md:text-xl lg:text-2xl font-bold">Preparo<span className="text-primary font-medium">Certo</span> </h1>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                        {Links.map((link) => (
                            <Link
                            key={link.name}
                            to={link.link}
                            className={link.color}
                            >
                            {link.name}
                            </Link>
                        ))}
                        </div>
                    </div>
                    <div className="md:hidden flex items-center bg-orange-500"> 
                        <Button
                        onClick={toggleMenu}
                        className="ml-4"
                        >
                        {menuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
                        </Button>
                    </div>
                    </div>
                </div>
                {menuOpen && (
                    <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {Links.map((link) => (
                        <Link
                            key={link.name}
                            to={link.link}
                            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium "
                        >
                            {link.name}
                        </Link>
                        ))}
                    </div>
                    </div>
                )}
            </nav>
        </>
    );
}