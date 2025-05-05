import student_boy from '../../assets/images/student_boy.png';
import Menu from '../../assets/images/Chatting/Meatballs_Horizental menu.svg?react';

const ChatPreview = () => {
  return (
    <div className="px-4 flex gap-4 items-center py-3">
      {/* 프로필 사진 */}
      <div
        className="flex w-[60px] h-[60px] p-3 rounded-2xl cursor-pointer items-center justify-center"
        style={{ backgroundColor: '#E1F5D6' }}
      >
        <img className="h-9 max-w-9" src={student_boy} />
      </div>
      {/* 정보 */}
      <div className="flex-1 flex flex-col">
        <h1 className="text-base font-semibold leading-7">국어</h1>
        <h3 className="font-medium text-gray-500 leading-[26px] text-body4">
          선생님, 숙제 다 못했어요
        </h3>
        <div className="font-normal text-gray-500 leading-[25px] text-body4 flex gap-1">
          <p className="text-gray-950">홍길동</p>
          <p>선생님</p>
        </div>
      </div>
      <Menu />
    </div>
  );
};

export default ChatPreview;
