import wow from '../../assets/images/wow.png';
import vector from '../../assets/images/vector_gray.png';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import student from '../../assets/images/student_girl.png';
import { useEffect, useState } from 'react';
import { getShareCode } from '../../api/roomList.api';
import Modal from '../Modal/Modal';
import ShareLinkModal from '../Modal/ShareLinkModal';
import { getUserInfo } from '../../api/mypage.api';

type Props = {
  isShareLink?: boolean;
  roleInfo: string;
};

const CalendarNolesson = ({ isShareLink, roleInfo }: Props) => {
  const navigation = useNavigate();
  const { roomId } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [link, setLink] = useState('');

  const handleOnClick = async () => {
    if (isShareLink) {
      getUserInfo().then((userRes) => {
        getShareCode(Number(roomId)).then((codeRes) => {
          const shareCode = codeRes.shareCode;
          setLink(
            `${userRes.username} 선생님이 참여 코드를 보내셨어요!
아래 링크로 들어가서 참여 코드를 입력해주세요.
https://t-link.site/user/roomlist/invite/${roomId}
참여 코드: ${shareCode}`,
          );
        });
      });
      setModalOpen(true);
    } else if (roleInfo === 'TEACHER') {
      navigation('/user/roomlist');
    }
  };

  return (
    <div
      className="flex p-4 bg-gray-50 rounded-xl items-center justify-between cursor-pointer"
      onClick={handleOnClick}
    >
      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <ShareLinkModal setModalOpen={setModalOpen} shareLink={link} nav={false} />
        </Modal>
      )}
      <div className="flex items-center gap-3">
        <div className="p-1.5 rounded-full bg-white">
          {isShareLink ? (
            <img src={student} className="w-7 h-7" />
          ) : (
            <img src={wow} className="w-7 h-7" />
          )}
        </div>
        <div>
          <img src={vector} className="w-1 h-6" />
        </div>
        <div>
          {isShareLink ? (
            <>
              <div className="text-gray-900 text-base font-semibold leading-7">학생 초대하기</div>
              <div className="text-sm leading-6 text-gray-800 tracking-[-0.042px]">
                초대 링크를 복사해 공유하세요!
              </div>
            </>
          ) : (
            <>
              <div className="text-gray-900 text-base font-semibold leading-7">
                오늘은 일정이 없어요!
              </div>
              {roleInfo === 'TEACHER' && (
                <div className="text-sm leading-6 tracking-[-0.042px]">
                  과외방에서 일정을 추가할 수 있어요
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {roleInfo === 'TEACHER' && <MdKeyboardArrowRight size={24} />}
    </div>
  );
};

export default CalendarNolesson;
