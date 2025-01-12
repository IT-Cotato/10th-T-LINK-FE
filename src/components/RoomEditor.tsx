import PermissionToggle from '../components/PermissionToggle';
import SelectDate from '../components/SelectDate';
import { useEffect, useState } from 'react';
import { OnSubmit, Room } from '../context/RoomContext';
import { WeekList } from '../utils/WeekList';
import { ParentPermissions, StudentPermissions } from '../utils/PermissionList';

type EditProps = {
  currentRoom: Room | undefined;
  onSubmit: OnSubmit;
};

const RoomEditor = ({ currentRoom, onSubmit }: EditProps) => {
  useEffect(() => {
    if (currentRoom) {
      setInput(currentRoom);
    }
  }, [currentRoom]);

  const [input, setInput] = useState({
    roomName: '',
    studentName: '',
    subject: '',
    days: [''],
    parentPermissions: ['counseling', 'payment'],
    studentPermissions: ['materials', 'homework', 'stats'],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.placeholder === '방이름') setInput((prev) => ({ ...prev, roomName: e.target.value }));
    if (e.target.placeholder === '학생이름') setInput((prev) => ({ ...prev, studentName: e.target.value }));
    if (e.target.placeholder === '과목명') setInput((prev) => ({ ...prev, subject: e.target.value }));
  };

  const handleToggleCheck = (id: number, permission: string) => {
    if (id >= 3 && id <= 7) return;
    else if (id < 5)
      setInput((prev) => {
        const newPermissions = prev.parentPermissions.includes(permission)
          ? prev.parentPermissions.filter((p) => p !== permission)
          : [...prev.parentPermissions, permission];
        return {
          ...prev,
          parentPermissions: newPermissions.sort(
            (a, b) =>
              ParentPermissions.find((permission) => permission.type === a)?.id! -
              ParentPermissions.find((permission) => permission.type === b)?.id!,
          ),
        };
      });
    else if (id >= 5)
      setInput((prev) => {
        const newPermissions = prev.studentPermissions.includes(permission)
          ? prev.studentPermissions.filter((p) => p !== permission)
          : [...prev.studentPermissions, permission];
        return {
          ...prev,
          studentPermissions: newPermissions.sort(
            (a, b) =>
              StudentPermissions.find((permission) => permission.type === a)?.id! -
              StudentPermissions.find((permission) => permission.type === b)?.id!,
          ),
        };
      });
  };

  const handleWeekClick = (day: string) => {
    setInput((prev) => {
      const newDays = prev.days.includes(day) ? prev.days.filter((d) => d !== day) : [...prev.days, day];
      const sortedDays = newDays.sort(
        (a, b) => WeekList.find((week) => week.date === a)?.id! - WeekList.find((week) => week.date === b)?.id!,
      );

      return { ...prev, days: sortedDays };
    });
  };

  return (
    <div className="flex flex-col gap-16">
      <input placeholder="방이름" onChange={handleInputChange} value={input.roomName} />
      <input placeholder="학생이름" onChange={handleInputChange} value={input.studentName} />
      <input placeholder="과목명" onChange={handleInputChange} value={input.subject} />
      <div className="flex gap-4 justify-center">
        {WeekList.map((week) => (
          <SelectDate
            key={week.id}
            week={week}
            isClicked={input.days.includes(week.date)}
            handleWeekClick={handleWeekClick}
          />
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1>학부모 권한설정</h1>
          {ParentPermissions.map((permission) => (
            <PermissionToggle
              key={permission.id}
              isChecked={input.parentPermissions.includes(permission.type)}
              permission={permission}
              handleToggleCheck={handleToggleCheck}
            />
          ))}
        </div>
        <div className="flex flex-col">
          <h1>학생 권한설정</h1>
          {StudentPermissions.map((permission) => (
            <PermissionToggle
              key={permission.id}
              isChecked={input.studentPermissions.includes(permission.type)}
              permission={permission}
              handleToggleCheck={handleToggleCheck}
            />
          ))}
        </div>
      </div>
      <button
        onClick={() =>
          onSubmit(
            0,
            input.roomName,
            input.studentName,
            input.subject,
            input.days,
            input.parentPermissions,
            input.studentPermissions,
          )
        }
        className="text-white"
      >
        완료
      </button>
    </div>
  );
};
export default RoomEditor;
