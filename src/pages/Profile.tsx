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
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Plus, Trash2 } from "lucide-react";
import { profileSchema, talentSchema } from "@/lib/validation";
const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [myTalents, setMyTalents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Form states
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");

  // Talent form states
  const [talentTitle, setTalentTitle] = useState("");
  const [talentDescription, setTalentDescription] = useState("");
  const [talentCategory, setTalentCategory] = useState("");
  const [wantedTalent, setWantedTalent] = useState("");
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
        fetchProfile(session.user.id);
        fetchMyTalents(session.user.id);
      }
    });
  }, [navigate]);
  const fetchProfile = async (userId: string) => {
    const {
      data,
      error
    } = await supabase.from("profiles").select("*").eq("id", userId).single();
    if (data) {
      setProfile(data);
      setFullName(data.full_name || "");
      setBio(data.bio || "");
      setLocation(data.location || "");
    }
  };
  const fetchMyTalents = async (userId: string) => {
    const {
      data,
      error
    } = await supabase.from("talents").select("*").eq("user_id", userId).order("created_at", {
      ascending: false
    });
    if (data) {
      setMyTalents(data);
    }
  };
  const handleUpdateProfile = async () => {
    setLoading(true);

    // Validate input
    const validation = profileSchema.safeParse({
      full_name: fullName,
      bio,
      location
    });
    if (!validation.success) {
      const firstError = validation.error.errors[0];
      toast({
        title: "Geçersiz Giriş",
        description: firstError.message,
        variant: "destructive"
      });
      setLoading(false);
      return;
    }
    const {
      error
    } = await supabase.from("profiles").update({
      full_name: fullName,
      bio,
      location
    }).eq("id", user.id);
    if (error) {
      toast({
        title: "Hata",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Başarılı",
        description: "Profiliniz güncellendi"
      });
      fetchProfile(user.id);
    }
    setLoading(false);
  };
  const handleAddTalent = async () => {
    setLoading(true);

    // Validate input
    const validation = talentSchema.safeParse({
      title: talentTitle,
      description: talentDescription,
      category: talentCategory,
      wanted_talent: wantedTalent
    });
    if (!validation.success) {
      const firstError = validation.error.errors[0];
      toast({
        title: "Geçersiz Giriş",
        description: firstError.message,
        variant: "destructive"
      });
      setLoading(false);
      return;
    }
    const {
      error
    } = await supabase.from("talents").insert({
      user_id: user.id,
      title: talentTitle,
      description: talentDescription,
      category: talentCategory,
      wanted_talent: wantedTalent
    });
    if (error) {
      toast({
        title: "Hata",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Başarılı",
        description: "Yetenek eklendi"
      });
      setDialogOpen(false);
      setTalentTitle("");
      setTalentDescription("");
      setTalentCategory("");
      setWantedTalent("");
      fetchMyTalents(user.id);
    }
    setLoading(false);
  };
  const handleDeleteTalent = async (talentId: string) => {
    const {
      error
    } = await supabase.from("talents").update({
      status: "deleted"
    }).eq("id", talentId);
    if (error) {
      toast({
        title: "Hata",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Başarılı",
        description: "Yetenek silindi"
      });
      fetchMyTalents(user.id);
    }
  };
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };
  return <div className="min-h-screen bg-background">
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
            <TabsTrigger value="talents">Yeteneklerim</TabsTrigger>
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
                  <Input id="username" value={profile?.username || ""} disabled className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="fullName">Ad Soyad</Label>
                  <Input id="fullName" value={fullName} onChange={e => setFullName(e.target.value)} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="location">Konum</Label>
                  <Input id="location" value={location} onChange={e => setLocation(e.target.value)} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="bio">Hakkımda</Label>
                  <Textarea id="bio" value={bio} onChange={e => setBio(e.target.value)} className="mt-1" rows={4} />
                </div>
                <Button onClick={handleUpdateProfile} disabled={loading}>
                  Kaydet
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="talents" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Yeteneklerim</h2>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Yetenek Ekle
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-2xl">🔄 Yetenek Takası Başlat!</DialogTitle>
                    <DialogDescription className="text-base">
                      Bir yeteneğini paylaş, başka bir yetenek öğren. İşte takas böyle başlar! 🎉
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-5">
                    <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                      <Label htmlFor="talentTitle" className="text-base font-semibold">✨ Sunduğun Yetenek</Label>
                      <Input id="talentTitle" value={talentTitle} onChange={e => setTalentTitle(e.target.value)} className="mt-2" placeholder="Örn: Web Tasarımı, Fotoğrafçılık, Gitar Dersi" />
                    </div>
                    
                    <div>
                      <Label htmlFor="talentCategory" className="text-base font-semibold">📂 Kategori</Label>
                      <Select value={talentCategory} onValueChange={setTalentCategory}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Yeteneğinin kategorisini seç" />
                        </SelectTrigger>
                        <SelectContent>
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
                    
                    <div className="bg-secondary/30 p-4 rounded-lg border border-secondary/40">
                      <Label htmlFor="wantedTalent" className="text-base font-semibold">🎯 Karşılığında İstediğin Yetenek</Label>
                      <Input id="wantedTalent" value={wantedTalent} onChange={e => setWantedTalent(e.target.value)} className="mt-2" placeholder="Örn: İngilizce konuşma, Yemek tarifi, Yoga dersi" />
                    </div>
                    
                    <Button onClick={handleAddTalent} disabled={loading} className="w-full text-base h-12">
                      🚀 Takas İlanını Yayınla
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myTalents.filter(t => t.status === 'active').map(talent => <Card key={talent.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{talent.title}</CardTitle>
                      <Badge variant="secondary">{talent.category}</Badge>
                    </div>
                    <CardDescription className="line-clamp-3">{talent.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="destructive" size="sm" className="w-full" onClick={() => handleDeleteTalent(talent.id)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Sil
                    </Button>
                  </CardContent>
                </Card>)}
            </div>

            {myTalents.filter(t => t.status === 'active').length === 0 && <div className="text-center py-12">
                <p className="text-muted-foreground">Henüz yetenek eklenmemiş</p>
              </div>}
          </TabsContent>
        </Tabs>
      </div>
    </div>;
};
export default Profile;