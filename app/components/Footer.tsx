import { css } from "styled-system/css";

import { LanguageSwitcher } from "./LanguageSwitcher";

const Footer = () => {
  return (
    <footer className={css({ py: "4" })}>
      <LanguageSwitcher />
    </footer>
  );
};

export { Footer };
