/* Examen del curso · 40 preguntas oficiales de los módulos 1 a 4
   Cada pregunta conserva la respuesta literal del examen; «op» y «ok» son
   las opciones del modo test, con la correcta en la posición indicada. */
(window.EXAMEN = window.EXAMEN || []).push({
  id: 't1',
  numero: 1,
  titulo: 'Introducción a la informática en la nube',
  seccion: 'm1s1',
  preguntas: [
    {
      p: '¿Qué es la informática en la nube y cómo se define su modelo comercial?',
      r: 'Es la entrega bajo demanda de potencia de cómputo, almacenamiento, bases de datos, aplicaciones y otros recursos de TI a través de Internet mediante un modelo de precios de pago por uso.',
      op: [
        'La entrega bajo demanda de recursos de TI por Internet con un modelo de pago por uso',
        'La compra de servidores propios y su amortización a lo largo de varios años',
        'El alquiler de hardware con una capacidad fija pactada por contrato',
        'El acceso gratuito a recursos informáticos compartidos entre empresas'
      ],
      ok: 0
    },
    {
      p: '¿Qué significa tratar la infraestructura como software en lugar de como hardware tradicional?',
      r: 'Significa dejar atrás las soluciones físicas que exigen grandes inversiones de capital, espacio físico, mantenimiento y planificación rígida, sustituyéndolas por soluciones de software flexibles que se aprovisionan y terminan bajo demanda y se escalan de forma elástica y automatizada.',
      op: [
        'Instalar herramientas de gestión de software en los servidores del centro de datos propio',
        'Sustituir inversiones físicas rígidas por recursos que se aprovisionan, escalan y liberan por software y bajo demanda',
        'Ejecutar las aplicaciones de la empresa sobre máquinas virtuales locales',
        'Externalizar el desarrollo del software a un proveedor externo'
      ],
      ok: 1
    },
    {
      p: '¿Qué es el modelo IaaS (Infraestructura como Servicio) y qué nivel de control ofrece?',
      r: 'Es la categoría base de la TI en la nube que proporciona acceso a recursos de red, equipos (virtuales o dedicados) y almacenamiento de datos, ofreciendo el nivel más alto de flexibilidad y control de administración sobre la infraestructura.',
      op: [
        'Una plataforma gestionada en la que solo se despliega el código de la aplicación',
        'Un producto final listo para usar que administra por completo el proveedor',
        'Acceso a red, equipos y almacenamiento con el mayor control sobre la infraestructura',
        'Un servicio de almacenamiento de objetos accesible por API'
      ],
      ok: 2
    },
    {
      p: '¿En qué consiste el modelo PaaS (Plataforma como Servicio)?',
      r: 'Es un modelo que reduce la necesidad de administrar la infraestructura subyacente (hardware y sistemas operativos) para permitir a las organizaciones concentrarse exclusivamente en el despliegue y la gestión de las aplicaciones.',
      op: [
        'Ofrece control total del sistema operativo, de la red y de los parches',
        'Entrega una aplicación terminada que el usuario final solo utiliza',
        'Alquila capacidad de GPU para entrenar modelos de inteligencia artificial',
        'Reduce la administración de hardware y sistemas operativos para centrarse en las aplicaciones'
      ],
      ok: 3
    },
    {
      p: '¿Qué caracteriza al modelo SaaS (Software como Servicio)?',
      r: 'Ofrece un producto completo de usuario final ejecutado y administrado íntegramente por el proveedor, donde el usuario solo se preocupa por utilizar el software sin gestionar servidores ni mantenimiento.',
      op: [
        'Un producto completo ejecutado y administrado por el proveedor; el usuario solo lo utiliza',
        'El cliente administra el sistema operativo y aplica los parches',
        'El cliente despliega su propio código en un entorno gestionado',
        'Infraestructura dedicada, sin recursos compartidos con otros clientes'
      ],
      ok: 0
    },
    {
      p: '¿En qué consiste el modelo de implementación en la Nube (Cloud-native)?',
      r: 'Es un entorno donde la aplicación se encuentra totalmente creada o migrada para ejecutarse en la nube, aprovechando servicios de infraestructura o abstraídos de alto nivel.',
      op: [
        'Una aplicación tradicional que se ejecuta en un centro de datos propio',
        'Una aplicación creada o migrada para ejecutarse en la nube, con servicios de infraestructura o abstraídos',
        'Una aplicación local que solo se sincroniza con la nube para hacer copias',
        'Una aplicación instalada únicamente en el ordenador del usuario'
      ],
      ok: 1
    },
    {
      p: '¿Cómo funciona el modelo de implementación Híbrido?',
      r: 'Es una estrategia que conecta e integra la infraestructura y aplicaciones en la nube con los recursos existentes situados en las instalaciones locales (on-premises).',
      op: [
        'Todo el sistema funciona únicamente en la nube pública',
        'Todo el sistema funciona en un centro de datos propio virtualizado',
        'Conecta e integra la nube con los recursos que siguen en las instalaciones locales',
        'Se basa exclusivamente en funciones serverless'
      ],
      ok: 2
    },
    {
      p: '¿Qué define a la implementación En las instalaciones (Nube Privada)?',
      r: 'Es la gestión de recursos dedicados mediante herramientas de virtualización en un centro de datos propio, ofreciendo control sobre la infraestructura local.',
      op: [
        'Recursos compartidos con otros clientes en la nube pública',
        'Servicios gestionados por AWS en sus propias regiones',
        'Contenedores ejecutados sin administrar servidores',
        'Recursos dedicados gestionados con virtualización en un centro de datos propio'
      ],
      ok: 3
    },
    {
      p: '¿A qué equivalen en AWS los componentes de red tradicionales como enrutadores y conmutadores?',
      r: 'Sus equivalentes directos son Amazon VPC (redes virtuales privadas) y Elastic Load Balancing (balanceadores de carga).',
      op: [
        'Amazon VPC y Elastic Load Balancing',
        'Amazon S3 y Amazon EBS',
        'AWS IAM y AWS KMS',
        'Amazon Route 53 y Amazon CloudFront'
      ],
      ok: 0
    },
    {
      p: '¿A qué equivalen en AWS los firewalls y listas de control de acceso del entorno tradicional?',
      r: 'Equivalen a los Grupos de seguridad de AWS, las ACLs de red y AWS Identity and Access Management (IAM).',
      op: [
        'A Amazon VPC y Elastic Load Balancing',
        'A AWS Shield y AWS WAF exclusivamente',
        'A los grupos de seguridad, las ACL de red y AWS IAM',
        'A AWS Security Hub y Amazon GuardDuty'
      ],
      ok: 2
    }
  ]
});

