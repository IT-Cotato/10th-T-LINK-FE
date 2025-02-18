interface AccessFailProps {
  setModalOpen: (value: boolean) => void;
  text?: string;
}

const AccessFail = ({ setModalOpen, text }: AccessFailProps) => {
  return (
    <div className="w-[320px] p-4 flex flex-col rounded-2xl items-center justify-center gap-8 bg-white">
      <p className="text-[18px] font-semibold">{text ? text : '접근할 수 없는 파일입니다.'}</p>
      <div className="flex w-full text-[16px] font-semibold">
        <button
          className="flex-1 py-[14px] bg-primary_700 text-white rounded-[4px] box-border text-center"
          onClick={() => setModalOpen(false)}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default AccessFail;
