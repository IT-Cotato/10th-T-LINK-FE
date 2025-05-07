import { GoArrowLeft } from 'react-icons/go';
import MenuIcon from '../../assets/images/Chatting/Meatballs_Horizental menu.svg?react';

const ChatHeader = () => {
  return (
    <div className="absolute top-0 max-w-[500px] w-full flex py-2 px-[6px] justify-around items-center border-b-2 border-gray-100">
      <GoArrowLeft size={24} className="m-[10px]" />
      <div className="flex items-center gap-2 flex-1 justify-center">
        <img
          src="https://mblogthumb-phinf.pstatic.net/MjAyMDAyMTBfODAg/MDAxNTgxMzA0MTE3ODMy.ACRLtB9v5NH-I2qjWrwiXLb7TeUiG442cJmcdzVum7cg.eTLpNg_n0rAS5sWOsofRrvBy0qZk_QcWSfUiIagTfd8g.JPEG.lattepain/1581304118739.jpg?type=w800"
          className="w-[30px] h-[30px] rounded-full"
        />
        <h3 className="text-gray-950 text-body2 font-semibold">홍길동</h3>
      </div>
      <MenuIcon className="mx-[10px]" />
    </div>
  );
};

export default ChatHeader;
