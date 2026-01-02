
import About from '../Components/About';
import FAQ from '../Components/FAQ';
import Features from '../Components/Features';
import Genre from '../Components/Genre';
import Hero from '../Components/Hero';
import Recently from '../Components/Recently';
import Statistics from '../Components/Statistics';
import TopRate from '../Components/TopRate';

const Home = () => {
     
   
     
      
    return (
        <div>
            <Hero></Hero>
            <Statistics></Statistics>
            <TopRate></TopRate>
            <Recently></Recently>
            <Genre></Genre>
            <About></About>
            <Features></Features>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;