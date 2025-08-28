// src/constants/blogs.ts
import type { componentProps } from "../path"
import { authorList } from "./authourList";

const genId = () => Math.floor(Math.random() * 10000).toString();

export const blogList: componentProps["blogList"][] = [
  {
    id: genId(),
    title: "Understanding React Components",
    authour: authorList[0].id, // link by ID
    description: "An in-depth look at React components and how to use them effectively in your applications.",
    image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d",
    date_published: "31/06/2025",
    read_time: "12 minutes",
    tags: ["React", "JavaScript", "Frontend"],
  },
  {
    id: genId(),
    title: "A Guide to Modern JavaScript",
    authour: authorList[1].id,
    description: "Deep dive into ES6+ features and modern patterns in JS.",
    image: "https://images.unsplash.com/photo-1667372393086-9d4001d51cf1?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date_published: "30/06/2025",
    read_time: "15 minutes",
    tags: ["Web Development", "Programming", "JavaScript"],
  },
  {
    id: genId(),
    title: "CSS Flexbox vs Grid: When to Use Which",
    authour: authorList[2].id,
    description: "Learn when to choose Flexbox vs Grid for your layouts.",
    image: "https://media.istockphoto.com/id/1363205770/photo/word-css-on-wooden-desk-and-laptop.jpg?s=1024x1024&w=is&k=20&c=ZBIeGd9BQcS5etYnnYyc0IzQtVbMla8fxNoaTDR_Tfs=",
    date_published: "29/06/2025",
    read_time: "10 minutes",
    tags: ["CSS", "Flexbox", "Grid", "UI/UX"],
  },
]
