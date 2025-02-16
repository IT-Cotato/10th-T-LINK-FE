interface ToggleProps {
  isChecked: boolean;
  setIsChecked: (value: boolean) => void;
}

const Toggle = ({ isChecked, setIsChecked }: ToggleProps) => {
  return (
    <div className="flex w-full justify-between font-normal text-base leading-7 mt-2 tracking-[-0.048px]">
      <h1 className={`${isChecked ? 'text-gray-900' : 'text-gray-500'}`}>입금일 알림</h1>
      <label
        className={`relative block w-10 h-6 bg-gray-100 rounded-full cursor-pointer transition ${isChecked ? 'bg-primary_700' : 'bg-gray-300'}
            before:content-[''] 
            before:absolute before:top-0.5 before:left-0.5 
            before:w-5 before:h-5 before:bg-white before:rounded-full before:transition 
            ${isChecked ? 'before:translate-x-4' : ''}`}
      >
        <input type="checkbox" checked={isChecked} className="hidden" onChange={() => setIsChecked(!isChecked)} />
      </label>
    </div>
  );
};

export default Toggle;
