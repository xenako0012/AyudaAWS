/* La nube desde dentro · material de la charla (MOC 0492, CIFP Avilés)
   Contenido, preguntas de repaso y test de opción múltiple. */
window.CHARLA = {
  titulo: 'La nube desde dentro',
  subtitulo: 'Usuarios, proveedores y almacenamiento de objetos',
  ponente: 'Marcos García Martín · Software Engineer en MEGA S4',
  contexto: 'Charla impartida en el CIFP Avilés el 29 de octubre de 2026, dentro del módulo Despliegue en la nube (MOC) 0492).',
  archivo: 'docs/La-nube-desde-dentro.pdf',
  apartados: [
    {
      id: 'c1',
      titulo: '¿Qué es la nube, de verdad?',
      bloques: [
        { t: 'p', c: 'La definición oficial (NIST) habla de acceso por red, bajo demanda, a un conjunto compartido de recursos de computación: redes, servidores, almacenamiento, aplicaciones y servicios. La parte que importa en el día a día es la segunda mitad: **esos recursos no se compran, se alquilan**, y se aprovisionan o se liberan por software.' },
        { t: 'p', c: 'Por eso la nube no es un lugar, sino un **modelo de consumo**. El centro de datos del proveedor está en algún sitio, pero al cliente le da igual dónde: lo que necesita es una API, una cuota y una factura que crece y decrece con el uso.' },
        { t: 'nota', clase: 'dato', titulo: 'La frase que resume la charla', c: 'La nube es la infraestructura convertida en software: se pide, se configura y se apaga como cualquier otro programa.' }
      ]
    },
    {
      id: 'c2',
      titulo: 'Modelos de servicio',
      bloques: [
        { t: 'p', c: 'Los modelos de servicio dicen **cuánto gestiona el proveedor y cuánto te queda a ti**. La frontera se mueve según el modelo, y con ella la responsabilidad sobre parches, copias y seguridad.' },
        { t: 'tabla', cab: ['Modelo', 'Qué te dan', 'Qué gestionas tú', 'Ejemplo'], filas: [
          ['IaaS', 'Máquinas virtuales y red en un centro de datos', 'El sistema operativo y todo lo que instales; entras por SSH', 'EC2 de AWS, un VPS de Hetzner'],
          ['PaaS', 'Una plataforma donde subes tu aplicación o base de datos', 'Tu código y tus datos; no tocas la máquina', 'Bases de datos gestionadas, Elastic Beanstalk'],
          ['SaaS', 'Una aplicación ya hecha, accesible por internet', 'Solo tu uso y tus datos', 'Gmail, Microsoft 365'],
          ['Serverless', 'Ejecución de funciones por petición, sin servidores', 'El código y sus permisos', 'AWS Lambda']
        ] },
        { t: 'p', c: 'El **serverless** es la versión extrema de PaaS: no hay capacidad reservada ni máquina encendida esperando. Para un proyecto pequeño con tráfico irregular suele salir mucho más barato que un VPS, porque **con cero visitas la factura es cero**.' },
        { t: 'nota', clase: 'tip', titulo: 'Cómo decidir en clase', c: 'Si tienes que instalar cosas y entrar por SSH, es IaaS. Si subes código y la plataforma lo ejecuta, PaaS. Si solo usas el producto, SaaS. Si pagas por invocación, serverless.' }
      ]
    },
    {
      id: 'c3',
      titulo: 'Quién trabaja con la nube',
      bloques: [
        { t: 'p', c: 'Una plataforma en la nube no la mantiene una persona sola. Estos son los perfiles que aparecen en cualquier equipo que despliegue en producción:' },
        { t: 'tabla', cab: ['Rol', 'En qué se centra'], filas: [
          ['Desarrollador/a', 'El código del producto y sus pruebas.'],
          ['Arquitecto/a cloud', 'Diseñar soluciones sobre AWS, Azure o Google Cloud.'],
          ['DevOps', 'Llevar la aplicación de local a producción: automatizar pruebas y despliegues.'],
          ['Ingeniería de plataforma', 'Los raíles comunes: plantillas, pipelines, entornos.'],
          ['SRE', 'Mantenimiento y vigilancia: que todo siga funcionando.'],
          ['QA', 'Probar que las cosas funcionan.'],
          ['Seguridad y datos', 'Proteger y explotar la información.']
        ] },
        { t: 'nota', clase: 'dato', titulo: 'Un día en una aplicación que vive en la nube', c: 'Alguien escribe código, otro lo revisa, un pipeline lo prueba y lo despliega, un panel vigila errores y latencia, y una persona de guardia responde si algo se rompe de madrugada. Todo eso es «la nube» tanto como los servidores.' }
      ]
    },
    {
      id: 'c4',
      titulo: 'La nube también falla',
      bloques: [
        { t: 'p', c: 'Los tres incidentes que se comentaron en clase resumen lo que hay que tener previsto:' },
        { t: 'tabla', cab: ['Incidente', 'Qué pasó', 'Lección'], filas: [
          ['Incendio en OVHcloud (Estrasburgo, 2021)', 'Ardió el centro de datos SBG2; unos 3,6 millones de webs cayeron y hubo clientes que perdieron también las copias guardadas en el mismo edificio.', 'Sin copia en otro sitio, no hay copia.'],
          ['Caída de us-east-1 de AWS (diciembre de 2021)', 'Un fallo en la automatización interna de DNS dejó de resolver nombres hacia sus direcciones IP.', 'Sobrevivieron quienes podían conmutar a otra región.'],
          ['Ataques físicos y cortes de suministro', 'Cables cortados, obras, apagones o falta de combustible para los generadores.', 'La redundancia eléctrica y de red no es un lujo.']
        ] },
        { t: 'nota', clase: 'aviso', titulo: 'Una zona no es una región', c: 'Multi-AZ protege frente al fallo de un edificio; multi-región protege frente al fallo de una ciudad o de un proveedor entero.' }
      ]
    },
    {
      id: 'c5',
      titulo: 'Cómo protegerse (como empresa usuaria)',
      bloques: [
        { t: 'p', c: 'Si no eres el proveedor, tu trabajo es **reducir el impacto** cuando el proveedor falle. Y eso se hace con copias, no con promesas.' },
        { t: 'ol', c: [
          '**Copia rápida al servicio:** instantáneas, versionado o copias automáticas. Resuelven el borrado accidental.',
          '**Copia en otra zona o región:** protege frente al fallo de un edificio o de una región completa.',
          '**Copia aislada e inmutable:** en otra cuenta o proveedor, con retención bloqueada, para que nadie pueda borrarla.'
        ] },
        { t: 'p', c: 'A eso se suman medidas de higiene: **MFA** en las cuentas, permisos mínimos, registro de actividad, alertas de gasto y pruebas de restauración. Una copia que nunca se ha restaurado no es una copia.' },
        { t: 'nota', clase: 'examen', titulo: 'Regla 3-2-1', c: 'Tres copias de los datos, en dos sistemas distintos, con una fuera de las instalaciones. En la nube, «fuera» significa otra región, otra cuenta u otro proveedor.' }
      ]
    },
    {
      id: 'c6',
      titulo: 'Cuánto cuesta la nube',
      bloques: [
        { t: 'p', c: 'Casi toda la factura se reparte entre cinco conceptos. Los tres primeros se estudian siempre; los dos últimos son los que se escapan.' },
        { t: 'tabla', cab: ['Concepto', 'Qué se cobra'], filas: [
          ['Cómputo', 'Horas de servidor, CPU y memoria.'],
          ['Almacenamiento', 'Los datos guardados a lo largo del tiempo.'],
          ['Peticiones', 'Cada operación de lectura o escritura contra la API.'],
          ['Servicios y tareas', 'Por trabajo ejecutado (por ejemplo, cada vídeo traducido).'],
          ['Egress', 'Cada gigabyte que sale hacia internet.']
        ] },
        { t: 'p', c: 'El **egress** es el coste que menos se vigila y el que más duele, porque depende de tus usuarios y no de tu infraestructura. Un proyecto pequeño que se hace viral puede recibir cien mil visitas y una factura de decenas de miles de euros en un fin de semana.' },
        { t: 'nota', clase: 'aviso', titulo: 'Límites y alertas', c: 'Pon presupuestos con aviso, límites de ancho de banda y una CDN delante. No es paranoia: es la diferencia entre un susto y un cierre.' }
      ]
    },
    {
      id: 'c7',
      titulo: 'Elegir proveedor',
      bloques: [
        { t: 'p', c: 'El precio por hora no decide nada por sí solo. Estos criterios pesan más con el tiempo:' },
        { t: 'ul', c: [
          '**Presencia geográfica y latencia:** el servidor debe estar cerca de tus usuarios.',
          '**Soporte y capa gratuita:** poder experimentar y tener a quién llamar.',
          '**Precio al escalar:** no el de entrada, sino el del terabyte, la petición y la salida cuando crezcas.',
          '**Coste de migrar:** mover datos y reescribir código cuesta tiempo y dinero.',
          '**Capacidad de negociación:** 10 PB no son nada para un hiperescalador, pero sí para un proveedor pequeño.',
          '**Modelo de precio:** pago por uso o compromiso a uno, dos o tres años.'
        ] },
        { t: 'p', c: 'Sobre el **lock-in**, la historia tiene dos direcciones: **Dropbox** nació sobre Amazon S3 y terminó montando su propia infraestructura al crecer; **Netflix** mantiene su catálogo en AWS y ha construido otros servicios propios alrededor. Y en Europa el **Data Act** (Reglamento UE 2023/2854) obliga desde el 12 de septiembre de 2025 a facilitar el cambio de proveedor, con preaviso máximo de dos meses y sin costes de cambio desde el 12 de enero de 2027.' },
        { t: 'nota', clase: 'tip', titulo: 'Comparadores', c: 'Hay webs que comparan precios de VPS, GPU y almacenamiento de objetos. El más barato cambia según el volumen: con 1 TB gana uno y con 100 TB gana otro.' }
      ]
    },
    {
      id: 'c8',
      titulo: 'El otro lado: ser proveedor de nube',
      bloques: [
        { t: 'p', c: 'Lo que ve el usuario es un panel web, una API y servicios con nombre. Detrás hay una industria física y un equipo permanentemente de guardia.' },
        { t: 'ul', c: [
          '**Hardware:** centros de datos, redes, servidores, miles de discos y procesadores, y su mantenimiento.',
          '**Costes físicos:** electricidad y refrigeración, que en un centro de datos son una partida enorme.',
          '**Software propio:** monitorización, copias, permisos, virtualización, despliegues y medición del consumo de cada cliente para poder facturarlo.',
          '**Personas de guardia:** turnos, respuesta a incidentes y análisis posterior.'
        ] },
        { t: 'p', c: 'En clase se propuso un ejercicio: imagina que heredas 60.000 € y montas diez GPU en casa para alquilarlas. ¿Qué puede salir mal? Comprar diez y alquilar tres, rechazar clientes por falta de capacidad, quedarte sin luz, que un usuario sature el servicio por falta de límites, que se rompa una pieza o perder el acceso remoto. **Todo eso pasa igual en un centro de datos real.**' }
      ]
    },
    {
      id: 'c9',
      titulo: 'Almacenamiento de objetos',
      bloques: [
        { t: 'p', c: 'Un sistema de archivos organiza los datos en un árbol de carpetas; mantener esa jerarquía cuesta y buscar en lo profundo es más lento. El almacenamiento de objetos elimina la capa: **todos los datos están al mismo nivel**, cada uno con su nombre completo. Es más rápido y, sobre todo, mucho más barato.' },
        { t: 'tabla', cab: ['Elemento', 'Qué es'], filas: [
          ['Bucket', 'El contenedor: el cajón.'],
          ['Key', 'El nombre del objeto. Puede parecer una ruta (fotos/2026/playa.jpg), pero no hay carpetas reales.'],
          ['Metadatos', 'Tamaño, fechas, tipo de contenido y etiquetas propias.']
        ] },
        { t: 'p', c: 'La clave del mercado es que casi todos los proveedores implementan la **API de Amazon S3**: el mismo código funciona en AWS, MEGA S4, Backblaze B2, Cloudflare R2 o Hetzner. Al subir un objeto (PUT), la petición va firmada a un endpoint de una región concreta y lleva cabeceras como el tipo de contenido.' },
        { t: 'esquema', c: [
          { titulo: 'Aplicación', sub: 'Petición PUT firmada' },
          { titulo: 'Proxy S3', sub: 'Valida la firma y entiende el estándar' },
          { titulo: 'Servidores', sub: 'Reparten el objeto en fragmentos' },
          { titulo: 'Discos y centros', sub: 'Si un fragmento falla, se reconstruye' }
        ] },
        { t: 'nota', clase: 'dato', titulo: 'Once nueves', c: 'Con ese reparto se alcanza una durabilidad del 99,999999999 %: guardando diez millones de objetos perderías uno cada diez mil años, de media.' },
        { t: 'nota', clase: 'aviso', titulo: 'Compatible no es idéntico', c: 'Nadie implementa todas las operaciones de S3, solo las más usadas. En MEGA S4 solo existía el borrado uno a uno (DeleteObject) y MinIO Client usa el múltiple (DeleteObjects): sus usuarios no podían borrar hasta que se implementó.' }
      ]
    },
    {
      id: 'c10',
      titulo: 'Rendimiento: percentiles y cola lenta',
      bloques: [
        { t: 'p', c: 'En un servicio en la nube el rendimiento lo es todo: si subir diez fotos tarda siete horas, nadie usará tu copia de seguridad. Y la media no sirve para medirlo, porque esconde las peticiones lentas.' },
        { t: 'ul', c: [
          '**p50 (mediana):** el 50 % de las peticiones tarda eso o menos.',
          '**p90:** el 90 % cabe por debajo.',
          '**p99,9:** solo una de cada mil es peor.'
        ] },
        { t: 'tabla', cab: ['Escenario', 'Cálculo', 'Duración'], filas: [
          ['100.000 archivos, 2 hilos, 0,2 s por subida', '100.000 × 0,2 s ÷ 2', '≈ 2 h 45 min'],
          ['El 0,2 % (200 archivos) se cuelga 300 s', '200 × 300 s ÷ 2', '≈ 11 h en total']
        ] },
        { t: 'p', c: 'Un porcentaje minúsculo de peticiones lentas **bloquea los hilos** y multiplica el tiempo total. Por eso dividir un archivo grande en trozos para subirlos en paralelo no siempre acelera: cuantas más peticiones haces, más probable es que alguna caiga en la cola lenta.' },
        { t: 'nota', clase: 'examen', titulo: 'La media engaña', c: 'Si la media está muy por encima de la mediana, hay peticiones lentas estropeando la medida. Mira la cola (p90, p99), no el promedio.' }
      ]
    },
    {
      id: 'c11',
      titulo: 'Si tú fueras el proveedor',
      bloques: [
        { t: 'p', c: 'Como proveedor no respondes solo de lo tuyo, sino de los datos de tus clientes. Eso obliga a proteger, medir y vigilar desde el primer día: en cuanto algo está en internet llegan los bots y los intentos de inyección.' },
        { t: 'ul', c: [
          '**Pruebas automatizadas y comprobaciones de estado** periódicas.',
          '**Registro de cada petición:** depurar a base de mensajes sueltos no vale.',
          '**Alertas** técnicas y también de gasto.',
          '**Límites por usuario y de ancho de banda:** un cliente no puede tumbar el servicio de todos.'
        ] },
        { t: 'p', c: 'Y en tus propios proyectos, estas son las herramientas que se citaron:' },
        { t: 'tabla', cab: ['Herramienta o práctica', 'Qué aporta'], filas: [
          ['Dependabot (GitHub)', 'Avisa de dependencias vulnerables o muy desactualizadas.'],
          ['npm audit', 'Analiza las dependencias del proyecto y lista fallos conocidos.'],
          ['OWASP', 'Listas de riesgos habituales en aplicaciones web y guías para comprobarlos.'],
          ['Alertas del proveedor cloud', 'Avisa si tienes algo público que no debería serlo.'],
          ['Parcheo continuo', 'Actualizar es parte del trabajo, no una tarea opcional.']
        ] }
      ]
    },
    {
      id: 'c12',
      titulo: 'Para qué se usa el almacenamiento de objetos',
      bloques: [
        { t: 'p', c: 'Es, probablemente, el segundo servicio más usado de la nube después de los servidores: vídeo y streaming, imágenes, copias de seguridad, datos para entrenar modelos de IA e IoT (los datos que manda, por ejemplo, un robot aspirador).' },
        { t: 'p', c: 'El **streaming** se apoya en protocolos como **HLS**: el vídeo no es un único .mp4, sino trozos de pocos segundos, con audio y subtítulos por separado y en varias calidades. El reproductor pide trozo a trozo; si cambias de idioma o de calidad, empieza a pedir los de esa versión. Cada trozo es un objeto.' },
        { t: 'p', c: 'La **CDN** resuelve la distancia: guarda copias en caché en servidores repartidos por el mundo. El primer usuario sueco que abre una película provoca la copia al servidor de Suecia, y los siguientes la reciben desde allí.' }
      ]
    },
    {
      id: 'c13',
      titulo: 'La arquitectura web más sencilla',
      bloques: [
        { t: 'tabla', cab: ['Pieza', 'Para qué'], filas: [
          ['CDN', 'Acercar los archivos al usuario y mejorar el rendimiento.'],
          ['Función serverless o servidor', 'La lógica, solo si hace falta.'],
          ['Almacenamiento', 'Los archivos de la web y los datos.']
        ] },
        { t: 'p', c: 'Una **web estática** tiene contenido fijo: no hay login ni datos que guardar. Basta con el almacenamiento y, opcionalmente, una CDN. Una **web dinámica** tiene usuarios, datos persistentes y comunicación cliente-servidor, así que necesita además cómputo y una base de datos.' },
        { t: 'nota', clase: 'tip', titulo: 'La idea que lo resume todo', c: 'Cualquier web es, en el fondo, un almacenamiento y algo que lo sirve. Si identificas esas dos piezas y decides dónde va la lógica, ya tienes la arquitectura mínima.' }
      ]
    }
  ],
  repasa: [
    {
      p: 'Explica con tus palabras la diferencia entre IaaS, PaaS, SaaS y serverless, con un ejemplo de cada uno.',
      r: 'En IaaS el proveedor da máquinas y red y tú gestionas el sistema operativo y todo lo que instales (por ejemplo, EC2). En PaaS la plataforma ejecuta tu aplicación y tú solo aportas código y datos (Elastic Beanstalk). En SaaS el producto está terminado y solo lo usas (Microsoft 365). Serverless es la forma extrema de PaaS: pagas por ejecución de funciones sin aprovisionar servidores (Lambda). Cuanto más a la derecha, menos administras y menos control tienes.'
    },
    {
      p: '¿Por qué una función serverless puede salir más barata que un VPS para un proyecto pequeño?',
      r: 'Porque no hay una máquina encendida esperando visitas. Se paga por invocación y por milisegundos de ejecución, así que con poco tráfico la factura es casi cero, mientras que un VPS cobra su cuota esté usado o no. En cambio, con carga alta y sostenida el pago por invocación deja de compensar.'
    },
    {
      p: '¿Cuáles son los tres niveles de copia de seguridad?',
      r: 'Primero, una copia rápida en el propio servicio (instantánea o versionado) para el borrado accidental. Segundo, una copia en otra zona de disponibilidad o región, para el fallo de un edificio o de una región. Tercero, una copia aislada e inmutable en otra cuenta o proveedor, con retención bloqueada, para que nadie pueda borrarla, ni siquiera con credenciales robadas.'
    },
    {
      p: '¿Qué es el egress y por qué es peligroso no ponerle límites?',
      r: 'Es el tráfico de datos que sale del proveedor hacia internet, y se cobra por gigabyte. Es peligroso porque depende del comportamiento de los usuarios y no de tu infraestructura: un pico de visitas o un vídeo viral multiplican la factura sin que hayas cambiado nada. Se controla con presupuestos y alertas, límites de ancho de banda y una CDN que sirva el contenido desde el borde.'
    },
    {
      p: 'Enumera cuatro criterios para elegir proveedor de nube.',
      r: 'Cuatro de los que se citaron: presencia geográfica y latencia respecto a los usuarios; soporte y capa gratuita para experimentar; precio al escalar, no solo el de entrada; y coste de migrar o de salir del proveedor. Añadiríamos la capacidad de negociación según tu volumen y el modelo de precio (pago por uso o compromiso).'
    },
    {
      p: '¿Por qué el almacenamiento de objetos es más barato que un sistema de archivos con carpetas?',
      r: 'Porque elimina la jerarquía: no hay que mantener árboles de directorios ni metadatos de carpetas, y todos los objetos están al mismo nivel con un nombre único. Eso simplifica el software, permite repartir los datos entre muchos servidores y abarata tanto el almacenamiento como las búsquedas.'
    },
    {
      p: '¿Qué significa una durabilidad de «once nueves»?',
      r: 'Significa un 99,999999999 % de probabilidad de conservar el dato. En la práctica: si guardas diez millones de objetos, perderías uno cada diez mil años de media. Se consigue fragmentando cada objeto y repartiendo las partes entre discos, máquinas y centros de datos, de modo que un fragmento dañado se reconstruye desde otra copia.'
    },
    {
      p: 'En la migración de 100.000 archivos, ¿por qué un 0,2 % de peticiones lentas cuadruplica el tiempo total?',
      r: 'Porque las subidas se hacen con un número limitado de hilos en paralelo. Si 200 archivos se quedan colgados cinco minutos cada uno, esos hilos quedan bloqueados y el resto de la cola espera: el cálculo pasa de unas 2 h 45 min a unas 11 h. La media no lo detecta; hay que mirar los percentiles de la cola.'
    },
    {
      p: '¿Cómo permite HLS cambiar de idioma en mitad de una película sin volver a empezar?',
      r: 'Porque el vídeo no es un único archivo: está dividido en fragmentos de pocos segundos, con el audio y los subtítulos por separado y en varias calidades. El reproductor pide fragmento a fragmento; al cambiar de idioma simplemente empieza a pedir los trozos de audio de la otra versión, manteniendo la posición.'
    },
    {
      p: '¿Qué necesita una web estática para publicarse en la nube? ¿Y una dinámica?',
      r: 'Una estática solo necesita almacenamiento donde alojar los archivos y, opcionalmente, una CDN para servirlos cerca del usuario. Una dinámica necesita además cómputo (una función serverless o un servidor) para la lógica y una base de datos que dé persistencia a usuarios y contenidos.'
    }
  ]
};

