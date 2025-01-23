interface LogoutModal {
  onSelected: (value: string) => void;
}
const LogoutModal = ({ onSelected }: LogoutModal) => {
  const handleClick = (value: string) => {
    onSelected(value);
  };

  return (
    <div className="w-[320px] p-4 flex flex-col border border-gray-500 rounded-2xl items-center justify-center gap-8 bg-white">
      <p className="text-[18px] font-semibold">로그아웃 하시겠습니까?</p>
      <div className="flex w-full gap-3 text-[16px] font-semibold">
        <button
          className="flex-1 py-[14px] bg-primary_700 text-white rounded-[4px] box-border text-center"
          onClick={() => handleClick('logout')}
        >
          로그아웃
        </button>
        <button
          className="flex-1 py-[14px] bg-white text-black border border-gray-500 rounded-[4px] box-border text-center"
          onClick={() => handleClick('false')}
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default LogoutModal;
