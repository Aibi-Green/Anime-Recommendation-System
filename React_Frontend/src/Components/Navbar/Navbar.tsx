import "./Navbar.css"
import logo from '../../assets/logo.png'

const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={logo} alt="" className='logo'/>
      <ul>
        <li>Home</li>
        <li>About</li>
      </ul>
      <button className='create-button'>Create New</button>
    </div>
  )
}

export default Navbar
