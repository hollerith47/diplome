import {faker} from "@faker-js/faker";
import {
    ChatCircleDots,
    Gear,
    GearSix,
    Phone,
    SignOut,
    User,
    Users, VideoCamera,
} from "phosphor-react";

const Profile_Menu = [
    {
        key: 1,
        title: "Профиль",
        icon: <User/>,
    },
    {
        key: 2,
        title: "Настройки",
        icon: <Gear/>,
    },
    {
        key: 3,
        title: "Выйти",
        icon: <SignOut/>,
    },
];

const Nav_Buttons = [
    {
        index: 0,
        icon: <ChatCircleDots/>,
    },
    {
        index: 1,
        icon: <Users/>,
    },
    {
        index: 2,
        icon: <Phone/>,
    },
    {
        index: 4,
        icon: <VideoCamera />,
    },
];

const Nav_Setting = [
    {
        index: 3,
        icon: <GearSix/>,
    },
];

const ChatList = [
    {
        id: 0,
        img: faker.image.avatar(),
        name: faker.person.firstName(),
        msg: faker.music.songName(),
        time: "9:36",
        unread: 0,
        pinned: true,
        online: true,
    },
    {
        id: 1,
        img: faker.image.avatar(),
        name: faker.person.firstName(),
        msg: faker.music.songName(),
        time: "12:02",
        unread: 2,
        pinned: true,
        online: false,
    },
    {
        id: 2,
        img: faker.image.avatar(),
        name: faker.person.firstName(),
        msg: faker.music.songName(),
        time: "10:35",
        unread: 3,
        pinned: false,
        online: true,
    },
    {
        id: 3,
        img: faker.image.avatar(),
        name: faker.person.firstName(),
        msg: faker.music.songName(),
        time: "04:00",
        unread: 0,
        pinned: false,
        online: true,
    },
    {
        id: 4,
        img: faker.image.avatar(),
        name: faker.person.firstName(),
        msg: faker.music.songName(),
        time: "08:42",
        unread: 0,
        pinned: false,
        online: false,
    },
    {
        id: 5,
        img: faker.image.avatar(),
        name: faker.person.firstName(),
        msg: faker.music.songName(),
        time: "08:42",
        unread: 0,
        pinned: false,
        online: false,
    },
    {
        id: 6,
        img: faker.image.avatar(),
        name: faker.person.firstName(),
        msg: faker.music.songName(),
        time: "08:42",
        unread: 0,
        pinned: false,
        online: false,
    },
    {
        id: 7,
        img: faker.image.avatar(),
        name: faker.person.firstName(),
        msg: faker.music.songName(),
        time: "08:42",
        unread: 0,
        pinned: false,
        online: false,
    },
];

const Chat_History = [
    {
        type: "msg",
        message: "Hi 👋🏻, How are ya ?",
        incoming: true,
        outgoing: false,
    },
    {
        type: "divider",
        text: "Today",
    },
    {
        type: "msg",
        message: "Hi 👋 Panda, not bad, u ?",
        incoming: false,
        outgoing: true,
    },
    {
        type: "msg",
        message: "Can you send me an abstract image?",
        incoming: false,
        outgoing: true,
    },
    {
        type: "msg",
        message: "Ya sure, sending you a pic",
        incoming: true,
        outgoing: false,
    },

    {
        type: "msg",
        subtype: "img",
        message: "Here You Go",
        img: faker.image.abstract(),
        incoming: true,
        outgoing: false,
    },
    {
        type: "msg",
        message: "Can you please send this in file format?",
        incoming: false,
        outgoing: true,
    },

    {
        type: "msg",
        subtype: "doc",
        message: faker.lorem.sentence(5),
        incoming: true,
        outgoing: false,
    },
    {
        type: "msg",
        subtype: "link",
        preview: faker.image.urlLoremFlickr({category: 'cats'}),
        message: faker.lorem.sentence(4),
        incoming: true,
        outgoing: false,
    },
    {
        type: "msg",
        subtype: "reply",
        reply: "This is a reply",
        message: faker.lorem.sentence(5),
        incoming: false,
        outgoing: true,
    },
];

const Message_options = [
    {
        title: "Reply",
    },
    {
        title: "React to message",
    },
    {
        title: "Forward message",
    },
    {
        title: "Star message",
    },
    {
        title: "Report",
    },
    {
        title: "Delete Message",
    },
];

const SHARED_LINKS = [
    {
        type: "msg",
        subtype: "link",
        preview: faker.image.urlLoremFlickr({category: 'cats'}),
        message: faker.lorem.words(10),
        incoming: true,
        outgoing: false,
    },
    {
        type: "msg",
        subtype: "link",
        preview: faker.image.urlLoremFlickr({category: 'cats'}),
        message: faker.lorem.words(10),
        incoming: true,
        outgoing: false,
    },
    {
        type: "msg",
        subtype: "link",
        preview: faker.image.urlLoremFlickr({category: 'cats'}),
        message: faker.lorem.words(10),
        incoming: true,
        outgoing: false,
    },
    {
        type: "msg",
        subtype: "link",
        preview: faker.image.urlLoremFlickr({category: 'cats'}),
        message: faker.lorem.words(10),
        incoming: true,
        outgoing: false,
    },
    {
        type: "msg",
        subtype: "link",
        preview: faker.image.urlLoremFlickr({category: 'cats'}),
        message: faker.lorem.words(10),
        incoming: true,
        outgoing: false,
    }

]

const SHARED_DOCS = [
    {
        type: "msg",
        subtype: "doc",
        message: faker.lorem.sentence(5),
        incoming: true,
        outgoing: false,
    },
    {
        type: "msg",
        subtype: "doc",
        message: faker.lorem.sentence(5),
        incoming: true,
        outgoing: false,
    },
    {
        type: "msg",
        subtype: "doc",
        message: faker.lorem.sentence(5),
        incoming: true,
        outgoing: false,
    },
    {
        type: "msg",
        subtype: "doc",
        message: faker.lorem.sentence(5),
        incoming: true,
        outgoing: false,
    },
    {
        type: "msg",
        subtype: "doc",
        message: faker.lorem.sentence(5),
        incoming: true,
        outgoing: false,
    },
]

const CALL_LOG = [
    {
        key: 1,
        incoming: true,
        videoCall: false,
        time: "14:15"
    },
    {
        key: 2,
        incoming: false,
        videoCall: false,
        time: "17:43"
    },
    {
        key: 3,
        incoming: false,
        videoCall: false,
        time: "15:50"
    },
    {
        key: 4,
        incoming: true,
        videoCall: true,
        time: "16:53"
    },
    {
        key: 1,
        incoming: true,
        videoCall: true,
        time: "16:53"
    }

]
export {
    Profile_Menu,
    Nav_Setting,
    Nav_Buttons,
    ChatList,
    Chat_History,
    Message_options,
    SHARED_LINKS,
    SHARED_DOCS,
    CALL_LOG
};
