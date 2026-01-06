import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type User = {
  username: string;
  role: 'admin' | 'user';
  status: string;
  isBanned: boolean;
  isMuted: boolean;
};

type Post = {
  id: number;
  author: string;
  authorStatus: string;
  title: string;
  content: string;
  date: string;
  category: 'general' | 'news' | 'complaint';
  replies: number;
  isLocked: boolean;
};

const Forum = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showNewPost, setShowNewPost] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: "Турист-Вагнера",
      authorStatus: "Глава сервера",
      title: "Добро пожаловать на форум!",
      content: "Здесь вы можете общаться, задавать вопросы и обсуждать игру.",
      date: "2026-01-07",
      category: "news",
      replies: 5,
      isLocked: false,
    },
  ]);

  const [users, setUsers] = useState<User[]>([
    { username: "TOURIST-WAGNERA", role: "admin", status: "Глава сервера", isBanned: false, isMuted: false },
  ]);

  const handleLogin = (username: string, password: string) => {
    if (username === "TOURIST-WAGNERA" && password === "admin") {
      setCurrentUser({ username: "TOURIST-WAGNERA", role: "admin", status: "Глава сервера", isBanned: false, isMuted: false });
      setShowLogin(false);
    } else {
      alert("Неверный логин или пароль");
    }
  };

  const handleRegister = (username: string, password: string) => {
    const newUser: User = {
      username,
      role: "user",
      status: "Участник",
      isBanned: false,
      isMuted: false,
    };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    setShowRegister(false);
  };

  const handleBanUser = (username: string) => {
    setUsers(users.map(u => u.username === username ? { ...u, isBanned: true } : u));
  };

  const handleMuteUser = (username: string) => {
    setUsers(users.map(u => u.username === username ? { ...u, isMuted: true } : u));
  };

  const handleDeletePost = (postId: number) => {
    setPosts(posts.filter(p => p.id !== postId));
  };

  const handleCreatePost = (title: string, content: string, category: 'general' | 'news' | 'complaint') => {
    if (!currentUser || currentUser.isBanned || currentUser.isMuted) {
      alert("У вас нет прав для создания постов");
      return;
    }

    const newPost: Post = {
      id: posts.length + 1,
      author: currentUser.username,
      authorStatus: currentUser.status,
      title,
      content,
      date: new Date().toISOString().split('T')[0],
      category,
      replies: 0,
      isLocked: false,
    };
    setPosts([newPost, ...posts]);
    setShowNewPost(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-slate-900">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>

      <div className="relative z-10">
        <header className="container mx-auto px-4 py-6 flex justify-between items-center border-b border-border/30">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/')}>
              <Icon name="ArrowLeft" className="mr-2" size={20} />
              На главную
            </Button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Форум
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            {currentUser ? (
              <>
                <Badge className="text-sm px-4 py-2">
                  {currentUser.username} ({currentUser.status})
                </Badge>
                {currentUser.role === 'admin' && (
                  <Button variant="outline" onClick={() => setShowAdminPanel(true)}>
                    <Icon name="Settings" className="mr-2" size={18} />
                    Админ-панель
                  </Button>
                )}
                <Button variant="outline" onClick={() => setCurrentUser(null)}>
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => setShowLogin(true)}>
                  Войти
                </Button>
                <Button onClick={() => setShowRegister(true)}>
                  Регистрация
                </Button>
              </>
            )}
          </div>
        </header>

        <section className="container mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <div className="flex gap-3">
              <Badge variant="outline" className="cursor-pointer">Все</Badge>
              <Badge variant="outline" className="cursor-pointer">Новости</Badge>
              <Badge variant="outline" className="cursor-pointer">Жалобы</Badge>
              <Badge variant="outline" className="cursor-pointer">Общее</Badge>
            </div>
            
            {currentUser && !currentUser.isBanned && !currentUser.isMuted && (
              <Button onClick={() => setShowNewPost(true)}>
                <Icon name="Plus" className="mr-2" size={18} />
                Создать пост
              </Button>
            )}
          </div>

          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id} className="p-6 bg-card/70 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant={post.category === 'news' ? 'default' : post.category === 'complaint' ? 'destructive' : 'secondary'}>
                        {post.category === 'news' ? '📰 Новости' : post.category === 'complaint' ? '⚠️ Жалоба' : '💬 Общее'}
                      </Badge>
                      {post.isLocked && <Badge variant="outline"><Icon name="Lock" size={12} className="mr-1" />Закрыт</Badge>}
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">{post.title}</h3>
                    <p className="text-muted-foreground mb-4">{post.content}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Icon name="User" size={16} />
                        <span className="font-semibold">{post.author}</span>
                        <Badge variant="outline" className="text-xs ml-1">{post.authorStatus}</Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Calendar" size={16} />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="MessageCircle" size={16} />
                        {post.replies} ответов
                      </div>
                    </div>
                  </div>
                  
                  {currentUser?.role === 'admin' && (
                    <div className="flex gap-2">
                      <Button size="sm" variant="destructive" onClick={() => handleDeletePost(post.id)}>
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>

      <Dialog open={showLogin} onOpenChange={setShowLogin}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Вход в аккаунт</DialogTitle>
          </DialogHeader>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            handleLogin(formData.get('username') as string, formData.get('password') as string);
          }}>
            <div className="space-y-4">
              <Input name="username" placeholder="Никнейм" />
              <Input name="password" type="password" placeholder="Пароль" />
              <Button type="submit" className="w-full">Войти</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={showRegister} onOpenChange={setShowRegister}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Регистрация</DialogTitle>
          </DialogHeader>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            handleRegister(formData.get('username') as string, formData.get('password') as string);
          }}>
            <div className="space-y-4">
              <Input name="username" placeholder="Никнейм" />
              <Input name="password" type="password" placeholder="Пароль" />
              <Input type="password" placeholder="Повторите пароль" />
              <Button type="submit" className="w-full">Зарегистрироваться</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={showNewPost} onOpenChange={setShowNewPost}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Создать новый пост</DialogTitle>
          </DialogHeader>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            handleCreatePost(
              formData.get('title') as string,
              formData.get('content') as string,
              formData.get('category') as 'general' | 'news' | 'complaint'
            );
          }}>
            <div className="space-y-4">
              <Input name="title" placeholder="Заголовок" required />
              <Textarea name="content" placeholder="Содержание поста" rows={6} required />
              <Select name="category" defaultValue="general">
                <SelectTrigger>
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">Общее</SelectItem>
                  <SelectItem value="news">Новости</SelectItem>
                  <SelectItem value="complaint">Жалоба</SelectItem>
                </SelectContent>
              </Select>
              <Button type="submit" className="w-full">Опубликовать</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={showAdminPanel} onOpenChange={setShowAdminPanel}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <Icon name="Shield" className="text-primary" size={28} />
              Админ-панель
            </DialogTitle>
            <DialogDescription>
              Полный контроль над форумом и пользователями
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 mt-4">
            <div>
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Icon name="Users" size={20} />
                Управление пользователями
              </h3>
              <div className="space-y-2">
                {users.map((user) => (
                  <Card key={user.username} className="p-4 bg-muted/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold">{user.username}</div>
                        <div className="text-sm text-muted-foreground">{user.status}</div>
                        {user.isBanned && <Badge variant="destructive" className="text-xs mt-1">Забанен</Badge>}
                        {user.isMuted && <Badge variant="outline" className="text-xs mt-1">Замучен</Badge>}
                      </div>
                      {user.role !== 'admin' && (
                        <div className="flex gap-2">
                          <Button size="sm" variant="destructive" onClick={() => handleBanUser(user.username)}>
                            Бан
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleMuteUser(user.username)}>
                            Мут
                          </Button>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Icon name="FileText" size={20} />
                Статистика форума
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <Card className="p-4 text-center bg-muted/20">
                  <div className="text-3xl font-bold text-primary">{posts.length}</div>
                  <div className="text-sm text-muted-foreground">Постов</div>
                </Card>
                <Card className="p-4 text-center bg-muted/20">
                  <div className="text-3xl font-bold text-secondary">{users.length}</div>
                  <div className="text-sm text-muted-foreground">Пользователей</div>
                </Card>
                <Card className="p-4 text-center bg-muted/20">
                  <div className="text-3xl font-bold text-green-500">{users.filter(u => u.isBanned).length}</div>
                  <div className="text-sm text-muted-foreground">Забанено</div>
                </Card>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Forum;
