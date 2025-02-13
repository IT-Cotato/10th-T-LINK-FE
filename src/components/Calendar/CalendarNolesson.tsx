import wow from '../../assets/images/wow.png';
import vector from '../../assets/images/vector_gray.png';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import student from '../../assets/images/student_girl.png';
import { useState } from 'react';
import Toast from '../Toast';
import { getShareCode } from '../../api/roomList.api';

type Props = {
  isShareLink?: boolean;
};

const CalendarNolesson = ({ isShareLink }: Props) => {
  const navigation = useNavigate();
  const { roomId } = useParams();

  const [code, setCode] = useState('');
  const [toast, setToast] = useState(false);

  const fetchShareCode = async () => {
    try {
      const res = await getShareCode(Number(roomId));
      const shareCode = res.data.data.shareCode;
      setCode(`http://localhost:5173/user/roomlist/invite/${roomId}/${shareCode}`);
    } catch (e) {
      console.log(e);
    }
  };

  const handleOnClick = async () => {
    if (isShareLink) {
      fetchShareCode();

      try {
        console.log(code);
        await navigator.clipboard.writeText(code);
        setToast(true);
      } catch (e) {
        alert('초대 코드 복사에 실패했습니다.');
      }
    } else {
      navigation('/user/roomlist');
    }
  };

  return (
    <div className="flex p-4 bg-gray-50 rounded-xl items-center justify-between cursor-pointer" onClick={handleOnClick}>
      {toast && <Toast setToast={setToast} title="링크가 복사되었습니다." />}
      <div className="flex items-center gap-3">
        <div className="p-1.5 rounded-full bg-white">
          {isShareLink ? <img src={student} className="w-7 h-7" /> : <img src={wow} className="w-7 h-7" />}
        </div>
        <div>
          <img src={vector} className="w-1 h-6" />
        </div>
        <div>
          {isShareLink ? (
            <>
              <div className="text-gray-900 text-base font-semibold leading-7">학생 초대하기</div>
              <div className="text-sm leading-6 text-gray-800 tracking-[-0.042px]">초대 링크를 복사해 공유하세요!</div>
            </>
          ) : (
            <>
              <div className="text-gray-900 text-base font-semibold leading-7">오늘은 일정이 없어요!</div>
              <div className="text-sm leading-6 tracking-[-0.042px]">과외방에서 일정을 추가할 수 있어요</div>
            </>
          )}
        </div>
      </div>
      <MdKeyboardArrowRight size={24} />
    </div>
  );
};

export default CalendarNolesson;
