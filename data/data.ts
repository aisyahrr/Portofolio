
export type Skill = {
    title: string;
    icon: string;
};

export const techStack: Skill[] = [
    { title: "HTML5", icon: "/icon/HTML5.png" },
    { title: "CSS", icon: "/icon/css.png" },
    { title: "Tailwind CSS", icon: "/icon/TailwindCSS.png" },
    { title: "JavaScript", icon: "/icon/JavaScript.png" },
    { title: "TypeScript", icon: "/icon/ts.png" },
    { title: "React.js", icon: "/icon/React.png" },
    { title: "PHP", icon: "/icon/PHP.png" },
    ];

export const tools: Skill[] = [
    { title: "Figma", icon: "/icon/Figma.png" },
    { title: "Framer", icon: "/icon/Framer.png" },
    { title: "Photoshop", icon: "/icon/photoshop.png" },
    { title: "GitHub", icon: "/icon/github.png" },
];

export const platforms: Skill[] = [
    { title: "MySQL", icon: "/icon/mysql.png" },
    { title: "Firebase", icon: "/icon/firebase.png" },
];



export type TPlaylist = {
    id: number, 
    title : string,
    singer: string,
    image: string,
    album : string,
    url : string,
}

export const PlaylistMusic : TPlaylist[] = [
    {
        id: 1,
        title: "Lantas",
        singer: "Juicy Luicy",
        image: "juicyluicy.jpeg",
        album: "Sentimetal",
        url: "/Playlist/music/lantas.mp3",
    },
    {
        id: 2,
        title: "hey, i'm tired",
        singer: "Arash Buana",
        image: "arash.jpeg",
        album: "life update",
        url: "/Playlist/music/hey,i'mtired.mp3",
    },
    {
        id: 3,
        title: "Nobody Gets Me",
        singer: "SZA",
        image: "SZA.jpeg",
        album: "SOS",
        url: "/Playlist/music/NobodyGetsMe.mp3",
    }
]