(window.EXAMEN = window.EXAMEN || []).push({
  id: 't2',
  numero: 2,
  titulo: 'Las seis ventajas principales de la nube',
  seccion: 'm1s2',
  preguntas: [
    {
      p: '¿En qué consiste la ventaja de cambiar los gastos de capital por gastos variables?',
      r: 'Consiste en sustituir las grandes inversiones iniciales fijas en centros de datos y hardware (capex) por pagos variables únicamente basados en el consumo real de recursos.',
      op: [
        'Firmar un contrato plurianual con un precio fijo por servidor',
        'Sustituir las grandes inversiones iniciales por pagos variables según el consumo real',
        'Comprar hardware con descuento por volumen',
        'Financiar la migración con créditos de AWS'
      ],
      ok: 1
    },
    {
      p: '¿Cómo beneficia a los usuarios la ventaja de beneficiarse de economías de escala masivas?',
      r: 'El consumo acumulado por cientos de miles de clientes permite a proveedores como AWS lograr mayores economías de escala, traduciéndose en precios por uso cada vez más bajos.',
      op: [
        'Los clientes pequeños pagan menos por unidad que los grandes',
        'El precio se fija por contrato y no cambia con el volumen',
        'El consumo agregado de cientos de miles de clientes permite precios unitarios cada vez más bajos',
        'AWS sube los precios al crecer para financiar nueva infraestructura'
      ],
      ok: 2
    },
    {
      p: '¿De qué manera la nube permite eliminar las estimaciones sobre capacidad?',
      r: 'Elimina la incertidumbre sobre el dimensionamiento de la infraestructura, permitiendo escalar recursos de forma ascendente o descendente en cuestión de minutos según la demanda real.',
      op: [
        'Permite escalar recursos arriba o abajo en minutos según la demanda real',
        'Obliga a comprar capacidad para el pico máximo previsto',
        'Mantiene una capacidad reservada fija durante todo el año',
        'Estima la capacidad con herramientas de modelado y compra el hardware necesario'
      ],
      ok: 0
    },
    {
      p: '¿Por qué la informática en la nube permite aumentar la velocidad y la agilidad?',
      r: 'Porque los recursos de TI están disponibles a un solo clic, reduciendo el tiempo de despliegue para los desarrolladores de semanas a tan solo minutos.',
      op: [
        'Porque se reducen los entornos de prueba para ahorrar costes',
        'Porque se automatiza únicamente la facturación',
        'Porque se elimina la fase de pruebas para desplegar antes',
        'Porque los recursos están disponibles en un clic y el despliegue pasa de semanas a minutos'
      ],
      ok: 3
    },
    {
      p: '¿Qué implica la ventaja de dejar de gastar dinero en la ejecución y el mantenimiento de centros de datos?',
      r: 'Permite a las organizaciones concentrar sus esfuerzos y recursos en proyectos que diferencien su negocio principal en lugar de dedicarlos a montar servidores en bastidores, apilarlos y alimentarlos.',
      op: [
        'El equipo dedica su esfuerzo a proyectos de negocio en lugar de montar y alimentar servidores',
        'Se subcontrata el mantenimiento del centro de datos a otra empresa',
        'Se traslada el centro de datos a un país con energía más barata',
        'Se comparten racks con otras empresas en el mismo centro de datos'
      ],
      ok: 0
    },
    {
      p: '¿En qué consiste la ventaja de adquirir escala mundial en cuestión de minutos?',
      r: 'Permite implementar aplicaciones en múltiples regiones de AWS alrededor del mundo con pocos clics para ofrecer menor latencia a los clientes.',
      op: [
        'Abrir oficinas propias en cada país donde haya clientes',
        'Desplegar en varias regiones con pocos clics para reducir la latencia',
        'Contratar centros de datos locales en cada mercado',
        'Concentrar todo el servicio en una única región céntrica'
      ],
      ok: 1
    },
    {
      p: '¿Qué diferencia a un gasto de capital (capex) de un gasto variable en TI?',
      r: 'El gasto de capital requiere compras e inversiones físicas por adelantado antes de saber su uso, mientras que el gasto variable se ajusta o evita fácilmente pagando por consumo.',
      op: [
        'El capex se paga mensualmente según el consumo y el variable por adelantado',
        'Ambos son idénticos desde el punto de vista contable',
        'El gasto de capital exige inversión por adelantado y el variable se paga por consumo',
        'El gasto variable exige un compromiso de varios años'
      ],
      ok: 2
    },
    {
      p: '¿Qué riesgo existe en la TI tradicional al realizar estimaciones teóricas de capacidad máxima?',
      r: 'Si no se alcanza el pico previsto se pagan recursos inactivos muy costosos; si se supera la estimación, la organización se queda sin capacidad para atender las solicitudes.',
      op: [
        'Solo hay riesgo si se utilizan contenedores',
        'El riesgo desaparece comprando hardware de segunda mano',
        'El riesgo es únicamente de seguridad',
        'Si no se alcanza el pico se pagan recursos ociosos y, si se supera, falta capacidad'
      ],
      ok: 3
    },
    {
      p: '¿Por qué la agilidad de la nube reduce los costes y riesgos de experimentación?',
      r: 'Porque al reducir el tiempo de aprovisionamiento a minutos y permitir apagar recursos no utilizados, probar nuevas ideas o productos requiere una inversión mínima.',
      op: [
        'Aprovisionar en minutos y apagar lo que no se usa abarata probar ideas nuevas',
        'Porque se elimina la necesidad de presupuesto',
        'Porque permite experimentar sin medir los resultados',
        'Porque la nube regala créditos para las pruebas'
      ],
      ok: 0
    },
    {
      p: '¿Cuál es el factor que permite a AWS ofrecer reducciones continuas de precios en sus servicios?',
      r: 'La economía de escala masiva obtenida al sumar el consumo de cientos de miles de clientes.',
      op: [
        'La competencia entre proveedores',
        'El crecimiento de la facturación de AWS',
        'Los acuerdos comerciales con los gobiernos',
        'La economía de escala del consumo agregado de cientos de miles de clientes'
      ],
      ok: 3
    }
  ]
});

