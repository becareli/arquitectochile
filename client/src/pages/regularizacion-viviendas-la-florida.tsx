import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, AlertTriangle, Shield, Clock, Phone, Mail, MapPin, Star, Users, FileText, Calendar, TrendingUp } from 'lucide-react';
import uncleSamRegularizacionImage from "@assets/Regularizar tus ampliaciones es Inteligente_1755480443189.png";
import processInfographicImage from "@assets/generated_images/Housing_regularization_process_infographic_b6f85788.png";
import beforeAfterImage from "@assets/generated_images/Before_after_regularization_transformation_5eab5567.png";
import architectInspectionImage from "@assets/generated_images/Professional_architectural_house_inspection_051db6f4.png";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

// Schema para el formulario de contacto
const contactSchema = z.object({
  name: z.string().min(2, 'Nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(8, 'Teléfono debe tener al menos 8 dígitos'),
  propertyAddress: z.string().min(5, 'Dirección de la propiedad es requerida'),
  propertySize: z.string().optional(),
  message: z.string().optional(),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function RegularizacionViviendasLaFloridaPage() {
  const { toast } = useToast();
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      propertyAddress: '',
      propertySize: '',
      message: '',
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactForm) => {
      return apiRequest('/api/leads', 'POST', {
        ...data,
        source: 'Regularización La Florida',
        service: 'Regularización de Viviendas',
        location: 'La Florida',
      });
    },
    onSuccess: () => {
      toast({
        title: "¡Solicitud Enviada!",
        description: "Te contactaremos en las próximas 2 horas para agendar tu visita gratuita.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Hubo un problema al enviar tu solicitud. Por favor intenta nuevamente.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (data: ContactForm) => {
    contactMutation.mutate(data);
  };

  // Floating CTA scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const shouldShow = scrolled > 800;
      setShowFloatingCTA(shouldShow);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cargar formulario de forms.app
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://forms.app/cdn/embed.js';
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      const container = document.getElementById('forms-app-container');
      if (container && !container.hasChildNodes()) {
        const formDiv = document.createElement('div');
        formDiv.setAttribute('formsappid', '6732688de47f9dc4f751b212');
        container.appendChild(formDiv);
        
        if ((window as any).formsapp) {
          new (window as any).formsapp('6732688de47f9dc4f751b212', 'fullscreen', {'opacity':1}, 'https://qv3ysdfj.forms.app');
        }
      }
    };

    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* SEO Meta Tags */}
      <title>Regularización de Viviendas La Florida | Ley del Mono | Arquitecto Patricio Becar</title>
      
      {/* Hero Section - Gancho Principal */}
      <section className="relative bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white py-20 px-4">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-block mb-6">
            <Badge variant="destructive" className="text-lg py-2 px-4 animate-pulse">
              ⏰ PLAZO EXTENDIDO HASTA DICIEMBRE 2027
            </Badge>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Regulariza tu Hogar en La Florida
            <span className="block text-yellow-300">con la Ley del Mono</span>
          </h1>
          
          <h2 className="text-2xl md:text-3xl mb-8 text-red-100 max-w-4xl mx-auto">
            Protege tu Inversión y Duerme Tranquilo - Servicio Integral de Regularización bajo Ley N° 20.898
          </h2>

          {/* Uncle Sam Image - Modified without phone number */}
          <div className="mb-8 flex justify-center">
            <div className="relative bg-white p-4 rounded-lg shadow-2xl max-w-md">
              <img 
                src={uncleSamRegularizacionImage} 
                alt="Regulariza tus Ampliaciones Ahora - Uncle Sam Style" 
                className="w-full h-auto rounded-lg shadow-lg"
                style={{
                  filter: 'brightness(1.1) contrast(1.05)'
                }}
              />
              {/* Overlay to hide phone number */}
              <div className="absolute bottom-0 left-0 right-0 bg-white p-3 rounded-b-lg">
                <div className="text-center">
                  <div className="text-red-800 font-bold text-lg mb-2">
                    ¡Completa el Formulario Abajo!
                  </div>
                  <Badge variant="outline" className="bg-green-500 text-white border-green-600">
                    💯 GARANTÍA DE SATISFACCIÓN
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Button 
              size="lg" 
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-xl py-4 px-8 rounded-full shadow-2xl transform hover:scale-105 transition-all"
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              📞 AGENDA TU VISITA GRATUITA AHORA
            </Button>
            
            <p className="text-red-100 text-sm">
              ⭐ Diagnóstico completamente GRATIS • ⭐ Sin compromiso • ⭐ Resultados garantizados
            </p>
          </div>
        </div>
      </section>

      {/* Sección de Problemas y Miedos */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              ¿Vives con la Angustia de una Vivienda Sin Regularizar?
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
              Sabemos que tienes miedo. La incertidumbre no te deja dormir tranquilo. 
              Estos son los problemas REALES que enfrentas cada día:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <AlertTriangle className="w-8 h-8 text-red-500" />,
                title: "Riesgo de Multas",
                description: "La municipalidad puede multarte en cualquier momento por construcciones no autorizadas"
              },
              {
                icon: <TrendingUp className="w-8 h-8 text-red-500" />,
                title: "No Puedes Vender",
                description: "Tu propiedad no se puede vender legalmente, perdiendo oportunidades de inversión"
              },
              {
                icon: <FileText className="w-8 h-8 text-red-500" />,
                title: "Sin Acceso a Créditos",
                description: "Los bancos no aprueban hipotecas sobre propiedades irregulares"
              },
              {
                icon: <Users className="w-8 h-8 text-red-500" />,
                title: "Amenaza de Demolición",
                description: "Vecinos molestos pueden denunciarte y exigir la demolición de tu construcción"
              }
            ].map((problem, index) => (
              <Card key={index} className="border-red-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="mb-4">{problem.icon}</div>
                  <h3 className="font-bold text-xl mb-2 text-gray-900">{problem.title}</h3>
                  <p className="text-gray-600 text-base">{problem.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Before/After Transformation Image */}
          <div className="mt-12 text-center">
            <img 
              src={beforeAfterImage} 
              alt="Antes y Después de la Regularización - Transformación de tu Hogar" 
              className="w-full max-w-4xl mx-auto rounded-lg shadow-2xl"
            />
          </div>

          <div className="mt-8 bg-red-50 border-l-4 border-red-500 p-6 rounded">
            <div className="flex items-center mb-3">
              <AlertTriangle className="w-6 h-6 text-red-500 mr-3" />
              <h3 className="font-bold text-red-800">La Realidad es Dura...</h3>
            </div>
            <p className="text-red-700">
              Cada día que pasa sin regularizar tu vivienda, <strong>aumenta el riesgo de multas, devaluación y problemas legales</strong>. 
              La ansiedad crece, la incertidumbre no te deja en paz, y sabes que esto no se va a resolver solo.
            </p>
          </div>

          {/* Call-to-Action after problems section */}
          <div className="mt-8 text-center">
            <Button 
              size="lg" 
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-xl py-4 px-8 rounded-full shadow-2xl transform hover:scale-105 transition-all"
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              📝 OBTÉN TU DIAGNÓSTICO GRATUITO AHORA
            </Button>
            <p className="text-red-600 text-sm mt-2 font-medium">
              ⚡ Sin compromiso • ⚡ Arquitecto especialista • ⚡ Respuesta en 24 horas
            </p>
          </div>
        </div>
      </section>

      {/* Sección de Solución y Oportunidad */}
      <section className="py-16 px-4 bg-green-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="bg-green-500 text-white border-green-600 mb-4">
              ✅ LA SOLUCIÓN EXISTE
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              La Ley N° 20.898 "Ley del Mono" es tu
              <span className="text-green-600"> Oportunidad Única</span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
              El gobierno chileno creó esta ley especialmente para resolver TU problema. 
              Y ahora tienes hasta <strong className="text-green-600">diciembre de 2027</strong> para aprovechar esta oportunidad.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-xl mb-2">Tranquilidad Total</h3>
                  <p className="text-gray-600 text-lg">Tu vivienda quedará completamente legal y protegida ante cualquier reclamo.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Seguridad Jurídica Completa</h3>
                  <p className="text-gray-600">Certificados oficiales que garantizan la legalidad de tu construcción.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Valorización Inmediata</h3>
                  <p className="text-gray-600">Tu propiedad aumentará de valor al estar completamente regularizada.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Acceso a Subsidios</h3>
                  <p className="text-gray-600">Podrás acceder a subsidios de mejoramiento habitacional del gobierno.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Descuentos de hasta 75%</h3>
                  <p className="text-gray-600">En derechos municipales durante el proceso de regularización.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-xl border-2 border-green-200">
              <div className="text-center mb-6">
                <Clock className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">¡Tiempo Limitado!</h3>
                <p className="text-gray-600">La Ley del Mono tiene fecha de vencimiento</p>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <div className="text-center">
                  <p className="text-red-600 font-bold text-lg">Plazo Final:</p>
                  <p className="text-red-800 text-2xl font-bold">31 de Diciembre 2027</p>
                  <p className="text-sm text-red-600 mt-2">Después de esta fecha, la regularización será mucho más compleja y costosa</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección del Proceso Integral */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Servicio Integral de Regularización
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
              Te acompañamos en <strong>cada paso del proceso</strong>. Desde el diagnóstico inicial hasta la inscripción final. 
              <strong>Todo incluido, sin sorpresas.</strong>
            </p>
          </div>

          {/* Process Infographic Image */}
          <div className="mb-8 text-center">
            <img 
              src={processInfographicImage} 
              alt="Proceso de Regularización en 4 Pasos - Infografía Profesional" 
              className="w-full max-w-5xl mx-auto rounded-lg shadow-2xl"
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Diagnóstico Gratuito",
                description: "Visitamos tu propiedad sin costo para evaluar la viabilidad de regularización",
                icon: <FileText className="w-8 h-8 text-blue-500" />
              },
              {
                step: "2", 
                title: "Levantamiento de Planos",
                description: "Medición profesional y elaboración de planos técnicos actualizados",
                icon: <MapPin className="w-8 h-8 text-blue-500" />
              },
              {
                step: "3",
                title: "Informe Técnico",
                description: "Documentación técnica completa para presentar ante las autoridades",
                icon: <Shield className="w-8 h-8 text-blue-500" />
              },
              {
                step: "4",
                title: "Tramitación Completa",
                description: "Gestión ante DOM y Conservador de Bienes Raíces hasta la inscripción final",
                icon: <CheckCircle className="w-8 h-8 text-blue-500" />
              }
            ].map((process, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-4 flex justify-center">{process.icon}</div>
                  <Badge variant="outline" className="mb-3">Paso {process.step}</Badge>
                  <h3 className="font-bold text-xl mb-3">{process.title}</h3>
                  <p className="text-gray-600 text-base">{process.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 bg-blue-50 p-8 rounded-lg">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                ¿Qué Incluye Nuestro Servicio Integral?
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-left max-w-4xl mx-auto">
                {[
                  "✅ Visita y diagnóstico inicial completamente GRATIS",
                  "✅ Levantamiento topográfico y arquitectónico profesional",
                  "✅ Elaboración de planos técnicos actualizados",
                  "✅ Informe técnico estructural y de habitabilidad",
                  "✅ Presentación y tramitación ante la Dirección de Obras",
                  "✅ Gestión completa ante el Conservador de Bienes Raíces",
                  "✅ Seguimiento personalizado durante todo el proceso",
                  "✅ Entrega de certificados oficiales de regularización"
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="text-green-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Precios y Paquetes */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Precios Transparentes y Fijos
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
              <strong>Sin sorpresas, sin costos ocultos.</strong> Conoce exactamente lo que pagarás desde el primer día.
              Esta inversión se traduce en plusvalía y tranquilidad para toda la vida.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Paquete Básico */}
            <Card className="border-2 border-blue-200 hover:border-blue-300 transition-colors">
              <CardHeader className="text-center bg-blue-50">
                <Badge variant="outline" className="mx-auto mb-2">PAQUETE BÁSICO</Badge>
                <CardTitle className="text-2xl">Viviendas ≤ 90 m²</CardTitle>
                <div className="text-3xl font-bold text-blue-600">Desde $1.890.000</div>
                <p className="text-gray-600">Ideal para viviendas pequeñas y ampliaciones menores</p>
                <p className="text-sm text-blue-600 font-medium mt-2">💳 Pago en 3 hitos cómodos</p>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {[
                    "✅ Diagnóstico inicial GRATUITO",
                    "✅ Levantamiento de planos completo",
                    "✅ Informe técnico profesional",
                    "✅ Tramitación ante DOM",
                    "✅ Gestión Conservador de Bienes Raíces",
                    "✅ Certificados oficiales",
                    "✅ Seguimiento personalizado",
                    "✅ Garantía de satisfacción"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <span className="text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Paquete Premium */}
            <Card className="border-2 border-green-300 hover:border-green-400 transition-colors relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-green-500">MÁS POPULAR</Badge>
              </div>
              <CardHeader className="text-center bg-green-50">
                <Badge variant="outline" className="mx-auto mb-2 border-green-500 text-green-600">PAQUETE PREMIUM</Badge>
                <CardTitle className="text-2xl">Ampliaciones hasta 140 m²</CardTitle>
                <div className="text-3xl font-bold text-green-600">Desde $2.590.000</div>
                <p className="text-gray-600">Para viviendas grandes y proyectos complejos (hasta 2.000 UF)</p>
                <p className="text-sm text-green-600 font-medium mt-2">💳 Pago en 3 hitos cómodos</p>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {[
                    "✅ Todo lo incluido en Paquete Básico",
                    "✅ Proyectos hasta 2.000 UF de avalúo",
                    "✅ Regularización de ampliaciones complejas",
                    "✅ Gestión de permisos especiales",
                    "✅ Informe estructural avanzado",
                    "✅ Asesoría en optimización tributaria",
                    "✅ Soporte prioritario",
                    "✅ Garantía extendida"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <span className="text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 bg-yellow-50 p-8 rounded-lg border border-yellow-200">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                💰 Tu Inversión se Paga Sola
              </h3>
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 text-green-500 mx-auto mb-3" />
                  <h4 className="font-bold mb-2 text-xl">Aumenta el Valor</h4>
                  <p className="text-lg text-gray-600">Una vivienda regularizada vale 15-25% más en el mercado</p>
                </div>
                <div className="text-center">
                  <Shield className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                  <h4 className="font-bold mb-2 text-xl">Evita Multas</h4>
                  <p className="text-lg text-gray-600">Las multas pueden ser de $500.000 a $2.000.000 o más</p>
                </div>
                <div className="text-center">
                  <CheckCircle className="w-12 h-12 text-purple-500 mx-auto mb-3" />
                  <h4 className="font-bold mb-2 text-xl">Acceso a Créditos</h4>
                  <p className="text-lg text-gray-600">Podrás acceder a hipotecas y créditos sobre tu propiedad</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Schedule Information */}
          <div className="mt-12 bg-gray-100 p-8 rounded-lg">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                💳 Sistema de Pago por Hitos
              </h3>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                No pagas todo de una vez. El pago se distribuye en 3 hitos según el avance del proceso:
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="text-blue-600 font-bold text-lg mb-2">HITO 1</div>
                  <h4 className="font-bold text-xl mb-3">Al Contratar los Servicios</h4>
                  <p className="text-gray-600 text-lg">Primera cuota al firmar el contrato y comenzar el proceso</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="text-green-600 font-bold text-lg mb-2">HITO 2</div>
                  <h4 className="font-bold text-xl mb-3">Al Ingreso del Expediente</h4>
                  <p className="text-gray-600 text-lg">Segunda cuota cuando ingresamos tu expediente a la municipalidad</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="text-purple-600 font-bold text-lg mb-2">HITO 3</div>
                  <h4 className="font-bold text-xl mb-3">Al Obtener Certificado</h4>
                  <p className="text-gray-600 text-lg">Última cuota cuando obtienes tu certificado de regularización</p>
                </div>
              </div>
            </div>
          </div>

          {/* Strategic CTA after pricing */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-8 rounded-lg shadow-2xl">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                💡 ¡Tu Vivienda Vale Más Regularizada!
              </h3>
              <p className="text-xl text-gray-800 mb-6 max-w-2xl mx-auto">
                No pierdas más tiempo preocupándote. Una inversión de $1.890.000 puede aumentar el valor de tu propiedad en $15-25 millones o más.
              </p>
              <Button 
                size="lg" 
                className="bg-gray-900 hover:bg-gray-800 text-white font-bold text-xl py-4 px-8 rounded-full shadow-2xl transform hover:scale-105 transition-all"
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                📋 COMPLETAR FORMULARIO AHORA
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Autoridad y Testimonios */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Experiencia Comprobada en La Florida
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
              El <strong>Arquitecto Patricio Becar</strong> tiene más de 25 años de experiencia y conoce perfectamente 
              los procesos municipales de La Florida. Miles de familias ya regularizaron sus viviendas con nosotros.
            </p>
          </div>

          {/* Testimonios */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="border-l-4 border-green-500">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                </div>
                <p className="text-gray-600 mb-4 italic text-lg">
                  "Antes vivía con miedo constante de que me multaran por mi ampliación. 
                  No podía dormir tranquila. Patricio me solucionó todo en 4 meses. 
                  Ahora mi casa vale mucho más y tengo la tranquilidad total."
                </p>
                <div className="flex items-center">
                  <div>
                    <div className="font-bold">María González</div>
                    <div className="text-sm text-gray-500">Vecina de La Florida • Ampliación 45 m²</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-blue-500">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "Mi casa estaba completamente irregular desde hace 10 años. 
                  Los bancos me rechazaban todos los créditos. Patricio regularizó todo 
                  y ahora pude acceder a un crédito hipotecario. ¡Increíble!"
                </p>
                <div className="flex items-center">
                  <div>
                    <div className="font-bold">Carlos Méndez</div>
                    <div className="text-sm text-gray-500">Propietario en La Florida • Casa 85 m²</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Autoridad del Arquitecto con Imagen Profesional */}
          <div className="bg-blue-50 p-8 rounded-lg">
            <div className="flex items-center md:flex-row flex-col gap-8">
              <div className="md:w-1/3 text-center">
                <img 
                  src={architectInspectionImage} 
                  alt="Arquitecto Patricio Becar realizando inspección profesional" 
                  className="w-48 h-36 object-cover rounded-lg shadow-lg mx-auto mb-4"
                />
                <h3 className="font-bold text-xl mb-2">Arq. Patricio Becar</h3>
                <p className="text-blue-600 font-semibold">Especialista en Regularización</p>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Tu Tranquilidad en Manos Expertas</h3>
                <ul className="space-y-2">
                  {[
                    "✅ Arquitecto Universidad de Chile desde 1999",
                    "✅ MBA Universidad de Chile + Global MBA University of Macquarie Australia", 
                    "✅ Más de 500 viviendas regularizadas en La Florida",
                    "✅ Conocimiento profundo de la normativa municipal",
                    "✅ Relación directa con funcionarios de la DOM",
                    "✅ 100% de casos exitosos bajo la Ley del Mono"
                  ].map((credential, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <span className="text-gray-700">{credential}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Llamado a la Acción Final */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            ¡No Dejes que el Tiempo se Agote!
          </h2>
          <p className="text-2xl mb-8 text-green-100">
            Asegura tu regularización antes del <strong>31 de diciembre de 2027</strong>.
            Cada día que esperas, aumenta el riesgo y la incertidumbre.
          </p>

          <div className="bg-white p-8 rounded-lg shadow-2xl text-gray-900 max-w-4xl mx-auto" id="contact-form">
            <h3 className="text-3xl font-bold mb-6 text-center">
              📞 Agenda tu Visita de Diagnóstico GRATUITA
            </h3>
            
            {/* Formulario Externo Embebido */}
            <div className="w-full">
              <div id="forms-app-container"></div>
            </div>
            
            <div className="text-lg text-gray-600 text-center mt-6 space-y-3">
              <p>✅ Respuesta garantizada en menos de 2 horas</p>
              <p>✅ Visita completamente gratuita y sin compromiso</p>
              <p>✅ Asesoría personalizada para tu caso específico</p>
              <p>✅ Pago fraccionado en 3 hitos según avance del proceso</p>
            </div>

            {/* QR Code Placeholder */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600 mb-4">
                ¿Prefieres contactar directamente?
              </p>
              <div className="flex justify-center items-center space-x-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                    <Phone className="w-8 h-8 text-gray-600" />
                  </div>
                  <p className="text-xs font-bold">+56 9 7931 6827</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                    <Mail className="w-8 h-8 text-gray-600" />
                  </div>
                  <p className="text-xs font-bold">WhatsApp Directo</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <p className="text-green-100 text-lg">
              ⏰ <strong>URGENTE:</strong> La Ley del Mono expira el 31 de diciembre de 2027
            </p>
            <p className="text-green-200 text-sm mt-2">
              Después de esta fecha, regularizar será mucho más complejo, lento y costoso
            </p>
          </div>
        </div>
      </section>

      {/* Floating CTA Button */}
      {showFloatingCTA && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full shadow-2xl animate-pulse"
            onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            📞 Visita GRATIS
          </Button>
        </div>
      )}
    </div>
  );
}