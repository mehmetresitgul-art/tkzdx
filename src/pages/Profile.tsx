import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Plus, Edit, Trash2 } from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [myItems, setMyItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Form states
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  
  // Item form states
  const [itemTitle, setItemTitle] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [itemCondition, setItemCondition] = useState("");

  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
        fetchProfile(session.user.id);
        fetchMyItems(session.user.id);
      }
    });
  }, [navigate]);

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (data) {
      setProfile(data);
      setFullName(data.full_name || "");
      setBio(data.bio || "");
      setLocation(data.location || "");
    }
  };

  const fetchMyItems = async (userId: string) => {
    const { data, error } = await supabase
      .from("items")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (data) {
      setMyItems(data);
    }
  };

  const handleUpdateProfile = async () => {
    setLoading(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName,
        bio,
        location,
      })
      .eq("id", user.id);

    if (error) {
      toast({
        title: "Hata",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Başarılı",
        description: "Profiliniz güncellendi",
      });
      fetchProfile(user.id);
    }
    setLoading(false);
  };

  const handleAddItem = async () => {
    setLoading(true);
    const { error } = await supabase
      .from("items")
      .insert({
        user_id: user.id,
        title: itemTitle,
        description: itemDescription,
        category: itemCategory,
        condition: itemCondition,
      });

    if (error) {
      toast({
        title: "Hata",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Başarılı",
        description: "Eşya eklendi",
      });
      setDialogOpen(false);
      setItemTitle("");
      setItemDescription("");
      setItemCategory("");
      setItemCondition("");
      fetchMyItems(user.id);
    }
    setLoading(false);
  };

  const handleDeleteItem = async (itemId: string) => {
    const { error } = await supabase
      .from("items")
      .update({ status: "deleted" })
      .eq("id", itemId);

    if (error) {
      toast({
        title: "Hata",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Başarılı",
        description: "Eşya silindi",
      });
      fetchMyItems(user.id);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-foreground">Profilim</h1>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            Çıkış Yap
          </Button>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">Profil Bilgileri</TabsTrigger>
            <TabsTrigger value="items">Eşyalarım</TabsTrigger>
            <TabsTrigger value="exchanges">Takas İstekleri</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Profil Bilgilerim</CardTitle>
                <CardDescription>Kişisel bilgilerinizi düzenleyin</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="username">Kullanıcı Adı</Label>
                  <Input
                    id="username"
                    value={profile?.username || ""}
                    disabled
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="fullName">Ad Soyad</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Konum</Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="bio">Hakkımda</Label>
                  <Textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="mt-1"
                    rows={4}
                  />
                </div>
                <Button onClick={handleUpdateProfile} disabled={loading}>
                  Kaydet
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="items" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Eşyalarım</h2>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Eşya Ekle
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Yeni Eşya Ekle</DialogTitle>
                    <DialogDescription>
                      Takas için sunmak istediğiniz eşyayı ekleyin
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="itemTitle">Başlık</Label>
                      <Input
                        id="itemTitle"
                        value={itemTitle}
                        onChange={(e) => setItemTitle(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="itemDescription">Açıklama</Label>
                      <Textarea
                        id="itemDescription"
                        value={itemDescription}
                        onChange={(e) => setItemDescription(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="itemCategory">Kategori</Label>
                      <Select value={itemCategory} onValueChange={setItemCategory}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Kategori seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="elektronik">Elektronik</SelectItem>
                          <SelectItem value="kitap">Kitap</SelectItem>
                          <SelectItem value="oyuncak">Oyuncak</SelectItem>
                          <SelectItem value="giyim">Giyim</SelectItem>
                          <SelectItem value="ev">Ev Eşyası</SelectItem>
                          <SelectItem value="diger">Diğer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="itemCondition">Durum</Label>
                      <Select value={itemCondition} onValueChange={setItemCondition}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Durum seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yeni">Yeni</SelectItem>
                          <SelectItem value="iyi">İyi</SelectItem>
                          <SelectItem value="orta">Orta</SelectItem>
                          <SelectItem value="kullanilmis">Kullanılmış</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={handleAddItem} disabled={loading} className="w-full">
                      Ekle
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myItems.map((item) => (
                <Card key={item.id}>
                  <CardHeader>
                    <div className="aspect-square bg-muted rounded-md mb-4 flex items-center justify-center">
                      <span className="text-muted-foreground">Fotoğraf yok</span>
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="exchanges">
            <Card>
              <CardHeader>
                <CardTitle>Takas İstekleri</CardTitle>
                <CardDescription>Gelen ve giden takas istekleriniz</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Henüz takas isteği bulunmuyor.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
