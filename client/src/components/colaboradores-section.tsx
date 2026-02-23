import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Shield,
  CheckCircle,
  FileText,
  Eye,
  Star,
  ClipboardList,
  Send,
  Search,
  MessageSquare,
  ArrowRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import arquitectoPhoto from "@assets/1651766771115_1753490676082.jpeg";

const areasColaboracion = [
  "Cálculo estructural (memoria, planos, EETT, coordinación con arquitectura)",
  "Mecánica de suelos (informe y recomendaciones)",
  "Proyecto sanitario / alcantarillado / aguas lluvias (según corresponda)",
  "Proyecto eléctrico (planos y documentación)",
  "Proyecto de gas (cuando aplique)",
  "Coordinación BIM (interferencias, coordinación de especialidades)",
  "Modelación / documentación BIM (Revit / Archicad según corresponda)",
  "Otras áreas según proyecto (climatización, eficiencia energética, etc.)"
];

const pasos = [
  {
    numero: "01",
    titulo: "Publicación del encargo",
    descripcion: "Se define alcance, antecedentes, entregables esperados, plazos y criterios de evaluación.",
    icon: FileText
  },
  {
    numero: "02",
    titulo: "Presentación de cotización competitiva",
    descripcion: "Cada profesional presenta honorarios, plazo, alcance y condiciones para el encargo publicado.",
    icon: Send
  },
  {
    numero: "03",
    titulo: "Evaluación y asignación",
    descripcion: "Se pondera calidad técnica, claridad de propuesta, cumplimiento previo y plazos. No se evalúa solo por precio.",
    icon: Search
  },
  {
    numero: "04",
    titulo: "Retroalimentación",
    descripcion: "Se entrega feedback breve al cierre del encargo, cuando corresponda, para mejorar futuras colaboraciones.",
    icon: MessageSquare
  }
];

const requisitos = [
  "Comunicación clara y tiempos de respuesta razonables",
  "Control documental y trazabilidad de cambios",
  "Entregables completos en formato acordado",
  "Cumplimiento de plazos por hitos"
];

const camposPostulacion = [
  "Área de colaboración",
  "Cobertura (Santiago / regiones)",
  "Experiencia y certificaciones relevantes",
  "Portafolio o trabajos anteriores (link)",
  "Software que utiliza",
  "Modalidad: solo proyecto / también ejecución",
  "Disponibilidad y plazo típico de entrega"
];

const colaboradoresDestacados = [
  {
    slug: "carlos-rodriguez",
    name: "Carlos Rodríguez",
    specialty: "Arquitecto",
    experience: 8,
    location: "Santiago",
    rating: 4.8,
    totalProjects: 23,
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    description: "Especializado en diseño residencial y remodelaciones. Amplia experiencia en ampliación y regularización de viviendas."
  },
  {
    slug: "maria-gonzalez",
    name: "María González",
    specialty: "Ingeniera Estructural",
    experience: 12,
    location: "Viña del Mar",
    rating: 4.9,
    totalProjects: 45,
    profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face",
    description: "Más de 12 años en cálculo y diseño de estructuras residenciales y comerciales. Especialista en reforzamiento sísmico."
  }
];

