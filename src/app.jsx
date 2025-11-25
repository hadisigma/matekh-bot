import React, { useState } from 'react';
import { Send, Menu, Plus, LogOut, Moon, Sun, Shield, Users, Power, MessageSquare, Trash2 } from 'lucide-react';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  
  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className={`max-w-md w-full mx-4 p-8 rounded-2xl shadow-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="text-center mb-8">
          <h1 className={`text-4xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>MatEKH</h1>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Erstellt von Erik, Karem und Hadi</p>
        </div>
        
        <div className="space-y-4">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200">
            Anmelden
          </button>
          <button className={`w-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} ${darkMode ? 'text-white' : 'text-gray-900'} font-semibold py-3 px-4 rounded-lg transition duration-200`}>
            Als Gast fortfahren
          </button>
        </div>
        
        <p className={`text-xs mt-4 text-center ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
          Erstellt von Erik, Karem und Hadi
        </p>
      </div>
    </div>
  );
}