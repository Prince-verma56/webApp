import React, { useState, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  Trash2,
  XCircle,
  Image as ImageIcon,
  Link as LinkIcon,
} from "lucide-react";

// ✅ Small helper fixed
function formatCount(n) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n;
}

// Post component (improved)
const BlogPost = forwardRef(({ post, onDelete }, ref) => {
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <motion.article
      layout
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      whileHover={{ translateY: -6 }}
      className="rounded-2xl cursor-pointer"
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
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsDeleting(true);
                onDelete(post.id);
              }}
              aria-label="Delete post"
              className="text-muted-foreground hover:text-red-500 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <h2 className="text-md font-semibold mb-2">{post.title}</h2>
          <p className="text-sm text-slate-800 leading-relaxed">{post.content}</p>
          {post.image && (
            <div className="mt-4 overflow-hidden rounded-xl">
              <img src={post.image} alt="post media" className="w-full object-cover" />
            </div>
          )}

          <div className="mt-4 flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-muted-foreground hover:text-red-600 focus:outline-none transition-colors">
                <Heart className="h-4 w-4" />
                <span>{formatCount(post.likes)}</span>
              </button>
              <button className="flex items-center gap-2 text-muted-foreground hover:text-blue-600 focus:outline-none transition-colors">
                <MessageCircle className="h-4 w-4" />
                <span>{formatCount(post.comments)}</span>
              </button>
              <button className="flex items-center gap-2 text-muted-foreground hover:text-green-600 focus:outline-none transition-colors">
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
});

function Sidebar({ expanded, activePage, onSelectPage }) {
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
            onClick={() => onSelectPage(label)}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors focus:outline-none",
              activePage === label
                ? "bg-slate-100 text-slate-900 font-semibold"
                : "hover:bg-slate-50 text-slate-700"
            )}
          >
            <Icon className="h-5 w-5" />
            {expanded && <span className="text-slate-800">{label}</span>}
          </button>
        ))}
      </div>
      <div className="mt-auto p-3">
        <Button
          variant="gradient"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
        >
          {expanded ? "Upgrade" : <Plus className="h-4 w-4" />}
        </Button>
      </div>
    </motion.aside>
  );
}

