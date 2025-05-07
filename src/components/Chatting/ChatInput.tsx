import ArrowCircleUpRoundedIcon from '@mui/icons-material/ArrowCircleUpRounded';
import ChatIcon from '../../assets/images/Chatting/chat.svg?react';
import { Data } from '../../pages/Chatting/ChatRoom';

interface ChatInputProps {
  input: string;
  setInput: (text: string) => void;
  setData: (message: Data) => void;
}

const ChatInput = ({ input, setInput, setData }: ChatInputProps) => {
  const handleMessage = () => {
    if (input.trim() === '') return;
    const now = new Date();
    const time = now.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
    });
    setData({ text: input, type: 'user', timestamp: time });
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !(e.nativeEvent as any).isComposing) {
      handleMessage();
    }
  };

  return (
    <div className="flex absolute max-w-[500px] bottom-4 px-4 w-full gap-2 items-center">
      <input
        className="border-[1px] border-gray-400 h-10 rounded-[10px] w-[85%] border-solid px-2 focus:outline-none focus:ring-2 focus:ring-second_20"
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        value={input}
      />
      {input === '' ? (
        <ArrowCircleUpRoundedIcon style={{ fontSize: 44, color: '#12B500' }} />
      ) : (
        <ChatIcon className="w-11 h-11 cursor-pointer" onClick={handleMessage} />
      )}
    </div>
  );
};

export default ChatInput;
