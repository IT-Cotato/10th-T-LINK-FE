import { useState } from 'react';
import { RiEmotionHappyLine } from 'react-icons/ri';
import { RiEmotionNormalLine } from 'react-icons/ri';
import { RiEmotionUnhappyLine } from 'react-icons/ri';
import { FaRegCheckCircle } from 'react-icons/fa';
import { FaRegTimesCircle } from 'react-icons/fa';
import { postCounselingLogs } from '../../api/counseling.api';
import { useNavigate, useParams } from 'react-router-dom';

const CreateCounseling = () => {
  const nav = useNavigate();
  const { roomId } = useParams<{ roomId: string }>();

  const formatDate = (date: Date) => `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
  const todayFormatted = formatDate(new Date());

  const [title, setTitle] = useState('');
  const [engagement, setEngagement] = useState<'upper' | 'middle' | 'lower'>('upper');
  const [homeworkSubmitted, setHomeworkSubmitted] = useState<boolean>();
  const [content, setContent] = useState<string>('');

  const isValidForm = () => {
    if (!title.trim()) return '제목을 입력해주세요!';
    if (!engagement) return '참여도를 선택해주세요!';
    if (!content.trim()) return '내용을 입력해주세요!';
    return '';
  };

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
      if (response.status == 200) {
        console.log('상담일지 업로드 성공');
        nav(-1);
      }
    } catch (error) {
      console.log('상담일지 업로드 실패');
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div>
        <input placeholder="상담 제목을 입력해주세요" onChange={(e) => setTitle(e.target.value)} value={title}></input>
        <p>{todayFormatted}</p>
      </div>
      <div className="flex border border-black mx-3 flex-col my-5 h-full">
        <div className="flex items-center gap-1">
          <p>참여도</p>
          <RiEmotionHappyLine
            onClick={() => {
              setEngagement('upper');
            }}
            className={`${engagement == 'upper' ? 'fill-primary_500' : ''}`}
          />
          <RiEmotionNormalLine
            onClick={() => {
              setEngagement('middle');
            }}
            className={`${engagement == 'middle' ? 'fill-primary_500' : ''}`}
          />
          <RiEmotionUnhappyLine
            onClick={() => {
              setEngagement('lower');
            }}
            className={`${engagement == 'lower' ? 'fill-primary_500' : ''}`}
          />
        </div>
        <div className="flex items-center gap-1">
          <p>과제 제출 여부</p>
          <FaRegCheckCircle
            onClick={() => {
              setHomeworkSubmitted(true);
            }}
            className={`${homeworkSubmitted ? 'fill-primary_500' : ''}`}
          />
          <FaRegTimesCircle
            onClick={() => {
              setHomeworkSubmitted(false);
            }}
            className={`${!homeworkSubmitted ? 'fill-primary_500' : ''}`}
          />
        </div>
        <textarea
          className="mx-3 resize-none h-full my-6 border border-gray-300"
          placeholder="상담내용"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        ></textarea>
      </div>
      <div className="flex justify-end">
        <button className="bg-primary_400 w-20" onClick={handleSubmit}>
          완료
        </button>
      </div>
    </div>
  );
};

export default CreateCounseling;