(window.EXAMEN = window.EXAMEN || []).push({
  id: 't3',
  numero: 3,
  titulo: 'Ecosistema y servicios de AWS',
  seccion: 'm1s3',
  preguntas: [
    {
      p: '¿Qué es un servicio web dentro de la plataforma AWS?',
      r: 'Es un software disponible en red que utiliza formatos estandarizados (como XML o JSON) para procesar solicitudes y respuestas mediante una API, autodescriptivo y detectable.',
      op: [
        'Cualquier página web alojada en Internet',
        'Un software en red que usa formatos estandarizados como XML o JSON mediante una API',
        'Un programa que se instala en el ordenador del usuario',
        'Un servicio de correo electrónico corporativo'
      ],
      ok: 1
    },
    {
      p: '¿Qué nivel de control ofrece Amazon EC2 en la categoría de cómputo?',
      r: 'Proporciona un control total y absoluto sobre los servidores virtuales y la configuración del entorno informático.',
      op: [
        'Solo permite ejecutar funciones ante eventos',
        'Ofrece una plataforma gestionada donde únicamente se sube el código',
        'Proporciona control total sobre los servidores virtuales y su configuración',
        'Solo permite almacenar objetos mediante una API'
      ],
      ok: 2
    },
    {
      p: '¿Cuál es la característica distintiva del servicio informático AWS Lambda?',
      r: 'Permite ejecutar código en respuesta a eventos sin necesidad de aprovisionar ni administrar servidores (serverless).',
      op: [
        'Ejecuta código ante eventos sin aprovisionar ni administrar servidores',
        'Orquesta contenedores sobre Kubernetes',
        'Crea servidores virtuales de larga duración',
        'Aloja sitios web estáticos'
      ],
      ok: 0
    },
    {
      p: '¿Qué función cumple AWS Elastic Beanstalk?',
      r: 'Es un servicio que implementa, administra y escala automáticamente aplicaciones web a partir del código fuente proporcionado por el desarrollador.',
      op: [
        'Ejecuta funciones serverless ante eventos',
        'Gestiona clústeres de Kubernetes',
        'Ofrece bases de datos NoSQL gestionadas',
        'Implementa, administra y escala automáticamente aplicaciones web desde el código del desarrollador'
      ],
      ok: 3
    },
    {
      p: '¿Para qué casos de uso están diseñados servicios como Amazon ECS, Amazon EKS y AWS Fargate?',
      r: 'Están diseñados para la gestión, orquestación y despliegue de arquitecturas de contenedores y microservicios.',
      op: [
        'Gestión, orquestación y despliegue de contenedores y microservicios',
        'Análisis de datos y almacenes de datos',
        'Creación de redes privadas virtuales',
        'Copias de seguridad y archivado a largo plazo'
      ],
      ok: 0
    },
    {
      p: '¿Para qué tipo de proyectos es adecuado utilizar Amazon Lightsail?',
      r: 'Es adecuado cuando se requiere una plataforma en la nube ligera y simplificada para crear aplicaciones web sencillas.',
      op: [
        'Para entrenar modelos de inteligencia artificial con GPU',
        'Para plataformas ligeras y simplificadas con aplicaciones web sencillas',
        'Para bases de datos relacionales de alto rendimiento',
        'Para orquestar contenedores a gran escala'
      ],
      ok: 1
    },
    {
      p: '¿Qué es la Consola de Administración de AWS?',
      r: 'Es una interfaz gráfica basada en navegador web que permite gestionar la gran mayoría de los servicios y recursos de AWS.',
      op: [
        'Una herramienta de línea de comandos',
        'Una biblioteca para programar contra la API',
        'Una interfaz gráfica en el navegador para gestionar los servicios de AWS',
        'Una API sin interfaz de usuario'
      ],
      ok: 2
    },
    {
      p: '¿Qué capacidades ofrece la Interfaz de Línea de Comandos de AWS (AWS CLI)?',
      r: 'Ofrece un conjunto de utilidades ejecutables mediante comandos y scripts en entornos Linux, macOS o Windows para automatizar acciones.',
      op: [
        'Una interfaz gráfica accesible desde el navegador',
        'Un servicio de mensajería entre aplicaciones',
        'Un entorno de desarrollo integrado en la nube',
        'Utilidades por comandos y scripts en Linux, macOS o Windows para automatizar acciones'
      ],
      ok: 3
    },
    {
      p: '¿Qué función cumplen los SDKs (Kits de Desarrollo de Software) de AWS?',
      r: 'Proporcionan paquetes de bibliotecas en múltiples lenguajes de programación para integrar y controlar servicios de AWS directamente desde el código de las aplicaciones.',
      op: [
        'Bibliotecas en varios lenguajes para controlar servicios de AWS desde el código',
        'La documentación oficial de la API de AWS',
        'Los comandos de terminal equivalentes a la consola',
        'Plantillas de infraestructura como código'
      ],
      ok: 0
    },
    {
      p: '¿En qué consiste el concepto de los bloques de construcción (building blocks) de AWS?',
      r: 'En que los servicios de AWS están diseñados para integrarse y trabajar juntos de forma flexible, permitiendo ensamblar soluciones complejas adaptadas a cada necesidad.',
      op: [
        'En plantillas cerradas que no se pueden modificar',
        'En bloques de hardware que se compran por unidades',
        'En servicios que se combinan de forma flexible para ensamblar soluciones complejas',
        'En contratos de servicio firmados con AWS'
      ],
      ok: 2
    }
  ]
});

