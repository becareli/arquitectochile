import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Shield, Clock, Phone, Mail, MapPin, Youtube, Award, FileCheck, Users, Zap, Star } from "lucide-react";
import Chatbot from "@/components/chatbot";
import Navigation from "@/components/navigation";
import { useEffect } from "react";

export default function RevisorIndependienteDeArquitectura() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contacto-revisor');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openWhatsApp = () => {
    window.open('https://api.whatsapp.com/send?phone=56979316827&text=Hola,%20necesito%20revisor%20independiente%20para%20mi%20proyecto', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary">
      <Navigation />
      
      {/* Hero Section */}
      <section className="text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <Shield className="w-20 h-20 text-accent" />
              <Star className="w-8 h-8 text-yellow-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 fill-current" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              REVISOR INDEPENDIENTE DE OBRAS DE CONSTRUCCIÓN
            </h1>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-6">
              <p className="text-2xl font-bold">Certificación MINVU - ROL 00237-13</p>
              <p className="text-lg opacity-90">Registro Nacional MINVU N° 369500 - Vigente</p>
            </div>
          </div>
          
          <div className="bg-red-600 text-white px-6 py-3 rounded-lg mb-8 inline-block animate-pulse">
            <p className="font-bold">
              🔥 EVITA RECHAZOS COSTOSOS - Revisión previa garantizada
            </p>
          </div>

          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Arquitecto Patricio Eduardo Becar Elissegaray - Universidad de Chile 1999 | 26+ años de experiencia
          </p>

          {/* Video Section */}
          <div className="mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">🎥 Conoce el Proceso Completo</h3>
              <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
                <iframe
                  src="https://www.youtube.com/embed/tYZlUAyxvuA?start=1"
                  title="Revisor Independiente de Arquitectura - Proceso Completo"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <p className="text-center mt-4 text-lg opacity-90">
                Arquitecto Patricio Becar explica el proceso y beneficios del Informe Favorable
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={openWhatsApp}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-bold"
            >
              <Phone className="w-5 h-5 mr-2" />
              WhatsApp +56 9 7931 6827
            </Button>
            <Button 
              onClick={scrollToContact}
              className="bg-accent hover:bg-yellow-600 text-black px-8 py-4 text-lg font-bold"
            >
              Cotizar Mi Proyecto
            </Button>
          </div>
        </div>
      </section>

      {/* ¿Qué es un Revisor Independiente? */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-dark mb-6">¿QUÉ ES UN REVISOR INDEPENDIENTE?</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Soy un profesional <strong>certificado oficialmente por el Ministerio de Vivienda y Urbanismo (MINVU)</strong> para verificar que tu proyecto de construcción cumpla con <strong>todas las normativas legales vigentes</strong> antes de obtener los permisos municipales.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center border-2 border-primary">
              <CardHeader>
                <Award className="w-12 h-12 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">ROL N° 00237-13</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Registro Nacional MINVU</p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-primary">
              <CardHeader>
                <FileCheck className="w-12 h-12 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Certificado N° 369500</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Vigente renovable</p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-primary">
              <CardHeader>
                <Shield className="w-12 h-12 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Ley N° 20.071</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Autorizado por Estado de Chile</p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-primary">
              <CardHeader>
                <Users className="w-12 h-12 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">26+ Años</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Universidad de Chile 1999</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ¿Por qué es CRÍTICO contratar un Revisor Independiente? */}
      <section className="py-16 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-dark mb-6">
              ⚠️ ANTES de Ingresar tu Permiso de Edificación...
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              <strong>¿Sabías que 7 de cada 10 solicitudes de permisos son rechazadas</strong> por errores que podrían haberse evitado? 
              <span className="text-red-600 font-bold"> No arriesgues tu inversión</span> al azar.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-dark mb-6 text-center">
              🎯 La ÚNICA Forma de Garantizar Aprobación al 100%
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-bold text-primary mb-4">❌ SIN Revisor Independiente:</h4>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-red-500 font-bold mr-2">•</span>
                    <span>Revisión puede tomar hasta <strong>60 días</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 font-bold mr-2">•</span>
                    <span>Alto riesgo de <strong>rechazo por errores</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 font-bold mr-2">•</span>
                    <span>Pagas el <strong>100% de derechos municipales</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 font-bold mr-2">•</span>
                    <span>Estrés e incertidumbre constante</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-xl font-bold text-green-600 mb-4">✅ CON Revisor Independiente:</h4>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-500 font-bold mr-2">•</span>
                    <span>Revisión garantizada en solo <strong>15 días</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 font-bold mr-2">•</span>
                    <span><strong>IMPOSIBLE que rechacen</strong> tu solicitud</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 font-bold mr-2">•</span>
                    <span><strong>30% de descuento</strong> en derechos municipales</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 font-bold mr-2">•</span>
                    <span>Tranquilidad total y proceso expedito</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-black mb-4">
              💡 RESPALDO LEGAL GARANTIZADO
            </h3>
            <p className="text-lg text-black font-medium mb-6">
              "No podrá rechazarse el ingreso de una solicitud, si ésta cuenta con informe favorable 
              de un Revisor Independiente de Arquitectura" - <strong>Ley General de Urbanismo y Construcciones</strong>
            </p>
            <div className="bg-black/20 rounded-lg p-4">
              <p className="text-sm font-bold text-black">
                📋 ARTÍCULO 5.1.8. OGUC | 🏛️ DECRETO SUPREMO N° 177 | ⚖️ LEY N° 20.071
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-dark mb-6">¿PARA QUÉ SIRVE LA REVISIÓN INDEPENDIENTE?</h2>
            <p className="text-xl text-gray-600">ANTES del permiso municipal detectamos todos los errores</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-dark mb-6">✅ LO QUE REVISAMOS:</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                  <span>Detectamos errores que <strong>rechazan</strong> tu permiso</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                  <span>Verificamos cumplimiento de <strong>normativas vigentes</strong></span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                  <span>Revisamos <strong>distanciamientos y alturas</strong> permitidas</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                  <span>Validamos <strong>superficie construida</strong> vs terreno</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                  <span>Chequeamos <strong>estacionamientos</strong> requeridos</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-dark mb-6">🎯 BENEFICIOS GARANTIZADOS:</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Zap className="w-6 h-6 text-blue-600 mr-3" />
                  <span><strong>Aprobación más rápida</strong> en la municipalidad</span>
                </div>
                <div className="flex items-center">
                  <Zap className="w-6 h-6 text-blue-600 mr-3" />
                  <span><strong>Evitas rechazos costosos</strong> y re-trámites</span>
                </div>
                <div className="flex items-center">
                  <Zap className="w-6 h-6 text-blue-600 mr-3" />
                  <span><strong>Cumplimiento legal garantizado</strong></span>
                </div>
                <div className="flex items-center">
                  <Zap className="w-6 h-6 text-blue-600 mr-3" />
                  <span><strong>Tranquilidad total</strong> durante construcción</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proyectos que reviso */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-dark mb-6">PROYECTOS QUE REVISO</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-dark mb-6">🏠 ESPECIALIZACIÓN EN:</h3>
              <div className="space-y-3">
                <p className="text-lg">🏠 <strong>Casas unifamiliares</strong> y ampliaciones</p>
                <p className="text-lg">🏢 <strong>Proyectos residenciales</strong></p>
                <p className="text-lg">🏬 <strong>Locales comerciales</strong></p>
                <p className="text-lg">🏭 <strong>Oficinas y consultorios</strong></p>
                <p className="text-lg">🏘️ <strong>Condominios de casas</strong></p>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-dark mb-6">📋 DOCUMENTOS QUE REVISO:</h3>
              <div className="space-y-3">
                <p className="text-lg">✅ Planos de arquitectura</p>
                <p className="text-lg">✅ Planos estructurales</p>
                <p className="text-lg">✅ Instalaciones (agua, luz, gas)</p>
                <p className="text-lg">✅ Memoria de cálculo</p>
                <p className="text-lg">✅ Especificaciones técnicas</p>
                <p className="text-lg">✅ Cumplimiento OGUC</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFICIOS ECONÓMICOS ESPECÍFICOS */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-dark mb-6">
              💰 BENEFICIOS ECONÓMICOS REALES
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto">
              <strong>Tu inversión en Revisor Independiente se recupera automáticamente</strong> con estos beneficios garantizados por ley
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center border-t-4 border-green-500">
              <div className="text-4xl font-bold text-green-600 mb-4">30%</div>
              <h3 className="text-xl font-bold mb-4">DESCUENTO AUTOMÁTICO</h3>
              <p className="text-gray-700">
                <strong>30% de descuento</strong> en derechos municipales garantizado por OGUC Art. 5.1.14
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 text-center border-t-4 border-blue-500">
              <div className="text-4xl font-bold text-blue-600 mb-4">15</div>
              <h3 className="text-xl font-bold mb-4">DÍAS MÁXIMO</h3>
              <p className="text-gray-700">
                <strong>15 días máximo</strong> de revisión vs 30-60 días normales. <strong>4x más rápido</strong>
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 text-center border-t-4 border-yellow-500">
              <div className="text-4xl font-bold text-yellow-600 mb-4">0%</div>
              <h3 className="text-xl font-bold mb-4">RIESGO DE RECHAZO</h3>
              <p className="text-gray-700">
                <strong>Imposible rechazar</strong> solicitud con Informe Favorable por ley
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-center mb-6">
              💡 ¿POR QUÉ NECESITAS un REVISOR INDEPENDIENTE DE ARQUITECTURA?
            </h3>
            
            <div className="bg-gradient-to-r from-blue-100 to-green-100 rounded-lg p-6 mb-6">
              <p className="text-lg leading-relaxed text-gray-800">
                <strong>Antes de conseguir un Permiso de Edificación en Chile</strong>, es recomendable revisar con calma cada componente 
                de tu solicitud. <span className="text-primary font-bold">Lo ideal es ingresar un expediente al Municipio con la CERTEZA 
                de que será aprobado</span> por la Dirección de Obras.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-bold text-primary mb-4">📋 MI APORTE TÉCNICO:</h4>
                <ul className="space-y-3 text-gray-700">
                  <li>• <strong>Confecciono Informe Favorable</strong> - documento legal que respalda tu expediente</li>
                  <li>• <strong>Hago más ágil la revisión</strong> de tu Permiso de Edificación en la Municipalidad</li>
                  <li>• <strong>Optimizo documentos e implantación</strong> para que se ingresen con información correcta</li>
                  <li>• <strong>Garantizo cumplimiento normativo</strong> con 26+ años de experiencia</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-xl font-bold text-green-600 mb-4">⚖️ BENEFICIOS LEGALES GARANTIZADOS:</h4>
                <ul className="space-y-3 text-gray-700">
                  <li>• <strong>NO PUEDE rechazarse</strong> el ingreso si cuenta con Informe Favorable</li>
                  <li>• <strong>Plazo reducido a 15 días</strong> para pronunciarse (vs 30 días normales)</li>
                  <li>• <strong>30% de rebaja</strong> en derechos municipales automática</li>
                  <li>• <strong>Respaldo legal total</strong> durante todo el proceso</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-lg p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">
              🚨 Si deseas que tu Permiso de Edificación tenga ÉXITO...
            </h3>
            <p className="text-xl font-medium mb-6">
              <strong>CONTRATA los servicios para confeccionar tu Informe Favorable de REVISOR INDEPENDIENTE DE ARQUITECTURA</strong>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={openWhatsApp}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-bold"
              >
                <Phone className="w-5 h-5 mr-2" />
                WhatsApp +56 9 7931 6827
              </Button>
              <Button 
                onClick={scrollToContact}
                className="bg-white hover:bg-gray-100 text-black px-8 py-4 text-lg font-bold"
              >
                Cotizar Mi Proyecto
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Video */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-dark mb-6">🎬 CONTRATA MI SERVICIO DE REVISOR INDEPENDIENTE</h2>
          <p className="text-xl text-gray-600 mb-4">Mira cómo trabajo y por qué soy tu mejor opción</p>
          <p className="text-lg font-bold text-primary mb-8">⚡ Evita rechazos costosos - Aprobación garantizada</p>
          
          <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
            <div className="aspect-video w-full mb-4 rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/tYZlUAyxvuA?autoplay=0&rel=0&modestbranding=1"
                title="Revisor Independiente Arquitectura en Santiago - Patricio Becar"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>

          </div>



          <div className="bg-primary text-white rounded-xl p-6">
            <h4 className="text-xl font-bold mb-4">💡 ¿POR QUÉ CONTRATAR AHORA?</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-accent">26+</div>
                <div className="text-sm">Años de Experiencia</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">ROL 00237-13</div>
                <div className="text-sm">Certificación MINVU</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">100%</div>
                <div className="text-sm">Proyectos Aprobados</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-dark mb-6">¿CÓMO TRABAJAMOS?</h2>
            <p className="text-xl text-gray-600">PROCESO PASO A PASO</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-2 text-xl font-bold">1</div>
                <CardTitle className="text-lg">ENVÍAS TUS PLANOS</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">WhatsApp o email</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-2 text-xl font-bold">2</div>
                <CardTitle className="text-lg">REVISIÓN COMPLETA</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">2-5 días hábiles</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-2 text-xl font-bold">3</div>
                <CardTitle className="text-lg">INFORME OFICIAL</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Con observaciones</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-2 text-xl font-bold">4</div>
                <CardTitle className="text-lg">CORRECCIONES</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Si es necesario</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-2 text-xl font-bold">5</div>
                <CardTitle className="text-lg">CERTIFICADO FINAL</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Listo para municipalidad</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <div className="bg-primary text-white rounded-xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">INVERSIÓN:</h3>
              <p className="text-3xl font-bold text-accent mb-2">Desde $150.000</p>
              <p className="text-lg opacity-90 mb-4">(varía según complejidad)</p>
              <div className="flex justify-center items-center space-x-8">
                <div className="flex items-center">
                  <Clock className="w-6 h-6 mr-2" />
                  <span>Entrega: 3-7 días hábiles</span>
                </div>
                <div className="flex items-center">
                  <FileCheck className="w-6 h-6 mr-2" />
                  <span>Informe oficial MINVU incluido</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ¿Por qué elegir mi servicio? */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-dark mb-6">¿POR QUÉ ELEGIR MI SERVICIO?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6">
              <h3 className="text-2xl font-bold text-dark mb-6">🏆 EXPERIENCIA COMPROBADA:</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                  <span><strong>26+ años</strong> diseñando y construyendo</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                  <span><strong>Cientos de proyectos</strong> aprobados</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                  <span><strong>Conocimiento profundo</strong> de normativas municipales</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                  <span><strong>Relación directa</strong> con Direcciones de Obras</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-2xl font-bold text-dark mb-6">🛡️ GARANTÍA DE SERVICIO:</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-blue-600 mr-3" />
                  <span><strong>Re-revisión gratuita</strong> si hay observaciones menores</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-blue-600 mr-3" />
                  <span><strong>Asesoría telefónica</strong> durante el trámite municipal</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-blue-600 mr-3" />
                  <span><strong>Respuesta rápida</strong> a consultas</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-blue-600 mr-3" />
                  <span><strong>Profesionalismo certificado</strong> por MINVU</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto-revisor" className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-8">CONTACTO INMEDIATO</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardHeader>
                <Phone className="w-12 h-12 mx-auto mb-4" />
                <CardTitle>WhatsApp Directo</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold mb-2">+56 9 7931 6827</p>
                <Button 
                  onClick={openWhatsApp}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Enviar Mensaje
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardHeader>
                <Mail className="w-12 h-12 mx-auto mb-4" />
                <CardTitle>Email Profesional</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-bold mb-2">contacto@arquitectochile.com</p>
                <p className="text-sm opacity-90">Adjunta tus planos para cotización inmediata</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardHeader>
                <MapPin className="w-12 h-12 mx-auto mb-4" />
                <CardTitle>Oficina Santiago</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Vicuña Mackenna Poniente 7735</p>
                <p className="text-sm">Depto 306, Torre B</p>
                <p className="text-sm">La Florida - Santiago</p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4">💡 ¿Tu proyecto necesita aprobación municipal?</h3>
            <p className="text-xl mb-6">No arriesgues rechazos costosos.</p>
            <p className="text-lg mb-8">Contacta al único Revisor Independiente certificado con 26+ años de experiencia en Santiago.</p>
            
            <Button 
              onClick={openWhatsApp}
              className="bg-accent hover:bg-yellow-600 text-black px-8 py-4 text-lg font-bold"
            >
              Solicitar Revisión Ahora
            </Button>
          </div>
        </div>
      </section>

      {/* Marco Legal */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-6">⚖️ MARCO LEGAL DE RESPALDO</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="font-bold">Ley N° 20.071</p>
                <p className="text-sm opacity-75">Registro Nacional de Revisores</p>
              </div>
              <div className="text-center">
                <p className="font-bold">D.F.L. N° 458</p>
                <p className="text-sm opacity-75">Ley General Urbanismo y Construcciones</p>
              </div>
              <div className="text-center">
                <p className="font-bold">Decreto Supremo N° 177</p>
                <p className="text-sm opacity-75">Reglamento LGUC</p>
              </div>
              <div className="text-center">
                <p className="font-bold">Certificación MINVU</p>
                <p className="text-sm opacity-75">Renovada y vigente</p>
              </div>
            </div>
          </div>

          <div className="text-center border-t border-gray-700 pt-8">
            <p className="text-lg font-bold">Patricio Eduardo Becar Elissegaray - Arquitecto Universidad de Chile</p>
            <p className="text-sm opacity-75">ROL MINVU 00237-13 | Certificado N° 369500</p>
            <p className="text-sm opacity-75">www.ArquitectoChile.com</p>
          </div>
        </div>
      </section>
      <Chatbot />
    </div>
  );
}