import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getLectureFileDeatil } from '../../api/materials.api';
import { LectureFileBoxDetail } from '../../models/materials.model';
import Edit from '../../assets/images/RoomDetail/Edit.svg?react';
import Loading from '../Common/Loading';
import Modal from '../../components/Modal/Modal';
import RoomDeleteModal from '../../components/Modal/RoomDeleteModal';
import useDeleteStore from '../../store/useDeleteStore';
import FileDetail from '../../components/Material/FileDetail';
import Container from '../../components/Common/Container';
import Description from '../../components/RoomDetail/Description';
import FileList from '../../components/Material/FileList';

const MaterialDetail = () => {
  const nav = useNavigate();
  const { roomId, materialId } = useParams<{ roomId: string; materialId: string }>();
  const [lectureFiles, setLectureFiles] = useState<LectureFileBoxDetail>();
  const [loading, setLoading] = useState<boolean>(true);
  const userRole = localStorage.getItem('roleInfo');
  const { modalOpen, setModalOpen, what } = useDeleteStore();

  useEffect(() => {
    getMaterialDetail();
  }, [roomId, materialId]);

  // 강의 자료 상세 조회
  const getMaterialDetail = async () => {
    setLoading(true);
    const response = await getLectureFileDeatil(roomId!, materialId!);
    setLectureFiles(response.data);
    setLoading(false);
  };

  if (loading) {
    return <Loading text="데이터 로딩 중..." />;
  }

  if (!lectureFiles) {
    return <div>정보를 불러오지 못했습니다</div>;
  }

  return (
    <Container>
      <Description
        title={lectureFiles.lectureFileBoxName}
        desc={`업로드 날짜 ${lectureFiles.updatedAt}`}
      />
      <FileList files={lectureFiles.lectureFiles} />
      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <RoomDeleteModal setModalOpen={setModalOpen} what={what} />
        </Modal>
      )}
    </Container>
  );
};

export default MaterialDetail;
