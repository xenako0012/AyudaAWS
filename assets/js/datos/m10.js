/* Módulo 10 · Monitoreo y escalado automático */
(window.MODULOS = window.MODULOS || []).push({
  id: 'm10',
  numero: 10,
  titulo: 'Monitoreo y escalado automático',
  descripcion: 'Distribución de tráfico con Elastic Load Balancing, observabilidad con Amazon CloudWatch y ajuste automático de capacidad con Amazon EC2 Auto Scaling.',
  duracion: '100 min',
  objetivo: 'Diseñar una arquitectura elástica y observable combinando balanceadores, métricas, alarmas y escalado automático.',
  secciones: [
    {
      id: 'm10s1',
      titulo: 'Elastic Load Balancing',
      resumen: 'Elastic Load Balancing distribuye el tráfico entrante entre varios destinos, comprueba su salud y permite escalar y recuperarse de fallos sin intervención manual.',
      objetivos: [
        'Explicar la función de un balanceador de carga y sus componentes.',
        'Diferenciar Application, Network y Gateway Load Balancer.',
        'Configurar comprobaciones de salud y grupos de destino.'
      ],
      bloques: [
        { t: 'p', c: '**Elastic Load Balancing (ELB)** distribuye automáticamente el tráfico entrante entre varios destinos —instancias EC2, contenedores, funciones Lambda o direcciones IP— en una o varias zonas de disponibilidad. Es una pieza clave de la alta disponibilidad: si un destino falla, el tráfico se redirige a los sanos.' },
        { t: 'h', c: 'Componentes' },
        { t: 'tabla', cab: ['Componente', 'Función'], filas: [
          ['Listener', 'Puerto y protocolo en los que el balanceador escucha (por ejemplo HTTPS 443)'],
          ['Reglas', 'Deciden a qué grupo de destino enviar cada petición según ruta, host o cabeceras'],
          ['Grupo de destino (target group)', 'Conjunto de destinos registrados y su comprobación de salud'],
          ['Health check', 'Comprobación periódica que determina si un destino está sano'],
          ['Nodo del balanceador', 'Cada balanceador se despliega en varias subredes de distintas AZ']
        ] },
        { t: 'esquema', c: [
          { titulo: 'Cliente', sub: 'Internet' },
          { titulo: 'Balanceador', sub: 'Multi-AZ' },
          { titulo: 'Destinos', sub: 'Instancias sanas' }
        ] },
        { t: 'h', c: 'Tipos de balanceador' },
        { t: 'tabla', cab: ['Tipo', 'Capa', 'Protocolos', 'Ideal para'], filas: [
          ['Application Load Balancer (ALB)', 'Capa 7 (aplicación)', 'HTTP, HTTPS, gRPC, WebSocket', 'Aplicaciones web, microservicios, enrutamiento por ruta o host'],
          ['Network Load Balancer (NLB)', 'Capa 4 (transporte)', 'TCP, UDP, TLS', 'Rendimiento extremo, IP fija, tráfico no HTTP'],
          ['Gateway Load Balancer (GWLB)', 'Capa 3 (red)', 'IP', 'Aparatos virtuales de red (firewalls, inspección)'],
          ['Classic Load Balancer (CLB)', 'Capa 4 y 7', 'HTTP, HTTPS, TCP', 'Legado; no se recomienda para nuevas arquitecturas']
        ] },
        { t: 'nota', clase: 'examen', titulo: 'Asociación rápida', c: '**ALB** = contenido HTTP/HTTPS y enrutamiento avanzado. **NLB** = TCP/UDP de altísimo rendimiento con IP estática. **GWLB** = appliances de inspección. **CLB** = antiguo.' },
        { t: 'h', c: 'Comprobaciones de salud' },
        { t: 'p', c: 'El balanceador envía peticiones periódicas a un endpoint de cada destino (por ejemplo `/health`). Si la respuesta no cumple el código y el tiempo esperados, el destino se marca como **no sano** y deja de recibir tráfico. Cuando vuelve a responder, se reincorpora. Esto permite sustituir instancias defectuosas automáticamente con Auto Scaling.' },
        { t: 'h', c: 'Funciones destacadas' },
        { t: 'ul', c: [
          '**Terminación SSL/TLS** con certificados de AWS Certificate Manager.',
          '**Sticky sessions** para mantener la afinidad de un usuario con un destino.',
          '**Balanceo entre zonas (cross-zone)** para repartir el tráfico entre todas las AZ.',
          '**Integración con AWS WAF** en ALB para filtrar peticiones maliciosas.',
          '**Autenticación de usuarios** con Cognito u OIDC directamente en el ALB.',
          '**Despliegues blue/green** con dos grupos de destino y conmutación de reglas.',
          '**Acceso a registros** en S3 o CloudWatch para análisis.'
        ] },
        { t: 'h', c: 'Buenas prácticas' },
        { t: 'ol', c: [
          'Desplegar el balanceador en **al menos dos subredes públicas** de distintas AZ.',
          'Colocar los destinos en **subredes privadas**; solo el balanceador se expone.',
          'Configurar **health checks** específicos de la aplicación, no solo el puerto.',
          'Eliminar los balanceadores no usados: se facturan por hora y por capacidad.',
          'Habilitar **access logs** y alarmas de latencia y errores 5xx.',
          'Usar **ALB** para enrutar por ruta (`/api`, `/img`) a distintos servicios.'
        ] }
      ],
      terminos: [
        { t: 'ELB', d: 'Servicio gestionado que distribuye tráfico entre varios destinos.' },
        { t: 'Grupo de destino', d: 'Conjunto de destinos registrados con su comprobación de salud.' },
        { t: 'Health check', d: 'Comprobación periódica del estado de un destino.' },
        { t: 'ALB', d: 'Balanceador de capa 7 para HTTP/HTTPS con enrutamiento avanzado.' },
        { t: 'NLB', d: 'Balanceador de capa 4 para TCP/UDP de alto rendimiento.' },
        { t: 'Sticky session', d: 'Afinidad que mantiene las peticiones de un cliente en el mismo destino.' }
      ],
      quiz: [
        { p: '¿Qué tipo de balanceador permite enrutar por ruta de URL y admite HTTP/HTTPS?', op: ['Network Load Balancer', 'Application Load Balancer', 'Gateway Load Balancer', 'Classic Load Balancer'], ok: 1, e: 'El ALB opera en capa 7 y permite reglas por ruta, host o cabeceras.' },
        { p: '¿Qué ocurre cuando una comprobación de salud marca un destino como no sano?', op: ['Se elimina la instancia', 'El balanceador deja de enviarle tráfico', 'Se reinicia el balanceador', 'Se duplica la instancia'], ok: 1, e: 'El balanceador retira el destino del reparto hasta que vuelve a responder correctamente.' },
        { p: '¿Qué balanceador es más adecuado para tráfico TCP de altísimo rendimiento con IP fija?', op: ['ALB', 'NLB', 'CLB', 'Gateway Load Balancer'], ok: 1, e: 'El Network Load Balancer trabaja en capa 4, soporta millones de peticiones por segundo y ofrece IP estática.' }
      ]
    },
    {
      id: 'm10s2',
      titulo: 'Amazon CloudWatch',
      resumen: 'Amazon CloudWatch recopila métricas, registros y eventos de los recursos de AWS y de las aplicaciones, permite crear alarmas y ofrece paneles para observar el sistema en tiempo real.',
      objetivos: [
        'Diferenciar métricas, registros, alarmas y paneles.',
        'Explicar el funcionamiento de las alarmas y sus acciones.',
        'Conocer las herramientas de observabilidad complementarias.'
      ],
      bloques: [
        { t: 'p', c: '**Amazon CloudWatch** es el servicio de **observabilidad** de AWS. Recoge **métricas**, **registros** y **eventos**, los visualiza en paneles y permite actuar automáticamente cuando algo se sale de lo normal. Es la base para saber si el sistema está sano.' },
        { t: 'h', c: 'Los cuatro pilares de CloudWatch' },
        { t: 'tabla', cab: ['Elemento', 'Qué es', 'Ejemplo'], filas: [
          ['Métricas', 'Series temporales de valores numéricos organizadas en espacios de nombres', 'CPUUtilization de una instancia EC2'],
          ['Registros (Logs)', 'Texto de eventos enviado por servicios y aplicaciones', 'Registros de un servidor web en un grupo de registros'],
          ['Alarmas', 'Reglas que vigilan una métrica y cambian de estado', 'Alarma si la latencia p95 supera 2 segundos'],
          ['Paneles (Dashboards)', 'Vistas personalizadas con varios widgets', 'Panel de producción con CPU, errores y latencia']
        ] },
        { t: 'h', c: 'Métricas' },
        { t: 'ul', c: [
          'Cada métrica se identifica por **espacio de nombres**, **nombre** y **dimensiones** (por ejemplo, ID de instancia).',
          'Las métricas básicas de EC2 se publican cada **5 minutos**; las **detalladas**, cada **1 minuto** (con coste adicional).',
          'Se pueden publicar **métricas personalizadas** desde la aplicación con la API `PutMetricData`.',
          'La retención depende del periodo: 1 minuto durante 15 días, 5 minutos durante 63 días, 1 hora durante 455 días.',
          '**CloudWatch Agent** recopila métricas del sistema operativo (memoria, disco) que AWS no ve por defecto.',
          '**Metric Insights** permite consultar métricas con un lenguaje tipo SQL.'
        ] },
        { t: 'nota', clase: 'examen', titulo: 'Memoria y disco', c: 'CloudWatch **no** ve por defecto el uso de memoria ni de disco del sistema operativo: para eso hay que instalar el **CloudWatch Agent** dentro de la instancia.' },
        { t: 'h', c: 'Alarmas' },
        { t: 'p', c: 'Una alarma evalúa una métrica frente a un umbral durante un número de periodos y cambia entre estados **OK**, **ALARM** e **INSUFFICIENT_DATA**. Admite acciones como:' },
        { t: 'ul', c: [
          'Enviar una notificación a un tema de **Amazon SNS** (correo, SMS, webhook).',
          '**Escalar** un grupo de Auto Scaling (añadir o quitar instancias).',
          'Detener, reiniciar o terminar una instancia EC2.',
          'Invocar una función **Lambda** o ejecutar un **SSM Automation**.',
          'Crear una entrada en **EventBridge** para orquestar una respuesta.'
        ] },
        { t: 'h', c: 'Registros' },
        { t: 'ul', c: [
          '**Grupo de registros:** contenedor de flujos con la misma política de retención.',
          '**Flujo de registros:** secuencia de eventos de una fuente concreta.',
          '**Logs Insights:** consultas interactivas sobre los registros.',
          '**Exportación:** a S3 o a Amazon OpenSearch para análisis a largo plazo.',
          '**Suscripciones:** envío en tiempo real a Lambda, Kinesis o Firehose.',
          '**Retención:** hay que configurarla; por defecto los registros se conservan indefinidamente.'
        ] },
        { t: 'h', c: 'Eventos y automatización' },
        { t: 'p', c: '**Amazon EventBridge** (antes CloudWatch Events) permite reaccionar a cambios de estado: una instancia que pasa a `stopped`, un objeto creado en S3, una tarea programada o un evento propio de la aplicación. Es el pegamento entre servicios para automatizar respuestas.' },
        { t: 'h', c: 'Observabilidad avanzada' },
        { t: 'tabla', cab: ['Herramienta', 'Función'], filas: [
          ['AWS X-Ray', 'Traza peticiones a través de microservicios y muestra dónde se pierde tiempo'],
          ['CloudWatch Application Insights', 'Detecta problemas en aplicaciones .NET y Java'],
          ['CloudWatch Synthetics', 'Canarios que simulan usuarios y comprueban endpoints periódicamente'],
          ['ServiceLens', 'Combina trazas, métricas y registros en una sola vista'],
          ['CloudWatch RUM', 'Monitorización real de usuarios en el navegador'],
          ['AWS Health', 'Eventos de servicio que afectan a la cuenta']
        ] },
        { t: 'nota', clase: 'tip', titulo: 'Alarmas útiles', c: 'Vigila al menos: errores 5xx del balanceador, latencia p95, CPU media del grupo de Auto Scaling, conexiones de base de datos, edad del mensaje más antiguo en SQS y gasto estimado.' }
      ],
      terminos: [
        { t: 'CloudWatch', d: 'Servicio de observabilidad de métricas, registros, alarmas y paneles.' },
        { t: 'Métrica', d: 'Serie temporal de valores numéricos sobre un recurso o aplicación.' },
        { t: 'Dimensión', d: 'Atributo que identifica una métrica, como el ID de instancia.' },
        { t: 'Alarma', d: 'Regla que evalúa una métrica y ejecuta acciones al superar un umbral.' },
        { t: 'Logs Insights', d: 'Herramienta de consulta interactiva sobre registros de CloudWatch.' },
        { t: 'EventBridge', d: 'Bus de eventos que permite reaccionar a cambios y programar tareas.' }
      ],
      quiz: [
        { p: '¿Qué se necesita para monitorizar el uso de memoria de una instancia EC2 con CloudWatch?', op: ['Activar los registros de VPC', 'Instalar el CloudWatch Agent en la instancia', 'Crear un grupo de seguridad', 'Usar CloudWatch Synthetics'], ok: 1, e: 'Las métricas de memoria y disco del sistema operativo requieren el CloudWatch Agent, porque el hipervisor no las expone.' },
        { p: '¿Qué acción puede ejecutar una alarma de CloudWatch?', op: ['Crear una VPC', 'Escalar un grupo de Auto Scaling', 'Modificar una política de IAM', 'Instalar un sistema operativo'], ok: 1, e: 'Las alarmas pueden notificar por SNS, escalar Auto Scaling, detener instancias, invocar Lambda y más.' },
        { p: '¿Qué servicio permite reaccionar a eventos como «una instancia se ha detenido»?', op: ['Amazon EventBridge', 'AWS Artifact', 'Amazon Macie', 'AWS Config'], ok: 0, e: 'EventBridge conecta eventos de servicios con destinos como Lambda, SNS o Step Functions.' }
      ]
    },
    {
      id: 'm10s3',
      titulo: 'Amazon EC2 Auto Scaling',
      resumen: 'Amazon EC2 Auto Scaling mantiene el número deseado de instancias, sustituye las que fallan y ajusta la capacidad automáticamente con políticas dinámicas, programadas o predictivas.',
      objetivos: [
        'Explicar el funcionamiento de un grupo de Auto Scaling.',
        'Comparar las políticas de escalado.',
        'Aplicar buenas prácticas de elasticidad y tolerancia a fallos.'
      ],
      bloques: [
        { t: 'p', c: '**Amazon EC2 Auto Scaling** garantiza que haya siempre el número de instancias adecuado para atender la carga. No solo añade capacidad cuando sube el tráfico: también **sustituye instancias que fallan** y reduce la capacidad cuando baja la demanda, lo que ahorra dinero.' },
        { t: 'h', c: 'Cómo funciona' },
        { t: 'esquema', c: [
          { titulo: 'Plantilla de lanzamiento', sub: 'AMI, tipo, red, user data' },
          { titulo: 'Grupo de Auto Scaling', sub: 'Mínimo · deseado · máximo' },
          { titulo: 'Políticas y métricas', sub: 'CloudWatch + balanceador' }
        ] },
        { t: 'ul', c: [
          '**Plantilla de lanzamiento:** define la configuración de las instancias (AMI, tipo, grupo de seguridad, datos de usuario, rol de IAM).',
          '**Grupo de Auto Scaling (ASG):** agrupa instancias y define capacidad **mínima**, **deseada** y **máxima**.',
          '**Subredes:** el grupo se distribuye entre varias subredes y zonas de disponibilidad.',
          '**Comprobaciones de salud:** se usan las de EC2 y, opcionalmente, las del balanceador de carga.',
          '**Políticas de escalado:** deciden cuándo y cuánto escalar.'
        ] },
        { t: 'h', c: 'Políticas de escalado' },
        { t: 'tabla', cab: ['Política', 'Funcionamiento', 'Ejemplo'], filas: [
          ['Target tracking', 'Mantiene una métrica en un valor objetivo', 'CPU media al 50 %'],
          ['Step scaling', 'Aplica incrementos distintos según la magnitud de la desviación', 'Si CPU > 80 %, añade 4; si > 60 %, añade 1'],
          ['Simple scaling', 'Una acción por alarma con periodo de espera', 'Añadir 1 instancia y esperar 300 s'],
          ['Scheduled scaling', 'Cambia la capacidad en fechas y horas concretas', 'Escalar a 10 instancias cada lunes a las 8:00'],
          ['Predictive scaling', 'Anticipa la demanda con machine learning', 'Prepararse para el pico diario de las 20:00']
        ] },
        { t: 'nota', clase: 'examen', titulo: 'La más recomendada', c: '**Target tracking** es la política más sencilla y eficaz para la mayoría de los casos: se elige una métrica y un valor objetivo y Auto Scaling hace el resto.' },
        { t: 'h', c: 'Conceptos operativos' },
        { t: 'ul', c: [
          '**Periodo de espera (cooldown):** tiempo tras una acción de escalado para evitar oscilaciones.',
          '**Warm-up:** tiempo que tarda una instancia nueva en estar lista para recibir tráfico.',
          '**Política de terminación:** decide qué instancia se elimina al reducir capacidad (por antigüedad, AZ, etc.).',
          '**Hook de ciclo de vida:** ejecuta acciones antes de que una instancia entre en servicio o se termine.',
          '**Instancias en espera (standby):** se sacan del grupo sin terminarlas, útiles para mantenimiento.',
          '**Flota mixta:** combina tipos de instancia y opciones de compra (Spot y bajo demanda) para mejorar el coste y la disponibilidad.'
        ] },
        { t: 'h', c: 'Ejemplo de diseño elástico' },
        { t: 'ol', c: [
          'Crear una plantilla de lanzamiento con la AMI, el grupo de seguridad y los datos de usuario.',
          'Crear un grupo de Auto Scaling en al menos dos subredes privadas de distintas AZ.',
          'Asociarlo al grupo de destino de un Application Load Balancer.',
          'Activar comprobaciones de salud del balanceador para sustituir instancias defectuosas.',
          'Definir una política de target tracking con CPU al 50 % y un mínimo de 2 instancias.',
          'Añadir escalado programado para los picos conocidos y un presupuesto de gasto.',
          'Monitorizar el grupo con CloudWatch y revisar el coste mensual.'
        ] },
        { t: 'h', c: 'Buenas prácticas' },
        { t: 'ul', c: [
          'Diseñar instancias **sin estado**: sesiones y datos fuera de la instancia.',
          'Usar **varias zonas de disponibilidad** y confiar en el balanceador.',
          'Escalar por métricas de negocio (peticiones por segundo, longitud de cola) y no solo por CPU.',
          'Combinar **Spot** con bajo demanda en flotas mixtas para reducir costes.',
          'Implementar **graceful shutdown** con hooks de ciclo de vida.',
          'Revisar los límites de servicio antes de un pico importante.'
        ] },
        { t: 'nota', clase: 'tip', titulo: 'Elasticidad bien entendida', c: 'Escalar hacia arriba es fácil; lo difícil es **reducir** sin afectar a los usuarios. Las políticas de reducción deben ser más conservadoras que las de crecimiento, y conviene retirar instancias de forma ordenada.' }
      ],
      terminos: [
        { t: 'Auto Scaling', d: 'Servicio que ajusta automáticamente el número de instancias de un grupo.' },
        { t: 'Plantilla de lanzamiento', d: 'Configuración reutilizable para lanzar instancias en un ASG.' },
        { t: 'Capacidad deseada', d: 'Número de instancias que el grupo intenta mantener en cada momento.' },
        { t: 'Target tracking', d: 'Política que mantiene una métrica en un valor objetivo.' },
        { t: 'Cooldown', d: 'Periodo de espera tras una acción de escalado para evitar oscilaciones.' },
        { t: 'Hook de ciclo de vida', d: 'Acción que se ejecuta antes de que una instancia entre o salga de servicio.' }
      ],
      quiz: [
        { p: '¿Qué hace un grupo de Auto Scaling si una instancia falla una comprobación de salud?', op: ['Ignora el fallo', 'La sustituye por una nueva', 'Apaga el balanceador', 'Reduce la capacidad mínima'], ok: 1, e: 'Auto Scaling termina la instancia defectuosa y lanza otra para mantener la capacidad deseada.' },
        { p: '¿Qué política de escalado mantiene una métrica en un valor objetivo, como el 50 % de CPU?', op: ['Step scaling', 'Simple scaling', 'Target tracking', 'Scheduled scaling'], ok: 2, e: 'Target tracking ajusta la capacidad para mantener la métrica en el objetivo definido.' },
        { p: '¿Qué política es adecuada para un pico de tráfico que ocurre todos los días a la misma hora?', op: ['Predictive o scheduled scaling', 'Simple scaling', 'Sin política', 'Terminación manual'], ok: 0, e: 'El escalado programado o predictivo anticipa la demanda conocida y prepara la capacidad antes del pico.' }
      ]
    }
  ]
});
