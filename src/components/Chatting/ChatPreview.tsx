import { motion, useAnimation } from 'framer-motion';
import { useState } from 'react';
import student_boy from '../../assets/images/student_boy.png';
import { MdLogout } from 'react-icons/md';
import { MdOutlineAlarmOff } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const ChatPreview = () => {
  const [showActions, setShowActions] = useState(false);
  const controls = useAnimation();
  const nav = useNavigate();
  const chatId = 1;

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x < -100) {
      setShowActions(true);
    } else {
      controls.start({ x: 0 });
      setShowActions(false);
    }
  };

  return (
    <div className="relative overflow-hidden" onClick={() => nav(`/user/chat/${chatId}`)}>
      {showActions && (
        <div className="absolute inset-0 bg-gray-100 flex items-center z-0 justify-end">
          <div className="bg-blue-400 h-full w-[80px] justify-center flex items-center">
            <MdOutlineAlarmOff size={28} fill="#ffffff" />
          </div>
          <div className="bg-red-400 h-full w-[80px] justify-center flex items-center">
            <MdLogout size={28} fill="#ffffff" />
          </div>
        </div>
      )}
      <motion.div
        drag="x"
        dragConstraints={{ left: -160, right: 0 }}
        onDragEnd={handleDragEnd}
        animate={controls}
        className="bg-white px-4 py-3 flex gap-4 items-center z-10 relative"
      >
        <div
          className="flex w-[60px] h-[60px] p-3 rounded-2xl cursor-pointer items-center justify-center"
          style={{ backgroundColor: '#E1F5D6' }}
        >
          <img className="h-9 max-w-9" src={student_boy} />
        </div>
        <div className="flex-1 flex flex-col">
          <h1 className="text-base font-semibold leading-7">홍길동 선생님</h1>
          <h3 className="font-medium text-gray-500 leading-[26px] text-body4">
            선생님, 숙제 다 못했어요
          </h3>
        </div>
      </motion.div>
    </div>
  );
};

export default ChatPreview;
