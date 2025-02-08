import SelectDate from '../components/SelectDate';
import { useEffect, useState } from 'react';
import { OnSubmit, SimpleLessonDay, SimplePermission, RoomInfo } from '../models/room.model';
import { LessonDaysList } from '../utils/LessonDaysList';
import { ParentPermission, StudentPermission } from '../utils/PermissionList';
import PermissionToggle from './PermissionToggle';

type EditProps = {
  currentRoom: RoomInfo | undefined;
  onSubmit: OnSubmit;
};

const RoomEditor = ({ currentRoom, onSubmit }: EditProps) => {
  useEffect(() => {
    if (currentRoom) {
      setInput(currentRoom);
    }
  }, [currentRoom]);

  const [input, setInput] = useState<RoomInfo>({
    roomName: '',
    studentName: '',
    subject: '',
    lessonDays: [] as SimpleLessonDay[],
    studentPermission: {
      lecture_file: true,
      homework: true,
      gradeStatistic: true,
      counselingLog: false,
      deposit: false,
    },
    parentPermission: {
      lecture_file: false,
      homework: false,
      gradeStatistic: false,
      counselingLog: true,
      deposit: true,
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
    if (id <= 2 || id >= 8) return;
    else if (id >= 5) {
      setInput((prev) => {
        const updatedPermission = { ...prev.parentPermission };
        if (updatedPermission[permissionType] !== undefined) {
          updatedPermission[permissionType] = !updatedPermission[permissionType];
        }
        return { ...prev, parentPermission: updatedPermission };
      });
    } else if (id >= 3) {
      setInput((prev) => {
        const updatedPermission = { ...prev.studentPermission };
        if (updatedPermission[permissionType] !== undefined) {
          updatedPermission[permissionType] = !updatedPermission[permissionType];
        }
        return { ...prev, studentPermission: updatedPermission };
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
          {ParentPermission.map((permission) => (
            <PermissionToggle
              key={permission.id}
              permission={permission}
              handleToggleCheck={handleToggleCheck}
              isChecked={input.parentPermission[permission.type as keyof SimplePermission]}
            />
          ))}
        </div>
        <div className="flex flex-col">
          <h1>학생 권한설정</h1>
          {StudentPermission.map((permission) => (
            <PermissionToggle
              key={permission.id}
              permission={permission}
              handleToggleCheck={handleToggleCheck}
              isChecked={input.studentPermission[permission.type as keyof SimplePermission]}
            />
          ))}
        </div>
      </div>
      <button onClick={() => onSubmit(input)} className="text-white bg-black">
        {currentRoom ? '완료' : '다음'}
      </button>
    </div>
  );
};
export default RoomEditor;
