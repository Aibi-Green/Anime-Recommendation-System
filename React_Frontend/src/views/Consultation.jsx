import React, { useState, useEffect } from 'react';
import Banner from '../components/Banner';
import landing from '../assets/consultation/landing.png';
import nut1 from '../assets/consultation/nutritionist1.jpg';
import nut2 from '../assets/consultation/nutritionist2.jpg';
import nut3 from '../assets/consultation/nutritionist3.png';
import Button from '../components/Button';
import Popup from '../components/Popup';

const nutritionists = [
  {
    name: 'Riyan Portuguez', image: nut1,
    email: 'yourmillennialnutritionist@gmail.com',
    motto: 'Diet and Nutrition are made easier.'
  },
  {
    name: 'Dr. Frost', image: nut2,
    email: 'drfrost@gmail.com',
    motto: 'The most important tool for diet is the mind of the counselor.'
  },
  {
    name: 'Doc McStuffins', image: nut3,
    email: 'mcstuffins@gmail.com',
    motto: 'Kung gusto mo agad pumayat...'
  }
];

const Card = ({ name, image, email, motto }) => {
  return (
    <div className='group relative flex flex-col items-center w-[22rem] h-56 mt-28 rounded-3xl'>
      <img 
        src={image} 
        className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 object-cover
                   group-hover:-translate-y-2/3 transition-transform ease-in-out 
                 border-secondary-200 border-8 rounded-full z-10' 
      />
      <div className='flex justify-center items-end w-full h-[70%] py-2 bg-primary rounded-t-3xl group-hover:-translate-y-1/4 transition-transform ease-in-out'>
        <h3 className='px-3 text-secondary-200 text-3xl text-center font-bold'>{name}</h3>
      </div>
      <div className='absolute top-0 left-0 flex justify-center w-full h-full pt-[7.5rem] px-3'>
        <p className='flex justify-center items-center h-[48%] text-primary text-center font-semibold opacity-0 group-hover:opacity-100 transition-all ease-in-out'>{motto}</p>
      </div>
      <div className='flex-1 flex justify-center items-start w-full py-2 bg-primary rounded-b-3xl group-hover:translate-y-1/4 transition-transform ease-in-out'>
        <p className='px-3 text-tertiary-400'>{email}</p>
      </div>
    </div>
  );
};

const Consultation = () => {
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [nutritionist, setNutritionist] = useState('Riyan Portuguez');
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // other validation and db operations
    setShowPopup(true);
  };

  return (
    <>
    <Banner title='NEED a CONSULTATION?' image='/banner/consultation.png' />

    {/* Landing */}
    <div className='grid grid-rows-1 grid-cols-2 gap-10 items-center w-full h-[75vh] px-32 py-16 bg-primary'>
      <div>
        <h2 className='text-secondary-200 text-4xl font-bold'>Welcome to NutriMatch Consultation</h2>
        <p className='text-secondary-100 text-lg mt-3'>
          Our dedicated team of nutritionists is here to support you on your journey to wellness. Whether you’re seeking personalized dietary guidance, practical coping strategies, or simply a listening ear, we’re committed to providing compassionate and confidential support tailored to your needs. Take the first step towards a healthier, happier you by scheduling a consultation with us today.
        </p>
      </div>
      <img src={landing} className='w-full h-full m-auto object-cover rounded-3xl' />
    </div>

    {/* Nutritionists */}
    <div className='flex flex-col justify-center items-center gap-5 w-full h-screen bg-secondary-200'>
      <h2 className='text-primary text-4xl font-bold'>Our Nutritionists</h2>
      <div className='flex gap-10'>
        {nutritionists.map((item, index) => 
          <Card key={index} name={item.name} image={item.image} email={item.email} motto={item.motto} />
        )}
      </div>
    </div>

    {/* Form */}
    <div className='relative flex justify-center items-center w-full h-screen bg-primary text-primary'>
      {/* Overlay */}
      <div className='absolute w-5/6 h-2/3 bg-secondary-200 bg-opacity-75'></div>

      <div className='flex flex-col justify-center items-center w-5/6 h-2/3 bg-[url("/src/assets/consultation/form.png")] bg-cover bg-center border-secondary-200 border-8'>
        <h2 className='mb-5 text-4xl font-bold z-0'>Schedule a Consultation</h2>

        <form 
          className='flex flex-col items-center gap-8 z-0'
          onSubmit={handleSubmit}
        >
          <div className='flex justify-evenly gap-10'>
            <label for='nutritionist' className='flex flex-col w-52 text-lg font-semibold'>
              Select a nutritionist:
              <select 
                name='nutritionist'
                value={nutritionist} 
                onChange={e => setNutritionist(e.target.value)} 
                className='w-full h-10 px-2 text-secondary-200 text-base rounded-xl border-r-4 border-transparent outline-none'
              >
                <option value='Riyan Portuguez'>Riyan Portuguez</option>
                <option value='Dr. Frost'>Dr. Frost</option>
                <option value='Doc McStuffins'>Doc McStuffins</option>
              </select>
            </label>

            <label for='date' className='flex flex-col w-52 text-lg font-semibold'>
              Select date:
              <input required
                name='date'
                type='date' 
                value={date}
                min={today}
                onChange={e => setDate(e.target.value)}
                className='w-full h-10 px-2 text-secondary-200 text-base rounded-xl outline-none'
              />
            </label>
          </div>
          <Button theme='light' customTheme='w-44' type='submit'>Submit</Button>
        </form>
      </div>
    </div>

    <Popup show={showPopup} onClose={() => setShowPopup(false)}>
      <div className='flex justify-center items-center w-full h-full text-secondary-200 text-xl text-center font-semibold'>
        You successfully set an appointment with {nutritionist} on {new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}!
      </div>
    </Popup>
    </>
  );
};

export default Consultation;