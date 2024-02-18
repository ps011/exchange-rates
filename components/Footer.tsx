import { GitHub, Instagram, LinkedIn, OpenInNew, X } from "@mui/icons-material";
import { Events } from "../pages";

export default function Footer({
  logFirebaseEvent,
}: {
  logFirebaseEvent: (name: string, params: any) => void;
}) {
  return (
    <footer className="bg-white rounded-lg shadow dark:bg-gray-900 absolute left-0 right-0 bottom-0">
      <hr className="border-gray-200 sm:mx-auto dark:border-gray-700" />
      <div className="mx-auto p-4 flex flex-col sm:flex-row sm:w-full">
        <div className="text-center flex flex-col mb-8 sm:flex-1 sm:text-left">
          <p className="my-0 text-neutral-300">Developed and Maintained by</p>
          <a
            href="https://ps011.github.io"
            target="_blank"
            className="text-black dark:text-white no-underline"
            aria-label="Portfolio"
          >
            <h3
              className="my-2"
              data-testid="portfolio"
              onClick={() => {
                logFirebaseEvent(Events.FOOTER_LINK_CLICKED, {
                  name: "portfolio",
                });
              }}
            >
              Prasheel Soni
              <OpenInNew className="align-middle ml-1" fontSize="small" />
            </h3>
          </a>
        </div>
        <div className="flex flex-wrap justify-around items-center text-sm font-medium text-gray-500 dark:text-gray-400">
          <a
            href="https://instagram.com/ps.11"
            target="_blank"
            className="text-black dark:text-white no-underline sm:ml-4"
            aria-label="Instagram"
          >
            <span
              data-testid="instagram"
              onClick={() => {
                logFirebaseEvent(Events.FOOTER_LINK_CLICKED, {
                  name: "instagram",
                });
              }}
            >
              <Instagram className="cursor-pointer" />
            </span>
          </a>
          <a
            href="https://github.com/ps011"
            target="_blank"
            className="text-black dark:text-white no-underline sm:ml-4"
            aria-label="Github"
          >
            <span
              data-testid="github"
              onClick={() => {
                logFirebaseEvent(Events.FOOTER_LINK_CLICKED, {
                  name: "github",
                });
              }}
            >
              <GitHub className="cursor-pointer" />
            </span>
          </a>
          <a
            href="https://x.com/soniprasheel"
            target="_blank"
            className="text-black dark:text-white no-underline sm:ml-4"
            aria-label="X"
          >
            <span
              data-testid="x"
              onClick={() => {
                logFirebaseEvent(Events.FOOTER_LINK_CLICKED, {
                  name: "x",
                });
              }}
            >
              <X className="cursor-pointer" />
            </span>
          </a>
          <a
            href="https://linkedin.com/in/ps011"
            target="_blank"
            className="text-black dark:text-white no-underline sm:ml-4"
            aria-label="linkedin"
          >
            <span
              data-testid="linkedin"
              onClick={() => {
                logFirebaseEvent(Events.FOOTER_LINK_CLICKED, {
                  name: "linkedin",
                });
              }}
            >
              <LinkedIn className="cursor-pointer" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
