import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AvisoLegal() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-12">Aviso Legal</h1>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>1. Identificación del Responsable</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p><strong>Razón Social:</strong> ArquitectoChile.com</p>
            <p><strong>Propietario:</strong> Constructora Patricio Becar Elissegaray EIRL</p>
            <p><strong>Profesión:</strong> Arquitecto Universidad de Chile</p>
            <p><strong>RUT:</strong> 76.550.413-9</p>
            <p><strong>Domicilio:</strong> Santiago, Chile</p>
            <p><strong>Email:</strong> contacto@arquitectochile.com</p>
            <p><strong>Teléfono:</strong> +56 9 7931 6827</p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>2. Objeto y Servicios</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              ArquitectoChile.com es una plataforma digital que ofrece servicios profesionales de arquitectura, 
              incluyendo diseño arquitectónico, gestión de permisos de edificación, revisoría independiente, 
              y asesorías especializadas en construcción.
            </p>
            <p>
              Todos los servicios son prestados por profesionales debidamente certificados y autorizados 
              por las instituciones competentes en Chile.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>3. Condiciones de Uso</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              El acceso y uso de este sitio web implica la aceptación plena de las presentes condiciones. 
              El usuario se compromete a utilizar el sitio conforme a la ley y de manera que no perjudique 
              los derechos e intereses de terceros.
            </p>
            <p>
              Queda prohibido el uso del sitio para actividades ilícitas o que puedan dañar la imagen, 
              intereses y derechos de ArquitectoChile.com o de terceros.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>4. Propiedad Intelectual</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Todos los contenidos de este sitio web, incluyendo textos, imágenes, diseños, logotipos, 
              marcas y cualquier otro elemento, son propiedad de ArquitectoChile.com o de sus respectivos 
              propietarios y están protegidos por las leyes de propiedad intelectual.
            </p>
            <p>
              Queda prohibida la reproducción, distribución, comunicación pública y transformación de 
              dichos contenidos sin autorización expresa del titular de los derechos.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>5. Responsabilidad</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              ArquitectoChile.com se esfuerza por mantener la información actualizada y precisa, pero no 
              garantiza la exactitud, completitud o actualidad de la información contenida en el sitio.
            </p>
            <p>
              Los servicios profesionales prestados están sujetos a sus propias condiciones contractuales 
              específicas y garantías profesionales correspondientes.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>6. Enlaces a Terceros</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Este sitio puede contener enlaces a sitios web de terceros. ArquitectoChile.com no se hace 
              responsable del contenido, políticas de privacidad o prácticas de estos sitios externos.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>7. Modificaciones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              ArquitectoChile.com se reserva el derecho de modificar en cualquier momento las condiciones 
              de uso del sitio web. Los cambios serán efectivos desde su publicación en el sitio.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>8. Jurisdicción y Ley Aplicable</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Para cualquier controversia que pudiera surgir del uso de este sitio web, las partes se 
              someten a la jurisdicción de los tribunales de Santiago, Chile, renunciando expresamente 
              a cualquier otro fuero que pudiera corresponderles.
            </p>
            <p>
              Este aviso legal se rige por la legislación chilena.
            </p>
          </CardContent>
        </Card>

        <div className="text-center mt-12 text-gray-600">
          <p>Última actualización: Agosto 2025</p>
        </div>
      </div>
    </div>
  );
}