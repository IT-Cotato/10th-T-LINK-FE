import { useState } from 'react';
import Search from '../../components/Room/Search';
import ChatPreview from '../../components/Chatting/ChatPreview';

const ChatList = () => {
  const [search, setSearch] = useState('');
  const onChangeSearch = () => {};

  return (
    <div className="flex flex-col">
      <Search value={search} onChangeSearch={onChangeSearch} />
      <div>
        <ChatPreview />
        <ChatPreview />
        <ChatPreview />
      </div>
    </div>
  );
};

export default ChatList;
