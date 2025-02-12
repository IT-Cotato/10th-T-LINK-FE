import { useState } from 'react';
import { RiEmotionHappyLine } from 'react-icons/ri';
import { RiEmotionNormalLine } from 'react-icons/ri';
import { RiEmotionUnhappyLine } from 'react-icons/ri';
import { FaRegCheckCircle } from 'react-icons/fa';
import { FaRegTimesCircle } from 'react-icons/fa';
import { patchCounselingLog, postCounselingLogs } from '../../api/counseling.api';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import PickDate from '../../components/Room/PickDate';
import Input from '../../components/Room/Input';
import ChooseButton from '../../components/Room/ChooseButton';
import TextArea from '../../components/Room/TextArea';
import LongButton from '../../components/LongButton';

const CreateCounseling = () => {
  const nav = useNavigate();
  const { roomId } = useParams<{ roomId: string }>();
  const [deadline, setDeadline] = useState<string>(''); // 상담일지 작성 날짜

  const location = useLocation();
  const isEdit = new URLSearchParams(location.search).get('isEdit') === 'true';
  const initialData = location.state?.counselingDetail;

  const formatDate = (date: Date) => `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
  const todayFormatted = formatDate(new Date());

  const [title, setTitle] = useState<string>(isEdit ? initialData.title : '');
  const [content, setContent] = useState<string>(isEdit ? initialData.content : '');
  const [engagement, setEngagement] = useState<string>(isEdit ? initialData.engagement : '');
  const [homeworkSubmitted, setHomeworkSubmitted] = useState<boolean | null>(
    isEdit ? initialData.homeworkSubmitted : null,
  );

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
      if (isEdit) {
        const response = await patchCounselingLog(roomId!, initialData.counselingLogId, payload);
        if (response.status == 200) {
          console.log('상담일지 수정 성공');
          nav(`/user/roomlist/${roomId}/diary/${initialData.counselingLogId}`);
        }
      } else {
        const response = await postCounselingLogs(roomId!, payload);
        if (response.status == 201) {
          console.log('상담일지 업로드 성공');
          nav(`/user/roomlist/${roomId}/diary`);
        }
      }
    } catch (error) {
      console.log(isEdit ? '수정 실패' : '생성 실패', error);
    }
  };

  return (
    <div className="px-4 flex flex-col h-full">
      {/* 설명 */}
      <div className="py-4">
        <p className="text-heading6 font-bold leading-10 text-gray-900">상담 정보를 입력하세요.</p>
        <p className="text-body3 font-normal leading-7 tracking-[-0.048px] text-gray-600">언제든지 수정할 수 있어요!</p>
      </div>
      <div className="flex flex-col gap-6">
        {/* 날짜 고르기 */}
        <PickDate deadline={deadline} setDeadline={setDeadline} isAble={true} text="업로드 날짜를 선택해주세요." />
        <Input setDesc={setTitle} desc={title} name="제목" placeholder="상담일지명을 입력해주세요" isAble={true} />
        <ChooseButton text="학생 참여도" type="engage" setEngagement={setEngagement} engagement={engagement} />
        <ChooseButton
          text="학생 과제 제출 여부"
          type="homework"
          homeworkSubmitted={homeworkSubmitted}
          setHomeworkSubmitted={setHomeworkSubmitted}
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
