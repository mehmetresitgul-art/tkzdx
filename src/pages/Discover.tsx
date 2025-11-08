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
import { Search, MessageCircle } from "lucide-react";

interface Talent {
  id: string;
  title: string;
  description: string;
  category: string;
  user_id: string;
  created_at: string;
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
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
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
    let query = supabase
      .from("talents")
      .select("*")
      .eq("status", "active")
      .order("created_at", { ascending: false });

    if (category !== "all") {
      query = query.eq("category", category);
    }

    const { data, error } = await query;

    if (error) {
      toast({
        title: "Hata",
        description: "Yetenekler yüklenirken bir hata oluştu",
        variant: "destructive",
      });
    } else if (data) {
      // Fetch profiles for each talent
      const talentsWithProfiles = await Promise.all(
        data.map(async (talent) => {
          const { data: profile } = await supabase
            .from("profiles")
            .select("username, avatar_url")
            .eq("id", talent.user_id)
            .single();
          
          return {
            ...talent,
            profiles: profile || { username: "Anonim", avatar_url: "" }
          };
        })
      );
      setTalents(talentsWithProfiles);
    }
  };

  const handleStartConversation = async (otherUserId: string) => {
    if (!user) return;

    // Check if conversation already exists
    const { data: existingConversation } = await supabase
      .from("conversations")
      .select("id")
      .or(`and(user1_id.eq.${user.id},user2_id.eq.${otherUserId}),and(user1_id.eq.${otherUserId},user2_id.eq.${user.id})`)
      .single();

    if (existingConversation) {
      navigate("/mesajlar");
      return;
    }

    // Create new conversation
    const { data: newConversation, error } = await supabase
      .from("conversations")
      .insert({
        user1_id: user.id,
        user2_id: otherUserId,
      })
      .select()
      .single();

    if (error) {
      toast({
        title: "Hata",
        description: "Konuşma başlatılamadı",
        variant: "destructive",
      });
    } else {
      navigate("/mesajlar");
    }
  };

  const filteredTalents = talents.filter((talent) =>
    talent.title.toLowerCase().includes(search.toLowerCase()) ||
    talent.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Yetenekleri Keşfet</h1>
            <p className="text-muted-foreground">Öğrenmek istediğin yeteneklere sahip kişileri bul</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Yetenek ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Kategoriler</SelectItem>
              <SelectItem value="yazilim">Yazılım</SelectItem>
              <SelectItem value="tasarim">Tasarım</SelectItem>
              <SelectItem value="muzik">Müzik</SelectItem>
              <SelectItem value="dil">Dil</SelectItem>
              <SelectItem value="spor">Spor</SelectItem>
              <SelectItem value="egitim">Eğitim</SelectItem>
              <SelectItem value="diger">Diğer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTalents.map((talent) => (
            <Card key={talent.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{talent.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {talent.profiles?.username || 'Anonim Kullanıcı'}
                    </p>
                  </div>
                  <Badge variant="secondary">{talent.category}</Badge>
                </div>
                <p className="text-muted-foreground mb-4 line-clamp-3">{talent.description}</p>
                <Button 
                  className="w-full" 
                  onClick={() => handleStartConversation(talent.user_id)}
                  disabled={talent.user_id === user?.id}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Mesaj Gönder
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTalents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Yetenek bulunamadı</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Discover;
