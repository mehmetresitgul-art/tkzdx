import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";
import { messageSchema } from "@/lib/validation";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  content: string;
  sender_id: string;
  created_at: string;
}

interface Conversation {
  id: string;
  user1_id: string;
  user2_id: string;
  profiles: {
    username: string;
    avatar_url: string;
  };
  unread_count?: number;
}

const Chat = () => {
  const [user, setUser] = useState<any>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
        fetchConversations(session.user.id);
      }
    });
  }, [navigate]);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation);
      
      const channel = supabase
        .channel('messages')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'messages',
            filter: `conversation_id=eq.${selectedConversation}`,
          },
          (payload) => {
            setMessages((prev) => [...prev, payload.new as Message]);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [selectedConversation]);

  const fetchConversations = async (userId: string) => {
    const { data, error } = await supabase
      .from("conversations")
      .select("*")
      .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)
      .order("updated_at", { ascending: false });

    if (data && data.length > 0) {
      // Collect all unique user IDs
      const userIds = [...new Set(
        data.map(conv => conv.user1_id === userId ? conv.user2_id : conv.user1_id)
      )];

      // Fetch all profiles in one query
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, username, avatar_url")
        .in("id", userIds);

      // Map profiles to conversations
      const profilesMap = new Map(
        profiles?.map(p => [p.id, p]) || []
      );

      // Fetch unread message counts for all conversations
      const { data: unreadCounts } = await supabase
        .from("messages")
        .select("conversation_id")
        .in("conversation_id", data.map(c => c.id))
        .eq("is_read", false)
        .neq("sender_id", userId);

      // Count unread messages per conversation
      const unreadMap = new Map<string, number>();
      unreadCounts?.forEach(msg => {
        unreadMap.set(msg.conversation_id, (unreadMap.get(msg.conversation_id) || 0) + 1);
      });

      const conversationsWithProfiles = data.map(conv => {
        const otherUserId = conv.user1_id === userId ? conv.user2_id : conv.user1_id;
        const profile = profilesMap.get(otherUserId);
        
        return {
          ...conv,
          profiles: profile || { username: "Kullanıcı", avatar_url: "" },
          unread_count: unreadMap.get(conv.id) || 0
        };
      });

      setConversations(conversationsWithProfiles);

      // Auto-select conversation from URL parameters
      const conversationId = searchParams.get("conversationId");
      const targetUserId = searchParams.get("userId");
      
      if (conversationId) {
        setSelectedConversation(conversationId);
      } else if (targetUserId) {
        // Find conversation with this user
        const targetConversation = conversationsWithProfiles.find(
          conv => conv.user1_id === targetUserId || conv.user2_id === targetUserId
        );
        if (targetConversation) {
          setSelectedConversation(targetConversation.id);
        }
      }
    }
  };

  const fetchMessages = async (conversationId: string) => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });

    if (data) {
      setMessages(data);
    }
  };

  const handleSendMessage = async () => {
    if (!selectedConversation || !user) return;

    // Validate input
    const validation = messageSchema.safeParse({
      content: newMessage,
    });

    if (!validation.success) {
      const firstError = validation.error.errors[0];
      toast({
        title: "Geçersiz Mesaj",
        description: firstError.message,
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase
      .from("messages")
      .insert({
        conversation_id: selectedConversation,
        sender_id: user.id,
        content: newMessage.trim(),
      });

    if (error) {
      toast({
        title: "Hata",
        description: "Mesaj gönderilemedi",
        variant: "destructive",
      });
    } else {
      setNewMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-foreground">Mesajlar</h1>
          {selectedConversation && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedConversation(null)}
              className="md:hidden"
            >
              Geri
            </Button>
          )}
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          {!selectedConversation ? (
            <Card>
              <CardContent className="p-0">
                <ScrollArea className="h-[calc(100vh-200px)]">
                  {conversations.length === 0 ? (
                    <div className="p-6 text-center text-muted-foreground">
                      Henüz konuşma yok
                    </div>
                  ) : (
                    conversations.map((conv) => (
                      <div
                        key={conv.id}
                        onClick={() => setSelectedConversation(conv.id)}
                        className="p-4 border-b cursor-pointer hover:bg-accent transition-all duration-200 active:bg-accent/80 touch-manipulation"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={conv.profiles?.avatar_url} />
                            <AvatarFallback>
                              {conv.profiles?.username?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="font-semibold">{conv.profiles?.username}</p>
                              {conv.unread_count && conv.unread_count > 0 && (
                                <Badge variant="default" className="ml-2">
                                  {conv.unread_count}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Son mesaj
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-0 flex flex-col h-[calc(100vh-200px)]">
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.sender_id === user?.id
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[75%] rounded-lg p-3 transition-all duration-200 ${
                            message.sender_id === user?.id
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <p>{message.content}</p>
                          <p className="text-xs mt-1 opacity-70">
                            {new Date(message.created_at).toLocaleTimeString("tr-TR", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="p-4 border-t bg-background">
                  <div className="flex gap-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Mesajınızı yazın..."
                      className="transition-all duration-200"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 h-[600px]">
          <Card className="md:col-span-1">
            <CardContent className="p-0">
              <ScrollArea className="h-[600px]">
                {conversations.length === 0 ? (
                  <div className="p-6 text-center text-muted-foreground">
                    Henüz konuşma yok
                  </div>
                ) : (
                  conversations.map((conv) => (
                    <div
                      key={conv.id}
                      onClick={() => setSelectedConversation(conv.id)}
                      className={`p-4 border-b cursor-pointer hover:bg-accent transition-all duration-200 ${
                        selectedConversation === conv.id ? "bg-accent" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={conv.profiles?.avatar_url} />
                          <AvatarFallback>
                            {conv.profiles?.username?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-semibold">{conv.profiles?.username}</p>
                            {conv.unread_count && conv.unread_count > 0 && (
                              <Badge variant="default" className="ml-2">
                                {conv.unread_count}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Son mesaj
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </ScrollArea>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            {selectedConversation ? (
              <CardContent className="p-0 flex flex-col h-[600px]">
                <ScrollArea className="flex-1 p-6">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.sender_id === user?.id
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg p-3 transition-all duration-200 ${
                            message.sender_id === user?.id
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <p>{message.content}</p>
                          <p className="text-xs mt-1 opacity-70">
                            {new Date(message.created_at).toLocaleTimeString("tr-TR", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Mesajınızı yazın..."
                      className="transition-all duration-200"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            ) : (
              <CardContent className="flex items-center justify-center h-[600px]">
                <p className="text-muted-foreground">
                  Bir konuşma seçin veya yeni bir konuşma başlatın
                </p>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Chat;
