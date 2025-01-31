import { useEffect } from 'react';

type ToastProps = {
  setToast: React.Dispatch<React.SetStateAction<boolean>>;
};

const Toast = ({ setToast }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setToast(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [setToast]);

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-black text-white px-4 py-2 rounded-lg shadow-lg text-sm animate-fade-in-out">
      클립보드에 복사되었습니다
    </div>
  );
};

export default Toast;
