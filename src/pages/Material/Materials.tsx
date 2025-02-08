import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { LectureFileBox } from '../../models/materials.model';
import SearchBar from '../../components/SearchBar';
import Preview_1 from '../../components/Preview_1';
import Button from '../../components/Button';

const Materials = () => {
  const nav = useNavigate();
  const { roomId } = useParams<{ roomId: string }>();
  const [materialList, setMaterialList] = useState<LectureFileBox[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const getMaterials = async () => {
      try {
        // 확인용 mockData
        const mockData = [
          { lectureFileBoxId: 1, lectureFileBoxName: '강의 자료 설명', updatedAt: '2025.02.04' },
          { lectureFileBoxId: 2, lectureFileBoxName: '이건 강의 자료야', updatedAt: '2024.05.05' },
          { lectureFileBoxId: 3, lectureFileBoxName: '강의 자료자료', updatedAt: '2024.06.06' },
        ];

        setMaterialList(mockData);
        // const response = await uploadLectureFile(roomId!);
        // getLectureFileBoxes(data.lectureFileBoxes);
      } catch (error) {
        console.log('강의 자료 목록 조회 실패', error);
      }
    };

    getMaterials();
  }, []);

  const filteredMaterials = materialList.filter((material) => {
    if (search && search.length === 10 && search.includes('.')) {
      return material.updatedAt.includes(search);
    }

    return material.lectureFileBoxName.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="flex flex-col px-4 h-full relative">
      <div className="py-4">
        <SearchBar value={search} setValue={setSearch} />
      </div>
      {filteredMaterials.map((material) => (
        <Preview_1
          title={material.lectureFileBoxName}
          updatedAt={material.updatedAt}
          type="materials"
          id={material.lectureFileBoxId}
          key={material.lectureFileBoxId}
        />
      ))}
      <Button text="강의 자료 업로드" onClick={() => nav('create')} />
      <Outlet />
    </div>
  );
};

export default Materials;
