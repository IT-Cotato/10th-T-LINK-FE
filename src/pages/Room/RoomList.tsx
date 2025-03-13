import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import RoomInfo from '../../components/Room/RoomInfo';
import { useEffect, useState } from 'react';
import { getRoomList } from '../../api/roomList.api';
import { SimpleRoomInfo } from '../../models/room.model';
import SubjectTag from '../../components/Room/SubjectTag';
import Button from '../../components/RoomDetail/Button';
import Toast from '../../components/Modal/Toast';
import Search from '../../components/Room/Search';

const RoomList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [rooms, setRooms] = useState<SimpleRoomInfo[]>();
  const [filteredRooms, setFilteredRooms] = useState<SimpleRoomInfo[]>();
  const [roleInfo, setRoleInfo] = useState('');
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([{ id: 0, title: '전체', isClicked: true }]);
  const [toast, setToast] = useState(location.state?.toast || false);
  const [willUpdate, setWillUpdate] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem('roleInfo');
    if (role) setRoleInfo(role);

    const fetchRooms = async () => {
      try {
        const res = await getRoomList();
        const roomData = res.data.data.rooms;
        setRooms(roomData);
        setFilteredRooms(roomData);
      } catch (e) {
        console.log(e);
      }
    };

    fetchRooms();

    if (willUpdate) {
      fetchRooms();
      setWillUpdate(false);
    }
  }, [willUpdate]);

  useEffect(() => {
    const subjectList = Array.from(new Set(rooms?.map((item) => item.subject)));
    const newTags = subjectList.map((subject, index) => ({
      id: index + 1,
      title: subject,
      isClicked: false,
    }));

    setTags((prevTags) => {
      const allTags = [...prevTags, ...newTags];
      const uniqueTags = Array.from(new Set(allTags.map((tag) => tag.title))).map(
        (title, index) => ({
          id: index,
          title,
          isClicked: title === '전체',
        }),
      );
      return uniqueTags;
    });
  }, [rooms]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    const filtered = rooms?.filter(
      (room) =>
        room.roomName.includes(value) ||
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
      const filtered = rooms?.filter((room) => room.subject === title);
      setFilteredRooms(filtered);
    }
  };

  return (
    <div className="flex flex-col">
      <Search value={search} onChangeSearch={onChangeSearch} />

      <div className="flex p-4 pt-2 gap-2 border-b-2 border-gray-100">
        {tags.map((tag) => (
          <SubjectTag key={tag.id} tag={tag} onClick={onClickTag} />
        ))}
      </div>

      {filteredRooms?.map((room) => (
        <RoomInfo key={room.roomId} roleInfo={roleInfo} room={room} setWillUpdate={setWillUpdate} />
      ))}

      <div className="flex justify-end py-8">
        {roleInfo === 'TEACHER' && (
          <Button text="과외방 개설" onClick={() => navigate('/user/createroom')} />
        )}
      </div>

      {toast && <Toast setToast={setToast} title="과외방 삭제가 완료되었습니다." />}
      <Outlet />
    </div>
  );
};

export default RoomList;
