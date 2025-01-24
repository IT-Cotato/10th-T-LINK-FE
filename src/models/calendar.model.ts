import { SimpleLessonDay } from './room.model';

export interface Clicked {
  date: Date | null;
  month: string | number;
  day: string | number;
  roomname: string | false;
  subjectAndRoom: string | false;
}

export interface Cal {
  roomName: string;
  subject: string;
  depositAt: number;
  lessonDays: SimpleLessonDay[];
}
