---
title: "Convertí un lanzamiento en skills de Claude"
description: "Lanzar JUMP me llevó tres días y más de una docena de sitios. Empaqueté lo aprendido en skills de código abierto que hacen el trabajo y se detienen antes de publicar."
pubDate: 2026-10-28
cover: ./cover.webp
coverAlt: "El ícono de launch-skills, una flecha naranja hacia arriba y a la derecha, junto al nombre launch-skills"
tags: ["Open source", "Claude Code", "IA"]
---

Construir [JUMP](/blog/introducing-jump/) me llevó semanas. Contarlo me llevó tres días, y esos días fueron puros formularios.

Product Hunt pide una galería de 1270×760. Dev.to, una portada de 1000×420; Hashnode, una de 1600×840. AlternativeTo pide el país del autor. MacUpdate, un PNG transparente de al menos 512 píxeles. r/macapps pide un post en un formato llamado PCP, y solo una vez cada 30 días. Cada sitio tenía sus reglas, y la mayoría las aprendí equivocándome.

Hice ese lanzamiento con Claude Code manejando un navegador. Al final tenía un documento con cada regla con la que me había topado. Lo lógico era convertir ese documento en skills, para que el próximo lanzamiento me lleve una tarde y no tres días.

Así nació [launch-skills](https://github.com/alvaldes/launch-skills).

## Qué es una skill

Una skill es una carpeta con un archivo `SKILL.md`: instrucciones que un agente como Claude Code carga cuando tu pedido coincide con su descripción. También puede traer scripts y archivos de referencia. No la llamas por su nombre. Dices "agrega mi app a awesome-mac" y la skill correcta se carga sola.

Las skills encajan bien con un trabajo así: muchas reglas pequeñas que nadie recuerda, algunos pasos que deberían ser scripts y decisiones de criterio entre medio.

## Las seis skills

| Skill | Qué hace |
|---|---|
| `launch-kit` | Junta el nombre, el tagline, las descripciones y la comparación desde tu proyecto, y genera cada tamaño de imagen que piden los sitios |
| `launch-cross-post` | Republica tu post del blog en Dev.to, Hashnode y Medium, con el enlace canónico apuntando a tu sitio |
| `launch-lists` | Agrega la herramienta a listas curadas de GitHub, un pull request por lista |
| `launch-directories` | Completa formularios de directorios y newsletters: AlternativeTo, MacUpdate, Indie Hackers, AppAddict, iOS Dev Weekly |
| `launch-community-drafts` | Redacta posts para r/macapps, Show HN, Product Hunt y redes sociales, y los revisa contra las reglas de cada sitio |
| `launch-tracker` | Mantiene una tabla con cada canal, su estado y su enlace |

Todo lo de un lanzamiento vive en tu proyecto, en `docs/launch/<slug>/`: el kit, las imágenes, los borradores y el tracker. Las demás skills leen del kit, así que cada dato se escribe una sola vez.

## La regla más importante: detenerse antes de publicar

Cada skill se detiene antes del último clic. Completa el formulario, guarda el borrador o prepara el pull request, te muestra qué contiene y te pregunta. Iniciar sesión, resolver captchas y pagar por una cola de revisión más rápida siempre te toca a ti.

No es desconfianza en el agente. Todo sale con tu nombre, y parte de eso no tiene vuelta atrás. Un pull request al repo de otra persona, un post que gasta tu única promoción del mes: una vez que sale, salió.

## Lo que me enseñó el lanzamiento

Algunas reglas me sorprendieron, así que quedaron escritas en las skills:

- **Las cuentas nuevas no pueden lanzar.** Hacker News manda a las cuentas nuevas a una página que limita los Show HN. Indie Hackers solo deja publicar a miembros con historial. r/macapps pide 10 de karma ganado dentro del subreddit. Las skills revisan esa barrera primero, y si está cerrada te dicen cuándo se abre.
- **Las comunidades notan cuando un post lo escribió una IA.** r/opensource lo dice sin vueltas: "All AI-generated content is low-effort and ban worthy". r/macapps avisa que sus filtros detectan las rayas largas. Por eso la skill de comunidades escribe borradores, no posts. Su verificador marca las rayas largas, y cada borrador viene con el recordatorio de reescribirlo con tu voz.
- **Las listas cierran.** awesome-macOS dejó de aceptar envíos públicos el día antes de que yo llegara. En palabras de sus maintainers: "overrun by AI slop submissions which took all the joy out of doing it." Antes de editar nada, `launch-lists` revisa que el repo todavía acepte pull requests públicos.
- **La URL canónica tiene que ser la final.** Las republicaciones solo le dan el crédito a tu blog si el enlace canónico apunta a la dirección que de verdad responde, no a una que redirige. La skill lo comprueba con `curl` antes que nada.

La tercera me quedó dando vueltas. Una skill que llena las listas de spam más rápido es lo último que esas listas necesitan. Estas skills hacen la parte tediosa para que pongas tu tiempo en la parte que es tuya.

## Cómo las probé

Una skill son instrucciones, así que ¿cómo se prueba? En dos capas.

**Los scripts tienen tests.** Insertar una línea en orden alfabético en cuatro READMEs, agregar una entrada a un JSON de 15.000 líneas sin reformatearlo, preparar un artículo para republicarlo: eso es determinista, así que son scripts de Python con 25 tests unitarios. Después corrí cada script con los datos reales de JUMP y comparé el resultado con lo que había publicado a mano. Coincidieron byte por byte.

**Las skills tienen evals.** Claude Code corre casos de evaluación con `claude plugin eval`: un prompt, un espacio de trabajo vacío y criterios que revisan si la skill se activó, si se escribió un archivo y, con un modelo como juez, si la respuesta hizo lo correcto. Un caso pide agregar una app a la lista cerrada y solo pasa si el agente no abre ningún pull request y ofrece otra lista.

La primera corrida no pasó. Fallaron dos casos: Bash no estaba habilitado en los casos, así que el verificador de borradores nunca corrió, y uno de mis criterios de evaluación era ambiguo. Las dos fallas estaban en cómo armé las pruebas, no en las skills. El agente dijo claramente que no pudo correr el verificador, y no fingió que lo había hecho. Después de corregir las dos, pasan los 3 casos y los 10 criterios, en menos de un minuto y por unos 50 centavos de dólar.

## Pruébalas

En Claude Code:

```text
/plugin marketplace add alvaldes/launch-skills
/plugin install launch-skills@launch-skills
```

Después pide en palabras simples, desde el proyecto que vas a lanzar: "prepara el kit de lanzamiento", "agrégalo a awesome-mac", "redacta el Show HN". También funcionan con otros agentes que leen archivos `SKILL.md`.

Las reglas de los canales salen del lanzamiento de una app de macOS, así que ahí están más completas. Si lanzas una librería, una CLI o una web, las listas y los directorios cambian. Esa es la contribución que más me gustaría recibir: [abre un issue o un pull request](https://github.com/alvaldes/launch-skills) con los lugares que te funcionaron.
