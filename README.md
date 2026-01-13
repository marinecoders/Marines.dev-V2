# Marine Corps Software Factory Portfolio Site

### This project is built using Astro, Svelte, and Tailwind CSS.

File Structure
The file structure of this Astro project is as follows:

**src/:** This is where all your source files live.

**components/:** This directory contains all the Svelte components.

**pages/:** This directory contains all the pages of your website. Each file corresponds to a URL on your website.

**styles/:** This directory contains all your stylesheets.

**layouts/:** This directory contains your layout components.

**public/:** This directory contains static assets that are copied to the root of your built site.

**astro.config.mjs:** This file is the configuration file for your Astro project.

**package.json:** This file contains the list of project dependencies and scripts.

## Svelte

Svelte is a modern JavaScript compiler that allows you to write easy-to-understand JavaScript code which is then compiled to highly efficient code that runs in the browser. In this project, Svelte is used to create interactive UI components.

## Tailwind CSS

Tailwind CSS is a utility-first CSS framework that is highly customizable and allows you to build modern websites without ever leaving your HTML. In this project, Tailwind CSS is used for styling the UI components.

Getting Started
To get started with this project, clone the repository and install the dependencies:

`git clone <repository-url>
cd <repository-name>
npm install`

To start the development server, run:

`npm run dev`

This will start the server on http://localhost:4321.

Building for Production
To create an optimized build of your site, run:

`npm run build`

This will create a dist/ directory with your built site.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                    | Action                                      |
| :------------------------- | :------------------------------------------ |
| `npm install`              | Installs dependencies                       |
| `npm run dev`              | Starts local dev server at `localhost:4321` |
| `npm run build`            | Build your production site to `./dist/`     |
| `npm run test`             | Run all tests                               |
| `npm run test:integration` | Run integration tests only                  |

## 🧪 Testing & Quality Assurance

This project includes comprehensive testing with automated quality gates to ensure code quality and site functionality.

### Pre-commit Hook Features

- **Fast Linting**: Runs ESLint on JavaScript, TypeScript, and Svelte files
- **Quick Validation**: Only runs fast checks to avoid blocking development workflow
- **Code Quality**: Ensures consistent code style and catches syntax errors

### Integration Testing (CI/CD Pipeline)

Comprehensive integration tests run automatically in GitHub Actions before deployment:

- ✅ All pages build and load successfully
- ✅ Page performance (load times under 5 seconds)
- ✅ Mobile responsiveness validation
- ✅ Navigation functionality testing
- ✅ Image loading verification
- ✅ JavaScript error detection
- ✅ CSS and JS resources load properly
- ✅ Proper HTML structure and SEO meta tags

### How It Works

1. **On Commit**: Fast linting runs via pre-commit hook (< 5 seconds)
2. **On Push to Main**: GitHub Actions triggers comprehensive integration tests
3. **Quality Gate**: Deployment only proceeds if all tests pass
4. **Build & Deploy**: Site builds and deploys to GitHub Pages after successful tests

### Manual Testing

You can run tests manually at any time:

```bash
# Run integration tests locally
npm run test:integration

# Run all tests
npm run test
```

### CI/CD Pipeline

The deployment workflow includes:

1. **Integration Tests**: Full site testing with Puppeteer (18 test cases)
2. **Build**: Astro site compilation
3. **Deploy**: GitHub Pages deployment (only if tests pass)

### Test Coverage

Tests cover all major pages:

- Home page (/)
- About, Timeline, Publication pages
- Articles and Roles sections
- 404 error handling

This approach ensures fast development workflow while maintaining deployment quality through comprehensive CI/CD testing.

## 🚀 Project Structure

Inside of the project you'll see this basic file structure:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

The components are organized into buttons, cards, dropdown, elements (other basic code blocks reused across the site), sections (used for sections of pages), and utils.

Any static assets, like images, can be placed in the `public/` directory.

License
This project is licensed under the MIT License.
