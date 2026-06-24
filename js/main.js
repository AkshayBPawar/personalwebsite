const state = {
  profile: null,
};

const formatSectionTitle = (title) => title.toUpperCase();

const renderHero = (profile) => {
  document.getElementById('name').textContent = profile.personal.name;
  document.getElementById('title').textContent = profile.personal.currentTitle;
  document.getElementById('tagline').textContent = profile.personal.tagline;
  document.getElementById('hero-summary').textContent = profile.personal.summary;
  document.getElementById('experience-years').textContent = profile.personal.experienceYears;
  document.getElementById('location-pill').textContent = profile.personal.location;
  document.getElementById('resume-link').href = profile.personal.resumeUrl;
  document.getElementById('contact-link').href = `mailto:${profile.contact.email}`;
};

const renderAbout = (profile) => {
  document.getElementById('about-summary').textContent = profile.summary;
  const highlights = document.getElementById('highlights');
  highlights.innerHTML = profile.highlights
    .map((item) => `<div class="highlight-item">${item}</div>`)
    .join('');
};

const renderSkills = (profile) => {
  const skillsRoot = document.getElementById('skills-grid');
  const categories = Object.entries(profile.skills);
  skillsRoot.innerHTML = categories
    .map(([category, items]) => `
      <article class="skill-card surface reveal">
        <h3>${category}</h3>
        <ul class="skill-list">
          ${items.map((item) => `<li>${item}</li>`).join('')}
        </ul>
      </article>
    `)
    .join('');
};

const renderExperience = (profile) => {
  const timeline = document.getElementById('timeline-list');
  timeline.innerHTML = profile.experience
    .map(
      (item) => `
        <article class="timeline-item">
          <div class="meta">${item.period}</div>
          <h3>${item.role}</h3>
          <div class="company">${item.company} · ${item.location}</div>
          <ul>
            ${item.responsibilities.map((entry) => `<li>${entry}</li>`).join('')}
          </ul>
          ${item.achievements?.length ? `<ul>${item.achievements.map((entry) => `<li>${entry}</li>`).join('')}</ul>` : ''}
        </article>
      `
    )
    .join('');
};

const renderProjects = (profile) => {
  const grid = document.getElementById('projects-grid');
  grid.innerHTML = profile.projects
    .map(
      (project) => `
        <article class="project-card surface reveal">
          <h3>${project.name}</h3>
          <p>${project.description}</p>
          <div class="tags">
            ${project.technologies.map((tech) => `<span>${tech}</span>`).join('')}
          </div>
          <ul>${project.outcomes.map((outcome) => `<li>${outcome}</li>`).join('')}</ul>
        </article>
      `
    )
    .join('');
};

const renderEducation = (profile) => {
  const grid = document.getElementById('education-grid');
  grid.innerHTML = profile.education
    .map(
      (item) => `
        <article class="project-card surface reveal">
          <h3>${item.degree}</h3>
          <p>${item.institution}</p>
          <p>${item.period}</p>
        </article>
      `
    )
    .join('');
};

const renderCertifications = (profile) => {
  const grid = document.getElementById('cert-grid');
  grid.innerHTML = profile.certifications
    .map(
      (item) => `
        <article class="project-card surface reveal">
          <h3>${item.name}</h3>
          <p>${item.issuer}</p>
        </article>
      `
    )
    .join('');
};

const renderAchievements = (profile) => {
  const grid = document.getElementById('achievements-grid');
  grid.innerHTML = profile.achievements
    .map(
      (item) => `
        <article class="project-card surface reveal">
          <h3>${item.title}</h3>
          <p>${item.description}</p>
        </article>
      `
    )
    .join('');
};

const renderContact = (profile) => {
  const list = document.getElementById('contact-list');
  const items = [
    ['Email', profile.contact.email, `mailto:${profile.contact.email}`],
    ['LinkedIn', profile.contact.linkedin.label, profile.contact.linkedin.href],
    ['GitHub', profile.contact.github.label, profile.contact.github.href],
    ['Phone', profile.contact.phone, `tel:${profile.contact.phone}`],
    ['Location', profile.contact.location, profile.contact.mapsHref],
  ];

  list.innerHTML = items
    .map(([label, value, href]) => `
      <li>
        <strong>${label}</strong>
        <a href="${href}" ${href.startsWith('http') ? 'target="_blank" rel="noreferrer"' : ''}>${value}</a>
      </li>
    `)
    .join('');
};

const revealOnScroll = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
};

const init = async () => {
  try {
    const response = await fetch('data/profile.json');
    if (!response.ok) throw new Error('Unable to load profile data');
    state.profile = await response.json();
    renderHero(state.profile);
    renderAbout(state.profile);
    renderSkills(state.profile);
    renderExperience(state.profile);
    renderProjects(state.profile);
    renderEducation(state.profile);
    renderCertifications(state.profile);
    renderAchievements(state.profile);
    renderContact(state.profile);
    revealOnScroll();
  } catch (error) {
    document.getElementById('status-message').textContent = 'Profile data could not be loaded.';
    console.error(error);
  }
};

window.addEventListener('DOMContentLoaded', init);
