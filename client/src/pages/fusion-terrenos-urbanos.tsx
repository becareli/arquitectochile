import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, TrendingUp, Building2, MapPin, Clock, Shield, ArrowRight, Play, DollarSign, Calculator, FileText, Star } from "lucide-react";
import Footer from "@/components/footer";
import Chatbot from "@/components/chatbot";
import Navigation from "@/components/navigation";
import { useEffect } from "react";
import fusionTerrenosImg from "@assets/fusion-terrenos2.png";
import leyFusionImg from "@assets/ley-fusion.png";
import fusionPredialImg from "@assets/fusion-predial2.png";
import comoHacerFusionImg from "@assets/como-hacer-fusion-terreno2.png";

export default function FusionTerrenosUrbanos() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleContactClick = () => {
    const message = "Hola Patricio, me interesa el servicio de Fusión de Terrenos Urbanos. ¿Podrías darme más información sobre cómo aumentar el valor de mi propiedad?";
    const whatsappUrl = `https://wa.me/56979316827?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleVideoClick = () => {
    window.open('https://www.youtube.com/watch?v=TLbEa1Tcrw8&t=2s', '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section con Video */}
      <section className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header con badge */}
          <div className="text-center mb-8">
            <Badge className="bg-red-600 text-white mb-4 text-sm font-bold px-4 py-2">
              🔥 BENEFICIO EXCLUSIVO LEY ART. 63
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Aumenta <span className="text-emerald-300">INSTANTÁNEAMENTE</span> el Valor de tu Propiedad
            </h1>
            
            <h2 className="text-xl md:text-2xl lg:text-3xl mb-8 text-emerald-100">
              Hasta <strong>30% más</strong> capacidad de construcción <em>garantizado por ley</em>
            </h2>
          </div>

          {/* Video Principal - Centrado y Prominente */}
          <div className="mb-12">
            <div className="max-w-4xl mx-auto">
              <div className="relative bg-black rounded-2xl shadow-2xl overflow-hidden">
                <div className="aspect-video">
                  <iframe
                    src="https://www.youtube.com/embed/TLbEa1Tcrw8?autoplay=0&rel=0&modestbranding=1"
                    title="Fusión de Terrenos: Cómo aumentar el valor de tu propiedad"
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <div className="absolute bottom-4 left-4 bg-emerald-600/90 text-white px-3 py-1 rounded text-sm font-semibold">
                  ▶ Patricio Becar explica el proceso completo
                </div>
              </div>
            </div>
          </div>

          {/* Grid de beneficios y pricing */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-center lg:text-left">¿Por qué la Fusión de Terrenos?</h3>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-emerald-300 flex-shrink-0" />
                  <span className="text-lg">Proceso respaldado por <strong>Ley General de Urbanismo</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-6 w-6 text-emerald-300 flex-shrink-0" />
                  <span className="text-lg">Aumento <strong>automático</strong> del valor comercial</span>
                </div>
                <div className="flex items-center gap-3">
                  <Building2 className="h-6 w-6 text-emerald-300 flex-shrink-0" />
                  <span className="text-lg">Permite proyectos de <strong>mayor envergadura</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-emerald-300 flex-shrink-0" />
                  <span className="text-lg">Acceso desde <strong>múltiples calles</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-emerald-300 flex-shrink-0" />
                  <span className="text-lg">26+ años de experiencia en fusiones exitosas</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-emerald-300">$890.000</div>
                  <div className="text-lg text-emerald-100">Inversión inicial</div>
                  <div className="text-sm text-emerald-200">Retorno promedio: 300%-500%</div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center py-3 border-b border-white/20">
                    <span>Evaluación inicial</span>
                    <span className="text-emerald-300 font-semibold">GRATIS</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/20">
                    <span>Plano de fusión</span>
                    <span className="text-emerald-300 font-semibold">Incluido</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/20">
                    <span>Gestión completa</span>
                    <span className="text-emerald-300 font-semibold">DOM→SII→CBR</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span>Tiempo estimado</span>
                    <span className="text-emerald-300 font-semibold">45-60 días</span>
                  </div>
                </div>

                <Button 
                  onClick={handleContactClick}
                  size="lg" 
                  className="w-full bg-emerald-500 text-white hover:bg-emerald-400 text-xl py-4"
                >
                  <DollarSign className="mr-2 h-6 w-6" />
                  Evaluar Mi Terreno GRATIS
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problema - Pain Point */}
      <section className="py-16 bg-red-50 border-l-8 border-red-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-red-800 mb-6 text-center">
            ¿Tu Terreno Está Desperdiciando Su Verdadero Potencial?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-4">😤</div>
              <h3 className="font-bold text-red-700 mb-2">Terreno Pequeño</h3>
              <p className="text-red-600">No puedes construir el proyecto que realmente quieres</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💸</div>
              <h3 className="font-bold text-red-700 mb-2">Valor Estancado</h3>
              <p className="text-red-600">Tu propiedad no aumenta de valor como debería</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🚫</div>
              <h3 className="font-bold text-red-700 mb-2">Acceso Limitado</h3>
              <p className="text-red-600">Solo tienes entrada por una calle o avenida</p>
            </div>
          </div>
        </div>
      </section>

      {/* Qué es la Fusión de Terrenos */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">¿Qué es la Fusión de Terrenos?</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              La Fusión de terrenos o Fusión Predial consiste en la <strong>unión de dos o más lotes colindantes</strong> 
              generándose un predio de mayor tamaño. El resultado es que a partir de los lotes originales 
              se genera <strong>un solo lote, una sola propiedad</strong>.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <img 
                src={fusionTerrenosImg} 
                alt="Ejemplo visual de Fusión de Terrenos" 
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            
            <div className="space-y-6">
              <div className="bg-emerald-50 p-6 rounded-lg border-l-4 border-emerald-500">
                <h3 className="text-xl font-bold text-emerald-800 mb-3">Requisito Fundamental:</h3>
                <p className="text-emerald-700">
                  Todas las propiedades deben ser de dominio de <strong>un mismo propietario</strong>, 
                  o de un grupo de propietarios (personas naturales, jurídicas, o sucesiones).
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Lotes Colindantes</h4>
                    <p className="text-gray-600">Los terrenos deben estar uno al lado del otro</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Mismo Propietario</h4>
                    <p className="text-gray-600">Una persona natural, jurídica o sucesión</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Resultado: Un Solo Lote</h4>
                    <p className="text-gray-600">Mayor tamaño, más oportunidades</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cuándo Conviene vs NO Conviene */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">¿Cuándo Conviene Fusionar Terrenos?</h2>
            <p className="text-xl text-gray-600">Conoce exactamente cuándo es rentable y cuándo NO debes hacerlo</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Cuándo SÍ conviene */}
            <div className="bg-emerald-50 p-8 rounded-xl border-2 border-emerald-200">
              <h3 className="text-2xl font-bold text-emerald-800 mb-6 text-center">✅ SÍ Conviene Fusionar</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-emerald-800">DIMENSIÓN</h4>
                    <p className="text-emerald-700">Si desea construir una edificación de mayor tamaño que no cabe en uno de los lotes iniciales.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-emerald-800">ACCESIBILIDAD</h4>
                    <p className="text-emerald-700">Si desea generar un nuevo acceso al terreno desde otra avenida, calle o pasaje.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-emerald-800">VALOR DE MERCADO</h4>
                    <p className="text-emerald-700">Si desea aumentar automáticamente el valor comercial de su terreno.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cuándo NO conviene */}
            <div className="bg-red-50 p-8 rounded-xl border-2 border-red-200">
              <h3 className="text-2xl font-bold text-red-800 mb-6 text-center">❌ NO Conviene Fusionar</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-red-800">DIFERENTES DESTINOS</h4>
                    <p className="text-red-700">Terreno Comercial + Habitacional = contribuciones aumentan al destino más caro (Comercial).</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-red-800">DISTINTA URBANIZACIÓN</h4>
                    <p className="text-red-700">Fusionar terreno con urbanización completa + terreno con urbanización deficiente = tendrá que pagar toda la urbanización.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-red-800">NO HAY FUSIONES TRANSITORIAS</h4>
                    <p className="text-red-700">Si se arrepiente, es muy difícil volver a subdividir. Es más fácil fusionar que subdividir.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solución - El Secreto de la Ley */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-emerald-600 text-white mb-4 text-lg px-6 py-3">
              EL SECRETO QUE LAS INMOBILIARIAS NO QUIEREN QUE SEPAS
            </Badge>
            <h2 className="text-4xl font-bold mb-6">
              El Artículo 63: Tu <span className="text-emerald-600">Arma Secreta Legal</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              La Ley General de Urbanismo de Chile PREMIA la fusión de terrenos con 30% más capacidad de construcción. 
              Esto significa más departamentos, más ingresos, más valor.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src={leyFusionImg} 
                alt="Ley de Fusión de Terrenos" 
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            
            <div className="space-y-6">
              <div className="bg-emerald-50 p-6 rounded-lg border-l-4 border-emerald-500">
                <h3 className="text-xl font-bold text-emerald-800 mb-3">Ejemplo Real:</h3>
                <p className="text-emerald-700">
                  <strong>Antes:</strong> 3 terrenos de 250m² = 3 casas (420m² construidos)<br/>
                  <strong>Después:</strong> 1 terreno de 750m² = 15 departamentos (1,350m² construidos)<br/>
                  <strong>Resultado:</strong> 322% más superficie vendible
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calculator className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Aumento Automático de Valor</h4>
                    <p className="text-gray-600">Mayor capacidad = mayor valor comercial inmediato</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Building2 className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">30% Más Construcción</h4>
                    <p className="text-gray-600">Beneficio garantizado por ley, no es negociable</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Accesos Múltiples</h4>
                    <p className="text-gray-600">Entrada desde diferentes calles o avenidas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proceso y Beneficios */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-green-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Proceso Garantizado en 3 Etapas</h2>
            <p className="text-xl text-gray-600">26+ años perfeccionando este sistema</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="border-2 border-emerald-200 shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                <CardTitle className="text-emerald-800">Municipalidad</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm font-semibold">✅ Plano de Fusión</p>
                  <p className="text-sm font-semibold">✅ Resolución de Fusión</p>
                  <p className="text-sm font-semibold">✅ Autorización DOM</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-emerald-200 shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                <CardTitle className="text-emerald-800">Servicio SII</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm font-semibold">✅ Nuevo ROL único</p>
                  <p className="text-sm font-semibold">✅ Eliminación ROLs antiguos</p>
                  <p className="text-sm font-semibold">✅ Actualización catastral</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-emerald-200 shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                <CardTitle className="text-emerald-800">Conservador</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm font-semibold">✅ Inscripción definitiva</p>
                  <p className="text-sm font-semibold">✅ Título de dominio</p>
                  <p className="text-sm font-semibold">✅ Habilitación para venta</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <div className="max-w-5xl mx-auto">
              <img 
                src={fusionPredialImg} 
                alt="Proceso de Fusión Predial" 
                className="w-full rounded-lg shadow-xl"
              />
            </div>
            
            <div className="max-w-6xl mx-auto">
              <img 
                src={comoHacerFusionImg} 
                alt="Cómo hacer Fusión de Terrenos - Diagrama completo del proceso" 
                className="w-full rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Documentos Requeridos */}
      <section className="py-20 bg-emerald-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">Documentos Requeridos por Institución</h2>
            <p className="text-xl text-gray-600">Lista completa de requisitos para cada etapa del proceso</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Municipalidad */}
            <Card className="border-2 border-emerald-200 shadow-lg">
              <CardHeader className="bg-emerald-600 text-white">
                <CardTitle className="text-center text-xl">🏛️ Municipalidad</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <FileText className="h-4 w-4 text-emerald-600 mt-1 flex-shrink-0" />
                    <span className="text-sm">Formulario de Fusión de Terrenos</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <FileText className="h-4 w-4 text-emerald-600 mt-1 flex-shrink-0" />
                    <span className="text-sm">Plano de Fusión patrocinado por Arquitecto</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <FileText className="h-4 w-4 text-emerald-600 mt-1 flex-shrink-0" />
                    <span className="text-sm">Escrituras de los lotes</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <FileText className="h-4 w-4 text-emerald-600 mt-1 flex-shrink-0" />
                    <span className="text-sm">Certificado de Dominio Vigente</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <FileText className="h-4 w-4 text-emerald-600 mt-1 flex-shrink-0" />
                    <span className="text-sm">Certificado de Informes Previos</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <FileText className="h-4 w-4 text-emerald-600 mt-1 flex-shrink-0" />
                    <span className="text-sm">Certificado de Avalúo Desglosado</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <FileText className="h-4 w-4 text-emerald-600 mt-1 flex-shrink-0" />
                    <span className="text-sm">Patente al día del Arquitecto</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SII */}
            <Card className="border-2 border-emerald-200 shadow-lg">
              <CardHeader className="bg-emerald-600 text-white">
                <CardTitle className="text-center text-xl">🏢 Servicio SII</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <FileText className="h-4 w-4 text-emerald-600 mt-1 flex-shrink-0" />
                    <span className="text-sm">Formulario 2118</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <FileText className="h-4 w-4 text-emerald-600 mt-1 flex-shrink-0" />
                    <span className="text-sm">Certificado de Deuda de Contribuciones al día</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <FileText className="h-4 w-4 text-emerald-600 mt-1 flex-shrink-0" />
                    <span className="text-sm">Resolución de Fusión y Plano aprobado</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <FileText className="h-4 w-4 text-emerald-600 mt-1 flex-shrink-0" />
                    <span className="text-sm">Certificados de Número</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <FileText className="h-4 w-4 text-emerald-600 mt-1 flex-shrink-0" />
                    <span className="text-sm">Escrituras de los lotes</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <FileText className="h-4 w-4 text-emerald-600 mt-1 flex-shrink-0" />
                    <span className="text-sm">Certificado de Dominio Vigente</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CBR */}
            <Card className="border-2 border-emerald-200 shadow-lg">
              <CardHeader className="bg-emerald-600 text-white">
                <CardTitle className="text-center text-xl">📋 Conservador CBR</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <FileText className="h-4 w-4 text-emerald-600 mt-1 flex-shrink-0" />
                    <span className="text-sm">Título de Dominio de la Propiedad</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <FileText className="h-4 w-4 text-emerald-600 mt-1 flex-shrink-0" />
                    <span className="text-sm">Certificado de Deuda de Contribuciones al día</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <FileText className="h-4 w-4 text-emerald-600 mt-1 flex-shrink-0" />
                    <span className="text-sm">Resolución de Fusión y Plano aprobado</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <FileText className="h-4 w-4 text-emerald-600 mt-1 flex-shrink-0" />
                    <span className="text-sm">Certificados de Número Municipal</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <div className="bg-emerald-100 p-6 rounded-lg max-w-3xl mx-auto">
              <h3 className="text-xl font-bold text-emerald-800 mb-3">📝 Nosotros Gestionamos Todo</h3>
              <p className="text-emerald-700">
                No te preocupes por estos trámites. Nosotros nos encargamos de reunir, preparar y 
                presentar todos los documentos necesarios en cada institución.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Preguntas Frecuentes */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">Preguntas Frecuentes</h2>
            <p className="text-xl text-gray-600">Resolvemos las dudas más comunes sobre fusión de terrenos</p>
          </div>

          <div className="space-y-6">
            <Card className="border-l-4 border-emerald-500">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-emerald-800 mb-3">
                  ¿Se pueden fusionar terrenos de distintos propietarios?
                </h3>
                <p className="text-gray-700">
                  <strong>No.</strong> La ley señala con claridad que debe ser un solo propietario, 
                  el cual puede ser una persona natural o jurídica, o bien una sucesión 
                  (esta última se entiende como un solo dueño).
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-emerald-500">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-emerald-800 mb-3">
                  ¿Es posible la Fusión si los predios están afectos a utilidad pública?
                </h3>
                <p className="text-gray-700">
                  <strong>Sí</strong>, es posible efectuar la fusión si los predios están afectos a utilidad pública 
                  (por ejemplo, por un ensanche de caminos). Esto difiere del caso de subdivisión, 
                  donde sí se requiere realizar la urbanización exterior.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-emerald-500">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-emerald-800 mb-3">
                  ¿Cuánto tiempo demora el proceso completo?
                </h3>
                <p className="text-gray-700">
                  El proceso completo demora entre <strong>45 a 60 días</strong> aproximadamente, 
                  dependiendo de la complejidad del caso y la agilidad de las instituciones. 
                  Nosotros nos encargamos de acelerar cada etapa.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-emerald-500">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-emerald-800 mb-3">
                  ¿El 30% de aumento en constructibilidad es automático?
                </h3>
                <p className="text-gray-700">
                  <strong>Sí</strong>, según el Artículo 63 de la Ley General de Urbanismo y Construcción, 
                  la fusión de dos o más terrenos en uno solo tendrá automáticamente un beneficio 
                  del 30% mayor densidad a través del aumento del coeficiente de constructibilidad.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-emerald-500">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-emerald-800 mb-3">
                  ¿Qué pasa si cambio de opinión después de la fusión?
                </h3>
                <p className="text-gray-700">
                  <strong>Importante:</strong> No existen las fusiones transitorias. Si se arrepiente, 
                  es bastante difícil volver a subdividir en las condiciones iniciales. 
                  Es más fácil fusionar que subdividir terrenos, pues las leyes fomentan la fusión.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Autoridad y Credibilidad */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-8">¿Por Qué Confiar en Patricio Becar?</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-emerald-50 p-6 rounded-lg">
              <Star className="h-8 w-8 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Arquitecto Universidad de Chile</h3>
              <p className="text-gray-600">26+ años de experiencia en proyectos arquitectónicos y fusiones de terrenos exitosas</p>
            </div>
            <div className="bg-emerald-50 p-6 rounded-lg">
              <Shield className="h-8 w-8 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Ex-Funcionario Municipal</h3>
              <p className="text-gray-600">Trabajó en Direcciones de Obra, conoce el proceso desde adentro</p>
            </div>
          </div>
          
          <div className="bg-gray-100 p-8 rounded-lg">
            <p className="text-lg italic text-gray-700 mb-4">
              "Además de mi experiencia como Arquitecto, tengo un Magister en Gestión para la Globalización 
              y un Master in Management de la Universidad de Macquarie en Sydney. 
              He trabajado en municipalidades, inmobiliarias y empresas de tasación."
            </p>
            <p className="font-semibold text-emerald-800">- Patricio Becar Elissegaray, Arquitecto</p>
          </div>
        </div>
      </section>

      {/* Urgencia y Escasez */}
      <section className="py-16 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">⚠️ IMPORTANTE: Este Beneficio Puede Cambiar</h2>
          <p className="text-xl mb-8">
            Las leyes urbanas están en constante revisión. El beneficio del 30% del Art. 63 
            podría modificarse en futuras actualizaciones normativas.
          </p>
          <div className="bg-white/20 p-6 rounded-lg">
            <p className="text-lg font-semibold">
              📅 Solo procesamos 8 fusiones por mes para garantizar calidad
            </p>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-br from-emerald-800 to-green-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            ¿Listo para Multiplicar el Valor de Tu Terreno?
          </h2>
          <p className="text-xl mb-8">
            Evaluación inicial GRATUITA. Sin compromiso. 
            Descubre cuánto puede valer tu propiedad después de la fusión.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={handleContactClick}
              size="lg" 
              className="bg-emerald-500 text-white hover:bg-emerald-400 text-xl px-8 py-4"
            >
              <ArrowRight className="mr-2 h-6 w-6" />
              Solicitar Evaluación GRATIS
            </Button>
            <div className="text-emerald-200">
              <Clock className="inline h-5 w-5 mr-2" />
              Respuesta en menos de 24 horas
            </div>
          </div>
          
          <div className="mt-8 text-emerald-100">
            <p className="text-sm">
              📞 WhatsApp directo: +56 9 7931 6827<br/>
              ✉️ Email: contacto@arquitectochile.com
            </p>
          </div>
        </div>
      </section>

      <Chatbot />
      <Footer />
    </div>
  );
}