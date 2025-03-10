import { SimplePermission, Permission } from '../../models/room.model';
import ToggleSwitch from './ToggleSwitch';

type ToggleProps = {
  permission: Permission;
  id: string;
  handleToggleCheck: (id: number, permissionType: keyof SimplePermission) => void;
  isChecked: boolean;
};

const PermissionToggle = ({ id, permission, handleToggleCheck, isChecked }: ToggleProps) => {
  return (
    <div className="flex w-full justify-between font-normal text-base leading-7">
      <h1 className={`${isChecked ? 'text-gray-900' : 'text-gray-500'}`}>{permission.title}</h1>
      <ToggleSwitch
        id={id}
        onChange={() => handleToggleCheck(permission.id, permission.type as keyof SimplePermission)}
        isChecked={isChecked}
      />
    </div>
  );
};

export default PermissionToggle;
