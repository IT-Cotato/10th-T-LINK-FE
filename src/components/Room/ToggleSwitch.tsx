type ToggleProps = {
  id: string;
  onChange: () => void;
  isChecked: boolean;
};

const ToggleSwitch = ({ id, onChange, isChecked }: ToggleProps) => {
  return (
    <>
      <input id={id} type="checkbox" checked={isChecked} className="hidden" onChange={onChange} />
      <label
        htmlFor={id}
        className={`relative block w-10 h-6 bg-gray-100 rounded-full cursor-pointer transition ${isChecked ? 'bg-primary_700' : 'bg-gray-300'}
          before:content-[''] 
          before:absolute before:top-0.5 before:left-0.5 
          before:w-5 before:h-5 before:bg-white before:rounded-full before:transition 
          ${isChecked ? 'before:translate-x-4' : ''}`}
      />
    </>
  );
};

export default ToggleSwitch;
