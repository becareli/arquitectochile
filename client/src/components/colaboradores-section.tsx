import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Shield,
  Users,
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

const especialidades = [
  "Cálculo estructural",
  "Mecánica de suelos",
  "Sanitario / alcantarillado / aguas lluvias (si aplica)",
  "Electricidad",
  "Gas (si aplica)",
  "Coordinación BIM",
  "Modelación BIM y documentación",
  "Otras especialidades según proyecto (climatización, eficiencia energética, etc.)"
];

const pasos = [
  {
    numero: "01",
    titulo: "Publicación del encargo",
    descripcion: "Se publica el alcance, antecedentes, entregables esperados, plazos y criterios de evaluación.",
    icon: FileText
  },
  {
    numero: "02",
    titulo: "Envío de cotización competitiva",
    descripcion: "Cada especialista presenta honorarios, plazo, alcance y condiciones para el encargo.",
    icon: Send
  },
  {
    numero: "03",
    titulo: "Selección",
    descripcion: "No solo precio: se evalúa ajuste técnico, claridad de propuesta, cumplimiento previo y plazos.",
    icon: Search
  },
  {
    numero: "04",
    titulo: "Retroalimentación",
    descripcion: "Retroalimentación breve al cierre para mejorar futuras cotizaciones, cuando corresponda.",
    icon: MessageSquare
  }
];

const estandares = [
  "Comunicación clara y tiempos de respuesta razonables",
  "Orden documental y control de versiones",
  "Entregables completos (planos, memorias, especificaciones según aplique)",
  "Cumplimiento de plazos por hitos"
];

const camposPostulacion = [
  "Especialidad principal",
  "Cobertura geográfica",
  "Experiencia y certificaciones relevantes",
  "Portafolio o trabajos anteriores (link)",
  "Software que maneja",
  "Modalidad: solo proyecto / también ejecución",
  "Disponibilidad y plazo típico de entrega"
];

const colaboradoresDestacados = [
  {
    slug: "carlos-rodriguez",
    name: "Carlos Rodríguez",
    specialty: "Arquitecto",
    experience: 8,
    location: "Santiago, Chile",
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
    location: "Viña del Mar, Chile",
    rating: 4.9,
    totalProjects: 45,
    profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face",
    description: "Más de 12 años en cálculo y diseño de estructuras residenciales y comerciales. Especialista en reforzamiento sísmico."
  }
];

export default function ColaboradoresSection() {
  return (
    <section id="colaboradores" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Hero */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Red de Especialistas — Vivienda Premium (Chile)
          </h2>
          <p className="text-lg text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Busco proyectistas, coordinadores BIM, profesionales e instaladores para desarrollar especialidades y apoyar la ejecución de proyectos residenciales de alto estándar. Principalmente Santiago y también regiones.
          </p>
        </div>

        {/* Mensaje personal */}
        <div className="max-w-4xl mx-auto mb-20">
          <Card className="border border-slate-200 shadow-md">
            <CardContent className="p-8">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0">
                  <div className="w-2 h-full min-h-[80px] bg-slate-700 rounded-full" />
                </div>
                <div>
                  <p className="text-slate-700 text-lg leading-relaxed mb-4">
                    Estoy formando una red de especialistas con quienes entregar proyectos de vivienda con estándar alto, documentación ordenada y coordinación profesional. 
                    La idea es trabajar con profesionales que valoren la claridad en los encargos, el cumplimiento de plazos y la calidad técnica de los entregables. 
                    Si te interesa participar en proyectos residenciales bien estructurados, esta red es para ti.
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-slate-400">
                      <img
                        src={arquitectoPhoto}
                        alt="Patricio Becar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">— Patricio Becar, Arquitecto (ArquitectoChile)</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Especialidades que busco */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h3 className="font-serif text-3xl font-bold text-slate-900 mb-3">Especialidades que busco</h3>
            <p className="text-slate-600">Profesionales y proyectistas en las siguientes áreas</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {especialidades.map((esp, i) => (
              <div key={i} className="flex items-start gap-3 bg-white border border-slate-200 rounded-lg p-4">
                <CheckCircle className="w-5 h-5 text-slate-700 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700 leading-snug">{esp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cómo funciona */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h3 className="font-serif text-3xl font-bold text-slate-900 mb-3">Cómo funciona</h3>
            <p className="text-slate-600">Proceso de cotización competitiva en 4 pasos</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {pasos.map((paso) => {
              const Icon = paso.icon;
              return (
                <Card key={paso.numero} className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-slate-800 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                        {paso.numero}
                      </div>
                      <Icon className="w-5 h-5 text-slate-500" />
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

        {/* Estándares mínimos */}
        <div className="mb-20">
          <div className="max-w-3xl mx-auto">
            <Card className="border border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="font-serif text-2xl text-slate-900 text-center">Estándares mínimos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {estandares.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-slate-700 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700 text-sm">{item}</span>
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
            <p className="text-slate-600">Profesionales verificados que forman parte de nuestra red</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {colaboradoresDestacados.map((colab) => (
              <Card key={colab.slug} className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-slate-400 flex-shrink-0">
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
              <h3 className="font-serif text-2xl font-bold mb-3">Postular a la Red de Especialistas</h3>
              <p className="text-slate-300 mb-8 max-w-xl mx-auto">
                Si trabajas en alguna de las especialidades listadas y te interesa participar en proyectos de vivienda premium, completa tu postulación.
              </p>

              <Button
                size="lg"
                className="bg-white text-slate-900 hover:bg-slate-100 font-semibold px-10 mb-8"
                onClick={() => window.location.href = '/contacto'}
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                Postular a la Red de Especialistas
              </Button>

              <div className="text-left max-w-md mx-auto">
                <p className="text-sm text-slate-400 mb-3 font-medium">Datos que te pediremos:</p>
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
