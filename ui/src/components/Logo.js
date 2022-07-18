import logo from '../ionic_logo.png';

const Logo = ({ className }) => {
  return (
    <div className={className}>
        <img src={logo} className="rotate-image" />
        <h1>Ionic-Bonds</h1>
        <img src={logo} className="rotate-image-reverse" />
    </div>
  )
}

export default Logo;