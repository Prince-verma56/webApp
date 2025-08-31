import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  User,
  Bell,
  Settings,
  Bookmark,
  Plus,
  Heart,
  MessageCircle,
  Share2,
  Users,
  Zap,
  ChevronRight,
} from "lucide-react";

// ✅ Small helper fixed
function formatCount(n) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n;
}

// Post component (improved)
function BlogPost({ post }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ translateY: -6 }}
      className="rounded-2xl"
    >
      <Card className="overflow-hidden rounded-2xl border bg-white shadow-sm transition-shadow hover:shadow-lg">
        <CardHeader className="flex items-start justify-between gap-4 py-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.avatar} alt={post.author} />
              <AvatarFallback>{post.author?.[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold">{post.author}</h3>
                <Badge variant="subtle" className="text-xs">
                  {post.community}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{post.time}</p>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">•••</div>
        </CardHeader>

        <CardContent className="pt-0">
          <p className="text-sm text-slate-800 leading-relaxed">{post.content}</p>
          {post.image && (
            <div className="mt-4 overflow-hidden rounded-xl">
              <img src={post.image} alt="post media" className="w-full object-cover" />
            </div>
          )}

          <div className="mt-4 flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-muted-foreground hover:text-red-600 focus:outline-none">
                <Heart className="h-4 w-4" />
                <span>{formatCount(post.likes)}</span>
              </button>
              <button className="flex items-center gap-2 text-muted-foreground hover:text-blue-600 focus:outline-none">
                <MessageCircle className="h-4 w-4" />
                <span>{formatCount(post.comments)}</span>
              </button>
              <button className="flex items-center gap-2 text-muted-foreground hover:text-green-600 focus:outline-none">
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </button>
            </div>
            <div className="text-xs text-muted-foreground">{formatCount(post.views)} views</div>
          </div>
        </CardContent>
      </Card>
    </motion.article>
  );
}

function Sidebar({ expanded }) {
  const items = [
    { icon: Home, label: "Home" },
    { icon: User, label: "Profile" },
    { icon: Bell, label: "Notifications" },
    { icon: Bookmark, label: "Saved" },
    { icon: Settings, label: "Settings" },
  ];

  return (
    <motion.aside
      animate={{ width: expanded ? 220 : 72 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="relative z-20 flex h-screen flex-col border-r bg-white"
    >
      <div className="flex flex-col gap-2 p-3">
        {items.map(({ icon: Icon, label }) => (
          <button
            key={label}
            aria-label={label}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-slate-50 focus:outline-none",
              "transition-colors"
            )}
          >
            <Icon className="h-5 w-5 text-slate-700" />
            {expanded && <span className="text-slate-800">{label}</span>}
          </button>
        ))}
      </div>
      <div className="mt-auto p-3">
        <Button variant="outline" className="w-full">
          {expanded ? "Upgrade" : <Plus className="h-4 w-4" />}
        </Button>
      </div>
    </motion.aside>
  );
}

function PostComposer({ onPost }) {
  const [text, setText] = useState("");
  return (
    <Card className="rounded-2xl border bg-white shadow-sm">
      <CardContent className="space-y-3">
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="https://placehold.co/40x40" alt="you" />
            <AvatarFallback>Y</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Share something with the community..."
              className="h-11"
            />
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">📎 Attach</span>
                <span className="inline-flex items-center gap-1">🖼 Image</span>
              </div>
              <div>
                <Button
                  onClick={() => {
                    if (!text.trim()) return;
                    onPost({
                      title: "",
                      author: "You",
                      avatar: "https://placehold.co/40x40",
                      content: text,
                      image: null,
                      community: "Your feed",
                      time: "Just now",
                      likes: 0,
                      comments: 0,
                      views: 1,
                    });
                    setText("");
                  }}
                >
                  Post
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function RightRail({ communities }) {
  return (
    <aside className="hidden w-80 flex-col gap-4 p-4 lg:flex">
      <Card className="rounded-2xl border bg-white shadow-sm">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">Popular communities</CardTitle>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-3">
          {communities.map((c) => (
            <div key={c.id} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={c.avatar} alt={c.name} />
                  <AvatarFallback>{c.name?.[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-semibold">{c.name}</div>
                  <div className="text-xs text-muted-foreground">{formatCount(c.members)} members</div>
                </div>
              </div>
              <Button size="sm" variant="ghost">
                Join
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="rounded-2xl border bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm">Trending</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Zap className="h-4 w-4" /> <span>Design patterns</span>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}

export default function BlogPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [posts, setPosts] = useState([
    {
      title: "First Blog Post",
      author: "Alex",
      avatar: "https://placehold.co/40x40",
      content: "This is a sample blog post with an image and reactions.",
      image: "https://placehold.co/800x420",
      community: "Design",
      time: "2h",
      likes: 123,
      comments: 12,
      views: 1400,
    },
    {
      title: "Second Post",
      author: "Sam",
      avatar: "https://placehold.co/40x40",
      content: "Another example entry with just text.",
      image: null,
      community: "Engineering",
      time: "1d",
      likes: 54,
      comments: 8,
      views: 900,
    },
  ]);

  const communities = [
    { id: 1, name: "Design", avatar: "https://placehold.co/40x40/8b5cf6/ffffff", members: 12000 },
    { id: 2, name: "Product", avatar: "https://placehold.co/40x40/f97316/ffffff", members: 8200 },
    { id: 3, name: "Engineering", avatar: "https://placehold.co/40x40/06b6d4/ffffff", members: 15400 },
  ];

  const addNewPost = (p) => setPosts((s) => [p, ...s]);

  return (
    <div className="flex min-h-screen bg-gray-50 text-slate-900">
      {/* Sidebar */}
      <div
        onMouseEnter={() => setSidebarOpen(true)}
        onMouseLeave={() => setSidebarOpen(false)}
        className="sticky top-0 h-screen"
      >
        <Sidebar expanded={sidebarOpen} />
      </div>

      {/* Center + right rail container */}
      <div className="flex flex-1 gap-6 p-6">
        {/* Center column */}
        <main className="mx-auto w-full max-w-2xl space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Home</h1>
            <div className="flex items-center gap-3">
              <Button variant="ghost">Explore</Button>
              <Button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Top</Button>
            </div>
          </div>

          <PostComposer onPost={addNewPost} />

          <ScrollArea className="h-[calc(100vh-220px)] space-y-6 pr-4">
            <AnimatePresence>
              {posts.map((post, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  <BlogPost post={post} />
                </motion.div>
              ))}
            </AnimatePresence>
          </ScrollArea>
        </main>

        {/* Right Rail (desktop only) */}
        <RightRail communities={communities} />
      </div>

      {/* Top floating card (new) */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="fixed top-6 right-6 z-40 hidden md:block"
      >
        <Card className="rounded-2xl border bg-white shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <h4 className="text-sm font-semibold">Create post</h4>
                <p className="text-xs text-muted-foreground">Share an update with your communities</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Button size="sm" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                  New
                </Button>
                <Button size="sm" variant="ghost">
                  Manage
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Bottom-right floating quick actions (existing) */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-6 right-6 z-30 md:right-28"
      >
        <Card className="rounded-2xl border bg-white shadow-lg">
          <CardContent className="p-4 flex flex-col gap-2">
            <Button variant="secondary">Quick Action 1</Button>
            <Button variant="secondary">Quick Action 2</Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