(window.EXAMEN = window.EXAMEN || []).push({
  id: 't4',
  numero: 4,
  titulo: 'Marco de adopción de la nube (AWS CAF)',
  seccion: 'm1s4',
  preguntas: [
    {
      p: '¿Qué es el AWS Cloud Adoption Framework (AWS CAF) y cuál es su objetivo?',
      r: 'Es un marco conceptual que proporciona orientación y prácticas recomendadas para diseñar e implementar un plan estructurado que acelere la adopción de la nube en una organización.',
      op: [
        'Una herramienta de facturación para estimar el coste mensual',
        'Un marco con orientación y buenas prácticas para un plan estructurado de adopción de la nube',
        'Un programa de certificaciones oficiales de AWS',
        'Un catálogo de precios de los servicios de AWS'
      ],
      ok: 1
    },
    {
      p: '¿Cuáles son las tres dimensiones organizativas que deben alinearse según el AWS CAF?',
      r: 'Deben alinearse las personas, los procesos y la tecnología.',
      op: [
        'El coste, la seguridad y la red',
        'El negocio, la TI y el departamento legal',
        'Las personas, los procesos y la tecnología',
        'La plataforma, los datos y las aplicaciones'
      ],
      ok: 2
    },
    {
      p: '¿En cuántas perspectivas organiza el AWS CAF su orientación?',
      r: 'Organiza sus directrices en 6 perspectivas: Negocio, Personal, Gobernanza, Plataforma, Seguridad y Operaciones.',
      op: [
        'En seis perspectivas',
        'En tres perspectivas',
        'En cuatro perspectivas',
        'En ocho perspectivas'
      ],
      ok: 0
    },
    {
      p: '¿Qué perspectivas del AWS CAF representan las capacidades empresariales?',
      r: 'Las perspectivas de Negocio, Personal y Gobernanza.',
      op: [
        'Plataforma, Seguridad y Operaciones',
        'Personas, procesos y tecnología',
        'Negocio, Plataforma y Seguridad',
        'Negocio, Personal y Gobernanza'
      ],
      ok: 3
    },
    {
      p: '¿Qué perspectivas del AWS CAF representan las capacidades técnicas?',
      r: 'Las perspectivas de Plataforma, Seguridad y Operaciones.',
      op: [
        'Plataforma, Seguridad y Operaciones',
        'Negocio, Personal y Gobernanza',
        'Negocio, Seguridad y Personal',
        'Plataforma, Gobernanza y Operaciones'
      ],
      ok: 0
    },
    {
      p: '¿Cuál es el enfoque principal de la perspectiva de Negocio (Business)?',
      r: 'Asegurar que las estrategias y objetivos de TI estén alineados con los objetivos empresariales para crear un argumento de negocio sólido y priorizar la adopción.',
      op: [
        'Diseñar la arquitectura de red y los patrones técnicos',
        'Alinear la estrategia de TI con los objetivos del negocio y construir el caso de negocio',
        'Formar al personal y gestionar el cambio',
        'Gestionar los incidentes operativos del día a día'
      ],
      ok: 1
    },
    {
      p: '¿De qué se ocupa la perspectiva del Personal (People)?',
      r: 'Evalúa funciones, estructuras organizativas y habilidades requeridas para identificar deficiencias y priorizar la formación técnica y la gestión del cambio.',
      op: [
        'Define los patrones arquitectónicos del entorno de destino',
        'Establece los controles de auditoría y conformidad',
        'Evalúa roles, estructura y habilidades, y prioriza formación y gestión del cambio',
        'Optimiza la facturación de los servicios consumidos'
      ],
      ok: 2
    },
    {
      p: '¿Cuál es la función de la perspectiva de Gobernanza (Governance)?',
      r: 'Centrarse en los procesos y habilidades necesarios para alinear la estrategia de TI con los objetivos del negocio, maximizando el valor de la inversión y reduciendo riesgos.',
      op: [
        'Definir el catálogo de servicios de red',
        'Gestionar los turnos de guardia del equipo técnico',
        'Seleccionar las regiones donde se despliega cada aplicación',
        'Alinear la estrategia de TI con el negocio maximizando el valor y reduciendo riesgos'
      ],
      ok: 3
    },
    {
      p: '¿De qué se encarga la perspectiva de Plataforma (Platform)?',
      r: 'Proporciona principios y patrones arquitectónicos para describir en detalle el entorno de destino, implementar nuevas soluciones y migrar cargas de trabajo.',
      op: [
        'Principios y patrones arquitectónicos para el entorno de destino, nuevas soluciones y migraciones',
        'La formación del personal y la gestión del cambio',
        'La auditoría y el cumplimiento normativo',
        'Las compras y la relación con proveedores'
      ],
      ok: 0
    },
    {
      p: '¿Cuáles son las metas de las perspectivas de Seguridad y Operaciones?',
      r: 'La perspectiva de Seguridad estructura los controles de visibilidad, auditoría y protección de datos, mientras que la de Operaciones define los procedimientos operativos diarios para mantener y respaldar las cargas de trabajo en la nube.',
      op: [
        'Seguridad factura los servicios y Operaciones los audita',
        'Ambas se centran en la formación del personal',
        'Seguridad estructura visibilidad, auditoría y protección, y Operaciones define los procedimientos diarios',
        'Ambas dependen del equipo comercial de la organización'
      ],
      ok: 2
    }
  ]
});