export default function ColaboradoresSection() {
  return (
    <section id="colaboradores" className="py-0 bg-slate-50">

      {/* Hero con fondo arquitectónico */}
      <div className="relative bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(255,255,255,0.15) 60px, rgba(255,255,255,0.15) 61px), repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(255,255,255,0.15) 60px, rgba(255,255,255,0.15) 61px)`
        }} />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Red de Especialistas y Colaboradores<br className="hidden md:block" /> para Proyectos de Vivienda
          </h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Convocatoria abierta para proyectistas, coordinadores BIM y profesionales/instaladores que desarrollen especialidades y apoyen la ejecución de proyectos habitacionales. Operación principal en Santiago y coordinación con regiones.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* Mensaje del arquitecto */}
        <div className="max-w-4xl mx-auto mb-20">
          <Card className="border border-slate-200 shadow-md bg-white">
            <CardContent className="p-8 md:p-10">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 hidden sm:block">
                  <div className="w-1.5 h-full min-h-[100px] bg-slate-800 rounded-full" />
                </div>
                <div>
                  <p className="text-slate-700 text-base md:text-lg leading-relaxed mb-6">
                    Se está conformando una red técnica de profesionales y especialistas orientada a proyectos de vivienda que requieren coordinación, documentación ordenada y entregables de calidad. El objetivo es contar con colaboradores confiables, con quienes se pueda mantener una relación de trabajo continua basada en cumplimiento, claridad y rigor técnico.
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-slate-300">
                      <img
                        src={arquitectoPhoto}
                        alt="Patricio Becar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="font-semibold text-slate-800 text-sm">— Patricio Becar, Arquitecto (ArquitectoChile)</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Áreas de colaboración requeridas */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h3 className="font-serif text-3xl font-bold text-slate-900 mb-3">Áreas de colaboración requeridas</h3>
            <p className="text-slate-600">Perfiles técnicos que se buscan para integrar la red</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {areasColaboracion.map((area, i) => (
              <div key={i} className="flex items-start gap-3 bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
                <CheckCircle className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700 leading-snug">{area}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Modalidad de coordinación y entregables */}
        <div className="mb-20">
          <div className="max-w-4xl mx-auto">
            <Card className="border border-slate-200 shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="font-serif text-2xl text-slate-900 text-center">Modalidad de coordinación y entregables</CardTitle>
                <p className="text-center text-slate-500 text-sm mt-1">Trabajo principalmente remoto</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-700 text-sm leading-relaxed">
                  Los encargos se coordinan principalmente de forma remota (online), mediante reuniones breves y entrega de documentación digital en formatos acordados. Esta modalidad requiere autonomía, comunicación oportuna y cumplimiento estricto de hitos.
                </p>
                <p className="text-slate-700 text-sm leading-relaxed">
                  En situaciones específicas, y cuando el proyecto lo requiera, se podrá coordinar una visita técnica presencial (levantamiento, inspección o reunión en terreno), dependiendo del tipo de encargo y ubicación.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {[
                    "Coordinación remota como modalidad principal",
                    "Entregables digitales en formatos acordados",
                    "Responsabilidad y autonomía en el cumplimiento",
                    "Visita presencial solo cuando el encargo lo requiera"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-slate-600 flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-600">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Modalidad de participación */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h3 className="font-serif text-3xl font-bold text-slate-900 mb-3">Modalidad de participación</h3>
            <p className="text-slate-600">Proceso de cotización competitiva en cuatro etapas</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {pasos.map((paso) => {
              const Icon = paso.icon;
              return (
                <Card key={paso.numero} className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow bg-white">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-slate-800 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                        {paso.numero}
                      </div>
                      <Icon className="w-5 h-5 text-slate-400" />
                    </div>
                    <CardTitle className="text-lg text-slate-900">{paso.titulo}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 leading-relaxed">{paso.descripcion}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Requisitos mínimos de colaboración */}
        <div className="mb-20">
          <div className="max-w-3xl mx-auto">
            <Card className="border border-slate-200 shadow-sm bg-slate-800 text-white">
              <CardHeader>
                <CardTitle className="font-serif text-2xl text-center">Requisitos mínimos de colaboración</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {requisitos.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-slate-300 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-200 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Colaboradores en la red */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h3 className="font-serif text-3xl font-bold text-slate-900 mb-3">Colaboradores en la red</h3>
            <p className="text-slate-600">Profesionales verificados que forman parte de esta red</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {colaboradoresDestacados.map((colab) => (
              <Card key={colab.slug} className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden bg-white">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-slate-300 flex-shrink-0">
                      <img src={colab.profileImage} alt={colab.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-lg font-bold text-slate-900 truncate">{colab.name}</h4>
                        <Badge className="bg-slate-100 text-slate-700 text-xs flex-shrink-0">
                          <Shield className="w-3 h-3 mr-1" />
                          Verificado
                        </Badge>
                      </div>
                      <p className="text-slate-600 text-sm font-medium">{colab.specialty}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                        <span className="flex items-center"><Star className="w-3 h-3 text-yellow-500 mr-1" />{colab.rating}</span>
                        <span>{colab.totalProjects} proyectos</span>
                        <span>{colab.experience} años</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm mb-4">{colab.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">{colab.location}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-slate-300 text-slate-700 hover:bg-slate-100"
                      onClick={() => window.location.href = `/colaboradores/${colab.slug}`}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Ver Perfil
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA final */}
        <div className="max-w-3xl mx-auto">
          <Card className="bg-slate-900 text-white border-none shadow-xl">
            <CardContent className="p-10 text-center">
              <h3 className="font-serif text-2xl font-bold mb-3">Postular a la Red</h3>
              <p className="text-slate-300 mb-8 max-w-xl mx-auto text-sm leading-relaxed">
                Si trabaja en alguna de las áreas indicadas y le interesa participar en proyectos de vivienda con documentación y coordinación profesional, puede enviar su postulación.
              </p>

              <Button
                size="lg"
                className="bg-white text-slate-900 hover:bg-slate-100 font-semibold px-10 mb-8"
                onClick={() => window.location.href = '/contacto'}
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                Postular a la Red
              </Button>

              <div className="text-left max-w-md mx-auto">
                <p className="text-sm text-slate-400 mb-3 font-medium">Información solicitada:</p>
                <ul className="space-y-2">
                  {camposPostulacion.map((campo, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                      <ClipboardList className="w-4 h-4 flex-shrink-0 mt-0.5 text-slate-500" />
                      <span>{campo}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </section>
  );
}
