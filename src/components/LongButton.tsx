interface LongButtonProps {
  enable: boolean;
  onClick: () => void;
  text: string;
}

const LongButton = ({ enable, onClick, text }: LongButtonProps) => {
  return (
    <button
      disabled={!enable}
      className="w-full px-4 py-3.5 text-gray-500 bg-gray-100 enabled:text-white enabled:bg-primary_700 font-semibold rounded-[4px]"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default LongButton;
