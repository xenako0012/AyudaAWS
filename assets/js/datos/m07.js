/* Módulo 7 · Almacenamiento */
(window.MODULOS = window.MODULOS || []).push({
  id: 'm7',
  numero: 7,
  titulo: 'Almacenamiento',
  descripcion: 'Almacenamiento en bloques con Amazon EBS, en objetos con Amazon S3, en archivos con Amazon EFS y en archivo a largo plazo con Amazon S3 Glacier.',
  duracion: '130 min',
  objetivo: 'Diferenciar los servicios de almacenamiento de AWS y elegir el más adecuado según el tipo de datos y el patrón de acceso.',
  secciones: [
    {
      id: 'm7s1',
      titulo: 'AWS EBS',
      resumen: 'Amazon Elastic Block Store ofrece volúmenes de bloque persistentes y de red para instancias EC2, con tipos optimizados para IOPS, rendimiento o coste, e instantáneas incrementales.',
      objetivos: [
        'Explicar qué es un volumen EBS y sus límites.',
        'Elegir el tipo de volumen adecuado según la carga.',
        'Describir instantáneas, cifrado y redimensionado.'
      ],
      bloques: [
        { t: 'p', c: '**Amazon Elastic Block Store (EBS)** proporciona **volúmenes de almacenamiento en bloques** que se adjuntan a instancias EC2 como si fueran discos duros. Es el almacenamiento del sistema operativo y de las bases de datos autogestionadas: persistente, replicado dentro de su zona de disponibilidad y con copias de seguridad mediante instantáneas.' },
        { t: 'h', c: 'Características esenciales' },
        { t: 'ul', c: [
          'Un volumen EBS está **limitado a una zona de disponibilidad**: solo se puede adjuntar a instancias de esa AZ.',
          'Se puede adjuntar a **una instancia** a la vez (salvo volúmenes io1/io2 con Multi-Attach).',
          'Persiste aunque la instancia se detenga o se termine (según `DeleteOnTermination`).',
          'Se puede **redimensionar en caliente** y modificar el tipo sin detener la instancia.',
          'Se factura por GB aprovisionado al mes, más IOPS y rendimiento en los tipos que lo permiten.'
        ] },
        { t: 'nota', clase: 'examen', titulo: 'EBS es de bloque, no de archivos', c: 'Dos instancias **no** pueden compartir un volumen EBS normal. Si necesitas archivos compartidos, la respuesta es **Amazon EFS**; si necesitas objetos, **Amazon S3**.' },
        { t: 'h', c: 'Tipos de volumen' },
        { t: 'tabla', cab: ['Tipo', 'Categoría', 'Uso recomendado', 'Notas'], filas: [
          ['gp3', 'SSD de uso general', 'Sistema operativo, aplicaciones, bases de datos pequeñas', 'Base 3.000 IOPS y 125 MB/s, configurables por separado'],
          ['gp2', 'SSD de uso general', 'Cargas heredadas', 'Las IOPS escalan con el tamaño; conviene migrar a gp3'],
          ['io2 Block Express', 'SSD provisionado', 'Bases de datos críticas con latencia muy baja', 'Hasta 256.000 IOPS y alta durabilidad'],
          ['io1', 'SSD provisionado', 'Cargas que necesitan IOPS garantizadas', 'Soporta Multi-Attach'],
          ['st1', 'HDD con rendimiento', 'Big data, registros, procesamiento secuencial', 'No sirve para cargas aleatorias'],
          ['sc1', 'HDD frío', 'Datos de acceso infrecuente', 'El más económico por GB'],
          ['standard', 'Magnético (antiguo)', 'Compatibilidad', 'Evitar en nuevas cargas']
        ] },
        { t: 'p', c: 'Regla práctica: **gp3** para casi todo, **io2** cuando se necesita un rendimiento extremo y garantizado, **st1/sc1** para datos secuenciales y fríos.' },
        { t: 'h', c: 'Instantáneas' },
        { t: 'ul', c: [
          'Son **copias incrementales** almacenadas en Amazon S3; solo se guardan los bloques modificados.',
          'Permiten crear un volumen nuevo en **cualquier zona de disponibilidad** o región (copiando la instantánea).',
          'Se pueden programar con **Amazon Data Lifecycle Manager** o con políticas de AWS Backup.',
          'Son la base de las AMI respaldadas por EBS.',
          'Se pueden compartir con otras cuentas y cifrar con KMS.'
        ] },
        { t: 'h', c: 'Cifrado' },
        { t: 'p', c: 'El cifrado de EBS usa **AWS KMS** y se aplica al volumen, a sus instantáneas y a los volúmenes creados a partir de ellas. Se puede activar el **cifrado por defecto** en cada región para que todo volumen nuevo nazca cifrado. El cifrado ocurre en el hipervisor, sin impacto apreciable en el rendimiento.' },
        { t: 'h', c: 'Buenas prácticas' },
        { t: 'ol', c: [
          'Activar el **cifrado por defecto** y exigirlo con políticas de IAM o AWS Config.',
          'Automatizar **instantáneas** y probar la restauración.',
          'Usar **gp3** y aprovisionar IOPS solo cuando haga falta.',
          'Etiquetar volúmenes e instantáneas para controlar costes.',
          'Eliminar volúmenes huérfanos y políticas de retención de instantáneas.',
          'Separar el volumen del sistema operativo del de datos para poder restaurar por separado.'
        ] }
      ],
      terminos: [
        { t: 'EBS', d: 'Almacenamiento en bloques persistente para instancias EC2, ligado a una zona de disponibilidad.' },
        { t: 'IOPS', d: 'Operaciones de entrada/salida por segundo que puede atender un volumen.' },
        { t: 'Instantánea', d: 'Copia incremental de un volumen almacenada en Amazon S3.' },
        { t: 'gp3', d: 'Tipo de volumen SSD de uso general con IOPS y rendimiento configurables.' },
        { t: 'Multi-Attach', d: 'Función que permite adjuntar un volumen io1/io2 a varias instancias a la vez.' }
      ],
      quiz: [
        { p: '¿A cuántas zonas de disponibilidad puede estar asociado un volumen EBS?', op: ['A todas las de la región', 'A una sola', 'A dos como mínimo', 'A ninguna'], ok: 1, e: 'Un volumen EBS pertenece a una única zona de disponibilidad; para otra zona se restaura desde una instantánea.' },
        { p: '¿Qué tipo de volumen EBS se recomienda para una base de datos que necesita IOPS garantizadas y muy bajas latencias?', op: ['sc1', 'st1', 'gp2', 'io2'], ok: 3, e: 'Los volúmenes SSD provisionados io2 ofrecen IOPS garantizadas y altas prestaciones para bases de datos críticas.' },
        { p: '¿Qué son las instantáneas de EBS?', op: ['Copias completas diarias que ocupan el mismo espacio que el volumen', 'Copias incrementales almacenadas en Amazon S3', 'Volúmenes temporales en la memoria', 'Archivos comprimidos en el instance store'], ok: 1, e: 'Las instantáneas son incrementales: solo almacenan los bloques que han cambiado desde la anterior, en S3.' }
      ]
    },
    {
      id: 'm7s2',
      titulo: 'AWS S3',
      resumen: 'Amazon Simple Storage Service almacena objetos en buckets con una durabilidad del 99,999999999 %, ofrece varias clases de almacenamiento y múltiples mecanismos de seguridad y ciclo de vida.',
      objetivos: [
        'Explicar el modelo de buckets y objetos de S3.',
        'Elegir la clase de almacenamiento según el patrón de acceso.',
        'Configurar seguridad, versionado y ciclo de vida.'
      ],
      bloques: [
        { t: 'p', c: '**Amazon Simple Storage Service (S3)** es el servicio de **almacenamiento de objetos** de AWS. Un objeto es un archivo con sus metadatos; se guarda en un **bucket** y se identifica por una **clave**. No hay sistema de archivos ni jerarquía real: las «carpetas» son prefijos en la clave.' },
        { t: 'h', c: 'Conceptos básicos' },
        { t: 'ul', c: [
          '**Bucket:** contenedor de objetos con un nombre **único en todo el mundo** y asociado a una región.',
          '**Objeto:** datos más metadatos, de hasta **5 TB** (carga única máxima de 5 GB; para más se usa multipart upload).',
          '**Clave:** nombre o ruta del objeto, por ejemplo `imagenes/2025/foto.jpg`.',
          '**Durabilidad:** 99,999999999 % (once nueves).',
          '**Disponibilidad:** 99,99 % en la clase estándar.',
          '**Consistencia:** lectura después de escritura fuerte para objetos nuevos y sobrescritos.'
        ] },
        { t: 'nota', clase: 'examen', titulo: 'Durabilidad frente a disponibilidad', c: 'La durabilidad del 99,999999999 % significa que perder un objeto es estadísticamente casi imposible. La disponibilidad del 99,99 % se refiere a que el servicio responda. No son lo mismo.' },
        { t: 'h', c: 'Clases de almacenamiento' },
        { t: 'tabla', cab: ['Clase', 'Uso', 'Recuperación'], filas: [
          ['S3 Standard', 'Datos de acceso frecuente', 'Instantánea'],
          ['S3 Intelligent-Tiering', 'Patrón de acceso desconocido o cambiante', 'Instantánea; mueve automáticamente entre niveles'],
          ['S3 Standard-IA', 'Acceso poco frecuente, pero rápido', 'Instantánea'],
          ['S3 One Zone-IA', 'Datos poco frecuentes que se pueden recrear', 'Instantánea; una sola AZ'],
          ['S3 Express One Zone', 'Cargas de altísimo rendimiento y latencia mínima', 'Instantánea; una sola AZ'],
          ['S3 Glacier Instant Retrieval', 'Archivo con acceso ocasional en milisegundos', 'Instantánea'],
          ['S3 Glacier Flexible Retrieval', 'Archivo con acceso en minutos u horas', '1 a 12 horas'],
          ['S3 Glacier Deep Archive', 'Archivo a largo plazo, retención legal', '12 a 48 horas']
        ] },
        { t: 'p', c: 'Cuanto más fría es la clase, menor es el coste de almacenamiento y mayores son el coste de recuperación y la latencia. Existe un **periodo mínimo de facturación** (30 días en IA, 90 en Glacier Flexible, 180 en Deep Archive): cambiar de clase constantemente sale caro.' },
        { t: 'h', c: 'Versionado y ciclo de vida' },
        { t: 'ul', c: [
          '**Versionado:** conserva todas las versiones de un objeto. Protege frente a borrados accidentales y es requisito para **MFA Delete**.',
          '**Ciclo de vida:** reglas que transicionan objetos entre clases o los eliminan tras un número de días.',
          '**Reglas de expiración:** eliminan versiones antiguas o cargas incompletas (multipart).',
          '**S3 Object Lock:** inmutabilidad WORM con retención legal o por tiempo.',
          '**Replicación:** SRR (misma región) y CRR (entre regiones) con replicación de versiones y conmutación por error.'
        ] },
        { t: 'nota', clase: 'tip', titulo: 'Patrón habitual', c: 'Los datos se suben a **S3 Standard** y, con una regla de ciclo de vida, pasan a **Standard-IA** a los 30 días, a **Glacier Instant Retrieval** a los 90 y a **Deep Archive** al año.' },
        { t: 'h', c: 'Seguridad y control de acceso' },
        { t: 'tabla', cab: ['Mecanismo', 'Función'], filas: [
          ['Block Public Access', 'Bloquea el acceso público a nivel de cuenta y de bucket (activado por defecto en cuentas nuevas)'],
          ['Políticas de bucket', 'Definen quién puede hacer qué sobre el bucket y sus objetos'],
          ['Políticas de IAM', 'Conceden permisos a usuarios y roles'],
          ['ACL', 'Mecanismo heredado de permisos por objeto; AWS recomienda no usarlo'],
          ['Puntos de acceso', 'Políticas y nombres de red específicos para aplicaciones'],
          ['Cifrado', 'SSE-S3, SSE-KMS, SSE-C o cifrado del lado del cliente; TLS en tránsito'],
          ['URL prefirmada', 'Enlace temporal con permisos para acceder a un objeto privado'],
          ['Registro y auditoría', 'CloudTrail para llamadas a la API y Access Analyzer para accesos externos']
        ] },
        { t: 'h', c: 'Otras funciones' },
        { t: 'ul', c: [
          '**Alojamiento de sitios web estáticos:** sirve HTML, CSS y JavaScript directamente desde el bucket (con CloudFront delante para HTTPS y caché).',
          '**Notificaciones de eventos:** dispara Lambda, SQS o SNS al crear o borrar objetos.',
          '**S3 Transfer Acceleration:** acelera cargas usando ubicaciones de borde.',
          '**S3 Select:** consulta con SQL un subconjunto de un objeto CSV, JSON o Parquet.',
          '**S3 Batch Operations:** ejecuta operaciones masivas sobre millones de objetos.',
          '**S3 Storage Lens:** analiza el uso y las métricas de almacenamiento.',
          '**Access Points y Object Lambda:** políticas por aplicación y transformación de objetos al vuelo.'
        ] },
        { t: 'h', c: 'Precios' },
        { t: 'p', c: 'Se paga por **GB almacenado al mes**, por **número y tipo de peticiones** y por **transferencia de datos saliente**. La entrada de datos es gratuita. Las clases frías añaden un coste de recuperación y un periodo mínimo de almacenamiento. Las reglas de ciclo de vida y el análisis con S3 Storage Lens son las mejores herramientas para controlar el gasto.' }
      ],
      terminos: [
        { t: 'Bucket', d: 'Contenedor de objetos de S3 con nombre único global y región asociada.' },
        { t: 'Objeto', d: 'Archivo más metadatos almacenado en un bucket de S3.' },
        { t: 'Durabilidad', d: 'Probabilidad de conservar los datos; en S3 es de 99,999999999 %.' },
        { t: 'URL prefirmada', d: 'Enlace temporal que concede acceso a un objeto privado.' },
        { t: 'Ciclo de vida', d: 'Regla que mueve o elimina objetos automáticamente según su antigüedad.' },
        { t: 'CRR', d: 'Replicación entre regiones de objetos de S3.' }
      ],
      quiz: [
        { p: '¿Cuál es la durabilidad de los objetos almacenados en Amazon S3?', op: ['99,9 %', '99,99 %', '99,999999999 %', '100 % garantizado'], ok: 2, e: 'S3 está diseñado para once nueves de durabilidad (99,999999999 %).' },
        { p: 'Una empresa no conoce el patrón de acceso de sus datos y quiere optimizar el coste automáticamente. ¿Qué clase de almacenamiento debe usar?', op: ['S3 Standard', 'S3 Intelligent-Tiering', 'S3 One Zone-IA', 'S3 Glacier Deep Archive'], ok: 1, e: 'Intelligent-Tiering mueve automáticamente los objetos entre niveles según su patrón de acceso.' },
        { p: '¿Qué función permite compartir un objeto privado durante un tiempo limitado?', op: ['Una política de bucket pública', 'Una URL prefirmada', 'Un punto de acceso', 'S3 Transfer Acceleration'], ok: 1, e: 'Las URL prefirmadas conceden acceso temporal a un objeto sin hacerlo público.' }
      ]
    },
    {
      id: 'm7s3',
      titulo: 'AWS EFS',
      resumen: 'Amazon Elastic File System es un sistema de archivos NFS elástico y compartido, que crece automáticamente y se puede montar en varias instancias y zonas de disponibilidad.',
      objetivos: [
        'Explicar qué es un sistema de archivos compartido y cuándo usarlo.',
        'Distinguir los modos de rendimiento y las clases de almacenamiento de EFS.',
        'Comparar EBS, EFS y S3.'
      ],
      bloques: [
        { t: 'p', c: '**Amazon Elastic File System (EFS)** es un **sistema de archivos de red (NFS)** totalmente gestionado y **elástico**: crece y se reduce automáticamente según los datos almacenados, sin aprovisionar capacidad. Varias instancias Linux, contenedores o funciones Lambda pueden montarlo a la vez.' },
        { t: 'h', c: 'Características' },
        { t: 'ul', c: [
          'Compatible con **NFS versión 4.1** (Linux; no es para Windows, que usaría FSx for Windows).',
          'Se monta en **varias instancias simultáneamente**, incluso en distintas zonas de disponibilidad.',
          'Es **regional** y **multi-AZ** en su clase estándar: los datos se replican entre zonas.',
          'Escala automáticamente de gigabytes a petabytes sin intervención.',
          'Se paga solo por el almacenamiento usado, sin capacidad aprovisionada.',
          'Se integra con IAM, grupos de seguridad y AWS Backup.'
        ] },
        { t: 'h', c: 'Modos de rendimiento' },
        { t: 'tabla', cab: ['Modo', 'Latencia', 'Uso'], filas: [
          ['General Purpose', 'Baja latencia por operación', 'Recomendado para la mayoría de cargas, incluidos servidores web y CMS'],
          ['Max I/O', 'Mayor latencia, más paralelismo', 'Cargas con miles de instancias y operaciones intensivas']
        ] },
        { t: 'h', c: 'Modos de rendimiento (throughput)' },
        { t: 'ul', c: [
          '**Elástico:** ajusta automáticamente el rendimiento a la carga; ideal para cargas variables.',
          '**Bursting:** escala con el tamaño del sistema de archivos y acumula créditos.',
          '**Provisioned:** se especifica un rendimiento fijo independientemente del tamaño.'
        ] },
        { t: 'h', c: 'Clases de almacenamiento' },
        { t: 'tabla', cab: ['Clase', 'Zonas', 'Uso'], filas: [
          ['EFS Standard', 'Varias AZ', 'Datos de acceso frecuente que necesitan alta disponibilidad'],
          ['EFS Standard-IA', 'Varias AZ', 'Datos de acceso poco frecuente'],
          ['EFS One Zone', 'Una AZ', 'Datos que se pueden recrear, con menor coste'],
          ['EFS One Zone-IA', 'Una AZ', 'Datos fríos y recreables']
        ] },
        { t: 'p', c: 'Las **políticas de ciclo de vida** mueven automáticamente los archivos no accedidos a las clases IA, lo que reduce el coste sin cambiar la aplicación.' },
        { t: 'h', c: 'Arquitectura típica' },
        { t: 'ol', c: [
          'Se crea un sistema de archivos EFS en la VPC.',
          'Se crean **destinos de montaje (mount targets)** en las subredes de cada zona de disponibilidad.',
          'Se configura un **grupo de seguridad** que permita el puerto **2049 (NFS)** desde las instancias.',
          'Las instancias montan el sistema con el comando `mount -t nfs4 ...` o con el ayudante de EFS.',
          'Se activa la copia de seguridad con AWS Backup y las políticas de ciclo de vida.'
        ] },
        { t: 'h', c: 'EBS, EFS y S3: cuándo usar cada uno' },
        { t: 'tabla', cab: ['Criterio', 'EBS', 'EFS', 'S3'], filas: [
          ['Tipo', 'Bloque', 'Archivos (NFS)', 'Objetos'],
          ['Acceso', 'Una instancia (o Multi-Attach)', 'Muchas instancias a la vez', 'Cualquier cliente por HTTP'],
          ['Alcance', 'Una zona de disponibilidad', 'Regional y multi-AZ', 'Regional'],
          ['Capacidad', 'Aprovisionada', 'Elástica', 'Ilimitada'],
          ['Uso típico', 'SO, bases de datos', 'Contenido compartido, lift and shift, Lambda', 'Backups, estáticos, data lake'],
          ['Coste', 'Por GB e IOPS', 'Por GB usado', 'Por GB y peticiones']
        ] },
        { t: 'nota', clase: 'examen', titulo: 'Asociación inmediata', c: '«Sistema de archivos compartido por varias instancias Linux» → **EFS**. «Disco de una instancia» → **EBS**. «Objetos y acceso por HTTP» → **S3**. «Windows» → **FSx for Windows File Server**.' },
        { t: 'h', c: 'Familia FSx' },
        { t: 'p', c: 'Cuando EFS no encaja, AWS ofrece **Amazon FSx**: **FSx for Windows File Server** (SMB y Active Directory), **FSx for Lustre** (alto rendimiento para HPC y machine learning), **FSx for NetApp ONTAP** y **FSx for OpenZFS**.' }
      ],
      terminos: [
        { t: 'EFS', d: 'Sistema de archivos NFS gestionado, elástico y compartido entre instancias.' },
        { t: 'NFS', d: 'Protocolo de archivos en red típico de sistemas Linux.' },
        { t: 'Mount target', d: 'Punto de montaje de EFS en una subred y zona de disponibilidad.' },
        { t: 'Throughput', d: 'Cantidad de datos por segundo que puede leer o escribir el sistema de archivos.' },
        { t: 'FSx', d: 'Familia de sistemas de archivos gestionados para Windows, Lustre, ONTAP y OpenZFS.' }
      ],
      quiz: [
        { p: '¿Qué servicio permite montar el mismo sistema de archivos en varias instancias Linux de distintas zonas de disponibilidad?', op: ['Amazon EBS', 'Amazon EFS', 'Amazon S3', 'Amazon S3 Glacier'], ok: 1, e: 'EFS es un sistema de archivos de red compartido y multi-AZ, mientras que EBS se limita a una instancia y una zona.' },
        { p: '¿Qué puerto debe permitir el grupo de seguridad para montar EFS desde una instancia Linux?', op: ['22', '443', '2049', '3306'], ok: 2, e: 'EFS utiliza NFS en el puerto TCP 2049.' },
        { p: 'Una empresa necesita un sistema de archivos compartido para servidores Windows con Active Directory. ¿Qué servicio debe usar?', op: ['Amazon EFS', 'Amazon FSx for Windows File Server', 'Amazon EBS', 'Amazon S3'], ok: 1, e: 'FSx for Windows File Server ofrece SMB y se integra con Active Directory.' }
      ]
    },
    {
      id: 'm7s4',
      titulo: 'AWS S3 Glacier',
      resumen: 'Amazon S3 Glacier almacena datos de archivo a muy bajo coste, con distintos tiempos de recuperación según la urgencia y políticas de ciclo de vida que automatizan el traslado.',
      objetivos: [
        'Explicar para qué sirve el almacenamiento de archivo y sus ventajas.',
        'Comparar las opciones de recuperación de Glacier.',
        'Diseñar una política de ciclo de vida con archivado.'
      ],
      bloques: [
        { t: 'p', c: 'El **almacenamiento de archivo** está pensado para datos que deben conservarse durante años pero a los que casi nunca se accede: copias de seguridad, registros, imágenes médicas, material audiovisual, cumplimiento normativo. **Amazon S3 Glacier** ofrece ese almacenamiento a una fracción del coste de las clases activas, a cambio de asumir latencia y costes de recuperación.' },
        { t: 'h', c: 'Las clases Glacier dentro de S3' },
        { t: 'tabla', cab: ['Clase', 'Tiempo de recuperación', 'Uso típico'], filas: [
          ['S3 Glacier Instant Retrieval', 'Milisegundos', 'Archivo al que se accede una vez al trimestre y se necesita al instante'],
          ['S3 Glacier Flexible Retrieval', 'Expedita: 1-5 min · Estándar: 3-5 h · Masiva: 5-12 h', 'Copias de seguridad y archivos con acceso ocasional'],
          ['S3 Glacier Deep Archive', 'Estándar: ~12 h · Masiva: ~48 h', 'Retención legal a largo plazo, el coste más bajo']
        ] },
        { t: 'nota', clase: 'examen', titulo: 'Cifras que se preguntan', c: '**Expedita**: 1-5 minutos. **Estándar**: 3-5 horas. **Masiva**: 5-12 horas. **Deep Archive estándar**: ~12 horas y **masiva**: ~48 horas.' },
        { t: 'h', c: 'Cómo se usa' },
        { t: 'p', c: 'Aunque existió el servicio independiente *Amazon Glacier* con «vaults», hoy lo habitual es usar **clases de almacenamiento de Amazon S3**. Se sube el objeto a S3 y se aplica una clase Glacier directamente o mediante una regla de ciclo de vida. La API, los permisos y las herramientas son las mismas que en el resto de S3.' },
        { t: 'h', c: 'Ciclo de vida: el patrón de archivado' },
        { t: 'ol', c: [
          'Los objetos se crean en **S3 Standard**.',
          'A los 30 días se mueven a **S3 Standard-IA**.',
          'A los 90 días pasan a **S3 Glacier Instant Retrieval** o **Flexible Retrieval**.',
          'Al año pasan a **S3 Glacier Deep Archive**.',
          'A los 7 años (o el plazo legal aplicable) se **eliminan** automáticamente.'
        ] },
        { t: 'p', c: 'Esta regla se define en la configuración de ciclo de vida del bucket y no requiere código ni intervención manual. Se complementa con **S3 Intelligent-Tiering**, que automatiza el movimiento sin definir reglas.' },
        { t: 'h', c: 'Costes y trampas' },
        { t: 'ul', c: [
          '**Almacenamiento:** muy bajo por GB al mes, pero con **minutos de facturación mínimos** (90 días en Flexible, 180 en Deep Archive).',
          '**Recuperación:** se paga por GB recuperado y por el tipo de recuperación; la expedita es la más cara.',
          '**Peticiones:** las solicitudes de restauración tienen coste.',
          '**Transferencia:** la salida a internet se factura como en cualquier clase de S3.',
          '**Borrado anticipado:** eliminar un objeto antes del mínimo puede generar un cargo equivalente al periodo restante.'
        ] },
        { t: 'nota', clase: 'aviso', titulo: 'No es un sistema de archivos', c: 'Glacier no permite montar un disco ni consultar archivos al instante. Si una aplicación necesita leer datos con frecuencia, Glacier es la clase equivocada y la factura lo reflejará.' },
        { t: 'h', c: 'Protección e inmutabilidad' },
        { t: 'ul', c: [
          '**S3 Object Lock** en modo cumplimiento impide borrar o modificar objetos durante el periodo de retención.',
          '**Versionado** protege frente a borrados accidentales.',
          '**Bloqueo de políticas (Vault Lock)** en el antiguo Glacier impedía cambiar la política de retención.',
          '**AWS Backup** puede aplicar políticas de retención y archivado de forma centralizada.',
          '**Cifrado** con SSE-KMS o SSE-S3 en todas las clases.'
        ] },
        { t: 'h', c: 'Casos de uso' },
        { t: 'tabla', cab: ['Sector', 'Datos archivados'], filas: [
          ['Sanidad', 'Imágenes médicas y historiales con retención legal'],
          ['Medios', 'Másteres de vídeo y material original'],
          ['Finanzas', 'Registros de transacciones y auditoría'],
          ['Ciencia', 'Conjuntos de datos de investigación y simulaciones'],
          ['TI', 'Copias de seguridad y registros de larga duración']
        ] }
      ],
      terminos: [
        { t: 'Archivado', d: 'Almacenamiento de bajo coste para datos de acceso muy infrecuente.' },
        { t: 'Glacier Instant Retrieval', d: 'Clase de archivo con recuperación en milisegundos.' },
        { t: 'Deep Archive', d: 'Clase de menor coste con recuperación en horas.' },
        { t: 'Recuperación expedita', d: 'Recuperación de Glacier en 1-5 minutos, con mayor coste.' },
        { t: 'Object Lock', d: 'Mecanismo WORM que impide modificar o borrar objetos durante un periodo.' }
      ],
      quiz: [
        { p: '¿Cuánto tarda una recuperación expedita en S3 Glacier Flexible Retrieval?', op: ['Milisegundos', '1 a 5 minutos', '3 a 5 horas', '12 a 48 horas'], ok: 1, e: 'La recuperación expedita tarda entre 1 y 5 minutos; la estándar, 3-5 horas; la masiva, 5-12 horas.' },
        { p: '¿Qué clase de almacenamiento ofrece el menor coste para datos que se conservan años y casi nunca se consultan?', op: ['S3 Standard', 'S3 Standard-IA', 'S3 Glacier Flexible Retrieval', 'S3 Glacier Deep Archive'], ok: 3, e: 'Deep Archive es la clase de menor coste, con recuperación en unas 12 horas.' },
        { p: '¿Cómo se suele implementar el archivado automático de datos en S3?', op: ['Con reglas de ciclo de vida del bucket', 'Con un grupo de Auto Scaling', 'Con un grupo de seguridad', 'Con una política de IAM'], ok: 0, e: 'Las reglas de ciclo de vida transicionan objetos entre clases y los eliminan tras un tiempo definido.' }
      ]
    }
  ]
});
