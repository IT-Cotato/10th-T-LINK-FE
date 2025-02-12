import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { getHomework } from '../../api/homework.api';
import { Homeworks } from '../../models/homework.model';
import Preview_2 from '../../components/Preview_2';
import Button from '../../components/Button';
import { CaculateDday } from '../../utils/CaculateDday';

const Homework = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const nav = useNavigate();
  const [homeworkList, setHomeworkList] = useState<Homeworks[]>([]);
  const userRole = localStorage.getItem('roleInfo');

  useEffect(() => {
    getHomeworkList();
  }, []);

  const getHomeworkList = async () => {
    try {
      const response = await getHomework(roomId!);
      if (response.status == 200) {
        setHomeworkList(response.data.homeworks);
      }
    } catch (error) {
      console.log('숙제 목록 조회 실패', error);
    }
  };

  const passedHomework = homeworkList.filter((cur) => cur.passed);
  const nowHomework = homeworkList
    .filter((cur) => !cur.passed)
    .map((homework) => ({
      ...homework,
      dDay: CaculateDday(homework.deadline),
    }))
    .sort((a, b) => a.dDay - b.dDay);

  return (
    <div className="flex flex-col">
      <h2 className="p-4 text-heading6 font-bold leading-10">오늘의 숙제</h2>
      {/* 안지난 숙제 */}
      <div className="px-4 gap-2 flex flex-col mb-2">
        {nowHomework.map((homework) => (
          <Preview_2
            title={homework.homeworkName}
            id={homework.homeworkId}
            deadline={homework.deadline}
            isPassed={homework.passed}
            dDay={homework.dDay}
            key={homework.homeworkId}
          />
        ))}
      </div>
      <h2 className="p-4 text-heading6 font-bold leading-10 border-t-2 border-gray-100">지난 숙제</h2>
      <div className="px-4 gap-2 flex flex-col mb-2">
        {passedHomework.map((homework) => (
          <Preview_2
            title={homework.homeworkName}
            id={homework.homeworkId}
            deadline={homework.deadline}
            isPassed={homework.passed}
            key={homework.homeworkId}
          />
        ))}
      </div>
      {userRole == 'TEACHER' ? <Button text="숙제 업로드하기" onClick={() => nav('create')} /> : ''}
      <Outlet />
    </div>
  );
};

export default Homework;
