import wow from '../assets/images/wow.png';
import vector from '../assets/images/vector_gray.png';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const CalendarNolesson = () => {
  const navigation = useNavigate();

  return (
    <div
      className="flex p-4 bg-gray-50 rounded-xl items-center justify-between cursor-pointer"
      onClick={() => navigation('/user/roomlist')}
    >
      <div className="flex items-center gap-3">
        <div className="p-1.5 rounded-full bg-white">
          <img src={wow} className="w-7 h-7" />
        </div>
        <div>
          <img src={vector} className="w-1 h-6" />
        </div>
        <div>
          <div className="text-gray-900 text-base font-semibold leading-7">오늘은 일정이 없어요!</div>
          <div className="text-sm leading-6">과외방에서 일정을 추가할 수 있어요</div>
        </div>
      </div>
      <MdKeyboardArrowRight size={24} />
    </div>
  );
};

export default CalendarNolesson;
