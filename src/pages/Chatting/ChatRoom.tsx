import { useState } from 'react';
import ChatBox from '../../components/Chatting/ChatBox';
import ChatHeader from '../../components/Chatting/ChatHeader';
import ChatInput from '../../components/Chatting/ChatInput';

export interface Data {
  text: string;
  type: 'user' | 'opponent';
  timestamp: string;
}

const ChatRoom = () => {
  const [data, setData] = useState<Data[]>([
    { text: '선생님, 저 사실 숙제 못 했어요...', type: 'opponent', timestamp: '오후 3:00' },
    { text: '왜 못 했는지 말해볼래?', type: 'user', timestamp: '오후 3:01' },
    {
      text: '어제 할머니 병원에 다녀오느라 시간이 없었어요.',
      type: 'opponent',
      timestamp: '오후 3:02',
    },
    { text: '그랬구나... 가족 일이었으면 어쩔 수 없지.', type: 'user', timestamp: '오후 3:03' },
    { text: '죄송해요. 다음부턴 꼭 할게요.', type: 'opponent', timestamp: '오후 3:03' },
    { text: '알았어. 그 대신 오늘 수업은 더 집중하기!', type: 'user', timestamp: '오후 3:04' },
    { text: '네! 열심히 할게요!', type: 'opponent', timestamp: '오후 3:04' },
    { text: '좋아. 그럼 이따 보자.', type: 'user', timestamp: '오후 3:05' },
    { text: '선생님, 저 사실 숙제 못 했어요...', type: 'opponent', timestamp: '오후 4:10' },
    { text: '왜 못 했는지 말해볼래?', type: 'user', timestamp: '오후 4:11' },
    {
      text: '어제 할머니 병원에 다녀오느라 시간이 없었어요.',
      type: 'opponent',
      timestamp: '오후 4:11',
    },
    { text: '그랬구나... 가족 일이었으면 어쩔 수 없지.', type: 'user', timestamp: '오후 4:12' },
    { text: '죄송해요. 다음부턴 꼭 할게요.', type: 'opponent', timestamp: '오후 4:13' },
    { text: '알았어. 그 대신 오늘 수업은 더 집중하기!', type: 'user', timestamp: '오후 4:13' },
    { text: '네! 열심히 할게요!', type: 'opponent', timestamp: '오후 4:14' },
    { text: '좋아. 그럼 이따 보자.', type: 'user', timestamp: '오후 4:14' },
  ]);

  const [input, setInput] = useState('');

  const addMessage = (message: Data) => {
    setData((prev) => [...prev, message]);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* 헤더 */}
      <ChatHeader />
      {/* 채팅 구역 */}
      <ChatBox history={data} />
      {/* 입력창 */}
      <ChatInput input={input} setInput={setInput} setData={addMessage} />
    </div>
  );
};

export default ChatRoom;
