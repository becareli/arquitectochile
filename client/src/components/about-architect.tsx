import { ExternalLink, Award, Building2, Users, Calendar, Shield, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import arquitectoPhoto from "@assets/1651766771115_1753490676082.jpeg";

export default function AboutArchitect() {
  return (
    <section id="arquitecto" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-dark mb-4">Sobre el Arquitecto</h2>
          <p className="text-xl text-gray-600 mb-8">Experiencia y credenciales profesionales que avalan nuestro trabajo</p>
          
          {/* Personal Message */}
          <div className="max-w-4xl mx-auto bg-gray-100 rounded-2xl p-8 mb-8">
            <div className="text-left">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-2 h-16 bg-primary rounded-full"></div>
                </div>
                <div>
                  <blockquote className="text-lg text-gray-700 italic mb-4">
                    "Con más de 25 años de experiencia como Arquitecto MBA y Revisor Independiente de 
                    Arquitectura acreditado por el MINVU (3° Categoría), he desarrollado una visión 
                    integral de la industria de la construcción. Mi objetivo es ofrecer un enfoque de 
                    revisión exhaustivo y eficiente, garantizando el cumplimiento normativo y la 
                    excelencia en cada proyecto arquitectónico."
                  </blockquote>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary">
                      <img 
                        src={arquitectoPhoto} 
                        alt="Patricio Becar Elissegaray"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-primary">Patricio Eduardo Becar Elissegaray</p>
                      <p className="text-sm text-gray-600">Arquitecto MBA Universidad de Chile desde 1999</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Professional Photo and Contact */}
          <div className="text-center lg:text-left">
            <div className="w-48 h-48 mx-auto lg:mx-0 mb-6 rounded-full overflow-hidden border-4 border-white shadow-xl">
              <img 
                src={arquitectoPhoto} 
                alt="Patricio Becar Elissegaray - Arquitecto Universidad de Chile"
                className="w-full h-full object-cover"
              />
            </div>
            
            <h3 className="text-2xl font-bold text-dark mb-2">Patricio Eduardo Becar Elissegaray</h3>
            <p className="text-lg text-gray-600 mb-2">Arquitecto Revisor Independiente de Arquitectura</p>
            <p className="text-sm text-gray-500 mb-6">Universidad de Chile desde 1999 • MBA • +25 años de experiencia</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                className="bg-[#0f172a] text-white hover:bg-[#0f172a]/90 rounded-lg transition-colors"
                onClick={() => window.open('https://www.linkedin.com/in/patriciobecar/', '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Ver Perfil en LinkedIn
              </Button>
              <Button 
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-white rounded-lg transition-colors"
              >
                📞 +56 9 7931 6827
              </Button>
            </div>
          </div>
          
          {/* Professional Summary */}
          <div className="space-y-6">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-primary">
                  <Award className="w-5 h-5 mr-2" />
                  Credenciales Profesionales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-[#0f172a] mt-1" />
                    <div>
                      <p className="font-semibold text-dark">Arquitecto Universidad de Chile</p>
                      <p className="text-gray-600">Titulado con distinción en 1999 • MBA Universidad de Chile (2008-2009) • Global MBA University of Macquarie, Australia (2009)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-[#0f172a] mt-1" />
                    <div>
                      <p className="font-semibold text-dark">Arquitecto Revisor Independiente</p>
                      <p className="text-gray-600">Reconocido por el MINVU • Especialista en normativas DFL2 y OGUC</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Users className="w-5 h-5 text-[#64748b] mt-1" />
                    <div>
                      <p className="font-semibold text-dark">Especialista en Inteligencia Artificial y Automatizaciones</p>
                      <p className="text-gray-600">Experto en software N8N/MAKE • Automatización de procesos • Vibecoding: Lovable-Replit</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Building2 className="w-5 h-5 text-[#f97316] mt-1" />
                    <div>
                      <p className="font-semibold text-dark">Experto en Regularización de Inmuebles</p>
                      <p className="text-gray-600">Especialista en Ley del Mono - Permiso + Recepción simultáneos</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-primary">
                  <Building2 className="w-5 h-5 mr-2" />
                  Áreas de Especialización
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-gray-700">Ampliaciones de Vivienda</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-gray-700">Remodelaciones Integrales</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-gray-700">Regularización de Inmuebles (Ley del Mono)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-gray-700">Permisos de Edificación</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-gray-700">Estudios de Cabida</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-gray-700">Recepción Final</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-gray-700">Tasación de Inmuebles Urbanos</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-gray-700">Reacondicionamiento Térmico de Viviendas</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-gray-700">Automatizaciones con IA</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-gray-700">Software BIM (ARCHICAD, NAVISWORK)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-primary text-white">
              <CardContent className="pt-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">25+</div>
                    <div className="text-sm opacity-90">Años de Experiencia</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">500+</div>
                    <div className="text-sm opacity-90">Proyectos Completados</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">4.9★</div>
                    <div className="text-sm opacity-90">Rating Google Maps</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}