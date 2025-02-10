export interface LessonDay {
  lessonDayId: number;
  lessonDay: string;
}

export interface SimpleLessonDay {
  lessonDay: string;
}

export interface Permission {
  id: number;
  type: string;
  title: string;
}

export interface SimplePermission {
  lectureFile: boolean;
  homework: boolean;
  gradeStatistic: boolean;
  counselingLog: boolean;
  deposit: boolean;
}

export interface RoomInfo {
  roomName: string;
  studentName: string;
  subject: string;
  lessonDays: SimpleLessonDay[];
  studentPermission: SimplePermission;
  parentPermission: SimplePermission;
}

export interface Opponent {
  id: number;
  name: string;
  gender: string;
}

export interface SimpleRoomInfo {
  roomId: number;
  roomName: string;
  subject: string;
  lessonDays: SimpleLessonDay[];
  opponent: Opponent | null;
}

export interface Room {
  roomId: number;
  roomName: string;
  studentName: string;
  subject: string;
  lessonDays: SimpleLessonDay[];
  studentPermission: SimplePermission;
  parentPermission: SimplePermission;
}

export type OnSubmit = (room: Room) => void;

export interface RoomDetails {
  roomId: number;
  roomName: string;
  studentName: string;
  subject: string;
  lessonDays: SimpleLessonDay[];
  nextDepositDate: string;
  permission: SimplePermission;
}
