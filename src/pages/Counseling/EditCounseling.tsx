import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCounselingLogDetail, patchCounselingLog } from '../../api/counseling.api';
import LongButton from '../../components/Common/LongButton';
import TextArea from '../../components/RoomDetail/TextArea';
import PickDate from '../../components/RoomDetail/PickDate';
import ChooseButton from '../../components/Counseling/ChooseButton';
import Input from '../../components/RoomDetail/Input';
import Loading from '../Common/Loading';
import Container from '../../components/Common/Container';

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

  // 수정을 위한 상담 일지 상세 조회
  const getCounselingDetail = () => {
    getCounselingLogDetail(roomId!, counselingId!).then((data) => {
      setTitle(data.data.title);
      setContent(data.data.content);
      setEngagement(data.data.engagement);
      setHomeworkSubmitted(data.data.homeworkSubmitted);
      setDeadline(data.data.updatedAt);
      setIsLoading(false);
    });
  };

  // 상담 일지 수정
  const handleSubmit = () => {
    const payload = {
      title,
      content,
      engagement,
      homeworkSubmitted,
    };

    patchCounselingLog(roomId!, counselingId!, payload).then(() => {
      nav(-1);
    });
  };

  if (isLoading) {
    return <Loading text="데이터 로딩 중..." />;
  }

  return (
    <Container>
      <div className="flex flex-col gap-6 py-4">
        {/* 날짜 고르기 */}
        <Input
          setDesc={setTitle}
          desc={title}
          name="상담 제목"
          placeholder="상담일지명을 입력해주세요"
          isAble={true}
        />
        <PickDate
          deadline={deadline}
          setDeadline={setDeadline}
          isAble={true}
          text="날짜를 선택해주세요."
          name="상담 날짜"
        />
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
    </Container>
  );
};

export default EditCounseling;
