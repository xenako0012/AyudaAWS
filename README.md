# AWS Academy Cloud Foundations · Curso completo en español

Sitio web estático, sin dependencias ni proceso de compilación, con todo el temario de
**AWS Academy Cloud Foundations** explicado en español: 10 módulos, 50 secciones,
150 preguntas de autoevaluación y 260+ términos de glosario.

## Contenido

| Módulos | Tema |
| --- | --- |
| 1 | Información general sobre los conceptos de la nube |
| 2 | Facturación y economía de la nube |
| 3 | Infraestructura global de AWS |
| 4 | Seguridad en la nube |
| 5 | Redes y entrega de contenido |
| 6 | Informática (cómputo) |
| 7 | Almacenamiento |
| 8 | Bases de datos |
| 9 | Arquitectura en la nube |
| 10 | Monitoreo y escalado automático |

Cada sección incluye objetivos de aprendizaje, explicación con tablas y esquemas,
notas orientadas al examen, términos clave y un cuestionario con explicaciones.

## Funciones

- **Navegación por módulos y secciones** con barra lateral, migas y enlaces anterior/siguiente.
- **Buscador global** (`Ctrl` + `K` o `/`) sobre secciones, módulos y glosario.
- **Progreso guardado** en `localStorage`: porcentaje, secciones completadas por módulo y reinicio.
- **Cuestionarios** con corrección inmediata y explicación de cada respuesta.
- **Simulacro de examen** configurable (10–40 preguntas, por módulo o global) en modo práctica
  o modo examen, con revisión final de todas las preguntas.
- **Glosario** alfabético con filtro por texto y por módulo.
- **Tema claro/oscuro**, diseño responsive y estilos de impresión (PDF).

## Estructura

```
index.html                  Estructura, navegación y contenedores
assets/css/estilos.css      Diseño completo (temas, componentes, responsive, impresión)
assets/js/app.js            Router por hash, render, progreso, buscador, quiz y examen
assets/js/datos/m01..m10.js Contenido de cada módulo
```

El contenido vive en `assets/js/datos/*.js` como objetos JavaScript. Cada módulo se registra con:

```js
(window.MODULOS = window.MODULOS || []).push({
  id: 'm1', numero: 1, titulo: '…', descripcion: '…', duracion: '90 min', objetivo: '…',
  secciones: [
    {
      id: 'm1s1', titulo: '…', resumen: '…', objetivos: ['…'],
      bloques: [
        { t: 'p', c: 'Texto con **negrita**, `código` y *cursiva*.' },
        { t: 'h', c: 'Subtítulo' },
        { t: 'ul', c: ['punto 1', 'punto 2'] },
        { t: 'tabla', cab: ['A', 'B'], filas: [['a', 'b']] },
        { t: 'nota', clase: 'examen', titulo: '…', c: '…' },
        { t: 'esquema', c: [{ titulo: 'EC2', sub: 'Servidores virtuales' }] }
      ],
      terminos: [{ t: '…', d: '…' }],
      quiz: [{ p: '…', op: ['a', 'b', 'c', 'd'], ok: 0, e: 'Explicación' }]
    }
  ]
});
```

Clases de nota disponibles: `examen`, `tip`, `aviso`, `dato`.

## Uso local

No requiere instalación. Sirve la carpeta con cualquier servidor estático:

```bash
python3 -m http.server 8000
# abre http://localhost:8000
```

También funciona abriendo `index.html` directamente en el navegador.

## Aviso

Material didáctico independiente elaborado a partir de documentación pública de AWS y del
temario del curso. **No es un curso oficial de Amazon Web Services** ni reproduce material
propietario. Las cifras de precios, límites y número de regiones cambian con el tiempo:
verifica siempre los datos en la documentación oficial antes de tomar decisiones de producción.
AWS y el resto de marcas son propiedad de Amazon.com, Inc. o sus filiales.
