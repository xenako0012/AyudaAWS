/* Módulo 9 · Arquitectura en la nube */
(window.MODULOS = window.MODULOS || []).push({
  id: 'm9',
  numero: 9,
  titulo: 'Arquitectura en la nube',
  descripcion: 'Los seis pilares del AWS Well-Architected Framework, sus principios de diseño y las herramientas para construir sistemas fiables, seguros, eficientes y sostenibles.',
  duracion: '160 min',
  objetivo: 'Explicar los principios de diseño del marco de buena arquitectura de AWS y aplicarlos a decisiones concretas.',
  secciones: [
    {
      id: 'm9s1',
      titulo: 'Principios de diseño del marco de buena arquitectura de AWS',
      resumen: 'El AWS Well-Architected Framework organiza las buenas prácticas en seis pilares: excelencia operativa, seguridad, fiabilidad, eficiencia del rendimiento, optimización de costes y sostenibilidad.',
      objetivos: [
        'Enumerar los seis pilares del marco.',
        'Explicar los principios de diseño generales de la nube.',
        'Utilizar la herramienta AWS Well-Architected para revisar una arquitectura.'
      ],
      bloques: [
        { t: 'p', c: 'El **AWS Well-Architected Framework** es un conjunto de buenas prácticas, preguntas y principios para diseñar y operar sistemas en la nube. No es una lista de servicios: es una forma de **evaluar compromisos (trade-offs)** entre lo que se gana y lo que se pierde en cada decisión.' },
        { t: 'h', c: 'Los seis pilares' },
        { t: 'tabla', cab: ['Pilar', 'Pregunta que responde'], filas: [
          ['Excelencia operativa', '¿Cómo ejecutamos y mejoramos las operaciones y los procesos?'],
          ['Seguridad', '¿Cómo protegemos datos, sistemas y activos?'],
          ['Fiabilidad', '¿Cómo garantizamos que el sistema funciona cuando hace falta?'],
          ['Eficiencia del rendimiento', '¿Cómo usamos los recursos de forma eficiente?'],
          ['Optimización de costes', '¿Cómo evitamos gastar de más?'],
          ['Sostenibilidad', '¿Cómo minimizamos el impacto ambiental de nuestras cargas?']
        ] },
        { t: 'nota', clase: 'dato', titulo: 'Un pilar reciente', c: 'La **sostenibilidad** se añadió en 2021. Los cinco originales son excelencia operativa, seguridad, fiabilidad, eficiencia del rendimiento y optimización de costes.' },
        { t: 'h', c: 'Principios de diseño generales' },
        { t: 'ul', c: [
          '**Dejar de adivinar la capacidad:** medir la demanda y escalar automáticamente.',
          '**Probar a escala de producción:** validar el comportamiento con cargas reales.',
          '**Automatizar para facilitar la experimentación:** desplegar e infraestructura como código.',
          '**Permitir arquitecturas evolutivas:** diseñar para poder cambiar de decisión.',
          '**Impulsar con datos:** medir, observar y decidir con métricas.',
          '**Mejorar mediante el juego de la arquitectura:** revisar y iterar continuamente.'
        ] },
        { t: 'h', c: 'Herramienta AWS Well-Architected' },
        { t: 'p', c: 'La **AWS Well-Architected Tool** plantea una revisión guiada por pilar y pregunta. Genera un informe con riesgos altos y medios, y permite guardar hitos para comparar la evolución del sistema. Las **lentes (lenses)** añaden preguntas específicas para sectores o tecnologías: serverless, análisis de datos, machine learning, SaaS, juegos, salud o el sector público.' },
        { t: 'h', c: 'Cómo se aplica en la práctica' },
        { t: 'ol', c: [
          'Seleccionar la carga de trabajo y describir su objetivo de negocio.',
          'Responder las preguntas de cada pilar con evidencia, no con intenciones.',
          'Revisar los riesgos altos y priorizar las correcciones por impacto.',
          'Registrar un hito (milestone) y repetir la revisión periódicamente.',
          'Integrar la revisión en el ciclo de vida: diseño, despliegue y operación.'
        ] },
        { t: 'nota', clase: 'tip', titulo: 'El marco no es una auditoría', c: 'Well-Architected ayuda a conversar sobre compromisos. No existe una arquitectura «perfecta»: existe la que mejor equilibra los seis pilares para un caso concreto.' }
      ],
      terminos: [
        { t: 'Well-Architected Framework', d: 'Conjunto de buenas prácticas para diseñar y operar sistemas en la nube.' },
        { t: 'Pilar', d: 'Cada una de las seis áreas de evaluación del marco.' },
        { t: 'Lente', d: 'Conjunto de preguntas adicionales adaptadas a un sector o tecnología.' },
        { t: 'Hito (milestone)', d: 'Registro del estado de una revisión para comparar su evolución.' },
        { t: 'Trade-off', d: 'Compromiso entre dos objetivos, por ejemplo coste y rendimiento.' }
      ],
      quiz: [
        { p: '¿Cuál de estos NO es uno de los seis pilares del AWS Well-Architected Framework?', op: ['Seguridad', 'Sostenibilidad', 'Escalabilidad', 'Excelencia operativa'], ok: 2, e: 'Los seis pilares son excelencia operativa, seguridad, fiabilidad, eficiencia del rendimiento, optimización de costes y sostenibilidad.' },
        { p: '¿Qué permite la AWS Well-Architected Tool?', op: ['Desplegar infraestructura automáticamente', 'Revisar una arquitectura y generar un informe de riesgos', 'Monitorizar métricas en tiempo real', 'Cifrar los datos de la cuenta'], ok: 1, e: 'La herramienta guía una revisión por pilares y genera un informe con riesgos y recomendaciones.' },
        { p: 'El principio «dejar de adivinar la capacidad» se relaciona principalmente con…', op: ['La seguridad física', 'La elasticidad y el escalado automático', 'El cifrado de datos', 'La auditoría de accesos'], ok: 1, e: 'Medir la demanda y escalar automáticamente evita aprovisionar de más o de menos.' }
      ]
    },
    {
      id: 'm9s2',
      titulo: 'Excelencia operativa',
      resumen: 'La excelencia operativa busca ejecutar y mejorar los procesos de forma automatizada, con cambios pequeños y reversibles, y aprender de cada fallo.',
      objetivos: [
        'Explicar los principios de diseño de la excelencia operativa.',
        'Identificar servicios de automatización, observabilidad y gestión de cambios.',
        'Describir el ciclo de mejora continua de las operaciones.'
      ],
      bloques: [
        { t: 'p', c: 'La **excelencia operativa** se ocupa de cómo el equipo **ejecuta, monitoriza y mejora** las cargas de trabajo. Incluye la organización, la preparación, la operación y la evolución. La pregunta central: *¿podemos entregar cambios de forma segura y frecuente sin romper nada?*' },
        { t: 'h', c: 'Principios de diseño' },
        { t: 'ul', c: [
          '**Realizar operaciones como código:** infraestructura y procedimientos versionados y automatizados.',
          '**Hacer cambios pequeños, frecuentes y reversibles:** reducen el riesgo de cada despliegue.',
          '**Refinar los procedimientos operativos con frecuencia:** revisar runbooks y automatizar lo repetitivo.',
          '**Anticipar el fallo:** diseñar pensando en qué puede romperse y cómo detectarlo.',
          '**Aprender de todos los fallos:** análisis sin culpables (post-mortems) y acciones concretas.'
        ] },
        { t: 'h', c: 'Servicios que la soportan' },
        { t: 'tabla', cab: ['Necesidad', 'Servicios'], filas: [
          ['Infraestructura como código', 'AWS CloudFormation, AWS CDK, AWS SAM'],
          ['Automatización de operaciones', 'AWS Systems Manager (Automation, Run Command, Patch Manager)'],
          ['Gestión de cambios y conformidad', 'AWS Config, AWS CloudTrail, AWS Organizations'],
          ['Observabilidad', 'Amazon CloudWatch (métricas, registros, alarmas), AWS X-Ray'],
          ['CI/CD', 'AWS CodePipeline, CodeBuild, CodeDeploy, CodeCommit'],
          ['Documentación y conocimiento', 'AWS Systems Manager Documents, wikis internas'],
          ['Gestión de incidentes', 'AWS Systems Manager Incident Manager, AWS Health']
        ] },
        { t: 'h', c: 'Las cuatro áreas del pilar' },
        { t: 'tabla', cab: ['Área', 'Qué cubre'], filas: [
          ['Organización', 'Prioridades, modelo operativo, cultura y estructura del equipo'],
          ['Preparación', 'Diseño, implementación y configuración de la carga de trabajo'],
          ['Operación', 'Comprensión de la salud, respuesta a eventos y gestión de cambios'],
          ['Evolución', 'Mejora continua a partir de lecciones aprendidas']
        ] },
        { t: 'h', c: 'Prácticas concretas' },
        { t: 'ul', c: [
          'Definir **runbooks** para las tareas habituales y automatizarlos con Systems Manager.',
          'Configurar **alarmas accionables**, no ruido: cada alarma debe tener una respuesta.',
          'Usar **despliegues progresivos** (canary, blue/green) con reversión automática.',
          'Registrar **decisiones de arquitectura** (ADR) para que el contexto no se pierda.',
          'Medir el **tiempo medio de recuperación (MTTR)** y el de despliegue.',
          'Revisar los incidentes en un plazo corto y con acciones asignadas.'
        ] },
        { t: 'nota', clase: 'examen', titulo: 'Palabras clave', c: 'Si una pregunta menciona «automatizar la infraestructura», «reducir errores humanos» o «despliegues repetibles», está apuntando a **excelencia operativa** y a **CloudFormation/Systems Manager**.' }
      ],
      terminos: [
        { t: 'Excelencia operativa', d: 'Pilar centrado en operar y mejorar procesos de forma automatizada y segura.' },
        { t: 'Runbook', d: 'Procedimiento documentado para ejecutar una operación o resolver un incidente.' },
        { t: 'IaC', d: 'Infraestructura como código: recursos descritos en plantillas versionadas.' },
        { t: 'MTTR', d: 'Tiempo medio de recuperación tras un incidente.' },
        { t: 'Post-mortem', d: 'Análisis posterior a un incidente centrado en causas y mejoras.' }
      ],
      quiz: [
        { p: '¿Qué práctica representa mejor la excelencia operativa?', op: ['Escalar manualmente las instancias cada mañana', 'Automatizar el despliegue con infraestructura como código', 'Comprar más hardware', 'Desactivar los registros para ahorrar'], ok: 1, e: 'La infraestructura como código permite despliegues repetibles, auditables y con menos errores humanos.' },
        { p: '¿Qué servicio se usa para automatizar tareas operativas como aplicar parches en un grupo de instancias?', op: ['AWS Systems Manager', 'Amazon Redshift', 'AWS Artifact', 'Amazon Macie'], ok: 0, e: 'Systems Manager incluye Patch Manager, Run Command y Automation para operaciones automatizadas.' },
        { p: 'El principio de «hacer cambios pequeños, frecuentes y reversibles» busca principalmente…', op: ['Reducir el coste de la factura', 'Reducir el riesgo de cada despliegue', 'Aumentar el tamaño de las instancias', 'Eliminar la necesidad de pruebas'], ok: 1, e: 'Los cambios pequeños son más fáciles de probar, aislar y revertir, lo que reduce el riesgo operativo.' }
      ]
    },
    {
      id: 'm9s3',
      titulo: 'Seguridad',
      resumen: 'El pilar de seguridad se apoya en una base de identidad sólida, trazabilidad completa, defensa en profundidad, automatización de controles y protección de los datos.',
      objetivos: [
        'Enumerar los principios de diseño del pilar de seguridad.',
        'Relacionar cada principio con los servicios de AWS adecuados.',
        'Aplicar el concepto de defensa en profundidad.'
      ],
      bloques: [
        { t: 'p', c: 'El **pilar de seguridad** cubre identidad y acceso, detección, protección de infraestructura, protección de datos y respuesta a incidentes. Su objetivo es proteger la información y los sistemas de forma **verificable y automatizada**.' },
        { t: 'h', c: 'Principios de diseño' },
        { t: 'ol', c: [
          '**Base de identidad sólida:** centralizar identidades, aplicar mínimo privilegio y usar credenciales temporales.',
          '**Mantener la trazabilidad:** registrar todas las acciones y cambios.',
          '**Aplicar seguridad en todas las capas:** defensa en profundidad, no un único control.',
          '**Automatizar las buenas prácticas de seguridad:** controles como código y detección automática.',
          '**Proteger los datos en tránsito y en reposo:** cifrado por defecto y gestión de claves.',
          '**Mantener a las personas alejadas de los datos:** usar herramientas y roles en lugar de acceso directo.',
          '**Prepararse para los eventos de seguridad:** tener un plan de respuesta y ensayarlo.'
        ] },
        { t: 'h', c: 'Servicios por dominio' },
        { t: 'tabla', cab: ['Dominio', 'Servicios'], filas: [
          ['Identidad y acceso', 'IAM, IAM Identity Center, AWS STS, Amazon Cognito, AWS Directory Service'],
          ['Detección', 'Amazon GuardDuty, AWS Security Hub, Amazon Detective, AWS Config'],
          ['Protección de infraestructura', 'AWS Shield, AWS WAF, AWS Network Firewall, Firewall Manager, VPC'],
          ['Protección de datos', 'AWS KMS, AWS CloudHSM, ACM, Amazon Macie, Secrets Manager'],
          ['Gestión de vulnerabilidades', 'Amazon Inspector, ECR scanning, Systems Manager Patch Manager'],
          ['Respuesta a incidentes', 'AWS Lambda, Systems Manager, CloudWatch, Security Hub, playbooks'],
          ['Registro y auditoría', 'AWS CloudTrail, CloudWatch Logs, VPC Flow Logs, Config']
        ] },
        { t: 'h', c: 'Defensa en profundidad' },
        { t: 'esquema', c: [
          { titulo: 'Perímetro', sub: 'WAF · Shield · Network Firewall' },
          { titulo: 'Identidad', sub: 'IAM · MFA · roles' },
          { titulo: 'Cómputo', sub: 'Parches · Inspector' },
          { titulo: 'Datos', sub: 'KMS · Macie · backups' }
        ] },
        { t: 'p', c: 'Ningún control es suficiente por sí solo. Si una credencial se filtra, el mínimo privilegio limita el daño; si un puerto queda abierto, el cifrado y la segmentación reducen la exposición; si un dato se copia fuera, el cifrado lo hace inútil sin la clave.' },
        { t: 'h', c: 'Respuesta a incidentes' },
        { t: 'ol', c: [
          '**Preparar:** roles, contactos, acceso a registros y playbooks probados.',
          '**Detectar:** alarmas de GuardDuty, Security Hub, Config y métricas anómalas.',
          '**Aislar:** revocar credenciales, restringir grupos de seguridad, aislar la instancia comprometida.',
          '**Erradicar y recuperar:** reconstruir desde una AMI o plantilla confiable.',
          '**Aprender:** análisis posterior y mejora de los controles.'
        ] },
        { t: 'nota', clase: 'examen', titulo: 'Pregunta típica', c: '«¿Qué pilar se ocupa de la gestión de identidades y del cifrado?» → **Seguridad**. «¿Qué servicio registra las llamadas a la API?» → **CloudTrail**, dentro de seguridad y gobernanza.' }
      ],
      terminos: [
        { t: 'Defensa en profundidad', d: 'Aplicar varios controles independientes en capas distintas.' },
        { t: 'Trazabilidad', d: 'Capacidad de reconstruir quién hizo qué y cuándo.' },
        { t: 'Mínimo privilegio', d: 'Conceder solo los permisos imprescindibles.' },
        { t: 'Playbook', d: 'Procedimiento documentado de respuesta a un incidente.' },
        { t: 'Security Hub', d: 'Panel que agrega hallazgos de seguridad y evalúa estándares.' }
      ],
      quiz: [
        { p: '¿Cuál de estos es un principio de diseño del pilar de seguridad?', op: ['Aplicar seguridad en todas las capas', 'Aumentar el tamaño de las instancias', 'Reducir el número de zonas de disponibilidad', 'Eliminar los registros de auditoría'], ok: 0, e: 'La defensa en profundidad, en todas las capas, es uno de los siete principios del pilar de seguridad.' },
        { p: '¿Qué significa «mantener a las personas alejadas de los datos»?', op: ['Que los empleados no puedan acceder a la oficina', 'Usar roles y herramientas automatizadas en lugar de acceso directo a los datos', 'Eliminar los datos personales', 'Prohibir el uso de bases de datos'], ok: 1, e: 'Se busca reducir el acceso humano directo mediante roles, automatización y mecanismos que no exponen los datos.' },
        { p: '¿Qué servicio centraliza hallazgos de seguridad y evalúa estándares como CIS?', op: ['Amazon Inspector', 'AWS Security Hub', 'AWS Artifact', 'Amazon Macie'], ok: 1, e: 'Security Hub agrega hallazgos de varios servicios y evalúa estándares de seguridad.' }
      ]
    },
    {
      id: 'm9s4',
      titulo: 'Fiabilidad',
      resumen: 'La fiabilidad es la capacidad de un sistema de recuperarse de fallos, escalar para satisfacer la demanda y recuperar el servicio tras un desastre, mediante automatización y pruebas.',
      objetivos: [
        'Explicar los principios de diseño del pilar de fiabilidad.',
        'Diferenciar alta disponibilidad, tolerancia a fallos y recuperación ante desastres.',
        'Aplicar auto-recuperación y pruebas de resiliencia.'
      ],
      bloques: [
        { t: 'p', c: 'La **fiabilidad** es la capacidad de una carga de trabajo de **funcionar correctamente y de forma consistente** cuando se necesita. Incluye la recuperación automática ante fallos, el escalado para absorber la demanda y la recuperación tras un desastre.' },
        { t: 'h', c: 'Principios de diseño' },
        { t: 'ul', c: [
          '**Recuperarse automáticamente de los fallos:** monitorizar y sustituir componentes enfermos.',
          '**Probar los procedimientos de recuperación:** una recuperación no probada es una hipótesis.',
          '**Escalar horizontalmente:** añadir instancias pequeñas en lugar de una enorme.',
          '**Dejar de adivinar la capacidad:** aprovisionar según la demanda medida.',
          '**Gestionar el cambio mediante automatización:** cambios controlados y repetibles.'
        ] },
        { t: 'h', c: 'Servicios de fiabilidad' },
        { t: 'tabla', cab: ['Función', 'Servicios'], filas: [
          ['Distribución geográfica', 'Regiones, zonas de disponibilidad, Route 53, CloudFront'],
          ['Equilibrio y salud', 'Elastic Load Balancing, EC2 Auto Scaling, health checks'],
          ['Copias de seguridad', 'AWS Backup, snapshots EBS/RDS, S3 versioning y replicación'],
          ['Recuperación ante desastres', 'AWS Elastic Disaster Recovery, réplicas entre regiones, Route 53 failover'],
          ['Pruebas de resiliencia', 'AWS Fault Injection Service (FIS), chaos engineering'],
          ['Observabilidad', 'CloudWatch, X-Ray, AWS Health, Personal Health Dashboard']
        ] },
        { t: 'h', c: 'Alta disponibilidad, tolerancia a fallos y DR' },
        { t: 'tabla', cab: ['Estrategia', 'Objetivo', 'Coste'], filas: [
          ['Alta disponibilidad (multi-AZ)', 'Reducir el tiempo de inactividad ante un fallo de zona', 'Medio: duplicar componentes críticos'],
          ['Tolerancia a fallos', 'Continuar sin interrupción aunque falle un componente', 'Alto: redundancia activa-activa'],
          ['Recuperación ante desastres', 'Restablecer el servicio tras perder una región', 'Variable según RTO/RPO']
        ] },
        { t: 'h', c: 'Diseñar para el fallo' },
        { t: 'ul', c: [
          '**Aislar el radio de impacto (blast radius):** separar cuentas, VPC y zonas para que un fallo no lo afecte todo.',
          '**Evitar puntos únicos de fallo:** ningún componente crítico debe ser único.',
          '**Usar colas y reintentos con retroceso exponencial** para absorber fallos transitorios.',
          '**Aplicar idempotencia** en las operaciones para poder reintentarlas sin efectos duplicados.',
          '**Establecer SLO y presupuestos de error** para decidir cuándo priorizar la estabilidad sobre nuevas funciones.',
          '**Probar inyección de fallos** en un entorno controlado con AWS FIS.'
        ] },
        { t: 'nota', clase: 'tip', titulo: 'La pregunta clave', c: 'Ante una decisión de fiabilidad, pregúntate: *si esta zona de disponibilidad desaparece ahora, ¿qué deja de funcionar?* Si la respuesta es «todo», la arquitectura necesita redundancia.' }
      ],
      terminos: [
        { t: 'Fiabilidad', d: 'Capacidad de un sistema de funcionar correctamente y recuperarse de fallos.' },
        { t: 'Punto único de fallo', d: 'Componente cuya caída interrumpe todo el servicio.' },
        { t: 'Radio de impacto', d: 'Alcance del daño que provoca un fallo.' },
        { t: 'Chaos engineering', d: 'Prueba deliberada de fallos para validar la resiliencia.' },
        { t: 'SLO', d: 'Objetivo de nivel de servicio medible, por ejemplo el 99,9 % de disponibilidad.' }
      ],
      quiz: [
        { p: '¿Cuál de estos es un principio de diseño del pilar de fiabilidad?', op: ['Probar los procedimientos de recuperación', 'Reducir el número de copias de seguridad', 'Concentrar todo en una sola zona de disponibilidad', 'Eliminar la monitorización'], ok: 0, e: 'Probar la recuperación es un principio central: la fiabilidad se valida con pruebas reales.' },
        { p: '¿Qué busca el principio de «escalar horizontalmente»?', op: ['Añadir más CPU y memoria a una sola instancia', 'Añadir más instancias pequeñas para repartir la carga', 'Reducir el número de usuarios', 'Eliminar el balanceador de carga'], ok: 1, e: 'El escalado horizontal añade instancias y evita depender de un único equipo grande.' },
        { p: '¿Qué servicio permite inyectar fallos controlados para probar la resiliencia?', op: ['AWS Fault Injection Service', 'AWS Artifact', 'Amazon Macie', 'AWS Budgets'], ok: 0, e: 'AWS FIS ejecuta experimentos de inyección de fallos (chaos engineering) para validar la resiliencia.' }
      ]
    },
    {
      id: 'm9s5',
      titulo: 'Eficiencia del rendimiento',
      resumen: 'La eficiencia del rendimiento consiste en usar los recursos de forma óptima para satisfacer los requisitos, experimentando con tecnologías y ajustando continuamente.',
      objetivos: [
        'Enumerar los principios del pilar de eficiencia del rendimiento.',
        'Elegir servicios y configuraciones para mejorar el rendimiento.',
        'Aplicar la observabilidad y las pruebas de carga al ajuste.'
      ],
      bloques: [
        { t: 'p', c: 'La **eficiencia del rendimiento** es la capacidad de **usar los recursos de forma eficiente** para cumplir los requisitos del sistema. No se trata solo de ir más rápido, sino de lograr el rendimiento necesario con el menor consumo posible.' },
        { t: 'h', c: 'Principios de diseño' },
        { t: 'ul', c: [
          '**Democratizar las tecnologías avanzadas:** usar servicios gestionados en lugar de construir infraestructura compleja.',
          '**Salir al mundo en minutos:** desplegar en varias regiones para acercarse a los usuarios.',
          '**Usar arquitecturas sin servidor:** delegar la gestión de la capacidad.',
          '**Experimentar con más frecuencia:** probar configuraciones y tecnologías distintas.',
          '**Considerar la simpatía mecánica:** entender cómo funciona el sistema subyacente para usarlo bien.'
        ] },
        { t: 'h', c: 'Áreas de revisión' },
        { t: 'tabla', cab: ['Área', 'Preguntas y servicios'], filas: [
          ['Selección', '¿El tipo de instancia, el almacenamiento y el motor son los adecuados? Compute Optimizer, tipos Graviton'],
          ['Revisión', '¿Se revisa el rendimiento con métricas? CloudWatch, X-Ray, Performance Insights'],
          ['Monitorización', '¿Se detectan desviaciones a tiempo? Alarmas, dashboards, synthetics'],
          ['Compromisos', '¿Se prioriza latencia, throughput o coste? ElastiCache, CloudFront, DAX']
        ] },
        { t: 'h', c: 'Palancas habituales' },
        { t: 'ul', c: [
          '**Caché:** CloudFront para contenido, ElastiCache para datos, DAX para DynamoDB.',
          '**CDN y borde:** servir desde la ubicación más cercana al usuario.',
          '**Escalado horizontal y particionado:** repartir la carga entre varios recursos.',
          '**Modelos de datos eficientes:** índices adecuados, consultas que no lean de más.',
          '**Procesamiento asíncrono:** desacoplar con SQS y procesar en paralelo.',
          '**Tecnologías adecuadas:** bases de datos especializadas (DynamoDB, Redshift, ElastiCache).',
          '**Procesadores Graviton:** mejor rendimiento por vatio y por euro.'
        ] },
        { t: 'h', c: 'Medir antes de optimizar' },
        { t: 'p', c: 'Optimizar sin medir es adivinar. Conviene definir las métricas que importan al negocio (latencia p95, tasa de error, transacciones por segundo), instrumentar la aplicación con **X-Ray** y **CloudWatch**, y ejecutar **pruebas de carga** con herramientas como Distributed Load Testing o JMeter antes de cambiar configuraciones.' },
        { t: 'nota', clase: 'examen', titulo: 'No confundas', c: '**Eficiencia del rendimiento** usa bien los recursos para cumplir requisitos. **Optimización de costes** reduce el gasto. A menudo van juntas, pero una pregunta sobre latencia o throughput apunta al primer pilar.' }
      ],
      terminos: [
        { t: 'Eficiencia del rendimiento', d: 'Pilar que busca usar los recursos de forma óptima para cumplir los requisitos.' },
        { t: 'Latencia', d: 'Tiempo que tarda una operación en completarse.' },
        { t: 'Throughput', d: 'Cantidad de trabajo o datos procesados por unidad de tiempo.' },
        { t: 'Caché', d: 'Copia temporal de datos para acelerar accesos repetidos.' },
        { t: 'Simpatía mecánica', d: 'Comprender el funcionamiento interno del sistema para aprovecharlo mejor.' }
      ],
      quiz: [
        { p: '¿Qué pilar se centra en usar los recursos de forma eficiente para cumplir los requisitos de rendimiento?', op: ['Excelencia operativa', 'Eficiencia del rendimiento', 'Optimización de costes', 'Seguridad'], ok: 1, e: 'La eficiencia del rendimiento equilibra requisitos de rendimiento con uso eficiente de recursos.' },
        { p: '¿Qué servicio es adecuado para cachear datos de una base de datos relacional y reducir la latencia?', op: ['Amazon ElastiCache', 'AWS Artifact', 'Amazon Macie', 'AWS Config'], ok: 0, e: 'ElastiCache ofrece caché en memoria (Redis o Memcached) para acelerar lecturas frecuentes.' },
        { p: '¿Qué significa «simpatía mecánica» en el marco?', op: ['Elegir siempre el servicio más caro', 'Entender cómo funciona el sistema subyacente para usarlo eficazmente', 'Evitar la automatización', 'Usar solo máquinas físicas'], ok: 1, e: 'Implica conocer las características del hardware y del servicio para alinear el diseño con su funcionamiento.' }
      ]
    },
    {
      id: 'm9s6',
      titulo: 'Optimización de costos',
      resumen: 'La optimización de costes se basa en la gestión financiera de la nube, la visibilidad del gasto, la elección de recursos adecuados y la mejora continua.',
      objetivos: [
        'Explicar los principios del pilar de optimización de costes.',
        'Aplicar el ciclo de gestión financiera de la nube.',
        'Identificar las palancas de reducción de gasto por servicio.'
      ],
      bloques: [
        { t: 'p', c: 'La **optimización de costes** consiste en **entregar valor al menor precio posible**. No se trata de gastar poco, sino de no pagar por lo que no aporta: capacidad ociosa, recursos sobredimensionados, almacenamiento duplicado o modelos de compra inadecuados.' },
        { t: 'h', c: 'Principios de diseño' },
        { t: 'ul', c: [
          '**Implementar la gestión financiera de la nube:** presupuestos, previsión y responsabilidad por el gasto.',
          '**Adoptar un modelo de consumo:** medir y pagar por lo que se usa.',
          '**Medir la eficiencia global:** calcular el coste por unidad de negocio (por usuario, por pedido).',
          '**Dejar de gastar en operaciones de centro de datos:** usar servicios gestionados.',
          '**Analizar y atribuir el gasto:** etiquetar y repartir costes.',
          '**Optimizar con el tiempo:** revisar y ajustar continuamente.'
        ] },
        { t: 'h', c: 'Las cuatro fases de la gestión financiera' },
        { t: 'esquema', c: [
          { titulo: 'Informar', sub: 'Visibilidad y reparto' },
          { titulo: 'Prever', sub: 'Presupuesto y planificación' },
          { titulo: 'Optimizar', sub: 'Ajustar recursos y compras' },
          { titulo: 'Operar', sub: 'Gobernar y automatizar' }
        ] },
        { t: 'h', c: 'Palancas por servicio' },
        { t: 'tabla', cab: ['Servicio', 'Palancas de ahorro'], filas: [
          ['Amazon EC2', 'Savings Plans, Spot, rightsizing, apagado programado, Graviton'],
          ['Amazon S3', 'Clases de almacenamiento, ciclo de vida, Intelligent-Tiering, compresión'],
          ['Amazon EBS', 'gp3, eliminar volúmenes huérfanos, snapshots antiguos, cifrado sin sobrecoste'],
          ['Amazon RDS', 'Instancias reservadas, réplicas ajustadas, Aurora Serverless en cargas variables'],
          ['Amazon DynamoDB', 'Modo bajo demanda o capacidad reservada, TTL, archivado en S3'],
          ['Redes', 'VPC Endpoints, CloudFront, revisar NAT Gateway y tráfico entre zonas'],
          ['AWS Lambda', 'Ajustar memoria, evitar invocaciones innecesarias, duración adecuada']
        ] },
        { t: 'h', c: 'Herramientas' },
        { t: 'ul', c: [
          '**AWS Cost Explorer** y **AWS Budgets** para visibilidad y alertas.',
          '**AWS Cost and Usage Report** para el detalle a nivel de recurso.',
          '**AWS Compute Optimizer** para recomendaciones de tamaño.',
          '**AWS Trusted Advisor** con comprobaciones de optimización de costes.',
          '**AWS Cost Anomaly Detection** para detectar picos.',
          '**AWS Savings Plans** y **instancias reservadas** para compromisos.',
          '**AWS Marketplace** y **AWS Partner** para licencias y servicios.'
        ] },
        { t: 'nota', clase: 'aviso', titulo: 'El coste no se optimiza una vez', c: 'Una arquitectura optimizada hoy deja de serlo cuando cambia el uso. La optimización es un proceso mensual, no un proyecto puntual.' }
      ],
      terminos: [
        { t: 'Cloud Financial Management', d: 'Disciplina de gestión del gasto en la nube con visibilidad, previsión y control.' },
        { t: 'Coste por unidad', d: 'Métrica que relaciona el gasto con el valor generado, por ejemplo coste por pedido.' },
        { t: 'Showback', d: 'Reparto interno del gasto a cada equipo o proyecto.' },
        { t: 'Rightsizing', d: 'Ajuste del tamaño de los recursos al uso real.' },
        { t: 'Cost Anomaly Detection', d: 'Detección automática de picos de gasto anómalos.' }
      ],
      quiz: [
        { p: '¿Cuál es el objetivo del pilar de optimización de costes?', op: ['Gastar lo mínimo aunque no se cumplan los requisitos', 'Entregar valor al menor precio posible sin sacrificar lo necesario', 'Comprar siempre instancias reservadas', 'Eliminar todos los servicios gestionados'], ok: 1, e: 'Optimizar costes es maximizar el valor por euro gastado, no recortar sin criterio.' },
        { p: '¿Qué herramienta analiza el gasto ya realizado y muestra previsiones por servicio o etiqueta?', op: ['AWS Cost Explorer', 'AWS Pricing Calculator', 'AWS Artifact', 'AWS Config'], ok: 0, e: 'Cost Explorer visualiza el gasto histórico y las previsiones; Pricing Calculator estima el futuro.' },
        { p: '¿Qué métrica de negocio ayuda a medir la eficiencia del gasto?', op: ['El número de regiones', 'El coste por pedido o por usuario', 'El número de políticas de IAM', 'El tamaño del bucket de S3'], ok: 1, e: 'Relacionar el gasto con una unidad de valor (coste por pedido, por usuario) permite evaluar la eficiencia real.' }
      ]
    },
    {
      id: 'm9s7',
      titulo: 'Fiabilidad y disponibilidad',
      resumen: 'Disponibilidad, durabilidad, RTO y RPO definen cuánto puede fallar un sistema. Las estrategias de recuperación ante desastres van de copia y restauración a activo-activo multi-región.',
      objetivos: [
        'Diferenciar disponibilidad, durabilidad, RTO y RPO.',
        'Comparar las cuatro estrategias de recuperación ante desastres.',
        'Diseñar una arquitectura multi-AZ y multi-región.'
      ],
      bloques: [
        { t: 'p', c: 'La fiabilidad se concreta en dos preguntas: **¿cuánto tiempo puede estar caído el sistema?** y **¿cuántos datos puedo perder?** Las respuestas determinan la arquitectura y el coste.' },
        { t: 'h', c: 'Conceptos fundamentales' },
        { t: 'tabla', cab: ['Término', 'Definición', 'Ejemplo'], filas: [
          ['Disponibilidad', 'Porcentaje del tiempo que el servicio responde', '99,9 % implica unas 8,7 horas de caída al año'],
          ['Durabilidad', 'Probabilidad de no perder datos', 'S3: 99,999999999 %'],
          ['RTO', 'Tiempo máximo aceptable para restaurar el servicio', '4 horas tras un desastre'],
          ['RPO', 'Cantidad máxima de datos que se acepta perder', '15 minutos de transacciones'],
          ['MTTR', 'Tiempo medio de recuperación', 'Métrica operativa'],
          ['MTBF', 'Tiempo medio entre fallos', 'Métrica de fiabilidad del componente']
        ] },
        { t: 'p', c: 'La disponibilidad se expresa en «nueves»: 99 % son 3,65 días al año; 99,9 %, 8,76 horas; 99,99 %, 52,6 minutos; 99,999 %, 5,26 minutos.' },
        { t: 'h', c: 'Estrategias de recuperación ante desastres' },
        { t: 'tabla', cab: ['Estrategia', 'Funcionamiento', 'RTO / RPO', 'Coste'], filas: [
          ['Copia y restauración', 'Se restauran copias en la región de recuperación', 'Horas / horas', 'El más bajo'],
          ['Pilot light', 'Los datos se replican y queda un núcleo mínimo encendido; se escala al recuperar', 'Decenas de minutos / minutos', 'Bajo-medio'],
          ['Warm standby', 'Una versión funcional a escala reducida siempre encendida', 'Minutos / segundos', 'Medio-alto'],
          ['Activo-activo (multi-site)', 'Ambas regiones atienden tráfico simultáneamente', 'Casi cero / casi cero', 'El más alto']
        ] },
        { t: 'esquema', c: [
          { titulo: 'Copia y restauración', sub: 'Barato, lento' },
          { titulo: 'Pilot light', sub: 'Núcleo mínimo' },
          { titulo: 'Warm standby', sub: 'Escala reducida' },
          { titulo: 'Activo-activo', sub: 'Cero interrupción' }
        ] },
        { t: 'h', c: 'Diseño multi-AZ' },
        { t: 'ol', c: [
          'Desplegar la aplicación en al menos **dos zonas de disponibilidad**.',
          'Usar un **balanceador de carga** que reparta el tráfico y compruebe la salud.',
          'Configurar **Auto Scaling** con instancias en varias subredes.',
          'Usar **RDS Multi-AZ** o Aurora para la base de datos.',
          'Almacenar objetos en **S3** (replicado automáticamente) y archivos en **EFS** multi-AZ.',
          'Eliminar estados locales: sesiones en ElastiCache o DynamoDB, no en la instancia.'
        ] },
        { t: 'h', c: 'Diseño multi-región' },
        { t: 'ul', c: [
          '**Route 53** con políticas de failover o latencia y comprobaciones de estado.',
          '**Replicación** de datos entre regiones: S3 CRR, Aurora Global Database, DynamoDB Global Tables.',
          '**Infraestructura como código** para poder recrear el entorno en la región secundaria.',
          '**Pruebas periódicas** de conmutación: un plan de DR no probado no es un plan.',
          '**Aislamiento de cuentas** y límites de servicio para evitar fallos en cascada.'
        ] },
        { t: 'nota', clase: 'examen', titulo: 'RTO y RPO', c: '**RTO** = tiempo para volver a funcionar (reloj). **RPO** = datos que se pueden perder (retroceso en el tiempo). Si el enunciado dice «no podemos perder más de 5 minutos de datos», habla de RPO.' }
      ],
      terminos: [
        { t: 'Disponibilidad', d: 'Porcentaje de tiempo en que el servicio está operativo.' },
        { t: 'RTO', d: 'Tiempo objetivo de recuperación tras un desastre.' },
        { t: 'RPO', d: 'Pérdida máxima de datos aceptable, medida en tiempo.' },
        { t: 'Pilot light', d: 'Estrategia de DR con un núcleo mínimo siempre activo.' },
        { t: 'Warm standby', d: 'Estrategia de DR con una réplica funcional a escala reducida.' },
        { t: 'Activo-activo', d: 'Ambas regiones atienden tráfico al mismo tiempo.' }
      ],
      quiz: [
        { p: '¿Qué término describe la cantidad máxima de datos que una empresa acepta perder ante un desastre?', op: ['RTO', 'RPO', 'MTBF', 'SLA'], ok: 1, e: 'El RPO (Recovery Point Objective) define cuánto retroceso en los datos es aceptable.' },
        { p: '¿Qué estrategia de recuperación ante desastres tiene el coste más bajo?', op: ['Activo-activo', 'Warm standby', 'Pilot light', 'Copia y restauración'], ok: 3, e: 'Copia y restauración es la más económica, aunque con RTO y RPO más altos.' },
        { p: 'Una arquitectura con el 99,99 % de disponibilidad puede estar caída aproximadamente…', op: ['3,65 días al año', '8,76 horas al año', '52,6 minutos al año', '5,26 minutos al año'], ok: 2, e: '99,99 % equivale a unos 52,6 minutos de inactividad al año; 99,999 % serían 5,26 minutos.' }
      ]
    },
    {
      id: 'm9s8',
      titulo: 'AWS Trusted Advisor',
      resumen: 'AWS Trusted Advisor es un servicio que inspecciona la cuenta y ofrece recomendaciones en cinco categorías: optimización de costes, rendimiento, seguridad, tolerancia a fallos y cuotas de servicio.',
      objetivos: [
        'Explicar qué evalúa Trusted Advisor y en qué categorías.',
        'Diferenciar las comprobaciones disponibles según el plan de soporte.',
        'Priorizar las recomendaciones según su impacto.'
      ],
      bloques: [
        { t: 'p', c: '**AWS Trusted Advisor** es un asesor automatizado que examina la cuenta de AWS y compara su configuración con las buenas prácticas de AWS. Genera una lista de comprobaciones con estado (verde, amarillo, rojo) y recomendaciones accionables.' },
        { t: 'h', c: 'Las cinco categorías' },
        { t: 'tabla', cab: ['Categoría', 'Qué revisa', 'Ejemplo de comprobación'], filas: [
          ['Optimización de costes', 'Recursos infrautilizados o mal dimensionados', 'Instancias EC2 con bajo uso, volúmenes sin adjuntar'],
          ['Rendimiento', 'Configuraciones que limitan el rendimiento', 'Uso elevado de CPU, almacenamiento provisionado en exceso'],
          ['Seguridad', 'Configuraciones de riesgo', 'MFA en la raíz, buckets públicos, puertos abiertos'],
          ['Tolerancia a fallos', 'Falta de redundancia', 'RDS sin Multi-AZ, ausencia de copias de seguridad'],
          ['Cuotas de servicio', 'Límites cercanos al máximo', 'Límite de instancias EC2 o de VPC por región']
        ] },
        { t: 'nota', clase: 'examen', titulo: 'Ojo con las categorías', c: 'Las cinco categorías son **coste, rendimiento, seguridad, tolerancia a fallos y cuotas**. No existe una categoría de «excelencia operativa» en Trusted Advisor.' },
        { t: 'h', c: 'Disponibilidad según el plan de soporte' },
        { t: 'tabla', cab: ['Plan', 'Comprobaciones'], filas: [
          ['Basic y Developer', 'Las 7 comprobaciones básicas (seguridad y cuotas de servicio) más el panel'],
          ['Business, Enterprise On-Ramp y Enterprise', 'Todas las comprobaciones, con actualizaciones automáticas y acceso a la API'],
          ['AWS Organizations', 'Resumen agregado de todas las cuentas de la organización']
        ] },
        { t: 'h', c: 'Cómo usarlo bien' },
        { t: 'ol', c: [
          'Revisar primero las comprobaciones en **rojo** de seguridad y tolerancia a fallos: son las de mayor impacto.',
          'Priorizar las de coste con mayor gasto asociado, no las más numerosas.',
          'Automatizar la respuesta: por ejemplo, alertas cuando aparezca un bucket público.',
          'Revisar las **cuotas de servicio** antes de un lanzamiento para evitar bloqueos.',
          'Repetir la revisión periódicamente e integrarla en el proceso de revisión de arquitectura.'
        ] },
        { t: 'h', c: 'Relación con otras herramientas' },
        { t: 'p', c: 'Trusted Advisor ofrece recomendaciones generales. Para un análisis más profundo existen **AWS Well-Architected Tool** (revisión por pilares), **AWS Config** (conformidad continua), **AWS Security Hub** (estándares de seguridad), **AWS Compute Optimizer** (dimensionamiento) y **AWS Cost Explorer** (gasto detallado).' }
      ],
      terminos: [
        { t: 'Trusted Advisor', d: 'Asesor automatizado que evalúa la cuenta frente a buenas prácticas de AWS.' },
        { t: 'Comprobación', d: 'Regla que evalúa un aspecto de la cuenta y devuelve un estado.' },
        { t: 'Cuota de servicio', d: 'Límite de recursos que se pueden crear en una cuenta y región.' },
        { t: 'Tolerancia a fallos', d: 'Capacidad de seguir funcionando ante el fallo de un componente.' }
      ],
      quiz: [
        { p: '¿Cuántas categorías de comprobaciones tiene AWS Trusted Advisor?', op: ['Tres', 'Cuatro', 'Cinco', 'Seis'], ok: 2, e: 'Son cinco: optimización de costes, rendimiento, seguridad, tolerancia a fallos y cuotas de servicio.' },
        { p: '¿Qué plan de soporte desbloquea todas las comprobaciones de Trusted Advisor y el acceso a la API?', op: ['Basic', 'Developer', 'Business y superiores', 'Ninguno'], ok: 2, e: 'Business, Enterprise On-Ramp y Enterprise incluyen todas las comprobaciones y la API de Trusted Advisor.' },
        { p: '¿Qué comprobación pertenece a la categoría de seguridad?', op: ['Instancias EC2 infrautilizadas', 'MFA activado en la cuenta raíz', 'RDS sin Multi-AZ', 'Cuota de VPC por región'], ok: 1, e: 'La MFA en la cuenta raíz es una comprobación de seguridad. RDS sin Multi-AZ es de tolerancia a fallos.' }
      ]
    }
  ]
});