function PostComposer({ onPost, onClose }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!content.trim()) return;
    onPost({
      id: Date.now(),
      title: title || "New Post",
      author: "You",
      avatar: "https://placehold.co/40x40",
      content: content,
      image: image || null,
      community: "Your feed",
      time: "Just now",
      likes: 0,
      comments: 0,
      views: 1,
    });
    setTitle("");
    setContent("");
    setImage("");
    onClose();
  };

  return (
    <Card className="rounded-2xl border bg-white shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Create new post</CardTitle>
        <button onClick={onClose} className="text-slate-500 hover:text-slate-900 transition-colors">
          <XCircle className="h-6 w-6" />
        </button>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title (optional)"
          className="h-10 rounded-xl"
        />
        <Input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share something with the community..."
          className="h-12 rounded-xl"
        />
        <div className="flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-1 text-xs text-muted-foreground hover:text-slate-900 transition-colors">
            <ImageIcon className="h-4 w-4" /> Upload Image
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>
          <div className="text-sm text-muted-foreground">or</div>
          <Input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Paste image URL (optional)"
            className="h-10 rounded-xl flex-1"
          />
        </div>
        
        {image && (
          <div className="relative mt-4 rounded-xl overflow-hidden">
            <img src={image} alt="preview" className="w-full object-cover rounded-xl" />
            <Button onClick={() => setImage('')} size="sm" variant="destructive" className="absolute top-2 right-2 rounded-full">
              <XCircle className="h-4 w-4" />
            </Button>
          </div>
        )}

        <div className="flex items-center justify-end">
          <Button
            onClick={handleSubmit}
            className="rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
          >
            Post
          </Button>
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

function HomePage({ posts, addNewPost, deletePost, setIsComposing, isComposing }) {
  return (
    <main className="mx-auto w-full max-w-2xl space-y-6 overflow-y-auto h-full">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Blogs</h1>
        <div className="flex items-center gap-3">
          <Button onClick={() => setIsComposing(true)} className="rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg">
            <Plus className="h-4 w-4 mr-2" /> New Post
          </Button>
        </div>
      </div>
      <AnimatePresence>
        {isComposing && (
          <motion.div
            key="composer"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <PostComposer onPost={addNewPost} onClose={() => setIsComposing(false)} />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="space-y-6">
        <AnimatePresence mode="popLayout">
          {posts.map((post) => (
            <BlogPost key={post.id} post={post} onDelete={deletePost} />
          ))}
        </AnimatePresence>
      </div>
    </main>
  );
}

function OtherPage({ title }) {
  return (
    <main className="mx-auto w-full max-w-2xl space-y-6">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <Card className="rounded-2xl border bg-white shadow-lg p-6">
        <h2 className="text-xl font-medium">Coming soon...</h2>
        <p className="text-slate-500 mt-2">This is the {title} page. Content will be added here in the future!</p>
      </Card>
    </main>
  );
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("Home");
  const [isComposing, setIsComposing] = useState(false);
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Exploring the world of great food",
      author: "Alex",
      avatar: "https://placehold.co/40x40/8b5cf6/ffffff",
      content: "I believe that good food brings people together. It's a way to explore new cultures and share moments with friends and family. What are your thoughts on this?",
      image: "https://placehold.co/800x420/93c5fd/ffffff?text=Food+Image",
      community: "Food",
      time: "2h",
      likes: 123,
      comments: 12,
      views: 1400,
    },
    {
      id: 2,
      title: "A simple guide to learning React Hooks",
      author: "Sam",
      avatar: "https://placehold.co/40x40/f97316/ffffff",
      content: "Consistency is key! A shared style guide, regular code reviews, and using clear, descriptive variable names can make a huge difference in the long run. What are your go-to practices?",
      image: null,
      community: "Development",
      time: "1d",
      likes: 54,
      comments: 8,
      views: 900,
    },
  ]);

  const communities = [
    { id: 1, name: "Food", avatar: "https://placehold.co/40x40/8b5cf6/ffffff", members: 12000 },
    { id: 2, name: "Product", avatar: "https://placehold.co/40x40/f97316/ffffff", members: 8200 },
    { id: 3, name: "Development", avatar: "https://placehold.co/40x40/06b6d4/ffffff", members: 15400 },
  ];

  const addNewPost = (p) => setPosts((s) => [p, ...s]);
  const deletePost = (id) => setPosts((s) => s.filter(post => post.id !== id));

  const renderContent = () => {
    switch (activePage) {
      case "Home":
        return <HomePage posts={posts} addNewPost={addNewPost} deletePost={deletePost} setIsComposing={setIsComposing} isComposing={isComposing} />;
      case "Profile":
        return <OtherPage title="Profile" />;
      case "Notifications":
        return <OtherPage title="Notifications" />;
      case "Saved":
        return <OtherPage title="Saved" />;
      case "Settings":
        return <OtherPage title="Settings" />;
      default:
        return <HomePage posts={posts} addNewPost={addNewPost} deletePost={deletePost} setIsComposing={setIsComposing} isComposing={isComposing} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-900">
      {/* Sidebar */}
      <div
        onMouseEnter={() => setSidebarOpen(true)}
        onMouseLeave={() => setSidebarOpen(false)}
        className="sticky top-0 h-screen"
      >
        <Sidebar
          expanded={sidebarOpen}
          activePage={activePage}
          onSelectPage={setActivePage}
        />
      </div>

      {/* Main content + right rail container */}
      <div className="flex flex-1 gap-6 p-6 overflow-y-auto h-screen">
        {renderContent()}
        <RightRail communities={communities} />
      </div>
    </div>
  );
}
