import { SimplePermission, Permission } from '../models/room.model';

type ToggleProps = {
  permission: Permission;
  handleToggleCheck: (id: number, permissionType: keyof SimplePermission) => void;
  isChecked: boolean;
};

const PermissionToggle = ({ permission, handleToggleCheck, isChecked }: ToggleProps) => {
  return (
    <div className="flex w-full justify-between font-normal text-base leading-7">
      <h1 className={`${isChecked ? 'text-gray-900' : 'text-gray-500'}`}>{permission.title}</h1>
      <input
        id={`permission-${permission.id}`}
        type="checkbox"
        checked={isChecked}
        className="hidden"
        onChange={() => handleToggleCheck(permission.id, permission.type as keyof SimplePermission)}
      />
      <label
        htmlFor={`permission-${permission.id}`}
        className={`relative block w-10 h-6 bg-gray-100 rounded-full cursor-pointer transition ${isChecked ? 'bg-primary_700' : 'bg-gray-300'}
          before:content-[''] 
          before:absolute before:top-0.5 before:left-0.5 
          before:w-5 before:h-5 before:bg-white before:rounded-full before:transition 
          ${isChecked ? 'before:translate-x-4' : ''}`}
      />
    </div>
  );
};

export default PermissionToggle;
