#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Genera el libro «AWS Academy Cloud Foundations» en PDF a partir del contenido
del sitio (assets/js/datos/m01.js … m10.js).

Uso:
    python3 libro/build_libro.py

Requisitos:
    pip install reportlab
    node (para extraer el contenido de los archivos JS)
"""

import json
import os
import re
import subprocess
import sys
import tempfile
import unicodedata
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.lib.utils import simpleSplit
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate, CondPageBreak, Flowable, Frame, KeepTogether,
    NextPageTemplate, PageBreak, PageTemplate, Paragraph, Spacer, Table,
    TableStyle,
)
from reportlab.platypus.tableofcontents import TableOfContents

# --------------------------------------------------------------------------
# Rutas y constantes
# --------------------------------------------------------------------------
RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SALIDA = os.path.join(RAIZ, 'libro', 'AWS-Cloud-Foundations-Libro.pdf')

ANCHO, ALTO = 170 * mm, 240 * mm          # formato de libro 17 × 24 cm
MARGEN_LAT = 46
MARGEN_SUP = 64
MARGEN_INF = 54
ANCHO_UTIL = ANCHO - 2 * MARGEN_LAT

NAVY = colors.HexColor('#232F3E')
NAVY_CLARO = colors.HexColor('#2C3D52')
NARANJA = colors.HexColor('#FF9900')
NARANJA_OSCURO = colors.HexColor('#9C5B00')
TINTA = colors.HexColor('#1B1F24')
GRIS = colors.HexColor('#5E6771')
GRIS_TENUE = colors.HexColor('#8A939C')
LINEA = colors.HexColor('#DCE2E8')
FONDO_SUAVE = colors.HexColor('#F5F7F9')
AZUL = colors.HexColor('#146EB4')
VERDE = colors.HexColor('#0F7B4F')
ROJO = colors.HexColor('#B42318')

TIPOGRAFIA = {
    'Serif': 'DejaVuSerif.ttf',
    'SerifBold': 'DejaVuSerif-Bold.ttf',
    'Sans': 'DejaVuSans.ttf',
    'SansBold': 'DejaVuSans-Bold.ttf',
    'Mono': 'DejaVuSansMono.ttf',
    'MonoBold': 'DejaVuSansMono-Bold.ttf',
}
DIR_FUENTES = '/usr/share/fonts/truetype/dejavu'

ETIQUETAS_APENDICE = {
    'Apéndice A': 'Guía del examen CLF-C02',
    'Apéndice B': 'Soluciones',
    'Apéndice C': 'Glosario',
}

TITULOS_CORTOS = {
    1: 'Conceptos de la nube',
    2: 'Facturación y economía',
    3: 'Infraestructura global',
    4: 'Seguridad en la nube',
    5: 'Redes y contenido',
    6: 'Informática',
    7: 'Almacenamiento',
    8: 'Bases de datos',
    9: 'Arquitectura',
    10: 'Monitoreo y escalado',
}

MAPA_NOTAS = {
    'examen': ('De cara al examen', NARANJA, colors.HexColor('#FFF4E0')),
    'tip': ('Consejo', VERDE, colors.HexColor('#E8F6EE')),
    'aviso': ('Atención', ROJO, colors.HexColor('#FDECEA')),
    'dato': ('Dato clave', AZUL, colors.HexColor('#E9F2FA')),
}


# --------------------------------------------------------------------------
# Fuentes y estilos
# --------------------------------------------------------------------------
def registrar_fuentes():
    disponibles = True
    for nombre, archivo in TIPOGRAFIA.items():
        ruta = os.path.join(DIR_FUENTES, archivo)
        if not os.path.exists(ruta):
            disponibles = False
            break
        pdfmetrics.registerFont(TTFont(nombre, ruta))

    if disponibles:
        pdfmetrics.registerFontFamily('Serif', normal='Serif', bold='SerifBold',
                                      italic='Serif', boldItalic='SerifBold')
        pdfmetrics.registerFontFamily('Sans', normal='Sans', bold='SansBold',
                                      italic='Sans', boldItalic='SansBold')
        return True

    # Reserva: fuentes base del PDF
    for nombre in ('Serif', 'Sans', 'Mono'):
        TIPOGRAFIA.setdefault(nombre + 'Fallback', 'Helvetica')
    globals()['FAMILIA_CUERPO'] = 'Times-Roman'
    globals()['FAMILIA_TITULO'] = 'Helvetica-Bold'
    globals()['FAMILIA_MONO'] = 'Courier'
    return False


registrar_fuentes()
CUERPO = 'Serif'
TITULO = 'Sans'
MONO = 'Mono'
TITULO_B = 'SansBold'


def estilo(nombre, **kw):
    base = dict(fontName=CUERPO, fontSize=9.6, leading=14.4, textColor=TINTA,
                alignment=TA_JUSTIFY, spaceAfter=6, allowWidows=0, allowOrphans=0,
                hyphenationLang='es_ES', embeddedHyphenation=1,
                hyphenationMinWordLength=7)
    base.update(kw)
    return ParagraphStyle(nombre, **base)


ST = {
    'Body': estilo('Body'),
    'BodyFirst': estilo('BodyFirst', spaceBefore=0),
    'Lead': estilo('Lead', fontSize=10.4, leading=15.6, textColor=GRIS),
    'H2': estilo('H2Section', fontName=TITULO_B, fontSize=14.2, leading=18,
                 textColor=NAVY, spaceBefore=20, spaceAfter=3, alignment=TA_LEFT,
                 keepWithNext=1),
    'H3': estilo('H3', fontName=TITULO_B, fontSize=10.4, leading=13.6,
                 textColor=NAVY, spaceBefore=12, spaceAfter=4, alignment=TA_LEFT,
                 keepWithNext=1),
    'H2Num': estilo('H2Num', fontName=TITULO_B, fontSize=8.2, leading=10,
                    textColor=NARANJA_OSCURO, spaceBefore=0, spaceAfter=2,
                    alignment=TA_LEFT, keepWithNext=1),
    'Bullet': estilo('Bullet', leftIndent=13, bulletIndent=2, spaceAfter=3.2,
                     leading=13.8),
    'Ordered': estilo('Ordered', leftIndent=16, bulletIndent=1, spaceAfter=3.2),
    'TH': estilo('TH', fontName=TITULO_B, fontSize=7.6, leading=9.8,
                 textColor=colors.white, alignment=TA_LEFT, spaceAfter=0),
    'TD': estilo('TD', fontSize=8.1, leading=10.7, alignment=TA_LEFT, spaceAfter=0),
    'TDFirst': estilo('TDFirst', fontName='SerifBold', fontSize=8.1, leading=10.7,
                      alignment=TA_LEFT, spaceAfter=0),
    'CalloutTitle': estilo('CalloutTitle', fontName=TITULO_B, fontSize=7.4,
                           leading=9, alignment=TA_LEFT, spaceAfter=2),
    'Callout': estilo('Callout', fontSize=8.8, leading=12.6, alignment=TA_LEFT,
                      spaceAfter=0),
    'CalloutBullet': estilo('CalloutBullet', fontSize=8.8, leading=12.6,
                            alignment=TA_LEFT, spaceAfter=2, leftIndent=10,
                            bulletIndent=0),
    'Term': estilo('Term', fontName='SerifBold', fontSize=8.4, leading=11,
                   alignment=TA_LEFT, spaceAfter=0),
    'TermDef': estilo('TermDef', fontSize=8.4, leading=11.2, alignment=TA_LEFT,
                      spaceAfter=0),
    'Small': estilo('Small', fontSize=8.2, leading=11.4, textColor=GRIS),
    'Label': estilo('Label', fontName=TITULO_B, fontSize=7.4, leading=9.4,
                    textColor=GRIS, alignment=TA_LEFT, spaceAfter=3),
    'BoxTitle': estilo('BoxTitle', fontName=TITULO_B, fontSize=7.4, leading=9.4,
                       textColor=AZUL, alignment=TA_LEFT, spaceAfter=3),
    'QuizQ': estilo('QuizQ', fontName='SerifBold', fontSize=8.9, leading=12.2,
                    alignment=TA_LEFT, spaceAfter=2.5),
    'QuizOpt': estilo('QuizOpt', fontSize=8.5, leading=11.6, alignment=TA_LEFT,
                      spaceAfter=1, leftIndent=12, bulletIndent=0),
    'TOC0': estilo('TOC0', fontName=TITULO_B, fontSize=8.8, leading=12.4,
                   textColor=NAVY, alignment=TA_LEFT, spaceBefore=9, spaceAfter=1),
    'TOC1': estilo('TOC1', fontName=CUERPO, fontSize=8.5, leading=11.6,
                   textColor=TINTA, alignment=TA_LEFT, leftIndent=16),
    'CoverTitle': estilo('CoverTitle', fontName=TITULO_B, fontSize=40, leading=42,
                         textColor=colors.white, alignment=TA_LEFT, spaceAfter=0),
    'Center': estilo('Center', alignment=TA_CENTER),
}


for _nombre in ('TH', 'TD', 'TDFirst', 'Term', 'TermDef', 'QuizQ', 'QuizOpt',
                'Small', 'TOC0', 'TOC1', 'Label', 'BoxTitle', 'CalloutTitle'):
    ST[_nombre].hyphenationLang = ''

# --------------------------------------------------------------------------
# Formato en línea
# --------------------------------------------------------------------------
RE_CODIGO = re.compile(r'`([^`]+)`')


def en_linea(texto):
    """Convierte **negrita**, `código` y [texto](url) a marcado de ReportLab."""
    texto = '' if texto is None else str(texto)
    codigos = []

    def guardar(m):
        codigos.append(m.group(1))
        return '\x00%d\x00' % (len(codigos) - 1)

    texto = RE_CODIGO.sub(guardar, texto)
    texto = escape(texto)
    texto = re.sub(r'[ \t]{2,}', ' ', texto)
    texto = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', texto)
    texto = re.sub(
        r'\[([^\]]+)\]\((https?://[^)]+)\)',
        r'<link href="\2" color="#146EB4">\1</link>',
        texto,
    )
    texto = re.sub(
        r'\x00(\d+)\x00',
        lambda m: '<font name="%s" size="7.9" color="#9C5B00">%s</font>'
                  % (MONO, escape(codigos[int(m.group(1))])),
        texto,
    )
    return texto


def P(texto, estilo_nombre='Body'):
    return Paragraph(en_linea(texto), ST[estilo_nombre])


def vinetas(items, estilo_nombre='Bullet', marca='•'):
    return [Paragraph(en_linea(x), ST[estilo_nombre], bulletText=marca) for x in items]


def numeradas(items):
    salida = []
    for i, x in enumerate(items, 1):
        salida.append(Paragraph(en_linea(x), ST['Ordered'], bulletText='%d.' % i))
    return salida


# --------------------------------------------------------------------------
# Tablas
# --------------------------------------------------------------------------
def calcular_anchos(cab, filas):
    """Reparte el ancho disponible sin partir palabras siempre que sea posible."""
    n = len(cab) if cab else len(filas[0])
    minimos, masas = [], []
    for i in range(n):
        textos = ([cab[i]] if cab else []) + [f[i] for f in filas]
        palabra_mas_larga = 0.0
        total = 0
        for t in textos:
            plano = re.sub(r'<[^>]+>', '', str(t))
            for palabra in plano.split():
                palabra_mas_larga = max(palabra_mas_larga,
                                        stringWidth(palabra, 'Serif', 8.1))
            total += min(len(plano), 150)
        if cab:
            for palabra in re.sub(r'<[^>]+>', '', str(cab[i])).split():
                palabra_mas_larga = max(palabra_mas_larga,
                                        stringWidth(palabra, TITULO_B, 7.6))
        minimos.append(min(palabra_mas_larga + 11, ANCHO_UTIL * 0.46))
        masas.append(max(6.0, (total / float(len(textos))) ** 0.72))

    if sum(minimos) >= ANCHO_UTIL:
        factor = ANCHO_UTIL / sum(minimos)
        return [m * factor for m in minimos]

    sobrante = ANCHO_UTIL - sum(minimos)
    total_masa = sum(masas)
    return [minimos[i] + sobrante * masas[i] / total_masa for i in range(n)]


def tabla(cab, filas):
    datos = []
    if cab:
        datos.append([Paragraph(en_linea(c), ST['TH']) for c in cab])
    for f in filas:
        fila = []
        for i, c in enumerate(f):
            fila.append(Paragraph(en_linea(c), ST['TDFirst'] if (i == 0 and not cab) else ST['TD']))
        datos.append(fila)

    t = Table(datos, colWidths=calcular_anchos(cab, filas), repeatRows=1 if cab else 0,
              hAlign='LEFT')
    cmds = [
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4.6),
        ('LINEBELOW', (0, 0), (-1, -1), 0.4, LINEA),
    ]
    if cab:
        cmds += [
            ('BACKGROUND', (0, 0), (-1, 0), NAVY),
            ('TOPPADDING', (0, 0), (-1, 0), 5),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 5.5),
            ('LINEBELOW', (0, 0), (-1, 0), 0, NAVY),
        ]
        for fila in range(2, len(datos), 2):
            cmds.append(('BACKGROUND', (0, fila), (-1, fila), FONDO_SUAVE))
    t.setStyle(TableStyle(cmds))
    t.spaceBefore = 4
    return t


def caja(contenido, fondo, borde, titulo=None, color_titulo=None, radio=0):
    """Caja con barra lateral de color."""
    celdas = []
    if titulo:
        st = ParagraphStyle('ct', parent=ST['CalloutTitle'],
                            textColor=color_titulo or borde)
        celdas.append(Paragraph(en_linea(titulo.upper()), st))
    if isinstance(contenido, str):
        celdas.append(Paragraph(en_linea(contenido), ST['Callout']))
    else:
        for i, x in enumerate(contenido):
            celdas.append(Paragraph(en_linea(x), ST['CalloutBullet'], bulletText='•'))

    t = Table([[celdas]], colWidths=[ANCHO_UTIL])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), fondo),
        ('LINEBEFORE', (0, 0), (0, -1), 3, borde),
        ('BOX', (0, 0), (-1, -1), 0.4, colors.Color(
            borde.red, borde.green, borde.blue, alpha=0.25)),
        ('LEFTPADDING', (0, 0), (-1, -1), 9),
        ('RIGHTPADDING', (0, 0), (-1, -1), 9),
        ('TOPPADDING', (0, 0), (-1, -1), 7),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 7.5),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ]))
    return t


def bloque_nota(b):
    clase = b.get('clase', 'dato')
    titulo, borde, fondo = MAPA_NOTAS.get(clase, MAPA_NOTAS['dato'])
    return KeepTogether([caja(b.get('c', ''), fondo, borde,
                              b.get('titulo') or titulo), Spacer(1, 8)])


def bloque_esquema(items):
    n = len(items)
    ancho_flecha = 14
    ancho_caja = (ANCHO_UTIL - ancho_flecha * (n - 1)) / float(n)
    datos = [[]]
    anchos = []
    estilos = [
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('RIGHTPADDING', (0, 0), (-1, -1), 0),
        ('TOPPADDING', (0, 0), (-1, -1), 0),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
    ]
    for i, it in enumerate(items):
        if i > 0:
            datos[0].append(Paragraph('<font color="#8A939C" size="11">→</font>',
                                      ST['Center']))
            anchos.append(ancho_flecha)
        celda = [
            Paragraph('<b>%s</b>' % en_linea(it.get('titulo', '')),
                      ParagraphStyle('ec', parent=ST['TermDef'], fontSize=8,
                                     leading=10, alignment=TA_CENTER)),
            Paragraph(en_linea(it.get('sub', '')),
                      ParagraphStyle('es', parent=ST['TermDef'], fontSize=7,
                                     leading=9, textColor=GRIS, alignment=TA_CENTER)),
        ]
        datos[0].append(celda)
        anchos.append(ancho_caja)
        col = len(datos[0]) - 1
        estilos += [
            ('BACKGROUND', (col, 0), (col, 0), colors.white),
            ('BOX', (col, 0), (col, 0), 0.6, colors.HexColor('#B9C4CE')),
            ('LEFTPADDING', (col, 0), (col, 0), 4),
            ('RIGHTPADDING', (col, 0), (col, 0), 4),
            ('TOPPADDING', (col, 0), (col, 0), 5),
            ('BOTTOMPADDING', (col, 0), (col, 0), 5),
        ]

    t = Table(datos, colWidths=anchos, hAlign='LEFT')
    t.setStyle(TableStyle(estilos))
    return KeepTogether([t, Spacer(1, 9)])


def bloque_definiciones(items):
    filas = []
    for d in items:
        filas.append([Paragraph(en_linea(d['t']), ST['Term']),
                      Paragraph(en_linea(d['d']), ST['TermDef'])])
    t = Table(filas, colWidths=[ANCHO_UTIL * 0.34, ANCHO_UTIL * 0.66])
    t.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 3),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
        ('LINEBELOW', (0, 0), (-1, -2), 0.3, LINEA),
    ]))
    return t


# --------------------------------------------------------------------------
# Elementos estructurales
# --------------------------------------------------------------------------
class Banner(Flowable):
    """Banda de apertura de capítulo o apéndice."""

    def __init__(self, etiqueta, titulo, numero, ancho=ANCHO_UTIL):
        Flowable.__init__(self)
        self.etiqueta = etiqueta
        self.clave = 'cap-%s-%s' % (numero, normaliza(titulo)[:24].replace(' ', '-'))
        self.titulo = titulo
        self.numero = numero
        self.ancho = ancho
        self.lineas = simpleSplit(titulo, TITULO_B, 19, ancho - 64)
        self.altura = 66 + 24 * len(self.lineas)

    def wrap(self, aw, ah):
        return self.ancho, self.altura

    def draw(self):
        c = self.canv
        h = self.altura
        c.saveState()
        c.setFillColor(NAVY)
        c.roundRect(0, 0, self.ancho, h, 7, fill=1, stroke=0)
        c.setFillColor(NARANJA)
        c.rect(0, 0, 6, h, fill=1, stroke=0)
        # número grande translúcido
        c.setStrokeColor(colors.HexColor('#FFB03A'))
        c.setStrokeAlpha(0.55)
        c.setLineWidth(1.1)
        c.setFont(TITULO_B, 62)
        c._code.append('1 Tr')  # texto solo con contorno
        c.drawRightString(self.ancho - 18, 8, str(self.numero))
        c._code.append('0 Tr')
        c.setStrokeAlpha(1)
        # etiqueta
        c.setFillColor(NARANJA)
        c.setFont(TITULO_B, 8)
        c.drawString(24, h - 26, self.etiqueta.upper())
        # título
        c.setFillColor(colors.white)
        c.setFont(TITULO_B, 19)
        y = h - 50
        for linea in self.lineas:
            c.drawString(24, y, linea)
            y -= 24
        c.restoreState()


class Motivo(Flowable):
    """Motivo decorativo de red: nodos y conexiones."""

    def __init__(self, alto=150):
        Flowable.__init__(self)
        self.alto = alto
        self.nodos = [(0.06, 0.34), (0.21, 0.72), (0.35, 0.40), (0.49, 0.80),
                      (0.63, 0.36), (0.77, 0.66), (0.91, 0.33), (0.55, 0.13)]
        self.aristas = [(0, 1), (1, 2), (2, 3), (3, 4), (2, 4), (4, 5),
                        (5, 6), (4, 7), (2, 7), (7, 6), (1, 3)]

    def wrap(self, aw, ah):
        self.ancho = aw
        # nunca provoca un salto de página: se ajusta al hueco que queda
        if ah is not None and ah - 4 < self.alto:
            self.alto = max(0, ah - 4)
        return aw, self.alto

    def draw(self):
        if self.alto < 40:
            return
        c = self.canv
        w, h = self.ancho, self.alto
        c.saveState()
        c.setStrokeColor(colors.HexColor('#DCE2E8'))
        c.setLineWidth(0.9)
        for a, b in self.aristas:
            c.line(self.nodos[a][0] * w, self.nodos[a][1] * h,
                   self.nodos[b][0] * w, self.nodos[b][1] * h)
        for i, (x, y) in enumerate(self.nodos):
            destacado = i in (3, 5)
            c.setFillColor(NARANJA if destacado else colors.white)
            c.setStrokeColor(colors.HexColor('#C3CDD6') if not destacado else colors.white)
            c.setLineWidth(1)
            c.circle(x * w, y * h, 5.5, stroke=1, fill=1)
        c.restoreState()


class SeccionTitulo(Flowable):
    """Título de sección con número, filete y entrada de índice."""

    def __init__(self, numero, titulo):
        Flowable.__init__(self)
        self.numero = numero
        self.titulo = titulo
        self.clave = 'sec-%s' % numero.replace('.', '-')
        self.etiqueta = '%s  %s' % (numero, titulo)
        self.titulo_solo = titulo
        self.ancho = ANCHO_UTIL

    def wrap(self, aw, ah):
        self.ancho = aw
        self.lineas = simpleSplit(self.titulo_solo, TITULO_B, 14, aw)
        self.altura = 10 + 18 * len(self.lineas) + 10
        return aw, self.altura

    def draw(self):
        c = self.canv
        c.saveState()
        y = self.altura - 14
        c.setFillColor(NARANJA_OSCURO)
        c.setFont(TITULO_B, 7.8)
        c.drawString(0, y + 1, 'SECCIÓN %s' % self.numero)
        y -= 12
        c.setFillColor(NAVY)
        c.setFont(TITULO_B, 14)
        for linea in self.lineas:
            c.drawString(0, y, linea)
            y -= 18
        c.setStrokeColor(LINEA)
        c.setLineWidth(0.8)
        c.line(0, y + 4, self.ancho, y + 4)
        c.restoreState()


def caja_objetivos(objetivos):
    celdas = [Paragraph('AL TERMINAR ESTA SECCIÓN PODRÁS…',
                        ParagraphStyle('ob', parent=ST['BoxTitle'], textColor=AZUL))]
    for o in objetivos:
        celdas.append(Paragraph(en_linea(o), ST['CalloutBullet'], bulletText='•'))
    t = Table([[celdas]], colWidths=[ANCHO_UTIL])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#E9F2FA')),
        ('LINEBEFORE', (0, 0), (0, -1), 3, AZUL),
        ('LEFTPADDING', (0, 0), (-1, -1), 9),
        ('RIGHTPADDING', (0, 0), (-1, -1), 9),
        ('TOPPADDING', (0, 0), (-1, -1), 7),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ]))
    return KeepTogether([t, Spacer(1, 11)])


def bloque_terminos(terminos):
    filas = []
    for t in terminos:
        filas.append([Paragraph(en_linea(t['t']), ST['Term']),
                      Paragraph(en_linea(t['d']), ST['TermDef'])])
    tabla_t = Table(filas, colWidths=[ANCHO_UTIL * 0.32, ANCHO_UTIL * 0.68])
    tabla_t.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('BACKGROUND', (0, 0), (-1, -1), FONDO_SUAVE),
        ('LEFTPADDING', (0, 0), (-1, -1), 7),
        ('RIGHTPADDING', (0, 0), (-1, -1), 7),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LINEBELOW', (0, 0), (-1, -2), 0.4, colors.white),
    ]))
    return KeepTogether([
        Spacer(1, 12),
        Paragraph('TÉRMINOS CLAVE', ST['Label']),
        tabla_t,
        Spacer(1, 6),
    ])


def bloque_quiz(sec):
    qs = sec.get('quiz') or []
    if not qs:
        return []
    cabecera = [
        Spacer(1, 14),
        Paragraph('AUTOEVALUACIÓN', ST['Label']),
        Paragraph('Responde sin mirar el texto. Las soluciones están en el apéndice B.',
                  ParagraphStyle('qi', parent=ST['Small'], fontName=CUERPO,
                                 textColor=GRIS_TENUE, spaceAfter=7)),
    ]
    grupos = []
    for i, q in enumerate(qs, 1):
        grupo = [Paragraph('%d. %s' % (i, en_linea(q['p'])), ST['QuizQ'])]
        for j, op in enumerate(q['op']):
            grupo.append(Paragraph(en_linea(op), ST['QuizOpt'],
                                   bulletText='%s)' % 'abcd'[j]))
        grupo.append(Spacer(1, 3))
        grupos.append(grupo)

    salida = [KeepTogether(cabecera + grupos[0])]
    for g in grupos[1:]:
        salida.append(KeepTogether(g))
    return salida


# --------------------------------------------------------------------------
# Documento
# --------------------------------------------------------------------------
class Libro(BaseDocTemplate):
    def __init__(self, archivo, **kw):
        BaseDocTemplate.__init__(self, archivo, pagesize=(ANCHO, ALTO), **kw)
        self.current_chapter = ''
        self._clave = 0

        marco_portada = Frame(0, 0, ANCHO, ALTO, leftPadding=0, rightPadding=0,
                              topPadding=0, bottomPadding=0, id='portada')
        marco = Frame(MARGEN_LAT, MARGEN_INF, ANCHO_UTIL,
                      ALTO - MARGEN_SUP - MARGEN_INF, id='texto',
                      leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)

        self.addPageTemplates([
            PageTemplate(id='portada', frames=[marco_portada],
                         onPage=lambda c, d: dibujar_portada(c, d)),
            PageTemplate(id='final', frames=[marco_portada],
                         onPage=lambda c, d: dibujar_contraportada(c, d)),
            PageTemplate(id='capitulo', frames=[marco],
                         onPage=lambda c, d: dibujar_pagina(c, d, cabecera=False)),
            PageTemplate(id='cuerpo', frames=[marco],
                         onPage=lambda c, d: dibujar_pagina(c, d, cabecera=True)),
            PageTemplate(id='limpio', frames=[marco],
                         onPage=lambda c, d: None),
        ])

    def afterFlowable(self, flowable):
        if isinstance(flowable, Banner):
            if flowable.etiqueta.startswith('Módulo'):
                numero = int(flowable.numero)
                corto = TITULOS_CORTOS.get(numero, flowable.titulo)
                self.current_chapter = '%s · %s' % (flowable.etiqueta, corto)
            elif flowable.etiqueta in ETIQUETAS_APENDICE:
                self.current_chapter = '%s · %s' % (flowable.etiqueta,
                                                    ETIQUETAS_APENDICE[flowable.etiqueta])
            else:
                self.current_chapter = '%s · %s' % (flowable.etiqueta, flowable.titulo)
            clave = flowable.clave
            self.canv.bookmarkPage(clave)
            self.canv.addOutlineEntry(flowable.etiqueta + ' · ' + flowable.titulo,
                                      clave, level=0, closed=False)
            texto = '%s · %s' % (flowable.etiqueta, flowable.titulo)
            self.notify('TOCEntry', (0, texto, self.page, clave))
        elif isinstance(flowable, SeccionTitulo):
            clave = flowable.clave
            self.canv.bookmarkPage(clave)
            self.canv.addOutlineEntry(flowable.etiqueta, clave, level=1, closed=False)
            self.notify('TOCEntry', (1, flowable.etiqueta, self.page, clave))

    def _nueva_clave(self):
        self._clave += 1
        return 'sec%04d' % self._clave


# --------------------------------------------------------------------------
# Dibujo de páginas
# --------------------------------------------------------------------------
def dibujar_pagina(c, doc, cabecera=True):
    c.saveState()
    if cabecera:
        c.setStrokeColor(LINEA)
        c.setLineWidth(0.5)
        c.line(MARGEN_LAT, ALTO - 34, ANCHO - MARGEN_LAT, ALTO - 34)
        c.setFont(TITULO, 6.8)
        c.setFillColor(GRIS_TENUE)
        c.drawString(MARGEN_LAT, ALTO - 46, 'AWS ACADEMY CLOUD FOUNDATIONS')
        capitulo = doc.current_chapter.upper()
        if c.stringWidth(capitulo, TITULO, 6.8) > ANCHO_UTIL - 150:
            while capitulo and c.stringWidth(capitulo + '…', TITULO, 6.8) > ANCHO_UTIL - 150:
                capitulo = capitulo[:-1].rstrip()
            capitulo += '…'
        c.drawRightString(ANCHO - MARGEN_LAT, ALTO - 46, capitulo)

    # número de página
    c.setFont(TITULO_B, 8.2)
    c.setFillColor(GRIS)
    c.drawCentredString(ANCHO / 2, 30, str(doc.page))
    c.restoreState()


def dibujar_portada(c, doc):
    c.saveState()
    c.setFillColor(NAVY)
    c.rect(0, 0, ANCHO, ALTO, fill=1, stroke=0)
    # degradado sutil
    c.linearGradient(0, ALTO, ANCHO, 0,
                     [colors.HexColor('#1A2430'), colors.HexColor('#31445B')],
                     positions=[0, 1], extend=True)
    # círculos decorativos
    c.setStrokeColor(colors.Color(1, 0.6, 0, alpha=0.45))
    c.setLineWidth(1.1)
    c.circle(ANCHO * 1.02, ALTO * 0.55, 86, stroke=1, fill=0)
    c.setStrokeColor(colors.Color(1, 0.6, 0, alpha=0.20))
    c.circle(ANCHO * 1.02, ALTO * 0.55, 124, stroke=1, fill=0)
    c.setFillColor(colors.Color(1, 0.6, 0, alpha=0.06))
    c.circle(ANCHO * 1.05, ALTO * 0.58, 168, stroke=0, fill=1)

    # marco fino
    c.setStrokeColor(colors.Color(1, 0.6, 0, alpha=0.55))
    c.setLineWidth(0.8)
    c.rect(22, 22, ANCHO - 44, ALTO - 44, fill=0, stroke=1)

    x = 46
    c.setFillColor(NARANJA)
    c.setFont(TITULO_B, 8.4)
    c.drawString(x, ALTO - 94, 'AWS ACADEMY  ·  CLOUD FOUNDATIONS')

    c.setFillColor(colors.white)
    c.setFont(TITULO_B, 38)
    c.drawString(x, ALTO - 150, 'Cloud')
    c.drawString(x, ALTO - 190, 'Foundations')

    c.setFillColor(colors.HexColor('#FFB03A'))
    c.setFont(TITULO, 15)
    c.drawString(x, ALTO - 222, 'Fundamentos de la nube de AWS')

    c.setStrokeColor(colors.Color(1, 0.6, 0, alpha=0.7))
    c.setLineWidth(2)
    c.line(x, ALTO - 242, x + 54, ALTO - 242)

    c.setFillColor(colors.HexColor('#C9D4E0'))
    c.setFont(CUERPO, 10.6)
    lineas = [
        'Los diez módulos del curso explicados en español:',
        'conceptos de nube, economía, infraestructura global,',
        'seguridad, redes, cómputo, almacenamiento, bases de',
        'datos, arquitectura y escalado automático.',
    ]
    y = ALTO - 272
    for linea in lineas:
        c.drawString(x, y, linea)
        y -= 16

    # estadísticas
    c.setFillColor(colors.HexColor('#1B2733'))
    c.rect(x, 132, ANCHO - 2 * x, 62, fill=1, stroke=0)
    c.setStrokeColor(colors.Color(1, 1, 1, alpha=0.16))
    c.setLineWidth(0.6)
    c.rect(x, 132, ANCHO - 2 * x, 62, fill=0, stroke=1)
    datos = [('10', 'MÓDULOS'), ('50', 'SECCIONES'), ('150', 'PREGUNTAS')]
    ancho_col = (ANCHO - 2 * x) / 3.0
    for i, (num, etiqueta) in enumerate(datos):
        cx = x + ancho_col * i + ancho_col / 2
        c.setFillColor(colors.white)
        c.setFont(TITULO_B, 17)
        c.drawCentredString(cx, 166, num)
        c.setFillColor(colors.HexColor('#AEBBC9'))
        c.setFont(TITULO, 6.6)
        c.drawCentredString(cx, 149, etiqueta)

    c.setFillColor(colors.HexColor('#AEBBC9'))
    c.setFont(TITULO, 7.6)
    c.drawString(x, 92, 'MATERIAL DIDÁCTICO EN ESPAÑOL')
    c.drawRightString(ANCHO - x, 92, 'EDICIÓN 2026')

    c.setStrokeColor(colors.Color(1, 1, 1, alpha=0.18))
    c.setLineWidth(0.5)
    c.line(x, 78, ANCHO - x, 78)
    c.setFillColor(colors.HexColor('#8C99A8'))
    c.setFont(CUERPO, 7.2)
    c.drawString(x, 62, 'Preparación para AWS Certified Cloud Practitioner (CLF-C02)')
    c.restoreState()


def dibujar_contraportada(c, doc):
    c.saveState()
    c.setFillColor(NAVY)
    c.rect(0, 0, ANCHO, ALTO, fill=1, stroke=0)
    c.setStrokeColor(colors.Color(1, 0.6, 0, alpha=0.35))
    c.setLineWidth(0.9)
    c.circle(ANCHO * 0.95, ALTO * 0.78, 120, stroke=1, fill=0)
    c.setStrokeColor(colors.Color(1, 0.6, 0, alpha=0.16))
    c.circle(ANCHO * 0.95, ALTO * 0.78, 165, stroke=1, fill=0)

    x = 46
    c.setFillColor(NARANJA)
    c.setFont(TITULO_B, 7.6)
    c.drawString(x, ALTO - 92, 'AWS ACADEMY CLOUD FOUNDATIONS')

    c.setFillColor(colors.white)
    c.setFont(TITULO_B, 21)
    c.drawString(x, ALTO - 132, 'Sigue aprendiendo')

    c.setFillColor(colors.HexColor('#C9D4E0'))
    c.setFont(CUERPO, 9.6)
    parrafo = ['Este libro reúne el temario completo del curso',
               'en un formato pensado para estudiar con calma,',
               'en papel o en pantalla.']
    y = ALTO - 168
    for linea in parrafo:
        c.drawString(x, y, linea)
        y -= 15

    y -= 12
    puntos = [
        ('Diez módulos y cincuenta secciones', 'con explicaciones, tablas y esquemas.'),
        ('Ciento cincuenta preguntas', 'de autoevaluación con soluciones razonadas.'),
        ('Glosario de más de doscientos términos', 'y referencias cruzadas.'),
        ('Guía del examen CLF-C02', 'con los dominios y un plan de cuatro semanas.'),
    ]
    for titulo, resto in puntos:
        c.setFillColor(NARANJA)
        c.setFont(TITULO_B, 8.2)
        c.drawString(x, y, '•')
        c.setFillColor(colors.white)
        c.setFont(CUERPO, 9.2)
        c.drawString(x + 12, y, titulo)
        ancho_titulo = stringWidth(titulo, CUERPO, 9.2)
        c.setFillColor(colors.HexColor('#9FB0C0'))
        c.drawString(x + 12 + ancho_titulo + 4, y, resto)
        y -= 20

    # cita
    c.setStrokeColor(NARANJA)
    c.setLineWidth(2)
    c.line(x, 236, x, 292)
    c.setFillColor(colors.HexColor('#E8EEF4'))
    c.setFont(CUERPO, 11)
    c.drawString(x + 16, 276, 'La nube no consiste en poseer infraestructura,')
    c.drawString(x + 16, 260, 'sino en usar la capacidad necesaria')
    c.drawString(x + 16, 244, 'en el momento en que hace falta.')

    c.setStrokeColor(colors.Color(1, 1, 1, alpha=0.18))
    c.setLineWidth(0.5)
    c.line(x, 118, ANCHO - x, 118)
    c.setFillColor(colors.HexColor('#93A1B0'))
    c.setFont(CUERPO, 7.4)
    c.drawString(x, 98, 'Material didáctico independiente.')
    c.drawString(x, 86, 'No es un curso oficial de Amazon Web Services.')
    c.setFont(CUERPO, 6.8)
    c.drawString(x, 66, 'AWS y las demás marcas son propiedad de Amazon.com, Inc. o sus filiales.')
    c.restoreState()


# --------------------------------------------------------------------------
# Frontispicio
# --------------------------------------------------------------------------
def paginas_iniciales():
    e = []

    # Portada interior
    e.append(Spacer(1, 92))
    e.append(P('AWS ACADEMY', 'Label'))
    e.append(Spacer(1, 10))
    e.append(Paragraph(en_linea('Cloud Foundations'), ParagraphStyle(
        'tp', parent=ST['Body'], fontName=TITULO_B, fontSize=30, leading=33,
        textColor=NAVY, alignment=TA_LEFT, spaceAfter=6)))
    e.append(Paragraph(en_linea('Fundamentos de la nube de AWS'), ParagraphStyle(
        'tp2', parent=ST['Body'], fontName=CUERPO, fontSize=14, leading=18,
        textColor=NARANJA_OSCURO, alignment=TA_LEFT, spaceAfter=4)))
    e.append(Spacer(1, 18))
    e.append(Paragraph('Curso completo en español', ParagraphStyle(
        'tp3', parent=ST['Lead'], fontSize=11.5, leading=15, alignment=TA_LEFT)))
    e.append(Spacer(1, 220))
    e.append(Paragraph('Diez módulos · Cincuenta secciones · Ciento cincuenta preguntas',
                       ParagraphStyle('tp4', parent=ST['Small'], fontName=CUERPO)))
    e.append(Spacer(1, 10))
    e.append(Paragraph('Preparación para la certificación<br/>AWS Certified Cloud Practitioner (CLF-C02)',
                       ParagraphStyle('tp5', parent=ST['Small'], fontName=CUERPO)))
    e.append(Spacer(1, 34))
    e.append(Paragraph('Edición 2026', ParagraphStyle(
        'tp6', parent=ST['Small'], fontName=TITULO_B, textColor=NAVY)))
    e.append(PageBreak())

    # Créditos y aviso
    e.append(Spacer(1, 60))
    e.append(Paragraph('Créditos y aviso legal', ST['H3']))
    e.append(P('Este libro es material didáctico independiente elaborado a partir de la '
               'documentación pública de Amazon Web Services y del temario del curso '
               '<b>AWS Academy Cloud Foundations</b>. No es un curso oficial de Amazon Web '
               'Services, no está patrocinado por AWS y no reproduce material propietario '
               'del programa AWS Academy.'))
    e.append(P('Las cifras de precios, límites de servicio, número de regiones y '
               'características cambian con el tiempo. Antes de tomar decisiones de '
               'producción, confirma siempre los datos en la documentación oficial de AWS.'))
    e.append(P('AWS, Amazon EC2, Amazon S3 y el resto de marcas mencionadas son propiedad '
               'de Amazon.com, Inc. o sus filiales. Se utilizan únicamente con fines '
               'descriptivos y educativos.'))
    e.append(Spacer(1, 16))
    e.append(P('Edición 2026 · Distribución con fines educativos.', 'Small'))
    e.append(NextPageTemplate('capitulo'))
    e.append(PageBreak())

    # Índice
    e.append(Spacer(1, 6))
    e.append(Paragraph('Índice', ParagraphStyle(
        'idx', parent=ST['Body'], fontName=TITULO_B, fontSize=24, leading=28,
        textColor=NAVY, alignment=TA_LEFT, spaceAfter=4)))
    e.append(Paragraph('Diez módulos, tres apéndices y las soluciones de todas las preguntas',
                       ParagraphStyle('idx2', parent=ST['Lead'], fontSize=9.6,
                                      alignment=TA_LEFT, spaceAfter=14)))
    toc = TableOfContents()
    toc.levelStyles = [ST['TOC0'], ST['TOC1']]
    toc.dotsMinLevel = 0
    toc.tableStyle = TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('RIGHTPADDING', (0, 0), (-1, -1), 0),
        ('TOPPADDING', (0, 0), (-1, -1), 0.6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 0.6),
    ])
    e.append(toc)
    e.append(PageBreak())

    # Cómo usar este libro
    e.append(Paragraph('Cómo usar este libro', ParagraphStyle(
        'cu', parent=ST['Body'], fontName=TITULO_B, fontSize=19, leading=23,
        textColor=NAVY, alignment=TA_LEFT, spaceAfter=10)))
    e.append(P('El libro sigue el orden del curso. Cada módulo abre con una página de '
               'presentación y se divide en secciones breves, pensadas para leerse de una '
               'sentada. Cada sección contiene los mismos elementos:', 'Lead'))
    e.append(Spacer(1, 6))
    elementos = [
        ('Objetivos', 'Lo que serás capaz de hacer al terminar. Sirven de checklist.'),
        ('Explicación', 'El contenido propiamente dicho, con tablas y esquemas para '
                        'visualizar relaciones entre servicios.'),
        ('Notas', 'Cuatro tipos de recuadro: <b>de cara al examen</b> (lo que suele '
                  'preguntarse), <b>consejo</b>, <b>atención</b> (errores frecuentes) y '
                  '<b>dato clave</b>.'),
        ('Términos clave', 'Vocabulario que conviene fijar antes de seguir.'),
        ('Autoevaluación', 'Tres preguntas por sección. Las soluciones razonadas están '
                           'en el apéndice B, para que puedas comprobar tu respuesta sin '
                           'tropezar con la solución.'),
    ]
    for titulo, texto in elementos:
        e.append(Paragraph('<b>%s.</b> %s' % (titulo, texto),
                           ParagraphStyle('el', parent=ST['Body'], spaceAfter=7)))
    e.append(Spacer(1, 8))
    e.append(caja('Al final del libro encontrarás la guía del examen CLF-C02 con los '
                  'dominios y un plan de cuatro semanas, las soluciones de todas las '
                  'preguntas y un glosario de más de doscientos términos.',
                  colors.HexColor('#FFF4E0'), NARANJA))
    e.append(Spacer(1, 12))
    e.append(Paragraph('Una rutina que funciona', ST['H3']))
    e.append(P('Lee una sección, responde sus preguntas y explica en voz alta lo aprendido '
               'en dos frases. Si no puedes explicarlo, vuelve a leerla. Al terminar cada '
               'módulo, repasa únicamente los términos clave y las notas de examen antes '
               'de pasar al siguiente.'))
    e.append(PageBreak())

    # Introducción
    e.append(Paragraph('Introducción', ParagraphStyle(
        'intro', parent=ST['Body'], fontName=TITULO_B, fontSize=19, leading=23,
        textColor=NAVY, alignment=TA_LEFT, spaceAfter=10)))
    e.append(P('Durante décadas, la tecnología de una empresa se midió por lo que poseía: '
               'servidores en una sala refrigerada, cintas de copia de seguridad y un equipo '
               'dedicado a mantenerlo todo en marcha. La nube cambia la pregunta. Ya no se '
               'trata de cuánta infraestructura tienes, sino de cuánta capacidad puedes usar '
               'en cada momento y a qué precio.', 'Lead'))
    e.append(Spacer(1, 4))
    e.append(P('Ese cambio no es solo técnico: transforma la economía, la organización y '
               'la forma de innovar. Un equipo pequeño puede lanzar un producto global en '
               'una tarde; una empresa puede pasar de comprar servidores para el pico de '
               'Navidad a encender capacidad solo durante esas semanas.'))
    e.append(P('Este libro recorre los diez módulos del curso **AWS Academy Cloud '
               'Foundations** con un objetivo doble: entender los conceptos y aprobar la '
               'certificación **AWS Certified Cloud Practitioner (CLF-C02)**. El examen '
               'no pide escribir código, sino demostrar que sabes qué servicio resuelve cada '
               'problema, cómo se paga y cómo se protege.'))
    e.append(P('Por eso el contenido insiste en tres ideas que aparecen una y otra vez: '
               'elegir el servicio adecuado según el control y la operación que necesitas, '
               'diseñar para el fallo distribuyendo la carga entre zonas de disponibilidad, '
               'y no pagar por lo que no se usa. Si interiorizas esas tres ideas, la mitad '
               'de las preguntas se responden solas.'))
    e.append(Spacer(1, 10))
    e.append(caja(['Los términos en **negrita** son los que conviene retener.',
                   'El texto entre comillas y con fondo claro, como este, es una nota de '
                   'examen o un consejo práctico.'],
                  FONDO_SUAVE, GRIS_TENUE, 'Cómo leer las notas'))
    e.append(Spacer(1, 12))
    e.append(P('Al final del recorrido tendrás un mapa mental de AWS: sus categorías de '
               'servicios, su modelo de responsabilidad compartida, sus mecanismos de '
               'precio y las decisiones de arquitectura que distinguen un sistema frágil de '
               'uno fiable. Ese mapa es más valioso que memorizar doscientos nombres.'))
    return e


# --------------------------------------------------------------------------
# Capítulos y apéndices
# --------------------------------------------------------------------------
def capitulo(modulo, indice):
    e = []
    e.append(Banner('Módulo %d' % modulo['numero'], modulo['titulo'], modulo['numero']))
    e.append(Spacer(1, 14))
    e.append(P(modulo['descripcion'], 'Lead'))
    e.append(Spacer(1, 6))
    e.append(Paragraph(
        '%d secciones · Duración estimada %s · %d preguntas de repaso'
        % (len(modulo['secciones']), modulo['duracion'],
           sum(len(s.get('quiz') or []) for s in modulo['secciones'])),
        ParagraphStyle('meta', parent=ST['Small'], textColor=GRIS_TENUE)))

    e.append(Spacer(1, 12))
    e.append(caja(modulo['objetivo'], colors.HexColor('#E9F2FA'), AZUL,
                  'Objetivo del módulo'))

    e.append(Spacer(1, 16))
    e.append(Paragraph('CONTENIDO DEL MÓDULO', ST['Label']))
    filas = []
    for i, s in enumerate(modulo['secciones'], 1):
        filas.append([
            Paragraph('%d.%d' % (modulo['numero'], i),
                      ParagraphStyle('tn', parent=ST['TD'], fontName=TITULO_B,
                                     textColor=NARANJA_OSCURO, fontSize=8.4)),
            Paragraph(en_linea(s['titulo']), ST['TD']),
        ])
    t = Table(filas, colWidths=[34, ANCHO_UTIL - 34])
    t.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (0, -1), 0),
        ('LEFTPADDING', (1, 0), (1, -1), 4),
        ('RIGHTPADDING', (0, 0), (-1, -1), 0),
        ('TOPPADDING', (0, 0), (-1, -1), 3.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3.5),
        ('LINEBELOW', (0, 0), (-1, -2), 0.3, LINEA),
    ]))
    e.append(t)
    e.append(Spacer(1, 26))
    e.append(Motivo())
    e.append(NextPageTemplate('cuerpo'))
    e.append(PageBreak())

    for i, sec in enumerate(modulo['secciones'], 1):
        numero = '%d.%d' % (modulo['numero'], i)
        e.append(CondPageBreak(120))
        e.append(SeccionTitulo(numero, sec['titulo']))
        e.append(Spacer(1, 5))
        e.append(P(sec['resumen'], 'Lead'))
        e.append(Spacer(1, 10))

        if sec.get('objetivos'):
            e.append(caja_objetivos(sec['objetivos']))

        for b in sec.get('bloques', []):
            tipo = b.get('t')
            if tipo == 'p':
                e.append(P(b.get('c', '')))
            elif tipo == 'h':
                e.append(Paragraph(en_linea(b.get('c', '')), ST['H3']))
            elif tipo == 'h3':
                e.append(Paragraph(en_linea(b.get('c', '')), ST['H3']))
            elif tipo == 'ul':
                e.extend(vinetas(b.get('c', [])))
                e.append(Spacer(1, 5))
            elif tipo == 'ol':
                e.extend(numeradas(b.get('c', [])))
                e.append(Spacer(1, 5))
            elif tipo == 'tabla':
                e.append(tabla(b.get('cab'), b.get('filas', [])))
                e.append(Spacer(1, 10))
            elif tipo == 'nota':
                e.append(bloque_nota(b))
            elif tipo == 'esquema':
                e.append(bloque_esquema(b.get('c', [])))
            elif tipo == 'def':
                e.append(bloque_definiciones(b.get('c', [])))
                e.append(Spacer(1, 8))

        if sec.get('terminos'):
            e.append(bloque_terminos(sec['terminos']))

        e.extend(bloque_quiz(sec))
        if i < len(modulo['secciones']):
            e.append(Spacer(1, 20))
            e.append(CondPageBreak(90))

    return e


ESTILO_INTRO_APENDICE = ParagraphStyle('introAp', parent=ST['Lead'], alignment=TA_LEFT)


def apendice(etiqueta, numero, titulo, intro):
    e = [Banner(etiqueta, titulo, numero)]
    e.append(Spacer(1, 14))
    e.append(Paragraph(en_linea(intro), ESTILO_INTRO_APENDICE))
    e.append(Spacer(1, 10))
    e.append(NextPageTemplate('cuerpo'))
    return e


def apendice_examen(modulos, preguntas):
    e = apendice('Apéndice A', 'A', 'Guía del examen CLF-C02',
                 'Todo lo que conviene saber antes de reservar la fecha: qué evalúa el '
                 'examen, cuánto pesa cada dominio y cómo repartir el estudio.')
    filas = [
        ['Preguntas', '65 preguntas de opción múltiple y respuesta múltiple'],
        ['Duración', '90 minutos'],
        ['Nota mínima', '700 sobre 1.000 (escala ponderada)'],
        ['Formato', 'Presencial en un centro o supervisado en línea'],
        ['Validez', '3 años'],
        ['Coste', '150 USD (precio de referencia)'],
        ['Nivel', 'Fundacional, sin requisitos previos'],
    ]
    e.append(tabla(['Aspecto', 'Detalle'], filas))
    e.append(Spacer(1, 14))

    e.append(Paragraph('Los cuatro dominios', ST['H3']))
    filas = [
        ['Conceptos de la nube', '24 %', 'Ventajas, modelos de servicio y despliegue, '
                                           'Well-Architected, AWS CAF'],
        ['Seguridad y conformidad', '30 %', 'Responsabilidad compartida, IAM, cifrado, '
                                            'detección, conformidad'],
        ['Tecnología y servicios', '34 %', 'Cómputo, red, almacenamiento, bases de datos, '
                                           'IA, gestión'],
        ['Facturación y precios', '12 %', 'Modelos de precio, TCO, Organizations, soporte'],
    ]
    e.append(tabla(['Dominio', 'Peso', 'Qué repasa'], filas))
    e.append(Spacer(1, 14))

    e.append(Paragraph('Plan de estudio en cuatro semanas', ST['H3']))
    filas = [
        ['Semana 1', 'Módulos 1 a 3', 'Conceptos, economía y facturación, '
                                       'infraestructura global'],
        ['Semana 2', 'Módulos 4 y 5', 'Seguridad, IAM, VPC, Route 53 y CloudFront'],
        ['Semana 3', 'Módulos 6 a 8', 'Cómputo, almacenamiento y bases de datos'],
        ['Semana 4', 'Módulos 9 y 10', 'Well-Architected, ELB, CloudWatch y Auto Scaling'],
        ['Repaso', 'Simulacros', 'Dos tandas de preguntas y repaso de las secciones falladas'],
    ]
    e.append(tabla(['Momento', 'Contenido', 'Temas'], filas))
    e.append(Spacer(1, 12))

    e.append(caja(['Lee la pregunta entera antes de mirar las opciones.',
                   'Busca la palabra clave: «gestionado», «más barato», «menor latencia», '
                   '«sin administrar servidores», «cumplimiento».',
                   'Descarta primero las opciones imposibles; suele quedar una o dos.',
                   'Desconfía de las respuestas absolutas («siempre», «nunca», «gratis»).',
                   'Si dudas, elige el servicio más gestionado que cumpla el requisito.'],
                  colors.HexColor('#FFF4E0'), NARANJA, 'Cinco reglas para el día del examen'))
    e.append(Spacer(1, 12))
    e.append(P('El banco de preguntas de este libro contiene %d preguntas. Una nota '
               'superior al 85 %% en los repasos es una señal razonable de que estás '
               'preparado; por debajo del 70 %%, conviene volver al temario antes de '
               'reservar la fecha.' % preguntas))
    return e


def apendice_soluciones(modulos):
    e = apendice('Apéndice B', 'B', 'Soluciones de las autoevaluaciones',
                 'Cada respuesta incluye la explicación de por qué es correcta. Si has '
                 'fallado, vuelve a la sección correspondiente.')
    for m in modulos:
        e.append(Spacer(1, 6))
        e.append(Paragraph('%d. %s' % (m['numero'], m['titulo']),
                           ParagraphStyle('sm', parent=ST['H3'], spaceBefore=10,
                                          fontSize=9.6, textColor=NAVY)))
        for i, s in enumerate(m['secciones'], 1):
            if not s.get('quiz'):
                continue
            e.append(Paragraph('%d.%d  %s' % (m['numero'], i, en_linea(s['titulo'])),
                               ParagraphStyle('ss', parent=ST['Small'], fontName=TITULO_B,
                                              textColor=NARANJA_OSCURO, fontSize=8.2,
                                              spaceBefore=5, spaceAfter=2)))
            for j, q in enumerate(s['quiz'], 1):
                letra = 'abcd'[q['ok']]
                e.append(Paragraph(
                    '<b>%d. %s)</b> %s' % (j, letra, en_linea(q['e'])),
                    ParagraphStyle('sa', parent=ST['TD'], fontSize=8.3, leading=11.2,
                                   spaceAfter=2.5)))
    return e


def apendice_glosario(terminos):
    e = apendice('Apéndice C', 'C', 'Glosario',
                 '%d términos esenciales, ordenados alfabéticamente. La referencia entre '
                 'paréntesis indica el módulo donde se explica cada uno.' % len(terminos))

    letra_actual = None
    for item in terminos:
        letra = item['letra']
        if letra != letra_actual:
            letra_actual = letra
            e.append(Spacer(1, 8))
            e.append(Paragraph(letra, ParagraphStyle(
                'gl', parent=ST['Body'], fontName=TITULO_B, fontSize=13, leading=16,
                textColor=NARANJA_OSCURO, spaceAfter=3)))
        e.append(Paragraph(
            '<b>%s</b> — %s <font size="6.8" color="#8A939C">(%s)</font>'
            % (en_linea(item['t']), en_linea(item['d']), item['ref']),
            ParagraphStyle('gt', parent=ST['TermDef'], fontSize=8.4, leading=11.4,
                           spaceAfter=3.4)))
    return e


# --------------------------------------------------------------------------
# Datos
# --------------------------------------------------------------------------
def cargar_contenido():
    script = (
        "global.window={};"
        "['m01','m02','m03','m04','m05','m06','m07','m08','m09','m10']"
        ".forEach(f=>require('./assets/js/datos/'+f+'.js'));"
        "process.stdout.write(JSON.stringify(window.MODULOS));"
    )
    salida = subprocess.run(['node', '-e', script], cwd=RAIZ,
                            capture_output=True, text=True, check=True)
    return json.loads(salida.stdout)


def normaliza(texto):
    return unicodedata.normalize('NFKD', texto.lower()).encode('ascii', 'ignore').decode()


def glosario(modulos):
    vistos = {}
    items = []
    for m in modulos:
        for s in m['secciones']:
            for t in s.get('terminos') or []:
                clave = normaliza(t['t']).strip()
                if clave in vistos:
                    continue
                vistos[clave] = True
                letra = normaliza(t['t'])[:1].upper()
                if not letra.isalpha():
                    letra = 'OTROS'
                items.append({
                    't': t['t'], 'd': t['d'], 'letra': letra,
                    'ref': 'M%d' % m['numero'],
                })
    items.sort(key=lambda x: (normaliza(x['t']), x['t']))
    return items


# --------------------------------------------------------------------------
# Construcción
# --------------------------------------------------------------------------
def construir():
    modulos = cargar_contenido()
    total_secciones = sum(len(m['secciones']) for m in modulos)
    total_preguntas = sum(len(s.get('quiz') or []) for m in modulos for s in m['secciones'])
    terminos = glosario(modulos)

    doc = Libro(
        SALIDA,
        title='AWS Academy Cloud Foundations · Curso completo en español',
        author='Material didáctico independiente',
        subject='Fundamentos de la nube de AWS · Preparación CLF-C02',
        creator='Generador de libro (ReportLab)',
    )

    guion = []
    guion.append(Spacer(1, 1))
    guion.append(NextPageTemplate('limpio'))
    guion.append(PageBreak())

    guion.extend(paginas_iniciales())

    for m in modulos:
        guion.append(NextPageTemplate('capitulo'))
        guion.append(PageBreak())
        guion.extend(capitulo(m, m['numero']))

    guion.append(NextPageTemplate('capitulo'))
    guion.append(PageBreak())
    guion.extend(apendice_examen(modulos, total_preguntas))

    guion.append(NextPageTemplate('capitulo'))
    guion.append(PageBreak())
    guion.extend(apendice_soluciones(modulos))

    guion.append(NextPageTemplate('capitulo'))
    guion.append(PageBreak())
    guion.extend(apendice_glosario(terminos))

    guion.append(NextPageTemplate('final'))
    guion.append(PageBreak())
    guion.append(Spacer(1, 1))

    doc.multiBuild(guion)

    print('Libro generado: %s' % SALIDA)
    print('Módulos: %d · Secciones: %d · Preguntas: %d · Términos: %d'
          % (len(modulos), total_secciones, total_preguntas, len(terminos)))
    print('Páginas: %d' % doc.page)


if __name__ == '__main__':
    os.makedirs(os.path.dirname(SALIDA), exist_ok=True)
    construir()
