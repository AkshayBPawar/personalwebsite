# Akshay Pawar Portfolio

A fast, modern, recruiter-friendly personal portfolio website built from the resume content in the workspace.

## Structure

- index.html — main page shell
- css/style.css — visual system and responsive layout
- js/main.js — data-driven rendering from JSON
- data/profile.json — single source of truth for profile content
- assets/ — local image assets
- resume.pdf — resume PDF used by the site
- sitemap.xml — sitemap for search engines
- robots.txt — crawler instructions
- .github/workflows/deploy.yml — Azure Static Web Apps deployment workflow
- staticwebapp.config.json — Azure routing configuration

## Run locally

Open index.html directly in a browser, or serve the folder with a simple static server:

```bash
python -m http.server 8000
```

Then visit http://localhost:8000.

## Deployment

### GitHub Pages / static hosting

1. Commit the project to GitHub.
2. In repository settings, enable GitHub Pages from the root branch.
3. The site will be published at your repository URL.

### Azure Static Web Apps

1. Create a Static Web App in Azure.
2. Connect the GitHub repository.
3. Set the app location to the workspace root.
4. Deploy.

## Notes

The site intentionally leaves a few sections as TODO placeholders where the resume did not provide enough detail, so the content remains accurate and editable.
