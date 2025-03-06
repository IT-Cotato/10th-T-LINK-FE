import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { LectureFileBox } from '../../models/materials.model';
import SearchBar from '../../components/RoomDetail/SearchBar';
import Preview_1 from '../../components/Material/Preview_1';
import Button from '../../components/RoomDetail/Button';
import { getLectureFileBoxes } from '../../api/materials.api';
import Toast from '../../components/Modal/Toast';

const Materials = () => {
  const nav = useNavigate();
  const { roomId } = useParams<{ roomId: string }>();
  const [materialList, setMaterialList] = useState<LectureFileBox[]>([]);
  const [search, setSearch] = useState('');
  const userRole = localStorage.getItem('roleInfo');

  const location = useLocation();
  const [toast, setToast] = useState(location.state?.toast || false);

  useEffect(() => {
    const getMaterials = async () => {
      try {
        const response = await getLectureFileBoxes(roomId!);
        if (response.status == 200) {
          setMaterialList(response.data.lectureFileBoxes);
        }
      } catch (error) {
        console.log('강의 자료 목록 조회 실패', error);
      }
    };

    getMaterials();
  }, []);

  const filteredMaterials = materialList.filter((material) => {
    if (search && search.length === 10 && search.includes('.')) {
      return material.updateAt.includes(search);
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
          updatedAt={material.updateAt}
          type="materials"
          id={material.lectureFileBoxId}
          key={material.lectureFileBoxId}
        />
      ))}
      {userRole == 'TEACHER' ? <Button text="자료 업로드하기" onClick={() => nav('create')} /> : ''}
      <Outlet />
      {toast && <Toast setToast={setToast} title="강의 자료 삭제가 완료되었습니다." />}
    </div>
  );
};

export default Materials;
