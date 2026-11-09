/* =========================================================
   AWS Academy Cloud Foundations · Aplicación
   Router por hash, renderizado de contenido, progreso,
   buscador, glosario y simulacro de examen.
   ========================================================= */
(function () {
  'use strict';

  var MODULOS = window.MODULOS || [];
  var CLAVE_PROGRESO = 'acf.progreso.v1';
  var CLAVE_TEMA = 'acf.tema.v1';

  var CURSO = {
    titulo: 'AWS Academy Cloud Foundations',
    subtitulo: 'Fundamentos de la nube de AWS',
    examen: 'AWS Certified Cloud Practitioner (CLF-C02)'
  };

  /* ---------- Índices derivados ---------- */
  var SECCIONES = [];
  var INDICE_SEC = {};
  MODULOS.forEach(function (m) {
    m.secciones.forEach(function (s, i) {
      var item = { modulo: m, seccion: s, orden: i };
      SECCIONES.push(item);
      INDICE_SEC[s.id] = item;
    });
  });

  var TOTAL_SECCIONES = SECCIONES.length;
  var PREGUNTAS = [];
  var TERMINOS = [];

  MODULOS.forEach(function (m) {
    m.secciones.forEach(function (s) {
      (s.quiz || []).forEach(function (q) {
        PREGUNTAS.push({ q: q, modulo: m, seccion: s });
      });
      (s.terminos || []).forEach(function (t) {
        TERMINOS.push({ t: t, modulo: m, seccion: s });
      });
    });
  });

  /* ---------- Estado ---------- */
  var estado = {
    progreso: cargarProgreso(),
    abiertos: {},
    tema: 'claro'
  };

  var examen = null;

  /* ---------- Utilidades ---------- */
  function $(sel, raiz) { return (raiz || document).querySelector(sel); }
  function $$(sel, raiz) { return Array.prototype.slice.call((raiz || document).querySelectorAll(sel)); }

  function esc(txt) {
    return String(txt == null ? '' : txt)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /* Mini-formato: **negrita**, *cursiva*, `código` y [texto](url) */
  function fmt(txt) {
    var codigos = [];
    var s = String(txt == null ? '' : txt).replace(/`([^`]+)`/g, function (_, c) {
      codigos.push(c);
      return '\u0000' + (codigos.length - 1) + '\u0000';
    });
    s = esc(s);
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/(^|[\s(¡¿"'.,;:])_([^_]+)_/g, '$1<em>$2</em>');
    s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, function (_, texto, url) {
      var externo = /^https?:/i.test(url);
      return '<a href="' + url + '"' + (externo ? ' target="_blank" rel="noopener noreferrer"' : '') + '>' + texto + '</a>';
    });
    s = s.replace(/\u0000(\d+)\u0000/g, function (_, i) {
      return '<code>' + esc(codigos[+i]) + '</code>';
    });
    return s;
  }

  function normaliza(txt) {
    return String(txt || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  function palabras(txt) {
    return normaliza(txt).split(/[^a-z0-9]+/).filter(function (p) { return p.length > 2; });
  }

  function minutosLectura(sec) {
    var texto = (sec.resumen || '') + ' ' + (sec.bloques || []).map(function (b) {
      return JSON.stringify(b.c || '');
    }).join(' ');
    var n = texto.split(/\s+/).length;
    return Math.max(2, Math.round(n / 190));
  }

  function cifras(n) { return new Intl.NumberFormat('es-ES').format(n); }

  /* ---------- Almacenamiento ---------- */
  function cargarProgreso() {
    try {
      var raw = localStorage.getItem(CLAVE_PROGRESO);
      var lista = raw ? JSON.parse(raw) : [];
      return new Set(Array.isArray(lista) ? lista : []);
    } catch (e) { return new Set(); }
  }
  function guardarProgreso() {
    try { localStorage.setItem(CLAVE_PROGRESO, JSON.stringify(Array.from(estado.progreso))); } catch (e) { /* sin almacenamiento */ }
  }
  function cargarTema() {
    try {
      var t = localStorage.getItem(CLAVE_TEMA);
      if (t === 'oscuro' || t === 'claro') return t;
    } catch (e) {}
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'oscuro' : 'claro';
  }
  function aplicarTema(t) {
    estado.tema = t;
    document.documentElement.setAttribute('data-tema', t);
    try { localStorage.setItem(CLAVE_TEMA, t); } catch (e) {}
  }

  /* ---------- Iconos ---------- */
  var ICO = {
    examen: '<svg class="callout__ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>',
    tip: '<svg class="callout__ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18h6M10 22h4M12 2a7 7 0 00-4 12.7V17h8v-2.3A7 7 0 0012 2z"/></svg>',
    aviso: '<svg class="callout__ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z"/><path d="M12 9v4M12 17h.01"/></svg>',
    dato: '<svg class="callout__ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/></svg>',
    flecha: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    check: '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg>'
  };

  var TITULOS_NOTA = { examen: 'De cara al examen', tip: 'Consejo', aviso: 'Atención', dato: 'Dato clave' };

  /* ---------- Render de bloques ---------- */
  function renderBloque(b) {
    switch (b.t) {
      case 'p':
        return '<p>' + fmt(b.c) + '</p>';
      case 'h':
        return '<h2>' + fmt(b.c) + '</h2>';
      case 'h3':
        return '<h3>' + fmt(b.c) + '</h3>';
      case 'ul':
        return '<ul>' + b.c.map(function (x) { return '<li>' + fmt(x) + '</li>'; }).join('') + '</ul>';
      case 'ol':
        return '<ol>' + b.c.map(function (x) { return '<li>' + fmt(x) + '</li>'; }).join('') + '</ol>';
      case 'tabla':
        return '<div class="tabla-envoltura"><table>' +
          '<thead><tr>' + b.cab.map(function (c) { return '<th>' + fmt(c) + '</th>'; }).join('') + '</tr></thead>' +
          '<tbody>' + b.filas.map(function (f) {
            return '<tr>' + f.map(function (c) { return '<td>' + fmt(c) + '</td>'; }).join('') + '</tr>';
          }).join('') + '</tbody></table></div>';
      case 'nota':
        var clase = b.clase || 'dato';
        return '<div class="callout callout--' + clase + '">' + (ICO[clase] || ICO.dato) +
          '<div class="callout__cuerpo"><h4>' + fmt(b.titulo || TITULOS_NOTA[clase] || 'Nota') + '</h4>' +
          (Array.isArray(b.c) ? '<ul>' + b.c.map(function (x) { return '<li>' + fmt(x) + '</li>'; }).join('') + '</ul>' : '<p>' + fmt(b.c) + '</p>') +
          '</div></div>';
      case 'esquema':
        return '<div class="esquema">' + b.c.map(function (c, i) {
          return (i > 0 ? '<span class="esquema__flecha" aria-hidden="true">→</span>' : '') +
            '<div class="esquema__caja"><strong>' + fmt(c.titulo) + '</strong><small>' + fmt(c.sub || '') + '</small></div>';
        }).join('') + '</div>';
      case 'def':
        return '<dl>' + b.c.map(function (d) { return '<dt>' + fmt(d.t) + '</dt><dd>' + fmt(d.d) + '</dd>'; }).join('') + '</dl>';
      default:
        return '';
    }
  }

  function renderArticulo(sec) {
    var html = (sec.bloques || []).map(renderBloque).join('');
    return '<article class="articulo" id="contenido-seccion">' + html + '</article>';
  }

  function renderObjetivos(sec) {
    if (!sec.objetivos || !sec.objetivos.length) return '';
    return '<div class="objetivos"><h2>Al terminar esta sección podrás…</h2><ul>' +
      sec.objetivos.map(function (o) { return '<li>' + fmt(o) + '</li>'; }).join('') + '</ul></div>';
  }

  function renderTerminos(sec) {
    if (!sec.terminos || !sec.terminos.length) return '';
    return '<section class="terminos"><h2>Términos clave</h2><dl>' +
      sec.terminos.map(function (t) {
        return '<div class="termino"><dt>' + fmt(t.t) + '</dt><dd>' + fmt(t.d) + '</dd></div>';
      }).join('') + '</dl></section>';
  }

  /* ---------- Cuestionario de sección ---------- */
  function renderCuestionario(sec) {
    var qs = sec.quiz || [];
    if (!qs.length) return '';
    return '<section class="cuestionario" id="cuestionario-sec" data-sec="' + sec.id + '">' +
      '<div class="cuestionario__cab"><div><h2>Comprueba lo aprendido</h2><p>' +
      qs.length + ' preguntas de estilo examen · práctica con explicación</p></div>' +
      '<span class="cuestionario__marcador" data-marcador>0 / ' + qs.length + '</span></div>' +
      qs.map(function (q, qi) {
        return '<div class="pregunta" data-pi="' + qi + '" data-ok="' + q.ok + '">' +
          '<div class="pregunta__enunciado"><span class="pregunta__num">' + (qi + 1) + '.</span><span>' + fmt(q.p) + '</span></div>' +
          '<div class="opciones">' + q.op.map(function (o, oi) {
            return '<button class="opcion" data-oi="' + oi + '" type="button">' +
              '<span class="opcion__letra">' + 'ABCD'[oi] + '</span><span>' + fmt(o) + '</span></button>';
          }).join('') + '</div></div>';
      }).join('') +
      '<div class="cuestionario__pie"><span class="cuestionario__resultado" data-resultado></span>' +
      '<button class="btn btn--suave btn--sm" type="button" data-reiniciar-cuestionario>Volver a intentarlo</button></div>' +
      '</section>';
  }

  function montarCuestionario(sec) {
    var caja = $('#cuestionario-sec');
    if (!caja) return;
    var total = (sec.quiz || []).length;
    var acertadas = 0;
    var respondidas = 0;

    function actualizar(mostrarResultado) {
      var marcador = $('[data-marcador]', caja);
      if (marcador) marcador.textContent = acertadas + ' / ' + total;
      var res = $('[data-resultado]', caja);
      if (!res || !mostrarResultado) return;
      res.className = 'cuestionario__resultado ' + (acertadas === total ? 'cuestionario__resultado--bien' : 'cuestionario__resultado--mal');
      res.textContent = acertadas === total
        ? 'Perfecto: ' + acertadas + ' de ' + total + '. Dominas esta sección.'
        : 'Has acertado ' + acertadas + ' de ' + total + '. Repasa las explicaciones marcadas.';
    }

    caja.addEventListener('click', function (e) {
      var reiniciar = e.target.closest('[data-reiniciar-cuestionario]');
      if (reiniciar) {
        acertadas = 0; respondidas = 0;
        $$('.pregunta', caja).forEach(function (p) {
          p.removeAttribute('data-respondida');
          $$('.opcion', p).forEach(function (o) {
            o.classList.remove('opcion--correcta', 'opcion--incorrecta');
            o.disabled = false;
          });
          var exp = $('.explicacion', p);
          if (exp) exp.remove();
        });
        var res = $('[data-resultado]', caja);
        if (res) { res.textContent = ''; res.className = 'cuestionario__resultado'; }
        actualizar(false);
        return;
      }

      var btn = e.target.closest('.opcion');
      if (!btn || btn.disabled) return;
      var pregunta = btn.closest('.pregunta');
      if (!pregunta || pregunta.getAttribute('data-respondida') === 'true') return;

      var ok = Number(pregunta.getAttribute('data-ok'));
      var elegida = Number(btn.getAttribute('data-oi'));
      var q = sec.quiz[Number(pregunta.getAttribute('data-pi'))];
      pregunta.setAttribute('data-respondida', 'true');
      respondidas++;

      $$('.opcion', pregunta).forEach(function (o, i) {
        o.disabled = true;
        if (i === ok) o.classList.add('opcion--correcta');
        else if (i === elegida) o.classList.add('opcion--incorrecta');
      });

      if (elegida === ok) acertadas++;

      var exp = document.createElement('div');
      exp.className = 'explicacion';
      exp.innerHTML = '<strong>' + (elegida === ok ? 'Correcto. ' : 'Respuesta correcta: ' + 'ABCD'[ok] + '. ') + '</strong>' + fmt(q.e || '');
      pregunta.appendChild(exp);

      actualizar(respondidas === total);
    });
  }

  /* ---------- Barra lateral ---------- */
  function renderNav(ruta) {
    var activoMod = null;
    if (ruta.tipo === 'modulo') activoMod = ruta.modulo.id;
    if (ruta.tipo === 'seccion') activoMod = ruta.item.modulo.id;

    var html = MODULOS.map(function (m) {
      var abierto = !!estado.abiertos[m.id] || activoMod === m.id;
      var completas = m.secciones.filter(function (s) { return estado.progreso.has(s.id); }).length;
      var todo = completas === m.secciones.length;

      return '<div class="nav__grupo">' +
        '<button class="nav__mod' + (todo ? ' nav__mod--completo' : '') + '" data-mod="' + m.id + '" aria-expanded="' + (abierto ? 'true' : 'false') + '"' +
        (activoMod === m.id ? ' data-activo="true"' : '') + '>' +
        '<span class="nav__num">' + (todo ? '✓' : m.numero) + '</span>' +
        '<span class="nav__mod-txt">' + esc(m.titulo) + '</span>' +
        '<svg class="nav__chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg>' +
        '</button>' +
        '<ul class="nav__secciones"' + (abierto ? '' : ' hidden') + '>' +
        m.secciones.map(function (s) {
          var completo = estado.progreso.has(s.id);
          var actual = ruta.tipo === 'seccion' && ruta.item.seccion.id === s.id;
          return '<li><a class="nav__enlace' + (completo ? ' nav__enlace--completo' : '') + '" href="#/seccion/' + s.id + '"' +
            (actual ? ' aria-current="page"' : '') + '>' +
            '<span class="nav__punto" aria-hidden="true"></span><span>' + esc(s.titulo) + '</span></a></li>';
        }).join('') +
        '</ul></div>';
    }).join('');

    var nav = $('#navCurso');
    nav.innerHTML = html;
  }

  function montarNav() {
    var nav = $('#navCurso');
    nav.addEventListener('click', function (e) {
      var btn = e.target.closest('.nav__mod');
      if (!btn) return;
      var id = btn.getAttribute('data-mod');
      var abierto = btn.getAttribute('aria-expanded') === 'true';
      estado.abiertos[id] = !abierto;
      btn.setAttribute('aria-expanded', String(!abierto));
      var lista = btn.nextElementSibling;
      if (lista) lista.hidden = abierto;
    });
  }

  function actualizarProgresoUI() {
    var n = estado.progreso.size;
    var pct = TOTAL_SECCIONES ? Math.round((n / TOTAL_SECCIONES) * 100) : 0;
    $('#progresoTexto').textContent = pct + ' %';
    $('#progresoBarra').style.width = pct + '%';
    $('#progresoCuenta').textContent = n + ' de ' + TOTAL_SECCIONES + ' secciones';
  }

  /* ---------- Migas ---------- */
  function renderMigas(ruta) {
    var html = '<a href="#/">Inicio</a>';
    if (ruta.tipo === 'modulo') {
      html += '<span class="sep">/</span><span class="actual">Módulo ' + ruta.modulo.numero + ' · ' + esc(ruta.modulo.titulo) + '</span>';
    } else if (ruta.tipo === 'seccion') {
      html += '<span class="sep">/</span><a href="#/modulo/' + ruta.item.modulo.id + '">Módulo ' + ruta.item.modulo.numero + '</a>' +
        '<span class="sep">/</span><span class="actual">' + esc(ruta.item.seccion.titulo) + '</span>';
    } else if (ruta.tipo === 'glosario') {
      html += '<span class="sep">/</span><span class="actual">Glosario</span>';
    } else if (ruta.tipo === 'examen') {
      html += '<span class="sep">/</span><span class="actual">Simulacro de examen</span>';
    } else if (ruta.tipo === 'recursos') {
      html += '<span class="sep">/</span><span class="actual">Recursos y certificación</span>';
    }
    $('#migas').innerHTML = html;
  }

  /* ---------- Vista: inicio ---------- */
  function vistaInicio() {
    var nPreguntas = PREGUNTAS.length;
    var primeroPendiente = SECCIONES.filter(function (s) { return !estado.progreso.has(s.seccion.id); })[0] || SECCIONES[0];
    var empezado = estado.progreso.size > 0;

    var hero = '<section class="hero">' +
      '<span class="hero__etiqueta">AWS Academy · Cloud Foundations</span>' +
      '<h1>Domina los fundamentos de la nube de <em>AWS</em></h1>' +
      '<p class="hero__sub">Los 10 módulos del curso, explicados en español y con vocación práctica: conceptos de nube, precios, infraestructura global, seguridad, redes, cómputo, almacenamiento, bases de datos, arquitectura y escalado. Con cuestionarios y simulacro de examen incluidos.</p>' +
      '<div class="hero__acciones">' +
      '<a class="btn btn--primario" href="#/seccion/' + primeroPendiente.seccion.id + '">' + (empezado ? 'Continuar el curso' : 'Empezar por el módulo 1') + ICO.flecha + '</a>' +
      '<a class="btn btn--fantasma" href="#/examen">Simulacro de examen</a>' +
      '</div>' +
      '<dl class="hero__datos">' +
      '<div><dt>' + MODULOS.length + '</dt><dd>Módulos</dd></div>' +
      '<div><dt>' + TOTAL_SECCIONES + '</dt><dd>Secciones</dd></div>' +
      '<div><dt>' + cifras(nPreguntas) + '</dt><dd>Preguntas</dd></div>' +
      '<div><dt>' + TERMINOS.length + '</dt><dd>Términos clave</dd></div>' +
      '</dl></section>';

    var continuar = empezado ? '<section class="bloque-seccion" style="margin-top:1.6rem">' +
      '<div class="dato dato--grande" style="display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap">' +
      '<div><strong>Tu progreso</strong><span>' + estado.progreso.size + ' de ' + TOTAL_SECCIONES + ' secciones completadas · ' + Math.round((estado.progreso.size / TOTAL_SECCIONES) * 100) + ' %</span></div>' +
      '<a class="btn btn--suave btn--sm" href="#/seccion/' + primeroPendiente.seccion.id + '">Siguiente: ' + esc(primeroPendiente.seccion.titulo) + '</a>' +
      '</div></section>' : '';

    var moduloCards = MODULOS.map(function (m) {
      var completas = m.secciones.filter(function (s) { return estado.progreso.has(s.id); }).length;
      var pct = Math.round((completas / m.secciones.length) * 100);
      return '<a class="tarjeta-mod" href="#/modulo/' + m.id + '">' +
        '<div class="tarjeta-mod__cab"><span class="tarjeta-mod__num">' + m.numero + '</span>' +
        (pct === 100 ? '<span class="tarjeta-mod__estado">Completado</span>' : '') + '</div>' +
        '<h3>' + esc(m.titulo) + '</h3>' +
        '<p>' + esc(m.descripcion) + '</p>' +
        '<div class="tarjeta-mod__pie"><span>' + m.secciones.length + ' secciones · ' + esc(m.duracion) + '</span>' +
        '<span class="tarjeta-mod__mini-barra"><span style="width:' + pct + '%"></span></span></div>' +
        '</a>';
    }).join('');

    var ruta = [
      { t: 'Estudia la sección', d: 'Cada sección tiene una explicación breve, tablas, esquemas y los términos que hay que retener.' },
      { t: 'Comprueba lo aprendido', d: 'Responde el cuestionario con explicación inmediata y marca la sección como completada.' },
      { t: 'Ponte a prueba', d: 'Cuando termines un módulo, usa el simulacro para medir tu nivel y repasar los fallos.' }
    ].map(function (p) {
      return '<div class="paso"><h4>' + p.t + '</h4><p>' + p.d + '</p></div>';
    }).join('');

    var dominios = [
      ['Conceptos de la nube', '24 %'],
      ['Seguridad y conformidad', '30 %'],
      ['Tecnología y servicios', '34 %'],
      ['Facturación y precios', '12 %']
    ].map(function (d) {
      return '<tr><td>' + d[0] + '</td><td>' + d[1] + '</td></tr>';
    }).join('');

    return hero + continuar +
      '<section class="bloque-seccion">' +
      '<div class="titulo-seccion"><h2>Los 10 módulos</h2><p>De los conceptos básicos a la arquitectura elástica</p></div>' +
      '<div class="rejilla-modulos">' + moduloCards + '</div>' +
      '</section>' +

      '<section class="bloque-seccion">' +
      '<div class="titulo-seccion"><h2>Cómo aprovechar este sitio</h2><p>Tres pasos, sin prisa</p></div>' +
      '<div class="pasos">' + ruta + '</div>' +
      '</section>' +

      '<section class="bloque-seccion">' +
      '<div class="titulo-seccion"><h2>Enfocado al examen CLF-C02</h2><p>Cloud Practitioner</p></div>' +
      '<div class="rejilla-datos">' +
      '<div class="dato"><strong>Preguntas</strong><span>65 preguntas, <em>opción múltiple</em> y respuesta múltiple</span></div>' +
      '<div class="dato"><strong>Duración</strong><span>90 minutos · resultado inmediato</span></div>' +
      '<div class="dato"><strong>Nota mínima</strong><span>700 sobre 1.000 · válida 3 años</span></div>' +
      '<div class="dato"><strong>Coste</strong><span>150 USD en la web de AWS</span></div>' +
      '</div>' +
      '<div class="tabla-envoltura" style="margin-top:1rem"><table><thead><tr><th>Dominio del examen</th><th>Peso</th></tr></thead><tbody>' + dominios + '</tbody></table></div>' +
      '<p style="margin-top:-.4rem"><a href="#/recursos">Ver guía de certificación y plan de estudio →</a></p>' +
      '</section>';
  }

  /* ---------- Vista: módulo ---------- */
  function vistaModulo(m) {
    var completas = m.secciones.filter(function (s) { return estado.progreso.has(s.id); }).length;
    var filas = m.secciones.map(function (s, i) {
      var completo = estado.progreso.has(s.id);
      return '<a class="fila-seccion' + (completo ? ' fila-seccion--completa' : '') + '" href="#/seccion/' + s.id + '">' +
        '<span class="fila-seccion__marca">' + ICO.check + '</span>' +
        '<span class="fila-seccion__cuerpo"><strong>' + esc(s.titulo) + '</strong><span>' + esc(s.resumen) + '</span></span>' +
        '<span class="fila-seccion__num">' + (i + 1) + ' / ' + m.secciones.length + '</span>' +
        '</a>';
    }).join('');

    return '<header class="cabecera-mod">' +
      '<div class="cabecera-mod__serie">Módulo ' + m.numero + ' de ' + MODULOS.length + '</div>' +
      '<h1>' + esc(m.titulo) + '</h1>' +
      '<p class="cabecera-mod__desc">' + fmt(m.descripcion) + '</p>' +
      '<div class="cabecera-mod__meta">' +
      '<span><strong>' + m.secciones.length + '</strong> secciones</span>' +
      '<span>Duración estimada: <strong>' + esc(m.duracion) + '</strong></span>' +
      '<span>Progreso: <strong>' + completas + ' / ' + m.secciones.length + '</strong></span>' +
      '</div></header>' +
      '<p class="entradilla" style="margin-top:1.4rem"><strong>Objetivo del módulo:</strong> ' + fmt(m.objetivo) + '</p>' +
      '<div class="lista-secciones">' + filas + '</div>' +
      '<div class="acciones-sec" style="border-top:0;padding-top:1.4rem">' +
      '<a class="btn btn--suave" href="#/seccion/' + m.secciones[0].id + '">Empezar el módulo</a>' +
      '<a class="btn btn--borde" href="#/examen">Practicar con preguntas</a>' +
      '</div>';
  }

  /* ---------- Vista: sección ---------- */
  function vistaSeccion(item) {
    var s = item.seccion, m = item.modulo;
    var completo = estado.progreso.has(s.id);
    var idx = SECCIONES.findIndex(function (x) { return x.seccion.id === s.id; });
    var anterior = idx > 0 ? SECCIONES[idx - 1] : null;
    var siguiente = idx < SECCIONES.length - 1 ? SECCIONES[idx + 1] : null;

    var navSec = '<nav class="nav-sec" aria-label="Navegación entre secciones">' +
      (anterior
        ? '<a class="nav-sec__enlace" href="#/seccion/' + anterior.seccion.id + '"><small>← Anterior</small><strong>' + esc(anterior.seccion.titulo) + '</strong></a>'
        : '<a class="nav-sec__enlace" href="#/modulo/' + m.id + '"><small>← Volver</small><strong>Módulo ' + m.numero + ': ' + esc(m.titulo) + '</strong></a>') +
      (siguiente
        ? '<a class="nav-sec__enlace nav-sec__enlace--siguiente" href="#/seccion/' + siguiente.seccion.id + '"><small>Siguiente →</small><strong>' + esc(siguiente.seccion.titulo) + '</strong></a>'
        : '<a class="nav-sec__enlace nav-sec__enlace--siguiente" href="#/examen"><small>Siguiente →</small><strong>Simulacro de examen</strong></a>') +
      '</nav>';

    return '<header class="cabecera-sec">' +
      '<div class="cabecera-sec__serie">Módulo ' + m.numero + '<span class="punto"></span>Sección ' + (item.orden + 1) + '</div>' +
      '<h1>' + esc(s.titulo) + '</h1>' +
      '<p class="cabecera-sec__resumen">' + fmt(s.resumen) + '</p>' +
      '<div class="cabecera-sec__meta">' +
      '<span class="pastilla">' + minutosLectura(s) + ' min de lectura</span>' +
      '<span class="pastilla">' + (s.quiz ? s.quiz.length : 0) + ' preguntas</span>' +
      (completo ? '<span class="pastilla" style="color:var(--verde)">✓ Completada</span>' : '') +
      '</div></header>' +
      renderObjetivos(s) +
      renderArticulo(s) +
      renderTerminos(s) +
      renderCuestionario(s) +
      '<div class="acciones-sec">' +
      '<button class="btn ' + (completo ? 'btn--suave' : 'btn--primario') + '" type="button" data-completar="' + s.id + '">' +
      (completo ? 'Quitar marca de completada' : 'Marcar como completada') + '</button>' +
      '<button class="btn btn--borde" type="button" data-imprimir>Imprimir o guardar en PDF</button>' +
      '<a class="btn btn--borde" href="#/modulo/' + m.id + '">Índice del módulo</a>' +
      '</div>' + navSec;
  }

  function montarSeccion(item) {
    var s = item.seccion;

    var boton = $('[data-completar]');
    if (boton) {
      boton.addEventListener('click', function () {
        var id = boton.getAttribute('data-completar');
        if (estado.progreso.has(id)) {
          estado.progreso.delete(id);
          aviso('Sección desmarcada');
        } else {
          estado.progreso.add(id);
          aviso('¡Sección completada!');
        }
        guardarProgreso();
        actualizarProgresoUI();
        renderNav(rutaActual());
        // actualizar estado en la cabecera y el botón sin recargar todo
        var pill = $$('.cabecera-sec__meta .pastilla').filter(function (p) { return /Completada/.test(p.textContent); })[0];
        var nueva = estado.progreso.has(id);
        if (nueva && !pill) {
          var span = document.createElement('span');
          span.className = 'pastilla';
          span.style.color = 'var(--verde)';
          span.textContent = '✓ Completada';
          $('.cabecera-sec__meta').appendChild(span);
        } else if (!nueva && pill) {
          pill.remove();
        }
        boton.textContent = nueva ? 'Quitar marca de completada' : 'Marcar como completada';
        boton.className = 'btn ' + (nueva ? 'btn--suave' : 'btn--primario');
      });
    }

    var imprimir = $('[data-imprimir]');
    if (imprimir) imprimir.addEventListener('click', function () { window.print(); });

    montarCuestionario(s);

    actualizarProgresoUI();
  }

  /* ---------- Vista: glosario ---------- */
  function vistaGlosario() {
    var vistos = {};
    var lista = TERMINOS.filter(function (x) {
      var k = normaliza(x.t.t);
      if (vistos[k]) return false;
      vistos[k] = true;
      return true;
    }).sort(function (a, b) { return a.t.t.localeCompare(b.t.t, 'es', { sensitivity: 'base' }); });

    // Índice de letras
    var grupos = {};
    lista.forEach(function (x) {
      var l = normaliza(x.t.t).charAt(0).toUpperCase();
      if (!/[A-Z0-9]/.test(l)) l = 'OTROS';
      (grupos[l] = grupos[l] || []).push(x);
    });

    var chips = '<button class="chip" data-filtro-mod="" aria-pressed="true">Todos</button>' +
      MODULOS.map(function (m) {
        return '<button class="chip" data-filtro-mod="' + m.numero + '" aria-pressed="false">M' + m.numero + '</button>';
      }).join('');

    var cuerpo = Object.keys(grupos).sort().map(function (letra) {
      return '<h2 class="letra-titulo" data-letra="' + letra + '">' + letra + '</h2>' +
        '<div class="glosario">' + grupos[letra].map(function (x) {
          return '<div class="glosario__item" data-mod="' + x.modulo.numero + '" data-texto="' + esc(normaliza(x.t.t + ' ' + x.t.d + ' ' + x.seccion.titulo)) + '">' +
            '<h3>' + esc(x.t.t) + '</h3><p>' + esc(x.t.d) + '</p>' +
            '<a class="origen" href="#/seccion/' + x.seccion.id + '">Módulo ' + x.modulo.numero + ' · ' + esc(x.seccion.titulo) + '</a>' +
            '</div>';
        }).join('') + '</div>';
    }).join('');

    return '<header class="cabecera-sec">' +
      '<div class="cabecera-sec__serie">Referencia rápida</div>' +
      '<h1>Glosario del curso</h1>' +
      '<p class="cabecera-sec__resumen">' + lista.length + ' términos esenciales, ordenados alfabéticamente. Busca por nombre o por definición.</p>' +
      '</header>' +
      '<div class="filtro-barra">' +
      '<input type="search" id="buscarGlosario" placeholder="Filtrar términos (por ejemplo: VPC, cifrado, Spot)…" aria-label="Filtrar el glosario">' +
      chips +
      '</div>' +
      '<p class="entradilla" id="glosarioCuenta" style="margin-bottom:1rem"></p>' +
      '<div id="glosarioContenido">' + cuerpo + '</div>';
  }

  function montarGlosario() {
    var input = $('#buscarGlosario');
    var filtroMod = '';
    var contador = $('#glosarioCuenta');

    function aplicar() {
      var q = normaliza(input.value.trim());
      var visibles = 0;
      $$('.glosario__item').forEach(function (item) {
        var okTexto = !q || (item.getAttribute('data-texto') || '').indexOf(q) !== -1;
        var okMod = !filtroMod || item.getAttribute('data-mod') === filtroMod;
        var visible = okTexto && okMod;
        item.hidden = !visible;
        if (visible) visibles++;
      });
      $$('.letra-titulo').forEach(function (h) {
        var cont = h.nextElementSibling;
        var hay = cont && $$('.glosario__item', cont).some(function (i) { return !i.hidden; });
        h.hidden = !hay;
      });
      contador.textContent = visibles + ' de ' + $$('.glosario__item').length + ' términos';
    }

    input.addEventListener('input', aplicar);
    $$('.chip[data-filtro-mod]').forEach(function (c) {
      c.addEventListener('click', function () {
        filtroMod = c.getAttribute('data-filtro-mod');
        $$('.chip[data-filtro-mod]').forEach(function (x) { x.setAttribute('aria-pressed', String(x === c)); });
        aplicar();
      });
    });
    aplicar();
  }

  /* ---------- Vista: examen ---------- */
  function barajar(a) {
    var arr = a.slice();
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
    }
    return arr;
  }

  function vistaExamen() {
    if (!examen) {
      return '<header class="examen-cab">' +
        '<h1>Simulacro de examen</h1>' +
        '<p>Preguntas de todos los módulos, al estilo del examen CLF-C02. Puedes practicar con explicación inmediata o simular las condiciones reales y revisar el resultado al final.</p>' +
        '<div class="examen-config">' +
        '<select id="exNum" aria-label="Número de preguntas">' +
        [10, 20, 30, 40].map(function (n) { return '<option value="' + n + '"' + (n === 20 ? ' selected' : '') + '>' + n + ' preguntas</option>'; }).join('') +
        '</select>' +
        '<select id="exMod" aria-label="Módulo">' +
        '<option value="">Todos los módulos</option>' +
        MODULOS.map(function (m) { return '<option value="' + m.numero + '">Módulo ' + m.numero + ' · ' + esc(m.titulo) + '</option>'; }).join('') +
        '</select>' +
        '<select id="exModo" aria-label="Modo">' +
        '<option value="practica">Práctica: corrección inmediata</option>' +
        '<option value="examen">Examen: resultado al final</option>' +
        '</select>' +
        '<button class="btn btn--primario" type="button" id="empezarExamen">Comenzar</button>' +
        '</div></header>' +
        '<div class="rejilla-datos" style="margin-top:1.2rem">' +
        '<div class="dato"><strong>Banco de preguntas</strong><span>' + PREGUNTAS.length + ' preguntas con explicación</span></div>' +
        '<div class="dato"><strong>Recomendación</strong><span>Empieza con 20 y sube cuando aciertes más del 85 %</span></div>' +
        '<div class="dato"><strong>Nota de corte</strong><span>700 / 1000 en el examen real</span></div>' +
        '</div>' +
        '<div class="callout callout--tip" style="margin-top:1.5rem"><div class="callout__cuerpo"><h4>Cómo leer las preguntas</h4>' +
        '<p>Busca la palabra clave: «gestionado», «más barato», «menor latencia», «sin administrar servidores» o «cumplimiento». Casi siempre una sola opción encaja con ese criterio.</p></div></div>';
    }

    if (examen.fin) return vistaResultadoExamen();

    var q = examen.preguntas[examen.i];
    var total = examen.preguntas.length;
    var pct = Math.round((examen.i / total) * 100);
    var yaRespondida = examen.modo === 'practica' && examen.respuestas[examen.i] != null;

    return '<div class="examen-progreso"><span>Pregunta ' + (examen.i + 1) + ' de ' + total + '</span>' +
      '<span class="barra"><span style="width:' + pct + '%"></span></span>' +
      '<span>' + (examen.modo === 'practica' ? 'Práctica' : 'Examen') + '</span></div>' +
      '<div class="examen-pregunta">' +
      '<div class="examen-pregunta__meta"><span>Módulo ' + q.modulo.numero + ' · ' + esc(q.seccion.titulo) + '</span><span data-marcador-examen>0 aciertos</span></div>' +
      '<h2>' + fmt(q.q.p) + '</h2>' +
      '<div class="opciones" id="opcionesExamen">' +
      q.q.op.map(function (o, i) {
        return '<button class="opcion" type="button" data-oi="' + i + '">' +
          '<span class="opcion__letra">' + 'ABCD'[i] + '</span><span>' + fmt(o) + '</span></button>';
      }).join('') +
      '</div>' +
      '<div id="feedbackExamen"></div>' +
      '<div class="cuestionario__pie">' +
      '<button class="btn btn--primario" type="button" id="siguienteExamen" disabled>' +
      (examen.i === total - 1 ? 'Ver resultado' : 'Siguiente pregunta') + ICO.flecha + '</button>' +
      '<button class="btn btn--borde btn--sm" type="button" id="abortarExamen">Abandonar</button>' +
      '</div></div>';
  }

  function vistaResultadoExamen() {
    var total = examen.preguntas.length;
    var aciertos = examen.preguntas.filter(function (p, i) { return examen.respuestas[i] === p.q.ok; }).length;
    var nota = Math.round((aciertos / total) * 100);
    var mensaje, color;
    if (nota >= 85) { mensaje = 'Excelente. Estás en condiciones de presentarte al examen real.'; color = 'var(--verde)'; }
    else if (nota >= 70) { mensaje = 'Buen nivel. Repasa las secciones de las preguntas falladas y repite el simulacro.'; color = 'var(--acento)'; }
    else if (nota >= 50) { mensaje = 'Vas por buen camino, pero conviene repasar los módulos con más fallos.'; color = 'var(--acento)'; }
    else { mensaje = 'Todavía no. Vuelve al temario, estudia las secciones y prueba otra vez en unos días.'; color = 'var(--rojo)'; }

    var revision = examen.preguntas.map(function (p, i) {
      var elegida = examen.respuestas[i];
      var correcta = p.q.ok;
      return '<div class="pregunta">' +
        '<div class="pregunta__enunciado"><span class="pregunta__num">' + (i + 1) + '.</span><span>' + fmt(p.q.p) + '</span></div>' +
        '<div class="opciones">' + p.q.op.map(function (o, oi) {
          var clase = oi === correcta ? ' opcion--correcta' : (oi === elegida ? ' opcion--incorrecta' : '');
          return '<div class="opcion' + clase + '"><span class="opcion__letra">' + 'ABCD'[oi] + '</span><span>' + fmt(o) + '</span></div>';
        }).join('') + '</div>' +
        (elegida == null ? '<p class="explicacion" style="color:var(--rojo)">Sin responder.</p>' : '') +
        '<div class="explicacion"><strong>Explicación. </strong>' + fmt(p.q.e) + '</div>' +
        '<p style="margin:.5rem 0 0;font-size:.76rem;color:var(--texto-tenue)"><a href="#/seccion/' + p.seccion.id + '">Repasar: ' + esc(p.seccion.titulo) + '</a></p>' +
        '</div>';
    }).join('');

    return '<div class="examen-resultado">' +
      '<div class="examen-resultado__nota" style="color:' + color + '">' + nota + '<small> / 100</small></div>' +
      '<h2>' + aciertos + ' de ' + total + ' respuestas correctas</h2>' +
      '<p>' + mensaje + '</p>' +
      '<button class="btn btn--primario" type="button" id="repetirExamen">Hacer otro simulacro</button>' +
      '<a class="btn btn--borde" href="#/">Volver al inicio</a>' +
      '</div>' +
      '<section class="bloque-seccion"><div class="titulo-seccion"><h2>Revisión de las preguntas</h2><p>Con la respuesta correcta y su explicación</p></div>' +
      revision + '</section>';
  }

  function montarExamen() {
    if (!examen) {
      var btn = $('#empezarExamen');
      if (!btn) return;
      btn.addEventListener('click', function () {
        var n = Number($('#exNum').value);
        var mod = $('#exMod').value;
        var modo = $('#exModo').value;
        var pool = PREGUNTAS.filter(function (p) { return !mod || String(p.modulo.numero) === mod; });
        examen = {
          preguntas: barajar(pool).slice(0, Math.min(n, pool.length)),
          i: 0,
          respuestas: [],
          modo: modo,
          fin: false
        };
        render();
      });
      return;
    }

    if (examen.fin) {
      var rep = $('#repetirExamen');
      if (rep) rep.addEventListener('click', function () { examen = null; render(); });
      return;
    }

    var botonSig = $('#siguienteExamen');

    function pintar() {
      var q = examen.preguntas[examen.i];
      var elegida = examen.respuestas[examen.i];
      var seleccion = examen.seleccion;
      var enviada = elegida != null;
      var correcta = q.q.ok;
      var mostrar = examen.modo === 'practica' || elegida != null;
      $$('#opcionesExamen .opcion').forEach(function (o, i) {
        o.classList.remove('opcion--correcta', 'opcion--incorrecta');
        o.style.borderColor = '';
        if (examen.modo === 'practica' && elegida != null) {
          o.disabled = true;
          if (i === correcta) o.classList.add('opcion--correcta');
          else if (i === elegida) o.classList.add('opcion--incorrecta');
        } else if (elegida == null && seleccion === i) {
          o.style.borderColor = 'var(--naranja)';
        }
      });
      if (examen.modo === 'practica' && elegida != null) {
        var fb = $('#feedbackExamen');
        if (fb) fb.innerHTML = '<div class="explicacion"><strong>' + (elegida === correcta ? 'Correcto. ' : 'La respuesta correcta es ' + 'ABCD'[correcta] + '. ') + '</strong>' + fmt(q.q.e) + '</div>';
      }
      if (botonSig) botonSig.disabled = examen.modo === 'practica' ? !enviada : seleccion == null;
      var marcador = $('[data-marcador-examen]');
      if (marcador) {
        var acertadas = 0;
        for (var i = 0; i < examen.respuestas.length; i++) {
          if (examen.respuestas[i] === examen.preguntas[i].q.ok) acertadas++;
        }
        marcador.textContent = acertadas + ' aciertos';
      }
    }

    $('#opcionesExamen').addEventListener('click', function (e) {
      var btn = e.target.closest('.opcion');
      if (!btn) return;
      var i = Number(btn.getAttribute('data-oi'));
      if (examen.modo === 'practica') {
        if (examen.respuestas[examen.i] != null) return;
        examen.respuestas[examen.i] = i;
      } else {
        examen.seleccion = i;
        $$('#opcionesExamen .opcion').forEach(function (o) { o.style.borderColor = ''; });
        btn.style.borderColor = 'var(--naranja)';
      }
      pintar();
    });

    if (botonSig) {
      botonSig.addEventListener('click', function () {
        if (examen.modo === 'examen') {
          if (examen.seleccion == null) return;
          examen.respuestas[examen.i] = examen.seleccion;
        }
        examen.seleccion = null;
        if (examen.i >= examen.preguntas.length - 1) {
          examen.fin = true;
        } else {
          examen.i++;
        }
        render();
      });
    }

    var abortar = $('#abortarExamen');
    if (abortar) abortar.addEventListener('click', function () {
      if (window.confirm('¿Seguro que quieres abandonar este simulacro?')) { examen = null; render(); }
    });

    pintar();
  }

  /* ---------- Vista: recursos ---------- */
  function vistaRecursos() {
    var plan = [
      ['Semana 1', 'Módulos 1 a 3', 'Conceptos de nube, economía y facturación, infraestructura global'],
      ['Semana 2', 'Módulos 4 y 5', 'Seguridad, IAM, VPC, Route 53 y CloudFront'],
      ['Semana 3', 'Módulos 6 a 8', 'Cómputo, almacenamiento y bases de datos'],
      ['Semana 4', 'Módulos 9 y 10', 'Well-Architected, Trusted Advisor, ELB, CloudWatch y Auto Scaling'],
      ['Repaso', 'Simulacros', 'Dos simulacros completos y repaso de las secciones falladas']
    ].map(function (f) {
      return '<tr><td><strong>' + f[0] + '</strong></td><td>' + f[1] + '</td><td>' + f[2] + '</td></tr>';
    }).join('');

    return '<header class="cabecera-sec">' +
      '<div class="cabecera-sec__serie">Guía de estudio</div>' +
      '<h1>Recursos y certificación</h1>' +
      '<p class="cabecera-sec__resumen">Todo lo que necesitas para convertir este temario en una certificación: datos del examen, plan de cuatro semanas y enlaces oficiales.</p>' +
      '</header>' +

      '<div class="rejilla-datos">' +
      '<div class="dato"><strong>Examen</strong><span>AWS Certified Cloud Practitioner · <em>CLF-C02</em></span></div>' +
      '<div class="dato"><strong>Preguntas</strong><span>65 en 90 minutos</span></div>' +
      '<div class="dato"><strong>Nota mínima</strong><span>700 / 1000 · escala ponderada</span></div>' +
      '<div class="dato"><strong>Validez</strong><span>3 años</span></div>' +
      '</div>' +

      '<div class="bloque-seccion"><div class="titulo-seccion"><h2>Qué evalúa el examen</h2><p>Cuatro dominios</p></div>' +
      '<div class="tabla-envoltura"><table><thead><tr><th>Dominio</th><th>Peso</th><th>Qué repasa</th></tr></thead><tbody>' +
      '<tr><td>Conceptos de la nube</td><td>24 %</td><td>Ventajas, modelos de servicio y despliegue, Well-Architected, CAF</td></tr>' +
      '<tr><td>Seguridad y conformidad</td><td>30 %</td><td>Responsabilidad compartida, IAM, cifrado, detección, conformidad</td></tr>' +
      '<tr><td>Tecnología y servicios</td><td>34 %</td><td>Cómputo, red, almacenamiento, bases de datos, IA, gestión</td></tr>' +
      '<tr><td>Facturación y precios</td><td>12 %</td><td>Modelos de precio, TCO, Organizations, soporte</td></tr>' +
      '</tbody></table></div></div>' +

      '<div class="bloque-seccion"><div class="titulo-seccion"><h2>Plan de estudio en cuatro semanas</h2><p>Una hora al día es suficiente</p></div>' +
      '<div class="tabla-envoltura"><table><thead><tr><th>Momento</th><th>Contenido</th><th>Temas</th></tr></thead><tbody>' + plan + '</tbody></table></div>' +
      '<div class="callout callout--tip"><div class="callout__cuerpo"><h4>Rutina que funciona</h4>' +
      '<p>Lee una sección, responde su cuestionario y explica en voz alta lo aprendido en dos frases. Si no puedes explicarlo, vuelve a leerlo. Al final de la semana, haz un simulacro de 20 preguntas.</p></div></div></div>' +

      '<div class="bloque-seccion"><div class="titulo-seccion"><h2>Enlaces oficiales</h2><p>Fuentes para ampliar</p></div>' +
      '<div class="lista-secciones">' +
      '<a class="fila-seccion" href="https://aws.amazon.com/certification/certified-cloud-practitioner/" target="_blank" rel="noopener noreferrer"><span class="fila-seccion__cuerpo"><strong>Certificación AWS Certified Cloud Practitioner</strong><span>Guía oficial del examen, requisitos y registro</span></span><span class="fila-seccion__num">↗</span></a>' +
      '<a class="fila-seccion" href="https://docs.aws.amazon.com/" target="_blank" rel="noopener noreferrer"><span class="fila-seccion__cuerpo"><strong>Documentación de AWS</strong><span>Guías de cada servicio, referencia de API y tutoriales</span></span><span class="fila-seccion__num">↗</span></a>' +
      '<a class="fila-seccion" href="https://aws.amazon.com/architecture/well-architected/" target="_blank" rel="noopener noreferrer"><span class="fila-seccion__cuerpo"><strong>AWS Well-Architected Framework</strong><span>Los seis pilares y las lentes por sector</span></span><span class="fila-seccion__num">↗</span></a>' +
      '<a class="fila-seccion" href="https://aws.amazon.com/whitepapers/" target="_blank" rel="noopener noreferrer"><span class="fila-seccion__cuerpo"><strong>Documentos técnicos (whitepapers)</strong><span>Arquitectura, seguridad y economía de la nube</span></span><span class="fila-seccion__num">↗</span></a>' +
      '<a class="fila-seccion" href="https://calculator.aws/" target="_blank" rel="noopener noreferrer"><span class="fila-seccion__cuerpo"><strong>AWS Pricing Calculator</strong><span>Estimar el coste de una arquitectura</span></span><span class="fila-seccion__num">↗</span></a>' +
      '<a class="fila-seccion" href="https://skillbuilder.aws/" target="_blank" rel="noopener noreferrer"><span class="fila-seccion__cuerpo"><strong>AWS Skill Builder</strong><span>Cursos y laboratorios oficiales, algunos gratuitos</span></span><span class="fila-seccion__num">↗</span></a>' +
      '</div>' +
      '<div class="callout callout--aviso" style="margin-top:1.3rem"><div class="callout__cuerpo"><h4>Sobre AWS Academy</h4>' +
      '<p>Este material acompaña al curso <strong>AWS Academy Cloud Foundations</strong>, que se imparte con un entorno de laboratorio (Learner Lab) con créditos limitados. No introduzcas datos personales ni credenciales reales en el laboratorio, y guarda tu trabajo fuera de él antes de que finalice la sesión.</p></div></div>' +
      '</div>' +

      '<div class="bloque-seccion"><div class="titulo-seccion"><h2>Sobre este sitio</h2><p>Material didáctico independiente</p></div>' +
      '<p style="color:var(--texto-suave);max-width:75ch">Contenido elaborado en español a partir de la documentación pública de AWS y del temario de AWS Academy Cloud Foundations. No es un curso oficial de Amazon Web Services ni reproduce material propietario del curso. Las cifras de precios, límites y número de regiones cambian con el tiempo: confirma siempre los datos en la documentación oficial antes de tomar decisiones de producción.</p></div>';
  }

  /* ---------- Buscador ---------- */
  var indiceBusqueda = null;

  function construirIndice() {
    if (indiceBusqueda) return indiceBusqueda;
    indiceBusqueda = [];
    SECCIONES.forEach(function (item) {
      var s = item.seccion;
      var textoBloques = (s.bloques || []).map(function (b) {
        if (typeof b.c === 'string') return b.c;
        if (Array.isArray(b.c)) return b.c.map(function (x) { return typeof x === 'string' ? x : [x.titulo, x.sub, x.t, x.d].filter(Boolean).join(' '); }).join(' ');
        if (b.filas) return b.filas.map(function (f) { return f.join(' '); }).join(' ');
        return '';
      }).join(' ');
      indiceBusqueda.push({
        tipo: 'seccion',
        id: s.id,
        titulo: s.titulo,
        meta: 'Módulo ' + item.modulo.numero + ' · ' + item.modulo.titulo,
        url: '#/seccion/' + s.id,
        texto: normaliza(s.titulo + ' ' + s.resumen + ' ' + textoBloques + ' ' + (s.terminos || []).map(function (t) { return t.t + ' ' + t.d; }).join(' '))
      });
      (s.terminos || []).forEach(function (t) {
        indiceBusqueda.push({
          tipo: 'termino',
          id: s.id + '-' + normaliza(t.t).replace(/\s+/g, '-'),
          titulo: t.t,
          meta: 'Glosario · ' + s.titulo,
          url: '#/seccion/' + s.id,
          texto: normaliza(t.t + ' ' + t.d)
        });
      });
    });
    MODULOS.forEach(function (m) {
      indiceBusqueda.push({
        tipo: 'modulo', id: m.id, titulo: m.titulo,
        meta: 'Módulo ' + m.numero + ' · ' + m.secciones.length + ' secciones',
        url: '#/modulo/' + m.id,
        texto: normaliza(m.titulo + ' ' + m.descripcion + ' ' + m.objetivo)
      });
    });
    return indiceBusqueda;
  }

  function buscar(consulta) {
    var idx = construirIndice();
    var terminosQ = palabras(consulta);
    if (!terminosQ.length) return [];
    var res = [];
    idx.forEach(function (e) {
      var score = 0;
      var tituloN = normaliza(e.titulo);
      terminosQ.forEach(function (t) {
        if (tituloN.indexOf(t) !== -1) score += 12;
        if (e.texto.indexOf(t) !== -1) score += 3;
      });
      if (score > 0) {
        if (e.tipo === 'seccion') score += 2;
        if (e.tipo === 'modulo') score += 1;
        res.push({ e: e, score: score });
      }
    });
    return res.sort(function (a, b) { return b.score - a.score; }).slice(0, 14).map(function (r) { return r.e; });
  }

  function resaltar(texto, consulta) {
    var t = esc(texto);
    palabras(consulta).forEach(function (p) {
      var re = new RegExp('(' + p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
      // solo resaltar coincidencias literales sin acentos
      t = t.replace(re, '<mark>$1</mark>');
    });
    return t;
  }

  var paleta = {
    abierta: false,
    seleccion: 0,
    resultados: []
  };

  function abrirBusqueda() {
    paleta.abierta = true;
    $('#paleta').hidden = false;
    document.body.style.overflow = 'hidden';
    var input = $('#entradaBusqueda');
    setTimeout(function () { input.focus(); input.select(); }, 30);
    paleta.seleccion = 0;
    pintarResultados('');
  }

  function cerrarBusqueda() {
    paleta.abierta = false;
    $('#paleta').hidden = true;
    document.body.style.overflow = '';
  }

  function pintarResultados(q) {
    var cont = $('#resultadosBusqueda');
    var lista = q.trim() ? buscar(q) : sugerencias();
    paleta.resultados = lista;
    paleta.seleccion = 0;

    if (!lista.length) {
      cont.innerHTML = '<div class="paleta__vacio">No hay resultados para «' + esc(q) + '».<br>Prueba con «VPC», «IAM», «S3» o «Spot».</div>';
      return;
    }

    cont.innerHTML = lista.map(function (r, i) {
      var ico = r.tipo === 'modulo' ? 'M' : (r.tipo === 'termino' ? 'A' : '§');
      return '<a class="resultado" href="' + r.url + '" data-idx="' + i + '"' + (i === 0 ? ' data-sel="true"' : '') + '>' +
        '<span class="resultado__ico">' + ico + '</span>' +
        '<span class="resultado__txt"><strong>' + resaltar(r.titulo, q) + '</strong><span>' + esc(r.meta) + '</span></span>' +
        '</a>';
    }).join('');
  }

  function sugerencias() {
    var orden = ['m1s1', 'm4s1', 'm4s2', 'm6s2', 'm7s2', 'm8s2', 'm10s3'];
    return orden.map(function (id) {
      var item = INDICE_SEC[id];
      if (!item) return null;
      return {
        tipo: 'seccion', titulo: item.seccion.titulo,
        meta: 'Módulo ' + item.modulo.numero + ' · ' + item.modulo.titulo,
        url: '#/seccion/' + id
      };
    }).filter(Boolean);
  }

  function moverSeleccion(dir) {
    if (!paleta.resultados.length) return;
    paleta.seleccion = (paleta.seleccion + dir + paleta.resultados.length) % paleta.resultados.length;
    $$('.resultado').forEach(function (a, i) {
      if (i === paleta.seleccion) {
        a.setAttribute('data-sel', 'true');
        a.scrollIntoView({ block: 'nearest' });
      } else {
        a.removeAttribute('data-sel');
      }
    });
  }

  function montarBusqueda() {
    var input = $('#entradaBusqueda');
    input.addEventListener('input', function () { pintarResultados(input.value); });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); moverSeleccion(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); moverSeleccion(-1); }
      else if (e.key === 'Enter') {
        e.preventDefault();
        var r = paleta.resultados[paleta.seleccion];
        if (r) { cerrarBusqueda(); location.hash = r.url.slice(1); }
      }
    });
    $('#paleta').addEventListener('click', function (e) {
      if (e.target === $('#paleta')) cerrarBusqueda();
    });
    $('#cerrarBusqueda').addEventListener('click', cerrarBusqueda);
  }

  /* ---------- Aviso ---------- */
  var temporizadorAviso = null;
  function aviso(texto) {
    var el = $('#aviso');
    el.textContent = texto;
    el.hidden = false;
    requestAnimationFrame(function () { el.classList.add('visible'); });
    clearTimeout(temporizadorAviso);
    temporizadorAviso = setTimeout(function () {
      el.classList.remove('visible');
      temporizadorAviso = setTimeout(function () { el.hidden = true; }, 250);
    }, 2200);
  }

  /* ---------- Router ---------- */
  function parseHash() {
    var hash = location.hash.replace(/^#/, '') || '/';
    var partes = hash.split('/').filter(Boolean);
    if (!partes.length) return { tipo: 'inicio' };
    if (partes[0] === 'modulo') {
      var m = MODULOS.filter(function (x) { return x.id === partes[1]; })[0];
      if (m) return { tipo: 'modulo', modulo: m };
    }
    if (partes[0] === 'seccion') {
      var item = INDICE_SEC[partes[1]];
      if (item) return { tipo: 'seccion', item: item };
    }
    if (partes[0] === 'glosario') return { tipo: 'glosario' };
    if (partes[0] === 'examen') return { tipo: 'examen' };
    if (partes[0] === 'recursos') return { tipo: 'recursos' };
    return { tipo: 'inicio' };
  }

  function rutaActual() { return parseHash(); }

  var vista = $('#vista');

  function render() {
    var bruto = location.hash.replace(/^#/, '');
    // Ignorar anclas internas (por ejemplo el enlace «saltar al contenido»)
    if (bruto && bruto.charAt(0) !== '/') return;

    var ruta = parseHash();
    var html = '';
    var titulo = CURSO.titulo;

    if (ruta.tipo === 'inicio') {
      html = vistaInicio();
    } else if (ruta.tipo === 'modulo') {
      html = vistaModulo(ruta.modulo);
      titulo = 'Módulo ' + ruta.modulo.numero + ': ' + ruta.modulo.titulo;
    } else if (ruta.tipo === 'seccion') {
      html = vistaSeccion(ruta.item);
      titulo = ruta.item.seccion.titulo + ' · Módulo ' + ruta.item.modulo.numero;
    } else if (ruta.tipo === 'glosario') {
      html = vistaGlosario();
      titulo = 'Glosario';
    } else if (ruta.tipo === 'examen') {
      html = vistaExamen();
      titulo = 'Simulacro de examen';
    } else if (ruta.tipo === 'recursos') {
      html = vistaRecursos();
      titulo = 'Recursos y certificación';
    }

    document.title = titulo + ' · ' + CURSO.titulo;
    vista.innerHTML = html;
    renderNav(ruta);
    renderMigas(ruta);
    actualizarProgresoUI();
    window.scrollTo({ top: 0, behavior: 'auto' });
    vista.focus({ preventScroll: true });

    if (ruta.tipo === 'seccion') montarSeccion(ruta.item);
    else if (ruta.tipo === 'glosario') montarGlosario();
    else if (ruta.tipo === 'examen') montarExamen();
  }

  /* ---------- Eventos globales ---------- */
  function montarGlobal() {
    aplicarTema(cargarTema());

    $('#btnTema').addEventListener('click', function () {
      aplicarTema(estado.tema === 'claro' ? 'oscuro' : 'claro');
    });

    $('#btnBuscar').addEventListener('click', abrirBusqueda);
    $('#abrirBusqueda').addEventListener('click', abrirBusqueda);
    $('#cerrarBusqueda').addEventListener('click', cerrarBusqueda);

    document.addEventListener('keydown', function (e) {
      var esEntrada = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName);
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        paleta.abierta ? cerrarBusqueda() : abrirBusqueda();
      } else if (e.key === 'Escape' && paleta.abierta) {
        cerrarBusqueda();
      } else if (e.key === '/' && !esEntrada) {
        e.preventDefault();
        abrirBusqueda();
      }
    });

    var menuAbierto = false;
    function abrirMenu() {
      $('#lateral').classList.add('abierto');
      $('#velo').hidden = false;
      menuAbierto = true;
      document.body.style.overflow = 'hidden';
    }
    function cerrarMenu() {
      $('#lateral').classList.remove('abierto');
      $('#velo').hidden = true;
      menuAbierto = false;
      document.body.style.overflow = '';
    }
    $('#abrirMenu').addEventListener('click', abrirMenu);
    $('#cerrarMenu').addEventListener('click', cerrarMenu);
    $('#velo').addEventListener('click', cerrarMenu);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menuAbierto) cerrarMenu();
    });
    // cerrar el menú al navegar en móvil
    $('#navCurso').addEventListener('click', function (e) {
      if (e.target.closest('a') && menuAbierto) cerrarMenu();
    });
    $('#lateral').addEventListener('click', function (e) {
      var enlaceExtra = e.target.closest('.lateral__enlace');
      if (enlaceExtra && menuAbierto) cerrarMenu();
    });

    $('#reiniciarProgreso').addEventListener('click', function () {
      if (!estado.progreso.size) { aviso('Todavía no has completado ninguna sección'); return; }
      if (window.confirm('¿Quieres borrar todo tu progreso de este dispositivo?')) {
        estado.progreso = new Set();
        guardarProgreso();
        render();
        aviso('Progreso reiniciado');
      }
    });

    var saltar = document.querySelector('.saltar');
    if (saltar) {
      saltar.addEventListener('click', function (e) {
        e.preventDefault();
        vista.focus({ preventScroll: false });
      });
    }

    window.addEventListener('hashchange', render);
    window.addEventListener('beforeprint', function () {
      // asegurar que el contenido esté visible al imprimir
    });
  }

  /* ---------- Arranque ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    if (!MODULOS.length) {
      vista.innerHTML = '<div class="vacio">No se ha podido cargar el contenido del curso.</div>';
      return;
    }
    montarGlobal();
    montarNav();
    montarBusqueda();
    render();
    actualizarProgresoUI();

    if (!location.hash) {
      // dejar la URL limpia en la portada
      history.replaceState(null, '', location.pathname + location.search + '#/');
    }
  });
})();
