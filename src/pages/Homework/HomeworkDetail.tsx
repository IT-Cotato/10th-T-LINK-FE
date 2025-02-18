import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getHomeworkDeatil } from '../../api/homework.api';
import { HomeworkFile, HomeworkFileBoxDetail } from '../../models/homework.model';
import Edit from '../../assets/images/RoomDetail/Edit.svg?react';
import { downloadFile } from '../../utils/DownloadFiles';
import Loading from '../Loading';
import Button from '../../components/Button';
import Modal from '../../components/Modal/Modal';
import RoomDeleteModal from '../../components/Modal/RoomDeleteModal';
import useDeleteStore from '../../store/useDeleteStore';

const HomeworkDetail = () => {
  const { roomId, homeworkId } = useParams<{ roomId: string; homeworkId: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [detail, setDetail] = useState<HomeworkFileBoxDetail | null>(null);
  const nav = useNavigate();

  const userRole = localStorage.getItem('roleInfo');
  const { modalOpen, setModalOpen, what } = useDeleteStore();

  // 숙제 상세 조회
  useEffect(() => {
    const getHomeworkDetail = async () => {
      setLoading(true);
      try {
        const response = await getHomeworkDeatil(roomId!, homeworkId!);
        setDetail(response.data);
      } catch (error) {
        console.log('숙제 상세 페이지를 불러오는데 실패했습니다.', error);
      } finally {
        setLoading(false);
      }
    };
    getHomeworkDetail();
  }, [roomId, homeworkId]);

  if (loading) {
    return <Loading text="데이터 로딩 중..." />;
  }

  if (!detail) {
    return <Loading text="데이터 오류!" />;
  }

  const text = (detail.studentFiles?.length ?? 0) > 0 ? '숙제 수정하기' : '숙제 제출하기';

  return (
    <div className="flex flex-col">
      <div className="py-4 px-4">
        <div className="flex items-center justify-between">
          <p className="text-heading6 font-bold leading-10 text-gray-900">{detail.homeworkName}</p>
          {userRole == 'TEACHER' ? <Edit onClick={() => nav(`edit`)} /> : ''}
        </div>
        <p className="text-body4 font-normal leading-7 tracking-[-0.048px] text-gray-600">마감날짜 {detail.deadline}</p>
      </div>
      <div className="bg-gray-100 h-[100px] rounded-lg mt-2 mb-6 mx-4">
        <ul>
          {detail.teacherFiles?.map((file) => (
            <li onClick={() => downloadFile(file.fileUrl)} key={file.homeworkFileId}>
              {file.originalName}
            </li>
          ))}
        </ul>
      </div>
      <div className="py-4 px-4 border-t-2 border-gray-100">
        <p className="text-heading6 font-bold leading-10 text-gray-900">제출한 숙제</p>
        <p className="text-body4 font-normal leading-7 tracking-[-0.048px] text-gray-600">학생이 업로드한 숙제예요.</p>
      </div>
      <div className="bg-gray-100 h-[100px] rounded-lg mt-2 mb-6 mx-4">
        <ul>
          {detail.studentFiles?.map((file) => (
            <li onClick={() => downloadFile(file.fileUrl)} key={file.homeworkFileId}>
              {file.originalName}
            </li>
          ))}
        </ul>
      </div>
      {userRole !== 'TEACHER' ? <Button text={text} onClick={() => nav('edit')} /> : ''}
      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <RoomDeleteModal setModalOpen={setModalOpen} what={what} />
        </Modal>
      )}
    </div>
  );
};

export default HomeworkDetail;
