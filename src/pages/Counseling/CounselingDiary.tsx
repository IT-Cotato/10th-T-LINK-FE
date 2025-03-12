import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { CounselingLogs } from '../../models/counseling.model';
import { getCounselingLogs } from '../../api/counseling.api';
import SearchBar from '../../components/RoomDetail/SearchBar';
import Button from '../../components/RoomDetail/Button';
import Toast from '../../components/Modal/Toast';
import { searchFilter } from '../../utils/SearchFilter';
import CounselingList from '../../components/Counseling/CounselingList';
import Container from '../../components/Common/Container';

const CounselingDiary = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [search, setSearch] = useState('');
  const [counselingList, setCounselingList] = useState<CounselingLogs[]>([]);
  const nav = useNavigate();
  const userRole = localStorage.getItem('roleInfo');

  const location = useLocation();
  const [toast, setToast] = useState(location.state?.toast || false);

  useEffect(() => {
    getCounselingDiary();
  }, []);

  // 상담일지 목록 조회
  const getCounselingDiary = async () => {
    getCounselingLogs(roomId!).then((data) => {
      setCounselingList(data.data.counselingLogs);
    });
  };

  // 검색했을 때 필터링해주는 함수
  const filteredLogs = searchFilter(counselingList, {
    search,
    filterByDate: true,
    filterByTitle: true,
  });

  return (
    <Container>
      <div className="py-4">
        <SearchBar value={search} setValue={setSearch} />
      </div>
      <CounselingList logs={filteredLogs} />
      {userRole == 'TEACHER' && <Button text="일지 업로드하기" onClick={() => nav('create')} />}
      <Outlet />
      {toast && <Toast setToast={setToast} title="상담 일지 삭제가 완료되었습니다." />}
    </Container>
  );
};

export default CounselingDiary;
