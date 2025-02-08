import { Outlet, useNavigate } from 'react-router-dom';
import RoomInfo from '../../components/RoomInfo';
import { useEffect, useState } from 'react';
import { getRoomList, deleteRoom } from '../../api/roomList.api';
import { SimpleRoomInfo } from '../../models/room.model';
import { IoSearch } from 'react-icons/io5';
import SubjectTag from '../../components/SubjectTag';
import Button from '../../components/Button';

const mockData: SimpleRoomInfo[] = [
  {
    roomId: 1,
    roomName: '방이름',
    studentName: '홍길동',
    subject: '수학',
    lessonDays: [{ lessonDay: '월요일' }, { lessonDay: '수요일' }],
    student: { studentId: 32, gender: '남성', backgroundColor: '#000957' },
  },
  {
    roomId: 2,
    roomName: '방이름2',
    studentName: '김영희',
    subject: '영어',
    lessonDays: [{ lessonDay: '금요일' }, { lessonDay: '토요일' }, { lessonDay: '일요일' }],
    student: { studentId: 45, gender: '여성', backgroundColor: '#ffffff' },
  },
];

const RoomList = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<SimpleRoomInfo[]>(mockData);
  const [filteredRooms, setFilteredRooms] = useState<SimpleRoomInfo[]>(mockData);
  const [roleInfo, setRoleInfo] = useState('');
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([{ id: 0, title: '전체', isClicked: true }]);

  const fetchRooms = async () => {
    // const rooms = await getRoomList();
    setRooms(mockData);
    setFilteredRooms(mockData);
  };

  useEffect(() => {
    const role = localStorage.getItem('roleInfo');
    setRoleInfo(role || 'TEACHER');

    fetchRooms();

    const subjectList = Array.from(new Set(mockData.map((item) => item.subject)));
    const newTags = subjectList.map((subject, index) => ({
      id: index + 1,
      title: subject,
      isClicked: false,
    }));

    setTags((prevTags) => {
      const allTags = [...prevTags, ...newTags];
      const uniqueTags = Array.from(new Set(allTags.map((tag) => tag.title))).map((title, index) => ({
        id: index,
        title,
        isClicked: title === '전체',
      }));
      return uniqueTags;
    });
    console.log(tags);
  }, []);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    const filtered = rooms.filter(
      (room) =>
        room.roomName.includes(value) ||
        room.studentName.includes(value) ||
        room.subject.includes(value) ||
        room.lessonDays.find((day) => day.lessonDay.includes(value)),
    );

    setFilteredRooms(filtered);
  };

  const onClickTag = (id: number, title: string) => {
    setTags((prevTags) =>
      prevTags.map((tag) => ({
        ...tag,
        isClicked: tag.id === id,
      })),
    );

    if (title === '전체') {
      setFilteredRooms(rooms);
    } else {
      const filtered = rooms.filter((room) => room.subject === title);
      setFilteredRooms(filtered);
    }
  };

  return (
    <div className="flex flex-col">
      {/* 검색 */}
      <div className="p-4 flex w-full">
        <div className="flex w-full p-2 gap-2 items-center bg-gray-100 rounded-lg">
          <input
            className="flex-1 bg-gray-100 font-normal leading-7"
            placeholder="이름 또는 키워드 검색"
            onChange={onChangeSearch}
            value={search}
          />
          <IoSearch size={24} color="#6A6966" />
        </div>
      </div>

      {/* 과목 태그 */}
      <div className="flex p-4 pt-2 gap-2 border-b-2 border-gray-100">
        {tags.map((tag) => (
          <SubjectTag key={tag.id} tag={tag} onClick={onClickTag} />
        ))}
      </div>

      {/* 리스트 */}
      <div>
        {filteredRooms.map((room) => (
          <RoomInfo key={room.roomId} roleInfo={roleInfo} room={room} />
        ))}
      </div>

      {/* 과외방 개설 */}
      <div className="flex justify-end py-8">
        {roleInfo === 'TEACHER' && <Button text="과외방 개설" onClick={() => navigate('/user/createroom')} />}
      </div>
      <Outlet />
    </div>
  );
};

export default RoomList;
