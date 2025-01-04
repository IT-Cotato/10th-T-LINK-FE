import 강의자료함 from '/강의자료함.png';

interface DetailButtonProps {
  type: string;
}

const DetailButton = ({ type }: DetailButtonProps) => {
  let title = '';
  let description = '';

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
    case 'counseling':
      title = '상담 일지';
      description = '상담 기록을 확인하세요';
      break;
    case 'payment':
      title = '입금';
      description = '다음 입금일은 2025.01.12입니다.';
      break;
  }

  return (
    <div className="bg-slate-200 p-4 rounded-[20px] flex-col items-start flex gap-6">
      {type !== 'payment' && <img src={강의자료함} className="h-[80px] w-[80px]"></img>}
      <div className="m-0">
        <h3 className="text-[18px] font-bold">{title}</h3>
        <p className="text-[13px]">{description}</p>
      </div>
    </div>
  );
};

export default DetailButton;
