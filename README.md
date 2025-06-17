# 🧩 DevifyX: Dependency Visualizer

DevifyX is a visual tool to analyze and compare dependency trees from different project files such as `package.json`, `requirements.txt`, and `pom.xml`. It helps developers better understand dependency structures, identify outdated or missing packages, and explore their project’s architecture visually.

## 🔗 Live Demo

🌐 [View the Live App](https://lucky-belekoy-e0da5e.netlify.app/)

---

## 🚀 Features

- 📂 **File Upload Support** for:
  - `package.json` (npm)
  - `requirements.txt` (pip)
  - `pom.xml` (maven)

- 🌳 **Interactive Tree View**  
  - Zoom, pan, expand/collapse  
  - Outdated version indicators  
  - Hover tooltips and node metadata  
  - Scrollable and responsive canvas  

- 🔍 **Search & Filter**  
  Quickly search for any dependency in the tree.

- 🌓 **Light/Dark Mode Toggle**  
  Clean and accessible UI with user-preference persistence.

- 🧾 **Export Options**  
  Export your visualized tree or metadata as PNG/JSON.

---

## 📁 Usage

1. Clone the repository:

```bash
git clone https://github.com/your-username/devifyx.git
cd devifyx
```
2. Install dependencies:

```bash
npm install
```
3. Run the development server:

```bash
npm run dev
```

---

## 🛠️ Tech Stack
- React.js
- react-d3-tree for visualizing dependency trees
- Tailwind CSS for UI styling (no custom config required)
- Lucide Icons for theme toggling and UI elements

---

### 🤖 Use of AI Tools
This project used AI tools as part of the development workflow:

## ✅ ChatGPT
- Assisting in designing the tree structure and UI logic

- Debugging layout issues (e.g., right-most node visibility)

- Creating code for multi-project upload and comparison

- Writing commit messages and this README.md content

## ✅ GitHub Copilot
- Auto-completing React component boilerplate

- Suggesting variable names and JSX structure during development

- All AI-generated code was reviewed and manually tested by the developer.

---
## 🙌 Acknowledgements
- react-d3-tree: https://www.npmjs.com/package/react-d3-tree

- lucide-react: https://www.npmjs.com/package/lucide-react

- OpenAI ChatGPT: https://chatgpt.com/

- GitHub Copilot: https://github.com/features/copilot
