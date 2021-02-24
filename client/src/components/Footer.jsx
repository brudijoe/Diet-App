import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p data-testid="test-footer">Copyright ⓒ {year}</p>
    </footer>
  );
}

export default Footer;