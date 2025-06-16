import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { NAVBAR_LINKS } from "@/lib/constants";
import "./Navbar.css";
import resume from "@/assets/Resume.pdf";
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle smooth scrolling
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const element = document.querySelector(href);
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav
      className={`navbar ${
        isScrolled ? "navbar-scrolled" : "navbar-transparent"
      }`}
    >
      <div className="navbar-container">
        <div className="navbar-content">
          <a
            href="#hero"
            className="navbar-logo"
            onClick={(e) => handleNavClick(e, "#hero")}
          >
            <span className="navbar-logo-text">Chandan.Fulvariya</span>
          </a>

          {/* Desktop Navigation */}
          <div className="navbar-desktop-links">
            {NAVBAR_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="navbar-link"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Resume Button - Desktop */}
          <div className="navbar-resume-button-desktop">
            <a
              href={resume}
              download="Chandan_Resume.pdf"
              className="portfolio-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="navbar-mobile-menu-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X
                size={24}
                className="navbar-mobile-menu-icon navbar-mobile-menu-icon-close"
              />
            ) : (
              <Menu
                size={24}
                className="navbar-mobile-menu-icon navbar-mobile-menu-icon-open"
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`navbar-mobile-menu ${
          mobileMenuOpen
            ? "navbar-mobile-menu-open"
            : "navbar-mobile-menu-closed"
        }`}
      >
        <div className="navbar-mobile-menu-container">
          {NAVBAR_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="navbar-mobile-link"
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={resume}
            download="Chandan_Resume.pdf"
            className="navbar-mobile-resume-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
