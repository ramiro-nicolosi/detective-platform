import { DetectiveCase } from '@/types/detective';

export const sampleCases: DetectiveCase[] = [
  {
    id: 1,
    title: "El Robo del Museo Nacional",
    description: "La famosa pintura 'Dama en Azul' valorizada en $2.5 millones ha desaparecido durante la madrugada.",
    difficulty: "easy",
    location: "Museo Nacional de Arte",
    timeframe: "Entre las 23:00 y 06:00 horas",
    suspects: [
      {
        name: "Carlos Martín",
        age: 34,
        role: "Guardia de Seguridad",
        photo: "/suspects/carlos-martin.jpg",
        description: "Guardia nocturno con 5 años de experiencia, recientemente divorciado.",
        alibi: "Realizaba su ronda habitual cada 2 horas",
        background: "Ex-militar, sin antecedentes, problemas financieros recientes",
        aiPersonality: {
          traits: ["nervous", "defensive", "honest"],
          secretKnowledge: ["Necesita dinero urgentemente", "Vio a alguien cerca del museo", "Su tarjeta de acceso fue clonada"],
          truthfulness: 0.8,
          nervousness: 0.9,
          cooperation: 0.7,
          keywords: ["dinero", "divorcio", "tarjeta", "acceso", "ronda", "militar"],
          reactions: {
            "dinero": [
              "Mire, es cierto que tengo problemas económicos, pero eso no me convierte en ladrón.",
              "El divorcio me está costando mucho... pero jamás robaría.",
              "¿Cómo sabe eso? Sí, necesito dinero, pero hay formas legales de conseguirlo."
            ],
            "divorcio": [
              "Mi ex-esposa se está quedando con todo... es duro, detective.",
              "Prefiero no hablar de mi vida personal si no le importa.",
              "El proceso legal está siendo muy caro, pero eso no significa nada."
            ],
            "tarjeta": [
              "¿Mi tarjeta de acceso? La tengo aquí, siempre la llevo conmigo.",
              "Un momento... ¿cómo es posible? Mi tarjeta estuvo conmigo toda la noche.",
              "Espere, déjeme revisar... alguien debe haber copiado mi tarjeta."
            ],
            "militar": [
              "Mi entrenamiento militar me enseñó disciplina y honor, detective.",
              "Los valores militares son importantes para mí: lealtad, honor, deber.",
              "En el ejército aprendes a seguir las reglas, no a romperlas."
            ]
          }
        },
        chatHistory: []
      },
      {
        name: "Ana López",
        age: 28,
        role: "Curadora Principal",
        photo: "/suspects/ana-lopez.jpg",
        description: "Especialista en arte renacentista, conoce el valor exacto de cada pieza.",
        alibi: "Se fue a las 18:00 PM, registro de salida confirmado",
        background: "Doctorado en Historia del Arte, 3 años en el museo",
        aiPersonality: {
          traits: ["intellectual", "cooperative", "precise"],
          secretKnowledge: ["Conoce el verdadero valor de todas las piezas", "Tiene contactos en el mercado negro", "Sabe sobre la falta de seguridad"],
          truthfulness: 0.9,
          nervousness: 0.2,
          cooperation: 0.8,
          keywords: ["arte", "valor", "mercado", "seguridad", "renacentista", "contactos"],
          reactions: {
            "arte": [
              "El arte es mi vida, detective. Cada pieza tiene una historia única.",
              "La 'Dama en Azul' es una obra maestra del Renacimiento tardío, valorada en 2.5 millones.",
              "Mi trabajo es proteger y preservar estas obras para las futuras generaciones."
            ],
            "valor": [
              "Conozco el valor de cada pieza en el museo, es parte de mi trabajo.",
              "El mercado del arte es muy complejo, hay muchos factores que determinan el precio.",
              "Sí, sé que algunas piezas valen más en el mercado negro, pero eso no significa nada."
            ],
            "mercado": [
              "El mercado del arte es mi especialidad, pero siempre dentro de la legalidad.",
              "Tengo contactos profesionales, sí, pero todos son legítimos coleccionistas y galeristas.",
              "¿Mercado negro? Detective, yo jamás me involucraría en algo así."
            ],
            "seguridad": [
              "He mencionado varias veces que necesitamos mejorar la seguridad del museo.",
              "Los sistemas de seguridad son demasiado básicos para el valor de las obras que protegemos.",
              "Cualquiera con conocimiento técnico podría burlar nuestras medidas actuales."
            ]
          }
        },
        chatHistory: []
      }
    ],
    evidence: [
      {
        name: "Grabación CCTV",
        type: "video",
        file: "security_cam_001.mp4",
        description: "Figura encapuchada moviéndose hacia la sala de arte a las 02:47",
        importance: "critical",
        icon: "🎥",
        photo: "/evidence/museum-cctv-footage.jpg"
      },
      {
        name: "Huella Dactilar",
        type: "forensic",
        file: "fingerprint_analysis.pdf",
        description: "Huella parcial recuperada del marco dorado",
        importance: "high",
        icon: "🔍",
        photo: "/evidence/fingerprint-analysis.jpg"
      }
    ],
    clues: [
      { text: "La alarma fue desactivada desde adentro a las 23:45", revealed: true, category: "Seguridad" },
      { text: "Tarjeta de acceso encontrada en el pasillo", revealed: false, category: "Evidencia Física" },
      { text: "Café del guardia aún estaba caliente a las 06:00", revealed: false, category: "Cronología" }
    ],
    solution: "Carlos Martín robó la pintura aprovechando su acceso como guardia de seguridad."
  },
  {
    id: 2,
    title: "Asesinato en Villa Esperanza",
    description: "El magnate inmobiliario Richard Blackwood fue encontrado muerto en su estudio privado.",
    difficulty: "medium",
    location: "Villa Esperanza - Mansión Blackwood",
    timeframe: "Entre las 21:00 y 23:30 horas",
    suspects: [
      {
        name: "Victoria Blackwood",
        age: 42,
        role: "Esposa",
        photo: "/suspects/victoria-blackwood.jpg",
        description: "Heredera principal, matrimonio conflictivo.",
        alibi: "En el spa hasta las 22:00, luego a dormir",
        background: "Segundo matrimonio, problemas de alcohol",
        aiPersonality: {
          traits: ["bitter", "sarcastic", "secretive"],
          secretKnowledge: ["Richard tenía una amante", "El testamento fue modificado", "Problemas de alcoholismo"],
          truthfulness: 0.6,
          nervousness: 0.3,
          cooperation: 0.4,
          keywords: ["matrimonio", "dinero", "testamento", "alcohol", "spa", "richard"],
          reactions: {
            "matrimonio": [
              "¿Matrimonio feliz? Por favor, detective. Richard y yo éramos más como... socios comerciales.",
              "Nuestro matrimonio era complicado, pero eso no significa que lo maté.",
              "Los matrimonios ricos nunca son como en los cuentos de hadas, detective."
            ],
            "dinero": [
              "El dinero siempre ha sido importante en esta familia, sí.",
              "¿Insinúa que maté a mi esposo por dinero? Qué original, detective.",
              "Ya tenía acceso a su fortuna, ¿para qué lo mataría?"
            ],
            "testamento": [
              "¿Testamento? No sé de qué me habla... ¿Richard cambió algo?",
              "Supongo que soy la heredera principal, como es normal en estos casos.",
              "¿Hay algo raro en el testamento que debería saber?"
            ],
            "alcohol": [
              "¿Mi problema con el alcohol? Eso es algo personal, detective.",
              "Una copa de vino me ayuda a lidiar con... todo esto.",
              "No veo cómo mis hábitos de consumo sean relevantes para el caso."
            ]
          }
        },
        chatHistory: []
      },
      {
        name: "Robert Sterling",
        age: 38,
        role: "Socio de Negocios",
        photo: "/suspects/robert-sterling.jpg",
        description: "CEO de Sterling Investments, socio de Richard en múltiples proyectos.",
        alibi: "Reunión en hotel Paramount hasta las 23:00",
        background: "15 años de sociedad, malversación recién descubierta",
        aiPersonality: {
          traits: ["calculating", "smooth-talking", "guilty"],
          secretKnowledge: ["Malversó dinero de la empresa", "Richard lo había descubierto", "Planeaba huir del país"],
          truthfulness: 0.4,
          nervousness: 0.7,
          cooperation: 0.6,
          keywords: ["negocios", "malversación", "dinero", "sociedad", "meeting", "richard"],
          reactions: {
            "negocios": [
              "Los negocios con Richard siempre fueron... complejos, pero rentables.",
              "Éramos socios desde hace 15 años, detective. Había confianza mutua.",
              "El mundo de los negocios es duro, pero siempre fuimos éticos... mostly."
            ],
            "malversación": [
              "¿Malversación? Esa es una palabra muy fuerte, detective.",
              "Los números a veces pueden parecer confusos para alguien de afuera...",
              "No sé de dónde saca esa información, pero le aseguro que mis cuentas están en orden."
            ],
            "dinero": [
              "El dinero siempre es importante en los negocios, detective.",
              "Richard y yo manejábamos grandes sumas, es normal que haya... discrepancias menores.",
              "¿Está insinuando que maté a mi socio por dinero? Eso es absurdo."
            ],
            "richard": [
              "Richard era... era mi amigo, además de socio. Su muerte me afecta mucho.",
              "Habíamos tenido algunas diferencias últimamente, pero nada grave.",
              "Era un hombre difícil, pero lo respetaba... respetaba mucho."
            ]
          }
        },
        chatHistory: []
      }
    ],
    evidence: [
      {
        name: "Candelabro - Arma del Crimen",
        type: "physical",
        file: "weapon_analysis.pdf",
        description: "Candelabro de plata con residuos de sangre",
        importance: "critical",
        icon: "⚖️",
        photo: "/evidence/crime-scene-weapon.jpg"
      },
      {
        name: "Carta Amenazante",
        type: "document",
        file: "threatening_letter.jpg",
        description: "Carta manuscrita amenazando con revelar la verdad",
        importance: "high",
        icon: "📝",
        photo: "/evidence/threatening-letter.jpg"
      }
    ],
    clues: [
      { text: "Puerta del estudio cerrada desde adentro", revealed: true, category: "Escena" },
      { text: "Discusión escuchada a las 22:00", revealed: true, category: "Testigos" },
      { text: "Testamento modificado hace 3 días", revealed: false, category: "Legal" }
    ],
    solution: "Robert Sterling mató a Richard por problemas de malversación, usando el candelabro."
  },
  {
    id: 3,
    title: "Desaparición en Laboratorios Phoenix",
    description: "El Dr. Alexander Chen ha desaparecido junto con la fórmula GEN-47, valorizada en $100 millones.",
    difficulty: "hard",
    location: "Complejo Científico Phoenix - Lab 7",
    timeframe: "Entre viernes 20:00 y lunes 08:00",
    suspects: [
      {
        name: "Dr. Elena Vásquez",
        age: 39,
        role: "Directora de Investigación",
        photo: "/suspects/elena-vasquez.jpg",
        description: "Competidora directa, acceso nivel 5 al laboratorio.",
        alibi: "Conferencia internacional en Ginebra",
        background: "15 años en Phoenix, rivalidad conocida con Chen",
        aiPersonality: {
          traits: ["ambitious", "professional", "competitive"],
          secretKnowledge: ["Sabía sobre GEN-47 antes que Chen", "Tenía ofertas de otras compañías", "Chen le robó una investigación previa"],
          truthfulness: 0.7,
          nervousness: 0.4,
          cooperation: 0.5,
          keywords: ["investigación", "chen", "fórmula", "phoenix", "ginebra", "competencia"],
          reactions: {
            "investigación": [
              "Mi investigación es mi vida, detective. He dedicado años a desarrollar tratamientos innovadores.",
              "La investigación científica requiere dedicación total y a veces... sacrificios.",
              "Cada descubrimiento podría salvar millones de vidas. Eso es lo que me motiva."
            ],
            "chen": [
              "Alexander era... un colega respetado, aunque teníamos diferencias profesionales.",
              "Chen siempre fue muy reservado con su trabajo. Quizás demasiado.",
              "Tuvimos nuestras diferencias, sí, pero eso no significa que le desee mal."
            ],
            "fórmula": [
              "GEN-47 representa años de investigación colectiva del equipo.",
              "Esa fórmula podría revolucionar el tratamiento del cáncer, detective.",
              "No entiendo por qué Chen se la llevó. Debería haber compartido el descubrimiento."
            ],
            "competencia": [
              "La ciencia es naturalmente competitiva, pero siempre dentro de límites éticos.",
              "Sí, hay competencia entre investigadores, pero eso nos hace mejores.",
              "La competencia sana impulsa la innovación, detective."
            ]
          }
        },
        chatHistory: []
      },
      {
        name: "Thomas Anderson",
        age: 26,
        role: "Asistente de Laboratorio",
        photo: "/suspects/thomas-anderson.jpg",
        description: "Brillante pero ambicioso, acceso directo a experimentos.",
        alibi: "Fin de semana en casa de sus padres",
        background: "MIT graduate, frustrado por falta de reconocimiento",
        aiPersonality: {
          traits: ["brilliant", "frustrated", "desperate"],
          secretKnowledge: ["Planeó todo meticulosamente", "Tiene contactos para vender la fórmula", "Odio hacia el sistema corporativo"],
          truthfulness: 0.3,
          nervousness: 0.8,
          cooperation: 0.2,
          keywords: ["reconocimiento", "mit", "chen", "fórmula", "padres", "sistema"],
          reactions: {
            "reconocimiento": [
              "¿Reconocimiento? En este lugar solo reconocen a los que tienen títulos rimbombantes.",
              "He trabajado día y noche en esta investigación y nadie nota mi contribución.",
              "MIT me preparó para ser líder, no un simple asistente toda la vida."
            ],
            "mit": [
              "MIT fue la mejor etapa de mi vida. Ahí sí valoraban el talento real.",
              "En MIT aprendí que la innovación no espera por la burocracia.",
              "Mis profesores en MIT decían que estaba destinado a grandes cosas..."
            ],
            "chen": [
              "El Dr. Chen... era un buen jefe, supongo. Siempre muy ocupado.",
              "Chen nunca me daba el crédito que merecía por mi trabajo.",
              "No sé por qué desapareció. Quizás finalmente se dio cuenta de algo..."
            ],
            "sistema": [
              "Este sistema corporativo está podrido, detective. Solo importa el dinero.",
              "La ciencia debería ser libre, no controlada por corporaciones codiciosas.",
              "A veces hay que tomar medidas drásticas para cambiar las cosas."
            ]
          }
        },
        chatHistory: []
      }
    ],
    evidence: [
      {
        name: "Análisis Digital",
        type: "digital",
        file: "digital_forensics.zip",
        description: "Logs de acceso y comunicaciones recuperadas",
        importance: "critical",
        icon: "💻",
        photo: "/evidence/digital-forensics.jpg"
      },
      {
        name: "Muestra de Sangre",
        type: "forensic",
        file: "blood_sample.pdf",
        description: "Tipo O+, coincide con Chen, patrón de lucha",
        importance: "critical",
        icon: "🩸",
        photo: "/evidence/blood-sample.jpg"
      }
    ],
    clues: [
      { text: "Sistema ventilación alterado para gas sedante", revealed: true, category: "Método" },
      { text: "Email encriptado enviado a las 21:47", revealed: true, category: "Digital" },
      { text: "Tarjeta de acceso clonada hace 3 semanas", revealed: false, category: "Seguridad" }
    ],
    solution: "Thomas Anderson secuestró a Chen usando gas sedante para robar la fórmula."
  }
];