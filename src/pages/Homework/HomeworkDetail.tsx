import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getHomeworkDeatil } from '../../api/homework.api';
import { HomeworkFileBoxDetail } from '../../models/homework.model';
import Loading from '../Common/Loading';
import Button from '../../components/RoomDetail/Button';
import Modal from '../../components/Modal/Modal';
import RoomDeleteModal from '../../components/Modal/RoomDeleteModal';
import useDeleteStore from '../../store/useDeleteStore';
import FileDetail from '../../components/Material/FileDetail';
import Description from '../../components/RoomDetail/Description';

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
      const response = await getHomeworkDeatil(roomId!, homeworkId!);
      setDetail(response.data);
      setLoading(false);
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
      <Description
        title={detail.homeworkName}
        desc={`마감날짜 ${detail.deadline}`}
        className="px-4"
      />
      <div className=" rounded-lg mt-2 mb-4 mx-4 gap-2 flex flex-col">
        {detail.teacherFiles?.map((file) => (
          <div>
            <FileDetail
              title={file.originalName}
              fileUrl={file.fileUrl}
              key={file.homeworkFileId}
            />
          </div>
        ))}
      </div>
      <Description
        title="제출한 숙제"
        desc="학생이 업로드한 숙제예요."
        className="px-4 border-t-2 border-gray-100"
        edit={false}
      />
      {detail.studentFiles?.map((file) => (
        <>
          <FileDetail title={file.originalName} fileUrl={file.fileUrl} key={file.homeworkFileId} />
        </>
      ))}
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
