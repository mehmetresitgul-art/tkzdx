import { Users, Heart, TrendingUp } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "10.000+",
    label: "Aktif Kullanıcı",
  },
  {
    icon: Heart,
    value: "50.000+",
    label: "Başarılı Takas",
  },
  {
    icon: TrendingUp,
    value: "100.000+",
    label: "Mutlu Anlar",
  },
];

const Community = () => {
  return (
    <section id="topluluk" className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
          Büyüyen Topluluğumuz
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Binlerce kullanıcı Takazade ile değerli deneyimler yaşıyor
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
                <stat.icon className="w-10 h-10 text-secondary" />
              </div>
              <div className="text-4xl font-bold text-foreground mb-2">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Community;
