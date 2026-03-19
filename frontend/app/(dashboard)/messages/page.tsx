"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Empty } from "@/components/ui/empty"
import { messages as initialMessages, currentUser } from "@/lib/data"
import { 
  Send,
  Search,
  ArrowLeft,
  MessageSquare,
  MoreVertical,
  Phone,
  Video
} from "lucide-react"
import { cn } from "@/lib/utils"

type Message = {
  id: string
  senderId: string
  text: string
  timestamp: string
}

type Conversation = {
  id: string
  recipientId: string
  recipientName: string
  recipientAvatar: string
  lastMessage: string
  timestamp: string
  unread: boolean
  messages: Message[]
}

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>(initialMessages)
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [showMobileChat, setShowMobileChat] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const filteredConversations = conversations.filter(conv =>
    conv.recipientName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (selectedConversation) {
      scrollToBottom()
    }
  }, [selectedConversation?.messages])

  const handleSelectConversation = (conv: Conversation) => {
    // Mark as read
    setConversations(prev => 
      prev.map(c => c.id === conv.id ? { ...c, unread: false } : c)
    )
    setSelectedConversation({ ...conv, unread: false })
    setShowMobileChat(true)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !selectedConversation) return

    const newMsg: Message = {
      id: `m${Date.now()}`,
      senderId: 'me',
      text: newMessage.trim(),
      timestamp: 'Just now'
    }

    const updatedConversation = {
      ...selectedConversation,
      messages: [...selectedConversation.messages, newMsg],
      lastMessage: newMessage.trim(),
      timestamp: 'Just now'
    }

    setSelectedConversation(updatedConversation)
    setConversations(prev =>
      prev.map(c => c.id === selectedConversation.id ? updatedConversation : c)
    )
    setNewMessage("")
  }

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-7rem)]">
      <Card className="bg-card border-border h-full overflow-hidden">
        <div className="flex h-full">
          {/* Conversation List */}
          <div className={cn(
            "w-full md:w-80 lg:w-96 border-r border-border flex flex-col",
            showMobileChat && "hidden md:flex"
          )}>
            {/* Header */}
            <div className="p-4 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Messages</h2>
              <div className="relative mt-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-input border-border"
                />
              </div>
            </div>

            {/* Conversations */}
            <ScrollArea className="flex-1">
              {filteredConversations.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  No conversations found
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {filteredConversations.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => handleSelectConversation(conv)}
                      className={cn(
                        "w-full p-4 flex items-start gap-3 hover:bg-secondary/50 transition-colors text-left",
                        selectedConversation?.id === conv.id && "bg-secondary/50"
                      )}
                    >
                      <div className="relative">
                        <img
                          src={conv.recipientAvatar}
                          alt={conv.recipientName}
                          className="h-12 w-12 rounded-full ring-2 ring-border"
                        />
                        {conv.unread && (
                          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-accent border-2 border-card" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className={cn(
                            "font-medium text-foreground truncate",
                            conv.unread && "font-semibold"
                          )}>
                            {conv.recipientName}
                          </p>
                          <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                            {conv.timestamp}
                          </span>
                        </div>
                        <p className={cn(
                          "text-sm truncate mt-0.5",
                          conv.unread ? "text-foreground" : "text-muted-foreground"
                        )}>
                          {conv.lastMessage}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>

          {/* Chat Area */}
          <div className={cn(
            "flex-1 flex flex-col",
            !showMobileChat && "hidden md:flex"
          )}>
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-border flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    onClick={() => setShowMobileChat(false)}
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <img
                    src={selectedConversation.recipientAvatar}
                    alt={selectedConversation.recipientName}
                    className="h-10 w-10 rounded-full ring-2 ring-border"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">
                      {selectedConversation.recipientName}
                    </p>
                    <p className="text-xs text-muted-foreground">Online</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                      <Phone className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                      <Video className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {selectedConversation.messages.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          "flex",
                          message.senderId === 'me' ? "justify-end" : "justify-start"
                        )}
                      >
                        <div className={cn(
                          "max-w-[70%] rounded-2xl px-4 py-2",
                          message.senderId === 'me' 
                            ? "bg-accent text-accent-foreground rounded-br-md" 
                            : "bg-secondary text-foreground rounded-bl-md"
                        )}>
                          <p className="text-sm">{message.text}</p>
                          <p className={cn(
                            "text-xs mt-1",
                            message.senderId === 'me' ? "text-accent-foreground/70" : "text-muted-foreground"
                          )}>
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <form onSubmit={handleSendMessage} className="p-4 border-t border-border">
                  <div className="flex gap-3">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1 bg-input border-border"
                    />
                    <Button 
                      type="submit" 
                      disabled={!newMessage.trim()}
                      className="bg-accent text-accent-foreground hover:bg-accent/90"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <Empty>
                  <Empty.Icon>
                    <MessageSquare className="h-10 w-10 text-muted-foreground" />
                  </Empty.Icon>
                  <Empty.Title>No conversation selected</Empty.Title>
                  <Empty.Description>
                    Choose a conversation from the list to start messaging.
                  </Empty.Description>
                </Empty>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
