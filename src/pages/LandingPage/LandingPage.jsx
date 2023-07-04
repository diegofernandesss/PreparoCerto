
import { Header } from "../../components/LandingPage/Header/Header";
import { Main } from "../../components/LandingPage/Main/Main";
import { Footer } from "../../components/LandingPage/Footer/Footer"

export const LandingPage = () => {
  return (
    <>
      <div className='h-screen'>
        <Header />
        <Main />
        <Footer />
      </div>
     </>
  );
};