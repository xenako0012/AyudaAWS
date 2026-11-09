/* Módulo 6 · Informática */
(window.MODULOS = window.MODULOS || []).push({
  id: 'm6',
  numero: 6,
  titulo: 'Informática',
  descripcion: 'Servicios de cómputo de AWS: Amazon EC2 en profundidad, opciones de compra y optimización de costes, contenedores, AWS Lambda y AWS Elastic Beanstalk.',
  duracion: '190 min',
  objetivo: 'Elegir el servicio de cómputo adecuado y dimensionar instancias EC2 de forma segura y eficiente en coste.',
  secciones: [
    {
      id: 'm6s1',
      titulo: 'Información general sobre los servicios de informática',
      resumen: 'AWS ofrece cómputo en tres grandes modelos: servidores virtuales (EC2), contenedores (ECS, EKS, Fargate) y funciones sin servidor (Lambda), además de plataformas gestionadas como Elastic Beanstalk.',
      objetivos: [
        'Comparar los modelos de cómputo de AWS.',
        'Elegir el servicio adecuado según el control, la operación y el patrón de uso.',
        'Reconocer servicios complementarios de cómputo.'
      ],
      bloques: [
        { t: 'p', c: 'Elegir el servicio de cómputo correcto es una de las decisiones con más impacto en coste y operación. La pregunta clave: **¿cuánto control necesito y cuánta operación quiero delegar?**' },
        { t: 'h', c: 'Los tres modelos' },
        { t: 'tabla', cab: ['Modelo', 'Servicio', 'Tú gestionas', 'Ideal para'], filas: [
          ['Servidores virtuales', 'Amazon EC2', 'SO, parches, runtime, aplicación, escalado', 'Aplicaciones tradicionales, control total, licencias propias'],
          ['Contenedores', 'Amazon ECS, Amazon EKS, AWS Fargate', 'Imagen, aplicación; opcionalmente el clúster', 'Microservicios, portabilidad, despliegues rápidos'],
          ['Sin servidor', 'AWS Lambda', 'Solo el código y sus permisos', 'Eventos, APIs intermitentes, tareas programadas']
        ] },
        { t: 'nota', clase: 'examen', titulo: 'El espectro', c: 'A más control, más responsabilidad: EC2 > contenedores > Lambda. A menos operación, más rápido se entrega valor, pero menos control sobre el entorno de ejecución.' },
        { t: 'h', c: 'Servicios de cómputo complementarios' },
        { t: 'tabla', cab: ['Servicio', 'Qué aporta'], filas: [
          ['AWS Elastic Beanstalk', 'PaaS: subes el código y AWS aprovisiona y escala la infraestructura'],
          ['AWS Batch', 'Ejecuta trabajos por lotes de forma eficiente y escalable'],
          ['Amazon Lightsail', 'Servidores virtuales, almacenamiento y red con precio mensual predecible'],
          ['AWS Outposts', 'Cómputo de AWS en las instalaciones del cliente'],
          ['AWS Local Zones', 'Cómputo de AWS en áreas metropolitanas'],
          ['AWS Serverless Application Model (SAM)', 'Framework para definir aplicaciones sin servidor'],
          ['AWS App Runner', 'Despliegue de aplicaciones en contenedores con URL pública, sin gestionar infraestructura']
        ] },
        { t: 'h', c: 'Cómo decidir' },
        { t: 'ol', c: [
          '**¿El tráfico es constante o intermitente?** Intermitente → Lambda o Fargate; constante → EC2 con Savings Plans.',
          '**¿Necesitas controlar el sistema operativo?** Sí → EC2. No → contenedores o Lambda.',
          '**¿La aplicación ya está en contenedores?** Sí → ECS/EKS con Fargate.',
          '**¿Es una aplicación web estándar y el equipo es pequeño?** Elastic Beanstalk.',
          '**¿Es un trabajo por lotes o de alto rendimiento?** AWS Batch o EC2 Spot.'
        ] },
        { t: 'h', c: 'Cómputo y sostenibilidad' },
        { t: 'p', c: 'El cómputo es uno de los mayores consumidores de energía de una carga de trabajo. Elegir procesadores **AWS Graviton** (ARM), apagar instancias infrautilizadas y usar servicios gestionados que comparten capacidad reduce el consumo y el coste al mismo tiempo.' }
      ],
      terminos: [
        { t: 'Amazon EC2', d: 'Servicio de servidores virtuales con control total del sistema operativo.' },
        { t: 'Contenedor', d: 'Unidad de software que empaqueta código y dependencias de forma portable.' },
        { t: 'Sin servidor', d: 'Modelo en el que el proveedor gestiona los servidores y solo se paga por ejecución.' },
        { t: 'Elastic Beanstalk', d: 'Plataforma como servicio para desplegar aplicaciones web en AWS.' }
      ],
      quiz: [
        { p: 'Una empresa quiere ejecutar un trabajo de procesamiento de imágenes que dura unos segundos y se dispara al subir cada archivo. ¿Qué modelo encaja mejor?', op: ['Amazon EC2 con Auto Scaling', 'AWS Lambda', 'Amazon Lightsail', 'AWS Outposts'], ok: 1, e: 'Lambda ejecuta código por evento, sin servidores que administrar, y solo cobra por ejecución.' },
        { p: '¿Qué servicio ofrece mayor control sobre el sistema operativo y el software instalado?', op: ['AWS Lambda', 'Amazon ECS con Fargate', 'Amazon EC2', 'AWS Elastic Beanstalk'], ok: 2, e: 'EC2 es IaaS: el cliente controla el sistema operativo, los parches y todo el software.' },
        { p: '¿Qué servicio es un PaaS que aprovisiona la infraestructura a partir del código de la aplicación?', op: ['Amazon EKS', 'AWS Elastic Beanstalk', 'AWS Batch', 'AWS Fargate'], ok: 1, e: 'Elastic Beanstalk recibe el código y gestiona el aprovisionamiento, el escalado y el equilibrio de carga.' }
      ]
    },
    {
      id: 'm6s2',
      titulo: 'Amazon EC2: 1.ª parte',
      resumen: 'Amazon EC2 ofrece instancias virtuales configurables a partir de una AMI, con distintos tipos y familias según la carga, almacenamiento local o remoto y claves de acceso para administrarlas.',
      objetivos: [
        'Describir qué es una instancia EC2 y sus componentes.',
        'Interpretar los nombres y familias de tipos de instancia.',
        'Diferenciar almacenamiento de instancia y volúmenes EBS.'
      ],
      bloques: [
        { t: 'p', c: '**Amazon Elastic Compute Cloud (EC2)** proporciona **capacidad de cómputo escalable** en forma de instancias virtuales. Es el servicio de IaaS por excelencia de AWS: se elige el sistema operativo, el tamaño, la red, el almacenamiento y el modelo de compra.' },
        { t: 'h', c: 'Qué define una instancia' },
        { t: 'tabla', cab: ['Elemento', 'Descripción'], filas: [
          ['AMI', 'Plantilla con sistema operativo, software y configuración inicial'],
          ['Tipo de instancia', 'Combinación de vCPU, memoria, red y almacenamiento (por ejemplo, m5.large)'],
          ['Par de claves', 'Credenciales SSH para conectarse a la instancia'],
          ['Grupo de seguridad', 'Firewall que controla el tráfico permitido'],
          ['Subred y VPC', 'Ubicación de red de la instancia'],
          ['Rol de IAM', 'Permisos que la instancia puede usar sin claves estáticas'],
          ['Almacenamiento', 'Volúmenes EBS adjuntos o almacenamiento de instancia efímero'],
          ['Datos de usuario', 'Script que se ejecuta al arrancar por primera vez']
        ] },
        { t: 'h', c: 'Amazon Machine Image (AMI)' },
        { t: 'p', c: 'Una **AMI** es una plantilla que contiene el sistema operativo, los paquetes y la configuración necesarios para lanzar una instancia. Se pueden usar AMI de AWS, del Marketplace, de la comunidad o crear las propias a partir de una instancia existente. Las AMI son **regionales**: para usarlas en otra región hay que copiarlas.' },
        { t: 'nota', clase: 'tip', titulo: 'Imágenes doradas', c: 'Las organizaciones crean AMI propias con el software base y los agentes de seguridad ya instalados, y las distribuyen con EC2 Image Builder. Así todas las instancias nacen conformes.' },
        { t: 'h', c: 'Familias de tipos de instancia' },
        { t: 'tabla', cab: ['Familia', 'Prefijo', 'Uso típico', 'Ejemplo'], filas: [
          ['Uso general', 't, m', 'Equilibrio entre CPU, memoria y red', 'm7g.xlarge'],
          ['Optimizada para cómputo', 'c', 'CPU intensiva: procesamiento, servidores web de alto rendimiento', 'c7g.large'],
          ['Optimizada para memoria', 'r, x, z', 'Bases de datos en memoria, análisis, cachés', 'r7g.2xlarge'],
          ['Optimizada para almacenamiento', 'i, d, h', 'Bases de datos NoSQL, data warehousing, alta IOPS', 'i4i.xlarge'],
          ['Computación acelerada', 'p, g, inf, trn', 'GPU y aprendizaje automático', 'g5.xlarge'],
          ['HPC', 'hpc', 'Cálculo de alto rendimiento con red de baja latencia', 'hpc7g.16xlarge']
        ] },
        { t: 'p', c: 'El nombre de un tipo de instancia se lee por partes. En `m5.2xlarge`: **m** es la familia (uso general), **5** la generación, **2xlarge** el tamaño (vCPU y memoria). Los sufijos añaden información: **g** indica procesador Graviton (ARM), **n** optimización de red, **d** almacenamiento local NVMe.' },
        { t: 'nota', clase: 'examen', titulo: 'Letras y números', c: '**T** = uso general con ráfagas (burstable), **M** = uso general equilibrado, **C** = cómputo, **R** = memoria, **I/D/H** = almacenamiento, **G/P** = GPU. Cuanto mayor es el tamaño, más recursos y más coste por hora.' },
        { t: 'h', c: 'Almacenamiento: instancia frente a EBS' },
        { t: 'tabla', cab: ['Aspecto', 'Almacenamiento de instancia', 'Amazon EBS'], filas: [
          ['Duración', 'Se pierde si la instancia se detiene o termina', 'Persiste independientemente de la instancia'],
          ['Ubicación', 'Discos físicos del host', 'Volumen de red adjunto a la instancia'],
          ['Rendimiento', 'Muy bajo coste por IOPS, muy rápido', 'Configurable (gp3, io2, st1...)'],
          ['Copia de seguridad', 'No se puede hacer snapshot', 'Se puede crear snapshot en S3'],
          ['Uso recomendado', 'Caché, datos temporales, buffers', 'Sistema operativo, datos persistentes, bases de datos']
        ] },
        { t: 'h', c: 'Administración de la instancia' },
        { t: 'ul', c: [
          '**SSH (puerto 22)** para Linux y **RDP (puerto 3389)** para Windows.',
          '**EC2 Instance Connect** permite abrir una sesión SSH desde el navegador sin gestionar claves.',
          '**AWS Systems Manager Session Manager** evita abrir puertos y deja registro de la sesión.',
          '**EC2 Serial Console** sirve para recuperar instancias con problemas de arranque.',
          '**EC2 Image Builder** automatiza la creación y el mantenimiento de AMI.'
        ] }
      ],
      terminos: [
        { t: 'AMI', d: 'Plantilla de sistema operativo y software para lanzar instancias.' },
        { t: 'Tipo de instancia', d: 'Especificación de vCPU, memoria, red y almacenamiento de una instancia.' },
        { t: 'Instance store', d: 'Almacenamiento local efímero que se pierde al detener la instancia.' },
        { t: 'Par de claves', d: 'Clave pública y privada usada para autenticarse por SSH en Linux.' },
        { t: 'vCPU', d: 'Unidad de cómputo virtual asignada a una instancia.' }
      ],
      quiz: [
        { p: 'En el tipo de instancia m5.2xlarge, ¿qué indica la letra m?', op: ['Que está optimizada para memoria', 'Que es de uso general', 'Que incluye GPU', 'Que es de la generación 5'], ok: 1, e: 'La m indica familia de uso general; el 5 es la generación y 2xlarge el tamaño.' },
        { p: '¿Qué ocurre con el almacenamiento de instancia (instance store) cuando se detiene la instancia?', op: ['Se conserva indefinidamente', 'Se guarda en un snapshot automáticamente', 'Se pierde', 'Se convierte en un volumen EBS'], ok: 2, e: 'El almacenamiento de instancia es efímero y se pierde al detener, hibernar o terminar la instancia.' },
        { p: 'Una carga de trabajo necesita mucha memoria RAM para una base de datos en memoria. ¿Qué familia es la más adecuada?', op: ['Familia c', 'Familia r', 'Familia i', 'Familia g'], ok: 1, e: 'La familia r está optimizada para memoria; c para cómputo, i para almacenamiento y g para GPU.' }
      ]
    },
    {
      id: 'm6s3',
      titulo: 'Amazon EC2: 2.ª parte',
      resumen: 'Lanzar una instancia implica elegir AMI, tipo, red, almacenamiento y datos de usuario. Después se administra su ciclo de vida, se comprueba su estado y se organiza su colocación.',
      objetivos: [
        'Describir el ciclo de vida de una instancia y sus estados.',
        'Explicar el papel de los datos de usuario y del servicio de metadatos.',
        'Configurar comprobaciones de estado y grupos de colocación.'
      ],
      bloques: [
        { t: 'p', c: 'Lanzar una instancia es solo el principio. Entender su **ciclo de vida** y las herramientas de arranque permite automatizar y diagnosticar problemas.' },
        { t: 'h', c: 'Ciclo de vida' },
        { t: 'tabla', cab: ['Estado', 'Qué ocurre', 'Coste'], filas: [
          ['pending', 'La instancia se está preparando', 'No se factura cómputo'],
          ['running', 'En ejecución', 'Se factura por segundo'],
          ['stopping / stopped', 'Detenida; se conservan EBS y la IP privada', 'Solo se factura el almacenamiento EBS'],
          ['rebooting', 'Reinicio; no cambia nada', 'Se factura con normalidad'],
          ['shutting-down / terminated', 'Eliminada; los volúmenes EBS raíz se borran por defecto', 'Solo los volúmenes con DeleteOnTermination=false']
        ] },
        { t: 'nota', clase: 'aviso', titulo: 'Detener no es terminar', c: '**Stop** conserva los volúmenes EBS y permite volver a arrancar. **Terminate** destruye la instancia; el volumen raíz se elimina salvo que se haya configurado lo contrario. Los datos del instance store se pierden en ambos casos.' },
        { t: 'h', c: 'Datos de usuario (user data)' },
        { t: 'p', c: 'Los **datos de usuario** son un script que se ejecuta la primera vez que arranca la instancia (y en cada arranque si se configura así). Se usan para instalar paquetes, configurar el servidor web o registrar la instancia en un balanceador. En Linux se ejecuta con `cloud-init`; en Windows, con `EC2Launch`.' },
        { t: 'nota', clase: 'dato', titulo: 'Ejemplo de user data', c: '`#!/bin/bash` · `yum update -y` · `yum install -y httpd` · `systemctl start httpd` · `echo "Hola desde $(hostname)" > /var/www/html/index.html`' },
        { t: 'h', c: 'Metadatos de la instancia' },
        { t: 'p', c: 'Desde dentro de la instancia se puede consultar información sobre ella en `http://169.254.169.254/latest/meta-data/`: ID, tipo, IP, zona de disponibilidad, rol de IAM asociado. **Nunca** se deben usar los metadatos para guardar secretos, y conviene exigir el uso de **IMDSv2** (con token) para evitar ataques de falsificación de peticiones (SSRF).' },
        { t: 'h', c: 'Comprobaciones de estado' },
        { t: 'tabla', cab: ['Comprobación', 'Qué verifica', 'Qué hacer si falla'], filas: [
          ['Estado del sistema', 'Hardware, red y energía del host', 'Detener e iniciar para migrar a otro host'],
          ['Estado de la instancia', 'Configuración del sistema operativo y del software', 'Revisar la consola, los registros y reiniciar'],
          ['Comprobación adjunta', 'Volúmenes EBS y estado de red adjunta', 'Revisar el volumen o la configuración de red']
        ] },
        { t: 'h', c: 'Grupos de colocación' },
        { t: 'tabla', cab: ['Estrategia', 'Cómo coloca', 'Caso de uso'], filas: [
          ['Cluster', 'Instancias muy próximas en una sola AZ', 'HPC y aplicaciones de baja latencia, con mayor riesgo'],
          ['Spread', 'Instancias en hardware distinto, hasta 7 por AZ', 'Aplicaciones críticas que necesitan aislarse'],
          ['Partition', 'Grupos separados de instancias en racks distintos', 'Hadoop, Cassandra y cargas con particiones']
        ] },
        { t: 'h', c: 'Direcciones IP' },
        { t: 'ul', c: [
          '**IP privada:** se mantiene mientras la instancia exista y se conserva al detenerla.',
          '**IP pública:** se asigna al arrancar y **cambia** al detener y volver a iniciar.',
          '**IP elástica:** dirección pública estática reservada a la cuenta; se puede reasignar entre instancias.'
        ] },
        { t: 'h', c: 'Hibernación' },
        { t: 'p', c: 'La **hibernación** guarda el contenido de la memoria RAM en el volumen EBS raíz y la restaura al arrancar. Es útil para aplicaciones con estado que tardan en iniciarse. Requiere soporte de la AMI, del tipo de instancia y espacio suficiente en el volumen raíz.' }
      ],
      terminos: [
        { t: 'Datos de usuario', d: 'Script que se ejecuta al arrancar una instancia para configurarla.' },
        { t: 'Metadatos', d: 'Información sobre la instancia accesible desde dentro en 169.254.169.254.' },
        { t: 'IMDSv2', d: 'Versión segura del servicio de metadatos que requiere token.' },
        { t: 'IP elástica', d: 'Dirección IPv4 pública estática asociada a la cuenta.' },
        { t: 'Grupo de colocación', d: 'Regla que controla cómo se distribuyen las instancias en el hardware.' },
        { t: 'Hibernación', d: 'Suspensión que guarda la RAM en disco y restaura el estado al arrancar.' }
      ],
      quiz: [
        { p: '¿Qué ocurre con la dirección IP pública de una instancia al detenerla y volver a iniciarla?', op: ['Se conserva igual', 'Se libera y se asigna otra', 'Se convierte en IP elástica', 'Queda reservada 24 horas'], ok: 1, e: 'La IP pública no es estática: cambia al detener e iniciar. Para conservarla se usa una IP elástica.' },
        { p: '¿Cuál es la forma recomendada de instalar software automáticamente al primer arranque de una instancia Linux?', op: ['Con los datos de usuario (user data)', 'Con una política de IAM', 'Con un grupo de seguridad', 'Con una IP elástica'], ok: 0, e: 'Los datos de usuario permiten ejecutar un script de inicialización en el primer arranque.' },
        { p: 'Si la comprobación del estado del sistema falla, ¿qué acción suele recomendarse?', op: ['Eliminar la instancia', 'Detener e iniciar la instancia para migrarla a otro host', 'Cambiar el grupo de seguridad', 'Crear un snapshot'], ok: 1, e: 'Detener e iniciar relanza la instancia en un host sano cuando el problema es de hardware o de red del host.' }
      ]
    },
    {
      id: 'm6s4',
      titulo: 'Amazon EC2: 3.ª parte',
      resumen: 'EC2 permite elegir entre varias opciones de compra —bajo demanda, reservada, Savings Plans, Spot y hosts dedicados— además de capacidades como el escalado, las AMI personalizadas y la tenencia dedicada.',
      objetivos: [
        'Comparar las opciones de compra de EC2 y su idoneidad.',
        'Explicar la tenencia dedicada y las reservas de capacidad.',
        'Relacionar las instancias graviton y burstable con la optimización.'
      ],
      bloques: [
        { t: 'p', c: 'El coste de EC2 depende del **tipo de instancia**, del **tiempo encendida** y del **modelo de compra**. Elegir bien puede reducir la factura más de un 60 % sin cambiar la arquitectura.' },
        { t: 'h', c: 'Opciones de compra en detalle' },
        { t: 'tabla', cab: ['Opción', 'Compromiso', 'Descuento', 'Interrupción', 'Escenario'], filas: [
          ['Bajo demanda', 'Ninguno', '—', 'No', 'Cargas impredecibles o de corta duración'],
          ['Instancias reservadas estándar', '1 o 3 años', 'Hasta ~72 %', 'No', 'Cargas estables en una región y familia'],
          ['Instancias reservadas convertibles', '1 o 3 años', 'Hasta ~66 %', 'No', 'Cargas estables que pueden cambiar de familia'],
          ['Savings Plans (Compute)', '1 o 3 años, gasto por hora', 'Hasta ~66 %', 'No', 'Uso mixto de EC2, Fargate y Lambda'],
          ['Savings Plans (EC2 Instance)', '1 o 3 años, familia y región', 'Hasta ~72 %', 'No', 'Uso estable de EC2 en una familia'],
          ['Instancias Spot', 'Ninguno', 'Hasta ~90 %', 'Sí, con 2 minutos de aviso', 'Lotes, CI/CD, renderizado y big data'],
          ['Hosts dedicados', 'Opcional', 'Variable', 'No', 'Licencias de software y requisitos de cumplimiento'],
          ['Instancias dedicadas', 'Ninguno', 'Variable', 'No', 'Aislamiento de hardware sin gestionar el host']
        ] },
        { t: 'nota', clase: 'examen', titulo: 'Spot y tolerancia a fallos', c: 'Spot es la opción más barata, pero AWS puede reclamar la capacidad con **dos minutos** de aviso. Solo debe usarse en cargas tolerantes a interrupciones o con puntos de control (checkpoints).' },
        { t: 'h', c: 'Tenencia y aislamiento' },
        { t: 'ul', c: [
          '**Multitenencia (por defecto):** la instancia comparte hardware con otras cuentas, aislada por el hipervisor.',
          '**Instancia dedicada:** la instancia se ejecuta en hardware dedicado a la cuenta, pero el host no se controla.',
          '**Host dedicado:** se reserva un servidor físico completo; permite usar licencias propias (BYOL) y ver los sockets y núcleos.',
          '**Reserva de capacidad:** garantiza capacidad en una zona de disponibilidad concreta para un periodo, sin descuento por sí sola.'
        ] },
        { t: 'h', c: 'Instancias burstable' },
        { t: 'p', c: 'Las familias **T** (t3, t4g) acumulan **créditos de CPU** cuando están por debajo de su rendimiento base y los consumen en los picos. Tienen tres modos: **unlimited** (paga el exceso), **standard** (se limita al rendimiento base al agotar créditos) y **reserved**. Son ideales para cargas con picos puntuales, como un servidor de desarrollo o un sitio de bajo tráfico.' },
        { t: 'h', c: 'Procesadores Graviton' },
        { t: 'p', c: '**AWS Graviton** son procesadores ARM diseñados por AWS. Ofrecen mejor relación precio-rendimiento que x86 en muchas cargas y están disponibles en familias con el sufijo **g** (m7g, c7g, r7g). La mayoría de los lenguajes y contenedores funcionan sin cambios si la imagen es multiarquitectura.' },
        { t: 'h', c: 'Auto Scaling y elasticidad' },
        { t: 'p', c: '**Amazon EC2 Auto Scaling** ajusta el número de instancias según la demanda mediante grupos de Auto Scaling y políticas de escalado. Se detalla en el módulo 10, pero la idea clave es que combina con las opciones de compra: una **flota mixta** puede usar instancias bajo demanda para la base y Spot para el exceso.' },
        { t: 'h', c: 'Otras capacidades' },
        { t: 'ul', c: [
          '**EC2 Image Builder:** crea, prueba y distribuye AMI de forma automatizada.',
          '**EC2 Fleet:** lanza flotas de instancias combinando tipos y opciones de compra.',
          '**Capacity Blocks for ML:** reserva capacidad de GPU para entrenamientos planificados.',
          '**Nitro Enclaves:** aislamiento de datos sensibles durante el procesamiento.',
          '**Elastic Graphics / Inferentia / Trainium:** aceleradores especializados.'
        ] }
      ],
      terminos: [
        { t: 'Instancia reservada', d: 'Compromiso de uso de 1 o 3 años con descuento y capacidad reservada.' },
        { t: 'Savings Plans', d: 'Compromiso de gasto por hora que aplica descuentos flexibles.' },
        { t: 'Instancia Spot', d: 'Capacidad sobrante con gran descuento y posible interrupción.' },
        { t: 'Host dedicado', d: 'Servidor físico completo reservado a una cuenta.' },
        { t: 'Instancia burstable', d: 'Instancia de familia T que acumula y consume créditos de CPU.' },
        { t: 'Graviton', d: 'Familia de procesadores ARM diseñados por AWS.' }
      ],
      quiz: [
        { p: '¿Qué opción de compra ofrece el mayor descuento pero puede ser interrumpida con dos minutos de aviso?', op: ['Instancias reservadas', 'Savings Plans', 'Instancias Spot', 'Hosts dedicados'], ok: 2, e: 'Las instancias Spot ofrecen hasta un 90 % de descuento, pero AWS puede reclamar la capacidad con 2 minutos de preaviso.' },
        { p: 'Una empresa necesita usar sus propias licencias de software por socket y cumplir un requisito de aislamiento físico. ¿Qué debe elegir?', op: ['Instancias Spot', 'Hosts dedicados', 'Instancias burstable', 'Savings Plans Compute'], ok: 1, e: 'Los hosts dedicados dan control sobre el servidor físico y permiten el modelo BYOL (bring your own license).' },
        { p: '¿Qué hacen las instancias de la familia T cuando agotan sus créditos de CPU en modo estándar?', op: ['Se apagan', 'Se limitan al rendimiento base', 'Se convierten en Spot', 'Aumentan de tamaño'], ok: 1, e: 'En modo estándar, al agotar los créditos la instancia se limita a su rendimiento base hasta acumular más.' }
      ]
    },
    {
      id: 'm6s5',
      titulo: 'Optimización de costos con Amazon EC2',
      resumen: 'Optimizar EC2 combina derecho de tamaño, elección del modelo de compra, apagado de lo innecesario, uso de Graviton y automatización del escalado.',
      objetivos: [
        'Aplicar las palancas de optimización de costes de EC2.',
        'Identificar recursos ociosos y sobredimensionados.',
        'Combinar opciones de compra en una flota mixta.'
      ],
      bloques: [
        { t: 'p', c: 'El gasto en EC2 suele ser la mayor línea de la factura. Estas son las palancas que más ahorro generan, ordenadas por impacto habitual.' },
        { t: 'h', c: '1. Ajustar el tamaño (rightsizing)' },
        { t: 'p', c: 'La mayoría de las instancias están sobredimensionadas porque se eligieron «por si acaso». Analizar métricas de CPU, memoria, red y disco durante varias semanas permite bajar de tamaño o de familia. **AWS Compute Optimizer** y **Trusted Advisor** generan recomendaciones automáticas basadas en el uso real.' },
        { t: 'h', c: '2. Elegir bien el modelo de compra' },
        { t: 'ul', c: [
          'Cargas estables 24/7 → **Savings Plans** o instancias reservadas.',
          'Cargas variables con base estable → base reservada + picos bajo demanda.',
          'Cargas tolerantes a interrupciones → **Spot**.',
          'Cargas puntuales o desconocidas → bajo demanda.'
        ] },
        { t: 'h', c: '3. Apagar lo que no se usa' },
        { t: 'p', c: 'Los entornos de desarrollo y pruebas no necesitan estar encendidos de noche ni los fines de semana. Programar su apagado con **Instance Scheduler** o con EventBridge y Lambda puede ahorrar más del 60 % en esos entornos. También conviene eliminar volúmenes EBS huérfanos, instantáneas antiguas e IP elásticas sin asociar.' },
        { t: 'h', c: '4. Aprovechar Graviton y las generaciones nuevas' },
        { t: 'p', c: 'Las instancias Graviton suelen ofrecer entre un 20 % y un 40 % mejor relación precio-rendimiento. Las generaciones nuevas (m7 frente a m5) incluyen mejoras de rendimiento por el mismo precio o menor.' },
        { t: 'h', c: '5. Automatizar la elasticidad' },
        { t: 'p', c: 'Un grupo de Auto Scaling con políticas basadas en métricas evita pagar capacidad ociosa y evita también quedarse corto. Combinado con balanceadores y comprobaciones de estado, mantiene el rendimiento con el mínimo de instancias necesarias.' },
        { t: 'h', c: '6. Medir y etiquetar' },
        { t: 'ul', c: [
          'Activar **Cost Explorer** con agrupación por etiqueta y servicio.',
          'Crear **presupuestos** por equipo o proyecto.',
          'Revisar semanalmente los recursos con bajo uso.',
          'Usar **AWS Cost Anomaly Detection** para detectar picos inesperados.',
          'Documentar las decisiones de compra y revisarlas cada trimestre.'
        ] },
        { t: 'nota', clase: 'tip', titulo: 'Antes de reservar', c: 'No compres compromisos de 3 años sobre instancias que no has medido. Primero ajusta el tamaño, después reserva: reservar un recurso sobredimensionado fija el desperdicio durante años.' }
      ],
      terminos: [
        { t: 'Rightsizing', d: 'Ajustar el tamaño de los recursos al uso real medido.' },
        { t: 'Flota mixta', d: 'Combinación de instancias bajo demanda, Spot y reservadas en un grupo de Auto Scaling.' },
        { t: 'Instance Scheduler', d: 'Solución que enciende y apaga instancias según horarios.' },
        { t: 'Recurso huérfano', d: 'Recurso que ya no está asociado a nada y sigue generando coste.' }
      ],
      quiz: [
        { p: '¿Cuál es el primer paso recomendado antes de comprar instancias reservadas?', op: ['Comprar la reserva más larga posible', 'Ajustar el tamaño de las instancias al uso real', 'Cambiar de región', 'Activar CloudTrail'], ok: 1, e: 'Primero se ajusta el tamaño (rightsizing); reservar un recurso sobredimensionado fija el desperdicio durante 1 o 3 años.' },
        { p: '¿Qué herramienta recomienda tipos de instancia basándose en las métricas de uso real?', op: ['AWS Compute Optimizer', 'AWS CloudTrail', 'Amazon Inspector', 'AWS Artifact'], ok: 0, e: 'Compute Optimizer analiza métricas y recomienda tipos y tamaños más eficientes.' },
        { p: 'Un entorno de desarrollo solo se usa de 8:00 a 18:00 de lunes a viernes. ¿Qué medida de ahorro es más directa?', op: ['Contratar Enterprise Support', 'Programar el apagado fuera del horario laboral', 'Cambiar de región', 'Añadir más zonas de disponibilidad'], ok: 1, e: 'Apagar los recursos fuera del horario de uso evita pagar cómputo innecesario y puede ahorrar más del 60 %.' }
      ]
    },
    {
      id: 'm6s6',
      titulo: 'Servicios de contenedores',
      resumen: 'Los contenedores empaquetan la aplicación y sus dependencias. AWS ofrece Amazon ECR para imágenes, Amazon ECS y Amazon EKS para orquestarlas, y AWS Fargate para ejecutarlas sin gestionar servidores.',
      objetivos: [
        'Explicar qué es un contenedor y en qué se diferencia de una máquina virtual.',
        'Distinguir ECS, EKS y Fargate.',
        'Describir el flujo de trabajo con imágenes en Amazon ECR.'
      ],
      bloques: [
        { t: 'p', c: 'Un **contenedor** empaqueta el código de una aplicación junto con sus dependencias y su configuración, de modo que se ejecute igual en cualquier entorno. A diferencia de una máquina virtual, **comparte el kernel del sistema operativo**, por lo que arranca en segundos y consume menos recursos.' },
        { t: 'tabla', cab: ['Aspecto', 'Máquina virtual', 'Contenedor'], filas: [
          ['Aislamiento', 'Completo: kernel propio', 'A nivel de proceso: kernel compartido'],
          ['Arranque', 'Decenas de segundos o minutos', 'Segundos'],
          ['Tamaño', 'Gigabytes', 'Megabytes'],
          ['Densidad', 'Decenas por host', 'Cientos por host'],
          ['Uso típico', 'Aplicaciones monolíticas, sistemas operativos distintos', 'Microservicios, portabilidad, CI/CD']
        ] },
        { t: 'h', c: 'Servicios de contenedores de AWS' },
        { t: 'tabla', cab: ['Servicio', 'Función'], filas: [
          ['Amazon ECR', 'Registro de imágenes de contenedor privado y seguro, con análisis de vulnerabilidades'],
          ['Amazon ECS', 'Orquestador propio de AWS: clústeres, definiciones de tarea y servicios'],
          ['Amazon EKS', 'Kubernetes gestionado; compatible con el ecosistema y las herramientas de Kubernetes'],
          ['AWS Fargate', 'Motor de ejecución sin servidor para ECS y EKS; no se gestionan instancias'],
          ['AWS App Runner', 'Despliegue directo desde imagen o código con URL pública y escalado automático'],
          ['AWS Batch', 'Ejecución de trabajos por lotes en contenedores']
        ] },
        { t: 'h', c: 'Cómo funciona Amazon ECS' },
        { t: 'ul', c: [
          '**Clúster:** agrupación lógica de capacidad donde se ejecutan las tareas.',
          '**Definición de tarea:** plantilla con imagen, CPU, memoria, puertos, variables de entorno y volúmenes.',
          '**Tarea:** instancia en ejecución de una definición de tarea.',
          '**Servicio:** mantiene un número deseado de tareas y las integra con un balanceador de carga.',
          '**Tipos de lanzamiento:** **EC2** (gestionas las instancias del clúster) o **Fargate** (AWS gestiona la capacidad).'
        ] },
        { t: 'nota', clase: 'examen', titulo: 'ECS frente a EKS', c: '**ECS** es más sencillo y está muy integrado con AWS. **EKS** es la opción cuando se necesita Kubernetes estándar, portabilidad entre nubes o herramientas del ecosistema. **Fargate** es un motor de ejecución, no un orquestador: se usa **con** ECS o EKS.' },
        { t: 'h', c: 'Flujo de trabajo típico' },
        { t: 'ol', c: [
          'El desarrollador crea un `Dockerfile` y construye la imagen.',
          'La imagen se etiqueta y se sube a **Amazon ECR**.',
          'Se define una tarea o un despliegue que referencia esa imagen.',
          'Un servicio de ECS o EKS ejecuta y mantiene las réplicas.',
          'Un **Application Load Balancer** reparte el tráfico entre las tareas.',
          'CloudWatch recoge métricas y registros; Auto Scaling ajusta el número de tareas.'
        ] },
        { t: 'h', c: 'Buenas prácticas' },
        { t: 'ul', c: [
          'Usar imágenes base mínimas y escanearlas con **Amazon ECR image scanning** o **Amazon Inspector**.',
          'No incluir secretos en la imagen: usar Secrets Manager o Parameter Store.',
          'Definir límites de CPU y memoria para evitar que una tarea consuma el host.',
          'Configurar **health checks** y despliegues progresivos.',
          'Etiquetar los recursos para imputar costes por servicio.',
          'Preferir Fargate si el equipo no quiere administrar clústeres de EC2.'
        ] }
      ],
      terminos: [
        { t: 'Contenedor', d: 'Empaquetado ligero de una aplicación y sus dependencias que comparte el kernel.' },
        { t: 'Amazon ECR', d: 'Registro gestionado de imágenes de contenedor.' },
        { t: 'Amazon ECS', d: 'Servicio de orquestación de contenedores propio de AWS.' },
        { t: 'Amazon EKS', d: 'Servicio gestionado de Kubernetes.' },
        { t: 'AWS Fargate', d: 'Motor sin servidor para ejecutar contenedores sin gestionar instancias.' },
        { t: 'Definición de tarea', d: 'Plantilla que describe cómo ejecutar un contenedor en ECS.' }
      ],
      quiz: [
        { p: '¿Cuál es la diferencia principal entre un contenedor y una máquina virtual?', op: ['El contenedor comparte el kernel del sistema operativo', 'El contenedor no puede ejecutar aplicaciones web', 'La máquina virtual ocupa menos espacio', 'El contenedor necesita un hipervisor'], ok: 0, e: 'Los contenedores comparten el kernel del host, por lo que son más ligeros y arrancan antes que una VM.' },
        { p: '¿Qué servicio se utiliza para almacenar imágenes de contenedor de forma privada?', op: ['Amazon S3', 'Amazon ECR', 'Amazon EBS', 'Amazon EFS'], ok: 1, e: 'Amazon Elastic Container Registry (ECR) almacena y distribuye imágenes de contenedor.' },
        { p: 'Una empresa quiere ejecutar contenedores en AWS sin administrar instancias EC2. ¿Qué combinación debe usar?', op: ['ECS con tipo de lanzamiento EC2', 'ECS con Fargate', 'EKS con nodos autogestionados', 'EC2 con Auto Scaling'], ok: 1, e: 'Fargate ejecuta contenedores sin que el cliente aprovisione ni administre servidores, y funciona con ECS o EKS.' }
      ]
    },
    {
      id: 'm6s7',
      titulo: 'Introducción a AWS Lambda',
      resumen: 'AWS Lambda ejecuta funciones en respuesta a eventos, escala automáticamente y cobra solo por el tiempo de ejecución y las invocaciones, sin servidores que administrar.',
      objetivos: [
        'Explicar el modelo de ejecución sin servidor de Lambda.',
        'Identificar fuentes de eventos y casos de uso.',
        'Conocer los límites y el modelo de precios.'
      ],
      bloques: [
        { t: 'p', c: '**AWS Lambda** es un servicio de cómputo **sin servidor** y **orientado a eventos**: se escribe una función, se define qué la dispara y AWS la ejecuta cuando ocurre. No hay instancias que aprovisionar, parchear ni escalar.' },
        { t: 'h', c: 'Cómo funciona' },
        { t: 'esquema', c: [
          { titulo: 'Evento', sub: 'Subida a S3, petición HTTP' },
          { titulo: 'Función Lambda', sub: 'Código en Python, Node, Java…' },
          { titulo: 'Destino', sub: 'DynamoDB, S3, SNS' }
        ] },
        { t: 'ol', c: [
          'Ocurre un evento: se sube un archivo, llega una petición a API Gateway o se cumple una programación.',
          'Lambda invoca la función con el evento como parámetro (formato JSON).',
          'El código se ejecuta en un entorno aislado con la memoria y el tiempo configurados.',
          'La función devuelve un resultado o escribe en el servicio de destino.',
          'Lambda escala automáticamente: una invocación, mil o ninguna.'
        ] },
        { t: 'h', c: 'Fuentes de eventos habituales' },
        { t: 'tabla', cab: ['Fuente', 'Ejemplo'], filas: [
          ['Amazon S3', 'Procesar una imagen al subirse'],
          ['Amazon API Gateway', 'Ejecutar una API REST sin servidores'],
          ['Amazon DynamoDB Streams', 'Reaccionar a cambios en una tabla'],
          ['Amazon SQS', 'Procesar mensajes de una cola'],
          ['Amazon SNS', 'Reaccionar a una notificación'],
          ['Amazon EventBridge', 'Tareas programadas o eventos de negocio'],
          ['Application Load Balancer', 'Atender peticiones HTTP directamente'],
          ['IoT Core', 'Procesar datos de dispositivos']
        ] },
        { t: 'h', c: 'Límites que conviene conocer' },
        { t: 'tabla', cab: ['Límite', 'Valor'], filas: [
          ['Tiempo máximo de ejecución', '15 minutos (900 segundos)'],
          ['Memoria', 'De 128 MB a 10.240 MB'],
          ['Espacio temporal (/tmp)', '512 MB a 10 GB'],
          ['Tamaño del paquete comprimido', '50 MB (zip directo) o 250 MB descomprimido'],
          ['Imagen de contenedor', 'Hasta 10 GB'],
          ['Concurrencia por región (por defecto)', '1.000 ejecuciones simultáneas'],
          ['Invocaciones asíncronas reintentadas', '2 reintentos automáticos']
        ] },
        { t: 'nota', clase: 'aviso', titulo: 'No es para todo', c: 'Si un proceso tarda más de 15 minutos, necesita una sesión persistente o tiene un uso muy intensivo y continuo, probablemente convenga EC2, Fargate o AWS Batch.' },
        { t: 'h', c: 'Modelo de precios' },
        { t: 'ul', c: [
          'Se cobra por **número de peticiones**: las primeras 1 millón al mes suelen estar cubiertas por el nivel gratuito.',
          'Se cobra por **GB-segundo**: memoria asignada multiplicada por el tiempo de ejecución, medido en incrementos de 1 ms.',
          'No se paga nada cuando la función no se ejecuta.',
          'El nivel gratuito incluye 400.000 GB-segundos al mes.',
          '**Provisioned Concurrency** reserva capacidad para eliminar el arranque en frío, con un coste adicional.'
        ] },
        { t: 'h', c: 'Buenas prácticas de diseño' },
        { t: 'ul', c: [
          'Mantener funciones **pequeñas y con una sola responsabilidad**.',
          'Inicializar clientes y conexiones **fuera del manejador** para reutilizarlos entre invocaciones.',
          'Configurar **memoria y tiempo** adecuados: más memoria también da más CPU.',
          'Usar **variables de entorno** cifradas con KMS y nunca secretos en el código.',
          'Evitar el **arranque en frío** en APIs sensibles con Provisioned Concurrency.',
          'Idempotencia en el procesamiento: una invocación puede repetirse.',
          'Observar con **CloudWatch**, **X-Ray** y **Lambda Insights**.'
        ] },
        { t: 'h', c: 'Lambda frente a EC2' },
        { t: 'tabla', cab: ['Criterio', 'Lambda', 'EC2'], filas: [
          ['Administración', 'Ninguna', 'Sistema operativo y parches'],
          ['Escalado', 'Automático y por invocación', 'Manual o con Auto Scaling'],
          ['Coste con poco uso', 'Muy bajo', 'Se paga la instancia encendida'],
          ['Coste con uso alto y constante', 'Puede ser mayor', 'Más económico con reservas'],
          ['Duración máxima', '15 minutos', 'Ilimitada'],
          ['Estado', 'Sin estado (usar servicios externos)', 'Con estado']
        ] }
      ],
      terminos: [
        { t: 'Sin servidor', d: 'Modelo en el que no se aprovisionan ni administran servidores.' },
        { t: 'Función', d: 'Unidad de código que Lambda ejecuta ante un evento.' },
        { t: 'Arranque en frío', d: 'Latencia adicional al inicializar un entorno de ejecución nuevo.' },
        { t: 'Concurrencia', d: 'Número de invocaciones que se ejecutan simultáneamente.' },
        { t: 'GB-segundo', d: 'Unidad de facturación de Lambda: memoria por tiempo de ejecución.' }
      ],
      quiz: [
        { p: '¿Cuál es el tiempo máximo de ejecución de una función Lambda?', op: ['5 minutos', '15 minutos', '1 hora', 'Ilimitado'], ok: 1, e: 'Lambda permite hasta 15 minutos (900 segundos) por invocación; para procesos más largos se usan otros servicios.' },
        { p: '¿Cómo se factura AWS Lambda?', op: ['Por instancia encendida por hora', 'Por número de peticiones y GB-segundo de ejecución', 'Por almacenamiento utilizado', 'Por usuario registrado'], ok: 1, e: 'Lambda cobra por invocaciones y por GB-segundo (memoria × tiempo), sin coste cuando no se ejecuta.' },
        { p: 'Una función debe ejecutarse cada vez que se sube una imagen a S3. ¿Qué mecanismo se configura?', op: ['Una notificación de evento de S3 que invoca la función', 'Un grupo de Auto Scaling', 'Una instancia reservada', 'Un host dedicado'], ok: 0, e: 'S3 puede enviar notificaciones de eventos que invocan directamente una función Lambda.' }
      ]
    },
    {
      id: 'm6s8',
      titulo: 'Introducción a AWS Elastic Beanstalk',
      resumen: 'AWS Elastic Beanstalk es un servicio PaaS: se entrega el código y la plataforma aprovisiona la infraestructura, despliega la aplicación, equilibra la carga y escala automáticamente.',
      objetivos: [
        'Explicar qué gestiona Beanstalk y qué sigue siendo responsabilidad del cliente.',
        'Describir los componentes: aplicación, versión, entorno y plataforma.',
        'Comparar las políticas de despliegue.'
      ],
      bloques: [
        { t: 'p', c: '**AWS Elastic Beanstalk** es un servicio de **plataforma como servicio (PaaS)** para desplegar aplicaciones web sin construir manualmente la infraestructura. Se sube el código y Beanstalk crea las instancias EC2, el balanceador de carga, los grupos de Auto Scaling y la configuración de salud.' },
        { t: 'nota', clase: 'tip', titulo: 'La clave del examen', c: 'Beanstalk **no es sin servidor**: por debajo sigue habiendo instancias EC2, balanceadores y Auto Scaling. Es una capa de automatización que puedes inspeccionar y ajustar. Y **no cobra** por sí mismo: se paga la infraestructura que crea.' },
        { t: 'h', c: 'Componentes' },
        { t: 'tabla', cab: ['Componente', 'Descripción'], filas: [
          ['Aplicación', 'Contenedor lógico de todas las versiones y entornos de un proyecto'],
          ['Versión', 'Una revisión concreta del código, almacenada en S3'],
          ['Entorno', 'Conjunto de recursos que ejecuta una versión (un entorno de producción y otro de pruebas)'],
          ['Plataforma', 'Combinación de sistema operativo, runtime y servidor web (por ejemplo, Python 3.12 en Amazon Linux 2023)'],
          ['Configuración', 'Ajustes de tamaño, red, escalado, salud y variables de entorno']
        ] },
        { t: 'h', c: 'Qué gestiona cada parte' },
        { t: 'tabla', cab: ['Tarea', 'Beanstalk', 'Cliente'], filas: [
          ['Aprovisionar EC2, ALB y Auto Scaling', 'Sí', '—'],
          ['Aplicar parches de la plataforma', 'Sí', '—'],
          ['Equilibrar la carga y escalar', 'Sí', 'Configuración de política'],
          ['Desplegar la versión nueva', 'Sí', 'Proporcionar el artefacto'],
          ['Escribir el código y las dependencias', '—', 'Sí'],
          ['Configurar la base de datos y los secretos', 'Parcialmente', 'Sí'],
          ['Monitorizar y ajustar la aplicación', 'Proporciona herramientas', 'Sí']
        ] },
        { t: 'h', c: 'Políticas de despliegue' },
        { t: 'tabla', cab: ['Política', 'Cómo funciona', 'Ventaja / inconveniente'], filas: [
          ['All at once', 'Despliega en todos los servidores a la vez', 'Más rápido; hay tiempo de inactividad'],
          ['Rolling', 'Sustituye por lotes con capacidad reducida', 'Sin caída total, pero con menos capacidad durante el despliegue'],
          ['Rolling with additional batch', 'Añade un lote extra y mantiene la capacidad completa', 'Sin pérdida de capacidad; más coste temporal'],
          ['Immutable', 'Crea un grupo nuevo con instancias nuevas y luego lo intercambia', 'Despliegue seguro y rápido de revertir; el más recomendado'],
          ['Traffic splitting', 'Envía un porcentaje del tráfico a la versión nueva', 'Pruebas controladas en producción']
        ] },
        { t: 'h', c: 'Flujo de trabajo' },
        { t: 'ol', c: [
          'Se crea una **aplicación** en Beanstalk desde la consola, la CLI o el archivo `eb`.',
          'Se elige una **plataforma** y se sube el código en un archivo ZIP o se conecta un repositorio.',
          'Beanstalk crea el **entorno**, las instancias y el balanceador.',
          'La aplicación queda accesible mediante un dominio propio del entorno.',
          'Con `eb deploy` se publica una nueva versión siguiendo la política elegida.',
          'Se supervisa la salud desde el panel y con CloudWatch.'
        ] },
        { t: 'h', c: 'Cuándo usar Beanstalk' },
        { t: 'ul', c: [
          'Aplicaciones web tradicionales en Java, .NET, Node.js, Python, Ruby, PHP o Go.',
          'Equipos pequeños que quieren desplegar rápido sin montar toda la infraestructura.',
          'Proyectos que necesitan controlar las instancias EC2 subyacentes.',
          'Migraciones rápidas de aplicaciones heredadas a un modelo gestionado.'
        ] },
        { t: 'h', c: 'Cuándo no usarlo' },
        { t: 'ul', c: [
          'Microservicios en contenedores: mejor ECS, EKS o App Runner.',
          'Funciones orientadas a eventos: mejor Lambda.',
          'Necesidad de control total del sistema operativo y de la red: mejor CloudFormation o CDK.',
          'Arquitecturas muy específicas que Beanstalk no puede modelar.'
        ] }
      ],
      terminos: [
        { t: 'Elastic Beanstalk', d: 'PaaS que aprovisiona y escala la infraestructura a partir del código de la aplicación.' },
        { t: 'Entorno', d: 'Conjunto de recursos de Beanstalk que ejecuta una versión concreta de la aplicación.' },
        { t: 'Plataforma', d: 'Combinación de SO, runtime y servidor web soportada por Beanstalk.' },
        { t: 'Despliegue inmutable', d: 'Crea un grupo nuevo de instancias y sustituye el anterior al finalizar.' },
        { t: 'eb CLI', d: 'Herramienta de línea de comandos para gestionar aplicaciones de Beanstalk.' }
      ],
      quiz: [
        { p: 'Elastic Beanstalk se clasifica principalmente como…', op: ['IaaS', 'PaaS', 'SaaS', 'FaaS'], ok: 1, e: 'Beanstalk es una plataforma como servicio: el cliente aporta el código y la plataforma gestiona la infraestructura.' },
        { p: '¿Cuál es la política de despliegue más segura, que crea un grupo nuevo de instancias y sustituye el anterior?', op: ['All at once', 'Rolling', 'Immutable', 'Manual'], ok: 2, e: 'El despliegue inmutable lanza instancias nuevas, valida y luego sustituye, con reversión sencilla.' },
        { p: '¿Qué coste tiene Elastic Beanstalk por sí mismo?', op: ['Una cuota fija mensual', 'Ninguno: se paga la infraestructura que crea', '0,10 USD por despliegue', 'El 10 % del gasto en EC2'], ok: 1, e: 'Beanstalk no tiene coste propio; se facturan los recursos subyacentes (EC2, ALB, almacenamiento).' }
      ]
    }
  ]
});
