/* Módulo 1 · Información general sobre los conceptos de la nube */
(window.MODULOS = window.MODULOS || []).push({
  id: 'm1',
  numero: 1,
  titulo: 'Información general sobre los conceptos de la nube',
  descripcion: 'Qué es la informática en la nube, qué ventajas aporta frente al centro de datos propio, cómo nació AWS y cómo se planifica una migración a la nube.',
  duracion: '90 min',
  objetivo: 'Definir la computación en la nube, sus modelos y ventajas, y situar a AWS dentro de ese panorama.',
  secciones: [
    {
      id: 'm1s1',
      titulo: 'Introducción a la informática en la nube',
      resumen: 'La informática en la nube consiste en obtener capacidad de cómputo, almacenamiento y otros recursos como un servicio a través de internet, con pago por uso, en lugar de comprar y mantener servidores propios.',
      objetivos: [
        'Definir la informática en la nube y diferenciarla del modelo tradicional.',
        'Reconocer las cinco características esenciales del modelo según NIST.',
        'Distinguir los modelos IaaS, PaaS y SaaS, y los modelos de despliegue.'
      ],
      bloques: [
        { t: 'p', c: 'Durante décadas, las empresas construían **centros de datos** propios: compraban servidores, los instalaban en salas refrigeradas, contrataban energía redundante y mantenían un equipo humano para operarlo todo. El problema es que el hardware se dimensiona para el pico de demanda y se queda infrautilizado el resto del tiempo. La informática en la nube propone un cambio radical: en lugar de poseer la infraestructura, se **alquila capacidad** a un proveedor y se paga solo por lo que se consume.' },
        { t: 'h', c: 'Una definición útil' },
        { t: 'p', c: 'Se entiende por informática en la nube la **entrega bajo demanda de recursos de TI** —capacidad de cómputo, almacenamiento, bases de datos, redes, software— **a través de internet con un modelo de pago por uso**. El proveedor se encarga de la instalación, el mantenimiento y la seguridad física del hardware; el cliente se concentra en lo que aporta valor a su negocio.' },
        { t: 'nota', clase: 'dato', titulo: 'Definición de referencia', c: 'El NIST define la nube como «un modelo que permite el acceso ubicuo, cómodo y bajo demanda a un conjunto compartido de recursos de cómputo configurables que pueden aprovisionarse y liberarse rápidamente con un esfuerzo mínimo de gestión».' },
        { t: 'h', c: 'Las cinco características esenciales' },
        { t: 'tabla', cab: ['Característica', 'Qué significa en la práctica'], filas: [
          ['Autoservicio bajo demanda', 'El cliente aprovisiona recursos por sí mismo (consola, API o CLI) sin intervención humana del proveedor.'],
          ['Acceso amplio a la red', 'Los recursos están disponibles por internet mediante mecanismos estándar (navegador, API REST, SDK).'],
          ['Agrupación de recursos', 'El proveedor comparte infraestructura entre muchos clientes (multi-tenant) y asigna dinámicamente según la demanda.'],
          ['Elasticidad rápida', 'La capacidad se amplía o reduce casi de inmediato; desde la perspectiva del usuario, los recursos parecen ilimitados.'],
          ['Servicio medido', 'El uso se mide automáticamente y se factura de forma transparente: se paga por consumo real.']
        ] },
        { t: 'h', c: 'Modelos de servicio: IaaS, PaaS y SaaS' },
        { t: 'p', c: 'Los modelos de servicio indican **cuánto gestiona el proveedor y cuánto gestiona el cliente**. Es una de las preguntas más habituales del examen, así que conviene tener clara la frontera.' },
        { t: 'esquema', c: [
          { titulo: 'IaaS', sub: 'Infraestructura como servicio · Amazon EC2' },
          { titulo: 'PaaS', sub: 'Plataforma como servicio · Elastic Beanstalk' },
          { titulo: 'SaaS', sub: 'Software como servicio · Gmail, Salesforce' }
        ] },
        { t: 'tabla', cab: ['Modelo', 'El cliente gestiona', 'El proveedor gestiona', 'Ejemplo'], filas: [
          ['IaaS (infraestructura)', 'Sistema operativo, middleware, aplicaciones y datos', 'Virtualización, servidores, almacenamiento, red', 'Amazon EC2, Amazon EBS'],
          ['PaaS (plataforma)', 'Solo la aplicación y los datos', 'SO, runtime, escalado, parches del sistema', 'AWS Elastic Beanstalk, AWS App Runner'],
          ['SaaS (software)', 'Nada: solo usa el producto y sus datos', 'Absolutamente todo el stack', 'Amazon WorkMail, Google Workspace']
        ] },
        { t: 'nota', clase: 'examen', titulo: 'Truco de examen', c: 'Si la pregunta dice «el cliente se encarga del sistema operativo y de los parches» es IaaS. Si dice «solo se preocupa del código y los datos» es PaaS. Si «no administra nada» es SaaS.' },
        { t: 'h', c: 'Serverless: la versión extrema de PaaS' },
        { t: 'p', c: 'Dentro de PaaS existe una forma aún más delegada: el modelo **serverless**. No hay servidor que administrar ni capacidad reservada. Se escribe una función, se publica y el proveedor la ejecuta cuando llega una petición, cobrando por invocación y por milisegundos de ejecución. En AWS el exponente es **AWS Lambda**, acompañado de servicios que también se consumen sin aprovisionar nada, como Amazon S3, Amazon DynamoDB o Amazon API Gateway.' },
        { t: 'tabla', cab: ['Situación', 'Qué encaja mejor', 'Por qué'], filas: [
          ['Web estática o API con tráfico irregular', 'Serverless: Lambda + S3 + DynamoDB', 'Con cero tráfico la factura es cero: no hay máquina encendida esperando.'],
          ['Procesos largos o estado en memoria', 'Servidor o contenedor: EC2, ECS', 'Las funciones tienen límite de tiempo y arranque en frío; no sirven para trabajos continuos.'],
          ['Prototipo o proyecto de clase', 'Serverless o un VPS pequeño', 'Con pocas visitas, lo gestionado evita parchear y hacer copias a mano.'],
          ['Carga alta y sostenida todo el día', 'Instancias reservadas o Savings Plans', 'El pago por invocación deja de compensar cuando el uso es constante.']
        ] },
        { t: 'nota', clase: 'tip', titulo: 'Serverless no significa «sin servidores»', c: 'Los servidores existen: lo que desaparece es **tu responsabilidad sobre ellos**. Sigues respondiendo del código, de los permisos y de los datos.' },
        { t: 'h', c: 'Modelos de despliegue' },
        { t: 'ul', c: [
          '**Nube pública:** los recursos son del proveedor y se comparten entre clientes. AWS, Azure y Google Cloud operan nubes públicas.',
          '**Nube privada:** infraestructura dedicada a una sola organización, on-premises o alojada por un tercero. Ofrece control máximo, pero exige inversión y personal propio.',
          '**Nube híbrida:** combina nube pública y privada con integración entre ambas, por ejemplo con AWS Direct Connect o AWS Outposts. Habitualmente se usa para mantener datos sensibles en local y escalar en la nube.'
        ] },
        { t: 'h', c: 'Del centro de datos a la nube: qué cambia' },
        { t: 'tabla', cab: ['Aspecto', 'Centro de datos propio', 'Nube pública'], filas: [
          ['Inversión inicial', 'Alta (CapEx): hardware, obra, refrigeración', 'Muy baja (OpEx): pago por uso'],
          ['Tiempo de aprovisionamiento', 'Semanas o meses', 'Minutos'],
          ['Escalado', 'Comprar e instalar más hardware', 'Automático y elástico'],
          ['Mantenimiento', 'Equipo interno 24/7', 'Lo asume el proveedor'],
          ['Riesgo de infrautilización', 'Alto: se dimensiona para el pico', 'Bajo: la capacidad se ajusta'],
          ['Alcance global', 'Costoso y lento', 'Decenas de regiones en minutos']
        ] },
        { t: 'h', c: 'Nube frente a virtualización' },
        { t: 'p', c: 'La virtualización es la **tecnología** que permite ejecutar varias máquinas virtuales sobre un servidor físico. La nube es un **modelo operativo y comercial** construido sobre esa tecnología que añade autoservicio, elasticidad, medición del uso y alcance global. Un centro de datos virtualizado sin autoservicio ni pago por uso no es una nube.' }
      ],
      terminos: [
        { t: 'Informática en la nube', d: 'Entrega bajo demanda de recursos de TI por internet con pago por uso.' },
        { t: 'Multi-tenant', d: 'Varios clientes comparten la misma infraestructura física de forma aislada.' },
        { t: 'Elasticidad', d: 'Capacidad de crecer y decrecer automáticamente según la demanda.' },
        { t: 'Nube híbrida', d: 'Combinación integrada de infraestructura propia y servicios de nube pública.' },
        { t: 'Serverless', d: 'Modelo en el que el proveedor ejecuta código por petición y solo se paga la ejecución.' },
        { t: 'CapEx / OpEx', d: 'Gasto de capital (comprar activos) frente a gasto operativo (pagar por consumo).' }
      ],
      quiz: [
        { p: 'Una empresa alquila máquinas virtuales en AWS y se encarga de instalar el sistema operativo, el servidor web y la aplicación. ¿Qué modelo de servicio utiliza?', op: ['SaaS', 'PaaS', 'IaaS', 'FaaS'], ok: 2, e: 'Al gestionar el sistema operativo y el software de base, la empresa consume infraestructura como servicio (IaaS). En PaaS solo gestionaría la aplicación; en SaaS, nada.' },
        { p: '¿Cuál de estas afirmaciones describe mejor la característica de «servicio medido»?', op: ['El proveedor mide la satisfacción del cliente cada mes', 'El uso de los recursos se mide y se factura según el consumo real', 'El cliente debe medir la capacidad antes de contratarla', 'El servicio solo se puede medir con herramientas externas'], ok: 1, e: 'El servicio medido implica medición automática del consumo y facturación transparente por lo utilizado, sin necesidad de que el cliente mida nada.' },
        { p: 'Una función Lambda se ejecuta solo cuando llega una petición y se factura por invocación. ¿Cómo se llama ese modelo?', op: ['IaaS', 'SaaS', 'Serverless', 'Nube privada'], ok: 2, e: 'El modelo serverless ejecuta código bajo demanda y cobra por ejecución, sin servidores que administrar ni capacidad reservada.' },
        { p: '¿Qué modelo de despliegue combina infraestructura local con servicios de nube pública integrados?', op: ['Nube privada', 'Nube híbrida', 'Nube comunitaria', 'Centro de datos tradicional'], ok: 1, e: 'La nube híbrida integra entornos locales con la nube pública, típicamente mediante conexiones dedicadas como AWS Direct Connect.' }
      ]
    },
    {
      id: 'm1s2',
      titulo: 'Ventajas de la informática en la nube',
      resumen: 'Las seis ventajas clásicas de AWS explican por qué la nube reduce costes, acelera la innovación y permite una escala global imposible de alcanzar con infraestructura propia.',
      objetivos: [
        'Enumerar y explicar las seis ventajas de la informática en la nube.',
        'Diferenciar agilidad, elasticidad, fiabilidad y durabilidad.',
        'Relacionar cada ventaja con un beneficio de negocio concreto.'
      ],
      bloques: [
        { t: 'p', c: 'AWS resume el valor de la nube en **seis ventajas** que aparecen casi literalmente en el examen de certificación. No basta con memorizarlas: conviene saber traducirlas a situaciones reales.' },
        { t: 'h', c: 'Las seis ventajas' },
        { t: 'ol', c: [
          '**Convertir gasto de capital en gasto variable.** Ya no hay que comprar servidores por adelantado. Se paga por lo que se usa y, si un mes el consumo baja, la factura baja.',
          '**Beneficiarse de las economías de escala.** Al agregar el uso de cientos de miles de clientes, el proveedor consigue precios de hardware y energía mucho menores y traslada parte de ese ahorro en forma de precios más bajos.',
          '**Dejar de adivinar la capacidad.** Se aprovisiona lo necesario y se escala cuando cambia la demanda, evitando tanto el sobredimensionamiento (dinero desperdiciado) como el infra-dimensionamiento (usuarios enfadados).',
          '**Aumentar la velocidad y la agilidad.** Crear un entorno de pruebas o desplegar una nueva versión pasa de semanas a minutos, lo que acorta el tiempo de comercialización.',
          '**Dejar de gastar dinero en operar y mantener centros de datos.** El esfuerzo del equipo se traslada de tareas de infraestructura a proyectos que generan valor para el negocio.',
          '**Salir al mundo en minutos.** Con unas pocas clics se despliegan recursos en cualquier región, acercando la aplicación a los usuarios de todo el planeta.'
        ] },
        { t: 'nota', clase: 'examen', titulo: 'Las seis, de un vistazo', c: 'Gasto variable · Economías de escala · Sin adivinar capacidad · Velocidad y agilidad · Sin centros de datos propios · Alcance global en minutos.' },
        { t: 'h', c: 'Beneficios técnicos que se derivan de ellas' },
        { t: 'tabla', cab: ['Concepto', 'Definición', 'Ejemplo en AWS'], filas: [
          ['Agilidad', 'Capacidad de experimentar y poner en producción rápidamente', 'Crear un entorno de pruebas con CloudFormation en minutos'],
          ['Elasticidad', 'Ajustar la capacidad a la demanda en ambos sentidos', 'EC2 Auto Scaling añade instancias en el pico del día'],
          ['Alta disponibilidad', 'Seguir funcionando aunque falle un componente', 'Recursos desplegados en varias zonas de disponibilidad'],
          ['Tolerancia a fallos', 'Continuar sin interrupción aunque falle una parte', 'Arquitectura multi-AZ con conmutación automática'],
          ['Durabilidad', 'Probabilidad de no perder datos a largo plazo', 'Amazon S3 ofrece 99,999999999 % de durabilidad'],
          ['Escalabilidad', 'Crecer en capacidad de forma sostenida', 'Añadir nodos a un clúster de Amazon EKS']
        ] },
        { t: 'nota', clase: 'tip', titulo: 'No confundas…', c: '**Escalabilidad** es la capacidad de crecer; **elasticidad** es hacerlo de forma automática y reversible según la demanda. **Alta disponibilidad** reduce el tiempo de inactividad; **tolerancia a fallos** busca cero interrupción.' },
        { t: 'h', c: 'Rendimiento: por qué la media engaña' },
        { t: 'p', c: 'La nube promete capacidad, pero lo que el usuario percibe es **latencia**. Y la latencia no se juzga con una media, sino con **percentiles**: el valor por debajo del cual queda un porcentaje de las peticiones. El **p50** o mediana describe el caso típico; el **p90** y el **p99** describen la cola, esas peticiones que se atascan.' },
        { t: 'ul', c: [
          '**p50 (mediana):** la mitad de las peticiones tardan eso o menos. Es la experiencia normal.',
          '**p90:** el 90 % cabe por debajo; el 10 % restante es más lento.',
          '**p99,9:** solo una de cada mil peticiones es peor. En un servicio con millones de peticiones, sigue siendo mucha gente enfadada.'
        ] },
        { t: 'tabla', cab: ['Escenario', 'Cálculo', 'Duración'], filas: [
          ['100.000 archivos, 2 subidas en paralelo, 0,2 s cada una', '100.000 × 0,2 s ÷ 2', '≈ 2 h 45 min'],
          ['El 0,2 % (200 archivos) se atasca 300 s', '200 × 300 s ÷ 2', '≈ 8 h extra, es decir, ≈ 11 h en total']
        ] },
        { t: 'nota', clase: 'examen', titulo: 'La lección de la cola', c: 'Un porcentaje minúsculo de peticiones lentas puede **cuadruplicar** el tiempo total, porque bloquea los hilos disponibles. Por eso se prueba el peor caso y no solo el promedio.' },
        { t: 'p', c: 'De ahí una conclusión contraintuitiva: dividir un archivo grande en muchos trozos para subirlos en paralelo **no siempre acelera**. Cuantas más peticiones se hacen, más probable es que alguna caiga en la cola lenta. Sin datos de percentiles, optimizar a ciegas puede empeorar el resultado.' },
        { t: 'h', c: 'Riesgos que conviene gestionar' },
        { t: 'ul', c: [
          '**Dependencia del proveedor:** usar servicios muy específicos dificulta cambiar de nube. Se mitiga con arquitecturas portables y contenedores.',
          '**Falta de visibilidad del gasto:** el pago por uso puede disparar la factura si no se configuran presupuestos y alarmas.',
          '**Conocimiento del equipo:** la nube exige nuevas habilidades. AWS Academy, la documentación y las certificaciones ayudan a cerrar esa brecha.',
          '**Cumplimiento y residencia de datos:** hay que elegir la región adecuada y conocer dónde se almacena cada dato.'
        ] },
        { t: 'h', c: 'Ejemplo: una tienda online' },
        { t: 'p', c: 'Una tienda que vende solo en campañas de rebajas solía comprar servidores para el pico de noviembre y los tenía al 8 % el resto del año. En AWS, Auto Scaling enciende instancias solo cuando sube el tráfico y las apaga al bajar; CloudFront sirve las imágenes desde el borde; y las copias de seguridad en S3 sustituyen a las cintas. El resultado: menos coste fijo, mejor experiencia en el pico y un equipo centrado en la tienda, no en el hardware.' }
      ],
      terminos: [
        { t: 'Economías de escala', d: 'Reducción de coste unitario al comprar y operar a gran volumen.' },
        { t: 'Agilidad', d: 'Velocidad para experimentar, iterar y desplegar cambios.' },
        { t: 'Durabilidad', d: 'Capacidad de un sistema de conservar los datos sin pérdida.' },
        { t: 'Percentil', d: 'Valor por debajo del cual queda un porcentaje dado de las mediciones de latencia.' },
        { t: 'Tolerancia a fallos', d: 'Capacidad de seguir operando aunque falle un componente.' }
      ],
      quiz: [
        { p: '¿Cuál de estas es una de las seis ventajas de la informática en la nube según AWS?', op: ['Eliminar por completo la necesidad de seguridad', 'Convertir un gasto de capital en un gasto variable', 'Garantizar que la factura mensual sea siempre la misma', 'Evitar tener que diseñar la arquitectura'], ok: 1, e: 'La primera ventaja es convertir CapEx en OpEx: se paga por consumo en lugar de comprar infraestructura por adelantado.' },
        { p: 'Una plataforma de vídeo experimenta picos enormes en estrenos y muy poco tráfico el resto del mes. ¿Qué beneficio de la nube aprovecha principalmente?', op: ['Economías de escala', 'Elasticidad', 'Alcance global', 'Durabilidad'], ok: 1, e: 'La elasticidad permite ampliar capacidad durante los picos y reducirla después, pagando solo por lo usado.' },
        { p: 'En una migración de 100.000 archivos, solo el 0,2 % de las subidas se atasca cinco minutos. ¿Por qué el tiempo total casi se cuadruplica?', op: ['Porque la media aritmética sube mucho', 'Porque las peticiones lentas bloquean los hilos disponibles', 'Porque AWS limita las subidas pequeñas', 'Porque el ancho de banda baja al llegar a 100.000 objetos'], ok: 1, e: 'La cola lenta ocupa los hilos de subida; por eso se mide con percentiles (p90, p99) y no con la media.' },
        { p: 'La afirmación «Amazon S3 está diseñado para una durabilidad del 99,999999999 %» se refiere a…', op: ['La probabilidad de que el servicio esté disponible', 'La probabilidad de no perder un objeto almacenado', 'La velocidad de descarga de un objeto', 'El tiempo que tarda en replicarse entre regiones'], ok: 1, e: 'Durabilidad mide la probabilidad de conservar los datos; la disponibilidad (99,99 %) mide el tiempo que el servicio responde.' }
      ]
    },
    {
      id: 'm1s3',
      titulo: 'Introducción a AWS',
      resumen: 'Amazon Web Services es la plataforma de nube de Amazon, con más de 200 servicios, presencia global y cuatro formas principales de interactuar con ella: consola, CLI, SDK e infraestructura como código.',
      objetivos: [
        'Describir qué es AWS y cómo se organiza su catálogo de servicios.',
        'Reconocer las categorías de servicios y sus servicios representativos.',
        'Identificar los métodos de acceso a AWS y el marco de adopción de la nube (AWS CAF).'
      ],
      bloques: [
        { t: 'p', c: '**Amazon Web Services (AWS)** es la división de nube de Amazon. Nació en 2006 con Amazon S3, Amazon SQS y Amazon EC2, cuando Amazon decidió comercializar la infraestructura que había construido para su propia tienda. Hoy ofrece **más de 200 servicios** desde decenas de regiones y es el proveedor de nube con mayor cuota de mercado.' },
        { t: 'h', c: 'Categorías de servicios' },
        { t: 'tabla', cab: ['Categoría', 'Para qué sirve', 'Servicios clave'], filas: [
          ['Cómputo', 'Ejecutar código y aplicaciones', 'Amazon EC2, AWS Lambda, Amazon ECS, Amazon EKS, Elastic Beanstalk'],
          ['Almacenamiento', 'Guardar y recuperar datos', 'Amazon S3, Amazon EBS, Amazon EFS, Amazon S3 Glacier'],
          ['Bases de datos', 'Datos estructurados y analíticos', 'Amazon RDS, Amazon Aurora, Amazon DynamoDB, Amazon Redshift'],
          ['Redes y entrega de contenido', 'Conectar y distribuir', 'Amazon VPC, Route 53, CloudFront, Direct Connect, ELB'],
          ['Seguridad, identidad y conformidad', 'Proteger cuentas y datos', 'AWS IAM, AWS KMS, AWS Shield, AWS WAF, Amazon GuardDuty'],
          ['Gestión y gobernanza', 'Supervisar y controlar', 'Amazon CloudWatch, AWS CloudTrail, AWS Config, AWS Trusted Advisor'],
          ['Analítica', 'Procesar datos a escala', 'Amazon Athena, AWS Glue, Amazon EMR, Amazon Kinesis'],
          ['Integración de aplicaciones', 'Conectar sistemas', 'Amazon SQS, Amazon SNS, Amazon EventBridge, AWS Step Functions'],
          ['IA y machine learning', 'Modelos y servicios inteligentes', 'Amazon SageMaker, Amazon Bedrock, Amazon Rekognition'],
          ['Facturación y costes', 'Controlar el gasto', 'AWS Cost Explorer, AWS Budgets, AWS Organizations']
        ] },
        { t: 'nota', clase: 'examen', titulo: 'Preguntas típicas', c: '«¿Qué servicio permite…?» suele resolverse identificando la categoría. Si habla de objetos → S3. De bloques para una instancia → EBS. De archivos compartidos → EFS. De colas → SQS. De notificaciones pub/sub → SNS.' },
        { t: 'h', c: 'Quién trabaja con la nube' },
        { t: 'p', c: 'Una plataforma en la nube no la mantiene una sola persona: es un trabajo en equipo con roles bastante definidos. Reconocerlos ayuda a entender qué tareas asume cada perfil y por qué la formación en cloud es transversal a toda la empresa.' },
        { t: 'tabla', cab: ['Rol', 'En qué se centra'], filas: [
          ['Desarrollador/a', 'El código del producto y sus pruebas.'],
          ['Arquitecto/a cloud', 'Diseñar soluciones sobre AWS, Azure o Google Cloud: qué servicios, cómo se comunican y cuánto cuestan.'],
          ['DevOps', 'Llevar la aplicación de local a producción: automatizar pruebas y despliegues hasta que desplegar sea pulsar un botón.'],
          ['Ingeniería de plataforma', 'Los raíles comunes sobre los que el resto despliega: plantillas, pipelines, entornos.'],
          ['SRE', 'Mantenimiento y vigilancia: que todo siga funcionando y que los incidentes se detecten y analicen.'],
          ['QA', 'Comprobar que las cosas funcionan antes de que lleguen al usuario.'],
          ['Seguridad y datos', 'Proteger la información, gestionar identidades y cumplir la normativa.']
        ] },
        { t: 'nota', clase: 'dato', titulo: 'Equipos pequeños, roles mezclados', c: 'En una empresa pequeña la misma persona hace de desarrolladora, de DevOps y de SRE. En una grande, cada rol tiene su equipo y sus herramientas. Los conceptos, en cambio, son los mismos.' },
        { t: 'h', c: 'Cómo se accede a AWS' },
        { t: 'ul', c: [
          '**Consola de administración:** interfaz web gráfica, ideal para aprender y para tareas puntuales.',
          '**AWS CLI:** herramienta de línea de comandos multiplataforma; permite automatizar y repetir operaciones.',
          '**SDK:** bibliotecas para lenguajes como Python (boto3), JavaScript, Java, .NET, Go, Ruby, PHP y Swift.',
          '**Infraestructura como código:** AWS CloudFormation, AWS CDK o Terraform permiten describir la infraestructura en plantillas versionables.'
        ] },
        { t: 'p', c: 'Todos los métodos anteriores utilizan la misma **API de AWS**, de modo que cualquier acción disponible en la consola puede hacerse también por CLI o SDK. La consola resulta cómoda; la automatización resulta imprescindible en producción.' },
        { t: 'h', c: 'El modelo de responsabilidad compartida, en una frase' },
        { t: 'p', c: 'AWS es responsable de la **seguridad de la nube** (instalaciones, hardware, red global, hipervisor); el cliente es responsable de la **seguridad en la nube** (datos, identidades, configuración, parches del sistema operativo invitado). Este modelo se estudia en detalle en el módulo 4.' },
        { t: 'h', c: 'AWS Cloud Adoption Framework (AWS CAF)' },
        { t: 'p', c: 'El **AWS CAF** es una guía metodológica que ayuda a las organizaciones a planificar su transformación digital. Organiza las capacidades en seis perspectivas: **negocio** (gestión financiera, estrategia, beneficios), **personas** (cultura, roles, formación), **gobernanza** (gestión de carteras, prioridades, riesgos), **plataforma** (arquitectura, ingeniería, datos), **seguridad** (identidad, detección, respuesta) y **operaciones** (observabilidad, gestión de incidentes, continuidad). Se detalla en la sección 4 de este módulo.' },
        { t: 'h', c: 'Niveles de soporte y certificación' },
        { t: 'p', c: 'AWS ofrece planes de soporte (Basic, Developer, Business, Enterprise On-Ramp y Enterprise) y un programa de certificaciones que empieza por **AWS Certified Cloud Practitioner (CLF-C02)**. Este curso de Cloud Foundations está alineado con ese examen y con el **AWS Academy Learner Lab**, que proporciona una cuenta de laboratorio con créditos limitados para practicar.' }
      ],
      terminos: [
        { t: 'AWS Management Console', d: 'Interfaz web para administrar servicios de AWS.' },
        { t: 'AWS CLI', d: 'Herramienta de línea de comandos que llama a la API de AWS.' },
        { t: 'SDK', d: 'Kit de desarrollo con bibliotecas para integrar AWS en el código de una aplicación.' },
        { t: 'AWS CAF', d: 'Marco de adopción de la nube con seis perspectivas para guiar la transformación.' },
        { t: 'SRE', d: 'Ingeniería de fiabilidad: mantener el servicio funcionando y analizar los incidentes.' },
        { t: 'DevOps', d: 'Cultura y práctica de automatizar la entrega de software desde el código a producción.' },
        { t: 'Región', d: 'Área geográfica aislada que agrupa zonas de disponibilidad.' }
      ],
      quiz: [
        { p: 'Un equipo quiere crear recursos de AWS de forma repetible y versionada, sin usar la consola. ¿Qué enfoque se ajusta mejor?', op: ['AWS CloudFormation (infraestructura como código)', 'AWS Trusted Advisor', 'AWS Support Center', 'Amazon CloudWatch'], ok: 0, e: 'CloudFormation describe la infraestructura en plantillas versionables, lo que permite recrear entornos de forma repetible.' },
        { p: '¿Cuál es la principal ventaja de que consola, CLI y SDK usen la misma API?', op: ['Que la consola es más rápida que la CLI', 'Que cualquier operación puede automatizarse y replicarse por programa', 'Que no hace falta autenticarse', 'Que se reduce automáticamente la factura'], ok: 1, e: 'Al compartir API, todo lo que se hace en la consola puede hacerse por CLI o SDK y automatizarse.' },
        { p: '¿Cuál de estos servicios pertenece a la categoría de bases de datos?', op: ['Amazon EFS', 'Amazon DynamoDB', 'Amazon CloudFront', 'AWS Lambda'], ok: 1, e: 'DynamoDB es una base de datos NoSQL clave-valor. EFS es almacenamiento de archivos, CloudFront es CDN y Lambda es cómputo sin servidor.' }
      ]
    },
    {
      id: 'm1s4',
      titulo: 'Migración a la nube de AWS',
      resumen: 'Migrar no es solo mover servidores: es un proceso que combina estrategia de negocio, personas, gobernanza y tecnología, guiado por el AWS CAF y por las siete estrategias de migración (las 7 R).',
      objetivos: [
        'Explicar las seis perspectivas del AWS CAF.',
        'Distinguir las siete estrategias de migración (7 R).',
        'Identificar los servicios de AWS que apoyan una migración.'
      ],
      bloques: [
        { t: 'p', c: 'La migración a la nube suele abordarse como un proyecto técnico, pero la mayoría de los fracasos son organizativos. Por eso AWS propone empezar por el **AWS Cloud Adoption Framework (CAF)**, que estructura el cambio en seis perspectivas agrupadas en dos bloques.' },
        { t: 'h', c: 'Las seis perspectivas del AWS CAF' },
        { t: 'tabla', cab: ['Bloque', 'Perspectiva', 'Qué cubre'], filas: [
          ['Negocio', 'Negocio', 'Estrategia, gestión financiera, beneficios esperados y priorización de iniciativas'],
          ['Negocio', 'Personas', 'Cultura, estructura organizativa, roles, formación y gestión del cambio'],
          ['Negocio', 'Gobernanza', 'Gestión de carteras, prioridades, riesgos, cumplimiento y métricas'],
          ['Técnico', 'Plataforma', 'Arquitectura, ingeniería, datos y aprovisionamiento'],
          ['Técnico', 'Seguridad', 'Identidad y acceso, detección, protección de infraestructura y respuesta'],
          ['Técnico', 'Operaciones', 'Observabilidad, gestión de eventos e incidentes, continuidad']
        ] },
        { t: 'nota', clase: 'tip', titulo: 'Para recordarlas', c: 'Tres de negocio —**N**egocio, **P**ersonas, **G**obernanza— y tres técnicas —**P**lataforma, **S**eguridad, **O**peraciones. «NPG + PSO».' },
        { t: 'h', c: 'Las 7 R: estrategias de migración' },
        { t: 'p', c: 'Cada aplicación puede abordarse de una forma distinta. Las siete estrategias clásicas son:' },
        { t: 'tabla', cab: ['Estrategia', 'Qué implica', 'Cuándo usarla'], filas: [
          ['Retirar (Retire)', 'Apagar la aplicación porque ya no aporta valor', 'Sistemas duplicados o sin uso'],
          ['Retener (Retain)', 'Dejarla donde está, de momento', 'Aplicaciones críticas que no conviene tocar todavía'],
          ['Reubicar (Relocate)', 'Mover la plataforma sin cambios (por ejemplo, VMware a VMware Cloud on AWS)', 'Migraciones rápidas de hipervisor'],
          ['Rehost (lift and shift)', 'Mover tal cual a la nube, sin rediseñar', 'Plazos ajustados; se optimiza después'],
          ['Replatform (lift, tinker and shift)', 'Pequeñas optimizaciones durante el traslado, como pasar a Amazon RDS', 'Obtener beneficios sin rediseño completo'],
          ['Refactorizar / Rearquitecturar', 'Rediseñar la aplicación con servicios nativos de nube', 'Aplicaciones estratégicas que necesitan escalar'],
          ['Recomprar (Repurchase)', 'Sustituir por un producto SaaS', 'CRM, correo, herramientas estándar']
        ] },
        { t: 'nota', clase: 'examen', titulo: 'Ojo', c: '«Rehost» no modifica nada; «replatform» cambia algún componente (por ejemplo, base de datos autogestionada → RDS); «refactorizar» cambia la arquitectura (monolito → microservicios o Lambda).' },
        { t: 'h', c: 'El viaje de adopción de la nube' },
        { t: 'p', c: 'AWS describe la adopción como un proceso iterativo con tres fases:' },
        { t: 'ol', c: [
          '**Visualizar (Envision):** identificar oportunidades de negocio y demostrar el valor con proyectos piloto.',
          '**Alinear (Align):** definir la hoja de ruta, las métricas, la gobernanza y las capacidades necesarias.',
          '**Lanzar y escalar (Launch & Scale):** ejecutar la migración por oleadas y ampliar el modelo a toda la organización.'
        ] },
        { t: 'h', c: 'Servicios que facilitan la migración' },
        { t: 'tabla', cab: ['Servicio', 'Función'], filas: [
          ['AWS Application Migration Service (MGN)', 'Replica servidores físicos, virtuales o de otras nubes y los relanza en AWS (rehost).'],
          ['AWS Database Migration Service (DMS)', 'Migra bases de datos con replicación continua y mínima interrupción.'],
          ['AWS Schema Conversion Tool (SCT)', 'Convierte esquemas y código entre motores de base de datos distintos.'],
          ['AWS DataSync', 'Sincroniza datos entre almacenamiento local, EFS, S3 y FSx.'],
          ['AWS Snow Family', 'Dispositivos físicos para transferir petabytes de datos sin depender de la red.'],
          ['AWS Migration Hub', 'Seguimiento centralizado del progreso de las migraciones.'],
          ['AWS Transfer Family', 'Mueve datos por SFTP, FTPS y FTP a Amazon S3 o EFS.']
        ] },
        { t: 'h', c: 'Cómo elegir proveedor' },
        { t: 'p', c: 'Antes de migrar hay que elegir destino, y la decisión no se reduce al precio por hora. Estos son los criterios que de verdad pesan con el tiempo:' },
        { t: 'tabla', cab: ['Criterio', 'Qué mirar'], filas: [
          ['Presencia geográfica', 'Regiones cercanas a tus usuarios: la latencia se arregla con distancia, no con dinero.'],
          ['Servicios y ecosistema', 'Que exista lo que necesitas (base de datos gestionada, colas, IA) sin montarlo a mano.'],
          ['Capa gratuita y soporte', 'Poder experimentar sin coste y tener un canal técnico cuando algo falla.'],
          ['Precio al escalar', 'No solo el precio de entrada: cuánto cuesta el terabyte, la petición y la salida cuando crezcas.'],
          ['Coste de salida', 'Cuánto cuesta llevarte los datos y cuánto trabajo exige reescribir la aplicación.'],
          ['Capacidad de negociación', '10 PB no significan nada para un hiperescalador, pero pueden convertirte en el mayor cliente de uno pequeño.'],
          ['Modelo de precio', 'Pago por uso o compromiso a uno, dos o tres años con descuento.']
        ] },
        { t: 'nota', clase: 'tip', titulo: 'El más barato depende del consumo', c: 'Existen comparadores de precios de VPS, GPU y almacenamiento de objetos. El proveedor más económico cambia según el volumen: con 1 TB gana uno y con 100 TB gana otro. Calcula con tus cifras, no con las del folleto.' },
        { t: 'h', c: 'Lock-in: la dependencia del proveedor' },
        { t: 'p', c: 'Se llama **lock-in** a depender tanto de un proveedor que cambiar resulte caro o inviable. La historia tiene ejemplos en las dos direcciones: **Dropbox** nació sobre Amazon S3 y, al crecer y pagar cifras millonarias por el almacenamiento, terminó montando su propia infraestructura; **Netflix** mantiene su catálogo en AWS y ha construido otros servicios propios alrededor. No es una decisión moral, es económica.' },
        { t: 'p', c: 'En Europa el **Reglamento de Datos (Data Act, Reglamento UE 2023/2854)** aplica desde el **12 de septiembre de 2025** y obliga a facilitar el cambio de proveedor: preaviso máximo de dos meses, un periodo de transición de unos 30 días y derecho a recuperar los datos después. Los costes de cambio están limitados a los costes reales y **desaparecen el 12 de enero de 2027**.' },
        { t: 'nota', clase: 'examen', titulo: 'Portabilidad no es gratis', c: 'Que la ley obligue a facilitar la salida no significa que tu aplicación funcione igual en otra nube: servicios propietarios, permisos y formatos siguen siendo tu responsabilidad. Diseñar con contenedores y estándares abiertos (S3, SQL, Kubernetes) reduce el lock-in.' },
        { t: 'h', c: 'Buenas prácticas antes de migrar' },
        { t: 'ul', c: [
          '**Inventariar** todas las aplicaciones, dependencias y flujos de datos antes de mover nada.',
          '**Priorizar por valor y riesgo:** empezar por candidatos sencillos que demuestren valor rápido.',
          '**Diseñar la seguridad desde el inicio:** identidades, cifrado, registro y segmentación de red.',
          '**Estimar el coste** con AWS Pricing Calculator y comparar con el TCO actual.',
          '**Formar al equipo** y definir centros de excelencia en la nube (CCoE).',
          '**Medir y optimizar** después de migrar: la migración no termina el día del corte.'
        ] }
      ],
      terminos: [
        { t: 'AWS CAF', d: 'Marco de adopción de la nube con seis perspectivas: negocio, personas, gobernanza, plataforma, seguridad y operaciones.' },
        { t: 'Rehost', d: 'Mover una aplicación a la nube sin cambios (lift and shift).' },
        { t: 'Replatform', d: 'Moverla aplicando optimizaciones puntuales.' },
        { t: 'Refactorizar', d: 'Rediseñar la aplicación aprovechando servicios nativos de nube.' },
        { t: 'AWS DMS', d: 'Servicio gestionado para migrar bases de datos con mínima interrupción.' },
        { t: 'Lock-in', d: 'Dependencia excesiva de un proveedor que encarece o impide cambiar de nube.' },
        { t: 'Data Act', d: 'Reglamento europeo que obliga a facilitar el cambio de proveedor de nube.' },
        { t: 'CCoE', d: 'Cloud Center of Excellence: equipo que define las buenas prácticas de nube en la organización.' }
      ],
      quiz: [
        { p: 'Una empresa traslada sus servidores a Amazon EC2 sin modificar el sistema operativo ni la aplicación. ¿Qué estrategia aplica?', op: ['Refactorizar', 'Rehost', 'Recomprar', 'Retirar'], ok: 1, e: 'Rehost (lift and shift) consiste en mover la carga de trabajo tal cual, sin rediseñarla.' },
        { p: '¿Qué servicio de AWS se utiliza específicamente para migrar bases de datos con replicación continua?', op: ['AWS DataSync', 'AWS DMS', 'AWS Snowball', 'AWS Migration Hub'], ok: 1, e: 'AWS Database Migration Service (DMS) migra bases de datos con replicación continua y mínima interrupción.' },
        { p: '¿Cuál de estas perspectivas del AWS CAF es de naturaleza técnica?', op: ['Gobernanza', 'Personas', 'Plataforma', 'Negocio'], ok: 2, e: 'Plataforma, Seguridad y Operaciones son las tres perspectivas técnicas; Negocio, Personas y Gobernanza son de negocio.' }
      ]
    }
  ]
});
