import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PoliticaPrivacidad() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-12">Política de Privacidad</h1>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>1. Responsable del Tratamiento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p><strong>Responsable:</strong> Constructora Patricio Becar Elissegaray EIRL</p>
            <p><strong>RUT:</strong> 76.550.413-9</p>
            <p><strong>Sitio web:</strong> ArquitectoChile.com</p>
            <p><strong>Email de contacto:</strong> contacto@arquitectochile.com</p>
            <p><strong>Teléfono:</strong> +56 9 7931 6827</p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>2. Información que Recopilamos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h4 className="font-semibold">Información que nos proporciona directamente:</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li>Nombre completo</li>
              <li>Dirección de correo electrónico</li>
              <li>Número de teléfono</li>
              <li>Información del proyecto (ubicación, tipo, presupuesto)</li>
              <li>Mensajes y consultas enviadas a través de formularios de contacto</li>
            </ul>
            
            <h4 className="font-semibold mt-6">Información recopilada automáticamente:</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li>Dirección IP</li>
              <li>Tipo de navegador y dispositivo</li>
              <li>Páginas visitadas en nuestro sitio</li>
              <li>Tiempo de permanencia en el sitio</li>
              <li>Fuente de referencia (cómo llegó a nuestro sitio)</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>3. Cómo Utilizamos su Información</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Utilizamos la información recopilada para:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Responder a sus consultas y solicitudes de información</li>
              <li>Proporcionar cotizaciones y servicios profesionales</li>
              <li>Mantener comunicación sobre proyectos en curso</li>
              <li>Enviar información relevante sobre nuestros servicios</li>
              <li>Mejorar nuestro sitio web y servicios</li>
              <li>Cumplir con obligaciones legales y profesionales</li>
              <li>Realizar análisis estadísticos del uso del sitio</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>4. Base Legal para el Tratamiento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Procesamos sus datos personales basándonos en:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Consentimiento:</strong> Cuando nos proporciona información voluntariamente</li>
              <li><strong>Interés legítimo:</strong> Para mejorar nuestros servicios y sitio web</li>
              <li><strong>Ejecución contractual:</strong> Para prestar los servicios solicitados</li>
              <li><strong>Cumplimiento legal:</strong> Para cumplir con obligaciones profesionales</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>5. Cookies y Tecnologías Similares</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Utilizamos cookies para:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Mejorar la funcionalidad del sitio web</li>
              <li>Analizar el tráfico y uso del sitio</li>
              <li>Personalizar su experiencia</li>
              <li>Recordar sus preferencias</li>
            </ul>
            <p>
              Puede configurar su navegador para rechazar cookies, pero esto puede afectar 
              la funcionalidad del sitio.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>6. Compartir Información con Terceros</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>No vendemos ni alquilamos su información personal. Podemos compartir información con:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Proveedores de servicios:</strong> Para análisis web, hosting, comunicaciones</li>
              <li><strong>Autoridades competentes:</strong> Cuando sea requerido por ley</li>
              <li><strong>Colaboradores profesionales:</strong> Cuando sea necesario para prestar servicios</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>7. Seguridad de los Datos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger 
              su información personal contra acceso no autorizado, alteración, divulgación o destrucción.
            </p>
            <p>
              Sin embargo, ningún método de transmisión por internet es 100% seguro, por lo que no 
              podemos garantizar la seguridad absoluta.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>8. Sus Derechos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Usted tiene derecho a:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Acceso:</strong> Solicitar información sobre los datos que tenemos de usted</li>
              <li><strong>Rectificación:</strong> Corregir información inexacta o incompleta</li>
              <li><strong>Supresión:</strong> Solicitar la eliminación de sus datos</li>
              <li><strong>Portabilidad:</strong> Recibir sus datos en formato estructurado</li>
              <li><strong>Oposición:</strong> Oponerse al tratamiento de sus datos</li>
              <li><strong>Limitación:</strong> Solicitar la limitación del tratamiento</li>
            </ul>
            <p>
              Para ejercer estos derechos, contacte con nosotros en: contacto@arquitectochile.com
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>9. Retención de Datos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Conservamos sus datos personales solo durante el tiempo necesario para cumplir 
              con los propósitos para los que fueron recopilados, incluyendo obligaciones legales 
              y profesionales de archivo.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>10. Transferencias Internacionales</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Algunos de nuestros proveedores de servicios pueden estar ubicados fuera de Chile. 
              En estos casos, nos aseguramos de que existan garantías adecuadas para la protección 
              de sus datos.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>11. Menores de Edad</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Nuestros servicios están dirigidos a personas mayores de 18 años. No recopilamos 
              intencionalmente información personal de menores de edad.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>12. Cambios en esta Política</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Podemos actualizar esta política de privacidad ocasionalmente. Le notificaremos 
              sobre cambios significativos a través de nuestro sitio web o por email.
            </p>
          </CardContent>
        </Card>

        <div className="text-center mt-12 text-gray-600">
          <p>Última actualización: Agosto 2025</p>
          <p className="mt-4">
            Para cualquier consulta sobre esta política: 
            <a href="mailto:contacto@arquitectochile.com" className="text-primary hover:underline ml-1">
              contacto@arquitectochile.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}