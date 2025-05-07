import { useEffect, useRef } from 'react';
import { Data } from '../../pages/Chatting/ChatRoom';

interface ChatBoxProps {
  history: Data[];
}

const ChatBox = ({ history }: ChatBoxProps) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <div className="flex flex-col px-4 mt-[62px] h-screen mb-[60px] gap-4 p-4 overflow-auto scrollbar-none">
      {history.map((message, idx) =>
        message.type === 'user' ? (
          <div key={idx} className="flex justify-end items-end gap-2">
            <div className="text-xs text-gray-400">{message.timestamp}</div>
            <div className="py-3 px-4 bg-primary_600 text-white rounded-s-[16px] rounded-tr-[16px] max-w-[80%]">
              {message.text}
            </div>
          </div>
        ) : (
          <div key={idx} className="flex justify-start items-end gap-2">
            <div className="py-3 px-4 bg-gray-100 text-black rounded-e-[16px] rounded-tl-[16px] max-w-[80%]">
              {message.text}
            </div>
            <div className="text-xs text-gray-400">{message.timestamp}</div>
          </div>
        ),
      )}

      <div ref={bottomRef} />
    </div>
  );
};

export default ChatBox;
