"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PostCard from "@/components/PostCard";
import BottomNav from "@/components/BottomNav";
import axios from "axios";
import TopNav from "@/components/TopNav";

export default function AllPosts() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("isAdmin")) {
      router.push("/admin/login");
    }
    fetchPosts();
    fetchUsers();
  }, []);

  async function fetchPosts() {
    // Example API response
    const res = await axios.get("https://serverapi.studyvarsity.com/api/post/all");
    setPosts(res.data.data);
  }
  async function fetchUsers() {
    // Example API response
    const res = await axios.get("https://serverapi.studyvarsity.com/api/user");
    setUsers(res.data.data);
    console.log("user",res.data.data);
  }

  async function toggleVerify(post) {
    await axios.post("https://serverapi.studyvarsity.com/api/post/verify", {
      postId: post.id,
      postVerified: !post.postVerified,
    });

    fetchPosts();
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 pb-20">
      <TopNav />
      <h1 className="text-lg font-bold mb-4">
        Post Verification
      </h1>
      <div style={{display:"flex", justifyContent:"center"}}>
        <div className="space-y-4" style={{ maxWidth: "395px" }}>
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onToggle={() => toggleVerify(post)}
              users={users}
            />
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
