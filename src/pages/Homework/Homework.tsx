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

  useEffect(() => {
    getHomeworkList();
  }, []);

  const getHomeworkList = async () => {
    try {
      const mockData = [
        { homeworkId: 1, createdAt: '25.01.04', homeworkName: '숙제명숙제명', deadline: '25.02.26', passed: false },
        { homeworkId: 4, createdAt: '25.01.04', homeworkName: '숙제명숙제명', deadline: '25.02.16', passed: false },
        {
          homeworkId: 2,
          createdAt: '25.04.04',
          homeworkName: '숙제를제발해오거라',
          deadline: '25.01.08',
          passed: true,
        },
        { homeworkId: 3, createdAt: '25.05.12', homeworkName: '숙제해', deadline: '25.02.04', passed: true },
        { homeworkId: 3, createdAt: '25.05.12', homeworkName: '숙제해', deadline: '25.02.04', passed: true },
        { homeworkId: 3, createdAt: '25.05.12', homeworkName: '숙제해', deadline: '25.02.04', passed: true },
        { homeworkId: 3, createdAt: '25.05.12', homeworkName: '숙제해', deadline: '25.02.04', passed: true },
        { homeworkId: 3, createdAt: '25.05.12', homeworkName: '숙제해', deadline: '25.02.04', passed: true },
      ];

      setHomeworkList(mockData);
      // const data = await getHomework(roomId!);
      // console.log('숙제 업로드 성공:', data);
      // setHomeworkList(data);
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
            name="홍길동"
            isPassed={homework.passed}
            dDay={homework.dDay}
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
            name="홍길동"
            isPassed={homework.passed}
          />
        ))}
      </div>
      <Button text="숙제 업로드하기" onClick={() => nav('create')} />
      <Outlet />
    </div>
  );
};

export default Homework;
