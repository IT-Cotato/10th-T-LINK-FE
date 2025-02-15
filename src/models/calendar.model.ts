import { SimpleLessonDay } from './room.model';

export interface Clicked {
  date: Date | null;
  month: string | number;
  day: string | number;
  roomname: string[] | false;
  subjectAndRooms: string[] | false;
}

export interface Cal {
  roomName: string;
  subject: string;
  depositAt: number | null;
  lessonDays: SimpleLessonDay[];
}
