import {AppBar, IconButton, Toolbar, Typography} from "@mui/material";
import Image from "next/image";
import {GitHub} from "@mui/icons-material";

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

                <Typography variant="h6" component="div" className="flex-1 font-josefin">
                    Exchange Rates
                </Typography>
                <a href="https://github.com/ps011/exchange-rates" target="_blank" rel="noreferrer noopener"
                   className="text-white">
                    <GitHub/>
                </a>
            </Toolbar>
        </AppBar>
    );
}