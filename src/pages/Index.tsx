import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const Index = () => {
  const leaderboard = [
    { rank: 1, name: "ProGamer2077", score: 15420, avatar: "🏆" },
    { rank: 2, name: "ShadowHunter", score: 14850, avatar: "⚔️" },
    { rank: 3, name: "NightWolf", score: 13990, avatar: "🐺" },
    { rank: 4, name: "DragonSlayer", score: 12760, avatar: "🐉" },
    { rank: 5, name: "PhantomX", score: 11540, avatar: "👻" },
  ];

  const admins = [
    { name: "Admin_Zeus", role: "Владелец", avatar: "⚡", color: "bg-yellow-500" },
    { name: "Mod_Athena", role: "Главный модератор", avatar: "🛡️", color: "bg-purple-500" },
    { name: "Mod_Apollo", role: "Модератор", avatar: "🎯", color: "bg-blue-500" },
    { name: "Helper_Nova", role: "Помощник", avatar: "✨", color: "bg-green-500" },
  ];

  const stats = [
    { label: "Участников", value: "2,847", icon: "Users" },
    { label: "Онлайн", value: "342", icon: "Activity" },
    { label: "Каналов", value: "25", icon: "Hash" },
    { label: "Игр", value: "8", icon: "Gamepad2" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-slate-900">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>

      <div className="relative z-10">
        <section className="container mx-auto px-4 pt-20 pb-32 text-center">
          <div className="animate-fade-in">
            <Badge className="mb-6 text-lg px-6 py-2 bg-primary/20 text-primary border-primary/50">
              🎮 Киберспортивное комьюнити
            </Badge>
            <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-primary via-purple-400 to-secondary bg-clip-text text-transparent leading-tight">
              ELITE GAMING
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Профессиональный игровой сервер для настоящих чемпионов. Присоединяйся к лучшим!
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 bg-secondary hover:bg-secondary/90 text-white font-semibold shadow-lg shadow-secondary/50 hover:shadow-secondary/70 transition-all hover:scale-105"
                onClick={() => window.open('https://discord.com', '_blank')}
              >
                <Icon name="MessageCircle" className="mr-2" size={24} />
                Войти в Discord
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-6 border-2 border-primary/50 hover:bg-primary/10 font-semibold hover:scale-105 transition-all"
              >
                <Icon name="Info" className="mr-2" size={24} />
                Подробнее
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 animate-slide-up">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all hover:scale-105">
                <Icon name={stat.icon as any} className="mx-auto mb-3 text-primary" size={32} />
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
                <Icon name="Trophy" className="text-primary" size={36} />
                Топ Рейтинг
              </h2>
              <div className="space-y-4">
                {leaderboard.map((player) => (
                  <Card 
                    key={player.rank} 
                    className={`p-6 bg-card/70 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all hover:scale-[1.02] ${
                      player.rank === 1 ? 'ring-2 ring-primary/50 shadow-lg shadow-primary/20' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`text-4xl ${player.rank === 1 ? 'animate-glow' : ''}`}>
                        {player.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Badge variant={player.rank === 1 ? "default" : "secondary"} className="text-xs">
                            #{player.rank}
                          </Badge>
                          <span className="font-bold text-lg text-foreground">{player.name}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Icon name="Zap" className="text-primary" size={16} />
                          <span className="text-muted-foreground font-semibold">{player.score.toLocaleString()} очков</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

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
                      Elite Gaming — это профессиональное игровое комьюнити для настоящих энтузиастов. 
                      У нас вы найдёте команды для совместной игры, турниры с призами и дружескую атмосферу.
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
                      <div>
                        <div className="font-bold text-foreground">{admin.name}</div>
                        <div className="text-sm text-muted-foreground">{admin.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </section>

        <footer className="container mx-auto px-4 py-12 text-center border-t border-border/30">
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
            <Icon name="Rocket" className="text-primary" size={24} />
            <span className="font-semibold">Elite Gaming © 2026</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Создано для настоящих геймеров. Все права защищены.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
