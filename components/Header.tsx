import { AppBar, Toolbar } from "@mui/material";
import { GitHub } from "@mui/icons-material";
import { Events } from "../pages";

export default function Header({
  logFirebaseEvent,
}: {
  logFirebaseEvent: (name: string, params: any) => void;
}) {
  return (
    <AppBar position="sticky" classes={{ colorPrimary: "bg-blue-950" }}>
      <Toolbar>
        <h2 className="flex-1" data-testid="app-name">
          Exchange Rates
        </h2>
        <a
          href="https://github.com/ps011/exchange-rates"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="GitHub"
          data-testid="github"
          onClick={() => {
            logFirebaseEvent(Events.HEADER_LINK_CLICKED, { name: "github" });
          }}
          className="text-white"
        >
          <GitHub />
        </a>
      </Toolbar>
    </AppBar>
  );
}