(window.EXAMEN = window.EXAMEN || []).push({
  id: 't5',
  numero: 5,
  titulo: 'La nube desde dentro (charla)',
  seccion: 'm3s2',
  preguntas: [
    {
      p: 'En un modelo IaaS, ¿qué gestiona el cliente?',
      r: 'El sistema operativo y todo lo que instale encima; el proveedor se queda con la máquina y la red.',
      op: [
        'El sistema operativo y todo lo que instala encima',
        'Solo el código de la aplicación y sus datos',
        'Absolutamente nada: solo usa el producto',
        'Únicamente el cifrado de los discos'
      ],
      ok: 0
    },
    {
      p: '¿Cómo se factura una función serverless?',
      r: 'Por invocación y por milisegundos de ejecución, sin capacidad reservada.',
      op: [
        'Por una cuota fija mensual, esté encendida o no',
        'Por invocación y por milisegundos de ejecución',
        'Por número de usuarios registrados',
        'Por gigabyte de código desplegado'
      ],
      ok: 1
    },
    {
      p: '¿Qué perfil se encarga de automatizar pruebas y despliegues para que poner en producción sea pulsar un botón?',
      r: 'DevOps: lleva la aplicación de local a producción automatizando el camino.',
      op: [
        'QA',
        'Arquitectura cloud',
        'DevOps',
        'Seguridad y datos'
      ],
      ok: 2
    },
    {
      p: '¿Qué rol se centra en la vigilancia y el mantenimiento para que el servicio siga funcionando?',
      r: 'SRE (Site Reliability Engineering), que además analiza los incidentes.',
      op: [
        'SRE',
        'Desarrollo de producto',
        'Ingeniería de plataforma',
        'Soporte comercial'
      ],
      ok: 0
    },
    {
      p: '¿Qué lección dejó el incendio del centro de datos de OVHcloud en Estrasburgo (2021)?',
      r: 'Que una copia en el mismo edificio no es una copia: hay que tenerla fuera del dominio de fallo.',
      op: [
        'Que los centros de datos pequeños son más seguros',
        'Que una copia en el mismo edificio no es una copia',
        'Que la nube pública nunca falla',
        'Que conviene guardar los datos en cinta magnética'
      ],
      ok: 1
    },
    {
      p: 'En la caída de us-east-1 de diciembre de 2021, ¿qué falló?',
      r: 'Un fallo en la automatización interna de DNS, que dejó de resolver nombres hacia sus direcciones IP.',
      op: [
        'La refrigeración de las salas',
        'El suministro eléctrico de la región',
        'La automatización interna de DNS',
        'El servicio de correo electrónico'
      ],
      ok: 2
    },
    {
      p: '¿Qué dice la regla 3-2-1 de copias de seguridad?',
      r: 'Tres copias de los datos, en dos sistemas distintos, con una fuera de las instalaciones.',
      op: [
        'Tres copias de los datos, en dos sistemas distintos y una fuera',
        'Tres servidores, dos centros de datos y una nube',
        'Una copia cada tres días, dos veces al mes',
        'Tres responsables, dos pruebas y un informe'
      ],
      ok: 0
    },
    {
      p: '¿Qué es el egress en una factura de nube?',
      r: 'El tráfico de datos que sale del proveedor hacia internet, que se cobra por gigabyte.',
      op: [
        'El tráfico que entra desde internet al proveedor',
        'El almacenamiento ocupado por los registros',
        'El tráfico que sale del proveedor hacia internet',
        'El coste de las licencias del sistema operativo'
      ],
      ok: 2
    },
    {
      p: 'Una aplicación pequeña se hace viral y multiplica sus descargas. ¿Qué línea de la factura crece aunque no cambies la infraestructura?',
      r: 'El egress: se paga por gigabyte descargado y depende del comportamiento de los usuarios.',
      op: [
        'El almacenamiento de los archivos',
        'El egress o salida de datos',
        'Las políticas de permisos',
        'El número de regiones disponibles'
      ],
      ok: 1
    },
    {
      p: '¿Qué criterio de elección de proveedor atiende a que el servidor esté cerca de los usuarios?',
      r: 'La presencia geográfica, que determina la latencia.',
      op: [
        'El modelo de precio',
        'La capacidad de negociación',
        'La presencia geográfica y la latencia',
        'El coste de las licencias'
      ],
      ok: 2
    },
    {
      p: '¿Desde cuándo el Data Act prohíbe los costes por cambiar de proveedor de nube?',
      r: 'Desde el 12 de enero de 2027; hasta entonces solo se permiten los costes reales del cambio.',
      op: [
        'Desde el 12 de septiembre de 2025',
        'Desde el 12 de enero de 2027',
        'Desde el 1 de enero de 2030',
        'No hay fecha: cada proveedor decide'
      ],
      ok: 1
    },
    {
      p: '¿Qué parte del negocio de un proveedor de nube no ve el usuario?',
      r: 'El hardware, los costes físicos (energía y refrigeración), el software propio y las personas de guardia.',
      op: [
        'El panel web y la API',
        'Los nombres de los servicios',
        'El hardware, la energía y las guardias',
        'La documentación y los ejemplos de código'
      ],
      ok: 2
    },
    {
      p: 'En almacenamiento de objetos, ¿qué es la key?',
      r: 'El nombre del objeto. Puede parecer una ruta, pero no hay carpetas reales.',
      op: [
        'El contenedor donde se guardan los objetos',
        'El nombre del objeto, que puede simular una ruta',
        'El tipo de cifrado aplicado',
        'La región donde vive el contenedor'
      ],
      ok: 1
    },
    {
      p: '¿Por qué importa que los proveedores implementen la API de Amazon S3?',
      r: 'Porque el mismo código y las mismas herramientas funcionan en cualquier proveedor compatible, sin integraciones propias.',
      op: [
        'Porque obliga a usar AWS para todo',
        'Porque el mismo código y las mismas herramientas funcionan en varios proveedores',
        'Porque elimina la necesidad de autenticarse',
        'Porque el almacenamiento pasa a ser gratuito'
      ],
      ok: 1
    },
    {
      p: '¿Qué ocurre con un objeto al subirlo a un almacenamiento de objetos?',
      r: 'Se fragmenta en partes que se reparten por discos, máquinas y centros de datos distintos, de modo que se puede reconstruir si una falla.',
      op: [
        'Se guarda entero en un único disco de una única máquina',
        'Se comprime y se envía por correo al administrador',
        'Se fragmenta y se reparte entre discos y centros distintos',
        'Se convierte en una carpeta con subcarpetas'
      ],
      ok: 2
    },
    {
      p: '¿Qué significa una durabilidad de once nueves?',
      r: 'Un 99,999999999 %: guardando diez millones de objetos se perdería uno cada diez mil años, de media.',
      op: [
        'Que el servicio está disponible el 99,999999999 % del tiempo',
        'Que los datos se cifran once veces',
        'Que se perdería uno de cada diez millones de objetos cada diez mil años',
        'Que se garantiza la integridad de todos los objetos para siempre'
      ],
      ok: 2
    },
    {
      p: '¿Qué demuestra el caso de MinIO Client y el borrado múltiple en MEGA S4?',
      r: 'Que compatible no es idéntico: si falta una operación que usan las herramientas, los usuarios no pueden hacer su trabajo.',
      op: [
        'Que todos los proveedores implementan S3 al completo',
        'Que compatible no es idéntico: pueden faltar operaciones que usan las herramientas',
        'Que el borrado de objetos no está permitido en S3',
        'Que las herramientas de terceros no funcionan con S3'
      ],
      ok: 1
    },
    {
      p: '¿Qué indica el percentil p99 de una latencia?',
      r: 'Que el 99 % de las peticiones tardan como mucho ese tiempo; solo el 1 % restante es más lento.',
      op: [
        'Que el 99 % de las peticiones tardan como mucho ese tiempo',
        'Que la media de las peticiones es ese tiempo',
        'Que el 99 % de las peticiones fallan',
        'Que solo el 1 % de las peticiones se completan'
      ],
      ok: 0
    },
    {
      p: '¿Por qué un 0,2 % de peticiones lentas puede cuadruplicar el tiempo de una migración de 100.000 archivos?',
      r: 'Porque las peticiones lentas ocupan los hilos disponibles y el resto de la cola espera.',
      op: [
        'Porque la media aritmética sube mucho',
        'Porque las peticiones lentas ocupan los hilos y el resto espera',
        'Porque el proveedor limita las subidas a 200 archivos',
        'Porque el ancho de banda se reduce al llegar a 100.000 objetos'
      ],
      ok: 1
    },
    {
      p: '¿Qué hace una CDN como CloudFront?',
      r: 'Guarda copias en caché en servidores repartidos por el mundo para que el contenido llegue desde cerca del usuario.',
      op: [
        'Cifra los datos en reposo',
        'Guarda copias en caché cerca de los usuarios para reducir la latencia',
        'Convierte el vídeo en un único archivo .mp4',
        'Sustituye a la base de datos de la aplicación'
      ],
      ok: 1
    }
  ]
});
