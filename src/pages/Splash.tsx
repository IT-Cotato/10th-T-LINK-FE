import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import mainlogo from '../assets/images/mainlogo.png';

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <img className="w-20" src={mainlogo} alt="mainlogo" />
    </div>
  );
};

export default Splash;
