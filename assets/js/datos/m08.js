/* Módulo 8 · Bases de datos */
(window.MODULOS = window.MODULOS || []).push({
  id: 'm8',
  numero: 8,
  titulo: 'Bases de datos',
  descripcion: 'Bases de datos relacionales gestionadas con Amazon RDS y Aurora, NoSQL con Amazon DynamoDB y analíticas a escala con Amazon Redshift.',
  duracion: '140 min',
  objetivo: 'Elegir el servicio de base de datos adecuado según el modelo de datos, el patrón de acceso y los requisitos de escala.',
  secciones: [
    {
      id: 'm8s1',
      titulo: 'Amazon RDS',
      resumen: 'Amazon Relational Database Service gestiona bases de datos relacionales en la nube: aprovisiona, aplica parches, hace copias de seguridad y ofrece alta disponibilidad con Multi-AZ.',
      objetivos: [
        'Explicar qué tareas automatiza RDS.',
        'Diferenciar Multi-AZ de las réplicas de lectura.',
        'Configurar copias de seguridad, cifrado y escalado.'
      ],
      bloques: [
        { t: 'p', c: '**Amazon Relational Database Service (RDS)** es el servicio de **bases de datos relacionales gestionadas** de AWS. Se elige el motor, la clase de instancia y el almacenamiento; AWS se ocupa de aprovisionar, aplicar parches, hacer copias y monitorizar.' },
        { t: 'h', c: 'Motores soportados' },
        { t: 'ul', c: [
          '**MySQL**, **MariaDB**, **PostgreSQL** (y **Amazon Aurora** en sus versiones compatibles).',
          '**Microsoft SQL Server** y **Oracle** (con modelos de licencia incluida o BYOL).',
          '**IBM Db2** en determinadas configuraciones.'
        ] },
        { t: 'h', c: 'Qué gestiona RDS y qué no' },
        { t: 'tabla', cab: ['AWS gestiona', 'El cliente gestiona'], filas: [
          ['Hardware, sistema operativo y parches del motor', 'El esquema, las tablas y los índices'],
          ['Copias de seguridad automáticas y snapshots', 'Las consultas y su rendimiento'],
          ['Conmutación por error en Multi-AZ', 'Los usuarios y permisos de la base de datos'],
          ['Monitorización con CloudWatch y registros', 'La configuración de parámetros'],
          ['Cifrado con KMS', 'El diseño de la aplicación y la seguridad de la red']
        ] },
        { t: 'h', c: 'Multi-AZ frente a réplicas de lectura' },
        { t: 'esquema', c: [
          { titulo: 'Instancia primaria', sub: 'Lectura y escritura' },
          { titulo: 'Réplica Multi-AZ', sub: 'Espera sincronizada' },
          { titulo: 'Réplicas de lectura', sub: 'Solo lectura, para escalar' }
        ] },
        { t: 'tabla', cab: ['Aspecto', 'Multi-AZ (alta disponibilidad)', 'Réplicas de lectura (escalado)'], filas: [
          ['Propósito', 'Disponibilidad ante fallos', 'Escalar lecturas y reducir latencia'],
          ['Réplica', 'Síncrona, en otra zona de disponibilidad', 'Asíncrona, hasta 15 réplicas'],
          ['Tráfico', 'La réplica no atiende tráfico normal', 'Las réplicas atienden consultas de lectura'],
          ['Conmutación', 'Automática ante un fallo (DNS)', 'Manual o con Route 53 en caso de fallo'],
          ['Coste', 'Doble instancia en la práctica', 'Coste por cada réplica adicional']
        ] },
        { t: 'nota', clase: 'examen', titulo: 'No las confundas', c: 'Multi-AZ es para **disponibilidad** (failover automático y transparente). Las réplicas de lectura son para **rendimiento** (repartir consultas SELECT). Aurora permite además réplicas con failover rápido.' },
        { t: 'h', c: 'Copias de seguridad y recuperación' },
        { t: 'ul', c: [
          '**Copias automáticas:** se activan al crear la instancia y permiten recuperación a un punto en el tiempo (PITR). Retención de 0 a 35 días.',
          '**Snapshots manuales:** se conservan hasta que se eliminan, incluso si se borra la instancia.',
          '**Restauración:** crea una instancia nueva; no se restaura sobre la existente.',
          '**Réplicas entre regiones:** copias de seguridad automáticas y snapshots se pueden replicar para recuperación ante desastres.',
          '**AWS Backup:** centraliza políticas y retención entre servicios.'
        ] },
        { t: 'h', c: 'Seguridad' },
        { t: 'ul', c: [
          'La instancia vive en una **VPC**, normalmente en subredes privadas, con un grupo de seguridad que limita el acceso.',
          '**Cifrado en reposo** con KMS: debe activarse al crear la instancia (para cifrar una existente hay que restaurar un snapshot cifrado).',
          '**Cifrado en tránsito** con TLS.',
          '**IAM** controla quién puede administrar la instancia; los usuarios de base de datos se gestionan con el motor o con IAM database authentication.',
          '**RDS Proxy** gestiona un grupo de conexiones y facilita el acceso desde Lambda.',
          '**Registros** exportados a CloudWatch Logs para auditoría y diagnóstico.'
        ] },
        { t: 'h', c: 'Escalado y rendimiento' },
        { t: 'ul', c: [
          '**Vertical:** cambiar la clase de instancia (requiere un breve reinicio, salvo algunos casos).',
          '**Horizontal de lecturas:** añadir réplicas de lectura.',
          '**Almacenamiento:** crece automáticamente con **autoscaling** hasta un límite configurado.',
          '**Aurora Serverless v2:** escala la capacidad de forma fina según la carga.',
          '**Performance Insights:** analiza la carga de la base de datos y detecta consultas lentas.'
        ] },
        { t: 'nota', clase: 'tip', titulo: 'RDS no es para todo', c: 'RDS no permite acceso al sistema operativo ni a la instancia subyacente. Si se necesita ese control total, se debe desplegar la base de datos en **EC2** o, mejor, reconsiderar si el requisito es realmente necesario.' }
      ],
      terminos: [
        { t: 'RDS', d: 'Servicio gestionado de bases de datos relacionales de AWS.' },
        { t: 'Multi-AZ', d: 'Despliegue con una réplica síncrona en otra zona para alta disponibilidad.' },
        { t: 'Réplica de lectura', d: 'Copia asíncrona que atiende consultas de solo lectura.' },
        { t: 'PITR', d: 'Recuperación a un punto en el tiempo dentro del periodo de retención.' },
        { t: 'RDS Proxy', d: 'Proxy gestionado que agrupa y reutiliza conexiones a la base de datos.' }
      ],
      quiz: [
        { p: '¿Cuál es el propósito principal de un despliegue Multi-AZ en Amazon RDS?', op: ['Escalar las consultas de lectura', 'Proporcionar alta disponibilidad con conmutación automática', 'Reducir el coste de almacenamiento', 'Acelerar las copias de seguridad'], ok: 1, e: 'Multi-AZ mantiene una réplica síncrona en otra zona y conmuta automáticamente ante un fallo.' },
        { p: '¿Cuál es el periodo máximo de retención de copias de seguridad automáticas en RDS?', op: ['7 días', '14 días', '35 días', 'Indefinido'], ok: 2, e: 'RDS permite retener copias automáticas entre 0 y 35 días para recuperación a un punto en el tiempo.' },
        { p: 'Una aplicación de solo lectura necesita repartir consultas entre varias instancias de base de datos. ¿Qué debe añadir?', op: ['Un despliegue Multi-AZ', 'Réplicas de lectura', 'Un snapshot manual', 'RDS Proxy'], ok: 1, e: 'Las réplicas de lectura sirven para escalar cargas de lectura; Multi-AZ es para disponibilidad.' }
      ]
    },
    {
      id: 'm8s2',
      titulo: 'Amazon DynamoDB',
      resumen: 'Amazon DynamoDB es una base de datos NoSQL clave-valor y de documentos, totalmente gestionada, con latencia de milisegundos a cualquier escala y modos de capacidad bajo demanda o aprovisionada.',
      objetivos: [
        'Explicar el modelo de tablas, elementos y claves de DynamoDB.',
        'Diferenciar los modos de capacidad y las clases de tabla.',
        'Conocer índices, streams y funciones avanzadas.'
      ],
      bloques: [
        { t: 'p', c: '**Amazon DynamoDB** es una base de datos **NoSQL** de tipo clave-valor y documentos, **totalmente gestionada**, que ofrece latencia de un solo dígito de milisegundos a cualquier escala. Es la elección habitual para carritos de compra, sesiones, catálogos, juegos y dispositivos IoT.' },
        { t: 'h', c: 'Modelo de datos' },
        { t: 'ul', c: [
          '**Tabla:** colección de elementos; no tiene esquema fijo para los atributos.',
          '**Elemento (item):** un registro identificado por su clave primaria.',
          '**Atributo:** par nombre-valor, anidado hasta 32 niveles.',
          '**Clave de partición:** obligatoria; determina en qué partición se almacena el elemento.',
          '**Clave de ordenación:** opcional; permite ordenar y consultar rangos dentro de una partición.',
          '**Índice secundario global (GSI):** clave distinta de la de la tabla, con su propia capacidad.',
          '**Índice secundario local (LSI):** misma clave de partición y otra de ordenación, creado con la tabla.'
        ] },
        { t: 'nota', clase: 'examen', titulo: 'Clave primaria', c: 'La clave primaria puede ser **solo partición** o **partición + ordenación**. Elegir bien la clave de partición es crucial: una clave con poca cardinalidad crea «particiones calientes» y limita el rendimiento.' },
        { t: 'h', c: 'Modos de capacidad' },
        { t: 'tabla', cab: ['Modo', 'Funcionamiento', 'Cuándo usarlo'], filas: [
          ['Bajo demanda (On-Demand)', 'Se paga por petición; escala automáticamente', 'Tráfico impredecible o picos repentinos'],
          ['Aprovisionado', 'Se definen RCU y WCU; opcional auto scaling', 'Tráfico predecible y estable'],
          ['Reservas de capacidad', 'Compromiso de 1 o 3 años', 'Uso previsible con ahorro de coste']
        ] },
        { t: 'p', c: 'Las unidades de capacidad son **RCU** (lecturas) y **WCU** (escrituras). Una lectura eventualmente consistente de 4 KB consume 0,5 RCU; una escritura de 1 KB consume 1 WCU. Las lecturas **fuertemente consistentes** consumen el doble.' },
        { t: 'h', c: 'Funciones avanzadas' },
        { t: 'tabla', cab: ['Función', 'Qué aporta'], filas: [
          ['DynamoDB Streams', 'Registro ordenado de cambios que dispara Lambda u otros procesos'],
          ['DynamoDB Accelerator (DAX)', 'Caché en memoria con latencia de microsegundos para lecturas'],
          ['Global Tables', 'Réplicas activas-activas en varias regiones'],
          ['TTL', 'Elimina automáticamente elementos caducados'],
          ['Transacciones', 'Operaciones atómicas sobre varios elementos'],
          ['Point-in-time recovery', 'Restauración a un momento concreto de los últimos 35 días'],
          ['Backup y restore', 'Copias completas sin impacto en el rendimiento'],
          ['Export to S3', 'Exportación de datos para análisis sin consumir capacidad']
        ] },
        { t: 'h', c: 'Seguridad y límites' },
        { t: 'ul', c: [
          'Cifrado en reposo por defecto con claves de AWS o del cliente (KMS).',
          'Control de acceso con IAM y **políticas de nivel fino** que limitan qué elementos puede leer o escribir cada usuario.',
          '**VPC Endpoint** para acceso privado desde la VPC sin salir a internet.',
          '**CloudTrail** para auditoría de llamadas a la API.',
          'Un elemento puede pesar hasta **400 KB**; los elementos grandes se guardan en S3 y en DynamoDB solo la referencia.'
        ] },
        { t: 'h', c: 'DynamoDB frente a RDS' },
        { t: 'tabla', cab: ['Criterio', 'DynamoDB', 'Amazon RDS'], filas: [
          ['Modelo', 'Clave-valor y documentos', 'Relacional con SQL'],
          ['Esquema', 'Flexible', 'Definido'],
          ['Escalado', 'Horizontal automático y masivo', 'Vertical y réplicas de lectura'],
          ['Consultas', 'Por clave; análisis con otros servicios', 'SQL completo con JOIN y agregaciones'],
          ['Latencia', 'Milisegundos de un dígito a cualquier escala', 'Depende del tamaño y la carga'],
          ['Uso típico', 'Sesiones, carritos, IoT, perfiles', 'ERP, CRM, aplicaciones con relaciones complejas']
        ] },
        { t: 'nota', clase: 'tip', titulo: 'Regla de decisión', c: 'Si la aplicación necesita **JOIN, transacciones complejas y SQL**, RDS o Aurora. Si necesita **escala masiva con acceso por clave y latencia mínima**, DynamoDB.' }
      ],
      terminos: [
        { t: 'DynamoDB', d: 'Base de datos NoSQL gestionada de clave-valor y documentos.' },
        { t: 'Clave de partición', d: 'Atributo que determina la partición donde se almacena un elemento.' },
        { t: 'RCU / WCU', d: 'Unidades de capacidad de lectura y escritura en el modo aprovisionado.' },
        { t: 'DAX', d: 'Caché en memoria para DynamoDB con latencia de microsegundos.' },
        { t: 'Global Tables', d: 'Replicación activa-activa entre varias regiones.' },
        { t: 'GSI', d: 'Índice secundario global con una clave distinta a la de la tabla.' }
      ],
      quiz: [
        { p: '¿Qué componente determina dónde se almacena físicamente un elemento en DynamoDB?', op: ['La clave de ordenación', 'La clave de partición', 'El índice local', 'El atributo de TTL'], ok: 1, e: 'La clave de partición determina la partición física donde se guarda el elemento.' },
        { p: 'Una aplicación tiene picos de tráfico impredecibles y no quiere aprovisionar capacidad. ¿Qué modo de capacidad debe usar en DynamoDB?', op: ['Capacidad aprovisionada', 'Bajo demanda (on-demand)', 'Reserva de capacidad', 'Provisioned con auto scaling'], ok: 1, e: 'El modo bajo demanda escala automáticamente y cobra por petición, ideal para tráfico impredecible.' },
        { p: '¿Qué servicio proporciona una caché en memoria para reducir la latencia de lectura de DynamoDB?', op: ['Amazon ElastiCache', 'DynamoDB Accelerator (DAX)', 'DynamoDB Streams', 'AWS Glue'], ok: 1, e: 'DAX es una caché en memoria específica para DynamoDB con latencia de microsegundos.' }
      ]
    },
    {
      id: 'm8s3',
      titulo: 'Amazon Redshift',
      resumen: 'Amazon Redshift es un almacén de datos columnar y masivamente paralelo para analítica a gran escala, con Redshift Spectrum para consultar datos en S3.',
      objetivos: [
        'Explicar qué es un data warehouse y en qué se diferencia de una base de datos transaccional.',
        'Describir el almacenamiento columnar y el procesamiento paralelo.',
        'Reconocer Redshift Spectrum y las opciones de despliegue.'
      ],
      bloques: [
        { t: 'p', c: '**Amazon Redshift** es un **almacén de datos (data warehouse)** gestionado, pensado para **consultas analíticas** sobre grandes volúmenes de datos. Mientras una base de datos transaccional (OLTP) procesa muchas operaciones pequeñas, un data warehouse (OLAP) ejecuta pocas consultas que leen millones de filas y agregan resultados.' },
        { t: 'h', c: 'Cómo consigue rendimiento' },
        { t: 'ul', c: [
          '**Almacenamiento columnar:** guarda los datos por columnas, de modo que una consulta lee solo las que necesita y comprime mejor.',
          '**Procesamiento masivamente paralelo (MPP):** distribuye los datos y el trabajo entre varios nodos.',
          '**Compresión** con codificación por columna.',
          '**Distribución y ordenación** de tablas para minimizar el movimiento de datos en los JOIN.',
          '**Result caching** y **concurrency scaling** para atender picos de consultas.',
          '**AQUA** (Advanced Query Accelerator) acelera ciertas operaciones en hardware especializado.'
        ] },
        { t: 'h', c: 'Arquitectura' },
        { t: 'esquema', c: [
          { titulo: 'Nodo líder', sub: 'Planifica y coordina' },
          { titulo: 'Nodos de cómputo', sub: 'Ejecutan en paralelo' },
          { titulo: 'Amazon S3', sub: 'Datos y Spectrum' }
        ] },
        { t: 'p', c: 'En los clústeres **RA3**, el almacenamiento se separa del cómputo: los datos residen en un espacio gestionado respaldado por S3 y se puede escalar cada parte por separado. **Redshift Serverless** elimina la gestión del clúster y factura por capacidad utilizada, ideal para cargas intermitentes.' },
        { t: 'h', c: 'Redshift Spectrum' },
        { t: 'p', c: '**Redshift Spectrum** permite consultar directamente datos guardados en **Amazon S3** (en formato abierto como Parquet) sin cargarlos en el clúster. Así se combina el almacenamiento barato de S3 con la potencia de Redshift, y se evita duplicar datos.' },
        { t: 'h', c: 'Integración con el ecosistema de datos' },
        { t: 'ul', c: [
          '**AWS Glue:** catálogo de datos y trabajos ETL.',
          '**Amazon Kinesis:** ingesta en streaming hacia Redshift.',
          '**Amazon QuickSight:** visualización e informes.',
          '**Redshift Data API:** consultas desde aplicaciones sin gestionar conexiones.',
          '**Federated queries:** consulta datos de RDS o Aurora desde Redshift.'
        ] },
        { t: 'h', c: 'Redshift frente a RDS' },
        { t: 'tabla', cab: ['Criterio', 'Amazon RDS', 'Amazon Redshift'], filas: [
          ['Carga', 'OLTP: transacciones', 'OLAP: analítica'],
          ['Modelo', 'Filas (row store)', 'Columnas (column store)'],
          ['Consultas', 'Muchas y pequeñas', 'Pocas y muy grandes'],
          ['Datos', 'Gigabytes o terabytes', 'Terabytes o petabytes'],
          ['Uso', 'Aplicación de negocio', 'Business intelligence e informes']
        ] },
        { t: 'nota', clase: 'examen', titulo: 'Asociación', c: '«Data warehouse», «analítica», «consultas sobre petabytes» → **Redshift**. «Base de datos relacional para una aplicación» → **RDS o Aurora**. «NoSQL a escala» → **DynamoDB**.' }
      ],
      terminos: [
        { t: 'Data warehouse', d: 'Almacén de datos optimizado para consultas analíticas y agregaciones.' },
        { t: 'OLTP / OLAP', d: 'Procesamiento transaccional (operación) frente a analítico (informes).' },
        { t: 'MPP', d: 'Procesamiento masivamente paralelo entre nodos.' },
        { t: 'Redshift Spectrum', d: 'Consulta de datos en S3 directamente desde Redshift.' },
        { t: 'RA3', d: 'Familia de clústeres que separa almacenamiento y cómputo.' },
        { t: 'Redshift Serverless', d: 'Modo sin clúster que factura por capacidad utilizada.' }
      ],
      quiz: [
        { p: '¿Para qué tipo de carga de trabajo está optimizado Amazon Redshift?', op: ['Transacciones OLTP de alta concurrencia', 'Consultas analíticas sobre grandes volúmenes de datos', 'Almacenamiento de objetos', 'Caché en memoria'], ok: 1, e: 'Redshift es un data warehouse columnar y MPP, diseñado para analítica (OLAP).' },
        { p: '¿Qué permite Redshift Spectrum?', op: ['Consultar datos almacenados en Amazon S3 sin cargarlos en el clúster', 'Cifrar los datos del clúster', 'Ejecutar funciones Lambda', 'Gestionar usuarios de IAM'], ok: 0, e: 'Spectrum permite consultar datos de S3 con SQL desde Redshift, combinando almacenamiento barato y cómputo.' },
        { p: '¿Qué familia de Redshift separa el almacenamiento del cómputo?', op: ['DC2', 'DS2', 'RA3', 'M5'], ok: 2, e: 'Los clústeres RA3 separan almacenamiento (respaldado por S3) y cómputo, escalables de forma independiente.' }
      ]
    },
    {
      id: 'm8s4',
      titulo: 'Amazon Aurora',
      resumen: 'Amazon Aurora es una base de datos relacional compatible con MySQL y PostgreSQL, con almacenamiento distribuido en seis copias y tres zonas de disponibilidad, y hasta 15 réplicas de lectura.',
      objetivos: [
        'Explicar las ventajas de Aurora frente a RDS para MySQL y PostgreSQL.',
        'Describir su almacenamiento distribuido y sus réplicas.',
        'Conocer Aurora Serverless y Aurora Global Database.'
      ],
      bloques: [
        { t: 'p', c: '**Amazon Aurora** es una base de datos relacional creada por AWS para la nube, **compatible con MySQL y PostgreSQL**. Combina el rendimiento de las bases de datos comerciales con el coste y la simplicidad de las de código abierto: según AWS, ofrece hasta cinco veces el rendimiento de MySQL estándar y tres veces el de PostgreSQL.' },
        { t: 'h', c: 'Almacenamiento distribuido' },
        { t: 'ul', c: [
          'Los datos se guardan en **seis copias** repartidas en **tres zonas de disponibilidad**.',
          'El almacenamiento crece automáticamente en incrementos de 10 GB, hasta **128 TiB**.',
          'La recuperación ante fallos es rápida porque cualquier réplica puede convertirse en primaria.',
          'No hay que aprovisionar almacenamiento ni reconstruir réplicas: comparten el mismo volumen lógico.',
          '**Backtrack** permite retroceder la base de datos a un punto anterior sin restaurar una copia.'
        ] },
        { t: 'esquema', c: [
          { titulo: 'Instancia de escritura', sub: 'Endpoint del clúster' },
          { titulo: 'Réplicas de lectura', sub: 'Hasta 15 · Endpoint de lectura' },
          { titulo: 'Almacenamiento', sub: '6 copias · 3 AZ · 128 TiB' }
        ] },
        { t: 'h', c: 'Alta disponibilidad y escalado' },
        { t: 'tabla', cab: ['Función', 'Descripción'], filas: [
          ['Réplicas de lectura', 'Hasta 15, con latencia baja y failover prioritario'],
          ['Endpoint de escritura', 'Punto único de conexión que apunta a la instancia primaria'],
          ['Endpoint de lectura', 'Balancea las consultas de lectura entre réplicas'],
          ['Réplicas personalizadas', 'Instancias de distinta clase para cargas concretas'],
          ['Aurora Global Database', 'Réplicas en otras regiones con latencia inferior a un segundo'],
          ['Aurora Serverless v2', 'Escala la capacidad en incrementos finos según la carga'],
          ['RDS Proxy', 'Gestión de conexiones para aplicaciones con muchas conexiones cortas'],
          ['Parallel Query', 'Delega parte del procesamiento al almacenamiento']
        ] },
        { t: 'h', c: 'Aurora Serverless' },
        { t: 'p', c: '**Aurora Serverless v2** ajusta automáticamente la capacidad en unidades ACU (Aurora Capacity Units) según la demanda, sin aprovisionar instancias. Es ideal para aplicaciones con tráfico variable, entornos de desarrollo o cargas que se usan solo unas horas al día. Se puede mezclar con instancias provisionadas en el mismo clúster.' },
        { t: 'h', c: 'Aurora frente a RDS' },
        { t: 'tabla', cab: ['Criterio', 'RDS para MySQL/PostgreSQL', 'Amazon Aurora'], filas: [
          ['Rendimiento', 'Bueno', 'Hasta 5× MySQL y 3× PostgreSQL'],
          ['Almacenamiento', 'Aprovisionado, escala manualmente', 'Automático hasta 128 TiB'],
          ['Réplicas', 'Hasta 15 (según motor), asíncronas', 'Hasta 15, con failover en segundos'],
          ['Copia de datos', 'Replicación del motor', '6 copias en 3 AZ'],
          ['Coste', 'Menor en cargas pequeñas', 'Mayor por hora, compensado por rendimiento'],
          ['Uso típico', 'Aplicaciones estándar', 'Aplicaciones críticas de alto rendimiento']
        ] },
        { t: 'nota', clase: 'examen', titulo: 'Frase clave', c: 'Aurora = **compatible con MySQL y PostgreSQL** + **almacenamiento distribuido en 6 copias y 3 AZ** + **hasta 15 réplicas**. Si la pregunta menciona «compatible con MySQL» y «alto rendimiento gestionado», la respuesta es Aurora.' },
        { t: 'h', c: 'Cuándo elegir Aurora' },
        { t: 'ul', c: [
          'Aplicaciones SaaS con muchos usuarios y lectura intensiva.',
          'Sistemas que necesitan alta disponibilidad sin administración compleja.',
          'Cargas variables que se benefician de Aurora Serverless v2.',
          'Aplicaciones globales que necesitan lecturas locales con Global Database.',
          'Migraciones desde MySQL o PostgreSQL que buscan más rendimiento sin cambiar el motor.'
        ] }
      ],
      terminos: [
        { t: 'Amazon Aurora', d: 'Base de datos relacional gestionada compatible con MySQL y PostgreSQL, de alto rendimiento.' },
        { t: 'ACU', d: 'Unidad de capacidad de Aurora Serverless que se ajusta automáticamente.' },
        { t: 'Global Database', d: 'Réplicas de Aurora en otras regiones con replicación inferior a un segundo.' },
        { t: 'Backtrack', d: 'Retroceso de la base de datos a un punto anterior sin restaurar una copia.' },
        { t: 'Endpoint de lectura', d: 'Punto de conexión que reparte las consultas entre las réplicas.' }
      ],
      quiz: [
        { p: '¿En cuántas copias y zonas de disponibilidad distribuye Aurora el almacenamiento?', op: ['3 copias en 1 zona', '6 copias en 3 zonas', '2 copias en 2 zonas', '4 copias en 2 zonas'], ok: 1, e: 'Aurora mantiene seis copias de los datos repartidas en tres zonas de disponibilidad.' },
        { p: '¿Con qué motores es compatible Amazon Aurora?', op: ['Oracle y SQL Server', 'MySQL y PostgreSQL', 'MongoDB y Cassandra', 'Redis y Memcached'], ok: 1, e: 'Aurora es compatible con MySQL y PostgreSQL, no con Oracle ni SQL Server.' },
        { p: 'Una aplicación tiene tráfico muy variable y quiere que la base de datos escale automáticamente sin aprovisionar instancias. ¿Qué debe usar?', op: ['Aurora Serverless v2', 'RDS Multi-AZ', 'DynamoDB provisionado', 'Redshift RA3'], ok: 0, e: 'Aurora Serverless v2 ajusta la capacidad en ACU según la demanda sin aprovisionar instancias.' }
      ]
    }
  ]
});
