import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { CounselingLogs } from '../../models/counseling.model';
import { getCounselingLogs } from '../../api/counseling.api';
import SearchBar from '../../components/SearchBar';
import Preview_1 from '../../components/Preview_1';
import Button from '../../components/Button';
import Toast from '../../components/Toast';

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
    try {
      const response = await getCounselingLogs(roomId!);
      setCounselingList(response.data.counselingLogs);
    } catch (error) {
      console.log('강의 자료 목록 조회 실패', error);
    }
  };

  const filteredLogs = counselingList.filter((logs) => {
    if (search && search.length === 10 && search.includes('.')) {
      return logs.updatedAt.includes(search);
    }

    return logs.title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="flex flex-col px-4 h-full relative">
      <div className="py-4">
        <SearchBar value={search} setValue={setSearch} />
      </div>
      {filteredLogs.map((logs) => (
        <Preview_1 title={logs.title} updatedAt={logs.updatedAt} type="counseling" id={logs.id} key={logs.id} />
      ))}
      {userRole == 'TEACHER' && <Button text="일지 업로드하기" onClick={() => nav('create')} />}
      <Outlet />
      {toast && <Toast setToast={setToast} title="상담 일지 삭제가 완료되었습니다." />}
    </div>
  );
};

export default CounselingDiary;
