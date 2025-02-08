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
    if (e.target.placeholder.includes('방')) setInput((prev) => ({ ...prev, roomName: e.target.value }));
    if (e.target.placeholder.includes('학생')) setInput((prev) => ({ ...prev, studentName: e.target.value }));
    if (e.target.placeholder.includes('과목명')) setInput((prev) => ({ ...prev, subject: e.target.value }));
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
    <div className="flex flex-col p-4 gap-6">
      <div className="flex-col gap-1.5">
        <h4 className="text-sm leading-6 font-medium">방 이름</h4>
        <input
          className="px-3 py-2 border-2 border-gray-300 rounded-md w-full"
          placeholder="방이름을 입력해주세요"
          onChange={handleInputChange}
          value={input.roomName}
        />
      </div>

      <div className="flex-col gap-1.5">
        <h4 className="text-sm leading-6 font-medium">학생 이름</h4>
        <input
          className="px-3 py-2 border-2 border-gray-300 rounded-md w-full"
          placeholder="학생 이름을 입력해주세요"
          onChange={handleInputChange}
          value={input.studentName}
        />
      </div>

      <div className="flex-col gap-1.5">
        <h4 className="text-sm leading-6 font-medium">과목명</h4>
        <input
          className="px-3 py-2 border-2 border-gray-300 rounded-md w-full"
          placeholder="과목명을 입력해주세요"
          onChange={handleInputChange}
          value={input.subject}
        />
      </div>

      <div>
        <h4 className="text-sm leading-6 font-medium">수업 요일</h4>
        <div className="flex flex-wrap gap-2">
          {LessonDaysList.map((lessonDayItem) => (
            <SelectDate
              key={lessonDayItem.id}
              lessonDayItem={lessonDayItem}
              isClicked={input.lessonDays.find((day) => day.lessonDay === lessonDayItem.lessonDay) !== undefined}
              handleDaysClick={handleDaysClick}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col py-4 gap-4">
        <div>
          <h1 className="text-xl font-bold leading-9">학부모 권한설정</h1>
          <h2 className="text-alert font-normal leading-7">*학부모: [상담 일지, 입금] 필수 접근</h2>
        </div>

        {ParentPermission.map((permission) => (
          <PermissionToggle
            key={permission.id}
            permission={permission}
            handleToggleCheck={handleToggleCheck}
            isChecked={input.parentPermission[permission.type as keyof SimplePermission]}
          />
        ))}
      </div>

      <div className="flex flex-col py-4 gap-4">
        <div>
          <h1 className="text-xl font-bold leading-9">학생 권한설정</h1>
          <h2 className="text-alert font-normal leading-7">*학생: [강의자료함, 주차별 숙제, 성적 통계] 필수 접근</h2>
        </div>
        {StudentPermission.map((permission) => (
          <PermissionToggle
            key={permission.id}
            permission={permission}
            handleToggleCheck={handleToggleCheck}
            isChecked={input.studentPermission[permission.type as keyof SimplePermission]}
          />
        ))}
      </div>
      <div className="py-6 w-full">
        <button onClick={() => onSubmit(input)}>{currentRoom ? '수정 완료' : '생성하기'}</button>
      </div>
    </div>
  );
};
export default RoomEditor;
