import React from 'react';
import Button from '../components/Button';
import { LoginPages, MainPages } from '../routes/paths';
import { Fade, Slide } from 'react-awesome-reveal';
import aboutuser from '../assets/about/aboutuser.png';
import memberimg from '../assets/about/chizu.jpg';
import memberimg1 from '../assets/about/chizu.jpg';
import memberimg2 from '../assets/about/chizu.jpg';
import lariosaImg from '../assets/about/lariosa.jpg';
import lamanImg from '../assets/about/laman.jpg';
import bauaImg from '../assets/about/baua.jpg';
import vicoImg from '../assets/about/vico.jpg';
import jemImg from '../assets/about/jem.jpg';

import Banner from '../components/Banner';

const MemberCard = props => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      className={`relative flex flex-col items-center justify-center w-full max-w-md rounded-2xl border-primary-500 border-opacity-50 text-secondary-200 transform transition-transform duration-300 ease-in-out hover:scale-105`}
      style={{ boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.4)', height: '300px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={props.image}
        className={`mx-auto w-full h-full object-cover rounded-xl ${isHovered ? 'opacity-50' : ''}`}
        alt={props.title}
        style={{ transition: 'opacity 0.3s' }}
      />
      {isHovered && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 rounded-xl">
          <p className="text-white text-2xl font-bold text-center" style={{ lineHeight: '1.5' }}>
            <span className="text-lg font-bold">{props.name}</span><br />
            <span className="text-sm">{props.position}</span>
          </p>
        </div>
      )}
    </div>
  );
};

const About = () => {
  return (
    <div>
      <div className='flex flex-col justify-center items-center gap-16 w-full h-[95vh] -m-[1vh] px-40'>
        <div className='grid grid-rows-1 grid-cols-2 justify-between items-center gap-16 w-[95%] h-1/2'>
          <div>
            <Fade direction='left' duration={1050}>
              <h1 className='text-secondary-200 text-5xl font-bold py-1'>ABOUT US</h1>
            </Fade>
            <Fade direction='left' duration={1050}>
              <p className='text-secondary-100 text-lg py-6'>Who are we? and What We Do For You</p>
            </Fade>
            <Fade direction='left' duration={1050}>
              <h2 className='text-secondary-200 text-5x1 font-bold py-1'>NutriMatch</h2>
            </Fade>
            <Fade direction='left' duration={1050}>
              <p className='text-secondary-100 text-lg'>
                NutriMatch is dedicated to revolutionizing nutrition through personalized<br />
                solutions tailored to your unique needs and preferences. We harness <br />
                cutting-edge technology to analyze your health profile and lifestyle, <br />
                crafting customized meal plans and nutritional advice that fit seamlessly <br />
                into your daily routine. Whether you're aiming to manage weight, boost <br />
                energy, or optimize athletic performance, NutriMatch empowers you to <br />
                make informed dietary choices for sustained health and well-being. <br />
              </p>
            </Fade>
          </div>
          <img src='/logo_mini.png' className='w-80 h-80 object-cover object-left' alt="Logo" />
        </div>
        <Button link={MainPages.HOME} customTheme='w-[95%] bg-secondary-200 hover:bg-accent text-primary h-auto'>See What Our Customers Have to Say About us. View Client Testimonials</Button>
      </div>

      <Banner title='Meet Our Team' image='/banner/aboutuser.png' />

      <div className='flex gap-8 justify-center items-center w-full h-[60vh] bg-primary text-primary overflow-hidden'>
        <div className='flex justify-center max-w-3xl'>
          <div className='grid grid-cols-7 gap-5'>
            <Fade direction='up' duration={1075}>
              <MemberCard image={bauaImg} name="Anjeleca Baua" />
            </Fade>
            <Fade direction='up' duration={1075}>
              <MemberCard image={jemImg} name="Jem Gonzales" />
            </Fade>
            <Fade direction='up' duration={1075}>
              <MemberCard image={memberimg2} name="Trisha Mae Hernandez" />
            </Fade>
            <Fade direction='up' duration={1075}>
              <MemberCard image={lamanImg} name="Shaina Marie Laman" />
            </Fade>
            <Fade direction='up' duration={1075}>
              <MemberCard image={lariosaImg} name="Ivy Lariosa" />
            </Fade>
            <Fade direction='up' duration={1075}>
              <MemberCard image={memberimg} name="Andrea Aleczis Mejia" />
            </Fade>
            <Fade direction='up' duration={1075}>
              <MemberCard image={vicoImg} name="Cedric Noah Vico" />
            </Fade>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
