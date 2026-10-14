
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Java",
    "Git",
    "GitHub",
  ];

  useEffect(() => {
    fetch(
      "https://api.github.com/users/VuyisileVN/repos?per_page=100&sort=updated"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to load repositories.");
        }

        return response.json();
      })
      .then((repositories) => {
        const publicProjects = repositories
          .filter((repo) => !repo.archived && !repo.fork)
          .map((repo) => ({
            id: repo.id,
            name: repo.name,
            description:
              repo.description ||
              "Explore this project and its source code on GitHub.",
            language: repo.language,
            github: repo.html_url,
            updated: repo.updated_at,
          }));

        setProjects(publicProjects);
      })
      .catch(() => {
        setError(
          "Unable to load projects right now. Please visit my GitHub profile."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="portfolio">
      {/* Navigation */}
      <nav className="navbar">
        <a href="#home" className="logo">
          VNC<span>.</span>
        </a>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#cv">CV</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* Home */}
      <section id="home" className="hero">
        <p className="eyebrow">COMPUTER SCIENCE STUDENT</p>

        <h1>
          Hi, I'm <span>Vuyisile</span>
        </h1>

        <h2>Aspiring Software Developer</h2>

        <p className="hero-description">
          I am a Computer Science student passionate about
          learning software development and building practical
          applications. I am seeking a Work-Integrated Learning
          opportunity where I can improve my skills, gain
          real-world experience, and contribute to a team.
        </p>

        <div className="hero-buttons">
          <a href="#projects" className="gold-button">
            View My Projects
          </a>

          <a href="#contact" className="outline-button">
            Contact Me
          </a>
        </div>

        <div className="hero-socials">
          <a
            href="https://github.com/VuyisileVN"
            target="_blank"
            rel="noreferrer"
          >
            Visit My GitHub ↗
          </a>
        </div>
      </section>

      {/* About */}
      <section id="about" className="section">
        <p className="eyebrow">GET TO KNOW ME</p>
        <h2>About Me</h2>

        <p className="section-description">
          My name is Vuyisile Nkosinathi Chili. I am a
          Computer Science student developing my programming
          skills through coursework and personal projects.

          {" "}I enjoy learning how websites and applications
          work, solving problems, and turning ideas into
          working projects.

          {" "}My goal is to secure a Work-Integrated Learning
          placement where I can apply my knowledge, learn from
          experienced developers, and contribute to a
          professional team.
        </p>
      </section>

      {/* Skills */}
      <section id="skills" className="section">
        <p className="eyebrow">WHAT I'M LEARNING</p>
        <h2>My Skills</h2>

        <p className="section-description">
          These are some of the technologies I study and
          practise through programming and web development.
        </p>

        <div className="skills-list">
          {skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>

        <p className="note">
          Only keep technologies you have actually studied
          or practised.
        </p>
      </section>

      {/* Projects */}
      <section
        id="projects"
        className="section projects-section"
      >
        <p className="eyebrow">WHAT I'VE BEEN BUILDING</p>
        <h2>My GitHub Projects</h2>

        <p className="section-description">
          Explore my programming projects and open their
          source code directly on GitHub. Public repositories
          are loaded automatically.
        </p>

        {loading && (
          <div className="loading-message">
            <div className="loader"></div>
            <p>Loading my GitHub projects...</p>
          </div>
        )}

        {!loading && error && (
          <div className="error-message">
            <p>{error}</p>

            <a
              href="https://github.com/VuyisileVN?tab=repositories"
              target="_blank"
              rel="noreferrer"
              className="gold-button"
            >
              View All Repositories ↗
            </a>
          </div>
        )}

        {!loading && !error && (
          <>
            <p className="project-count">
              {projects.length} public projects
            </p>

            {projects.length === 0 ? (
              <p className="note">
                No public repositories were found.
              </p>
            ) : (
              <div className="project-grid">
                {projects.map((project, index) => (
                  <article
                    className="project-card"
                    key={project.id}
                  >
                    <p className="project-number">
                      PROJECT {String(index + 1).padStart(2, "0")}
                    </p>

                    <h3>{project.name.replace(/[-_]/g, " ")}</h3>

                    <p className="project-description">
                      {project.description}
                    </p>

                    <div className="project-tags">
                      <span>
                        {project.language || "Programming"}
                      </span>
                    </div>

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="gold-button project-link"
                    >
                      View on GitHub ↗
                    </a>
                  </article>
                ))}
              </div>
            )}

            <div className="all-projects">
              <a
                href="https://github.com/VuyisileVN?tab=repositories"
                target="_blank"
                rel="noreferrer"
                className="outline-button"
              >
                Explore All Repositories ↗
              </a>
            </div>
          </>
        )}
      </section>

      {/* CV */}
      <section id="cv" className="section">
        <p className="eyebrow">EDUCATION AND EXPERIENCE</p>
        <h2>My CV</h2>

        <p className="section-description">
          Learn more about my education, technical skills,
          projects, and Work-Integrated Learning goals.
        </p>

        <p className="note">
          To enable CV downloads, place your PDF file inside
          the public folder of your React project.
        </p>

        <a
          href="/Vuyisile-CV.pdf"
          download="Vuyisile-CV.pdf"
          className="gold-button cv-button"
        >
        Download My CV ↓
        </a>
      </section>

      {/* Contact */}
      <section id="contact" className="section contact">
        <p className="eyebrow">LET'S CONNECT</p>
        <h2>Looking for a WIL Opportunity</h2>

        <p className="section-description">
          I am interested in opportunities where I can gain
          practical experience, strengthen my technical skills,
          and contribute to a software development team.
        </p>

        <div className="contact-buttons">
          <a
            href="mailto:vuyisilenathi@gmail.com"
            className="gold-button"
          >
            Email Me
          </a>

          <a
            href="https://github.com/VuyisileVN"
            target="_blank"
            rel="noreferrer"
            className="outline-button"
          >
            GitHub Profile ↗
          </a>
        </div>

        <p className="contact-email">
          vuyisilenathi@gmail.com
        </p>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>
          © {new Date().getFullYear()} Vuyisile Nkosinathi
          Chili. Built with React.
        </p>
      </footer>
    </div>
  );
}

export default App;
