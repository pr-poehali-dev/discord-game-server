import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCurrentUser, login, register, logout, type User } from "@/lib/auth";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Index = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    setCurrentUser(getCurrentUser());
  }, []);

  const admins = [
    { name: "Турист-Вагнера", role: "Основатель сервера", avatar: "👑", color: "bg-yellow-500", status: "Глава сервера" },
    { name: "Pancake", role: "Старший администратор", avatar: "⚡", color: "bg-purple-500", status: "Старший администратор" },
    { name: "cj", role: "Младший администратор", avatar: "🛡️", color: "bg-blue-500", status: "Младший администратор" },
  ];

  const openFactions = [
    { name: "МВД", icon: "Shield", color: "text-blue-500" },
    { name: "ДПС", icon: "Car", color: "text-green-500" },
    { name: "СОБР МВД", icon: "Swords", color: "text-red-500" },
    { name: "Росгвардия", icon: "ShieldCheck", color: "text-purple-500" },
  ];

  const closedFactions = [
    { name: "ФСБ", icon: "Lock", color: "text-red-600" },
    { name: "ФСО", icon: "Lock", color: "text-orange-600" },
  ];

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    
    const user = login(username, password);
    if (user) {
      setCurrentUser(user);
      setShowLogin(false);
    } else {
      alert("Неверный логин или пароль");
    }
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;
    
    if (password !== confirmPassword) {
      alert("Пароли не совпадают");
      return;
    }
    
    const user = register(username, password);
    if (user) {
      setCurrentUser(user);
      setShowRegister(false);
    } else {
      alert("Пользователь с таким именем уже существует");
    }
  };

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-slate-900">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>

      <div className="relative z-10">
        <header className="container mx-auto px-4 py-4 flex justify-between items-center border-b border-border/30">
          <div className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Brick Rigs
          </div>
          
          <div className="flex items-center gap-3">
            {currentUser ? (
              <>
                <Badge className="text-sm px-4 py-2">
                  {currentUser.username}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {currentUser.status}
                </Badge>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={() => setShowLogin(true)}>
                  Войти
                </Button>
                <Button size="sm" onClick={() => setShowRegister(true)}>
                  Регистрация
                </Button>
              </>
            )}
          </div>
        </header>

        <section className="container mx-auto px-4 pt-20 pb-32 text-center">
          <div className="animate-fade-in">
            <Badge className="mb-6 text-lg px-6 py-2 bg-primary/20 text-primary border-primary/50">
              🎮 Brick Rigs Russian Town
            </Badge>
            <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-primary via-purple-400 to-secondary bg-clip-text text-transparent leading-tight">
              BRICK RIGS - RUSSIAN TOWN
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Лучший сервер brick rigs только тут!
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 bg-secondary hover:bg-secondary/90 text-white font-semibold shadow-lg shadow-secondary/50 hover:shadow-secondary/70 transition-all hover:scale-105"
                onClick={() => window.open('https://discord.gg/RuBxnxyEV5', '_blank')}
              >
                <Icon name="MessageCircle" className="mr-2" size={24} />
                Вступить в Discord сервер
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-6 border-2 border-primary/50 hover:bg-primary/10 font-semibold hover:scale-105 transition-all"
                onClick={() => navigate('/forum')}
              >
                <Icon name="MessageSquare" className="mr-2" size={24} />
                Форум
              </Button>
              {currentUser?.role === 'admin' && (
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-lg px-8 py-6 border-2 border-yellow-500/50 hover:bg-yellow-500/10 font-semibold hover:scale-105 transition-all"
                  onClick={() => navigate('/admin')}
                >
                  <Icon name="Shield" className="mr-2" size={24} />
                  Админ
                </Button>
              )}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
                <Icon name="Shield" className="text-secondary" size={36} />
                О Сервере
              </h2>
              <Card className="p-8 bg-card/70 backdrop-blur-sm border-border/50">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-foreground">Добро пожаловать!</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Brick Rigs - Russian Town — это ролевой сервер в мире Brick Rigs. 
                      У нас вы найдёте фракции, систему рангов и дружескую атмосферу.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-foreground flex items-center gap-2">
                      <Icon name="CheckCircle2" className="text-primary" size={24} />
                      Основные правила
                    </h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <Icon name="Dot" className="text-primary mt-1" size={20} />
                        <span>Уважайте других участников сервера</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Dot" className="text-primary mt-1" size={20} />
                        <span>Запрещены читы и нечестная игра</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Dot" className="text-primary mt-1" size={20} />
                        <span>Общение только по делу в игровых каналах</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Dot" className="text-primary mt-1" size={20} />
                        <span>Следуйте указаниям администрации</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="p-8 bg-card/70 backdrop-blur-sm border-border/50">
                <h3 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
                  <Icon name="Crown" className="text-yellow-500" size={28} />
                  Администрация
                </h3>
                <div className="space-y-4">
                  {admins.map((admin, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                      <div className={`w-12 h-12 ${admin.color} rounded-full flex items-center justify-center text-2xl shadow-lg`}>
                        {admin.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-foreground">{admin.name}</div>
                        <div className="text-sm text-muted-foreground">{admin.role}</div>
                        <Badge className="text-xs mt-1" variant="secondary">{admin.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div className="space-y-6 animate-fade-in">
              <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
                <Icon name="Users" className="text-primary" size={36} />
                Фракции
              </h2>
              
              <Card className="p-8 bg-card/70 backdrop-blur-sm border-border/50">
                <h3 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
                  <Icon name="Unlock" className="text-green-500" size={24} />
                  Открытые фракции
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {openFactions.map((faction, index) => (
                    <div key={index} className="p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-all text-center">
                      <Icon name={faction.icon as any} className={`mx-auto mb-2 ${faction.color}`} size={32} />
                      <div className="font-bold text-foreground text-sm">{faction.name}</div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-8 bg-card/70 backdrop-blur-sm border-border/50">
                <h3 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
                  <Icon name="Lock" className="text-red-500" size={24} />
                  Закрытые фракции
                </h3>
                <div className="space-y-3">
                  {closedFactions.map((faction, index) => (
                    <div key={index} className="p-4 rounded-lg bg-red-950/20 border border-red-900/30 flex items-center gap-3">
                      <Icon name={faction.icon as any} className={faction.color} size={28} />
                      <div className="font-bold text-foreground">{faction.name}</div>
                      <Badge variant="destructive" className="ml-auto text-xs">Закрыта</Badge>
                    </div>
                  ))}
                  <div className="mt-4 p-3 rounded-lg bg-muted/10 text-center">
                    <p className="text-sm text-muted-foreground italic">
                      <Icon name="Info" className="inline mr-1" size={16} />
                      Некоторые фракции временно закрыты
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-8 bg-card/70 backdrop-blur-sm border-border/50">
                <h3 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
                  <Icon name="Trophy" className="text-primary" size={28} />
                  Топ Рейтинг
                </h3>
                <p className="text-muted-foreground text-center py-8 italic">
                  Пока нет игроков в рейтинге. Начните играть первым!
                </p>
              </Card>
            </div>
          </div>
        </section>

        <footer className="container mx-auto px-4 py-12 text-center border-t border-border/30">
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
            <Icon name="Rocket" className="text-primary" size={24} />
            <span className="font-semibold">Brick Rigs - Russian Town</span>
          </div>
        </footer>
      </div>

      <Dialog open={showLogin} onOpenChange={setShowLogin}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Вход в аккаунт</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Никнейм</label>
                <Input name="username" placeholder="Введите никнейм" required />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Пароль</label>
                <Input name="password" type="password" placeholder="Введите пароль" required />
              </div>
              <Button type="submit" className="w-full">Войти</Button>
              <p className="text-xs text-center text-muted-foreground">
                Нет аккаунта?{" "}
                <span 
                  className="text-primary cursor-pointer hover:underline"
                  onClick={() => {
                    setShowLogin(false);
                    setShowRegister(true);
                  }}
                >
                  Зарегистрироваться
                </span>
              </p>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={showRegister} onOpenChange={setShowRegister}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Регистрация</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleRegister}>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Никнейм</label>
                <Input name="username" placeholder="Придумайте никнейм" required />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Пароль</label>
                <Input name="password" type="password" placeholder="Придумайте пароль" required />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Повторите пароль</label>
                <Input name="confirmPassword" type="password" placeholder="Повторите пароль" required />
              </div>
              <Button type="submit" className="w-full">Зарегистрироваться</Button>
              <p className="text-xs text-center text-muted-foreground">
                Уже есть аккаунт?{" "}
                <span 
                  className="text-primary cursor-pointer hover:underline"
                  onClick={() => {
                    setShowRegister(false);
                    setShowLogin(true);
                  }}
                >
                  Войти
                </span>
              </p>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
