import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import instance from '../api/axios';

interface Homework {
  homeworkId: number;
  createdAt: string;
  description: string;
  deadline: string;
}

const Homework = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const nav = useNavigate();
  const [homeworkList, setHomeworkList] = useState<Homework[]>([]);

  useEffect(() => {
    getHomeworkList();
  }, []);

  const getHomeworkList = async () => {
    try {
      const response = await instance.get(`/api/v1/rooms/${roomId}/homeworks`);
      if (response.status == 200) {
        setHomeworkList(response.data.homeworks);
      }
    } catch (error) {
      console.log('숙제 목록 조회 실패', error);
    }
  };
  return (
    <div>
      {homeworkList.map((homework) => (
        <div key={homework.homeworkId} className="border p-4 rounded mb-2">
          <h3 className="font-bold">숙제 ID: {homework.homeworkId}</h3>
          <p>설명: {homework.description}</p>
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
