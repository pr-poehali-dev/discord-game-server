import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, getUsers, promoteToAdmin, demoteFromAdmin } from "@/lib/auth";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Admin = {
  name: string;
  role: string;
  avatar: string;
  color: string;
  status: string;
};

type Player = {
  rank: number;
  name: string;
  score: number;
  avatar: string;
};

const AdminPanel = () => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [allUsers, setAllUsers] = useState(getUsers());
  const [showPromoteDialog, setShowPromoteDialog] = useState(false);
  const [selectedUsername, setSelectedUsername] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.role === 'admin') {
      setIsAuthorized(true);
      setShowLogin(false);
    }
  }, []);
  
  const [admins, setAdmins] = useState<Admin[]>([
    { name: "Турист-Вагнера", role: "Основатель сервера", avatar: "👑", color: "bg-yellow-500", status: "Глава сервера" },
    { name: "Pancake", role: "Старший администратор", avatar: "⚡", color: "bg-purple-500", status: "Старший администратор" },
    { name: "cj", role: "Младший администратор", avatar: "🛡️", color: "bg-blue-500", status: "Младший администратор" },
  ]);

  const [players, setPlayers] = useState<Player[]>([]);
  const [newAdminName, setNewAdminName] = useState("");
  const [newAdminRole, setNewAdminRole] = useState("");
  const [newPlayerName, setNewPlayerName] = useState("");
  const [newPlayerScore, setNewPlayerScore] = useState("");

  const handleLogin = (password: string) => {
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.role === 'admin') {
      setIsAuthorized(true);
      setShowLogin(false);
    } else {
      alert("У вас нет прав доступа к админ-панели");
    }
  };

  const handlePromoteUser = () => {
    if (selectedUsername && selectedRole) {
      if (promoteToAdmin(selectedUsername, selectedRole)) {
        setAllUsers(getUsers());
        setShowPromoteDialog(false);
        setSelectedUsername("");
        setSelectedRole("");
        alert(`Пользователь ${selectedUsername} назначен администратором`);
      } else {
        alert("Ошибка при назначении администратора");
      }
    }
  };

  const handleDemoteUser = (username: string) => {
    if (demoteFromAdmin(username)) {
      setAllUsers(getUsers());
      alert(`У пользователя ${username} отобраны права администратора`);
    }
  };

  const handleAddAdmin = () => {
    if (newAdminName && newAdminRole) {
      const colors = ["bg-yellow-500", "bg-purple-500", "bg-blue-500", "bg-green-500", "bg-red-500"];
      const avatars = ["👑", "⚡", "🛡️", "⭐", "🎯"];
      
      setAdmins([...admins, {
        name: newAdminName,
        role: newAdminRole,
        avatar: avatars[Math.floor(Math.random() * avatars.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        status: newAdminRole,
      }]);
      setNewAdminName("");
      setNewAdminRole("");
    }
  };

  const handleRemoveAdmin = (name: string) => {
    setAdmins(admins.filter(admin => admin.name !== name));
  };

  const handleAddPlayer = () => {
    if (newPlayerName && newPlayerScore) {
      const avatars = ["🏆", "⚔️", "🐺", "🐉", "👻", "🎮", "🔥", "⚡"];
      
      setPlayers([...players, {
        rank: players.length + 1,
        name: newPlayerName,
        score: parseInt(newPlayerScore),
        avatar: avatars[Math.floor(Math.random() * avatars.length)],
      }].sort((a, b) => b.score - a.score).map((p, i) => ({ ...p, rank: i + 1 })));
      
      setNewPlayerName("");
      setNewPlayerScore("");
    }
  };

  const handleRemovePlayer = (name: string) => {
    setPlayers(players.filter(p => p.name !== name).map((p, i) => ({ ...p, rank: i + 1 })));
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-slate-900 flex items-center justify-center">
        <Card className="p-8 max-w-md">
          <div className="text-center space-y-4">
            <Icon name="ShieldAlert" className="mx-auto text-destructive" size={64} />
            <h2 className="text-2xl font-bold">Доступ запрещён</h2>
            <p className="text-muted-foreground">
              У вас нет прав для доступа к админ-панели. Войдите как администратор TOURIST-WAGNERA.
            </p>
            <Button onClick={() => navigate('/')} className="w-full">
              <Icon name="Home" className="mr-2" size={18} />
              На главную
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-slate-900">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>

      <div className="relative z-10">
        <header className="container mx-auto px-4 py-6 flex justify-between items-center border-b border-border/30">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent flex items-center gap-3">
              <Icon name="Shield" className="text-primary" size={32} />
              Админ-панель
            </h1>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate('/')}>
              <Icon name="Home" className="mr-2" size={18} />
              На главную
            </Button>
            <Button variant="outline" onClick={() => navigate('/forum')}>
              <Icon name="MessageSquare" className="mr-2" size={18} />
              Форум
            </Button>
            <Button variant="destructive" onClick={() => {
              setIsAuthorized(false);
              setShowLogin(true);
            }}>
              <Icon name="LogOut" className="mr-2" size={18} />
              Выйти
            </Button>
          </div>
        </header>

        <section className="container mx-auto px-4 py-12">
          <Card className="p-6 bg-card/70 backdrop-blur-sm border-border/50 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center text-4xl">
                👑
              </div>
              <div>
                <h2 className="text-2xl font-bold">TOURIST-WAGNERA</h2>
                <Badge className="mt-1">Основатель сервера</Badge>
              </div>
            </div>
            <p className="text-muted-foreground">
              Полный доступ ко всем функциям управления сервером и форумом
            </p>
          </Card>

          <Tabs defaultValue="admins" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="admins">Администраторы</TabsTrigger>
              <TabsTrigger value="players">Рейтинг игроков</TabsTrigger>
              <TabsTrigger value="stats">Статистика</TabsTrigger>
            </TabsList>

            <TabsContent value="admins" className="space-y-6">
              <Card className="p-6 bg-card/70 backdrop-blur-sm border-border/50">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Icon name="UserPlus" size={24} />
                  Выдать права администратора пользователю
                </h3>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Выберите зарегистрированного пользователя и назначьте ему права администратора
                  </p>
                  <Button onClick={() => setShowPromoteDialog(true)}>
                    <Icon name="Shield" className="mr-2" size={18} />
                    Назначить администратора
                  </Button>
                </div>
              </Card>

              <Card className="p-6 bg-card/70 backdrop-blur-sm border-border/50">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Icon name="Users" size={24} />
                  Все пользователи
                </h3>
                <div className="space-y-3">
                  {allUsers.map((user, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/20">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 ${user.role === 'admin' ? 'bg-yellow-500' : 'bg-gray-500'} rounded-full flex items-center justify-center text-2xl`}>
                          {user.role === 'admin' ? '👑' : '👤'}
                        </div>
                        <div>
                          <div className="font-bold">{user.username}</div>
                          <div className="text-sm text-muted-foreground">{user.status}</div>
                          <Badge variant={user.role === 'admin' ? 'default' : 'outline'} className="text-xs mt-1">
                            {user.role === 'admin' ? 'Администратор' : 'Пользователь'}
                          </Badge>
                        </div>
                      </div>
                      {user.username !== "TOURIST-WAGNERA" && user.role === 'admin' && (
                        <Button variant="destructive" size="sm" onClick={() => handleDemoteUser(user.username)}>
                          <Icon name="UserMinus" size={16} className="mr-1" />
                          Снять
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="players" className="space-y-6">
              <Card className="p-6 bg-card/70 backdrop-blur-sm border-border/50">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Icon name="UserPlus" size={24} />
                  Добавить игрока в рейтинг
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <Input 
                    placeholder="Никнейм игрока" 
                    value={newPlayerName}
                    onChange={(e) => setNewPlayerName(e.target.value)}
                  />
                  <Input 
                    type="number"
                    placeholder="Очки" 
                    value={newPlayerScore}
                    onChange={(e) => setNewPlayerScore(e.target.value)}
                  />
                  <Button onClick={handleAddPlayer}>
                    <Icon name="Plus" className="mr-2" size={18} />
                    Добавить
                  </Button>
                </div>
              </Card>

              <Card className="p-6 bg-card/70 backdrop-blur-sm border-border/50">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Icon name="Trophy" size={24} />
                  Топ игроков
                </h3>
                {players.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">Нет игроков в рейтинге</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-20">Место</TableHead>
                        <TableHead>Игрок</TableHead>
                        <TableHead>Очки</TableHead>
                        <TableHead className="w-32">Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {players.map((player) => (
                        <TableRow key={player.rank}>
                          <TableCell>
                            <Badge variant={player.rank === 1 ? "default" : "secondary"}>
                              #{player.rank}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">{player.avatar}</span>
                              <span className="font-bold">{player.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="font-semibold">{player.score.toLocaleString()}</TableCell>
                          <TableCell>
                            <Button variant="destructive" size="sm" onClick={() => handleRemovePlayer(player.name)}>
                              <Icon name="Trash2" size={16} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </Card>
            </TabsContent>

            <TabsContent value="stats" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="p-6 bg-card/70 backdrop-blur-sm border-border/50 text-center">
                  <Icon name="Users" className="mx-auto mb-3 text-primary" size={48} />
                  <div className="text-4xl font-bold text-foreground mb-2">{admins.length}</div>
                  <div className="text-muted-foreground">Администраторов</div>
                </Card>
                
                <Card className="p-6 bg-card/70 backdrop-blur-sm border-border/50 text-center">
                  <Icon name="Trophy" className="mx-auto mb-3 text-secondary" size={48} />
                  <div className="text-4xl font-bold text-foreground mb-2">{players.length}</div>
                  <div className="text-muted-foreground">Игроков в рейтинге</div>
                </Card>
                
                <Card className="p-6 bg-card/70 backdrop-blur-sm border-border/50 text-center">
                  <Icon name="Award" className="mx-auto mb-3 text-yellow-500" size={48} />
                  <div className="text-4xl font-bold text-foreground mb-2">
                    {players.length > 0 ? players[0].score.toLocaleString() : '0'}
                  </div>
                  <div className="text-muted-foreground">Макс. очков</div>
                </Card>
              </div>

              <Card className="p-8 bg-card/70 backdrop-blur-sm border-border/50">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Icon name="Info" className="text-primary" size={28} />
                  Доступные функции
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/20">
                    <Icon name="Check" className="text-green-500 mt-1" size={20} />
                    <div>
                      <div className="font-bold">Управление администрацией</div>
                      <div className="text-sm text-muted-foreground">Добавление и удаление администраторов</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/20">
                    <Icon name="Check" className="text-green-500 mt-1" size={20} />
                    <div>
                      <div className="font-bold">Управление рейтингом</div>
                      <div className="text-sm text-muted-foreground">Добавление и удаление игроков</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/20">
                    <Icon name="Check" className="text-green-500 mt-1" size={20} />
                    <div>
                      <div className="font-bold">Контроль форума</div>
                      <div className="text-sm text-muted-foreground">Баны, муты, удаление постов</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/20">
                    <Icon name="Check" className="text-green-500 mt-1" size={20} />
                    <div>
                      <div className="font-bold">Статистика</div>
                      <div className="text-sm text-muted-foreground">Просмотр данных сервера</div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
      </div>

      <Dialog open={showPromoteDialog} onOpenChange={setShowPromoteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name="Shield" className="text-primary" size={24} />
              Назначить администратора
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Выберите пользователя</label>
              <select
                className="w-full p-2 rounded-md bg-muted border border-border"
                value={selectedUsername}
                onChange={(e) => setSelectedUsername(e.target.value)}
              >
                <option value="">-- Выберите пользователя --</option>
                {allUsers.filter(u => u.role !== 'admin').map((user) => (
                  <option key={user.username} value={user.username}>
                    {user.username}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Должность</label>
              <Input
                placeholder="Например: Старший администратор"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              />
            </div>
            <Button onClick={handlePromoteUser} className="w-full" disabled={!selectedUsername || !selectedRole}>
              Назначить
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPanel;