---
title: "Guía de estilo de Markdown"
description: "Todos los elementos de Markdown que admite el blog, para revisar cómo se ven con el diseño del sitio."
pubDate: 2026-10-26
cover: ./cover.webp
coverAlt: "Un símbolo de Markdown sobre un degradado azul y rosa"
tags: ["Markdown", "Guía"]
draft: true
---

Este artículo es un borrador: solo aparece en `astro dev`. Sirve para revisar cómo se ve cada elemento de Markdown antes de publicar.

## Encabezados

Los títulos de sección usan `##`. El título del artículo sale del frontmatter.

### Encabezado de tercer nivel

#### Encabezado de cuarto nivel

## Texto

Un párrafo con **negrita**, *cursiva*, ~~tachado~~, `código en línea`, un [enlace](https://astro.build) y una tecla <kbd>⌘</kbd> + <kbd>K</kbd>. También admite notas al pie[^1].

> Una cita destacada. Sirve para resaltar una idea o citar a alguien.

## Listas

- Un elemento
- Otro elemento con una lista dentro:
  - Elemento anidado
  - Otro anidado

1. Primer paso
2. Segundo paso
3. Tercer paso

- [x] Tarea terminada
- [ ] Tarea pendiente

## Código

```ts
export function greet(name: string): string {
	return `Hola, ${name}`;
}
```

```bash
bun run build
```

## Tablas

| Herramienta | Uso | Desde |
| :--- | :--- | ---: |
| Astro | Sitio y blog | 2024 |
| Tailwind CSS | Estilos | 2023 |
| LazyVim | Editor | 2022 |

## Imágenes

![La portada de este artículo](./cover.webp)

---

Fin del artículo.

[^1]: Las notas al pie aparecen al final, separadas del texto.
