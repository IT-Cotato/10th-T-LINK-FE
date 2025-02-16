import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Toast from '../../components/Toast';

const Payment = () => {
  const location = useLocation();
  const [toast, setToast] = useState(location.state?.toast || false);

  return <div>{toast && <Toast setToast={setToast} title="입금일 등록이 완료되었습니다." />}</div>;
};

export default Payment;
