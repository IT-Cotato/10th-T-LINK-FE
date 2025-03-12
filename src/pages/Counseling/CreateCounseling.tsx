import { useState } from 'react';
import { postCounselingLogs } from '../../api/counseling.api';
import { useNavigate, useParams } from 'react-router-dom';
import PickDate from '../../components/RoomDetail/PickDate';
import Input from '../../components/RoomDetail/Input';
import ChooseButton from '../../components/Counseling/ChooseButton';
import TextArea from '../../components/RoomDetail/TextArea';
import LongButton from '../../components/RoomDetail/LongButton';
import CreateDesc from '../../components/RoomDetail/CreateDesc';
import Container from '../../components/Common/Container';

const CreateCounseling = () => {
  const nav = useNavigate();
  const { roomId } = useParams<{ roomId: string }>();
  const [deadline, setDeadline] = useState<string>(''); // 상담일지 작성 날짜

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [engagement, setEngagement] = useState<string>('');
  const [homeworkSubmitted, setHomeworkSubmitted] = useState<boolean | null>(null);

  const isValidForm = () => {
    if (!title.trim()) return '제목을 입력해주세요!';
    if (!engagement) return '참여도를 선택해주세요!';
    if (!content.trim()) return '내용을 입력해주세요!';
    return '';
  };

  // 생성 및 수정
  const handleSubmit = async () => {
    const error = isValidForm();
    if (error) {
      alert(error);
      return;
    }

    const payload = {
      title,
      content,
      engagement,
      homeworkSubmitted,
    };

    postCounselingLogs(roomId!, payload).then(() => {
      nav(`/user/${roomId}/diary`);
    });
  };

  return (
    <Container>
      {/* 설명 */}
      <CreateDesc title="상담 정보를 입력하세요." desc="언제든지 수정할 수 있어요!" />
      <div className="flex flex-col gap-6 pt-4">
        {/* 날짜 고르기 */}
        <PickDate
          deadline={deadline}
          setDeadline={setDeadline}
          isAble={true}
          text="날짜를 선택해주세요."
          name="상담 날짜"
        />
        <Input
          setDesc={setTitle}
          desc={title}
          name="제목"
          placeholder="상담일지명을 입력해주세요"
          isAble={true}
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
          text="업로드 하기"
        />
      </div>
    </Container>
  );
};

export default CreateCounseling;
