import { useEffect } from 'react';

type ToastProps = {
  setToast: React.Dispatch<React.SetStateAction<boolean>>;
};

const Toast = ({ setToast }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setToast(false);
    }, 1500);

    return clearTimeout(timer);
  }, [setToast]);

  return <div className="border-2">클립보드에 복사되었습니다</div>;
};

export default Toast;
