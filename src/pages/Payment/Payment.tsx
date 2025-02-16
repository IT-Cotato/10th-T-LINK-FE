import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Toast from '../../components/Toast';
import DepositDetail from '../../components/DepositDetail';

const Payment = () => {
  const location = useLocation();
  const [toast, setToast] = useState(location.state?.toast || false);

  return (
    <div className="flex flex-col px-4 h-full">
      {/* 설명 */}
      <div className="py-4 text-heading6 font-bold leading-10 text-gray-900">
        <span>다음 입금일까지</span>
        <span> 5일</span>
        <span> 남았어요.</span>
        <p className="text-body3 font-normal leading-7 tracking-[-0.048px] text-gray-600">
          입금일이 되면 부모님에게 알림을 보내드려요!
        </p>
        <p className="text-body3 font-normal leading-7 tracking-[-0.048px] text-gray-600">
          알람은 언제든지 끌 수 있어요.
        </p>
      </div>
      {/* 정보 */}
      <div className="py-4">
        <DepositDetail />
      </div>
      {toast && <Toast setToast={setToast} title="입금일 등록이 완료되었습니다." />}
    </div>
  );
};

export default Payment;
