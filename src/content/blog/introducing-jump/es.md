---
title: "JUMP: el teclado también fuera del navegador"
description: "Por qué construí una app de código abierto para macOS que reemplaza el mouse por el teclado, y cómo funciona por dentro."
pubDate: 2026-10-26
cover: ./cover.webp
coverAlt: "El ícono de JUMP, una tecla de vidrio con la letra J, junto al nombre de la app"
tags: ["Lanzamiento", "macOS", "Open source"]
---

En el navegador casi no uso el mouse. Trabajo con [Surfingkeys](https://github.com/brookhong/Surfingkeys), una extensión que pone una etiqueta sobre cada enlace y botón: escribo la etiqueta y listo, hice clic. Con los años armé todo mi ecosistema alrededor del teclado, y los atajos de Vim (`h j k l`) ya los tengo en los dedos.

El problema empezaba al salir del navegador. Para hacer clic en un solo botón de Finder, de la configuración del sistema o de cualquier otra app, tenía que soltar el teclado, buscar el mouse y volver. Son milisegundos, sí. Pero se repiten muchas veces al día y se acumulan, y soy fanático de la productividad: para mí esos milisegundos importan.

Así nació [JUMP](https://alvaldes.github.io/jump/).

## Qué hace

JUMP es una app de barra de menú para macOS. Presionas un atajo y cada elemento clicable de la ventana activa recibe una etiqueta corta. Escribes la etiqueta y JUMP hace clic.

| Atajo | Modo | Qué hace |
| :--- | :--- | :--- |
| <kbd>⌘</kbd> <kbd>⇧</kbd> <kbd>Space</kbd> | Hints | Etiqueta cada elemento clicable. Escribes la etiqueta y hace clic. |
| <kbd>⌘</kbd> <kbd>⇧</kbd> <kbd>J</kbd> | Scroll | Desplaza la ventana estilo Vim: `h j k l`, `d u`, `gg G`. |
| <kbd>⌘</kbd> <kbd>⇧</kbd> <kbd>F</kbd> | Búsqueda | Encuentra texto visible, sin importar mayúsculas ni acentos. |

Si mantienes un modificador mientras escribes la etiqueta, eliges la acción: <kbd>⇧</kbd> hace clic derecho, <kbd>⌘</kbd> doble clic y <kbd>⌥</kbd> solo mueve el puntero. Los tres atajos y los modificadores se cambian en la configuración.

![Las pantallas de configuración de JUMP: apariencia de las etiquetas y comportamiento de los clics](./settings.webp)

## Por qué no usé algo que ya existía

Lo primero que hice fue buscar. Encontré dos opciones:

- [Vimac](https://github.com/nchudleigh/vimac), de código abierto, pero sin cambios desde diciembre de 2022.
- [Homerow](https://www.homerow.app), su sucesor comercial: funciona bien, pero es de pago y cerrado.

Ninguna me convencía, así que pensé: ¿por qué no hacer mi propia herramienta, a mi gusto, gratis y de código abierto? Soy fanático del código abierto. Me gusta la comunidad que se forma alrededor de un proyecto y la idea de compartir lo que uno aprende. JUMP parte del código de Vimac, que es GPL-3.0, lo moderniza para macOS 26 y se publica con la misma licencia.

## Cómo funciona por dentro

**Accessibility API.** macOS expone la interfaz de cada app como un árbol de elementos: botones, campos, enlaces. JUMP recorre ese árbol en la ventana activa, se queda con lo que se puede accionar y dibuja las etiquetas encima. Por eso necesita el permiso de Accessibility.

**OCR como respaldo.** Hay ventanas que no exponen texto por Accessibility, como las terminales o los PDF. Para esas, JUMP puede reconocer el texto en pantalla con el framework Vision. Viene apagado, pide el permiso de grabación de pantalla solo cuando lo activas, y las capturas nunca salen de la memoria.

**Nada de Mac App Store.** Las apps de la tienda corren en un sandbox, y una app que lee y controla otras apps con Accessibility no puede hacerlo desde ahí. JUMP se distribuye desde GitHub Releases.

## Decisiones de ingeniería

**El núcleo es un paquete aparte.** La lógica vive en `JumpKit`, un paquete de Swift que se prueba sin abrir la app:

```bash
swift test --package-path Packages/JumpKit
```

Probar algo que depende de otras ventanas y de permisos del sistema es difícil. Separar el núcleo de la interfaz lo vuelve testeable.

**El permiso que se perdía en cada build.** macOS asocia el permiso de Accessibility a la firma de la app. Con la firma ad-hoc por defecto, la firma cambia en cada compilación y el permiso se pierde. La solución fue firmar con un certificado de desarrollo propio, y el script de release se niega a publicar si la app está firmada ad-hoc: los usuarios perderían el permiso con cada actualización.

**Un release que no se puede hacer mal.** Ese mismo script también rechaza cambios sin commitear y commits sin tag. Prefiero que falle a publicar algo que no puedo reproducir.

## Pruébalo

JUMP necesita macOS 26 o posterior. Descárgalo desde [su sitio](https://alvaldes.github.io/jump/) o desde [GitHub](https://github.com/alvaldes/jump).

> Todavía no está notarizado por Apple, así que la primera vez macOS lo bloquea. El [README](https://github.com/alvaldes/jump#install) explica cómo abrirlo paso a paso.

Si lo usas y algo no funciona, o se te ocurre una mejora, [abre un issue](https://github.com/alvaldes/jump/issues) en el repositorio. Para eso es de código abierto.
