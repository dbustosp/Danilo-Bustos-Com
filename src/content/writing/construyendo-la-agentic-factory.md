---
title: 'Lo que aprendí construyendo la Agentic Factory'
description: 'Por qué los agentes hechos uno a uno no escalan en una empresa regulada, y qué hace falta para convertir su creación en un músculo repetible.'
date: 2026-09-22
category: ingenieria
featured: true
draft: true
lang: es
# Cuando el texto esté listo, enlazar el artículo original:
# origin:
#   label: 'LinkedIn'
#   url: 'https://www.linkedin.com/pulse/...'
---

<!--
  BORRADOR. Migración del artículo de LinkedIn "From AI Foundations to
  Agentic Factory: my key learnings".

  Categoría sugerida: ingenieria o enterprise, según el enfoque con que se
  reescriba. Si el hilo es la plataforma (cómo se construye), ingenieria.
  Si el hilo es la adopción (por qué una empresa lo necesita), enterprise.

  Regla de migración: no copiar y pegar. Reescribir más largo, con más
  profundidad y contexto. Aquí caben diagramas (Mermaid) y desarrollo.

  Flujo de trabajo (ver CLAUDE.md):
    1. Estas preguntas son el andamiaje de entrevista.
    2. Danilo dicta las respuestas en bruto, en su voz.
    3. Claude corrige solo la mecánica. No redacta prosa de cero.

  Guardarraíles de divulgación: sin nombres internos de sistemas, sin cifras
  no confirmadas públicamente, hitos verificados contra declaraciones
  públicas, crítica a proveedores anónima.

  El artículo original está en inglés. Si la versión larga se dicta en
  inglés, cambiar lang: en y el título.
-->

**¿Cuál era el problema real antes de la factory? ¿Qué pasaba cuando un equipo quería un agente?**

**¿Por qué "fábrica" y no un catálogo de agentes a medida? ¿En qué momento quedó claro que uno a uno no escalaba?**

**¿Qué significa en la práctica que la gobernanza venga incorporada, y no añadida al final?**

**¿Cómo se evalúa un agente antes de que llegue a producción? ¿Qué mide, y qué no se puede medir todavía?**

**¿Qué se rompió, o casi, en el camino a producción? ¿Qué aprendiste de eso?**

**¿Qué papel juega el marketplace interno? ¿Reutilizar agentes funciona de verdad?**

**Si tuvieras que empezar de nuevo, ¿qué harías distinto y qué mantendrías igual?**

**¿Qué diferencia a las empresas que van a ganar con agentes de las que van a fracasar?**
