import { Permission } from '../utils/PermissionList';

type TypeProps = {
  permission: Permission;
  isChecked: boolean;
  handleToggleCheck: (id: number, permission: string) => void;
};

const PermissionToggle = ({ permission, handleToggleCheck, isChecked }: TypeProps) => {
  return (
    <div className="flex">
      {permission.title}
      <input
        id={`permission-${permission.id}`}
        type="checkbox"
        checked={isChecked}
        className="hidden"
        onChange={() => handleToggleCheck(permission.id, permission.type)}
      />
      <label
        htmlFor={`permission-${permission.id}`}
        className={`relative block w-10 h-6 bg-gray-100 rounded-lg cursor-pointer transition ${isChecked ? 'bg-green-400' : 'bg-gray-200'}
          before:content-[''] 
          before:absolute before:top-0.5 before:left-0.5 
          before:w-5 before:h-5 before:bg-white before:rounded-full before:transition 
          ${isChecked ? 'before:translate-x-4' : ''}`}
      />
    </div>
  );
};

export default PermissionToggle;
