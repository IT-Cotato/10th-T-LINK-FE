import 과외방 from '/과외방.png';
import 캘린더 from '/캘린더.png';
import 내정보 from '/내 정보.png';

const NavBar = () => {
  return (
    <div className="border-t border-gray-300 flex">
      <div className="py-2 flex justify-around w-full">
        <div className="flex-col cursor-pointer">
          <img src={과외방} className="w-[42px] h-[42px]"></img>
          <p className="text-center">과외방</p>
        </div>
        <div className="flex-col cursor-pointer">
          <img src={캘린더} className="w-[42px] h-[42px]"></img>
          <p className="text-center">캘린더</p>
        </div>
        <div className="flex-col cursor-pointer">
          <img src={내정보} className="w-[42px] h-[42px]"></img>
          <p className="text-center">내 정보</p>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
