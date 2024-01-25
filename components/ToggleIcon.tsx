import {createSvgIcon} from "@mui/material";

export const ToggleIcon = () => {

    const ToggleIcon = createSvgIcon(
        <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 100 100" height="100%" width="100%">
            <title>Toggle Icon</title>
            <path fill="currentColor"
                  d="M80,42.9,67.21,30.12a2.22,2.22,0,0,0-3.15,0L51.27,42.9a2.23,2.23,0,0,0,3.15,3.15l9-9V68.31a2.23,2.23,0,1,0,4.45,0V37.06l9,9A2.23,2.23,0,0,0,80,42.9Z"/>
            <path fill="currentColor"
                  d="M45.58,54l-9,9V31.69a2.23,2.23,0,1,0-4.45,0V62.94l-9-9A2.23,2.23,0,0,0,20,57.1L32.79,69.88a2.22,2.22,0,0,0,3.15,0L48.73,57.1A2.23,2.23,0,0,0,45.58,54Z"/>
        </svg>,
        'ToggleIcon'
    )

    return (
                <ToggleIcon/>
    )
}