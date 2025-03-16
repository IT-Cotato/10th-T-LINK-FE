import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { LectureFileBox } from '../../models/materials.model';
import SearchBar from '../../components/RoomDetail/SearchBar';
import Preview_1 from '../../components/Material/Preview_1';
import Button from '../../components/RoomDetail/Button';
import { getLectureFileBoxes } from '../../api/materials.api';
import Toast from '../../components/Modal/Toast';
import Container from '../../components/Common/Container';
import { searchFilter } from '../../utils/SearchFilter';

const Materials = () => {
  const nav = useNavigate();
  const { roomId } = useParams<{ roomId?: string }>();
  const [materialList, setMaterialList] = useState<LectureFileBox[]>([]);
  const [search, setSearch] = useState('');
  const userRole = localStorage.getItem('roleInfo');

  const location = useLocation();
  const [toast, setToast] = useState(location.state?.toast || false);

  // 강의 자료 목록 조회
  useEffect(() => {
    const getMaterials = async () => {
      const response = await getLectureFileBoxes(roomId!);
      setMaterialList(response.data.lectureFileBoxes);
    };

    getMaterials();
  }, []);

  // 검색 필터 적용
  const filteredMaterials = searchFilter(materialList, {
    search,
    filterByDate: true,
    filterByTitle: true,
  });

  return (
    <Container>
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
      {userRole == 'TEACHER' ? <Button text="자료 업로드하기" onClick={() => nav('create')} /> : ''}
      <Outlet />
      {toast && <Toast setToast={setToast} title="강의 자료 삭제가 완료되었습니다." />}
    </Container>
  );
};

export default Materials;
