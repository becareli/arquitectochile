import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  DollarSign, 
  Clock, 
  TrendingUp, 
  Users, 
  MessageSquare, 
  CheckCircle, 
  Zap,
  FileText,
  Eye,
  Star
} from "lucide-react";
import arquitectoPhoto from "@assets/1651766771115_1753490676082.jpeg";

export default function ColaboradoresSection() {
  return (
    <section id="colaboradores" className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-dark mb-4">Para Colaboradores</h2>
          <p className="text-xl text-gray-600 mb-8">
            Únete a nuestra red de profesionales y transforma tu práctica arquitectónica
          </p>
          
          {/* Personal Message */}
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-8 mb-12">
            <div className="text-left">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-2 h-16 bg-green-600 rounded-full"></div>
                </div>
                <div>
                  <blockquote className="text-lg text-gray-700 italic mb-4">
                    "Hemos creado una plataforma donde la tecnología elimina las fricciones del trabajo colaborativo. 
                    Aquí, tu único foco es crear arquitectura excepcional mientras nosotros nos encargamos de los pagos 
                    seguros, la comunicación fluida y la gestión de proyectos. Es la evolución que nuestra industria necesitaba."
                  </blockquote>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-green-600">
                      <img 
                        src={arquitectoPhoto} 
                        alt="Patricio Becar Elissegaray"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-green-600">Patricio Becar Elissegaray</p>
                      <p className="text-sm text-gray-600">Fundador <span className="text-primary">ArquitectoChile</span><span className="text-gray-500">.com</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-xl">Acceso Seguro</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Ingreso protegido mediante autenticación Google o email. 
                Tu información y proyectos siempre seguros.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Ofertas Transparentes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Visualiza ofertas de proyectos y realiza propuestas competitivas. 
                Información clara de presupuestos y plazos.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-yellow-600" />
              </div>
              <CardTitle className="text-xl">Pagos Garantizados</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Sistema de pagos estructurado en 2-3 cuotas por proyecto. 
                Transparencia total en fechas y montos.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-red-600" />
              </div>
              <CardTitle className="text-xl">Gestión de Deadlines</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Alarmas automáticas por email y SMS. Sistema visual de 
                progreso para nunca perder un plazo importante.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <CardTitle className="text-xl">Línea de Progreso</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Barra visual de avance del proyecto. Siente cada hito 
                completado y mantén a todos informados del progreso.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-indigo-600" />
              </div>
              <CardTitle className="text-xl">Gestión de Archivos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Espacio dedicado para subir entregables. Versionado 
                automático y acceso controlado a documentos del proyecto.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Communication & Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <MessageSquare className="w-6 h-6 text-blue-600" />
                  <CardTitle className="text-xl">Comunicación Integrada</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Sistema de mensajería interno que elimina el caos del email. 
                  Toda la comunicación del proyecto centralizada en un solo lugar.
                </p>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-600">Sin emails perdidos</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-600">Historial completo</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-600">Notificaciones inteligentes</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Zap className="w-6 h-6 text-yellow-600" />
                  <CardTitle className="text-xl">Eficiencia Maximizada</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Propuesta Rápida</h4>
                      <p className="text-sm text-gray-600">Presenta tu oferta en minutos, no horas</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Ejecución Clara</h4>
                      <p className="text-sm text-gray-600">Herramientas que guían cada fase del proyecto</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-600 font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Pago Automático</h4>
                      <p className="text-sm text-gray-600">Cobros sin fricciones al completar hitos</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">150+</div>
            <p className="text-gray-600">Colaboradores Activos</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
            <p className="text-gray-600">Satisfacción en Pagos</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">4.9</div>
            <div className="flex items-center justify-center space-x-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-600">Calificación Promedio</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">24h</div>
            <p className="text-gray-600">Tiempo Respuesta</p>
          </div>
        </div>

        {/* Colaboradores Destacados */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-gray-900 mb-3">Colaboradores Destacados</h3>
            <p className="text-lg text-gray-600">Profesionales verificados que forman parte de nuestra red</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
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
            ].map((colab) => (
              <Card key={colab.slug} className="border-none shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-green-500 flex-shrink-0">
                      <img src={colab.profileImage} alt={colab.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-lg font-bold text-gray-900 truncate">{colab.name}</h4>
                        <Badge className="bg-green-100 text-green-800 text-xs flex-shrink-0">
                          <Shield className="w-3 h-3 mr-1" />
                          Verificado
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm font-medium">{colab.specialty}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                        <span className="flex items-center"><Star className="w-3 h-3 text-yellow-400 mr-1" />{colab.rating}</span>
                        <span>{colab.totalProjects} proyectos</span>
                        <span>{colab.experience} años</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{colab.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 flex items-center">
                      <Eye className="w-3 h-3 mr-1" />{colab.location}
                    </span>
                    <Button
                      size="sm"
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

        {/* CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">¿Listo para Potenciar tu Carrera?</h3>
            <p className="text-lg mb-6 opacity-90">
              Únete a la plataforma que está revolucionando cómo trabajan los arquitectos en Chile
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-green-600 hover:bg-gray-100 font-semibold"
                onClick={() => window.location.href = '/contacto'}
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Quiero ser Colaborador
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}