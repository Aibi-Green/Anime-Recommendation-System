import './Hero.css';

const Hero = () => {
  return (
    <div className='hero'>
      <div className='hero-content'> 
        <h1 className='hero-title'><span className="hero-title-highlight">NUTRI</span>MATCH</h1>
        <p className='hero-subtitle'>A Meal Recommender System using K Nearest Neighbor for a healthier diet.</p>
        <button className='hero-button'>Create Meal</button>
      </div>
    </div>
  );
}

export default Hero;
