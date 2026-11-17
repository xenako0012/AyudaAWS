# AWS Academy Cloud Foundations · Módulos 1 a 4 · Curso en español

Sitio web estático, sin dependencias ni proceso de compilación, con los **cuatro primeros
módulos** de **AWS Academy Cloud Foundations** explicados en español: 4 módulos,
17 secciones, 57 preguntas de autoevaluación y 101 términos de glosario.

Está ampliado con el material de la charla **«La nube desde dentro: usuarios, proveedores
y almacenamiento de objetos»** (Marcos García Martín, MEGA S4, CIFP Avilés, 29 de octubre
de 2026), integrada dentro de las secciones de los cuatro módulos.

## Contenido

| Módulo | Tema | Secciones |
| --- | --- | --- |
| 1 | Información general sobre los conceptos de la nube | 4 |
| 2 | Facturación y economía de la nube | 5 |
| 3 | Información general sobre la infraestructura global de AWS | 2 |
| 4 | Seguridad en la nube | 6 |

Cada sección incluye objetivos de aprendizaje, explicación con tablas y esquemas,
notas orientadas al examen, términos clave y un cuestionario con explicaciones.

### Material de la charla, ya integrado

| Idea | Dónde aparece |
| --- | --- |
| Serverless como modelo de servicio y cuándo sale más barato | 1.1 |
| Roles profesionales (DevOps, SRE, plataforma, arquitectura cloud) | 1.3 |
| Percentiles, la cola lenta y «un archivo grande frente a muchos pequeños» | 1.2 |
| Criterios para elegir proveedor, lock-in, Dropbox y Netflix, Data Act | 1.4 |
| Los cinco conceptos que se facturan y el peligro del egress | 2.1 |
| Incidentes reales (incendio de OVHcloud, caída de us-east-1) y el trabajo del proveedor | 3.1 |
| Almacenamiento de objetos, once nueves, HLS y CDN, arquitectura web mínima | 3.2 |
| Qué hace el proveedor por dentro y qué no cubre el modelo compartido | 4.1 |
| Dependabot, OWASP y revisión de dependencias del propio proyecto | 4.3 |
| Copias de seguridad en tres niveles, regla 3-2-1 e inmutabilidad | 4.5 |

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
assets/js/datos/m01..m04.js Contenido de cada módulo
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

## Fuentes

- Documentación oficial de AWS (definiciones, límites y precios).
- Temario de AWS Academy Cloud Foundations, módulos 1 a 4.
- Charla «La nube desde dentro: usuarios, proveedores y almacenamiento de objetos», de
  Marcos García Martín (Software Engineer en MEGA S4), CIFP Avilés, 29 de octubre de 2026,
  módulo Despliegue en la nube (MOC) 0492.
- Reglamento (UE) 2023/2854 (Data Act), para las obligaciones de cambio de proveedor.

## Aviso

Material didáctico independiente elaborado a partir de documentación pública de AWS y del
temario del curso. **No es un curso oficial de Amazon Web Services** ni reproduce material
propietario. Las cifras de precios, límites y número de regiones cambian con el tiempo:
verifica siempre los datos en la documentación oficial antes de tomar decisiones de producción.
AWS y el resto de marcas son propiedad de Amazon.com, Inc. o sus filiales.
