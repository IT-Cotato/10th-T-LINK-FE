import { useNavigate } from 'react-router-dom';
import Edit from '../../assets/images/RoomDetail/Edit.svg?react';

interface RoomDescProps {
  title: string;
  subject: string;
  lessonDays: { lessonDay: string }[];
  studentName?: string;
  className?: string;
  edit?: boolean;
}

const RoomDesc = ({
  title,
  subject,
  lessonDays,
  studentName,
  className,
  edit = true,
}: RoomDescProps) => {
  const userRole = localStorage.getItem('roleInfo');
  const nav = useNavigate();

  /** ✅ 요일 정렬 */
  const dayOrder = ['월', '화', '수', '목', '금', '토', '일'];
  const sortedLessonDays = [...lessonDays].sort(
    (a, b) => dayOrder.indexOf(a.lessonDay) - dayOrder.indexOf(b.lessonDay),
  );

  return (
    <div className={`p-4 flex flex-col gap-2 ${className}`}>
      {/* 방 제목 & 수정 버튼 */}
      <div className="flex justify-between items-center">
        <h2 className="text-heading6 font-bold">{title}</h2>
        {userRole === 'TEACHER' && edit && <Edit onClick={() => nav('edit')} />}
      </div>
      {/* 요일 & 과목명 */}
      <div>
        <div className="flex flex-wrap text-body4 font-medium gap-[6px] items-center">
          <div>
            <span className="text-gray-500">#</span>
            <span className="text-primary_700">{subject}</span>
          </div>
          {sortedLessonDays.map((day, index) => (
            <li key={index} className="list-none">
              <span className="text-gray-500">#</span>
              <span className="text-primary_700">{day.lessonDay}요일</span>
            </li>
          ))}
        </div>
        {/* 학생 정보 */}
        <div className="flex gap-[6px] text-body4 text-gray-500 items-center">
          {studentName ? (
            <>
              <span className="text-gray-950">{studentName}</span>
              <span>학생</span>
            </>
          ) : (
            <span>아직 학생이 참여하지 않았어요!</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomDesc;
