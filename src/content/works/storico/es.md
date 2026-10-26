---
shortDescription: "Herramienta impulsada por LLMs que convierte historias de usuario en lenguaje natural en tareas Kanban estructuradas."
---

**Storico** es una herramienta impulsada por LLMs que automatiza la descomposición de historias de usuario en lenguaje natural en tareas Kanban estructuradas. Un backend hexagonal en FastAPI valida cada historia contra el formato de historia de usuario (Como … quiero … para …), extrae su actor, acción y beneficio, y genera tareas editables y versionadas con modelos locales de Ollama o con un proveedor en la nube. El frontend en Astro y React convierte esas tareas en un tablero Kanban que podés reestructurar, y cualquier selección se puede exportar a CSV, JSON o Markdown, o enviarse directamente a un tablero de Trello. Es mi proyecto de tesis de maestría en la Universidad Tecnológica de la Mixteca (UTM), en Oaxaca, México.
