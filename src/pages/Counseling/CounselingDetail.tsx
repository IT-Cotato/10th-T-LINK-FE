import { useEffect, useState } from 'react';
import { FaRegCheckCircle, FaRegTimesCircle } from 'react-icons/fa';
import { RiEmotionHappyLine, RiEmotionNormalLine, RiEmotionUnhappyLine } from 'react-icons/ri';
import { useNavigate, useParams } from 'react-router-dom';
import { CounselingLogDetail } from '../../models/counseling.model';
import { deleteCounselingLog, getCounselingLogDetail } from '../../api/counseling.api';
import Edit from '../../assets/images/RoomDetail/Edit.svg?react';
import ChooseButton from '../../components/Room/ChooseButton';
import TextArea from '../../components/Room/TextArea';

const CounselingDetail = () => {
  const nav = useNavigate();
  const { roomId, counselingId } = useParams<{ roomId: string; counselingId: string }>();
  const [counselingDetail, setCounselingDetail] = useState<CounselingLogDetail>();
  const [isLoading, setIsLoading] = useState(true);
  const userRole = localStorage.getItem('roleInfo');

  useEffect(() => {
    getCounselingDetail();
  }, [counselingId, roomId]);

  const getCounselingDetail = async () => {
    try {
      const response = await getCounselingLogDetail(roomId!, counselingId!);
      setCounselingDetail(response.data);
    } catch (error) {
      console.log('상세 조회 실패');
    } finally {
      setIsLoading(false);
    }
  };

  const handleModify = () => {
    nav(`/user/roomlist/${roomId}/diary/create?isEdit=true`, { state: { counselingDetail } });
  };

  // 삭제
  const handleDelete = async () => {
    try {
      const response = await deleteCounselingLog(roomId!, counselingId!);
      if (response.status == 200) {
        console.log('삭제 성공');
        nav(-1);
      }
    } catch (error) {
      console.log('삭제 실패');
    }
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (!counselingDetail) {
    return <div>데이터를 불러오지 못했습니다.</div>;
  }
  return (
    <div className="px-4 flex flex-col h-full">
      {/* 설명 */}
      <div className="py-4">
        <div className="flex items-center justify-between">
          <p className="text-heading6 font-bold leading-10 text-gray-900">{counselingDetail.title}</p>
          {userRole == 'TEACHER' ? <Edit onClick={() => nav(`edit`)} /> : ''}
        </div>
        <p className="text-body4 font-normal leading-7 tracking-[-0.048px] text-gray-600">
          상담 날짜 {counselingDetail.updatedAt}
        </p>
      </div>
      <div className="flex flex-col gap-6">
        <ChooseButton text="학생 참여도" type="engage" engagement={counselingDetail.engagement} />
        <ChooseButton
          text="학생 과제 제출 여부"
          type="homework"
          homeworkSubmitted={counselingDetail.homeworkSubmitted}
        />
        <TextArea
          name="*상담 내용"
          placeholder="상담 내용을 입력하세요"
          isAble={false}
          content={counselingDetail.content}
        />
      </div>
    </div>
  );
};

export default CounselingDetail;
