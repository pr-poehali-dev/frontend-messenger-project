import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface User {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  lastSeen?: string;
}

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
}

interface Chat {
  id: string;
  participant: User;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
}

const Index = () => {
  const [activeChat, setActiveChat] = useState<string>("1");
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const currentUser: User = {
    id: "me",
    name: "Вы",
    avatar: "/img/7f912fc2-a00d-45ef-8c7e-5e3f5eda1381.jpg",
    isOnline: true,
  };

  const users: User[] = [
    {
      id: "1",
      name: "Анна Смирнова",
      avatar: "/img/88472f54-a6b6-4b6a-a7d9-45254b344e85.jpg",
      isOnline: true,
    },
    {
      id: "2",
      name: "Дмитрий Петров",
      avatar: "/img/c0b10427-860b-4662-9326-8d05426faef3.jpg",
      isOnline: false,
      lastSeen: "2 минуты назад",
    },
    {
      id: "3",
      name: "Елена Кузнецова",
      avatar: "/img/7f912fc2-a00d-45ef-8c7e-5e3f5eda1381.jpg",
      isOnline: true,
    },
  ];

  const chats: Chat[] = [
    {
      id: "1",
      participant: users[0],
      lastMessage: "Привет! Как дела?",
      timestamp: "14:30",
      unreadCount: 2,
    },
    {
      id: "2",
      participant: users[1],
      lastMessage: "Отлично, спасибо за помощь!",
      timestamp: "13:45",
      unreadCount: 0,
    },
    {
      id: "3",
      participant: users[2],
      lastMessage: "Увидимся завтра на встрече",
      timestamp: "12:20",
      unreadCount: 1,
    },
  ];

  const messages: Message[] = [
    {
      id: "1",
      senderId: "1",
      text: "Привет! Как дела?",
      timestamp: "14:28",
      isOwn: false,
    },
    {
      id: "2",
      senderId: "me",
      text: "Привет! Всё отлично, работаю над новым проектом",
      timestamp: "14:29",
      isOwn: true,
    },
    {
      id: "3",
      senderId: "1",
      text: "Звучит интересно! Расскажешь подробнее?",
      timestamp: "14:30",
      isOwn: false,
    },
  ];

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      console.log("Отправка сообщения:", messageInput);
      setMessageInput("");
    }
  };

  const filteredChats = chats.filter((chat) =>
    chat.participant.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const activeUser = users.find((u) => u.id === activeChat);

  return (
    <div className="h-screen bg-background dark flex">
      {/* Боковая панель чатов */}
      <div className="w-80 bg-card border-r border-border flex flex-col">
        {/* Профиль пользователя */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="h-10 w-10">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-card"></div>
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-foreground">
                {currentUser.name}
              </h2>
              <p className="text-sm text-muted-foreground">В сети</p>
            </div>
            <Button variant="ghost" size="sm">
              <Icon name="Settings" size={20} />
            </Button>
          </div>
        </div>

        {/* Поиск */}
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Icon
              name="Search"
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="Поиск чатов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Список чатов */}
        <ScrollArea className="flex-1">
          <div className="p-2">
            {filteredChats.map((chat) => (
              <Card
                key={chat.id}
                className={`mb-2 cursor-pointer transition-all hover:bg-accent ${activeChat === chat.id ? "bg-accent" : ""}`}
                onClick={() => setActiveChat(chat.id)}
              >
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={chat.participant.avatar}
                          alt={chat.participant.name}
                        />
                        <AvatarFallback>
                          {chat.participant.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      {chat.participant.isOnline && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-card"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-foreground truncate">
                          {chat.participant.name}
                        </h3>
                        <span className="text-xs text-muted-foreground">
                          {chat.timestamp}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {chat.lastMessage}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-muted-foreground">
                          {chat.participant.isOnline
                            ? "В сети"
                            : chat.participant.lastSeen}
                        </span>
                        {chat.unreadCount > 0 && (
                          <Badge variant="default" className="text-xs">
                            {chat.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Главное окно чата */}
      <div className="flex-1 flex flex-col">
        {activeUser ? (
          <>
            {/* Заголовок чата */}
            <div className="p-4 border-b border-border bg-card">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={activeUser.avatar}
                      alt={activeUser.name}
                    />
                    <AvatarFallback>{activeUser.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {activeUser.isOnline && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-card"></div>
                  )}
                </div>
                <div className="flex-1">
                  <h2 className="font-semibold text-foreground">
                    {activeUser.name}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {activeUser.isOnline ? "В сети" : activeUser.lastSeen}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Icon name="Phone" size={20} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Icon name="Video" size={20} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Icon name="MoreVertical" size={20} />
                  </Button>
                </div>
              </div>
            </div>

            {/* Область сообщений */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.isOwn ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Поле ввода сообщения */}
            <div className="p-4 border-t border-border bg-card">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm">
                  <Icon name="Paperclip" size={20} />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    placeholder="Напишите сообщение..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="pr-12"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    <Icon name="Smile" size={20} />
                  </Button>
                </div>
                <Button onClick={handleSendMessage} size="sm">
                  <Icon name="Send" size={20} />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Icon
                name="MessageCircle"
                size={64}
                className="mx-auto mb-4 text-muted-foreground"
              />
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Выберите чат
              </h2>
              <p className="text-muted-foreground">
                Начните общение, выбрав чат из списка
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
