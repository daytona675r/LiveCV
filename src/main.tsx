
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import { getCvRedirect } from "./app/cvViews.ts";
  import "./styles/index.css";

  const redirectPath = getCvRedirect(window.location.pathname);

  if (redirectPath) {
    window.location.replace(`${redirectPath}${window.location.search}${window.location.hash}`);
  } else {
    createRoot(document.getElementById("root")!).render(<App />);
  }
