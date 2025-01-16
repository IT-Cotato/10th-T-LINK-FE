import { useNavigate } from 'react-router-dom';
import 강의자료함 from '/강의자료함.png';

interface DetailButtonProps {
  type: string;
  nextDepositDate?: string;
  isPermission: boolean;
}

const DetailButton = ({ type, nextDepositDate, isPermission }: DetailButtonProps) => {
  let title = '';
  let description = '';

  const nav = useNavigate();

  switch (type) {
    case 'materials':
      title = '강의 자료함';
      description = '강의 자료를 확인하세요';
      break;
    case 'homework':
      title = '주차별 숙제';
      description = '이번주 숙제를 확인하세요';
      break;
    case 'stats':
      title = '성적 통계';
      description = '성적을 확인하세요';
      break;
    case 'diary':
      title = '상담 일지';
      description = '상담 기록을 확인하세요';
      break;
    case 'payment':
      title = '입금';
      description = `다음 입금일은 ${nextDepositDate}입니다.`;
      break;
    case 'invite':
      title = '학생 초대하기';
      description = '초대링크를 공유해주세요';
      break;
  }

  const isVisible = type !== 'payment' && type !== 'invite';

  return (
    <div
      className={`p-4 rounded-[20px] flex-col items-start flex gap-6 cursor-pointer ${
        isPermission ? 'bg-slate-200 cursor-pointer' : 'bg-gray-300 opacity-50 cursor-not-allowed'
      }`}
      onClick={() => {
        if (isPermission) {
          nav(type);
        }
      }}
    >
      {isVisible && <img src={강의자료함} className="h-[80px] w-[80px]" alt="강의자료함" />}
      <div className="m-0">
        <h3 className="text-[18px] font-bold">{title}</h3>
        <p className="text-[13px]">{description}</p>
      </div>
    </div>
  );
};

export default DetailButton;
