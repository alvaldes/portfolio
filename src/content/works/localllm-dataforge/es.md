---
shortDescription: "Un pipeline simplificado inspirado en Distilabel para creación de datasets sintéticos usando pandas DataFrames y modelos Ollama locales."
---

**LocalLLM-DataForge** es una arquitectura de pipeline de datos para descomponer historias de usuario en tareas de desarrollo usando LLMs locales con Ollama. Inspirado en Distilabel, organiza el procesamiento siguiendo el flujo natural de los datos: Entrada → Procesamiento LLM → Validación/Reparación → Salida. Incluye soporte nativo para pandas DataFrames, arquitectura de pasos modular, caché automático, procesamiento paralelo por lotes, validación LLM-as-a-judge, comparación de generadores duales y reparación JSON para manejo robusto de salidas de LLMs.
