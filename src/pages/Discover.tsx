import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";
import { Search, Plus } from "lucide-react";

interface Item {
  id: string;
  title: string;
  description: string;
  category: string;
  condition: string;
  images: string[];
  created_at: string;
  profiles: {
    username: string;
    location: string;
  };
}

const Discover = () => {
  const [items, setItems] = useState<Item[]>([]);
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
    fetchItems();
  }, [category]);

  const fetchItems = async () => {
    let query = supabase
      .from("items")
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
        description: "Eşyalar yüklenirken bir hata oluştu",
        variant: "destructive",
      });
    } else if (data) {
      // Fetch profiles for each item
      const itemsWithProfiles = await Promise.all(
        data.map(async (item) => {
          const { data: profile } = await supabase
            .from("profiles")
            .select("username, location")
            .eq("id", item.user_id)
            .single();
          
          return {
            ...item,
            profiles: profile || { username: "Anonim", location: "" }
          };
        })
      );
      setItems(itemsWithProfiles);
    }
  };

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Takas Keşfet</h1>
            <p className="text-muted-foreground">Binlerce eşya arasından seçim yapın</p>
          </div>
          
          <Button
            onClick={() => navigate("/profil")}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Eşya Ekle
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Eşya ara..."
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
              <SelectItem value="elektronik">Elektronik</SelectItem>
              <SelectItem value="kitap">Kitap</SelectItem>
              <SelectItem value="oyuncak">Oyuncak</SelectItem>
              <SelectItem value="giyim">Giyim</SelectItem>
              <SelectItem value="ev">Ev Eşyası</SelectItem>
              <SelectItem value="diger">Diğer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="aspect-square bg-muted rounded-md mb-4 flex items-center justify-center">
                  {item.images.length > 0 ? (
                    <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover rounded-md" />
                  ) : (
                    <span className="text-muted-foreground">Fotoğraf yok</span>
                  )}
                </div>
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <CardDescription>
                  {item.description?.substring(0, 100)}
                  {item.description && item.description.length > 100 ? "..." : ""}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>{item.profiles?.username}</span>
                  <span>{item.profiles?.location}</span>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  Detayları Gör
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Eşya bulunamadı</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Discover;
