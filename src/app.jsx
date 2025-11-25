import React, { useState, useEffect, useRef } from 'react';
import { Send, Menu, Plus, LogOut, Moon, Sun, Shield, Users, Power, MessageSquare, Trash2 } from 'lucide-react';

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const [chats, setChats] = useState([{ id: 1, name: 'Neuer Chat', messages: [] }]);
  const [currentChatId, setCurrentChatId] = useState(1);
  const [messageCount, setMessageCount] = useState(0);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [isBotShutdown, setIsBotShutdown] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(1);
  const messagesEndRef = useRef(null);

  const MESSAGE_LIMIT = 10;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineUsers(Math.floor(Math.random() * 50) + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'erikkaremhadi' && password === 'erik123karem123hadi123') {
      setIsLoggedIn(true);
      setIsAdmin(true);
      setShowLogin(false);
      setMessageCount(0);
    } else {
      alert('Falscher Benutzername oder Passwort!');
    }
  };

  const handleGuestLogin = () => {
    setIsLoggedIn(true);
    setIsAdmin(false);
    setShowLogin(false);
    setMessageCount(0);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setMessageCount(0);
    setShowAdminPanel(false);
  };

  const createNewChat = () => {
    const newChat = {
      id: chats.length + 1,
      name: `Chat ${chats.length + 1}`,
      messages: []
    };
    setChats([...chats, newChat]);
    setCurrentChatId(newChat.id);
    setMessages([]);
    setMessageCount(0);
  };

  const switchChat = (chatId) => {
    setCurrentChatId(chatId);
    const chat = chats.find(c => c.id === chatId);
    setMessages(chat.messages);
    setShowSidebar(false);
  };

  const deleteChat = (chatId) => {
    if (chats.length === 1) {
      alert('Du kannst den letzten Chat nicht löschen!');
      return;
    }
    const newChats = chats.filter(c => c.id !== chatId);
    setChats(newChats);
    if (currentChatId === chatId) {
      setCurrentChatId(newChats[0].id);
      setMessages(newChats[0].messages);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isBotShutdown) return;

    if (!isAdmin && messageCount >= MESSAGE_LIMIT) {
      alert('Chat-Limit erreicht! Melde dich als Admin an für unbegrenzten Zugang.');
      return;
    }

    const userMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setMessageCount(messageCount + 1);

    const trollResponses = [
      'Ich bin gerade beim Kaffee trinken, einen Moment... ☕',
      'Erik, Karem und Hadi haben mir beigebracht, dass ich manchmal chillen muss 😎',
      'Lass mich kurz nachdenken... *denkt intensiv nach* 🤔',
    ];

    const isTroll = Math.random() > 0.7;
    const botMessage = {
      role: 'assistant',
      content: isTroll ? 
        trollResponses[Math.floor(Math.random() * trollResponses.length)] :
        'Hallo! Ich bin MatEKH, dein KI-Assistent. Ich kann dir bei vielen Fragen helfen!'
    };
    
    setTimeout(() => {
      const updatedMessages = [...newMessages, botMessage];
      setMessages(updatedMessages);
      
      const updatedChats = chats.map(chat =>
        chat.id === currentChatId ? { ...chat, messages: updatedMessages } : chat
      );
      setChats(updatedChats);
    }, 500);
  };

  const toggleShutdown = () => {
    setIsBotShutdown(!isBotShutdown);
  };

  if (!isLoggedIn) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className={`max-w-md w-full mx-4 p-8 rounded-2xl shadow-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="text-center mb-8">
            <h1 className={`text-4xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>MatEKH</h1>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Erstellt von Erik, Karem und Hadi</p>
          </div>

          {!showLogin ? (
            <div className="space-y-4">
              <button
                onClick={() => setShowLogin(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
              >
                Anmelden
              </button>
              <button
                onClick={handleGuestLogin}
                className={`w-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} ${darkMode ? 'text-white' : 'text-gray-900'} font-semibold py-3 px-4 rounded-lg transition duration-200`}
              >
                Als Gast fortfahren
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Benutzername"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              <input
                type="password"
                placeholder="Passwort"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin(e)}
                className={`w-full px-4 py-3 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              <button
                onClick={handleLogin}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
              >
                Login
              </button>
              <button
                onClick={() => setShowLogin(false)}
                className={`w-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} ${darkMode ? 'text-white' : 'text-gray-900'} font-semibold py-3 px-4 rounded-lg transition duration-200`}
              >
                Zurück
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (isBotShutdown && !isAdmin) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center p-8">
          <Power className="w-20 h-20 text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-4">Bot Offline</h1>
          <p className="text-gray-400">Der Owner hat diesen Bot momentan runtergenommen.</p>
          <p className="text-gray-400">Bitte kontaktieren Sie den Owner für weitere Informationen.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className={`${showSidebar ? 'translate-x-0' : '-translate-x-full'} fixed lg:relative lg:translate-x-0 w-64 h-full ${darkMode ? 'bg-gray-800' : 'bg-white'} border-r ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-transform duration-300 z-50`}>
        <div className="p-4 border-b border-gray-700">
          <button
            onClick={createNewChat}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition"
          >
            <Plus className="w-5 h-5" />
            Neuer Chat
          </button>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-200px)]">
          {chats.map(chat => (
            <div
              key={chat.id}
              className={`p-3 mx-2 my-1 rounded-lg cursor-pointer flex items-center justify-between group ${
                currentChatId === chat.id
                  ? darkMode ? 'bg-gray-700' : 'bg-gray-200'
                  : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
            >
              <div onClick={() => switchChat(chat.id)} className="flex-1">
                <p className={`text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{chat.name}</p>
              </div>
              {chats.length > 1 && (
                <button
                  onClick={() => deleteChat(chat.id)}
                  className="opacity-0 group-hover:opacity-100 transition"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className={`w-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition`}
          >
            <LogOut className="w-5 h-5" />
            Abmelden
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b p-4 flex items-center justify-between`}>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="lg:hidden"
            >
              <Menu className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-gray-900'}`} />
            </button>
            <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>MatEKH</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-green-500" />
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{onlineUsers} online</span>
            </div>
            
            {isAdmin && (
              <button
                onClick={() => setShowAdminPanel(!showAdminPanel)}
                className="p-2 rounded-lg bg-red-600 hover:bg-red-700 transition"
              >
                <Shield className="w-5 h-5 text-white" />
              </button>
            )}

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} transition`}
            >
              {darkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-700" />}
            </button>
          </div>
        </div>

        {showAdminPanel && isAdmin && (
          <div className="bg-red-900 p-4 border-b border-red-700">
            <h3 className="text-white font-bold mb-2">🛡️ Admin Panel</h3>
            <div className="space-y-2">
              <button
                onClick={toggleShutdown}
                className={`${isBotShutdown ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'} text-white px-4 py-2 rounded-lg transition`}
              >
                {isBotShutdown ? '🟢 Bot Aktivieren' : '🔴 Bot Herunterfahren'}
              </button>
              <p className="text-gray-300 text-sm">Total Chats: {chats.length} | Total Messages: {chats.reduce((acc, chat) => acc + chat.messages.length, 0)}</p>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-4">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Willkommen bei MatEKH! 👋
                </h2>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {isAdmin ? 'Du hast unbegrenzten Zugang!' : `Du hast noch ${MESSAGE_LIMIT - messageCount} Nachrichten übrig.`}
                </p>
              </div>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-900'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t p-4`}>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder={isBotShutdown ? 'Bot ist offline...' : 'Nachricht eingeben...'}
              disabled={isBotShutdown && !isAdmin}
              className={`flex-1 px-4 py-3 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            <button
              onClick={sendMessage}
              disabled={isBotShutdown && !isAdmin}
              className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className={`text-xs mt-2 text-center ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
            Erstellt von Erik, Karem und Hadi
          </p>
        </div>
      </div>
    </div>
  );
}