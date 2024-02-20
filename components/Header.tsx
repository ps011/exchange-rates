import {
  AppBar,
  Box,
  IconButton,
  Modal,
  Toolbar,
  Typography,
} from "@mui/material";
import { GitHub, InfoOutlined } from "@mui/icons-material";
import { Events } from "../pages";
import { useState } from "react";

export default function Header({
  logFirebaseEvent,
}: {
  logFirebaseEvent: (name: string, params: any) => void;
}) {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80vw",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <AppBar position="sticky" classes={{ colorPrimary: "bg-blue-950" }}>
        <Toolbar>
          <h1 className="flex-1" data-testid="app-name">
            Exchange Rates
          </h1>
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
          <IconButton
            onClick={handleOpen}
            aria-label="About"
            data-testid="about"
            className="text-white ml-2"
          >
            <InfoOutlined />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Master the Money Game with &quot;Currency Exchange Rates&quot; App
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Ditch the confusion, grab control! &quot;Currency Exchange
            Rates&quot; app empowers you with real-time currency conversions,
            personalized alerts, and seamless copy functionality, making foreign
            exchange a breeze.
            <ul>
              <b> Effortless Conversions at Your Fingertips:</b>
              <li>
                Instant: Convert between over 150 currencies with a single tap.
                Forget complex calculators, get accurate rates instantly.
              </li>
              <li>
                Live & Up-to-date: Our real-time updates reflect the
                ever-changing market, ensuring you always have the latest
                information.
              </li>
              <li>
                Offline Savvy: Access frequently used conversions even when
                offline, perfect for impromptu trips or limited internet access.
              </li>
            </ul>
            <ul>
              Stay Ahead of the Exchange Game:
              <li>
                Never Miss a Deal: Set personalized alerts for your desired
                currencies and receive daily updates directly to your device.
              </li>
              <li>
                Track Your Winners: Monitor your most important currencies in a
                customizable watchlist. Be informed and make smart decisions.
              </li>
              <li>
                Learn from the Past: Analyze historical data to forecast future
                trends and optimize your financial strategies.
              </li>
            </ul>
            <ul>
              Convenience Built-in:
              <li>
                Copy with a Tap: Quickly copy current conversion rates to your
                clipboard for sharing or reference in other apps.
              </li>
              <li>
                Calculator at Hand: Perform additional calculations alongside
                conversions for comprehensive financial planning.
              </li>
              <li>
                Simple & Intuitive: Enjoy a clean and user-friendly interface
                that makes currency conversion a breeze.
              </li>
            </ul>
            <ul>
              More than Just Rates:
              <li>
                Travel Ready: Access offline conversions, language translations,
                and local currency information for worry-free international
                adventures.
              </li>
              <li>
                Investment Insights: Stay informed about global economic trends
                and their impact on currency markets.
              </li>
              <li>
                Multilingual Support: Communicate and convert seamlessly in
                multiple languages.
              </li>
            </ul>
            Download &quot;Currency Exchange Rates&quot; today and experience
            the power of effortless currency conversion! Duis mollis, est non
            commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
