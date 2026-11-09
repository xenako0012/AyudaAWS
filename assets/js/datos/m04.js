/* Módulo 4 · Seguridad en la nube */
(window.MODULOS = window.MODULOS || []).push({
  id: 'm4',
  numero: 4,
  titulo: 'Seguridad en la nube',
  descripcion: 'El modelo de responsabilidad compartida, la gestión de identidades con IAM, la protección de cuentas y datos, el cifrado y los mecanismos para demostrar conformidad.',
  duracion: '140 min',
  objetivo: 'Describir las medidas de seguridad y conformidad de AWS y aplicar buenas prácticas de identidad y protección de datos.',
  secciones: [
    {
      id: 'm4s1',
      titulo: 'Modelo de responsabilidad compartida de AWS',
      resumen: 'AWS protege la infraestructura que ejecuta sus servicios; el cliente protege lo que pone dentro: datos, identidades, configuración y, en IaaS, el sistema operativo.',
      objetivos: [
        'Distinguir «seguridad de la nube» y «seguridad en la nube».',
        'Asignar responsabilidades según el tipo de servicio (IaaS, PaaS, SaaS).',
        'Reconocer los controles compartidos.'
      ],
      bloques: [
        { t: 'p', c: 'El **modelo de responsabilidad compartida** es el documento fundacional de la seguridad en AWS. Su idea central: la seguridad **no es responsabilidad exclusiva del proveedor ni del cliente**, sino una división clara de tareas. AWS responde de la **seguridad de la nube**; el cliente, de la **seguridad en la nube**.' },
        { t: 'esquema', c: [
          { titulo: 'AWS', sub: 'Seguridad DE la nube: instalaciones, hardware, red, hipervisor' },
          { titulo: 'Cliente', sub: 'Seguridad EN la nube: datos, identidades, configuración, código' }
        ] },
        { t: 'h', c: 'Responsabilidades de AWS' },
        { t: 'ul', c: [
          'Seguridad física de los centros de datos: acceso, vigilancia, control ambiental.',
          'Hardware, servidores, almacenamiento y equipos de red.',
          'Capa de virtualización e hipervisor.',
          'Red global: fibra, regiones, zonas de disponibilidad y ubicaciones de borde.',
          'Disponibilidad de los servicios gestionados y aplicación de parches en su infraestructura.'
        ] },
        { t: 'h', c: 'Responsabilidades del cliente' },
        { t: 'ul', c: [
          '**Datos:** clasificación, cifrado y copias de seguridad. Es la responsabilidad más importante y siempre del cliente.',
          '**Identidades y accesos:** usuarios, roles, políticas, contraseñas y claves.',
          '**Configuración:** grupos de seguridad, políticas de bucket, cifrado, registro de auditoría.',
          '**Sistema operativo invitado y software:** parches, antivirus y configuración en instancias EC2.',
          '**Cumplimiento de su propio negocio** y de la normativa aplicable.'
        ] },
        { t: 'nota', clase: 'examen', titulo: 'Frase clave', c: '«AWS es responsable de la seguridad **de** la nube; el cliente, de la seguridad **en** la nube». Si la pregunta menciona «datos del cliente», la respuesta es siempre el cliente.' },
        { t: 'h', c: 'La frontera cambia según el servicio' },
        { t: 'tabla', cab: ['Tipo de servicio', 'AWS gestiona', 'El cliente gestiona'], filas: [
          ['IaaS — Amazon EC2', 'Hardware, hipervisor, red, instalaciones', 'SO invitado, parches, aplicaciones, datos, identidades, firewall'],
          ['PaaS — Elastic Beanstalk', 'SO, runtime, plataforma, parches', 'Aplicación, configuración, datos, identidades'],
          ['SaaS — Amazon WorkMail', 'Toda la pila', 'Usuarios, datos y configuración de acceso'],
          ['Sin servidor — AWS Lambda', 'Servidores, runtime, escalado', 'Código, permisos del rol, datos'],
          ['Gestionado — Amazon RDS', 'Motor, parches, copias automáticas', 'Esquema, usuarios de la base de datos, cifrado, red']
        ] },
        { t: 'nota', clase: 'tip', titulo: 'Cuanto más gestionado, menos responsabilidad', c: 'Al pasar de EC2 a Lambda o a un servicio SaaS, el cliente conserva siempre la responsabilidad sobre **sus datos y sus identidades**, pero delega cada vez más capas de infraestructura.' },
        { t: 'h', c: 'Controles compartidos' },
        { t: 'p', c: 'Algunos controles se aplican en ambas partes con distinto alcance:' },
        { t: 'ul', c: [
          '**Gestión de parches:** AWS aplica parches a la infraestructura; el cliente, al SO invitado y a sus aplicaciones.',
          '**Gestión de la configuración:** AWS configura su infraestructura; el cliente, sus recursos.',
          '**Concienciación y formación:** AWS forma a su personal; el cliente, al suyo.'
        ] },
        { t: 'h', c: 'Por qué importa en la práctica' },
        { t: 'p', c: 'La mayoría de los incidentes en la nube no se deben a fallos de AWS, sino a **errores de configuración del cliente**: un bucket de S3 público, un grupo de seguridad abierto a internet o una clave de acceso en un repositorio. Entender el modelo es lo que permite saber dónde poner los controles.' }
      ],
      terminos: [
        { t: 'Seguridad de la nube', d: 'Responsabilidad de AWS: infraestructura, hardware, red y virtualización.' },
        { t: 'Seguridad en la nube', d: 'Responsabilidad del cliente: datos, identidades, configuración y código.' },
        { t: 'Control compartido', d: 'Control que ambas partes aplican en ámbitos distintos, como los parches.' },
        { t: 'Hipervisor', d: 'Capa de software que ejecuta y aísla las máquinas virtuales.' }
      ],
      quiz: [
        { p: 'Según el modelo de responsabilidad compartida, ¿quién es responsable del cifrado de los datos almacenados en Amazon S3?', op: ['AWS', 'El cliente', 'Ambos al 50 %', 'El proveedor de internet'], ok: 1, e: 'Los datos son siempre responsabilidad del cliente, incluida su clasificación y cifrado, aunque AWS proporcione las herramientas.' },
        { p: 'En una instancia Amazon EC2, ¿quién debe aplicar los parches del sistema operativo invitado?', op: ['AWS', 'El cliente', 'El fabricante del hardware', 'Nadie, se aplican solos'], ok: 1, e: 'En IaaS, el cliente gestiona el SO invitado y su parcheo. AWS se encarga del hipervisor y del hardware.' },
        { p: '¿Cuál de estas tareas es siempre responsabilidad del cliente, independientemente del servicio?', op: ['La seguridad física del centro de datos', 'La gestión de identidades y accesos', 'El mantenimiento del hipervisor', 'La refrigeración de las salas'], ok: 1, e: 'La gestión de identidades y accesos (IAM) y los datos son siempre responsabilidad del cliente.' }
      ]
    },
    {
      id: 'm4s2',
      titulo: 'AWS IAM',
      resumen: 'AWS Identity and Access Management controla quién puede hacer qué sobre qué recursos. Se compone de usuarios, grupos, roles y políticas, y su principio rector es el mínimo privilegio.',
      objetivos: [
        'Diferenciar usuarios, grupos, roles y políticas.',
        'Explicar la estructura de una política JSON.',
        'Aplicar las buenas prácticas de IAM y elegir el método de acceso adecuado.'
      ],
      bloques: [
        { t: 'p', c: '**AWS Identity and Access Management (IAM)** es el servicio global y gratuito que responde a tres preguntas: **¿quién** puede acceder (autenticación), **a qué** puede acceder (autorización) y **en qué condiciones**. Todo lo que se hace en AWS pasa por IAM.' },
        { t: 'h', c: 'Componentes' },
        { t: 'tabla', cab: ['Componente', 'Qué es', 'Observaciones'], filas: [
          ['Usuario', 'Identidad con credenciales propias (contraseña y/o claves de acceso)', 'Representa a una persona o aplicación concreta'],
          ['Grupo', 'Colección de usuarios', 'Facilita asignar permisos en bloque; no se pueden anidar'],
          ['Rol', 'Identidad con permisos que se asume temporalmente', 'Lo usan servicios de AWS, usuarios federados o cuentas externas'],
          ['Política', 'Documento JSON que define permisos', 'Se adjunta a usuarios, grupos, roles o recursos'],
          ['Proveedor de identidad', 'Directorio externo (SAML, OIDC, IAM Identity Center)', 'Permite iniciar sesión con credenciales corporativas']
        ] },
        { t: 'nota', clase: 'examen', titulo: 'Regla de oro', c: '**Usuarios** tienen credenciales permanentes; **roles** proporcionan credenciales **temporales** mediante AWS STS. Para aplicaciones y servicios de AWS, usa siempre roles, nunca claves de acceso.' },
        { t: 'h', c: 'Anatomía de una política' },
        { t: 'p', c: 'Las políticas de identidad se escriben en JSON con estos elementos:' },
        { t: 'tabla', cab: ['Elemento', 'Función'], filas: [
          ['Version', 'Versión del lenguaje de políticas (habitualmente «2012-10-17»)'],
          ['Effect', 'Allow o Deny'],
          ['Action', 'Acciones permitidas o denegadas, por ejemplo s3:GetObject'],
          ['Resource', 'Recursos afectados, identificados por ARN'],
          ['Principal', 'Quién recibe el permiso (solo en políticas basadas en recursos)'],
          ['Condition', 'Condiciones adicionales: IP, MFA, hora, etiquetas']
        ] },
        { t: 'p', c: 'Ejemplo de política que permite leer un bucket concreto:' },
        { t: 'nota', clase: 'dato', titulo: 'Política de ejemplo', c: '`{ "Version": "2012-10-17", "Statement": [{ "Effect": "Allow", "Action": ["s3:GetObject"], "Resource": "arn:aws:s3:::mi-bucket/*" }] }`' },
        { t: 'ul', c: [
          '**Políticas gestionadas por AWS:** creadas y mantenidas por AWS, como `AmazonS3ReadOnlyAccess`.',
          '**Políticas gestionadas por el cliente:** reutilizables y versionables.',
          '**Políticas en línea:** incluidas en una sola identidad; útiles para permisos muy concretos.'
        ] },
        { t: 'h', c: 'Cómo se evalúan los permisos' },
        { t: 'p', c: 'Por defecto, **todo está denegado**. Una petición se permite solo si existe una política que la permita y ninguna que la deniegue. La evaluación sigue esta lógica: una **denegación explícita** siempre gana; después se comprueban las SCP de Organizations, las políticas de límites de permisos, las políticas de identidad y las de recursos. Si nada concede el permiso, se deniega.' },
        { t: 'h', c: 'Buenas prácticas de IAM' },
        { t: 'ol', c: [
          '**Proteger la cuenta raíz:** activar MFA, no crear claves de acceso y no usarla para el día a día.',
          '**Aplicar el mínimo privilegio:** conceder solo los permisos necesarios, con políticas revisadas periódicamente.',
          '**Usar grupos** para asignar permisos y no adjuntarlos usuario a usuario.',
          '**Usar roles** para aplicaciones, servicios de AWS y acceso entre cuentas.',
          '**Exigir MFA** a los usuarios, especialmente a los privilegiados.',
          '**Rotar credenciales** y usar AWS Secrets Manager para las de aplicaciones.',
          '**Revisar accesos** con IAM Access Analyzer, Access Advisor y el informe de credenciales.',
          '**Centralizar la federación** con IAM Identity Center en lugar de crear usuarios en cada cuenta.'
        ] },
        { t: 'h', c: 'Herramientas de apoyo' },
        { t: 'tabla', cab: ['Herramienta', 'Función'], filas: [
          ['IAM Access Analyzer', 'Detecta recursos accesibles desde fuera de la cuenta o de la organización y valida políticas.'],
          ['IAM Access Advisor', 'Muestra qué servicios se han usado realmente para ajustar permisos.'],
          ['Informe de credenciales', 'Inventario de usuarios, contraseñas, MFA y claves de acceso con su antigüedad.'],
          ['Simulador de políticas', 'Evalúa si una acción concreta estaría permitida.'],
          ['Límites de permisos', 'Tope máximo de permisos para una identidad, útil para delegar administración.'],
          ['AWS STS', 'Emite credenciales temporales para asumir roles.']
        ] },
        { t: 'h', c: 'IAM Identity Center y Cognito' },
        { t: 'p', c: '**IAM Identity Center** (antes AWS SSO) centraliza el acceso de empleados a varias cuentas y aplicaciones con un único inicio de sesión, integrado con Active Directory o un proveedor SAML. **Amazon Cognito** está pensado para los **usuarios finales de una aplicación**: registro, inicio de sesión, MFA y federación con Google, Facebook o Apple.' }
      ],
      terminos: [
        { t: 'IAM', d: 'Servicio global y gratuito de gestión de identidades y permisos de AWS.' },
        { t: 'Rol', d: 'Identidad asumible con credenciales temporales y permisos definidos.' },
        { t: 'ARN', d: 'Amazon Resource Name: identificador único de un recurso de AWS.' },
        { t: 'Mínimo privilegio', d: 'Conceder solo los permisos estrictamente necesarios para la tarea.' },
        { t: 'STS', d: 'Security Token Service: emite credenciales temporales.' },
        { t: 'IAM Identity Center', d: 'Acceso único (SSO) centralizado para cuentas y aplicaciones de la organización.' }
      ],
      quiz: [
        { p: 'Una aplicación que se ejecuta en una instancia EC2 necesita acceder a un bucket de S3. ¿Cuál es la forma recomendada de darle permisos?', op: ['Crear un usuario de IAM con claves de acceso y guardarlas en el código', 'Asociar un rol de IAM a la instancia', 'Usar la cuenta raíz', 'Hacer el bucket público'], ok: 1, e: 'Los roles de IAM proporcionan credenciales temporales rotadas automáticamente, sin almacenar claves en el código.' },
        { p: 'En una política de IAM, ¿qué elemento especifica las operaciones permitidas?', op: ['Resource', 'Effect', 'Action', 'Version'], ok: 2, e: 'Action indica las operaciones (por ejemplo s3:GetObject); Resource indica sobre qué recursos se aplican.' },
        { p: '¿Cuál es el efecto de una denegación explícita en IAM?', op: ['Se ignora si hay otro permiso Allow', 'Anula cualquier permiso concedido', 'Solo se aplica a la cuenta raíz', 'Requiere aprobación manual'], ok: 1, e: 'En IAM, una denegación explícita siempre prevalece sobre cualquier permiso concedido.' }
      ]
    },
    {
      id: 'm4s3',
      titulo: 'Protección de una cuenta nueva de AWS',
      resumen: 'Una cuenta recién creada es insegura por defecto si no se configura. AWS propone una lista de tareas iniciales: MFA en la raíz, usuario administrador con IAM, CloudTrail, alarmas de facturación y servicios de detección.',
      objetivos: [
        'Enumerar las tareas de seguridad iniciales de una cuenta.',
        'Explicar por qué la cuenta raíz debe protegerse de forma especial.',
        'Activar los servicios de registro y detección básicos.'
      ],
      bloques: [
        { t: 'p', c: 'Al crear una cuenta de AWS se obtiene una **cuenta raíz** con acceso total e irrestricto. Esa comodidad inicial es también el mayor riesgo. Estas son las tareas que AWS recomienda completar en los primeros minutos.' },
        { t: 'h', c: 'Lista de comprobación inicial' },
        { t: 'ol', c: [
          '**Eliminar las claves de acceso de la cuenta raíz** si se crearon, y no volver a generarlas.',
          '**Activar la autenticación multifactor (MFA)** en la cuenta raíz, preferiblemente con un dispositivo hardware.',
          '**Crear un usuario o rol administrador en IAM** para el trabajo diario y dejar la raíz solo para tareas excepcionales.',
          '**Definir una política de contraseñas** robusta: longitud mínima, complejidad, caducidad y bloqueo.',
          '**Activar AWS CloudTrail** en todas las regiones y proteger los registros en S3.',
          '**Activar la facturación detallada** y crear alarmas o presupuestos de gasto.',
          '**Configurar AWS Config** para registrar la configuración de los recursos.',
          '**Activar Amazon GuardDuty** para la detección de amenazas.',
          '**Activar AWS Security Hub** para centralizar hallazgos y estándares.',
          '**Bloquear el acceso público a S3** a nivel de cuenta.',
          '**Revisar los contactos de seguridad** y las direcciones de notificación de la cuenta.'
        ] },
        { t: 'nota', clase: 'aviso', titulo: 'La cuenta raíz', c: 'Con la cuenta raíz no se pueden usar políticas de IAM para limitar permisos, y no está afectada por las SCP. Por eso debe usarse solo para tareas que la requieren (cambiar el plan de soporte, cerrar la cuenta, recuperar el acceso) y siempre con MFA.' },
        { t: 'h', c: 'Servicios de registro y detección iniciales' },
        { t: 'tabla', cab: ['Servicio', 'Qué aporta en una cuenta nueva'], filas: [
          ['AWS CloudTrail', 'Registro de todas las llamadas a la API: quién hizo qué, cuándo y desde dónde.'],
          ['Amazon CloudWatch', 'Métricas, registros y alarmas de los recursos.'],
          ['Amazon GuardDuty', 'Detección de comportamiento anómalo con inteligencia de amenazas.'],
          ['AWS Config', 'Inventario e historial de configuración, con reglas de conformidad.'],
          ['AWS Security Hub', 'Panel central de hallazgos y estándares de seguridad.'],
          ['IAM Access Analyzer', 'Identifica recursos expuestos fuera de la cuenta.'],
          ['AWS Trusted Advisor', 'Comprobaciones de seguridad, coste, tolerancia a fallos y límites.']
        ] },
        { t: 'h', c: 'AWS Account Setup y Control Tower' },
        { t: 'p', c: 'AWS ofrece una experiencia guiada de **configuración de seguridad** que aplica varias de estas tareas en pocos clics. Para organizaciones con muchas cuentas, **AWS Control Tower** crea una *landing zone* con registro centralizado, acceso federado, guardrails y cuentas preconfiguradas, evitando repetir la lista a mano en cada cuenta.' },
        { t: 'h', c: 'Errores frecuentes al empezar' },
        { t: 'ul', c: [
          'Dejar la cuenta raíz sin MFA y usarla a diario.',
          'Crear usuarios de IAM con permisos de administrador para todo el equipo.',
          'Subir claves de acceso a GitHub.',
          'Abrir grupos de seguridad a `0.0.0.0/0` en SSH o bases de datos.',
          'No activar CloudTrail, con lo que no hay evidencia ante un incidente.',
          'No configurar ninguna alerta de facturación y descubrir el gasto a fin de mes.'
        ] }
      ],
      terminos: [
        { t: 'Cuenta raíz', d: 'Identidad creada con la cuenta de AWS, con acceso total y sin restricciones de IAM.' },
        { t: 'CloudTrail', d: 'Servicio de auditoría que registra las llamadas a la API de AWS.' },
        { t: 'GuardDuty', d: 'Servicio de detección de amenazas basado en registros y comportamiento.' },
        { t: 'Security Hub', d: 'Agregador central de hallazgos y comprobaciones de estándares de seguridad.' },
        { t: 'Control Tower', d: 'Servicio que configura una landing zone multi-cuenta con guardrails.' }
      ],
      quiz: [
        { p: '¿Qué debe hacerse con las claves de acceso de la cuenta raíz en una cuenta nueva?', op: ['Guardarlas en un gestor de contraseñas y usarlas a diario', 'Eliminarlas y no usarlas', 'Compartirlas con el equipo', 'Publicarlas en CloudTrail'], ok: 1, e: 'AWS recomienda no tener claves de acceso en la cuenta raíz y usar MFA más un usuario administrador de IAM.' },
        { p: '¿Qué servicio registra quién realizó cada llamada a la API de AWS?', op: ['Amazon CloudWatch', 'AWS CloudTrail', 'AWS Config', 'Amazon GuardDuty'], ok: 1, e: 'CloudTrail es el registro de auditoría de llamadas a la API. CloudWatch supervisa métricas y Config registra la configuración.' },
        { p: '¿Qué servicio detecta actividad maliciosa o anómala en la cuenta?', op: ['AWS Shield', 'Amazon GuardDuty', 'AWS Artifact', 'Amazon Macie'], ok: 1, e: 'GuardDuty analiza registros y comportamientos para detectar amenazas. Shield protege frente a DDoS y Macie descubre datos sensibles.' }
      ]
    },
    {
      id: 'm4s4',
      titulo: 'Protección de cuentas',
      resumen: 'Proteger una cuenta exige controlar identidades y accesos, exigir MFA, federar el acceso, usar roles y revisar continuamente los permisos concedidos.',
      objetivos: [
        'Aplicar controles de identidad y autenticación en una organización.',
        'Diferenciar federación, roles y usuarios de IAM.',
        'Utilizar herramientas de revisión de accesos y protección perimetral.'
      ],
      bloques: [
        { t: 'p', c: 'Una vez asegurada la cuenta inicial, el siguiente paso es **gobernar quién entra y qué puede hacer**. La identidad es el nuevo perímetro: en la nube no hay una oficina que proteger, sino identidades que autenticar y autorizar.' },
        { t: 'h', c: 'Controles esenciales' },
        { t: 'tabla', cab: ['Control', 'Herramienta', 'Para qué'], filas: [
          ['Autenticación multifactor', 'MFA en IAM y en la raíz', 'Evitar el robo de credenciales'],
          ['Acceso federado', 'IAM Identity Center, SAML 2.0, OIDC', 'Un único inicio de sesión con el directorio corporativo'],
          ['Credenciales temporales', 'Roles de IAM y AWS STS', 'Eliminar claves permanentes'],
          ['Mínimo privilegio', 'Políticas ajustadas, límites de permisos', 'Reducir el impacto de un compromiso'],
          ['Revisión de accesos', 'Access Analyzer, Access Advisor, informe de credenciales', 'Detectar permisos excesivos u olvidados'],
          ['Protección perimetral', 'AWS WAF, AWS Shield, Network Firewall', 'Filtrar tráfico malicioso y ataques DDoS'],
          ['Gestión de secretos', 'AWS Secrets Manager, Parameter Store', 'Guardar y rotar credenciales de aplicaciones'],
          ['Autenticación de usuarios finales', 'Amazon Cognito', 'Registro e inicio de sesión en aplicaciones']
        ] },
        { t: 'h', c: 'Federación: la buena práctica' },
        { t: 'p', c: 'En lugar de crear un usuario de IAM por empleado en cada cuenta, la organización conecta su directorio (Active Directory, Okta, Entra ID) con **IAM Identity Center** o con un proveedor SAML. El empleado inicia sesión con sus credenciales corporativas y recibe un rol temporal con los permisos de su puesto. Cuando deja la empresa, se le retira el acceso en el directorio y desaparece de todas las cuentas a la vez.' },
        { t: 'h', c: 'Acceso entre cuentas' },
        { t: 'p', c: 'Para que un servicio de la cuenta A acceda a un recurso de la cuenta B se crea un **rol en la cuenta B** con una política de confianza que permite a la cuenta A asumirlo. No se copian usuarios ni claves. Este patrón es la base de las arquitecturas multi-cuenta y del acceso de terceros.' },
        { t: 'h', c: 'Herramientas de revisión' },
        { t: 'ul', c: [
          '**IAM Access Analyzer:** identifica buckets, roles o funciones accesibles desde fuera de la cuenta u organización.',
          '**IAM Access Advisor:** muestra los servicios a los que realmente se ha accedido para recortar permisos no usados.',
          '**Informe de credenciales:** descarga un CSV con todos los usuarios, su MFA y la antigüedad de sus claves.',
          '**Último acceso:** indica cuándo se usó por última vez una contraseña o una clave.',
          '**AWS Config:** detecta configuraciones no conformes, como usuarios sin MFA.'
        ] },
        { t: 'h', c: 'Protección frente a ataques' },
        { t: 'tabla', cab: ['Servicio', 'Protege frente a'], filas: [
          ['AWS Shield Standard', 'Ataques DDoS comunes, de forma automática y gratuita'],
          ['AWS Shield Advanced', 'Ataques DDoS sofisticados, con respuesta del equipo de AWS (de pago)'],
          ['AWS WAF', 'Inyección SQL, XSS, bots y reglas personalizadas en HTTP/HTTPS'],
          ['AWS Network Firewall', 'Filtrado de tráfico a nivel de VPC'],
          ['Amazon GuardDuty', 'Actividad sospechosa y cuentas comprometidas'],
          ['AWS Firewall Manager', 'Gestión centralizada de reglas de WAF y Shield en la organización']
        ] },
        { t: 'nota', clase: 'examen', titulo: 'Shield frente a WAF', c: '**Shield** protege frente a **DDoS**; **WAF** filtra **tráfico HTTP malicioso** con reglas. Ambos se pueden desplegar en CloudFront, Application Load Balancer y API Gateway.' }
      ],
      terminos: [
        { t: 'MFA', d: 'Autenticación multifactor: segundo factor además de la contraseña.' },
        { t: 'Federación', d: 'Uso de un directorio externo para autenticar en AWS sin crear usuarios nuevos.' },
        { t: 'Rol entre cuentas', d: 'Rol que una cuenta externa puede asumir para acceder a recursos de otra.' },
        { t: 'AWS WAF', d: 'Firewall de aplicaciones web con reglas sobre peticiones HTTP.' },
        { t: 'AWS Shield', d: 'Servicio de protección frente a ataques de denegación de servicio distribuido.' },
        { t: 'Cognito', d: 'Servicio de identidad para los usuarios finales de una aplicación.' }
      ],
      quiz: [
        { p: '¿Cuál es la forma recomendada de dar acceso a 500 empleados a 20 cuentas de AWS?', op: ['Crear 10.000 usuarios de IAM', 'Federar el directorio corporativo con IAM Identity Center y asignar roles', 'Compartir una cuenta administradora', 'Usar la cuenta raíz para todos'], ok: 1, e: 'La federación con IAM Identity Center permite un único inicio de sesión y roles temporales por persona y cuenta.' },
        { p: '¿Qué servicio protege frente a ataques DDoS de forma automática y sin coste adicional?', op: ['AWS WAF', 'AWS Shield Standard', 'Amazon Inspector', 'AWS Artifact'], ok: 1, e: 'Shield Standard está activo por defecto y protege de los ataques DDoS más comunes sin coste.' },
        { p: 'Una aplicación necesita credenciales de base de datos que se roten automáticamente. ¿Qué servicio usar?', op: ['AWS Secrets Manager', 'AWS CloudTrail', 'AWS Config', 'IAM Access Analyzer'], ok: 0, e: 'Secrets Manager almacena, cifra y rota credenciales de forma automática; Parameter Store no rota por sí solo.' }
      ]
    },
    {
      id: 'm4s5',
      titulo: 'Protección de datos AWS',
      resumen: 'Proteger datos significa clasificarlos, cifrarlos en reposo y en tránsito, controlar las claves, evitar fugas y mantener copias de seguridad verificadas.',
      objetivos: [
        'Diferenciar cifrado en reposo y en tránsito.',
        'Explicar el funcionamiento de AWS KMS y el cifrado de sobre.',
        'Seleccionar servicios para descubrir datos sensibles, gestionar secretos y hacer copias.'
      ],
      bloques: [
        { t: 'p', c: 'Los datos son el activo más valioso y, según el modelo de responsabilidad compartida, **su protección corresponde al cliente**. AWS ofrece las herramientas; la estrategia (qué clasificar, dónde cifrar, cuánto conservar) es decisión de la organización.' },
        { t: 'h', c: 'Clasificar antes de proteger' },
        { t: 'p', c: 'No se puede proteger lo que no se conoce. Un esquema habitual distingue **público**, **interno**, **confidencial** y **restringido**. La clasificación determina el cifrado, los controles de acceso, la retención y las copias de seguridad de cada dato.' },
        { t: 'h', c: 'Cifrado en reposo y en tránsito' },
        { t: 'tabla', cab: ['Estado', 'Qué protege', 'Cómo se implementa'], filas: [
          ['En reposo', 'Datos almacenados en disco, objeto o base de datos', 'AWS KMS, cifrado del lado del servidor en S3, cifrado de volúmenes EBS y RDS'],
          ['En tránsito', 'Datos que viajan por la red', 'TLS/HTTPS con certificados de AWS Certificate Manager, VPN, Direct Connect'],
          ['En uso', 'Datos mientras se procesan', 'Nitro Enclaves, confidencial computing (casos muy específicos)']
        ] },
        { t: 'h', c: 'AWS KMS y el cifrado de sobre' },
        { t: 'p', c: '**AWS Key Management Service (KMS)** es un servicio gestionado para crear y controlar **claves maestras (KMS keys)**. El patrón que usa AWS se denomina **cifrado de sobre**: cada objeto se cifra con una **clave de datos**, y esa clave de datos se cifra con la clave maestra de KMS. Así se pueden cifrar petabytes sin llamar a KMS en cada operación y se controla el acceso a la clave maestra con políticas.' },
        { t: 'ul', c: [
          '**Claves gestionadas por AWS:** las crea y rota AWS; sencillas, sin control de políticas.',
          '**Claves gestionadas por el cliente:** el cliente define políticas, rotación y quién puede usarlas.',
          '**Claves de propiedad del cliente (importadas):** se importa el material criptográfico desde fuera.',
          '**AWS CloudHSM:** módulo de hardware dedicado para requisitos que exigen control total de las claves.'
        ] },
        { t: 'h', c: 'Cifrado en los servicios principales' },
        { t: 'tabla', cab: ['Servicio', 'Opciones de cifrado'], filas: [
          ['Amazon S3', 'SSE-S3 (gestionado por AWS), SSE-KMS, SSE-C (clave del cliente), cifrado del lado del cliente; HTTPS en tránsito'],
          ['Amazon EBS', 'Cifrado de volúmenes e instantáneas con KMS; se puede cifrar por defecto en la región'],
          ['Amazon RDS', 'Cifrado en reposo con KMS; TLS para conexiones; también cifra copias y réplicas'],
          ['Amazon EFS', 'Cifrado en reposo con KMS y TLS en tránsito'],
          ['Amazon DynamoDB', 'Cifrado en reposo por defecto con claves gestionadas por AWS o del cliente'],
          ['AWS Lambda', 'Variables de entorno cifradas con KMS; TLS en tránsito']
        ] },
        { t: 'nota', clase: 'examen', titulo: 'Por defecto', c: 'Muchos servicios cifran en reposo de forma predeterminada. Aun así, el examen suele preguntar por **KMS** como respuesta a «cifrar datos en reposo con claves gestionadas».' },
        { t: 'h', c: 'Descubrir y evitar fugas de datos' },
        { t: 'ul', c: [
          '**Amazon Macie:** usa machine learning para descubrir datos sensibles (PII, credenciales) en S3 y avisar de buckets expuestos.',
          '**Amazon GuardDuty:** incluye protección de S3 frente a accesos anómalos.',
          '**Block Public Access:** bloquea el acceso público a S3 a nivel de cuenta y de bucket.',
          '**AWS Secrets Manager:** almacena y rota contraseñas, tokens y claves de API.',
          '**AWS Certificate Manager:** emite y renueva certificados TLS gratuitos.',
          '**S3 Object Lock:** inmutabilidad para requisitos de retención legal (WORM).',
          '**MFA Delete:** exige MFA para borrar versiones de objetos.'
        ] },
        { t: 'h', c: 'Copias de seguridad y recuperación' },
        { t: 'p', c: 'Una copia que nunca se ha restaurado no es una copia. **AWS Backup** centraliza políticas de copia para EBS, RDS, DynamoDB, EFS, S3 y otros servicios, con planes, bóvedas y bloqueo (Vault Lock). Conviene definir **RPO** (cuántos datos se pueden perder) y **RTO** (cuánto tiempo se puede tardar en recuperar), y probar la restauración periódicamente.' }
      ],
      terminos: [
        { t: 'Cifrado en reposo', d: 'Protección de datos almacenados mediante cifrado del medio o del objeto.' },
        { t: 'Cifrado en tránsito', d: 'Protección de datos en movimiento mediante TLS u otros protocolos.' },
        { t: 'KMS', d: 'Servicio gestionado de creación y control de claves criptográficas.' },
        { t: 'Cifrado de sobre', d: 'Cifrar datos con una clave de datos y esta con una clave maestra.' },
        { t: 'Macie', d: 'Servicio que descubre y clasifica datos sensibles almacenados en S3.' },
        { t: 'RPO / RTO', d: 'Punto objetivo de recuperación (datos perdidos) y tiempo objetivo de recuperación.' }
      ],
      quiz: [
        { p: '¿Qué patrón utiliza AWS KMS para cifrar grandes volúmenes de datos de forma eficiente?', op: ['Cifrado simétrico directo con la clave maestra', 'Cifrado de sobre: clave de datos cifrada por la clave maestra', 'Cifrado asimétrico de cada objeto', 'Ofuscación de datos'], ok: 1, e: 'El cifrado de sobre usa una clave de datos por objeto y cifra esa clave con la clave maestra de KMS.' },
        { p: 'Necesitas descubrir si hay números de tarjeta de crédito en buckets de S3. ¿Qué servicio usarías?', op: ['Amazon Macie', 'AWS WAF', 'Amazon Inspector', 'AWS Shield'], ok: 0, e: 'Macie usa machine learning para descubrir datos sensibles como PII en S3.' },
        { p: '¿Qué significa RTO en un plan de recuperación?', op: ['El tiempo máximo aceptable para restaurar el servicio', 'La cantidad máxima de datos que se puede perder', 'El coste máximo de la recuperación', 'El número de copias de seguridad necesarias'], ok: 0, e: 'RTO (Recovery Time Objective) es el tiempo objetivo de recuperación; RPO es la cantidad de datos que se puede perder.' }
      ]
    },
    {
      id: 'm4s6',
      titulo: 'Cómo garantizar la conformidad',
      resumen: 'La conformidad se demuestra con evidencias: informes de AWS Artifact, registro de auditoría con CloudTrail, evaluación continua con Config y Security Hub, y programas de cumplimiento certificados.',
      objetivos: [
        'Explicar el papel de AWS Artifact y de los programas de conformidad.',
        'Diferenciar CloudTrail, Config, Audit Manager y Security Hub.',
        'Describir cómo se documenta el cumplimiento ante un auditor.'
      ],
      bloques: [
        { t: 'p', c: 'Cumplir una norma (ISO 27001, PCI DSS, RGPD, HIPAA) exige **demostrar** que los controles funcionan. AWS facilita esa demostración con informes de terceros, registros detallados y evaluaciones continuas.' },
        { t: 'h', c: 'AWS Artifact' },
        { t: 'p', c: '**AWS Artifact** es el portal de autoservicio donde se descargan los **informes de conformidad** de AWS (SOC 1, SOC 2, SOC 3, ISO 27001, PCI DSS, informes de evaluación) y se gestionan los **acuerdos** con AWS, como el acuerdo de asociación comercial (BAA) para HIPAA. Es la respuesta habitual a «¿dónde obtengo la certificación ISO de AWS?».' },
        { t: 'nota', clase: 'examen', titulo: 'AWS Artifact en una frase', c: 'Artifact = **documentos** de conformidad de AWS y acuerdos. Si la pregunta pide «informes de auditoría de AWS», la respuesta es Artifact.' },
        { t: 'h', c: 'Programas de conformidad' },
        { t: 'p', c: 'AWS mantiene certificaciones y attestations para decenas de marcos: **ISO/IEC 27001, 27017, 27018, 27701**, **SOC 1/2/3**, **PCI DSS**, **HIPAA**, **FedRAMP**, **C5** (Alemania), **ENS** (España), **IRAP** (Australia), **MTCS** (Singapur) y el **Esquema Nacional de Seguridad**, entre otros. Que AWS cumpla no exime al cliente: cada parte aporta sus propias evidencias.' },
        { t: 'h', c: 'Servicios para demostrar conformidad' },
        { t: 'tabla', cab: ['Servicio', 'Función', 'Evidencia que aporta'], filas: [
          ['AWS CloudTrail', 'Registra todas las llamadas a la API', 'Quién hizo qué y cuándo'],
          ['AWS Config', 'Inventario, historial y reglas de configuración', 'Estado de los recursos y desviaciones'],
          ['AWS Config Conformance Packs', 'Conjunto de reglas empaquetadas por marco', 'Evaluación de un estándar completo'],
          ['AWS Audit Manager', 'Recopila evidencias y genera informes de auditoría', 'Preparación de auditorías'],
          ['AWS Security Hub', 'Agrega hallazgos y evalúa estándares (CIS, PCI DSS, FSBP)', 'Puntuación de seguridad centralizada'],
          ['Amazon GuardDuty', 'Detección de amenazas', 'Hallazgos de actividad maliciosa'],
          ['Amazon Inspector', 'Análisis de vulnerabilidades en EC2, ECR y Lambda', 'Listado de CVEs y parches pendientes'],
          ['AWS Trusted Advisor', 'Comprobaciones de buenas prácticas', 'Recomendaciones accionables'],
          ['AWS Well-Architected Tool', 'Revisión de arquitectura frente al marco', 'Registro de riesgos y mejoras']
        ] },
        { t: 'h', c: 'Un flujo de trabajo realista' },
        { t: 'ol', c: [
          'Identifica los marcos aplicables: legales (RGPD), sectoriales (PCI DSS) y contractuales.',
          'Descarga de **AWS Artifact** los informes que cubren la parte de AWS.',
          'Documenta tu parte: políticas, procedimientos y matriz de responsabilidades.',
          'Activa **CloudTrail** en todas las regiones con registro centralizado e inmutabilidad.',
          'Aplica **AWS Config** con reglas y conformance packs para detectar desviaciones.',
          'Centraliza hallazgos en **Security Hub** y corrige los de mayor severidad.',
          'Usa **Audit Manager** para reunir evidencias y generar el informe para el auditor.',
          'Revisa periódicamente: la conformidad es un proceso continuo, no un hito.'
        ] },
        { t: 'h', c: 'El papel de la documentación' },
        { t: 'p', c: 'Las herramientas generan datos, pero un auditor pide **procedimientos**: gestión de accesos, respuesta a incidentes, copias de seguridad, formación del personal y revisión por la dirección. AWS publica guías y el **AWS Well-Architected Framework** para ayudar a redactarlos, pero el documento final debe reflejar la realidad de cada organización.' }
      ],
      terminos: [
        { t: 'AWS Artifact', d: 'Portal de informes de conformidad de AWS y acuerdos legales.' },
        { t: 'AWS Config', d: 'Servicio que registra la configuración de los recursos y evalúa reglas.' },
        { t: 'Audit Manager', d: 'Servicio que recopila evidencias y genera informes para auditorías.' },
        { t: 'Conformance Pack', d: 'Conjunto de reglas de AWS Config que evalúa un marco completo.' },
        { t: 'SOC 2', d: 'Informe de auditoría independiente sobre controles de seguridad de AWS.' },
        { t: 'Inspector', d: 'Servicio de análisis de vulnerabilidades de cargas de trabajo.' }
      ],
      quiz: [
        { p: 'Un auditor solicita los informes SOC 2 e ISO 27001 de AWS. ¿Dónde se obtienen?', op: ['En AWS Trusted Advisor', 'En AWS Artifact', 'En AWS Config', 'En la consola de IAM'], ok: 1, e: 'AWS Artifact es el portal de autoservicio con los informes de conformidad y los acuerdos de AWS.' },
        { p: '¿Qué servicio permite evaluar si los recursos cumplen reglas de configuración como «cifrado obligatorio en EBS»?', op: ['AWS CloudTrail', 'AWS Config', 'AWS Shield', 'Amazon Macie'], ok: 1, e: 'AWS Config evalúa reglas sobre el estado de configuración de los recursos y registra los cambios.' },
        { p: '¿Qué servicio recopila evidencias y genera informes para preparar una auditoría?', op: ['AWS Audit Manager', 'AWS Security Hub', 'Amazon GuardDuty', 'AWS WAF'], ok: 0, e: 'Audit Manager automatiza la recopilación de evidencias y la generación de informes de auditoría.' }
      ]
    }
  ]
});
