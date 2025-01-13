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
}

export interface SimpleRoomInfo {
  roomId: number;
  roomName: string;
  studentName: string;
  subject: string;
  student: {
    profileImgUrl: string; // 이부분 아직 확실 x
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
