import { createContext, ReactNode, useContext, useState, useRef } from 'react';

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

export type Room = {
  id: number;
  roomName: string;
  subject: string;
  days: string[];
  pMaterials: boolean;
  pHomework: boolean;
  pStats: boolean;
  pCounseling: true;
  pPayment: true;
  sMaterials: true;
  sHomework: true;
  sStats: true;
  sCounseling: boolean;
  sPayment: boolean;
};

type RoomContextType = {
  rooms: Room[];
  onCreate: (
    roomName: string,
    subject: string,
    days: string[],
    pMaterials: boolean,
    pHomework: boolean,
    pStats: boolean,
    sCounseling: boolean,
    sPayment: boolean,
  ) => void;
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
    roomName: string,
    subject: string,
    days: string[],
    pMaterials: boolean,
    pHomework: boolean,
    pStats: boolean,
    sCounseling: boolean,
    sPayment: boolean,
  ) => {
    const newRoom: Room = {
      id: idRef.current++,
      roomName: roomName,
      subject: subject,
      days: days,
      pMaterials: pMaterials,
      pHomework: pHomework,
      pStats: pStats,
      pCounseling: true,
      pPayment: true,
      sMaterials: true,
      sHomework: true,
      sStats: true,
      sCounseling: sCounseling,
      sPayment: sPayment,
    };
    setRooms([...rooms, newRoom]);
  };

  const onDelete = (id: number) => {
    setRooms(rooms.filter((room) => room.id !== id));
  };

  return <RoomContext.Provider value={{ rooms, onCreate, onDelete }}>{children}</RoomContext.Provider>;
};
