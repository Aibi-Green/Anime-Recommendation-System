import React from 'react';
import PokeCard from '../components/PokeCard';
import Banner from '../components/Banner';
import nirvana from '../assets/educ_resources/nirvanagreen.jfif';
import greensfever from '../assets/educ_resources/greensfever.jpg';
import planetnutro from '../assets/educ_resources/planetnutro.jfif';
import idealnutrition from '../assets/educ_resources/idealnutrition.png';
import { Zoom } from 'react-awesome-reveal';

const EducationalResources = () => {
  return (
    <>
    <Banner title='Educational Resources' image='/banner/educ_resources.png' />

    <Zoom>
    <div className='flex flex-col justify-center items-center p-12 w-full h-[75vh]'>
      <div className='grid grid-cols-4 gap-16'>
        <PokeCard image={nirvana} link="https://www.mindful.org/" title="Nirvana Greens">
          Nirvana Greens is a comprehensive platform dedicated to sustainable living and environmental consciousness. Offering a wealth of resources, articles, courses, and practical tips, Nirvana Greens explores diverse topics such as eco-friendly practices, renewable energy solutions, organic gardening, and mindful consumption. 
        </PokeCard>
        <PokeCard image={planetnutro} link="https://www.changetochill.org/" title="Planet Nutrophilus">
          Planet Nutrophilus is your ultimate guide to exploring sustainable nutrition and healthy living practices. From nutritious recipes to eco-conscious eating tips, our platform offers a wealth of resources aimed at promoting a balanced diet while minimizing environmental impact.
        </PokeCard>
        <PokeCard image={greensfever} link="https://calmharm.stem4.org.uk/" title="Greens Fever">
          Greens Fever is your go-to resource for embracing a sustainable lifestyle with a focus on environmental awareness and eco-friendly practices. Explore our wide range of articles, tips, and guides covering everything from green living at home to sustainable fashion and ethical consumer choices. 
        </PokeCard>
        <PokeCard image={idealnutrition} link="https://www.studentsagainstdepression.org/" title="Ideal Nutrition">
          Ideal Nutrition is your trusted source for achieving optimal health through personalized and evidence-based dietary guidance. Explore our comprehensive collection of articles, meal plans, and nutritional resources designed to support your unique wellness goals. 
        </PokeCard>
      </div>
    </div>
    </Zoom>
    </>
  );
};

export default EducationalResources;