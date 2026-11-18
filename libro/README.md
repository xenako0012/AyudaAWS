# Apuntes en PDF · Módulos 1 a 4

`Apuntes-AWS-Modulos-1-4.pdf` — 58 páginas A4, pensadas para leer en pantalla o
imprimir en casa.

## Contenido

- Portadilla con los cuatro módulos, su duración y número de secciones.
- Los **4 módulos · 17 secciones** completos: objetivos, explicaciones, tablas,
  esquemas, notas de examen y tres o cuatro preguntas de autoevaluación por sección.
- **Apéndice B**: las 40 preguntas del examen del curso (4 temas) con su respuesta literal.
- **Apéndice C**: soluciones razonadas de las 57 preguntas de repaso.
- **Apéndice D**: glosario alfabético de 98 términos con el módulo de referencia.

Incluye el material de la charla *La nube desde dentro: usuarios, proveedores y
almacenamiento de objetos* (Marcos García Martín, MEGA S4, CIFP Avilés, 29 de octubre
de 2026), integrado en las secciones: serverless, roles, percentiles, elección de
proveedor y Data Act, coste del egress, incidentes reales, almacenamiento de objetos,
HLS y CDN, revisión de dependencias y copias en tres niveles.

## Regenerar el PDF

El generador lee los datos directamente de `assets/js/datos/m01.js` … `m04.js`
(la misma fuente que usa el sitio web), así que cualquier corrección de contenido
se refleja en ambos formatos.

```bash
python3 -m venv /tmp/venv
/tmp/venv/bin/pip install reportlab pyphen
/tmp/venv/bin/python libro/build_apuntes.py
```

Requiere `node` en el PATH para evaluar los archivos de datos y las fuentes DejaVu
(`fonts-dejavu-core`). Salida: `libro/Apuntes-AWS-Modulos-1-4.pdf`.
