import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Toast from '../../components/Modal/Toast';
import DepositDetail from '../../components/Deposit/DepositDetail';
import { getDeposit } from '../../api/deposit.api';
import { DepositInfo } from '../../models/deposit.model';
import Loading from '../Common/Loading';
import { getClosestFutureDate } from '../../utils/getCloseDate';
import { CaculateDday } from '../../utils/CaculateDday';

const Payment = () => {
  const location = useLocation();
  const [toast, setToast] = useState(location.state?.toast || false);
  const [isEdit, setIsEdit] = useState(location.state?.isEdit || false);
  const { roomId } = useParams<{ roomId: string }>();
  const [depositInfo, setDepositInfo] = useState<DepositInfo>();

  useEffect(() => {
    const getDepositInfo = () => {
      getDeposit(roomId!).then((data) => {
        setDepositInfo(data.data);
      });
    };
    getDepositInfo();
  }, []);

  if (!depositInfo) {
    return <Loading text="데이터를 불러오는 데 실패했어요!" />;
  }

  const getDate = getClosestFutureDate(depositInfo.depositAt.toString()).replaceAll('-', '.');
  const dDay = CaculateDday(getDate.toString());

  return (
    <div className="flex flex-col px-4 h-full">
      {/* 설명 */}
      <div className="py-4 text-heading6 font-bold leading-10 text-gray-900">
        <span>다음 입금일까지</span>
        <span> {dDay}일</span>
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
        <DepositDetail depositInfo={depositInfo} />
      </div>
      {toast && (
        <Toast
          setToast={setToast}
          title={isEdit ? '입금일 수정이 완료되었습니다.' : '입금일 등록이 완료되었습니다.'}
        />
      )}
    </div>
  );
};

export default Payment;
