import { useNavigate } from 'react-router-dom';
import money from '../../assets/images/money.png';
import vector from '../../assets/images/vector.png';

type DepositProps = {
  roomname?: string;
  nextDeopsit?: string;
  isPermission?: boolean;
};

const CalendarDeposit = ({ roomname, nextDeopsit, isPermission }: DepositProps) => {
  const nav = useNavigate();

  const handleClick = () => {
    if (nextDeopsit && isPermission) nav('payment');
  };

  console.log(nextDeopsit);

  return (
    <div
      className={`flex p-4 gap-3 bg-primary_100 items-center rounded-xl ${nextDeopsit && !isPermission ? 'bg-gray-300 opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      onClick={handleClick}
    >
      <div className="p-1.5 rounded-full bg-white">
        <img src={money} className="w-7 h-7" />
      </div>
      <div>
        <img src={vector} className="w-[3px] h-6" />
      </div>
      <div>
        <div className="text-primary_800 text-base font-semibold leading-7">입금일</div>
        {nextDeopsit == '0' ? (
          <div className="text-sm leading-6 tracking-[-0.042px] text-gray-800">현재 과외 입금일이 존재하지 않아요.</div>
        ) : nextDeopsit == null ? (
          <div className="text-sm leading-6 tracking-[-0.042px] text-gray-800">{roomname} 입금일 입니다.</div>
        ) : (
          <div className="text-sm leading-6 tracking-[-0.042px] text-gray-800">다음 입금일은 {nextDeopsit} 입니다.</div>
        )}
      </div>
    </div>
  );
};

export default CalendarDeposit;
