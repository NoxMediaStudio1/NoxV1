import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User, Settings, Terminal, Eye, Trash2, Shield, ArrowLeft, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user' | 'admin';
  timestamp: Date;
  quickReplies?: string[];
  isTyping?: boolean;
}

const NoxMediaChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [ticketNumber, setTicketNumber] = useState<string | null>(null);
  const [debugMode, setDebugMode] = useState(false);
  const [adminPanel, setAdminPanel] = useState(false);
  const [adminAuth, setAdminAuth] = useState(false);
  const [conversationLogs, setConversationLogs] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addBotMessage(
          "Olá! Sou o assistente do NoxMedia Studio. Como posso ajudar?",
          ["Apoiar projeto", "Discord", "Legendas", "Falar com humano"]
        );
      }, 500);
    }
  }, [isOpen]);

  const addMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
    setConversationLogs(prev => [...prev, `[${message.timestamp.toLocaleTimeString()}] ${message.sender}: ${message.text}`]);
  };

  const addBotMessage = (text: string, quickReplies?: string[]) => {
    const message: Message = {
      id: Date.now().toString(),
      text,
      sender: 'bot',
      timestamp: new Date(),
      quickReplies
    };
    addMessage(message);
  };

  const addUserMessage = (text: string) => {
    const message: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };
    addMessage(message);
  };

  const addAdminMessage = (text: string) => {
    const message: Message = {
      id: Date.now().toString(),
      text,
      sender: 'admin',
      timestamp: new Date()
    };
    addMessage(message);
  };

  const simulateTyping = () => {
    setIsTyping(true);
    const typingMessage: Message = {
      id: 'typing',
      text: '',
      sender: 'bot',
      timestamp: new Date(),
      isTyping: true
    };
    setMessages(prev => [...prev, typingMessage]);
    
    return new Promise(resolve => {
      setTimeout(() => {
        setMessages(prev => prev.filter(msg => msg.id !== 'typing'));
        setIsTyping(false);
        resolve(void 0);
      }, 800);
    });
  };

  const processMessage = async (message: string) => {
    await simulateTyping();
    addBotMessage("Em breve, respostas automáticas e integração com equipe!");
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    addUserMessage(inputValue);
    const message = inputValue;
    setInputValue('');
    await processMessage(message);
  };

  const handleQuickReply = async (reply: string) => {
    addUserMessage(reply);
    await processMessage(reply);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const resetChat = () => {
    setMessages([]);
    setTicketNumber(null);
    setDebugMode(false);
    setAdminAuth(false);
    setAdminPanel(false);
    setConversationLogs([]);
    setTimeout(() => {
      addBotMessage(
        "Chat reiniciado! Como posso ajudar?",
        ["Apoiar projeto", "Discord", "Legendas", "Falar com humano"]
      );
    }, 300);
  };

  // Admin Panel Component
  const AdminPanel = () => (
    <div className="flex-1 p-4 bg-slate-800">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold flex items-center">
          <Shield className="w-4 h-4 mr-2 text-orange-400" />
          Painel Admin
        </h3>
        <button
          onClick={() => setAdminPanel(false)}
          className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-slate-400" />
        </button>
      </div>
      <div className="space-y-4">
        <div className="bg-slate-700 rounded-lg p-3">
          <h4 className="text-slate-200 font-medium mb-2 flex items-center">
            <Eye className="w-4 h-4 mr-2" />
            Logs da Conversa
          </h4>
          <div className="bg-slate-900 rounded p-2 max-h-32 overflow-y-auto">
            <code className="text-xs text-green-400">
              {conversationLogs.slice(-5).join('\n')}
            </code>
          </div>
        </div>
        <div className="bg-slate-700 rounded-lg p-3">
          <h4 className="text-slate-200 font-medium mb-2 flex items-center">
            <Terminal className="w-4 h-4 mr-2" />
            Controles Admin
          </h4>
          <div className="space-y-2">
            <button
              onClick={() => {
                setConversationLogs([]);
                addAdminMessage("Logs limpos pelo admin");
              }}
              className="w-full p-2 bg-red-600 hover:bg-red-700 rounded text-white text-sm flex items-center justify-center"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Limpar Logs
            </button>
            <button
              onClick={() => {
                addAdminMessage("Admin assumiu a conversa");
                setAdminPanel(false);
              }}
              className="w-full p-2 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm"
            >
              Assumir Conversa
            </button>
          </div>
        </div>
        <div className="bg-slate-700 rounded-lg p-3">
          <h4 className="text-slate-200 font-medium mb-2">Status do Sistema</h4>
          <div className="text-sm text-slate-300 space-y-1">
            <div>• Conversas ativas: 1</div>
            <div>• Debug mode: {debugMode ? 'Ativado' : 'Desativado'}</div>
            <div>• Ticket atual: {ticketNumber || 'Nenhum'}</div>
          </div>
        </div>
        <div className="bg-slate-700 rounded-lg p-3">
          <h4 className="text-slate-200 font-medium mb-2">Enviar Mensagem</h4>
          <div className="text-xs text-slate-400 mb-2">Use: /send [mensagem]</div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center z-50"
          aria-label="Abrir chat"
        >
          <MessageCircle className="w-6 h-6 text-white" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
        </button>
      )}
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 h-[500px] bg-slate-900 rounded-xl shadow-2xl border border-slate-700 flex flex-col z-50 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-white font-medium text-sm">NoxMedia Assistant</h3>
                <p className="text-purple-100 text-xs">Online</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              {debugMode && (
                <div className="px-2 py-1 bg-orange-500 rounded text-xs text-white font-bold">
                  DEBUG
                </div>
              )}
              {adminAuth && (
                <button
                  onClick={() => setAdminPanel(!adminPanel)}
                  className="p-1.5 hover:bg-white/10 rounded transition-colors"
                  title="Painel Admin"
                >
                  <Settings className="w-4 h-4 text-white" />
                </button>
              )}
              <button
                onClick={resetChat}
                className="p-1.5 hover:bg-white/10 rounded transition-colors"
                title="Reiniciar"
              >
                <MessageCircle className="w-4 h-4 text-white" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/10 rounded transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
          {/* Admin Panel ou Messages */}
          {adminPanel ? (
            <AdminPanel />
          ) : (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-slate-800/50">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                      <div className={`flex items-start space-x-2 ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.sender === 'user' 
                            ? 'bg-gradient-to-r from-purple-600 to-blue-600' 
                            : message.sender === 'admin'
                            ? 'bg-orange-500'
                            : 'bg-slate-700'
                        }`}>
                          {message.sender === 'user' ? (
                            <User className="w-3 h-3 text-white" />
                          ) : message.sender === 'admin' ? (
                            <Shield className="w-3 h-3 text-white" />
                          ) : (
                            <Bot className="w-3 h-3 text-slate-300" />
                          )}
                        </div>
                        <div className={`rounded-xl px-3 py-2 ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                            : message.sender === 'admin'
                            ? 'bg-orange-600 text-white'
                            : 'bg-slate-700 text-slate-100'
                        }`}>
                          {message.isTyping ? (
                            <div className="flex items-center space-x-1">
                              <div className="flex space-x-1">
                                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                              </div>
                            </div>
                          ) : (
                            <p className="text-xs whitespace-pre-line">{message.text}</p>
                          )}
                        </div>
                      </div>
                      {/* Quick Replies */}
                      {message.quickReplies && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {message.quickReplies.map((reply, index) => (
                            <button
                              key={index}
                              onClick={() => handleQuickReply(reply)}
                              className="px-2 py-1 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs rounded-md transition-colors border border-slate-600 hover:border-purple-500"
                            >
                              {reply}
                            </button>
                          ))}

                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              {/* Input */}
              <div className="p-3 bg-slate-900 border-t border-slate-700">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Digite sua mensagem..."
                      className="w-full bg-slate-800 text-slate-100 rounded-lg px-3 py-2 pr-10 border border-slate-600 focus:border-purple-500 focus:outline-none transition-colors text-sm"
                      disabled={isTyping}
                    />
                    <button
                      onClick={handleSend}
                      disabled={!inputValue.trim() || isTyping}
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 p-1.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-md hover:shadow-lg transition-all disabled:opacity-50"
                    >
                      {isTyping ? (
                        <Loader2 className="w-3 h-3 text-white animate-spin" />
                      ) : (
                        <Send className="w-3 h-3 text-white" />
                      )}
                    </button>
                  </div>
                </div>
                {ticketNumber && (
                  <div className="mt-1 text-xs text-purple-400">
                    Ticket: {ticketNumber}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default NoxMediaChatbot;
