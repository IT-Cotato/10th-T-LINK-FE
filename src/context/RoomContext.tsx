import { createContext, ReactNode, useContext, useState, useRef } from 'react';

export type SimpleLessonDay = {
  lessonDay: string;
};

export type SimplePermission = {
  lecture_file: boolean;
  homework: boolean;
  gradeStatistic: boolean;
  counselingLog: boolean;
  deposit: boolean;
};

export type Room = {
  id: number;
  roomName: string;
  studentName: string;
  subject: string;
  lessonDays: SimpleLessonDay[];
  parentPermissions: SimplePermission;
  studentPermissions: SimplePermission;
};

export type OnSubmit = (
  id: number,
  roomName: string,
  studentName: string,
  subject: string,
  lessonDays: SimpleLessonDay[],
  parentPermissions: SimplePermission,
  studentPermissions: SimplePermission,
) => void;

type RoomContextType = {
  rooms: Room[];
  onCreate: OnSubmit;
  onUpdate: OnSubmit;
  onDelete: (id: number) => void;
};

const RoomContext = createContext<RoomContextType | undefined>(undefined);

export const useRoomContext = () => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error('context 오류 발생');
  }
  return context;
};

export const RoomProvider = ({ children }: { children: ReactNode }) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const idRef = useRef(0);

  const onCreate = (
    id: number,
    roomName: string,
    studentName: string,
    subject: string,
    lessonDays: SimpleLessonDay[],
    parentPermissions: SimplePermission,
    studentPermissions: SimplePermission,
  ) => {
    const newRoom: Room = {
      id: idRef.current++,
      roomName: roomName,
      studentName: studentName,
      subject: subject,
      lessonDays: lessonDays,
      parentPermissions: parentPermissions,
      studentPermissions: studentPermissions,
    };
    setRooms([...rooms, newRoom]);
  };

  const onUpdate = (
    id: number,
    roomName: string,
    studentName: string,
    subject: string,
    lessonDays: SimpleLessonDay[],
    parentPermissions: SimplePermission,
    studentPermissions: SimplePermission,
  ) => {
    const updatedRoom: Room = {
      id: id,
      roomName: roomName,
      studentName: studentName,
      subject: subject,
      lessonDays: lessonDays,
      parentPermissions: parentPermissions,
      studentPermissions: studentPermissions,
    };
    setRooms(rooms.map((room) => (room.id === id ? updatedRoom : room)));
  };

  const onDelete = (id: number) => {
    setRooms(rooms.filter((room) => room.id !== id));
  };

  return <RoomContext.Provider value={{ rooms, onCreate, onUpdate, onDelete }}>{children}</RoomContext.Provider>;
};
