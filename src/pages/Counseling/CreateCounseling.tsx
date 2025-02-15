import { useState } from 'react';
import { postCounselingLogs } from '../../api/counseling.api';
import { useNavigate, useParams } from 'react-router-dom';
import PickDate from '../../components/Room/PickDate';
import Input from '../../components/Room/Input';
import ChooseButton from '../../components/Room/ChooseButton';
import TextArea from '../../components/Room/TextArea';
import LongButton from '../../components/LongButton';

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
      title: title,
      content: content,
      engagement: engagement,
      homeworkSubmitted: homeworkSubmitted,
    };

    try {
      const response = await postCounselingLogs(roomId!, payload);
      if (response.status == 201) {
        console.log('상담일지 업로드 성공');
        nav(`/user/${roomId}/diary`);
      }
    } catch (error) {
      console.log('생성 실패', error);
    }
  };

  return (
    <div className="px-4 flex flex-col h-full">
      {/* 설명 */}
      <div className="py-4">
        <p className="text-heading6 font-bold leading-10 text-gray-900">상담 정보를 입력하세요.</p>
        <p className="text-body3 font-normal leading-7 tracking-[-0.048px] text-gray-600">언제든지 수정할 수 있어요!</p>
      </div>
      <div className="flex flex-col gap-6 pt-4">
        <div className="flex flex-col gap-[6px]">
          <div className="text-body4 leading-[26px] font-medium flex gap-1">
            <span className="text-gray-900">상담 날짜</span>
            <span className="text-primary_700">(필수)</span>
          </div>
          {/* 날짜 고르기 */}
          <PickDate deadline={deadline} setDeadline={setDeadline} isAble={true} text="날짜를 선택해주세요." />
        </div>
        <Input setDesc={setTitle} desc={title} name="제목" placeholder="상담일지명을 입력해주세요" isAble={true} />
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
    </div>
  );
};

export default CreateCounseling;
