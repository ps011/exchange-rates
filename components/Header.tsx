import {AppBar, IconButton, Toolbar, Typography} from "@mui/material";
import Image from "next/image";

export default function Header() {
    return (
        <AppBar position="sticky" className="bg-blue-950">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{mr: 2}}
                >
                    <Image src={'/assets/icons/icon-512.png'} alt="logo" width={40} height={40}/>
                </IconButton>

                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    Exchange Rates
                </Typography>
            </Toolbar>
        </AppBar>
    );
}