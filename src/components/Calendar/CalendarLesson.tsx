import user_blue from '../../assets/images/user_blue.png';
import lable from '../../assets/images/lable.png';
import vector from '../../assets/images/vector_gray.png';

type LessonProps = {
  subjectAndRooms: string[];
};

const CalendarLesson = ({ subjectAndRooms }: LessonProps) => {
  const roleInfo = localStorage.getItem('roleInfo');
  return (
    <div className="flex flex-col gap-2">
      {subjectAndRooms.map((item, idx) => (
        <div key={idx} className="flex p-4 gap-3 bg-gray-50 items-center rounded-xl">
          <div className="p-1.5 rounded-full bg-white">
            {roleInfo === 'TEACHER' ? (
              <img src={user_blue} className="w-7 h-7" />
            ) : (
              <img src={lable} className="w-7 h-7" />
            )}
          </div>
          <div>
            <img src={vector} className="w-1 h-6" />
          </div>
          <div>
            <div className="text-gray-900 text-base font-semibold leading-7">{item}</div>
            <div className="text-sm leading-6">수업일 입니다.</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CalendarLesson;
