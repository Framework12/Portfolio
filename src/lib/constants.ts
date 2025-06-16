import { 
  Code, Database, Laptop, Globe, Server, 
  LayoutGrid, BrainCircuit, Book, 
  Github, ExternalLink, MessageSquare
} from "lucide-react";

import outlierLogo from '../assets/outlier-ai-logo.jpg';
import monkoodogLogo from '../assets/monkoodog-logo.jpg';
import internseliteLogo from '../assets/internselite-logo.jpg';
import nrgLogo from '../assets/nrg-logo.jpg';
import universityLogo from '../assets/university-logo.webp';
import socialioImage from '../assets/socialio.png';
import ottImage from '../assets/ott .png';
import bytepulseImage from '../assets/bytepulse.png';
import bookExchangeImage from '../assets/bookExchnage.png';
import dashboardImage from '../assets/Dashboard.png';

export const NAVBAR_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const SKILLS = [
  {
    category: "Frontend",
    icon: LayoutGrid,
    skills: [
      "HTML/CSS",
      "JavaScript",
      "TypeScript",
      "React.js",
      "Redux"
    ],
    color: "#FDE1D3", // peach
  },
  {
    category: "Backend",
    icon: Server,
    skills: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "Supabase"
    ],
    color: "#D4E5D9", // sage
  },
  {
    category: "Database",
    icon: Database,
    skills: [
      "SQL",
      "MongoDB",
      "ORM"
    ],
    color: "#FEF7CD", // cream
  },
  {
    category: "Tools",
    icon: Globe,
    skills: [
      "Git / GitHub",
      "CI/CD",
      "AWS"
    ],
    color: "#E5DEFF", // lavender
  },
  {
    category: "AI Integration",
    icon: BrainCircuit,
    skills: [
      "Machine Learning",
      "LLM"
    ],
    color: "#FDE1D3", // peach
  },
];

export const PROJECTS = [
  {
    title: "Social.io",
    description: "A social media dashboard platform that aggregates and visualizes 5+ social media metrics, tracking follower growth, impressions, engagement rate, and reach across 5 platforms.",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Three.js"],
    image: socialioImage,
    links: [
      { icon: Github, url: "https://github.com/Framework12/Social.io/tree/main" },
      { icon: ExternalLink, url: "https://socialio-chandans-projects-3c086704.vercel.app/" }
    ],
    achievements: [
      "Implemented recommendation system, improving content strategy and audience reach by measurable benchmarks",
      "Integrated authentication and subscription management with Supabase"
    ]
  },
  {
    title: "OTT Streaming Platform",
    description: "A video streaming platform, using a custom video player and following the HLS protocol for streaming.",
    technologies: ["React.js", "Node.js", "MongoDB", "TMDB API", "CSS", "IMDB API"],
    image: ottImage,
    links: [
      { icon: Github, url: "https://github.com/Framework12/Stream" },
      { icon: ExternalLink, url: "https://streaming-platform-tmdb.vercel.app/" }
    ],
    achievements: [
      "Integrated DASH streaming, enabling adaptive playback for 50+ hours of sample videos",
      "Implemented a subscription system using Supabase, simulating 100+ test transactions for automated payments and access control"
    ]
  },
  {
    title: "BookP2P Platform",
    description: "A Full stack platform, where Seeker and seller can sell or purchase books.",
    technologies: ["React.js", "Node.js", "Supabase", "Tailwind CSS"],
    image: bookExchangeImage,
    links: [
      { icon: Github, url: "https://github.com/Framework12/Books_p2p" },
      { icon: ExternalLink, url: "https://p2p-book-chandans-projects-3c086704.vercel.app/" }
    ],
    achievements: [
      "Implemented secure user authentication and authorization for buyers and sellers",
      "Developed a responsive UI with real-time book listing updates and search functionality",
      "Integrated payment processing and messaging system for seamless transactions"
    ]
  },
  {
    title: "BytePulse",
    description: "An AI-powered news app using React.js and Rapid API, delivering real-time tech news updates.",
    technologies: ["React.js", "Node.js", "Rapid API", "CSS", "GitHub"],
    image: bytepulseImage,
    links: [
      { icon: Github, url: "https://github.com/Framework12/BytePulse" },
      { icon: ExternalLink, url: "https://byte-pulse-ten.vercel.app/" }
    ],
    achievements: [
      "Developed an AI-powered news app using React.js and Rapid APIs, delivering real-time tech news updates",
      "Enhanced UI/UX by implementing 5+ curated content sections, improving readability and engagement"
    ]
  },
  {
    title: "Cognizant ML Program Project",
    description: "A comprehensive machine learning project focused on analyzing sales data, predicting trends, and enhancing user experiences. The project demonstrates practical applications of ML in driving strategic business decisions and improving customer satisfaction.",
    technologies: ["Python", "Scikit-learn", "Pandas", "NumPy", "Machine Learning"],
    image: "https://placehold.co/600x400/e9ecef/495057?text=ML+Analytics&font=roboto",
    links: [
      { icon: Github, url: "https://github.com/Framework12/Cognizant_ML_Project" }
    ],
    achievements: [
      "Developed ML models for sales prediction and trend analysis using historical data",
      "Implemented customer segmentation and behavior analysis for enhanced user experience",
      "Created data visualization dashboards for intuitive presentation of insights",
      "Utilized advanced ML techniques for pattern recognition and predictive analytics"
    ]
  },
  {
    title: "Medical Chatbot",
    description: "Designed and deployed a healthcare chatbot using NLP and ML algorithms, handling 300+ patient inquiries efficiently.",
    technologies: ["React.js", "NLP", "ML libraries", "SVM", "Random Forest"],
    image: "https://placehold.co/600x400/e9ecef/495057?text=AI+Medical+Chatbot&font=roboto",
    links: [
      { icon: Github, url: "https://github.com/Framework12/Medical_ChatBot/tree/master" }
    ],
    achievements: [
      "Designed and deployed a healthcare chatbot using NLP and ML algorithms, handling 300+ patient inquiries efficiently",
      "Improved model accuracy by 10-15 percentage points and reduced false positives for medical instances through optimized ML algorithms",
      "Implemented secure data handling and HIPAA-compliant message processing"
    ]
  }
];

