import PermissionToggle from '../components/PermissionToggle';
import SelectDate from '../components/SelectDate';
import { useEffect, useState } from 'react';
import { useRoomContext } from '../context/RoomContext';
import { Day, Permission } from '../context/RoomContext';

const CreateRoom = () => {
  const { onCreate, rooms } = useRoomContext();
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
  const [days, setDays] = useState<string[]>([]);

  const [parentP, setparentP] = useState<Permission[]>([
    { id: 0, type: 'materials', title: '강의 자료함', isChecked: false },
    { id: 1, type: 'homework', title: '주차별 숙제', isChecked: false },
    { id: 2, type: 'stats', title: '성적 통계', isChecked: false },
    { id: 3, type: 'counseling', title: '상담 일지', isChecked: false },
    { id: 4, type: 'payment', title: '입금', isChecked: false },
  ]);
  const [studentP, setstudentP] = useState<Permission[]>([
    { id: 5, type: 'materials', title: '강의 자료함', isChecked: false },
    { id: 6, type: 'homework', title: '주차별 숙제', isChecked: false },
    { id: 7, type: 'stats', title: '성적 통계', isChecked: false },
    { id: 8, type: 'counseling', title: '상담 일지', isChecked: false },
    { id: 9, type: 'payment', title: '입금', isChecked: false },
  ]);

  const handleClick = (id: number) => {
    setDayList(dayList.map((day) => (id === day.id ? { ...day, isClicked: !day.isClicked } : day)));
  };

  useEffect(() => {
    const selectedDays = dayList.filter((day) => day.isClicked).map((day) => day.date);
    setDays(selectedDays);
  }, [dayList]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.placeholder === '방이름') setRoomName(e.target.value);
    if (e.target.placeholder === '과목명') setSubject(e.target.value);
  };

  const handleCheck = (id: number) => {
    if (id < 5) setparentP(parentP.map((type) => (id === type.id ? { ...type, isChecked: !type.isChecked } : type)));
    if (id >= 5) setstudentP(studentP.map((type) => (id === type.id ? { ...type, isChecked: !type.isChecked } : type)));
  };

  const handleCreate = (
    roomName: string,
    subject: string,
    days: string[],
    pMaterials: boolean,
    pHomework: boolean,
    pStats: boolean,
    pCounseling: boolean,
    pPayment: boolean,
    sMaterials: boolean,
    sHomework: boolean,
    sStats: boolean,
    sCounseling: boolean,
    sPayment: boolean,
  ) => {
    onCreate(
      roomName,
      subject,
      days,
      parentP[0].isChecked,
      parentP[1].isChecked,
      parentP[2].isChecked,
      parentP[3].isChecked,
      parentP[4].isChecked,
      studentP[0].isChecked,
      studentP[1].isChecked,
      studentP[2].isChecked,
      studentP[3].isChecked,
      studentP[4].isChecked,
    );
  };
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
        <h1>학생 권한설정</h1>
        {studentP.map((type) => (
          <PermissionToggle key={type.id} type={type} handleCheck={handleCheck} />
        ))}
      </div>
      <div className="flex flex-col">
        <h1>학부모 권한설정</h1>
        {parentP.map((type) => (
          <PermissionToggle key={type.id} type={type} handleCheck={handleCheck} />
        ))}
      </div>
      <button
        onClick={() =>
          handleCreate(
            roomName,
            subject,
            days,
            parentP[0].isChecked,
            parentP[1].isChecked,
            parentP[2].isChecked,
            parentP[3].isChecked,
            parentP[4].isChecked,
            studentP[0].isChecked,
            studentP[1].isChecked,
            studentP[2].isChecked,
            studentP[3].isChecked,
            studentP[4].isChecked,
          )
        }
        className="text-white"
      >
        다음
      </button>
    </div>
  );
};

export default CreateRoom;
