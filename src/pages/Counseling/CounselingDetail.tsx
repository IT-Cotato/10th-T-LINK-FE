import { useEffect, useState } from 'react';
import { FaRegCheckCircle, FaRegTimesCircle } from 'react-icons/fa';
import { RiEmotionHappyLine, RiEmotionNormalLine, RiEmotionUnhappyLine } from 'react-icons/ri';
import { useNavigate, useParams } from 'react-router-dom';
import { CounselingLogDetail } from '../../models/counseling.model';
import { deleteCounselingLog, getCounselingLogDetail } from '../../api/counseling.api';

const CounselingDetail = () => {
  const nav = useNavigate();
  const { roomId, counselingId } = useParams<{ roomId: string; counselingId: string }>();
  const [counselingDetail, setCounselingDetail] = useState<CounselingLogDetail>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCounselingDetail();
  }, [counselingId, roomId]);

  const getCounselingDetail = async () => {
    try {
      const mockData = {
        counselingLogId: 1,
        title: '중간고사 피드백',
        content: '중간고사를 넘 잘봣어요~',
        engagement: 'upper',
        homeworkSubmitted: null,
        updatedAt: '2025.01.07',
      };
      setCounselingDetail(mockData);
      //   const response = await getCounselingLogDetail(roomId!, counselingId!);
      //   setCounselingDetail(response.data);
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
    <div className="flex flex-col w-full h-full">
      <div>
        <div>{counselingDetail.title}</div>
        <p>{counselingDetail.updatedAt}</p>
      </div>
      <div className="flex border border-black mx-3 flex-col my-5 h-full">
        <div className="flex items-center gap-1">
          <p>참여도</p>
          <RiEmotionHappyLine className={`${counselingDetail.engagement == 'upper' ? 'fill-primary_500' : ''}`} />
          <RiEmotionNormalLine className={`${counselingDetail.engagement == 'middle' ? 'fill-primary_500' : ''}`} />
          <RiEmotionUnhappyLine className={`${counselingDetail.engagement == 'lower' ? 'fill-primary_500' : ''}`} />
        </div>
        <div className="flex items-center gap-1">
          <p>과제 제출 여부</p>
          <FaRegCheckCircle className={`${counselingDetail.homeworkSubmitted ? 'fill-primary_500' : ''}`} />
          <FaRegTimesCircle className={`${!counselingDetail.homeworkSubmitted ? 'fill-primary_500' : ''}`} />
        </div>
        <div className="mx-3 resize-none h-full my-6 border border-gray-300">{counselingDetail.content}</div>
      </div>
      <div className="flex justify-end">
        <button className="bg-primary_400 w-20" onClick={handleModify}>
          수정
        </button>
        <button className="bg-red-400 w-20" onClick={handleDelete}>
          삭제
        </button>
      </div>
    </div>
  );
};

export default CounselingDetail;
