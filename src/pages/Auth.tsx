import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/takazade-logo.png";
import { authSchema } from "@/lib/validation";
import type { Session } from "@supabase/supabase-js";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        
        // Redirect to discover page when user signs in
        if (event === 'SIGNED_IN' && currentSession) {
          navigate("/kesfet");
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: existingSession } }) => {
      setSession(existingSession);
      if (existingSession) {
        navigate("/kesfet");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate input
      const validationData = isLogin 
        ? { email, password }
        : { email, password, username };
      
      const validation = authSchema.safeParse(validationData);
      if (!validation.success) {
        const firstError = validation.error.errors[0];
        toast({
          title: "Geçersiz Giriş",
          description: firstError.message,
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        toast({
          title: "Giriş başarılı!",
          description: "Hoş geldiniz.",
        });
        navigate("/kesfet");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username,
            },
            emailRedirectTo: `${window.location.origin}/`,
          },
        });

        if (error) throw error;

        toast({
          title: "Kayıt başarılı!",
          description: "Hesabınız oluşturuldu.",
        });
        navigate("/kesfet");
      }
    } catch (error: any) {
      toast({
        title: "Hata",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <img src={logo} alt="Takazade" className="h-12 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-foreground">
            {isLogin ? "Giriş Yap" : "Üye Ol"}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {isLogin
              ? "Hesabınıza giriş yapın"
              : "Yeni hesap oluşturun"}
          </p>
        </div>

        <div className="space-y-6">
          <form onSubmit={handleAuth} className="space-y-6">
            {!isLogin && (
              <div>
                <Label htmlFor="username">Kullanıcı Adı</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required={!isLogin}
                  className="mt-1"
                />
              </div>
            )}

            <div>
              <Label htmlFor="email">E-posta</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="password">Şifre</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 touch-manipulation active:scale-95"
              disabled={loading}
            >
              {loading ? "Yükleniyor..." : isLogin ? "Giriş Yap" : "Üye Ol"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              {isLogin ? "Hesabınız yok mu?" : "Zaten hesabınız var mı?"}{" "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary hover:underline"
              >
                {isLogin ? "Üye Ol" : "Giriş Yap"}
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
