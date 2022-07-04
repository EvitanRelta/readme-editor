import GitHubIcon from '@mui/icons-material/GitHub'
import { ListItemIcon, MenuItem } from '@mui/material'
import { loginUser } from '../../../store/authSlice'
import { useAppDispatch } from '../../../store/hooks'

const Login = () => {
    const dispatch = useAppDispatch()

    return (
        <MenuItem onClick={() => dispatch(loginUser())}>
            <ListItemIcon>
                <GitHubIcon />
            </ListItemIcon>
            Login with GitHub
        </MenuItem>
    )
}

export default Login