export const EXPERIENCES = [
  {
    title: "Full-Stack Developer",
    company: "Outlier AI",
    logo: outlierLogo,
    period: "Oct 2023 - Present",
    location: "United state, Remote",
    description: "As a Full Stack Developer, I design and develop both frontend and backend components of web applications, ensuring seamless integration and optimal performance. I manage databases, APIs, and infrastructure to deliver scalable, user-centric solutions end to end.",
    achievements: [
      "Implemented performance optimizations for 3 core React/Material UI features, increasing Lighthouse scores from 72 to 89 through strategic code splitting and skeleton loading state implementation.",

"Engineered 10+ reusable components (forms, modals) adopted across teams, reducing duplicate code by implementing Storybook docs and shared custom hooks.",

"Partnered with backend engineers to refine API responses through field filtering and optimize MongoDB aggregation pipelines, decreasing payload sizes and improving report generation efficiency.",
    ]
  },
  {
    title: "React.js Developer",
    company: "Monkoodog LLP",
    logo: monkoodogLogo,
    period: "Dec 2023 - Jun 2024",
    location: "Gurugram, Haryana",
    description: "Led frontend development efforts focusing on high-performance React applications.",
    achievements: [
      "Developed 5+ core features, improving functionality and user engagement .",

      "Designed and optimized React.js applications, reducing page load times by (500ms → 300ms), enhancing user experience.",
      
      "Built responsive UI components with Redux and Tailwind CSS, ensuring a seamless and interactive user experience.",
      
      "Integrated Node.js APIs with the frontend, enabling real-time data updates, improving system efficiency and responsiveness",
      
      "Collaborated with cross-functional teams, working closely with designers and backend developers to implement scalable and maintainable solutions ",
    ]
  },
  {
    title: "Machine Learning Intern",
    company: "InternsElite Pvt LTD",
    logo: internseliteLogo,
    period: "May 2023 - Jul 2023",
    location: "Gurugram, Haryana",
    description: "Developed ML models for predictive analytics and data processing.",
    achievements: [
      "Built an ML model for cab fare prediction, utilizing Python and scikit-learn to analyze two years of historical data (500K rides). Applied feature engineering techniques such as one-hot encoding, feature scaling, and PCA to improve model performance.",

"Increased model accuracy by 7 percentage points, refining predictive capabilities using gradient boosting, ensemble techniques, and hyperparameter tuning.",

"Conducted A/B testing and model evaluation using cross-validation, precision-recall metrics, and confusion matrices to optimize prediction reliability.",  ]
  }
];

export const EDUCATION = [
  {
    degree: "Bachelor of Engineering in Information Technology",
    institution: "UIET-PU (Panjab University)",
    logo: universityLogo,
    period: "2020 - 2024",
    description: "Completed a comprehensive engineering program with a strong emphasis on data structures, algorithms, and problem-solving, laying the groundwork for efficient and scalable software development.",
    achievements: [
      "CGPA: 8.3/10"
    ]
  }
];

export const CONTACT_INFO = {
  email: "itschandanverma18@gmail.com",
  phone: "+91 9024544239",
  location: "Bangalore",
  socialLinks: [
    { name: "GitHub", url: "https://github.com/framework12" },
    { name: "LinkedIn", url: "https://linkedin.com/in/chandanfulvariya" },
  ]
};
