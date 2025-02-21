import { useNavigate } from 'react-router-dom';
import money from '../../assets/images/money.png';
import vector from '../../assets/images/vector.png';
import { getClosestFutureDate } from '../../utils/getCloseDate';
import { useState } from 'react';
import Modal from '../Modal/Modal';
import AccessFail from '../Modal/AccessFail';
import vector_gray from '../../assets/images/vector_gray.png';

type DepositProps = { roomname: string[]; nextDeopsit?: string; type: string; isPermission?: boolean };

const CalendarDeposit = ({ roomname, nextDeopsit, type, isPermission }: DepositProps) => {
  const nav = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const userRole = localStorage.getItem('roleInfo');

  const handleClick = () => {
    // 입금일이 등록되지 않은 경우
    if (nextDeopsit == '0') {
      userRole == 'TEACHER' ? nav('payment/create') : setModalOpen(true);
    }
    // 입금일 등록됐을 경우
    else if (nextDeopsit) nav('payment');
  };

  return (
    <div>
      {roomname.map((item, idx) => (
        <div
          key={idx}
          className={`flex p-4 gap-3  items-center rounded-xl ${type == 'roomDetail' && !isPermission ? 'bg-gray-100 cursor-not-allowed' : 'bg-primary_100 cursor-pointer'} `}
          onClick={handleClick}
        >
          <div className="p-1.5 rounded-full bg-white">
            <img src={money} className="w-7 h-7" />
          </div>
          <div>
            {type == 'roomDetail' && !isPermission ? (
              <img src={vector_gray} className="w-[3px] h-6" />
            ) : (
              <img src={vector} className="w-[3px] h-6" />
            )}
          </div>
          <div>
            <div
              className={` text-base font-semibold leading-7  ${type == 'roomDetail' && !isPermission ? 'text-[#1D1B20]' : 'text-primary_800'}`}
            >
              입금일
            </div>
            {type == 'calendar' ? (
              <div className="text-sm leading-6 tracking-[-0.042px] text-gray-800">{item} 입금일 입니다.</div>
            ) : !isPermission ? (
              <div className="text-sm leading-6 tracking-[-0.042px] text-gray-800">입금일에 접근 권한이 없습니다.</div>
            ) : (
              <div className="text-sm leading-6 tracking-[-0.042px] text-gray-800">
                {nextDeopsit == '0'
                  ? '현재 과외 입금일이 존재하지 않아요!'
                  : `다음 입금일은 ${getClosestFutureDate(nextDeopsit!)} 입니다`}
              </div>
            )}
          </div>
        </div>
      ))}
      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <AccessFail setModalOpen={setModalOpen} text="아직 입금일이 설정되지 않았어요!" />
        </Modal>
      )}
    </div>
  );
};

export default CalendarDeposit;
