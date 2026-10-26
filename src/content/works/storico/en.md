---
shortDescription: "LLM-powered tool that turns natural language user stories into structured Kanban tasks."
---

**Storico** is an LLM-powered tool that automates decomposing natural language user stories into structured Kanban tasks. A hexagonal FastAPI backend validates each story against the user story format (As a(n) … I want … so that …), extracts its actor, action and benefit, and generates editable, versioned tasks with local Ollama models or a cloud provider. The Astro and React frontend turns those tasks into a Kanban board you can restructure, and any selection can be exported as CSV, JSON or Markdown, or sent straight to a Trello board. It is my Master's thesis project at the Technological University of the Mixteca (UTM) in Oaxaca, Mexico.
