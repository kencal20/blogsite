import img from "../../assets/react.svg"
import type { componentProps } from "../path"

const genId = () => Math.floor(Math.random() * 10000).toString();

export const authorList: componentProps['authorProps'][] = [
    {
        id: genId(),
        name: "John Doe",
        bio: "Frontend developer and UI enthusiast.",
        avatar: img,
    },
    {
        id: genId(),
        name: "Jane Smith",
        bio: "Fullstack engineer and open-source contributor.",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
        id: genId(),
        name: "David Kim",
        bio: "JavaScript expert and tech blogger.",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },
];
