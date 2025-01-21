import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { CounselingLogs } from '../../models/counseling.model';
import { getCounselingLogs } from '../../api/counseling.api';

const CounselingDiary = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [counselingList, setCounselingList] = useState<CounselingLogs[]>([]);
  const nav = useNavigate();

  useEffect(() => {
    getCounselingDiary();
  }, []);

  // 상담일지 목록 조회
  const getCounselingDiary = async () => {
    try {
      // 확인용 mockData
      const mockData = [
        { counselingLogId: 1, title: '중간고사 피드백', updatedAt: '2024-04-04' },
        { counselingLogId: 2, title: '숙제를 너무 안해옵니다...', updatedAt: '2024-05-05' },
        { counselingLogId: 3, title: '수업을 요즘 잘들어요~', updatedAt: '2024-06-06' },
      ];

      setCounselingList(mockData);
      // const data = await getCounselingLogs(roomId!);
      // setCounselingList(data.counselingLogs);
    } catch (error) {
      console.log('강의 자료 목록 조회 실패', error);
    }
  };

  return (
    <div>
      {counselingList.map((logs) => (
        <div
          key={logs.counselingLogId}
          className="border p-4 rounded mb-2 cursor-pointer"
          onClick={() => nav(`${logs.counselingLogId}`)}
        >
          <h3 className="font-bold">상담제목: {logs.title}</h3>
          <p>날짜: {logs.updatedAt}</p>
        </div>
      ))}
      <button
        className="bg-primary_500"
        onClick={() => {
          nav('create');
        }}
      >
        +상담일지
      </button>
      <Outlet />
    </div>
  );
};

export default CounselingDiary;
