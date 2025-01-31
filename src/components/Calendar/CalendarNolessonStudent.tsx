import wow from '../../assets/images/wow.png';
import vector from '../../assets/images/vector_gray.png';

const CalendarNolessonStudent = () => {
  return (
    <div className="flex p-4 bg-gray-50 rounded-xl items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-1.5 rounded-full bg-white">
          <img src={wow} className="w-7 h-7" />
        </div>
        <img src={vector} className="w-1 h-6" />
        <div className="text-gray-900 text-base font-semibold leading-7">오늘은 일정이 없어요!</div>
      </div>
    </div>
  );
};

export default CalendarNolessonStudent;
