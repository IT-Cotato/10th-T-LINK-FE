import { useEffect } from 'react';
import check from '../../assets/images/check.png';

type ToastProps = {
  setToast: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
};

const Toast = ({ setToast, title }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setToast(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [setToast]);

  return (
    <div className="fixed flex items-center top-4 left-20 z-50 bg-white px-4 py-2 rounded-lg shadow-lg text-base font-semibold animate-fade-in-out">
      <img src={check} className="w-[18px] h-[18px] mr-2" alt="check icon" />
      <span>{title}</span>
    </div>
  );
};

export default Toast;
