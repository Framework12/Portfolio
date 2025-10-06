import { useState, useEffect } from "react";

import {
  Send,
  Mail,
  Phone,
  MapPin,
  Github, 
  Linkedin,
  MessageCircle,
} from "lucide-react";
import { CONTACT_INFO } from "@/lib/constants";
import AnimatedSection from "./AnimatedSection";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";
import "./Contact.css";

emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

const Contact = () => {
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    message: "",
  });

  const [emailError, setEmailError] = useState("");

  // Add a hidden field for timestamp
  useEffect(() => {
    const timeField = document.createElement("input");
    timeField.type = "hidden";
    timeField.name = "time";
    timeField.value = new Date().toLocaleString();
    document.querySelector("form")?.appendChild(timeField);
  }, []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time email validation
    if (name === "from_email" && value) {
      if (!isValidEmail(value)) {
        setEmailError(
          "Please enter a valid email from a recognized domain (e.g., gmail.com, outlook.com, or .edu domain)"
        );
      } else {
        setEmailError("");
      }
    } else if (name === "from_email") {
      setEmailError("");
    }
  };

  // Email validation function
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return false;

    // Check for valid domains
    const domain = email.split("@")[1].toLowerCase();
    const validDomains = [
      "gmail.com",
      "yahoo.com",
      "hotmail.com",
      "outlook.com",
      "aol.com",
      "icloud.com",
      "protonmail.com",
      "proton.me",
      "mail.com",
      "edu",
      "company.com",
    ];

    return validDomains.some(
      (validDomain) =>
        domain === validDomain ||
        domain.endsWith(".edu") ||
        domain.endsWith(".ac.in")
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate email before proceeding
      if (!isValidEmail(formData.from_email)) {
        toast({
          title: "Invalid Email",
          description:
            "Please enter a valid email address from a recognized domain.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Show sending toast
      toast({
        title: "Sending message...",
        description: "Please wait while we process your request.",
      });

      const templateParams = {
        name: formData.from_name,
        email: formData.from_email,
        message: formData.message,
        time: new Date().toLocaleString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      if (result.status === 200) {
        setFormData({ from_name: "", from_email: "", message: "" });

        toast({
          title: "Message sent successfully! 🎉",
          description: "Thank you for reaching out. I'll get back to you soon!",
          duration: 5000,
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast({
        title: "Failed to send message",
        description: "Please try again or contact me directly via email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatedSection
      id="contact"
      className="contact-section section-container"
      animation="animate-scale-in"
    >
      <div className="contact-header">
        <h2 className="section-title">Contact Me</h2>
        <span className="section-subtitle">Get In Touch</span>
        <p className="contact-description">
          Have a project in mind or want to collaborate? Feel free to reach out.
        </p>
      </div>

      <div className="contact-grid">
        <div className="contact-info-container">
          <div>
            <h3 className="contact-intro-title">Let's discuss your project</h3>
            <p className="contact-intro-text">
              I'm always open to new opportunities, exciting projects, and
              creative collaborations. Drop me a message, and I'll get back to
              you as soon as possible.
            </p>

            <div className="contact-details">
              <div className="contact-detail-item">
                <div className="contact-detail-icon-container">
                  <Mail size={20} className="contact-detail-icon" />
                </div>
                <div className="contact-detail-content">
                  <h4 className="contact-detail-label">Email</h4>
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="contact-detail-value"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </div>{" "}
              <div className="contact-detail-item">
                <div className="contact-detail-icon-container">
                  <Phone size={20} className="contact-detail-icon" />
                </div>
                <div className="contact-detail-content">
                  <h4 className="contact-detail-label">Phone</h4>
                  <a
                    href={`tel:${CONTACT_INFO.phone}`}
                    className="contact-detail-value"
                  >
                    {CONTACT_INFO.phone}
                  </a>
                </div>
              </div>
              <div className="contact-detail-item">
                <div className="contact-detail-icon-container">
                  <MapPin size={20} className="contact-detail-icon" />
                </div>
                <div className="contact-detail-content">
                  <h4 className="contact-detail-label">Location</h4>
                  <p className="contact-detail-value">
                    {CONTACT_INFO.location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="contact-social-title">Connect with me</h4>
            <div className="contact-social-links">
              <a
                href={CONTACT_INFO.socialLinks[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-link"
                aria-label="Visit GitHub Profile"
              >
                <Github size={20} className="contact-social-icon" />
              </a>
              <a
                href={CONTACT_INFO.socialLinks[1].url}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-link"
                aria-label="Visit LinkedIn Profile"
              >
                <Linkedin size={20} className="contact-social-icon" />
              </a>
              <a
                href={`https://wa.me/${CONTACT_INFO.phone.replace(
                  /\+|\s/g,
                  ""
                )}?text=Hi%20Chandan,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect!`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-link"
                aria-label="Connect on WhatsApp"
              >
                <MessageCircle
                  size={20}
                  className="contact-social-icon whatsapp-icon"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="contact-form-container glass">
          <form onSubmit={handleSubmit}>
            <div className="contact-form-group">
              <label htmlFor="name" className="contact-form-label">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="from_name"
                value={formData.from_name}
                onChange={handleChange}
                required
                className="contact-form-input"
                placeholder="Name"
              />
            </div>

            <div className="contact-form-group">
              <label htmlFor="email" className="contact-form-label">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="from_email"
                value={formData.from_email}
                onChange={handleChange}
                required
                className={`contact-form-input ${
                  emailError ? "input-error" : ""
                }`}
                placeholder="Your email address"
              />
              {emailError && (
                <span className="error-message">{emailError}</span>
              )}
            </div>

            <div className="contact-form-group">
              <label htmlFor="message" className="contact-form-label">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="contact-form-textarea"
                placeholder="Hello, I'd like to talk about..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="portfolio-button contact-form-button"
            >
              {isSubmitting ? (
                <>
                  <div className="contact-form-spinner"></div>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send size={18} />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Contact;
