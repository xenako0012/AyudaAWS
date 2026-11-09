/* Módulo 2 · Facturación y economía de la nube */
(window.MODULOS = window.MODULOS || []).push({
  id: 'm2',
  numero: 2,
  titulo: 'Facturación y economía de la nube',
  descripcion: 'Cómo se construye el precio de AWS, cómo calcular el coste total de propiedad, cómo organizar y controlar el gasto y qué incluye cada plan de soporte.',
  duracion: '100 min',
  objetivo: 'Explicar la filosofía de precios de AWS y aplicar herramientas de previsión, control y soporte del gasto.',
  secciones: [
    {
      id: 'm2s1',
      titulo: 'Aspectos fundamentales de los precios',
      resumen: 'AWS cobra por uso real y sin contratos obligatorios. Los tres factores que determinan la factura son el cómputo, el almacenamiento y la transferencia de datos salientes.',
      objetivos: [
        'Identificar los tres factores de coste principales.',
        'Explicar el modelo de pago por uso y sus principios.',
        'Comparar las opciones de compra: bajo demanda, reservada, Savings Plans y Spot.'
      ],
      bloques: [
        { t: 'p', c: 'La filosofía de precios de AWS se resume en una idea: **pagar solo por lo que se usa, cuando se usa y sin contratos a largo plazo obligatorios**. De ahí se derivan tres principios que conviene memorizar: pagar por uso, reservar para ahorrar y aprovechar las economías de escala.' },
        { t: 'h', c: 'Los tres factores de coste' },
        { t: 'tabla', cab: ['Factor', 'Cómo se mide', 'Ejemplo'], filas: [
          ['Cómputo', 'Por segundo o por hora de instancia en ejecución', 'Amazon EC2, AWS Lambda (por invocación y GB-segundo)'],
          ['Almacenamiento', 'Por GB almacenado al mes', 'Amazon S3, Amazon EBS, Amazon EFS'],
          ['Transferencia de datos', 'Por GB que sale de AWS hacia internet (o entre regiones)', 'Descargas desde S3 a internet']
        ] },
        { t: 'nota', clase: 'examen', titulo: 'Muy preguntado', c: 'La **transferencia de datos entrante** a AWS suele ser gratuita. Lo que se cobra es la **salida** (data transfer out) y, en algunos casos, el tráfico entre regiones o entre zonas de disponibilidad.' },
        { t: 'h', c: 'Pagar por uso' },
        { t: 'ul', c: [
          'No hay coste inicial ni compromiso mínimo: se puede empezar con un solo recurso y crecer.',
          'La facturación de EC2 es **por segundo** con un mínimo de 60 segundos en instancias bajo demanda y Spot (algunos recursos se facturan por hora).',
          'Los recursos **apagados** no consumen cómputo, pero pueden seguir generando coste de almacenamiento (volúmenes EBS, direcciones IP elásticas reservadas, instantáneas).',
          'Los niveles de uso acumulados abaratan el precio unitario: por ejemplo, los primeros 50 TB de S3 tienen un precio y los siguientes, otro menor.'
        ] },
        { t: 'h', c: 'Reservar para ahorrar' },
        { t: 'tabla', cab: ['Opción', 'Compromiso', 'Ahorro típico', 'Ideal para'], filas: [
          ['Bajo demanda (On-Demand)', 'Ninguno', '—', 'Cargas esporádicas o desconocidas'],
          ['Instancias reservadas (RI)', '1 o 3 años', 'Hasta ~72 %', 'Cargas estables previsibles'],
          ['Savings Plans (Compute)', '1 o 3 años, con compromiso de gasto por hora', 'Hasta ~66 %', 'Uso mixto de EC2, Fargate y Lambda'],
          ['Savings Plans (EC2 Instance)', '1 o 3 años, ligado a familia de instancia y región', 'Hasta ~72 %', 'Uso estable de EC2'],
          ['Instancias Spot', 'Ninguno (interrumpibles)', 'Hasta ~90 %', 'Procesos por lotes, CI/CD, renderizado'],
          ['Hosts dedicados', 'Reserva opcional', '—', 'Requisitos de licencia o cumplimiento']
        ] },
        { t: 'p', c: 'Las **instancias reservadas** tienen dos modalidades: **estándar**, que no permite cambiar de familia, y **convertible**, que permite modificaciones a cambio de un descuento algo menor. Los **Savings Plans** son más flexibles porque se comprometen a un gasto por hora y no a un tipo de instancia concreto.' },
        { t: 'h', c: 'Pagar menos al crecer' },
        { t: 'p', c: 'Gracias a las economías de escala, AWS ha bajado precios más de un centenar de veces desde 2006. Además, el uso agregado de toda la organización reduce el precio unitario en servicios con niveles (S3, transferencia de datos) y el **uso reservado no utilizado** se comparte entre cuentas mediante la facturación consolidada de AWS Organizations.' },
        { t: 'h', c: 'El nivel gratuito (Free Tier)' },
        { t: 'ul', c: [
          '**Servicios siempre gratuitos:** con límites mensuales, como 1 millón de invocaciones de Lambda o 25 GB de DynamoDB.',
          '**Cuentas nuevas desde el 15 de julio de 2025:** AWS sustituyó el antiguo periodo de prueba de 12 meses por el **plan gratuito basado en créditos**: 100 USD al registrarse, hasta 100 USD adicionales al completar actividades y una duración de seis meses (o hasta agotar los créditos). Las cuentas anteriores a esa fecha conservan el modelo de 12 meses.',
          '**AWS Academy Learner Lab:** el entorno del curso no usa la cuenta personal, sino un laboratorio con créditos limitados y temporales que se reinicia periódicamente. Todo lo que se cree en el laboratorio desaparece al terminar la sesión.'
        ] },
        { t: 'nota', clase: 'aviso', titulo: 'Cuidado con el laboratorio', c: 'En el Learner Lab, los recursos se detienen al finalizar la sesión de laboratorio y el progreso puede perderse. Guarda siempre el código y la documentación fuera del laboratorio.' },
        { t: 'h', c: 'Costes que sorprenden' },
        { t: 'ul', c: [
          '**Direcciones IP elásticas no asociadas:** se facturan si están reservadas y sin usar.',
          '**Instantáneas EBS:** crecen con el tiempo; conviene automatizar su limpieza con políticas de ciclo de vida.',
          '**Tráfico entre zonas de disponibilidad:** es habitual en arquitecturas multi-AZ; se cobra el que cruza zonas.',
          '**NAT Gateway:** se paga por hora y por GB procesado, y suele ser una de las líneas más altas en facturas pequeñas.',
          '**Sistemas de archivos y volúmenes huérfanos:** recursos olvidados que nadie apaga.'
        ] }
      ],
      terminos: [
        { t: 'Pago por uso', d: 'Modelo en el que se factura únicamente el consumo real del recurso.' },
        { t: 'Instancia reservada', d: 'Compromiso de 1 o 3 años a cambio de un descuento importante en EC2, RDS u otros servicios.' },
        { t: 'Savings Plans', d: 'Compromiso de gasto por hora durante 1 o 3 años con descuentos flexibles.' },
        { t: 'Instancia Spot', d: 'Capacidad sobrante de EC2 con hasta un 90 % de descuento, interrumpible.' },
        { t: 'Data transfer out', d: 'Datos que salen de AWS hacia internet; es un factor de coste habitual.' }
      ],
      quiz: [
        { p: '¿Cuál de estos tres factores determina principalmente el coste en AWS?', op: ['El número de usuarios de la consola', 'La transferencia de datos salientes', 'El número de políticas de IAM', 'La cantidad de etiquetas aplicadas'], ok: 1, e: 'Los tres factores de coste son cómputo, almacenamiento y transferencia de datos salientes. Los otros elementos no generan coste.' },
        { p: 'Una empresa tiene una carga de trabajo por lotes que puede reanudarse si se interrumpe y quiere minimizar el coste. ¿Qué opción debería elegir?', op: ['Instancias bajo demanda', 'Instancias reservadas de 3 años', 'Instancias Spot', 'Hosts dedicados'], ok: 2, e: 'Las instancias Spot ofrecen hasta un 90 % de descuento a cambio de poder ser interrumpidas, ideales para procesamiento por lotes.' },
        { p: '¿Qué tipo de tráfico suele ser gratuito en AWS?', op: ['La salida de datos a internet', 'La entrada de datos a AWS', 'El tráfico entre regiones', 'El tráfico entre zonas de disponibilidad'], ok: 1, e: 'La transferencia de datos entrante a AWS normalmente no se cobra; la saliente sí.' }
      ]
    },
    {
      id: 'm2s2',
      titulo: 'Costo total de propiedad',
      resumen: 'El TCO compara el coste completo de mantener infraestructura propia con el de operar en AWS, incluyendo hardware, software, instalaciones, energía, personal y el coste de oportunidad.',
      objetivos: [
        'Definir el coste total de propiedad (TCO).',
        'Enumerar los componentes de coste de un centro de datos propio.',
        'Utilizar AWS Pricing Calculator y Migration Evaluator para estimar el ahorro.'
      ],
      bloques: [
        { t: 'p', c: 'El **coste total de propiedad (TCO)** es la suma de todos los costes asociados a un activo o servicio durante su vida útil. En el contexto de la nube se usa para responder a una pregunta muy concreta: *¿qué me cuesta de verdad mantener esto en mi centro de datos frente a ejecutarlo en AWS?*' },
        { t: 'h', c: 'Costes ocultos de un centro de datos propio' },
        { t: 'tabla', cab: ['Categoría', 'Ejemplos'], filas: [
          ['Hardware de servidores', 'Servidores, almacenamiento, equipos de red, repuestos'],
          ['Hardware de instalaciones', 'Refrigeración, UPS, generadores, racks, cableado'],
          ['Software', 'Licencias de sistema operativo, virtualización, bases de datos, monitorización'],
          ['Instalaciones', 'Alquiler o amortización de la sala, seguridad física, seguro'],
          ['Energía', 'Electricidad de servidores y refrigeración, a menudo el coste más subestimado'],
          ['Personal', 'Administradores de sistemas, operadores 24/7, consultoría'],
          ['Mantenimiento y renovación', 'Contratos de soporte y sustitución cada 3-5 años'],
          ['Coste de oportunidad', 'Tiempo del equipo dedicado a infraestructura en lugar de a producto']
        ] },
        { t: 'h', c: 'Qué se compara exactamente' },
        { t: 'p', c: 'Una comparación honesta enfrenta el **coste anual completo on-premises** (no solo el precio del servidor) con el **gasto anual en AWS**, al que se suman los costes de migración y formación. El resultado se expresa habitualmente como ahorro porcentual y periodo de retorno.' },
        { t: 'tabla', cab: ['Concepto', 'On-premises (anual)', 'AWS (anual)'], filas: [
          ['Servidores y hardware', '180.000 €', '0 €'],
          ['Licencias y soporte', '60.000 €', 'Incluidas en los servicios gestionados'],
          ['Instalaciones y energía', '75.000 €', '0 €'],
          ['Personal de operación', '150.000 €', '45.000 € (menos tareas de infraestructura)'],
          ['Consumo de nube', '0 €', '210.000 €'],
          ['Total', '465.000 €', '255.000 €']
        ] },
        { t: 'nota', clase: 'dato', titulo: 'Lectura del ejemplo', c: 'El ahorro del 45 % no viene de que la nube sea «mágicamente barata», sino de eliminar hardware, instalaciones y parte del personal, y de sustituir inversión por consumo.' },
        { t: 'h', c: 'Herramientas de estimación' },
        { t: 'tabla', cab: ['Herramienta', 'Para qué sirve'], filas: [
          ['AWS Pricing Calculator', 'Estimar el coste mensual de una arquitectura concreta y comparar configuraciones. Genera un enlace compartible.'],
          ['AWS Migration Evaluator', 'Analizar el inventario local (mediante un recopilador) y generar un caso de negocio de migración.'],
          ['AWS Cost Explorer', 'Analizar el gasto real ya incurrido por servicio, cuenta o etiqueta.'],
          ['AWS Compute Optimizer', 'Recomendar tipos de instancia y volúmenes más ajustados al uso real.'],
          ['Herramienta de TCO de AWS', 'Plantilla oficial para construir el caso de negocio completo.']
        ] },
        { t: 'h', c: 'Factores cualitativos del TCO' },
        { t: 'ul', c: [
          '**Agilidad:** reducir de semanas a minutos el tiempo para probar una idea tiene un valor que no aparece en la hoja de cálculo.',
          '**Riesgo:** eliminar el riesgo de quedarse sin capacidad o de un fallo eléctrico.',
          '**Escalabilidad:** no pagar por capacidad ociosa ni quedarse corto en el pico.',
          '**Sostenibilidad:** menor consumo energético al compartir infraestructura y aprovechar la eficiencia de escala.'
        ] }
      ],
      terminos: [
        { t: 'TCO', d: 'Coste total de propiedad: suma de todos los costes de un activo durante su vida útil.' },
        { t: 'AWS Pricing Calculator', d: 'Herramienta web para estimar el coste de una arquitectura antes de desplegarla.' },
        { t: 'Migration Evaluator', d: 'Servicio que analiza el inventario local y genera un caso de negocio de migración.' },
        { t: 'Coste de oportunidad', d: 'Valor de lo que se deja de hacer por dedicar recursos a otra actividad.' }
      ],
      quiz: [
        { p: 'Al comparar el TCO de un centro de datos propio con AWS, ¿qué coste se olvida con más frecuencia?', op: ['El precio de los servidores', 'La energía y la refrigeración', 'Las licencias de software', 'El salario de los administradores'], ok: 1, e: 'La energía y la refrigeración suponen una partida enorme y muy subestimada en las comparaciones de TCO.' },
        { p: '¿Qué herramienta se utiliza para estimar el coste mensual de una arquitectura antes de crearla?', op: ['AWS Cost Explorer', 'AWS Pricing Calculator', 'AWS Budgets', 'AWS Trusted Advisor'], ok: 1, e: 'Pricing Calculator estima el coste futuro de una arquitectura. Cost Explorer analiza gasto ya realizado.' },
        { p: 'El TCO debe incluir también…', op: ['Solo los costes de hardware', 'Solo el coste de la factura de AWS', 'Costes de personal, instalaciones, energía y oportunidad', 'Únicamente las licencias de software'], ok: 2, e: 'El TCO es integral: hardware, software, instalaciones, energía, personal, mantenimiento y coste de oportunidad.' }
      ]
    },
    {
      id: 'm2s3',
      titulo: 'AWS Organizations',
      resumen: 'AWS Organizations permite gestionar muchas cuentas de AWS como una sola, con facturación consolidada, unidades organizativas y políticas de control de servicios.',
      objetivos: [
        'Explicar qué es una unidad organizativa y para qué sirve.',
        'Describir las ventajas de la facturación consolidada.',
        'Diferenciar las políticas de control de servicios (SCP) de las políticas de IAM.'
      ],
      bloques: [
        { t: 'p', c: 'Cuando una organización crece, una sola cuenta de AWS deja de ser suficiente: conviene separar entornos (producción, desarrollo, auditoría) y equipos. **AWS Organizations** permite agrupar y gobernar muchas cuentas con una jerarquía y reglas comunes. El servicio no tiene coste adicional.' },
        { t: 'h', c: 'Estructura' },
        { t: 'esquema', c: [
          { titulo: 'Cuenta de gestión', sub: 'Antes «cuenta maestra»' },
          { titulo: 'Unidades organizativas', sub: 'Producción · Desarrollo · Seguridad' },
          { titulo: 'Cuentas miembro', sub: 'Una por equipo o entorno' }
        ] },
        { t: 'ul', c: [
          '**Cuenta de gestión:** crea la organización e invita o crea cuentas; puede designar administradores delegados para servicios concretos.',
          '**Unidad organizativa (OU):** agrupación lógica de cuentas a la que se aplican políticas. Las OUs pueden anidarse.',
          '**Cuentas miembro:** cuentas independientes que pertenecen a la organización.',
          '**Cuenta raíz de la organización:** el nodo superior; las políticas aplicadas aquí afectan a todo.'
        ] },
        { t: 'h', c: 'Ventajas principales' },
        { t: 'ul', c: [
          '**Facturación consolidada:** una sola factura para todas las cuentas y agregación del uso, lo que permite alcanzar antes los niveles de descuento por volumen.',
          '**Compartir descuentos:** las instancias reservadas y los Savings Plans sin usar en una cuenta se aplican a las demás.',
          '**Gobernanza centralizada:** políticas de control de servicios, etiquetado obligatorio y registro común.',
          '**Automatización:** creación de cuentas mediante AWS Control Tower y aprovisionamiento con cuentas de servicio.'
        ] },
        { t: 'h', c: 'Políticas de control de servicios (SCP)' },
        { t: 'p', c: 'Una **SCP** define el conjunto máximo de permisos que pueden tener las cuentas de una OU. **No conceden permisos**: solo los limitan. Si una SCP niega el acceso a un servicio, ni siquiera el administrador de esa cuenta podrá usarlo.' },
        { t: 'nota', clase: 'examen', titulo: 'IAM frente a SCP', c: 'IAM concede y limita permisos dentro de una cuenta (usuarios, grupos, roles). Las SCP limitan lo que las cuentas pueden hacer y se aplican **por encima** de IAM. La cuenta de gestión no se ve afectada por las SCP.' },
        { t: 'h', c: 'Otras políticas y funciones' },
        { t: 'tabla', cab: ['Función', 'Descripción'], filas: [
          ['Políticas de etiquetas', 'Obligan a usar etiquetas normalizadas en los recursos de toda la organización.'],
          ['Políticas de copia de seguridad', 'Aplican planes de AWS Backup de forma centralizada.'],
          ['Acceso entre cuentas', 'Se implementa asumiendo roles con AWS STS, no compartiendo credenciales.'],
          ['AWS Control Tower', 'Orquesta Organizations, IAM Identity Center y CloudTrail para crear una «landing zone» con buenas prácticas.'],
          ['Servicios integrados', 'CloudTrail, GuardDuty, Security Hub, Config y Backup permiten administración delegada.'],
          ['Transferencia de cuentas', 'Se pueden mover cuentas entre organizaciones mediante invitaciones.']
        ] },
        { t: 'h', c: 'Estrategia recomendada de OUs' },
        { t: 'p', c: 'Una separación habitual distingue **infraestructura** (red, registro, seguridad), **cargas de trabajo** (producción, preproducción, desarrollo) y **entornos aislados** (experimentación, sandbox). Cada OU aplica SCP distintas: por ejemplo, prohibir el uso de regiones no aprobadas o impedir la eliminación de registros de CloudTrail.' }
      ],
      terminos: [
        { t: 'AWS Organizations', d: 'Servicio gratuito para gestionar y gobernar varias cuentas de AWS de forma centralizada.' },
        { t: 'Unidad organizativa (OU)', d: 'Agrupación de cuentas dentro de Organizations a la que se aplican políticas.' },
        { t: 'SCP', d: 'Política que define el límite máximo de permisos disponibles en las cuentas de una OU.' },
        { t: 'Facturación consolidada', d: 'Una única factura y uso agregado para todas las cuentas de la organización.' },
        { t: 'Control Tower', d: 'Servicio que configura y mantiene una landing zone multi-cuenta con buenas prácticas.' }
      ],
      quiz: [
        { p: '¿Cuál es el efecto de una política de control de servicios (SCP)?', op: ['Concede permisos a los usuarios de una OU', 'Define el límite máximo de permisos de las cuentas de una OU', 'Sustituye a las políticas de IAM', 'Cifra los datos de las cuentas de la organización'], ok: 1, e: 'Las SCP no conceden permisos: establecen el máximo permitido. IAM sigue siendo necesario para conceder accesos concretos.' },
        { p: '¿Qué ventaja aporta la facturación consolidada?', op: ['Elimina por completo el coste de AWS', 'Agrega el uso de todas las cuentas y comparte descuentos por volumen', 'Permite usar la cuenta raíz sin MFA', 'Sustituye a AWS Budgets'], ok: 1, e: 'Al sumar el uso de todas las cuentas se alcanzan antes los tramos de descuento y se comparten instancias reservadas y Savings Plans.' },
        { p: 'Una empresa quiere impedir que ninguna cuenta pueda usar regiones distintas de Europa. ¿Qué debe usar?', op: ['Un grupo de IAM', 'Una SCP en la OU correspondiente', 'Una política de bucket de S3', 'Un grupo de seguridad de VPC'], ok: 1, e: 'Una SCP que deniegue las acciones fuera de las regiones permitidas se aplica a todas las cuentas de la OU.' }
      ]
    },
    {
      id: 'm2s4',
      titulo: 'Administración de costos y facturación de AWS',
      resumen: 'AWS ofrece un conjunto de herramientas para ver, prever, presupuestar y optimizar el gasto: Cost Explorer, Budgets, informes de uso, etiquetas de asignación de costes y Control Tower.',
      objetivos: [
        'Distinguir las herramientas de visibilidad, previsión y control del gasto.',
        'Explicar las etiquetas de asignación de costes y su utilidad.',
        'Configurar un presupuesto y una alarma de facturación básicos.'
      ],
      bloques: [
        { t: 'p', c: 'Una de las críticas más habituales a la nube es la falta de previsibilidad del gasto. AWS responde con un conjunto de herramientas que cubren todo el ciclo: **estimar antes, ver después, presupuestar y optimizar**.' },
        { t: 'h', c: 'Herramientas principales' },
        { t: 'tabla', cab: ['Herramienta', 'Qué hace', 'Cuándo usarla'], filas: [
          ['AWS Cost Explorer', 'Visualiza el gasto histórico y las previsiones por servicio, cuenta, región o etiqueta. Incluye recomendaciones de Savings Plans.', 'Análisis mensual y detección de tendencias'],
          ['AWS Budgets', 'Fija presupuestos de coste, uso o utilización y envía alertas o ejecuta acciones al superarlos.', 'Control proactivo del gasto'],
          ['AWS Cost and Usage Report (CUR)', 'Informe detallado, a nivel de recurso, entregado en S3 y consultable con Athena.', 'Análisis fino y facturación interna (showback)'],
          ['AWS Cost Anomaly Detection', 'Detecta patrones de gasto anómalos mediante machine learning y avisa.', 'Evitar sorpresas por errores de configuración'],
          ['AWS Pricing Calculator', 'Estima el coste de una arquitectura futura.', 'Antes de desplegar'],
          ['Etiquetas de asignación de costes', 'Clasifican el gasto por proyecto, centro de coste o propietario.', 'Reparto interno de costes'],
          ['AWS Cost Categories', 'Agrupan cuentas, etiquetas y servicios en categorías de negocio.', 'Reporting ejecutivo'],
          ['AWS Compute Optimizer', 'Recomienda tamaños de instancia y volúmenes adecuados al uso real.', 'Optimización continua']
        ] },
        { t: 'h', c: 'Etiquetas: la base del reparto de costes' },
        { t: 'p', c: 'Una **etiqueta** es un par clave-valor que se asigna a un recurso, por ejemplo `Proyecto = TiendaOnline` o `Entorno = Produccion`. Las etiquetas deben **activarse como etiquetas de asignación de costes** en la consola de facturación para que aparezcan en los informes. Sin una estrategia de etiquetado, es imposible saber qué equipo consume qué.' },
        { t: 'nota', clase: 'tip', titulo: 'Buenas prácticas de etiquetado', c: 'Define un conjunto obligatorio de etiquetas (propietario, entorno, proyecto, centro de coste), aplícalo con SCP y políticas de etiquetas de Organizations y automatízalo con CloudFormation o AWS Config.' },
        { t: 'h', c: 'Presupuestos y alarmas' },
        { t: 'ol', c: [
          'Entra en **AWS Budgets** y crea un presupuesto de coste mensual con el importe previsto.',
          'Configura una alerta al 80 % del presupuesto (y otra al 100 %) enviada por correo o a un tema de SNS.',
          'Opcionalmente, define una **acción** automática: aplicar una SCP que bloquee la creación de recursos o detener instancias.',
          'Revisa el presupuesto cada mes y ajústalo según la estacionalidad del negocio.'
        ] },
        { t: 'p', c: 'Además, existe una **alarma de facturación** clásica basada en la métrica `EstimatedCharges` de Amazon CloudWatch, útil como red de seguridad, aunque AWS recomienda AWS Budgets por su mayor flexibilidad.' },
        { t: 'h', c: 'Facturación consolidada y reparto interno' },
        { t: 'p', c: 'Con AWS Organizations, la cuenta de gestión recibe una única factura. Para repercutir el gasto a cada equipo se combinan **etiquetas de asignación de costes**, **cost categories** y el **CUR** consultado con Amazon Athena. Algunas organizaciones añaden un margen interno o reparten los costes compartidos (red, registro, seguridad) de forma proporcional.' },
        { t: 'h', c: 'Optimización: palancas habituales' },
        { t: 'ul', c: [
          'Apagar los recursos que no se usan (instancias de desarrollo fuera de horario, entornos de prueba).',
          'Elegir el tamaño adecuado de instancia con Compute Optimizer y Trusted Advisor.',
          'Usar Savings Plans y Spot donde la carga lo permita.',
          'Aplicar políticas de ciclo de vida en S3 y EBS para mover o borrar datos antiguos.',
          'Revisar la arquitectura de red: el tráfico entre zonas y el NAT Gateway pueden dominar la factura.',
          'Diseñar sin servidor (Lambda, Fargate) para cargas intermitentes.'
        ] }
      ],
      terminos: [
        { t: 'AWS Cost Explorer', d: 'Herramienta de visualización y previsión del gasto con filtros por servicio, cuenta o etiqueta.' },
        { t: 'AWS Budgets', d: 'Permite fijar presupuestos y recibir alertas o ejecutar acciones al superarlos.' },
        { t: 'CUR', d: 'Cost and Usage Report: informe detallado de uso y coste entregado en S3.' },
        { t: 'Etiqueta de asignación de costes', d: 'Par clave-valor activado para clasificar el gasto en los informes de facturación.' },
        { t: 'Cost Anomaly Detection', d: 'Detección automática de picos de gasto anómalos mediante machine learning.' }
      ],
      quiz: [
        { p: 'Necesitas recibir un aviso cuando el gasto mensual supere los 500 USD. ¿Qué servicio usarías?', op: ['AWS Budgets', 'AWS Cost and Usage Report', 'AWS Trusted Advisor', 'Amazon CloudFront'], ok: 0, e: 'AWS Budgets permite definir un umbral y enviar alertas (o ejecutar acciones) al acercarse o superarse.' },
        { p: '¿Para qué sirven las etiquetas de asignación de costes?', op: ['Para cifrar los recursos', 'Para clasificar y repartir el gasto por proyecto o centro de coste', 'Para acelerar la red', 'Para aumentar la durabilidad de S3'], ok: 1, e: 'Las etiquetas de asignación de costes permiten agrupar y analizar el gasto por criterios de negocio.' },
        { p: '¿Qué herramienta ofrece un informe detallado a nivel de recurso, entregado en Amazon S3?', op: ['AWS Cost Explorer', 'AWS Budgets', 'AWS Cost and Usage Report', 'AWS Pricing Calculator'], ok: 2, e: 'El CUR es el informe más granular y se entrega en un bucket de S3 para su análisis con Athena u otras herramientas.' }
      ]
    },
    {
      id: 'm2s5',
      titulo: 'Soporte técnico',
      resumen: 'AWS ofrece cinco planes de soporte —Basic, Developer, Business, Enterprise On-Ramp y Enterprise— que se diferencian por canales, tiempos de respuesta, acceso a TAM y comprobaciones de Trusted Advisor.',
      objetivos: [
        'Comparar los planes de soporte y sus tiempos de respuesta.',
        'Identificar qué plan necesita una carga de producción.',
        'Reconocer el papel del Technical Account Manager y del Concierge.'
      ],
      bloques: [
        { t: 'p', c: 'El soporte de AWS se contrata aparte de los servicios. Elegir el plan adecuado es una decisión de negocio: no es lo mismo un entorno de pruebas que un sistema que factura cada minuto.' },
        { t: 'h', c: 'Comparativa de planes' },
        { t: 'tabla', cab: ['Plan', 'Coste', 'Canales', 'Tiempo de respuesta', 'Extras'], filas: [
          ['Basic', 'Gratuito', 'Documentación, foros, centro de soporte para facturación', 'Sin soporte técnico', '7 comprobaciones básicas de Trusted Advisor, Personal Health Dashboard'],
          ['Developer', 'Desde 29 USD/mes o 3 % del uso', 'Correo en horario laboral', 'Orientación general < 24 h; sistema degradado < 12 h', '1 contacto principal, 7 comprobaciones de Trusted Advisor'],
          ['Business', 'Desde 100 USD/mes o 3-10 % del uso', 'Teléfono, chat y correo 24/7', 'Producción caída < 1 h; producción degradada < 4 h', 'Todas las comprobaciones de Trusted Advisor, Support API, soporte de software de terceros'],
          ['Enterprise On-Ramp', 'Desde 5.500 USD/mes', 'Teléfono, chat y correo 24/7', 'Crítico para el negocio caído < 30 min', 'Grupo de TAM, equipo Concierge, revisión Well-Architected anual'],
          ['Enterprise', 'Desde 15.000 USD/mes', 'Teléfono, chat y correo 24/7', 'Crítico para el negocio caído < 15 min', 'TAM dedicado, Concierge, IEM, formación y revisión arquitectónica proactiva']
        ] },
        { t: 'nota', clase: 'examen', titulo: 'Regla práctica', c: 'Producción con usuarios reales → **Business como mínimo**. Necesidad de un TAM y respuesta en minutos → **Enterprise On-Ramp o Enterprise**. Desarrollo y pruebas → **Developer**.' },
        { t: 'h', c: 'Elementos clave del soporte' },
        { t: 'ul', c: [
          '**AWS Trusted Advisor:** evalúa la cuenta en cinco categorías (optimización de costes, seguridad, tolerancia a fallos, eficiencia del rendimiento y límites de servicio) y propone acciones.',
          '**Technical Account Manager (TAM):** ingeniero asignado que conoce la arquitectura del cliente y ayuda en la planificación, no solo en incidentes.',
          '**Concierge Support Team:** atención especializada en facturación y consultas de cuenta (Enterprise On-Ramp y Enterprise).',
          '**Infrastructure Event Management (IEM):** acompañamiento durante lanzamientos o migraciones de alto impacto. Incluido en Enterprise; opcional de pago en Business.',
          '**AWS Support API:** permite crear y gestionar casos por programación (Business y superiores).',
          '**AWS Health / Personal Health Dashboard:** notificaciones personalizadas sobre eventos que afectan a tus recursos.'
        ] },
        { t: 'h', c: 'Cómo abrir un caso útil' },
        { t: 'ol', c: [
          'Clasifica la severidad correctamente: no marques todo como «producción caída».',
          'Describe el impacto en el negocio y el momento en que empezó.',
          'Adjunta identificadores de recurso, mensajes de error y los pasos ya intentados.',
          'Indica la región y la zona de disponibilidad afectadas.',
          'Mantén actualizado el caso con los avances y la hipótesis actual.'
        ] },
        { t: 'h', c: 'Soporte dentro de AWS Academy' },
        { t: 'p', c: 'El laboratorio de AWS Academy **no incluye soporte técnico de AWS**. Las dudas se resuelven con el material del curso y con el instructor. No se deben abrir casos de soporte desde una cuenta de laboratorio.' }
      ],
      terminos: [
        { t: 'AWS Support', d: 'Conjunto de planes de soporte técnico y de cuenta con distintos niveles de servicio.' },
        { t: 'TAM', d: 'Technical Account Manager: ingeniero de AWS asignado a la cuenta del cliente.' },
        { t: 'Trusted Advisor', d: 'Servicio que audita la cuenta y ofrece recomendaciones en cinco categorías.' },
        { t: 'IEM', d: 'Infrastructure Event Management: apoyo durante eventos de alto impacto.' },
        { t: 'Severidad', d: 'Clasificación del impacto de un caso que determina el tiempo de respuesta objetivo.' }
      ],
      quiz: [
        { p: 'Una empresa ejecuta una aplicación de producción con clientes 24/7 y necesita soporte telefónico con respuesta en una hora ante una caída. ¿Qué plan mínimo cumple?', op: ['Basic', 'Developer', 'Business', 'Enterprise On-Ramp'], ok: 2, e: 'Business es el primer plan con soporte 24/7 por teléfono y respuesta en una hora para producción caída.' },
        { p: '¿Qué incluye el plan Enterprise pero no el Business?', op: ['Acceso a la documentación', 'Un Technical Account Manager dedicado', 'Soporte por correo', 'La consola de AWS'], ok: 1, e: 'El TAM dedicado es exclusivo de Enterprise; Enterprise On-Ramp ofrece un grupo de TAM compartido.' },
        { p: '¿Cuál es el plan de soporte gratuito que incluye comprobaciones básicas de Trusted Advisor?', op: ['Basic', 'Developer', 'Business', 'Enterprise'], ok: 0, e: 'Basic es gratuito e incluye las 7 comprobaciones básicas de Trusted Advisor y el Personal Health Dashboard.' }
      ]
    }
  ]
});
