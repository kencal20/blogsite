import React, { createContext, useContext, useEffect, useState } from "react";
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { db, FIREBASE_AUTH } from "../constants/firebaseConfig";
import type { componentProps } from "../components/types";

  type Blog = componentProps['blogList'] & {
  authorName?: string;
  authorEmail?: string;
  authorAvatar?: string;
  authorUid?: string;
};
type BlogContextType = {
  blogs: Blog[];
  loading: boolean;
  createBlog: (blog: Omit<Blog, "id">) => Promise<void>;
  updateBlog: (id: string, blog: Partial<Blog>) => Promise<void>;
  deleteBlog: (id: string) => Promise<void>;
};

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider = ({ children }: { children: React.ReactNode }) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Blog[];
      setBlogs(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // --- CRUD Operations ---
const createBlog = async (blogData:any) => {
  const user = FIREBASE_AUTH.currentUser;
  await addDoc(collection(db, "blogs"), {
    ...blogData,
    authorEmail: user?.email ?? blogData.authorEmail ?? "",
    authorUid: user?.uid ?? blogData.authorUid ?? null,
    authorName: user?.displayName ?? blogData.authorName ?? null,
    createdAt: serverTimestamp(),
  });
};

  const updateBlog = async (id: string, blog: Partial<Blog>) => {
    await updateDoc(doc(db, "blogs", id), blog);
  };

  const deleteBlog = async (id: string) => {
    await deleteDoc(doc(db, "blogs", id));
  };

  return (
    <BlogContext.Provider value={{ blogs, loading, createBlog, updateBlog, deleteBlog }}>
      {children}
    </BlogContext.Provider>
  );
};

export function useBlog() {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlogContext must be used within a BlogProvider");
  }
  return context;
}
