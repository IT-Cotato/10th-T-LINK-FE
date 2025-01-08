import PermissionToggle from '../components/PermissionToggle';
import SelectDate from '../components/SelectDate';
import { useState } from 'react';

export type Day = {
  id: number;
  date: string;
  isClicked: boolean;
};

export type Permission = {
  id: number;
  type: string;
  title: string;
  isChecked: boolean;
};

const CreateRoom = () => {
  const [roomName, setRoomName] = useState('');
  const [subject, setSubject] = useState('');
  const [dayList, setDayList] = useState<Day[]>([
    { id: 0, date: '월', isClicked: false },
    { id: 1, date: '화', isClicked: false },
    { id: 2, date: '수', isClicked: false },
    { id: 3, date: '목', isClicked: false },
    { id: 4, date: '금', isClicked: false },
    { id: 5, date: '토', isClicked: false },
    { id: 6, date: '일', isClicked: false },
  ]);
  const [permission, setPermission] = useState<Permission[]>([
    { id: 0, type: 'materials', title: '강의 자료함', isChecked: false },
    { id: 1, type: 'homework', title: '주차별 숙제', isChecked: false },
    { id: 2, type: 'stats', title: '성적 통계', isChecked: false },
    { id: 3, type: 'counseling', title: '상담 일지', isChecked: false },
    { id: 4, type: 'payment', title: '입금', isChecked: false },
  ]);

  const handleClick = (id: number) => {
    setDayList(dayList.map((day) => (id === day.id ? { ...day, isClicked: !day.isClicked } : day)));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.placeholder === '방이름') setRoomName(e.target.value);
    if (e.target.placeholder === '과목명') setSubject(e.target.value);
  };

  const handleCheck = (id: number) => {
    setPermission(permission.map((type) => (id === type.id ? { ...type, isChecked: !type.isChecked } : type)));
  };
  console.log(permission);

  return (
    <div className="flex flex-col gap-16">
      <input placeholder="방이름" onChange={handleChange} value={roomName} />
      <input placeholder="과목명" onChange={handleChange} value={subject} />
      <div className="flex gap-4 justify-center">
        {dayList.map((day) => (
          <SelectDate key={day.id} day={day} handleClick={handleClick} />
        ))}
      </div>
      <div className="flex flex-col">
        <h1>권한설정</h1>
        {permission.map((type) => (
          <PermissionToggle key={type.id} type={type} handleCheck={handleCheck} />
        ))}
      </div>
      <button className="text-white">다음</button>
    </div>
  );
};

export default CreateRoom;
