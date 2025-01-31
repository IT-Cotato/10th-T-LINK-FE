import money from '../../assets/images/money.png';
import vector from '../../assets/images/vector.png';

type DepositProps = {
  roomname: string;
};

const CalendarDeposit = ({ roomname }: DepositProps) => {
  return (
    <div className="flex p-4 gap-3 bg-primary_100 items-center rounded-xl">
      <div className="p-1.5 rounded-full bg-white">
        <img src={money} className="w-7 h-7" />
      </div>
      <div>
        <img src={vector} className="w-1 h-6" />
      </div>
      <div>
        <div className="text-primary_800 text-base font-semibold leading-7">입금일</div>
        <div className="text-sm leading-6">{roomname} 입금일 입니다.</div>
      </div>
    </div>
  );
};

export default CalendarDeposit;
