export interface LessonDay {
  id: number;
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
  lecture_file: boolean;
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
  studentPermissions: SimplePermission;
  parentPermissions: SimplePermission;
  nextDepositDate: string;
}

export interface SimpleRoomInfo {
  roomId: number;
  roomName: string;
  studentName: string;
  subject: string;
  lessonDays: SimpleLessonDay[];
  student: {
    studentId: number;
    gender: string;
    backgroundColor: string;
  };
}

export interface Room {
  roomId: number;
  roomName: string;
  studentName: string;
  subject: string;
  lessonDays: SimpleLessonDay[];
  studentPermissions: SimplePermission;
  parentPermissions: SimplePermission;
}

export type OnSubmit = (room: RoomInfo) => void;

export interface RoomDetails {
  roomId: number;
  roomName: string;
  studentName: string;
  subject: string;
  lessonDays: SimpleLessonDay[];
  nextDepositDate: string;
  permission: SimplePermission;
}
