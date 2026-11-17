/* Módulo 3 · Información general sobre la infraestructura global de AWS */
(window.MODULOS = window.MODULOS || []).push({
  id: 'm3',
  numero: 3,
  titulo: 'Información general sobre la infraestructura global de AWS',
  descripcion: 'Regiones, zonas de disponibilidad, ubicaciones de borde y zonas locales: cómo está construida la infraestructura de AWS y qué servicios ofrece en cada categoría.',
  duracion: '70 min',
  objetivo: 'Identificar los componentes de la infraestructura global de AWS y elegir la región adecuada para cada carga de trabajo.',
  secciones: [
    {
      id: 'm3s1',
      titulo: 'Infraestructura global de AWS',
      resumen: 'AWS organiza su infraestructura en regiones independientes, cada una con varias zonas de disponibilidad aisladas, y las conecta con una red troncal privada y cientos de ubicaciones de borde.',
      objetivos: [
        'Definir región, zona de disponibilidad y ubicación de borde.',
        'Explicar los criterios para elegir una región.',
        'Reconocer los servicios de infraestructura extendida: Local Zones, Wavelength, Outposts y Direct Connect.'
      ],
      bloques: [
        { t: 'p', c: 'La infraestructura global de AWS se construye en capas: **regiones**, **zonas de disponibilidad**, **ubicaciones de borde** y una serie de extensiones (Local Zones, Wavelength Zones, Outposts) que acercan la capacidad a donde hace falta. Comprender esta jerarquía es la base de cualquier arquitectura de alta disponibilidad.' },
        { t: 'h', c: 'Regiones' },
        { t: 'p', c: 'Una **región** es un área geográfica aislada del resto de regiones, con su propia red, energía y gobierno de datos. Cada región contiene varias zonas de disponibilidad. Las cifras cambian con frecuencia (AWS supera las 30 regiones y las 100 zonas de disponibilidad), así que en el examen conviene quedarse con el concepto y no con el número exacto.' },
        { t: 'p', c: 'Algunos ejemplos de identificadores: `us-east-1` (Norte de Virginia), `eu-west-1` (Irlanda), `eu-south-2` (España), `sa-east-1` (São Paulo), `ap-northeast-1` (Tokio).' },
        { t: 'nota', clase: 'examen', titulo: 'Aislamiento por diseño', c: 'Las regiones están **completamente aisladas** entre sí. Un fallo en una región no afecta a otra, y los datos no salen de una región salvo que el cliente lo configure explícitamente.' },
        { t: 'h', c: 'Zonas de disponibilidad' },
        { t: 'p', c: 'Una **zona de disponibilidad (AZ)** es uno o varios centros de datos independientes dentro de una región, con energía, refrigeración y red propias, separados físicamente por varios kilómetros. Las AZ de una región se comunican mediante fibra privada redundante con latencia de milisegundos.' },
        { t: 'p', c: 'Desplegar en **dos o más AZ** es el patrón estándar de alta disponibilidad: si una falla, las demás siguen atendiendo. Algunos servicios lo hacen por ti (Amazon RDS Multi-AZ, un balanceador de carga con subredes en varias AZ), y en otros lo diseñás vosotros (instancias EC2 repartidas, clúster de EKS).' },
        { t: 'nota', clase: 'tip', titulo: 'Piénsalo así', c: 'La **región** protege frente a desastres regionales y cumple requisitos de residencia de datos. La **zona de disponibilidad** protege frente a fallos locales (inundación, incendio, corte eléctrico) y se usa para alta disponibilidad.' },
        { t: 'h', c: 'Ubicaciones de borde' },
        { t: 'p', c: 'Las **ubicaciones de borde (edge locations)** son puntos de presencia de la red de AWS distribuidos en grandes ciudades. Sirven al CDN de **Amazon CloudFront** y al DNS de **Route 53**, y también a servicios como AWS Shield y AWS WAF. Su función es **acercar el contenido al usuario** para reducir la latencia, no ejecutar las aplicaciones.' },
        { t: 'p', c: 'Existen además **cachés regionales de borde**, que actúan como una capa intermedia entre la ubicación de borde y la región de origen para mejorar la tasa de acierto de la caché.' },
        { t: 'h', c: 'Infraestructura extendida' },
        { t: 'tabla', cab: ['Componente', 'Qué es', 'Caso de uso'], filas: [
          ['AWS Local Zones', 'Extensión de una región situada en una gran área metropolitana', 'Latencia de un solo dígito para medios, juegos o sanidad'],
          ['AWS Wavelength Zones', 'Infraestructura dentro de redes 5G de operadores', 'Aplicaciones móviles con latencia ultrabaja'],
          ['AWS Outposts', 'Racks de AWS instalados en las instalaciones del cliente', 'Nube híbrida con datos que no pueden salir de las instalaciones'],
          ['AWS Direct Connect', 'Conexión de red dedicada entre el centro de datos y AWS', 'Tráfico híbrido estable y con mayor ancho de banda'],
          ['AWS Ground Station', 'Antenas gestionadas para comunicación satelital', 'Procesamiento de datos de satélites'],
          ['AWS Snow Family', 'Dispositivos físicos de transferencia de datos', 'Mover petabytes sin depender de la red']
        ] },
        { t: 'h', c: 'Cuando la nube falla' },
        { t: 'p', c: 'Las regiones y las zonas de disponibilidad existen porque los fallos son reales. Estos tres incidentes se estudian en las clases de despliegue en la nube porque resumen las lecciones que ningún folleto comercial cuenta:' },
        { t: 'tabla', cab: ['Incidente', 'Qué pasó', 'Lección'], filas: [
          ['Incendio en OVHcloud (Estrasburgo, 2021)', 'Ardió el centro de datos SBG2 y quedó dañado SBG1: unos 3,6 millones de webs dejaron de funcionar y hubo clientes que perdieron sus datos para siempre, también las copias que guardaban en el mismo edificio.', 'Si tu única copia está en el mismo sitio que el original, no tienes copia: necesitas otra región, otro proveedor o un almacenamiento aislado.'],
          ['Caída de la región us-east-1 de AWS (diciembre de 2021)', 'Un fallo en la automatización interna de DNS, apoyada en DynamoDB, hizo que los nombres dejaran de apuntar a sus direcciones IP.', 'Sobrevivieron quienes podían conmutar a otra región sin depender de la que estaba caída.'],
          ['Ataques físicos y cortes de suministro', 'Sabotaje de cables, obras que rompen fibra, apagones prolongados o falta de combustible para los generadores.', 'La redundancia eléctrica y de red, y la separación geográfica, no son lujos.']
        ] },
        { t: 'nota', clase: 'examen', titulo: 'Una zona no es una región', c: 'Multi-AZ protege frente al fallo de un edificio; **multi-región** protege frente al fallo de una ciudad o de un proveedor. Son dos niveles distintos de continuidad.' },
        { t: 'h', c: 'Lo que hay detrás de un proveedor' },
        { t: 'p', c: 'Del proveedor solo vemos un panel web, una API y servicios con nombre. Detrás hay una industria física: centros de datos con miles de discos y procesadores, contratos de energía y refrigeración, y software propio para monitorizar, hacer copias, gestionar permisos, medir el consumo de cada cliente y facturarlo. También hay **personas de guardia** a las tres de la mañana.' },
        { t: 'ul', c: [
          '**Hardware:** servidores, redes, almacenamiento y su mantenimiento (incluidos camiones con discos nuevos que no llegan).',
          '**Costes físicos:** electricidad, refrigeración, suelo y seguridad de las instalaciones.',
          '**Software propio:** virtualización, monitorización, copias de seguridad, control de acceso y medición del consumo.',
          '**Operación continua:** turnos de guardia, respuesta a incidentes y análisis posterior (post mortem).'
        ] },
        { t: 'h', c: 'Cómo elegir una región' },
        { t: 'p', c: 'No siempre se elige la región más cercana. Estos son los criterios, por orden de importancia habitual:' },
        { t: 'ol', c: [
          '**Cumplimiento y residencia de datos:** la ley puede obligar a que los datos de ciudadanos europeos permanezcan en la UE.',
          '**Proximidad a los usuarios:** menos latencia, sobre todo en aplicaciones interactivas.',
          '**Disponibilidad de servicios:** no todos los servicios ni todas las características están en todas las regiones.',
          '**Precio:** los costes varían entre regiones (por ejemplo, São Paulo es más caro que Irlanda).',
          '**Recuperación ante desastres:** la región de respaldo debe estar lo bastante lejos de la primaria.'
        ] },
        { t: 'h', c: 'Alcance de los servicios' },
        { t: 'ul', c: [
          '**Globales:** AWS IAM, Amazon Route 53, Amazon CloudFront, AWS Organizations, AWS Support. No se elige región.',
          '**Regionales:** Amazon S3 (el bucket pertenece a una región), Amazon RDS, AWS Lambda, Amazon VPC.',
          '**A nivel de zona de disponibilidad:** una instancia EC2, un volumen EBS, una subred. Hay que replicarlos explícitamente para sobrevivir a la caída de una AZ.'
        ] },
        { t: 'h', c: 'La red troncal de AWS' },
        { t: 'p', c: 'AWS opera su propia red de fibra óptica entre regiones y puntos de presencia, independiente de internet. Esto permite ofrecer latencias bajas y estables, y usar servicios como **AWS Global Accelerator**, que dirige el tráfico de los usuarios por la red de AWS desde el punto de entrada más cercano.' }
      ],
      terminos: [
        { t: 'Región', d: 'Área geográfica aislada con varias zonas de disponibilidad y servicios propios.' },
        { t: 'Zona de disponibilidad (AZ)', d: 'Uno o varios centros de datos independientes dentro de una región.' },
        { t: 'Ubicación de borde', d: 'Punto de presencia de CloudFront y Route 53 cercano a los usuarios.' },
        { t: 'Local Zone', d: 'Extensión de una región en un área metropolitana para latencias muy bajas.' },
        { t: 'Post mortem', d: 'Análisis posterior a un incidente con causas, impacto y medidas correctoras.' },
        { t: 'Dominio de fallo', d: 'Conjunto de componentes que fallan juntos; se separan para ganar disponibilidad.' },
        { t: 'AWS Outposts', d: 'Infraestructura de AWS instalada en el centro de datos del cliente.' }
      ],
      quiz: [
        { p: '¿Cuál es la unidad de infraestructura que proporciona aislamiento frente a fallos de energía y refrigeración dentro de una región?', op: ['Ubicación de borde', 'Zona de disponibilidad', 'Región', 'Local Zone'], ok: 1, e: 'Cada zona de disponibilidad tiene energía, refrigeración y red independientes, lo que la protege de fallos locales.' },
        { p: 'Una empresa debe garantizar por ley que los datos de sus clientes europeos no salgan de la UE. ¿Qué criterio de selección de región es determinante?', op: ['El precio', 'La latencia', 'El cumplimiento y la residencia de datos', 'La cantidad de zonas de disponibilidad'], ok: 2, e: 'El cumplimiento normativo y la residencia de datos son el criterio prioritario en ese escenario.' },
        { p: '¿Qué componente se utiliza para reducir la latencia de entrega de contenido estático a usuarios de todo el mundo?', op: ['AWS Outposts', 'Las ubicaciones de borde de CloudFront', 'Una zona de disponibilidad adicional', 'AWS Direct Connect'], ok: 1, e: 'Las ubicaciones de borde cachean contenido cerca del usuario y reducen la latencia de CloudFront.' }
      ]
    },
    {
      id: 'm3s2',
      titulo: 'Servicios de AWS y sus categorías',
      resumen: 'El catálogo de AWS se agrupa en categorías funcionales —cómputo, almacenamiento, bases de datos, red, seguridad, gestión, analítica, integración, IA— y cada servicio se elige según el problema que resuelve.',
      objetivos: [
        'Clasificar los servicios de AWS por categoría funcional.',
        'Elegir el servicio adecuado para un caso de uso descrito.',
        'Diferenciar servicios globales, regionales y de zona.'
      ],
      bloques: [
        { t: 'p', c: 'Con más de 200 servicios, la forma de no perderse es agruparlos por **categoría funcional**. En el examen, casi todas las preguntas de servicios se responden identificando primero la categoría y después el servicio concreto.' },
        { t: 'h', c: 'Catálogo por categorías' },
        { t: 'tabla', cab: ['Categoría', 'Servicios destacados', 'Para qué'], filas: [
          ['Cómputo', 'EC2, Lambda, ECS, EKS, Fargate, Elastic Beanstalk, Batch, Lightsail', 'Ejecutar aplicaciones y código'],
          ['Contenedores', 'ECR, ECS, EKS, Fargate', 'Empaquetar y orquestar contenedores'],
          ['Almacenamiento', 'S3, EBS, EFS, FSx, S3 Glacier, Storage Gateway', 'Guardar objetos, bloques y archivos'],
          ['Bases de datos', 'RDS, Aurora, DynamoDB, Redshift, ElastiCache, Neptune', 'Datos relacionales, clave-valor, analíticos, en memoria'],
          ['Redes', 'VPC, Route 53, CloudFront, Direct Connect, ELB, Global Accelerator, Transit Gateway', 'Conectar, distribuir y acelerar'],
          ['Seguridad e identidad', 'IAM, KMS, Shield, WAF, GuardDuty, Inspector, Macie, Secrets Manager, ACM, Cognito', 'Proteger accesos, datos y aplicaciones'],
          ['Gestión y gobernanza', 'CloudWatch, CloudTrail, Config, Trusted Advisor, Systems Manager, Organizations, Control Tower', 'Supervisar, auditar y gobernar'],
          ['Analítica', 'Athena, Glue, EMR, Kinesis, QuickSight, Redshift, Lake Formation', 'Procesar y visualizar datos'],
          ['Integración de aplicaciones', 'SQS, SNS, EventBridge, Step Functions, API Gateway, AppSync', 'Conectar componentes de forma desacoplada'],
          ['IA y ML', 'SageMaker, Bedrock, Rekognition, Comprehend, Transcribe, Polly, Lex', 'Modelos y servicios inteligentes'],
          ['Desarrollador', 'CodeCommit, CodeBuild, CodeDeploy, CodePipeline, Cloud9, X-Ray', 'CI/CD y herramientas de desarrollo'],
          ['Migración y transferencia', 'MGN, DMS, DataSync, Snow Family, Migration Hub, Transfer Family', 'Mover datos y cargas a AWS'],
          ['Usuario final', 'WorkSpaces, AppStream 2.0, WorkMail, Chime', 'Escritorios y aplicaciones gestionadas'],
          ['IoT', 'AWS IoT Core, IoT Greengrass, IoT Analytics', 'Dispositivos conectados']
        ] },
        { t: 'nota', clase: 'examen', titulo: 'Asociaciones que hay que dominar', c: 'Objetos → **S3** · Bloques para una instancia → **EBS** · Archivos compartidos → **EFS** · Archivo a largo plazo → **S3 Glacier** · Cola → **SQS** · Notificaciones → **SNS** · Bus de eventos → **EventBridge** · CDN → **CloudFront** · DNS → **Route 53**.' },
        { t: 'h', c: 'Categorías de cómputo en detalle' },
        { t: 'tabla', cab: ['Servicio', 'Modelo', 'Cuándo elegirlo'], filas: [
          ['Amazon EC2', 'Servidores virtuales (IaaS)', 'Control total del sistema operativo'],
          ['AWS Lambda', 'Funciones sin servidor', 'Código orientado a eventos, sin administrar servidores'],
          ['Amazon ECS / EKS', 'Orquestación de contenedores', 'Microservicios y aplicaciones en contenedores'],
          ['AWS Fargate', 'Contenedores sin servidor', 'Contenedores sin gestionar instancias'],
          ['Elastic Beanstalk', 'PaaS', 'Desplegar una aplicación web sin gestionar la infraestructura'],
          ['AWS Batch', 'Procesamiento por lotes', 'Trabajos de cálculo en cola'],
          ['Amazon Lightsail', 'Servidores simplificados', 'Proyectos pequeños con precio predecible']
        ] },
        { t: 'h', c: 'Almacenamiento de objetos: el estándar S3' },
        { t: 'p', c: 'Un sistema de archivos clásico organiza los datos en un árbol de carpetas. Mantener esa jerarquía cuesta y buscar en los niveles profundos es más lento. El **almacenamiento de objetos** elimina esa capa: todos los datos están al mismo nivel, cada uno con su nombre completo. Esa simplicidad es la que lo hace barato y rápido, y explica por qué es el segundo servicio más usado de AWS después de EC2.' },
        { t: 'tabla', cab: ['Elemento', 'Qué es'], filas: [
          ['Bucket', 'El contenedor donde se guardan los objetos. Su nombre es único a nivel global y está asociado a una región.'],
          ['Key', 'El nombre del objeto. Puede parecer una ruta (fotos/2026/playa.jpg), pero no hay carpetas reales: es un nombre que las simula.'],
          ['Metadatos', 'Tamaño, fecha, tipo de contenido y etiquetas propias (por ejemplo, el autor o el proyecto).']
        ] },
        { t: 'p', c: 'La clave del mercado es que casi todos los proveedores implementan la **API de Amazon S3**. El mismo código que sube un objeto a AWS sirve para MEGA S4, Backblaze B2, Cloudflare R2 o Hetzner, y las herramientas de terceros funcionan con todos ellos sin integraciones propias.' },
        { t: 'h', c: 'Qué ocurre cuando subes un objeto' },
        { t: 'esquema', c: [
          { titulo: '1 · La aplicación', sub: 'Envía una petición PUT firmada a un endpoint de una región' },
          { titulo: '2 · El proxy S3', sub: 'La API que entiende el estándar y valida la firma' },
          { titulo: '3 · Los servidores de almacenamiento', sub: 'Reparten el objeto entre discos, máquinas y centros de datos' },
          { titulo: '4 · Los fragmentos', sub: 'Cada objeto se divide en partes; si una se corrompe, se reconstruye desde otra copia' }
        ] },
        { t: 'nota', clase: 'dato', titulo: 'Once nueves de durabilidad', c: 'Al repartir cada objeto en fragmentos, Amazon S3 alcanza una durabilidad del **99,999999999 %** (once nueves). Guardando diez millones de objetos, perderías uno cada diez mil años, de media.' },
        { t: 'nota', clase: 'aviso', titulo: 'Compatible no es idéntico', c: 'Nadie implementa todas las operaciones de S3: se implementan las más usadas. En MEGA S4, al principio solo existía el borrado de objetos uno a uno (DeleteObject); como MinIO Client usa por defecto el borrado múltiple (DeleteObjects), sus usuarios no podían borrar sus datos hasta que se implementó esa operación. Antes de migrar, comprueba qué operaciones usa tu código.' },
        { t: 'h', c: 'Streaming y CDN: cómo llega el vídeo a tu pantalla' },
        { t: 'p', c: 'Cuando cambias de idioma en una plataforma de vídeo, la película sigue donde estaba. No hay un único archivo: protocolos como **HLS** (HTTP Live Streaming) guardan el vídeo en fragmentos de pocos segundos, con el audio y los subtítulos por separado y en varias calidades. El reproductor pide fragmento a fragmento y, si cambias de idioma, empieza a pedir los de esa otra versión. Cada fragmento es un objeto más en el almacenamiento.' },
        { t: 'p', c: 'Si los datos están en Madrid y los usuarios en Suecia, Egipto o Argelia, la distancia se nota. Una **CDN** (Content Delivery Network) guarda copias en caché en servidores repartidos por el mundo: el primer usuario sueco provoca la copia al servidor de Suecia y los siguientes la reciben desde allí. En AWS ese servicio es **Amazon CloudFront**.' },
        { t: 'h', c: 'La arquitectura web más sencilla' },
        { t: 'tabla', cab: ['Pieza', 'Para qué'], filas: [
          ['CDN', 'Acercar los archivos al usuario y mejorar el rendimiento.'],
          ['Función serverless o servidor', 'La lógica, solo si hace falta.'],
          ['Almacenamiento', 'Los archivos de la web y los datos.']
        ] },
        { t: 'p', c: 'Una **web estática** tiene contenido fijo: no hay inicio de sesión ni datos que guardar. Basta con el almacenamiento y, opcionalmente, una CDN. Una **web dinámica** tiene usuarios, datos persistentes y comunicación cliente-servidor, así que necesita además la capa de cómputo y una base de datos.' },
        { t: 'nota', clase: 'tip', titulo: 'La idea que lo resume todo', c: 'Cualquier web es, en el fondo, un almacenamiento y algo que lo sirve. Si identificas esas dos piezas y decides dónde va la lógica, ya tienes la arquitectura mínima.' },
        { t: 'h', c: 'Alcance de los servicios (repaso)' },
        { t: 'ul', c: [
          '**Global:** IAM, Route 53, CloudFront, Organizations, WAF (ámbito global para CloudFront).',
          '**Regional:** S3, RDS, DynamoDB, Lambda, VPC, ECS, EKS.',
          '**Zona:** EC2, EBS, subredes.'
        ] },
        { t: 'h', c: 'Cómo elegir un servicio sin perderse' },
        { t: 'ol', c: [
          'Define el **problema**: almacenar, calcular, conectar, proteger u observar.',
          'Comprueba si el servicio debe ser **gestionado** (menos operación) o **autogestionado** (más control).',
          'Valora el **modelo de consumo**: siempre encendido (EC2), por petición (Lambda) o por contenedor (Fargate).',
          'Revisa la **disponibilidad regional** y el coste con Pricing Calculator.',
          'Empieza por lo más simple y solo añade complejidad cuando haga falta.'
        ] },
        { t: 'nota', clase: 'tip', titulo: 'No memorices 200 servicios', c: 'Aprende bien 30: los que aparecen en este curso. Con ellos se resuelve la mayoría de preguntas y se construyen arquitecturas reales.' }
      ],
      terminos: [
        { t: 'Servicio gestionado', d: 'AWS se encarga de la infraestructura, los parches y la disponibilidad del servicio.' },
        { t: 'Servicio global', d: 'No está vinculado a una región concreta, como IAM o Route 53.' },
        { t: 'Amazon ECS', d: 'Orquestador de contenedores propio de AWS.' },
        { t: 'Amazon EKS', d: 'Servicio gestionado de Kubernetes.' },
        { t: 'Bucket', d: 'Contenedor de objetos de S3 con nombre único global y una región asociada.' },
        { t: 'HLS', d: 'Protocolo que sirve el vídeo en fragmentos de pocos segundos para adaptar calidad e idioma.' },
        { t: 'CDN', d: 'Red de servidores que cachea el contenido cerca de los usuarios; en AWS, CloudFront.' },
        { t: 'AWS Fargate', d: 'Motor que ejecuta contenedores sin que el cliente gestione servidores.' }
      ],
      quiz: [
        { p: '¿Qué servicio usarías para almacenar archivos compartidos a los que acceden simultáneamente varias instancias Linux?', op: ['Amazon EBS', 'Amazon EFS', 'Amazon S3 Glacier', 'Amazon ElastiCache'], ok: 1, e: 'EFS es un sistema de archivos elástico y compartido para Linux. EBS es un volumen de bloque para una sola instancia.' },
        { p: 'En el almacenamiento de objetos, ¿qué es un bucket?', op: ['Una carpeta dentro de un sistema de archivos Linux', 'El contenedor donde se guardan los objetos', 'El nombre único de cada objeto', 'Un tipo de cifrado de S3'], ok: 1, e: 'El bucket es el contenedor; la key es el nombre del objeto y los metadatos lo describen. No existen carpetas reales.' },
        { p: '¿Qué necesita como mínimo una web estática publicada en la nube?', op: ['Una base de datos relacional y un balanceador', 'Solo almacenamiento y, opcionalmente, una CDN', 'Un clúster de Kubernetes', 'Un servidor con GPU'], ok: 1, e: 'Una web estática no tiene lógica de servidor ni datos persistentes: basta con almacenar los archivos y servirlos, idealmente mediante una CDN.' },
        { p: '¿Cuál de estos servicios es global y no requiere elegir región?', op: ['Amazon EC2', 'Amazon RDS', 'AWS IAM', 'Amazon VPC'], ok: 2, e: 'IAM es un servicio global. EC2, RDS y VPC son regionales o de zona.' },
        { p: 'Una aplicación debe ejecutar código en respuesta a la subida de un archivo a S3, sin administrar servidores. ¿Qué servicio encaja mejor?', op: ['Amazon EC2 con Auto Scaling', 'AWS Lambda', 'Amazon Lightsail', 'AWS Elastic Beanstalk'], ok: 1, e: 'Lambda ejecuta código orientado a eventos sin servidores que administrar y se integra de forma nativa con S3.' }
      ]
    }
  ]
});
