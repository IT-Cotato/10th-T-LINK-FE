import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CounselingLogDetail } from '../../models/counseling.model';
import { getCounselingLogDetail } from '../../api/counseling.api';
import ChooseButton from '../../components/Counseling/ChooseButton';
import TextArea from '../../components/RoomDetail/TextArea';
import Loading from '../Common/Loading';
import useDeleteStore from '../../store/useDeleteStore';
import Modal from '../../components/Modal/Modal';
import RoomDeleteModal from '../../components/Modal/RoomDeleteModal';
import Description from '../../components/RoomDetail/Description';
import Container from '../../components/Common/Container';

const CounselingDetail = () => {
  const { roomId, counselingId } = useParams<{ roomId: string; counselingId: string }>();
  const [counselingDetail, setCounselingDetail] = useState<CounselingLogDetail>();
  const [isLoading, setIsLoading] = useState(true);
  const { modalOpen, setModalOpen, what } = useDeleteStore();

  useEffect(() => {
    getCounselingDetail();
  }, [counselingId, roomId]);

  // 상담일지 상세 조회
  const getCounselingDetail = () => {
    getCounselingLogDetail(roomId!, counselingId!).then((res) => {
      setCounselingDetail(res);
      setIsLoading(false);
    });
  };

  if (isLoading) {
    return <Loading text="데이터 로딩 중..." />;
  }

  if (!counselingDetail) {
    return <Loading text="데이터 오류 발생!" />;
  }

  return (
    <Container>
      {/* 설명 */}
      <Description title={counselingDetail.title} desc={`상담날짜 ${counselingDetail.updatedAt}`} />
      <div className="flex flex-col gap-6">
        <ChooseButton
          text="학생 참여도"
          type="engage"
          engagement={counselingDetail.engagement}
          isAble={false}
        />
        <ChooseButton
          text="학생 과제 제출 여부"
          type="homework"
          homeworkSubmitted={counselingDetail.homeworkSubmitted}
          isAble={false}
        />
        <TextArea
          name="*상담 내용"
          placeholder="상담 내용을 입력하세요"
          isAble={false}
          content={counselingDetail.content}
        />
      </div>
      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <RoomDeleteModal setModalOpen={setModalOpen} what={what} />
        </Modal>
      )}
    </Container>
  );
};

export default CounselingDetail;
