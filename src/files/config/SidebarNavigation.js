import SettingsIcon from '@mui/icons-material/Settings';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import NoteOutlinedIcon from '@mui/icons-material/NoteOutlined';



export const sidebarNavigation = [
    {
        name: 'Home',
        to: '/home',
        Text: 'home',
        Icon: HomeOutlinedIcon,
    },
    {
        name: 'chatroom',
        to: '/chatroom',
        Text: 'chatroom',
        Icon: ChatBubbleOutlineOutlinedIcon,

    },
    {
        name: 'Classroom',
        to: '/Classroom',
        Text: 'Classroom',
        Icon: ClassOutlinedIcon,
    },
    {
        name: 'notes',
        to: '/notes',
        Text: 'notes',
        Icon: NoteOutlinedIcon,
    },
    {
        name: 'settings',
        to: '/settings',
        Text: 'settings',
        Icon: SettingsIcon,
    }
]

// export default routerNavigation;