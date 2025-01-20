import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { LectureFileBox } from '../../models/materials.model';

const Materials = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [materialList, setMaterialList] = useState<LectureFileBox[]>([]);
  const nav = useNavigate();

  useEffect(() => {
    getMaterials();
  }, []);

  // 강의 자료함 목록 조회
  const getMaterials = async () => {
    try {
      // 확인용 mockData
      const mockData = [
        { lectureFileBoxId: 1, lectureFileBoxName: '강의 자료 설명', updatedAt: '2024-04-04' },
        { lectureFileBoxId: 2, lectureFileBoxName: '이건 강의 자료야', updatedAt: '2024-05-05' },
        { lectureFileBoxId: 3, lectureFileBoxName: '강의 자료자료', updatedAt: '2024-06-06' },
      ];

      setMaterialList(mockData);
      // const response = await uploadLectureFile(roomId!);
      // getLectureFileBoxes(data.lectureFileBoxes);
    } catch (error) {
      console.log('강의 자료 목록 조회 실패', error);
    }
  };

  return (
    <div>
      {materialList.map((material) => (
        <div
          key={material.lectureFileBoxId}
          className="border p-4 rounded mb-2 cursor-pointer"
          onClick={() => nav(`${material.lectureFileBoxId}`)}
        >
          <h3 className="font-bold">강의자료 ID: {material.lectureFileBoxId}</h3>
          <p>이름: {material.lectureFileBoxName}</p>
          <p>업데이트된 날짜: {material.updatedAt}</p>
        </div>
      ))}
      <button
        className="bg-primary_500"
        onClick={() => {
          nav('create');
        }}
      >
        +강의 자료 업로드
      </button>
      <Outlet />
    </div>
  );
};

export default Materials;
