/* Módulo 5 · Redes y entrega de contenido */
(window.MODULOS = window.MODULOS || []).push({
  id: 'm5',
  numero: 5,
  titulo: 'Redes y entrega de contenido',
  descripcion: 'Fundamentos de redes, diseño de una VPC, seguridad de red, DNS con Route 53 y distribución global de contenido con CloudFront.',
  duracion: '150 min',
  objetivo: 'Diseñar una VPC básica y explicar cómo Route 53 y CloudFront entregan contenido de forma rápida y segura.',
  secciones: [
    {
      id: 'm5s1',
      titulo: 'Conceptos básicos de las redes',
      resumen: 'Una red conecta dispositivos mediante direcciones IP, subredes, puertos y protocolos. La notación CIDR permite definir rangos de direcciones, y el DNS traduce nombres en direcciones.',
      objetivos: [
        'Interpretar una dirección IP y una máscara de subred en notación CIDR.',
        'Diferenciar direcciones públicas y privadas.',
        'Explicar el papel de puertos, protocolos, DNS y NAT.'
      ],
      bloques: [
        { t: 'p', c: 'Antes de diseñar una VPC conviene recordar cómo se comunican los equipos. Una red se describe con cuatro ideas: **direcciones**, **subredes**, **puertos** y **protocolos**.' },
        { t: 'h', c: 'Direcciones IP' },
        { t: 'ul', c: [
          '**IPv4:** 32 bits en cuatro octetos, por ejemplo `192.168.1.10`. Hay unos 4.300 millones de direcciones, ya agotadas.',
          '**IPv6:** 128 bits en hexadecimal, por ejemplo `2001:db8::1`. Prácticamente inagotable; AWS la soporta en VPC de forma opcional.',
          '**IP pública:** enrutable en internet; en AWS se asigna una IP pública efímera o una IP elástica.',
          '**IP privada:** solo válida dentro de la red. Los rangos reservados (RFC 1918) son `10.0.0.0/8`, `172.16.0.0/12` y `192.168.0.0/16`.'
        ] },
        { t: 'h', c: 'Notación CIDR' },
        { t: 'p', c: 'CIDR expresa una red como `dirección/prefijo`. El prefijo indica cuántos bits identifican la red; los restantes identifican hosts. Cada bit que se quita al prefijo **duplica** el número de direcciones.' },
        { t: 'tabla', cab: ['Bloque', 'Direcciones totales', 'Uso típico'], filas: [
          ['/16', '65.536', 'VPC grande'],
          ['/20', '4.096', 'Subred amplia'],
          ['/24', '256', 'Subred estándar'],
          ['/28', '16', 'Subred pequeña (AWS reserva 5 direcciones)']
        ] },
        { t: 'nota', clase: 'examen', titulo: 'AWS reserva 5 direcciones', c: 'En cada subred, AWS reserva la primera (dirección de red), la segunda (router), la tercera (DNS), la cuarta (futuro) y la última (broadcast). Una subred /24 tiene 251 direcciones utilizables.' },
        { t: 'h', c: 'Puertos y protocolos' },
        { t: 'tabla', cab: ['Puerto', 'Protocolo', 'Servicio'], filas: [
          ['22', 'TCP', 'SSH (administración de Linux)'],
          ['3389', 'TCP', 'RDP (administración de Windows)'],
          ['80', 'TCP', 'HTTP'],
          ['443', 'TCP', 'HTTPS / TLS'],
          ['3306', 'TCP', 'MySQL / Aurora'],
          ['5432', 'TCP', 'PostgreSQL'],
          ['1433', 'TCP', 'SQL Server'],
          ['53', 'TCP/UDP', 'DNS']
        ] },
        { t: 'p', c: 'Protocolos habituales: **TCP** (orientado a conexión, garantiza entrega), **UDP** (sin conexión, baja latencia) e **ICMP** (diagnóstico, `ping`).' },
        { t: 'h', c: 'Subredes y enrutamiento' },
        { t: 'p', c: 'Una **subred** es una división lógica de una red. Los dispositivos de la misma subred se comunican directamente; para salir a otra red necesitan un **router** o **gateway**. En AWS, cada subred vive en una única zona de disponibilidad y tiene asociada una **tabla de rutas**.' },
        { t: 'h', c: 'DNS: traducir nombres' },
        { t: 'p', c: 'El **Sistema de Nombres de Dominio** convierte nombres legibles (`www.ejemplo.com`) en direcciones IP. La resolución es jerárquica: resolutor → servidor raíz → servidor del dominio de nivel superior (`.com`) → servidor autoritativo del dominio. Los registros más comunes son **A** (IPv4), **AAAA** (IPv6), **CNAME** (alias), **MX** (correo), **TXT** (verificación) y **NS** (servidores de nombres).' },
        { t: 'h', c: 'NAT y firewalls' },
        { t: 'ul', c: [
          '**NAT (Network Address Translation):** permite que muchos dispositivos privados compartan una IP pública. En AWS lo implementa el NAT Gateway.',
          '**Firewall:** filtra tráfico según reglas. En AWS se usan grupos de seguridad y listas de control de acceso a nivel de subred.',
          '**Latencia:** tiempo que tarda un paquete en llegar. **Ancho de banda:** cantidad de datos por segundo. No son lo mismo.'
        ] },
        { t: 'nota', clase: 'tip', titulo: 'Base para lo que viene', c: 'Si entiendes IP, CIDR, subred, puerto, ruta y DNS, el resto del módulo (VPC, Route 53, CloudFront) se vuelve intuitivo: todo son variaciones de estas piezas.' }
      ],
      terminos: [
        { t: 'CIDR', d: 'Notación dirección/prefijo que define el tamaño de una red.' },
        { t: 'IP privada', d: 'Dirección no enrutable en internet, dentro de los rangos RFC 1918.' },
        { t: 'NAT', d: 'Traducción de direcciones que permite salir a internet desde redes privadas.' },
        { t: 'DNS', d: 'Sistema que traduce nombres de dominio en direcciones IP.' },
        { t: 'Subred', d: 'División lógica de una red con un rango de direcciones propio.' }
      ],
      quiz: [
        { p: '¿Cuántas direcciones IP utilizables hay en una subred /24 de AWS?', op: ['256', '254', '251', '250'], ok: 2, e: 'Una /24 tiene 256 direcciones, de las que AWS reserva 5; quedan 251 utilizables.' },
        { p: '¿Cuál de estos rangos es una dirección IP privada?', op: ['8.8.8.8', '192.168.1.25', '52.94.10.1', '2001:db8::1'], ok: 1, e: '192.168.0.0/16 es uno de los rangos privados RFC 1918, junto con 10.0.0.0/8 y 172.16.0.0/12.' },
        { p: '¿Qué protocolo se usa habitualmente para administrar una instancia Linux de forma remota?', op: ['RDP en el puerto 3389', 'SSH en el puerto 22', 'HTTP en el puerto 80', 'DNS en el puerto 53'], ok: 1, e: 'SSH usa el puerto TCP 22; RDP (puerto 3389) se usa para Windows.' }
      ]
    },
    {
      id: 'm5s2',
      titulo: 'Amazon VPC',
      resumen: 'Amazon VPC permite crear una red virtual aislada en AWS, con su rango de direcciones, subredes públicas y privadas, puertas de enlace y tablas de rutas.',
      objetivos: [
        'Describir la arquitectura básica de una VPC.',
        'Diferenciar subred pública y privada, e internet gateway y NAT gateway.',
        'Explicar el papel de las tablas de rutas y las interfaces de red.'
      ],
      bloques: [
        { t: 'p', c: '**Amazon Virtual Private Cloud (VPC)** es el servicio que permite definir una **red virtual aislada** dentro de una región de AWS: se elige el rango de direcciones, se divide en subredes y se decide qué puede entrar y salir. Prácticamente todos los recursos con red (EC2, RDS, Lambda en VPC, EKS) viven dentro de una VPC.' },
        { t: 'h', c: 'Componentes de una VPC' },
        { t: 'tabla', cab: ['Componente', 'Función'], filas: [
          ['Bloque CIDR de la VPC', 'Rango de direcciones privadas de toda la red, por ejemplo 10.0.0.0/16'],
          ['Subred', 'División de la VPC en una zona de disponibilidad concreta'],
          ['Tabla de rutas', 'Decide a dónde se dirige el tráfico de cada subred'],
          ['Internet Gateway (IGW)', 'Permite la comunicación con internet; se asocia a la VPC'],
          ['NAT Gateway', 'Permite que recursos privados salgan a internet sin ser accesibles desde fuera'],
          ['Interfaz de red elástica (ENI)', 'Tarjeta de red virtual que se conecta a una instancia o servicio'],
          ['Grupo de seguridad', 'Firewall a nivel de recurso'],
          ['Lista de control de acceso (NACL)', 'Firewall a nivel de subred'],
          ['VPC Endpoint', 'Acceso privado a servicios de AWS sin pasar por internet']
        ] },
        { t: 'esquema', c: [
          { titulo: 'Internet', sub: 'Usuarios y servicios' },
          { titulo: 'Internet Gateway', sub: 'Entrada y salida' },
          { titulo: 'Subred pública', sub: 'Balanceador, bastión' },
          { titulo: 'Subred privada', sub: 'Aplicación y base de datos' }
        ] },
        { t: 'h', c: 'Subred pública frente a privada' },
        { t: 'p', c: 'La diferencia no está en el nombre, sino en la **tabla de rutas**. Una subred es **pública** si su tabla de rutas tiene una ruta `0.0.0.0/0` hacia un **Internet Gateway**. Es **privada** si no la tiene; para salir a internet usa un **NAT Gateway** situado en una subred pública.' },
        { t: 'nota', clase: 'examen', titulo: 'No confundas', c: '**IGW**: bidireccional, permite que internet inicie conexiones. **NAT Gateway**: solo salida, impide conexiones entrantes. Colocar una base de datos en una subred privada es la práctica recomendada.' },
        { t: 'h', c: 'Arquitectura de referencia' },
        { t: 'ul', c: [
          '**Capa web pública:** balanceador de carga en dos subredes públicas, una por zona de disponibilidad.',
          '**Capa de aplicación privada:** instancias EC2 o contenedores en subredes privadas, sin IP pública.',
          '**Capa de datos privada:** Amazon RDS Multi-AZ o DynamoDB con acceso mediante endpoint, sin salida a internet.',
          '**Salida controlada:** NAT Gateway por zona de disponibilidad para actualizaciones y parches.',
          '**Administración:** AWS Systems Manager Session Manager en lugar de un bastión con SSH abierto.'
        ] },
        { t: 'h', c: 'La VPC predeterminada' },
        { t: 'p', c: 'Cada región y cada cuenta incluye una **VPC predeterminada** con subredes públicas en cada zona de disponibilidad, internet gateway y rutas listas. Es cómoda para pruebas, pero en producción se recomienda crear VPC propias con segmentación. Una cuenta de AWS Academy suele tener una VPC por defecto disponible para los laboratorios.' },
        { t: 'h', c: 'Crear una VPC paso a paso' },
        { t: 'ol', c: [
          'Elegir y **reservar el bloque CIDR** (por ejemplo `10.0.0.0/16`), evitando solapamientos con redes locales.',
          'Crear **subredes** en al menos dos zonas de disponibilidad, separando públicas y privadas.',
          'Adjuntar un **Internet Gateway** y crear la ruta `0.0.0.0/0` en las tablas de las subredes públicas.',
          'Desplegar un **NAT Gateway** en cada subred pública y enrutar por él las subredes privadas.',
          'Configurar **grupos de seguridad** y NACL por capas.',
          'Activar **VPC Flow Logs** para auditar el tráfico.',
          'Añadir **endpoints** para S3 y DynamoDB y evitar costes de NAT.'
        ] },
        { t: 'nota', clase: 'tip', titulo: 'Planifica el direccionamiento', c: 'Cambiar el CIDR de una VPC después es complicado. Reserva espacio para crecimiento y para futuras VPC que deban conectarse por peering o Transit Gateway sin solaparse.' }
      ],
      terminos: [
        { t: 'Amazon VPC', d: 'Red virtual aislada y configurable dentro de una región de AWS.' },
        { t: 'Internet Gateway', d: 'Puerta de enlace que conecta una VPC con internet.' },
        { t: 'NAT Gateway', d: 'Permite la salida a internet de subredes privadas sin permitir entradas.' },
        { t: 'Subred pública', d: 'Subred cuya tabla de rutas apunta a un Internet Gateway.' },
        { t: 'ENI', d: 'Interfaz de red elástica que conecta un recurso con la VPC.' },
        { t: 'VPC Endpoint', d: 'Punto de acceso privado a un servicio de AWS sin salir a internet.' }
      ],
      quiz: [
        { p: '¿Qué determina que una subred sea pública en AWS?', op: ['Que tenga una IP pública asignada', 'Que su tabla de rutas incluya una ruta a un Internet Gateway', 'Que esté en la zona a', 'Que tenga un grupo de seguridad abierto'], ok: 1, e: 'Una subred es pública si su tabla de rutas dirige el tráfico 0.0.0.0/0 a un Internet Gateway.' },
        { p: '¿Cómo pueden las instancias de una subred privada descargar actualizaciones de internet?', op: ['Con una IP pública', 'A través de un NAT Gateway en una subred pública', 'Usando el Internet Gateway directamente', 'No es posible'], ok: 1, e: 'El NAT Gateway permite iniciar conexiones salientes desde subredes privadas sin exponerlas a conexiones entrantes.' },
        { p: '¿Cuántas zonas de disponibilidad debe abarcar como mínimo una subred?', op: ['Todas las de la región', 'Exactamente una', 'Dos o más', 'Ninguna'], ok: 1, e: 'Una subred está asociada a una única zona de disponibilidad. Para alta disponibilidad se crean subredes en varias zonas.' }
      ]
    },
    {
      id: 'm5s3',
      titulo: 'Redes de VPC',
      resumen: 'Las VPC se conectan entre sí, con redes locales y con servicios de AWS mediante peering, Transit Gateway, VPN, Direct Connect y endpoints privados.',
      objetivos: [
        'Elegir el mecanismo de conexión adecuado entre redes.',
        'Explicar VPC Peering y Transit Gateway.',
        'Diferenciar los endpoints de puerta de enlace e interfaz.'
      ],
      bloques: [
        { t: 'p', c: 'Una VPC no vive aislada. Las organizaciones necesitan conectar VPC entre sí, con sus centros de datos y con servicios gestionados. AWS ofrece varias opciones según el alcance y el requisito de seguridad.' },
        { t: 'h', c: 'VPC Peering' },
        { t: 'p', c: 'Una **conexión de peering** une dos VPC (de la misma o distinta cuenta o región) como si estuvieran en la misma red, con direcciones IP propias y sin solapamientos. El tráfico va por la red de AWS, no por internet. **No es transitiva:** si A está emparejada con B y B con C, A no habla con C salvo que se cree otro peering.' },
        { t: 'nota', clase: 'examen', titulo: 'Peering no es transitivo', c: 'Es una limitación clásica de examen. Con muchas VPC, mantener una malla de peerings se vuelve inmanejable; ahí entra Transit Gateway.' },
        { t: 'h', c: 'AWS Transit Gateway' },
        { t: 'p', c: '**Transit Gateway** actúa como un **concentrador de red** (hub and spoke): cada VPC, VPN o conexión Direct Connect se conecta una sola vez al hub y este enruta entre todas ellas. Simplifica la topología y permite segmentar mediante tablas de rutas asociadas.' },
        { t: 'h', c: 'Conexión con el centro de datos' },
        { t: 'tabla', cab: ['Opción', 'Cómo funciona', 'Cuándo usarla'], filas: [
          ['Site-to-Site VPN', 'Túneles IPsec sobre internet entre la red local y AWS', 'Conexión rápida de establecer y económica, con ancho de banda variable'],
          ['AWS Client VPN', 'VPN de acceso remoto para usuarios individuales', 'Teletrabajo y acceso de administradores'],
          ['AWS Direct Connect', 'Conexión física dedicada con un proveedor de telecomunicaciones', 'Tráfico estable, mayor ancho de banda y menor coste de salida a gran escala'],
          ['Direct Connect + VPN', 'Cifrado sobre una conexión dedicada', 'Máxima seguridad y rendimiento predecible'],
          ['AWS Cloud WAN', 'Red global gestionada que conecta sedes y VPC', 'Organizaciones con muchas ubicaciones']
        ] },
        { t: 'h', c: 'Endpoints: acceso privado a servicios de AWS' },
        { t: 'p', c: 'Por defecto, una instancia en una subred privada que llama a S3 sale por el NAT Gateway y vuelve a entrar por internet. Los **VPC Endpoints** evitan ese rodeo y permiten acceder al servicio por la red de AWS.' },
        { t: 'tabla', cab: ['Tipo', 'Funcionamiento', 'Servicios'], filas: [
          ['Endpoint de puerta de enlace', 'Se añade una ruta en la tabla de rutas hacia el servicio', 'Amazon S3 y Amazon DynamoDB (gratuitos)'],
          ['Endpoint de interfaz', 'Crea una ENI con dirección privada en la subred (AWS PrivateLink)', 'La mayoría de servicios de AWS y servicios de terceros']
        ] },
        { t: 'h', c: 'Otros elementos de red' },
        { t: 'ul', c: [
          '**AWS PrivateLink:** expone un servicio de forma privada a otras VPC sin peering ni exposición a internet.',
          '**AWS Resource Access Manager (RAM):** comparte subredes, transit gateways y otros recursos entre cuentas.',
          '**VPC Sharing:** varias cuentas despliegan recursos en subredes de una VPC común, simplificando la red.',
          '**Elastic IP:** dirección IPv4 pública estática que se puede reasignar entre recursos.',
          '**Placement groups:** agrupaciones de instancias con estrategia de colocación (cluster, spread, partition).',
          '**VPC Flow Logs:** registros del tráfico IP que atraviesa las interfaces de red.'
        ] },
        { t: 'h', c: 'Cómo elegir' },
        { t: 'tabla', cab: ['Necesidad', 'Solución'], filas: [
          ['Dos VPC que deben comunicarse', 'VPC Peering'],
          ['Decenas de VPC y redes locales', 'Transit Gateway'],
          ['Conexión rápida y económica a la oficina', 'Site-to-Site VPN'],
          ['Conexión dedicada y estable al centro de datos', 'Direct Connect'],
          ['Usuarios remotos', 'Client VPN o AWS Verified Access'],
          ['Acceso a S3 sin salir a internet', 'VPC Gateway Endpoint'],
          ['Servicio propio consumido por otra VPC', 'AWS PrivateLink']
        ] }
      ],
      terminos: [
        { t: 'VPC Peering', d: 'Conexión privada entre dos VPC, no transitiva.' },
        { t: 'Transit Gateway', d: 'Concentrador que conecta muchas VPC y redes locales con enrutamiento centralizado.' },
        { t: 'Direct Connect', d: 'Conexión física dedicada entre el centro de datos del cliente y AWS.' },
        { t: 'VPC Endpoint', d: 'Acceso privado a servicios de AWS desde una VPC.' },
        { t: 'PrivateLink', d: 'Tecnología que expone servicios de forma privada entre VPC y cuentas.' },
        { t: 'AWS RAM', d: 'Servicio para compartir recursos como subredes entre cuentas.' }
      ],
      quiz: [
        { p: '¿Cuál es una limitación clave de VPC Peering?', op: ['Solo funciona dentro de la misma región', 'No es transitivo', 'No admite cifrado', 'Solo conecta dos subredes'], ok: 1, e: 'El peering no es transitivo: si A-B y B-C están emparejadas, A y C no se comunican sin un peering directo o Transit Gateway.' },
        { p: '¿Qué opción ofrece una conexión física dedicada y privada entre el centro de datos y AWS?', op: ['Site-to-Site VPN', 'AWS Direct Connect', 'VPC Peering', 'Internet Gateway'], ok: 1, e: 'Direct Connect proporciona una conexión física dedicada con un proveedor de telecomunicaciones.' },
        { p: '¿Qué tipo de endpoint se usa para acceder a Amazon S3 desde una VPC sin coste de hora?', op: ['Endpoint de interfaz', 'Endpoint de puerta de enlace', 'NAT Gateway', 'Transit Gateway'], ok: 1, e: 'Los endpoints de puerta de enlace para S3 y DynamoDB son gratuitos y se implementan mediante rutas.' }
      ]
    },
    {
      id: 'm5s4',
      titulo: 'Seguridad de VPC',
      resumen: 'Los grupos de seguridad actúan como firewall con estado a nivel de recurso, y las NACL como filtro sin estado a nivel de subred. La combinación de ambos define la seguridad de red.',
      objetivos: [
        'Diferenciar grupos de seguridad y NACL.',
        'Explicar el comportamiento con estado de los grupos de seguridad.',
        'Diseñar una arquitectura de red segmentada por capas.'
      ],
      bloques: [
        { t: 'p', c: 'AWS ofrece dos mecanismos de filtrado complementarios. Entender la diferencia entre ellos es una de las preguntas más frecuentes del examen.' },
        { t: 'h', c: 'Grupos de seguridad (Security Groups)' },
        { t: 'ul', c: [
          'Actúan a nivel de **recurso** (instancia, ENI, base de datos, balanceador).',
          'Son **con estado**: si se permite una conexión entrante, la respuesta sale automáticamente.',
          'Solo tienen reglas de **permitir**; lo que no está permitido, se deniega.',
          'Cada regla especifica protocolo, puerto y origen/destino (CIDR u otro grupo de seguridad).',
          'Se pueden encadenar: el grupo de la aplicación permite tráfico solo desde el grupo del balanceador.'
        ] },
        { t: 'h', c: 'Listas de control de acceso a la red (NACL)' },
        { t: 'ul', c: [
          'Actúan a nivel de **subred** y se aplican a todas sus instancias.',
          'Son **sin estado**: hay que definir reglas de entrada y de salida explícitamente, incluidas las de retorno.',
          'Soportan reglas de **permitir y denegar**.',
          'Las reglas se evalúan **por número**, de menor a mayor; la primera coincidencia decide.',
          'La NACL predeterminada permite todo; una NACL nueva deniega todo hasta que se añaden reglas.'
        ] },
        { t: 'nota', clase: 'examen', titulo: 'La tabla que hay que recordar', c: '**Grupo de seguridad:** recurso · con estado · solo permitir · todo denegado por defecto. **NACL:** subred · sin estado · permitir y denegar · evaluación por número de regla.' },
        { t: 'tabla', cab: ['Característica', 'Grupo de seguridad', 'NACL'], filas: [
          ['Nivel', 'Recurso', 'Subred'],
          ['Estado', 'Con estado', 'Sin estado'],
          ['Reglas', 'Solo permitir', 'Permitir y denegar'],
          ['Evaluación', 'Todas las reglas', 'Orden numérico, primera coincidencia'],
          ['Aplicación', 'Se asigna a recursos', 'Se asocia a subredes'],
          ['Predeterminado', 'Deniega todo', 'La NACL por defecto permite todo']
        ] },
        { t: 'h', c: 'Diseño por capas' },
        { t: 'ol', c: [
          '**Capa de borde:** CloudFront, AWS WAF y Shield para filtrar tráfico malicioso antes de llegar a la VPC.',
          '**Capa pública:** Application Load Balancer con un grupo de seguridad que acepta 443 desde internet.',
          '**Capa de aplicación:** instancias privadas que aceptan tráfico solo desde el grupo del balanceador.',
          '**Capa de datos:** base de datos que acepta el puerto correspondiente solo desde el grupo de la aplicación.',
          '**NACL:** regla adicional a nivel de subred para bloquear rangos o puertos conocidos maliciosos.'
        ] },
        { t: 'h', c: 'Otras herramientas de seguridad de red' },
        { t: 'ul', c: [
          '**Bastión (jump host):** servidor público para administrar recursos privados. Cada vez se sustituye más por **AWS Systems Manager Session Manager**, que no requiere puertos abiertos.',
          '**AWS Network Firewall:** firewall gestionado con inspección profunda de paquetes y reglas de dominio.',
          '**VPC Flow Logs:** registros de tráfico aceptado y rechazado, esenciales para investigar incidentes.',
          '**Reachability Analyzer:** comprueba si existe conectividad entre dos recursos y explica por qué no.'
        ] },
        { t: 'nota', clase: 'aviso', titulo: 'Error habitual', c: 'Abrir SSH (22) o RDP (3389) a `0.0.0.0/0` es una de las causas más comunes de compromiso de instancias. Restringe el origen a direcciones concretas o usa Session Manager.' }
      ],
      terminos: [
        { t: 'Grupo de seguridad', d: 'Firewall con estado a nivel de recurso que solo permite tráfico autorizado.' },
        { t: 'NACL', d: 'Firewall sin estado a nivel de subred con reglas de permitir y denegar.' },
        { t: 'Bastión', d: 'Instancia pública usada como punto de salto para administrar recursos privados.' },
        { t: 'Session Manager', d: 'Acceso a instancias sin abrir puertos ni usar claves SSH.' },
        { t: 'Network Firewall', d: 'Firewall gestionado con inspección de tráfico en la VPC.' }
      ],
      quiz: [
        { p: '¿Cuál es una diferencia clave entre un grupo de seguridad y una NACL?', op: ['El grupo de seguridad es sin estado y la NACL con estado', 'El grupo de seguridad solo permite y la NACL permite y deniega', 'La NACL se aplica a instancias individuales', 'El grupo de seguridad se evalúa por número de regla'], ok: 1, e: 'Los grupos de seguridad solo tienen reglas de permiso; las NACL permiten y deniegan, y se evalúan por orden numérico.' },
        { p: 'Si se permite tráfico entrante en un grupo de seguridad, ¿qué ocurre con el tráfico de respuesta?', op: ['Se bloquea salvo que se cree una regla de salida', 'Se permite automáticamente porque el grupo es con estado', 'Depende de la NACL únicamente', 'Se registra pero se descarta'], ok: 1, e: 'Los grupos de seguridad son con estado: el tráfico de respuesta se permite automáticamente.' },
        { p: '¿Qué herramienta permite administrar instancias privadas sin abrir el puerto 22?', op: ['Un bastión con IP elástica', 'AWS Systems Manager Session Manager', 'Un NAT Gateway', 'Un grupo de seguridad'], ok: 1, e: 'Session Manager permite acceso interactivo a través del agente de SSM sin abrir puertos ni gestionar claves SSH.' }
      ]
    },
    {
      id: 'm5s5',
      titulo: 'Route 53',
      resumen: 'Amazon Route 53 es el servicio de DNS gestionado de AWS: registra dominios, resuelve nombres con alta disponibilidad y aplica políticas de enrutamiento como latencia, ponderación o conmutación por error.',
      objetivos: [
        'Explicar el funcionamiento de una zona alojada y de los registros DNS.',
        'Elegir la política de enrutamiento adecuada para cada caso.',
        'Configurar comprobaciones de estado y conmutación por error.'
      ],
      bloques: [
        { t: 'p', c: '**Amazon Route 53** es el servicio de DNS gestionado de AWS. Su nombre viene de que el DNS utiliza el puerto 53. Es un servicio **global** con una disponibilidad del 100 % en su acuerdo de nivel de servicio, y cumple tres funciones: **registrar dominios**, **alojar zonas DNS** y **enrutar tráfico** con políticas avanzadas.' },
        { t: 'h', c: 'Zonas alojadas' },
        { t: 'ul', c: [
          '**Zona pública:** contiene los registros visibles desde internet (`www.midominio.com`).',
          '**Zona privada:** contiene registros resolubles solo desde dentro de una o varias VPC (`db.interno`).',
          'Cada zona tiene cuatro servidores de nombres (NS) que deben configurarse en el registrador del dominio.'
        ] },
        { t: 'h', c: 'Tipos de registro' },
        { t: 'tabla', cab: ['Registro', 'Función'], filas: [
          ['A', 'Nombre → dirección IPv4'],
          ['AAAA', 'Nombre → dirección IPv6'],
          ['CNAME', 'Alias de un nombre a otro nombre; no se puede usar en la raíz del dominio'],
          ['Alias (específico de Route 53)', 'Nombre → recurso de AWS (S3, CloudFront, ELB); gratuito y usable en la raíz'],
          ['MX', 'Servidores de correo del dominio'],
          ['TXT', 'Texto libre; verificación de dominio y SPF/DKIM'],
          ['NS', 'Servidores de nombres autoritativos de la zona'],
          ['SOA', 'Información de autoridad de la zona'],
          ['CAA', 'Autoridades de certificación permitidas']
        ] },
        { t: 'nota', clase: 'examen', titulo: 'Alias frente a CNAME', c: 'Un registro **Alias** apunta a recursos de AWS y **no cuesta**, puede usarse en la raíz del dominio y responde directamente con la IP del recurso. Un **CNAME** no se permite en la raíz (`ejemplo.com`) y se factura como consulta.' },
        { t: 'h', c: 'Políticas de enrutamiento' },
        { t: 'tabla', cab: ['Política', 'Cómo funciona', 'Caso de uso'], filas: [
          ['Simple', 'Un registro con uno o varios valores', 'Sitio web con un único destino'],
          ['Ponderada', 'Reparte el tráfico según pesos (0-255)', 'Pruebas A/B, despliegues graduales'],
          ['Por latencia', 'Dirige a la región con menor latencia para el usuario', 'Aplicaciones globales con réplicas regionales'],
          ['Por geolocalización', 'Según el país del usuario', 'Contenido localizado o requisitos legales'],
          ['Por geoproximidad', 'Según la distancia geográfica, con posibilidad de sesgo', 'Redirigir a la región más cercana con control fino'],
          ['Conmutación por error', 'Activa el destino secundario si el primario falla', 'Recuperación ante desastres'],
          ['Multivalor', 'Devuelve varios registros sanos al azar', 'Balanceo básico con comprobaciones de estado'],
          ['IP-based', 'Según el rango de IP del cliente', 'Personalización por red de origen']
        ] },
        { t: 'h', c: 'Comprobaciones de estado' },
        { t: 'p', c: 'Las **health checks** monitorizan un endpoint (HTTP, HTTPS, TCP) desde varias ubicaciones. Si falla, Route 53 deja de devolverlo y, en una configuración de failover, responde con el recurso secundario. También pueden vigilar el estado de un recurso de AWS y combinarse con alarmas de CloudWatch.' },
        { t: 'h', c: 'Route 53 Resolver' },
        { t: 'p', c: '**Route 53 Resolver** (antes .2) resuelve nombres dentro de una VPC. Con los **endpoints de resolución entrante y saliente** se conecta el DNS de la VPC con el DNS del centro de datos, de modo que las máquinas locales puedan resolver nombres de AWS y viceversa.' },
        { t: 'h', c: 'Buenas prácticas' },
        { t: 'ul', c: [
          'Usar **Alias** hacia CloudFront, ALB o S3 en lugar de CNAME cuando sea posible.',
          'Configurar **TTL bajos** (por ejemplo 60 s) en registros de failover para que el cambio sea rápido.',
          'Activar **comprobaciones de estado** y alarmas de CloudWatch asociadas.',
          'Separar zonas públicas y privadas y restringir la resolución privada a las VPC necesarias.',
          'Registrar el dominio en Route 53 o delegar los NS desde otro registrador.'
        ] }
      ],
      terminos: [
        { t: 'Route 53', d: 'Servicio de DNS gestionado, global y de alta disponibilidad de AWS.' },
        { t: 'Zona alojada', d: 'Contenedor de registros DNS de un dominio, público o privado.' },
        { t: 'Registro Alias', d: 'Registro especial de Route 53 que apunta a recursos de AWS sin coste.' },
        { t: 'Política de enrutamiento', d: 'Regla que determina qué destino se devuelve a cada consulta DNS.' },
        { t: 'Health check', d: 'Comprobación periódica del estado de un endpoint.' },
        { t: 'TTL', d: 'Tiempo que los resolutores pueden cachear un registro.' }
      ],
      quiz: [
        { p: 'Una empresa quiere enviar el 10 % del tráfico a una nueva versión de su aplicación. ¿Qué política de enrutamiento usar?', op: ['Simple', 'Ponderada', 'Por latencia', 'Conmutación por error'], ok: 1, e: 'La política ponderada permite repartir el tráfico según pesos, ideal para despliegues graduales.' },
        { p: '¿Qué ventaja tiene un registro Alias frente a un CNAME en Route 53?', op: ['Permite usar cualquier TLD', 'Es gratuito y se puede usar en la raíz del dominio', 'Tiene TTL infinito', 'No necesita zona alojada'], ok: 1, e: 'Los registros Alias apuntan a recursos de AWS, no generan coste de consulta y pueden usarse en el dominio raíz.' },
        { p: '¿Qué política de Route 53 redirige automáticamente al recurso secundario si el primario no responde?', op: ['Multivalor', 'Conmutación por error (failover)', 'Geolocalización', 'Simple'], ok: 1, e: 'La política de failover usa comprobaciones de estado para enviar el tráfico al secundario cuando el primario falla.' }
      ]
    },
    {
      id: 'm5s6',
      titulo: 'CloudFront',
      resumen: 'Amazon CloudFront es la red de entrega de contenido de AWS: cachea contenido en ubicaciones de borde cercanas al usuario, reduce la latencia y protege el origen.',
      objetivos: [
        'Explicar cómo funciona una distribución de CloudFront.',
        'Configurar orígenes, TTL e invalidaciones.',
        'Aplicar controles de seguridad y acceso privado al contenido.'
      ],
      bloques: [
        { t: 'p', c: '**Amazon CloudFront** es el servicio de **red de entrega de contenido (CDN)** de AWS. Mantiene copias del contenido en cientos de ubicaciones de borde y sirve cada petición desde la más cercana al usuario. El resultado: menos latencia, menos carga en el origen y mejor protección frente a ataques.' },
        { t: 'h', c: 'Cómo funciona' },
        { t: 'esquema', c: [
          { titulo: 'Usuario', sub: 'Madrid' },
          { titulo: 'Ubicación de borde', sub: 'Caché cercana' },
          { titulo: 'Origen', sub: 'S3, ALB, EC2' }
        ] },
        { t: 'ol', c: [
          'El usuario solicita `https://cdn.ejemplo.com/imagen.jpg`.',
          'El DNS dirige la petición a la ubicación de borde más cercana.',
          'Si el objeto está en caché y no ha caducado, se devuelve al instante (**acierto**).',
          'Si no está (**fallo**), la ubicación de borde lo pide al origen, lo cachea y lo devuelve.',
          'Las peticiones posteriores se sirven desde la caché hasta que expire el TTL.'
        ] },
        { t: 'h', c: 'Conceptos clave' },
        { t: 'tabla', cab: ['Concepto', 'Descripción'], filas: [
          ['Distribución', 'Configuración de CloudFront con un dominio propio (por ejemplo d111111abcdef8.cloudfront.net)'],
          ['Origen', 'De dónde obtiene el contenido: bucket S3, ALB, instancia EC2, API Gateway o servidor propio'],
          ['Comportamiento de caché', 'Reglas por ruta: qué se cachea, durante cuánto tiempo y qué parámetros influyen'],
          ['TTL', 'Tiempo de vida del objeto en caché; se controla con cabeceras Cache-Control o con la configuración'],
          ['Invalidación', 'Solicitud explícita de eliminar objetos de la caché (tiene coste si es masiva)'],
          ['Origen de grupo', 'Varios orígenes con conmutación por error'],
          ['Georestricción', 'Permitir o bloquear países'],
          ['Clases de precio', 'Limitar las ubicaciones de borde usadas para reducir coste'],
          ['Certificado', 'TLS gratuito con AWS Certificate Manager en us-east-1']
        ] },
        { t: 'nota', clase: 'tip', titulo: 'Versiones en lugar de invalidaciones', c: 'Es más barato y fiable publicar `app.v2.js` que invalidar `app.js` en toda la red. Las invalidaciones cuentan con una cuota mensual gratuita y luego se facturan.' },
        { t: 'h', c: 'Seguridad y acceso privado' },
        { t: 'ul', c: [
          '**Origin Access Control (OAC):** permite que CloudFront acceda a un bucket S3 privado sin hacerlo público. Sustituye al antiguo OAI.',
          '**URLs y cookies firmadas:** entregan contenido restringido durante un tiempo limitado, útil para vídeo de pago o descargas privadas.',
          '**HTTPS obligatorio:** redirección automática de HTTP y TLS con certificados de ACM.',
          '**AWS WAF:** se asocia a la distribución para bloquear inyecciones, bots y peticiones maliciosas.',
          '**AWS Shield Standard:** protege de forma automática frente a DDoS en todas las distribuciones.',
          '**Cabeceras personalizadas y secretos:** verifican que las peticiones llegan realmente de CloudFront.'
        ] },
        { t: 'h', c: 'Personalización en el borde' },
        { t: 'tabla', cab: ['Servicio', 'Qué permite'], filas: [
          ['CloudFront Functions', 'Reescrituras y redirecciones ligeras en el borde, en milisegundos y a bajo coste'],
          ['Lambda@Edge', 'Ejecutar funciones Lambda en el borde con más capacidad y acceso a la red'],
          ['Respuestas personalizadas de error', 'Devolver páginas propias ante errores 403 o 404'],
          ['Compresión automática', 'Comprimir texto, HTML, CSS y JavaScript para reducir transferencia']
        ] },
        { t: 'h', c: 'Casos de uso' },
        { t: 'ul', c: [
          'Sitios web estáticos alojados en S3 con HTTPS y dominio propio.',
          'Distribución global de imágenes, vídeo y software.',
          'Aceleración de APIs dinámicas con ALB como origen.',
          'Entrega de contenido bajo suscripción con URLs firmadas.',
          'Protección del origen ocultándolo tras CloudFront y OAC.',
          'Streaming de vídeo con AWS MediaPackage y CloudFront.'
        ] },
        { t: 'h', c: 'CloudFront frente a Global Accelerator' },
        { t: 'p', c: '**CloudFront** cachea contenido HTTP/HTTPS y lo sirve desde el borde. **AWS Global Accelerator** no cachea: dirige el tráfico TCP/UDP por la red global de AWS hasta el endpoint más cercano, mejorando la latencia de aplicaciones dinámicas y no HTTP. Si la pregunta dice «contenido estático y caché», es CloudFront; si dice «mejorar el rendimiento de tráfico TCP/UDP sin caché», es Global Accelerator.' }
      ],
      terminos: [
        { t: 'CloudFront', d: 'CDN de AWS que cachea contenido en ubicaciones de borde.' },
        { t: 'Distribución', d: 'Configuración de CloudFront que define orígenes, comportamientos y dominio.' },
        { t: 'TTL', d: 'Tiempo durante el cual un objeto permanece válido en la caché.' },
        { t: 'Invalidación', d: 'Eliminación forzada de objetos de la caché de CloudFront.' },
        { t: 'OAC', d: 'Origin Access Control: acceso privado de CloudFront a un bucket S3.' },
        { t: 'URL firmada', d: 'Enlace con caducidad y permisos para acceder a contenido restringido.' }
      ],
      quiz: [
        { p: '¿Qué servicio permite servir un sitio estático alojado en un bucket S3 privado sin exponer el bucket?', op: ['NAT Gateway', 'CloudFront con Origin Access Control', 'VPC Peering', 'AWS Direct Connect'], ok: 1, e: 'OAC permite que CloudFront lea el bucket privado y sirva el contenido sin hacerlo público.' },
        { p: '¿Qué determina cuánto tiempo se reutiliza un objeto desde la caché de CloudFront?', op: ['El TTL configurado o las cabeceras de caché del origen', 'El tamaño del objeto', 'La región del bucket', 'El tipo de certificado TLS'], ok: 0, e: 'El TTL (configurado o mediante Cache-Control) define el tiempo de validez en caché.' },
        { p: 'Una empresa necesita mejorar la latencia de un protocolo TCP propio, sin caché. ¿Qué servicio es más adecuado?', op: ['Amazon CloudFront', 'AWS Global Accelerator', 'Amazon Route 53', 'AWS WAF'], ok: 1, e: 'Global Accelerator mejora el rendimiento de tráfico TCP/UDP sin cachear contenido, usando la red global de AWS.' }
      ]
    }
  ]
});
