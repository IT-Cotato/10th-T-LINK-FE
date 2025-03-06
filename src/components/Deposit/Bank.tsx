interface BankProps {
  bankUrl: string;
  bankName: string;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const Bank = ({ bankName, bankUrl, onClick }: BankProps) => {
  return (
    <div
      className="p-2 bg-gray-50 flex flex-col items-center justify-center rounded-2xl aspect-square"
      onClick={onClick}
    >
      <img src={bankUrl} className="p-[5px]"></img>
      <p className="text-body4 leading-[25px] tracking-[-0.042px] text-gray-900">{bankName}</p>
    </div>
  );
};

export default Bank;
