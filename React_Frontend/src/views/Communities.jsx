import React from 'react';
import { Fade } from 'react-awesome-reveal';
import Banner from '../components/Banner';
import cleancut from '../assets/communities/cleancut.png'
import cleansecoach from '../assets/communities/cleansecoach.png'
import cleancalorie from '../assets/communities/cleancalorie.jfif'

const CommunityCard = props => {
  return (
    <div className='flex justify-center items-center w-full h-[75vh] px-20'>
      <div className="flex gap-20 h-fit">
      { props.title === "7 Cups" ? (
      <>
        <div className=''>
          <h1 className={`text-4xl font-bold text-secondary-200 text-left mb-4`}>{props.title}</h1>
          <p className='text-secondary-100 text-justify'>{props.children}</p>
        </div>
        <img src={props.image} className='w-80 h-80 rounded-3xl' />
      </>
    ) : (
      <>
        <img src={props.image} className='w-80 h-80 rounded-3xl' />
        <div className=''>
          <h1 className={`text-4xl font-bold text-secondary-200 text-left mb-4`}>{props.title}</h1>
          <p className='text-secondary-100 text-justify'>{props.children}</p>
        </div>
      </>
    )}
    </div>
    </div>
  );
};

const Communities = () => {
  return (
    <>
      <Banner title='Support Communities' image='/banner/communities.png' />
      
      <div className='flex flex-col justify-center items-center gap-10'>
        <Fade direction='right' duration={1750}>
        <CommunityCard image={cleancut} title="Clean Cut Fitness">
          Clean Cut Fitness is dedicated to empowering individuals to achieve their fitness goals through expert guidance, education, and support. As a leading fitness organization, we strive to enhance the lives of our members by offering personalized training programs, nutritional advice, and wellness resources. Our community-focused approach includes support groups, fitness challenges, and educational workshops designed to inspire and motivate. With a network of dedicated professionals and state-of-the-art facilities, Clean Cut Fitness is committed to promoting healthy lifestyles, reducing barriers to fitness, and ensuring everyone has access to quality fitness resources. Join us in our mission to transform lives through fitness and well-being.
        </CommunityCard>
        </Fade>
        <Fade direction='left' duration={1750}>
        <CommunityCard image={cleansecoach} title="Cleanse Coach">
          Cleanse Coach is your dedicated partner in achieving optimal health and wellness through guided detox programs and personalized support. We offer a comprehensive range of resources, including tailored cleanse plans, nutritional guidance, and expert advice, designed to help you rejuvenate your body and mind. Our mission is to empower individuals to embrace healthier lifestyles by providing the tools and knowledge needed for effective and sustainable detoxification.
        </CommunityCard>
        </Fade>
        <Fade direction='right' duration={1750}>
        <CommunityCard image={cleancalorie} title="Clean Calorie Club">
          Clean Calorie Club is your premier destination for achieving health and fitness goals through mindful eating and balanced nutrition. Our platform offers a wealth of resources, including healthy recipes, meal plans, and expert nutritional advice, all designed to help you make informed dietary choices. Committed to promoting a holistic approach to wellness, Clean Calorie Club empowers members with the tools and support needed to manage weight, boost energy, and enhance overall well-being. 
        </CommunityCard>
        </Fade>
      </div>
    </>
  );
};

export default Communities;