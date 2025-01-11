import { Permission } from '../context/RoomContext';

type TypeProps = {
  type: Permission;
  handleCheck: (id: number) => void;
};

const PermissionToggle = ({ type, handleCheck }: TypeProps) => {
  return (
    <div className="flex">
      {type.title}
      <input
        id={`permission-${type.id}`}
        type="checkbox"
        checked={type.isChecked}
        className="hidden"
        onChange={() => handleCheck(type.id)}
      />
      <label
        htmlFor={`permission-${type.id}`}
        className={`relative block w-10 h-6 bg-gray-100 rounded-lg cursor-pointer transition ${type.isChecked ? 'bg-green-400' : 'bg-gray-200'}
          before:content-[''] 
          before:absolute before:top-0.5 before:left-0.5 
          before:w-5 before:h-5 before:bg-white before:rounded-full before:transition 
          ${type.isChecked ? 'before:translate-x-4' : ''}`}
      />
    </div>
  );
};

export default PermissionToggle;
