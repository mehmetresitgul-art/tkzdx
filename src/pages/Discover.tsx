import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";
import { Search, MessageCircle, Plus } from "lucide-react";
interface Talent {
  id: string;
  title: string;
  description: string;
  category: string;
  user_id: string;
  created_at: string;
  wanted_talent?: string;
  profiles: {
    username: string;
    avatar_url: string;
  };
}
const Discover = () => {
  const [talents, setTalents] = useState<Talent[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  useEffect(() => {
    supabase.auth.getSession().then(({
      data: {
        session
      }
    }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });
    const {
      data: {
        subscription
      }
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });
    return () => subscription.unsubscribe();
  }, [navigate]);
  useEffect(() => {
    fetchTalents();
  }, [category]);
  const fetchTalents = async () => {
    let query = supabase.from("talents").select("*").eq("status", "active").order("created_at", {
      ascending: false
    });
    if (category !== "all") {
      query = query.eq("category", category);
    }
    const {
      data,
      error
    } = await query;
    if (error) {
      toast({
        title: "Hata",
        description: "Yetenekler yüklenirken bir hata oluştu",
        variant: "destructive"
      });
    } else if (data) {
      // Fetch profiles for each talent
      const talentsWithProfiles = await Promise.all(data.map(async talent => {
        const {
          data: profile
        } = await supabase.from("profiles").select("username, avatar_url").eq("id", talent.user_id).single();
        return {
          ...talent,
          profiles: profile || {
            username: "Anonim",
            avatar_url: ""
          }
        };
      }));
      setTalents(talentsWithProfiles);
    }
  };
  const handleStartConversation = async (otherUserId: string) => {
    if (!user) return;

    // Sort user IDs to match database constraint (user1_id < user2_id)
    const [user1_id, user2_id] = [user.id, otherUserId].sort();

    // Check if conversation already exists
    const {
      data: existingConversation
    } = await supabase.from("conversations").select("id").eq("user1_id", user1_id).eq("user2_id", user2_id).maybeSingle();
    if (existingConversation) {
      navigate("/mesajlar");
      return;
    }

    // Create new conversation with sorted IDs
    const {
      error
    } = await supabase.from("conversations").insert({
      user1_id,
      user2_id
    }).select().single();
    if (error) {
      toast({
        title: "Hata",
        description: "Konuşma başlatılamadı",
        variant: "destructive"
      });
    } else {
      navigate("/mesajlar");
    }
  };
  const filteredTalents = talents.filter(talent => talent.title.toLowerCase().includes(search.toLowerCase()) || talent.description?.toLowerCase().includes(search.toLowerCase()));
  return <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">🔄 Yetenek Takası Zamanı!</h1>
            <p className="text-lg text-muted-foreground">Bir şey öğren, bir şey öğret. İşte takas böyle çalışır! 🎯</p>
          </div>
          <Button onClick={() => navigate("/profil")} className="hidden md:flex bg-primary hover:bg-primary/90 text-base h-11">
            <Plus className="mr-2 h-5 w-5" />
            🚀 Kendi Takasını Başlat
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="Yetenek ara..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
          </div>
          
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full md:w-[220px]">
              <SelectValue placeholder="📂 Kategori Seç" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">🌟 Tüm Kategoriler</SelectItem>
              <SelectItem value="yazilim">💻 Yazılım</SelectItem>
              <SelectItem value="tasarim">🎨 Tasarım</SelectItem>
              <SelectItem value="muzik">🎵 Müzik</SelectItem>
              <SelectItem value="dil">🗣️ Dil</SelectItem>
              <SelectItem value="spor">⚽ Spor</SelectItem>
              <SelectItem value="egitim">📚 Eğitim</SelectItem>
              <SelectItem value="diger">🔮 Diğer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTalents.map(talent => <Card key={talent.id} className="hover:shadow-lg transition-all hover:scale-[1.02] border-2 hover:border-primary/30">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <p className="text-xs font-semibold text-muted-foreground">
                    👤 {talent.profiles?.username || 'Anonim Kullanıcı'}
                  </p>
                  <Badge variant="secondary" className="text-xs">{talent.category}</Badge>
                </div>
                
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-4 rounded-lg mb-3 border border-primary/20">
                  <p className="text-xs font-semibold text-primary mb-1">✨ Sunuyor:</p>
                  <h3 className="text-lg font-bold text-foreground mb-2">{talent.title}</h3>
                  {talent.description && <p className="text-sm text-muted-foreground line-clamp-2">{talent.description}</p>}
                </div>

                {talent.wanted_talent && <div className="bg-gradient-to-br from-secondary/20 to-secondary/10 p-4 rounded-lg mb-4 border border-secondary/30">
                    <p className="text-xs font-semibold mb-1 text-gray-950">🎯 Karşılığında İstiyor:</p>
                    <p className="text-sm font-medium text-foreground">{talent.wanted_talent}</p>
                  </div>}

                <div className="flex items-center justify-center mb-3 text-2xl">
                  <span className="animate-pulse">⇄</span>
                </div>
                
                <Button className="w-full" onClick={() => handleStartConversation(talent.user_id)} disabled={talent.user_id === user?.id}>
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {talent.user_id === user?.id ? "Kendi İlanın" : "Takas Teklifi Yap"}
                </Button>
              </CardContent>
            </Card>)}
        </div>

        {filteredTalents.length === 0 && <div className="text-center py-16 px-4">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl font-semibold text-foreground mb-2">Henüz bir takas ilanı yok!</p>
            <p className="text-muted-foreground mb-6">Sen ilk takas ilanını oluşturan kişi ol! 🚀</p>
            <Button onClick={() => navigate("/profil")} size="lg" className="text-base">
              <Plus className="mr-2 h-5 w-5" />
              İlk Takası Başlat
            </Button>
          </div>}
      </div>

      {/* Floating Action Button for Mobile */}
      <Button onClick={() => navigate("/profil")} className="md:hidden fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-2xl bg-primary hover:bg-primary/90 z-40 hover:scale-110 transition-transform" size="icon">
        <div className="flex flex-col items-center">
          <Plus className="h-6 w-6" />
          <span className="text-xs">Takas</span>
        </div>
      </Button>
    </div>;
};
export default Discover;