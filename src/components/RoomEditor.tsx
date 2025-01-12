import SelectDate from '../components/SelectDate';
import { useEffect, useState } from 'react';
import { OnSubmit, Room, SimpleLessonDay, SimplePermission } from '../context/RoomContext';
import { LessonDaysList } from '../utils/LessonDaysList';
import { ParentPermissions, StudentPermissions } from '../utils/PermissionList';
import PermissionToggle from './PermissionToggle';

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
    lessonDays: [] as SimpleLessonDay[],
    parentPermissions: {
      lecture_file: false,
      homework: false,
      gradeStatistic: false,
      counselingLog: true,
      deposit: true,
    },
    studentPermissions: {
      lecture_file: true,
      homework: true,
      gradeStatistic: true,
      counselingLog: false,
      deposit: false,
    },
  });
  console.log(input);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.placeholder === '방이름') setInput((prev) => ({ ...prev, roomName: e.target.value }));
    if (e.target.placeholder === '학생이름') setInput((prev) => ({ ...prev, studentName: e.target.value }));
    if (e.target.placeholder === '과목명') setInput((prev) => ({ ...prev, subject: e.target.value }));
  };

  const handleDaysClick = (lessonDay: string) => {
    setInput((prev) => {
      const newDays = prev.lessonDays.some((d) => d.lessonDay === lessonDay)
        ? prev.lessonDays.filter((d) => d.lessonDay !== lessonDay)
        : [...prev.lessonDays, { lessonDay }];
      return { ...prev, lessonDays: newDays };
    });
  };

  const handleToggleCheck = (id: number, permissionType: keyof SimplePermission) => {
    if (id >= 3 && id <= 7) return;
    else if (id < 3) {
      setInput((prev) => {
        const updatedPermissions = { ...prev.parentPermissions };

        if (updatedPermissions[permissionType] !== undefined) {
          updatedPermissions[permissionType] = !updatedPermissions[permissionType];
        }

        return { ...prev, parentPermissions: updatedPermissions };
      });
    } else if (id > 7) {
      setInput((prev) => {
        const updatedPermissions = { ...prev.studentPermissions };

        if (updatedPermissions[permissionType] !== undefined) {
          updatedPermissions[permissionType] = !updatedPermissions[permissionType];
        }

        return { ...prev, studentPermissions: updatedPermissions };
      });
    }
  };

  return (
    <div className="flex flex-col gap-16">
      <input placeholder="방이름" onChange={handleInputChange} value={input.roomName} />
      <input placeholder="학생이름" onChange={handleInputChange} value={input.studentName} />
      <input placeholder="과목명" onChange={handleInputChange} value={input.subject} />
      <div className="flex gap-4 justify-center">
        {LessonDaysList.map((lessonDayItem) => (
          <SelectDate
            key={lessonDayItem.id}
            lessonDayItem={lessonDayItem}
            isClicked={input.lessonDays.find((day) => day.lessonDay === lessonDayItem.lessonDay) !== undefined}
            handleDaysClick={handleDaysClick}
          />
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1>학부모 권한설정</h1>
          {ParentPermissions.map((permission) => (
            <PermissionToggle
              key={permission.id}
              permission={permission}
              handleToggleCheck={handleToggleCheck}
              isChecked={input.parentPermissions[permission.type as keyof SimplePermission]}
            />
          ))}
        </div>
        <div className="flex flex-col">
          <h1>학생 권한설정</h1>
          {StudentPermissions.map((permission) => (
            <PermissionToggle
              key={permission.id}
              permission={permission}
              handleToggleCheck={handleToggleCheck}
              isChecked={input.studentPermissions[permission.type as keyof SimplePermission]}
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
            input.lessonDays,
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
