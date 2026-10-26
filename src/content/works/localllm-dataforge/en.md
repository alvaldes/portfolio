---
shortDescription: "A simplified Distilabel-inspired pipeline for synthetic dataset creation using pandas DataFrames and local Ollama models."
---

**LocalLLM-DataForge** is a data pipeline architecture for decomposing user stories into development tasks using local LLMs with Ollama. Inspired by Distilabel, it organizes processing following the natural data flow: Input → LLM Processing → Validation/Repair → Output. Features native pandas DataFrame support, step-based processing architecture, automatic caching, parallel batch processing, LLM-as-a-judge validation, dual generator comparison, and JSON repair for robust LLM output handling.
