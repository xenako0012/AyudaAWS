# Libro en PDF · AWS Academy Cloud Foundations

`AWS-Cloud-Foundations-Libro.pdf` — 215 páginas, formato 170 × 240 mm, listo para
imprimir o leer en pantalla.

## Contenido

- Portada, portadilla, créditos e índice con números de página.
- «Cómo usar este libro» e introducción general.
- 10 módulos · 50 secciones, con objetivos, tablas, esquemas, notas de examen,
  términos clave y tres preguntas de autoevaluación por sección (150 en total).
- Apéndice A: guía del examen CLF-C02 (dominios, baremo y plan de cuatro semanas).
- Apéndice B: soluciones razonadas de las 150 preguntas.
- Apéndice C: glosario alfabético de 240 términos con el módulo de referencia.

## Regenerar el PDF

El generador lee los datos directamente de `assets/js/datos/m01.js` … `m10.js`
(la misma fuente que usa el sitio web), así que cualquier corrección de contenido
se refleja en ambos formatos.

```bash
python3 -m venv /tmp/venv
/tmp/venv/bin/pip install reportlab pyphen
/tmp/venv/bin/python libro/build_libro.py
```

Requiere `node` en el PATH para evaluar los archivos de datos, y las fuentes
DejaVu (`fonts-dejavu-core`). Salida: `libro/AWS-Cloud-Foundations-Libro.pdf`.
