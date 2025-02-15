import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCounselingLogDetail, patchCounselingLog } from '../../api/counseling.api';
import { CounselingLogDetail } from '../../models/counseling.model';
import LongButton from '../../components/LongButton';
import TextArea from '../../components/Room/TextArea';
import PickDate from '../../components/Room/PickDate';
import ChooseButton from '../../components/Room/ChooseButton';
import Input from '../../components/Room/Input';
import Loading from '../Loading';

const EditCounseling = () => {
  const nav = useNavigate();
  const { roomId, counselingId } = useParams<{ roomId: string; counselingId: string }>();
  const [deadline, setDeadline] = useState<string>(''); // 상담일지 작성 날짜
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [engagement, setEngagement] = useState<string>('');
  const [homeworkSubmitted, setHomeworkSubmitted] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCounselingDetail();
  }, [counselingId, roomId]);

  const getCounselingDetail = async () => {
    try {
      const response = await getCounselingLogDetail(roomId!, counselingId!);
      if (response.status == 200) {
        setTitle(response.data.title);
        setContent(response.data.content);
        setEngagement(response.data.engagement);
        setHomeworkSubmitted(response.data.homeworkSubmitted);
        setDeadline(response.data.updatedAt);
      }
    } catch (error) {
      console.log('상세 조회 실패');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    const payload = {
      title: title,
      content: content,
      engagement: engagement,
      homeworkSubmitted: homeworkSubmitted,
    };
    try {
      const response = await patchCounselingLog(roomId!, counselingId!, payload);
      if (response.status == 200) {
        console.log('수정 성공');
        nav(-1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <Loading text="데이터 로딩 중..." />;
  }

  return (
    <div className="px-4 flex flex-col h-full">
      <div className="flex flex-col gap-6 py-4">
        {/* 날짜 고르기 */}
        <Input setDesc={setTitle} desc={title} name="상담 제목" placeholder="상담일지명을 입력해주세요" isAble={true} />
        <div className="flex flex-col gap-[6px]">
          <div className="text-body4 leading-[26px] font-medium flex gap-1">
            <span className="text-gray-900">상담 날짜</span>
            <span className="text-primary_700">(필수)</span>
          </div>
          <PickDate deadline={deadline} setDeadline={setDeadline} isAble={true} text="업로드 날짜를 선택해주세요." />
        </div>
        <ChooseButton
          text="학생 참여도"
          type="engage"
          setEngagement={setEngagement}
          engagement={engagement}
          isAble={true}
        />
        <ChooseButton
          text="학생 과제 제출 여부"
          type="homework"
          homeworkSubmitted={homeworkSubmitted}
          setHomeworkSubmitted={setHomeworkSubmitted}
          isAble={true}
        />
        <TextArea
          name="*상담 내용"
          placeholder="상담 내용을 입력하세요"
          isAble={true}
          content={content}
          setContent={setContent}
        />
      </div>
      <div className="py-6 mt-auto">
        <LongButton
          enable={!!(content.length > 0 && title.length > 0 && deadline.length > 0 && engagement)}
          onClick={handleSubmit}
          text="수정 완료"
        />
      </div>
    </div>
  );
};

export default EditCounseling;
