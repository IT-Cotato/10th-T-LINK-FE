import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { getHomework } from '../../api/homework.api';
import { Homeworks } from '../../models/homework.model';

const Homework = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const nav = useNavigate();
  const [homeworkList, setHomeworkList] = useState<Homeworks[]>([]);

  useEffect(() => {
    getHomeworkList();
  }, []);

  const getHomeworkList = async () => {
    try {
      const data = await getHomework(roomId!);
      console.log('숙제 업로드 성공:', data);
      setHomeworkList(data);
    } catch (error) {
      console.log('숙제 목록 조회 실패', error);
    }
  };

  return (
    <div>
      {homeworkList.map((homework) => (
        <div key={homework.homeworkId} className="border p-4 rounded mb-2">
          <h3 className="font-bold">숙제 ID: {homework.homeworkId}</h3>
          <p>설명: {homework.homeworkName}</p>
          <p>생성일: {homework.createdAt}</p>
          <p>마감일: {homework.deadline}</p>
        </div>
      ))}
      <button
        className="bg-primary_500"
        onClick={() => {
          nav('create');
        }}
      >
        +숙제 업로드
      </button>
      <Outlet />
    </div>
  );
};

export default Homework;
