import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, FileText, AlertCircle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    calle: "",
    numero: "",
    comuna: "",
    helpType: "",
    timeline: "",
    message: ""
  });
  
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [antiSpamVerified, setAntiSpamVerified] = useState(false);
  const [mathCaptcha, setMathCaptcha] = useState({ question: "", answer: 0 });
  const [userAnswer, setUserAnswer] = useState("");
  
  const { toast } = useToast();

  // Generate math captcha
  const generateMathCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const answer = num1 + num2;
    setMathCaptcha({ question: `¿Cuánto es ${num1} + ${num2}?`, answer });
  };

  // Initialize captcha on component mount
  useEffect(() => {
    generateMathCaptcha();
  }, []);

  // Handle file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const newUploadedFiles: string[] = [];

    try {
      for (const file of Array.from(files)) {
        // Validate file type (PDFs, images, docs)
        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!allowedTypes.includes(file.type)) {
          toast({
            title: "Tipo de archivo no válido",
            description: "Solo se permiten archivos PDF, imágenes (JPG, PNG, WEBP) y documentos de Word",
            variant: "destructive"
          });
          continue;
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
          toast({
            title: "Archivo muy grande",
            description: `${file.name} es muy grande. Máximo 10MB por archivo.`,
            variant: "destructive"
          });
          continue;
        }

        // Get upload URL from server
        const uploadResponse = await apiRequest("POST", "/api/objects/upload", {});
        const { uploadURL } = uploadResponse;

        // Upload file to object storage
        const uploadResult = await fetch(uploadURL, {
          method: 'PUT',
          body: file,
          headers: {
            'Content-Type': file.type,
          },
        });

        if (uploadResult.ok) {
          newUploadedFiles.push(uploadURL.split('?')[0]); // Remove query params
          toast({
            title: "Archivo subido",
            description: `${file.name} se subió correctamente`,
          });
        }
      }

      setUploadedFiles(prev => [...prev, ...newUploadedFiles]);
    } catch (error) {
      toast({
        title: "Error al subir archivo",
        description: "Hubo un problema al subir los archivos. Intenta de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.calle || !formData.numero || !formData.comuna || !formData.helpType || !formData.timeline || !formData.message) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos incluyendo la dirección completa",
        variant: "destructive"
      });
      return;
    }

    // Validate math captcha
    if (parseInt(userAnswer) !== mathCaptcha.answer) {
      toast({
        title: "Error de verificación",
        description: "La respuesta al captcha matemático es incorrecta",
        variant: "destructive"
      });
      return;
    }

    // Validate anti-spam checkbox
    if (!antiSpamVerified) {
      toast({
        title: "Error de verificación",
        description: "Por favor confirma que no eres un robot",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/leads", {
        ...formData,
        source: "contact_form",
        status: "new",
        attachments: uploadedFiles
      });

      toast({
        title: "¡Mensaje enviado!",
        description: "Te contactaremos pronto para ayudarte con tu proyecto",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        calle: "",
        numero: "",
        comuna: "",
        helpType: "",
        timeline: "",
        message: ""
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al enviar tu mensaje. Inténtalo nuevamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInstantConsult = () => {
    // This would integrate with WhatsApp or phone system
    window.open("https://wa.me/56979316827?text=Hola%20Patricio%2C%20necesito%20una%20consulta%20inmediata%20sobre%20mi%20proyecto", '_blank');
  };

  return (
    <section id="contacto" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-dark mb-4">Agenda tu Consulta Gratuita</h2>
          <p className="text-xl text-gray-600">El primer paso para construir la casa que siempre soñaste</p>
          <div className="mt-6 inline-block bg-primary/10 rounded-lg p-4">
            <p className="text-lg font-semibold text-primary">
              ✓ Consulta sin compromiso ✓ Evaluación de tu terreno ✓ Presupuesto inicial
            </p>
          </div>
        </div>
        
        <Card className="bg-neutral rounded-2xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Solicita tu Consulta Arquitectónica</CardTitle>
            <p className="text-center text-gray-600 mt-2">
              Responde estas preguntas para diseñar una solución personalizada para tu proyecto
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Nombre Completo *</Label>
                  <Input 
                    id="name"
                    type="text" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input 
                    id="email"
                    type="email" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="phone">Teléfono *</Label>
                <Input 
                  id="phone"
                  type="tel" 
                  required 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              
              {/* Address Section */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900 border-b pb-2">Dirección del Proyecto *</h4>
                
                <div>
                  <Label htmlFor="calle">Calle *</Label>
                  <Input 
                    id="calle"
                    type="text" 
                    required 
                    placeholder="Ej: Av. Providencia, Los Aromos, etc."
                    value={formData.calle}
                    onChange={(e) => setFormData({...formData, calle: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="numero">Número *</Label>
                    <Input 
                      id="numero"
                      type="text" 
                      required 
                      placeholder="1234"
                      value={formData.numero}
                      onChange={(e) => setFormData({...formData, numero: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="comuna">Comuna *</Label>
                    <Input 
                      id="comuna"
                      type="text" 
                      required 
                      placeholder="Ej: Las Condes, Valparaíso, Concepción, etc."
                      value={formData.comuna}
                      onChange={(e) => setFormData({...formData, comuna: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <Label>¿Qué tipo de proyecto necesitas? *</Label>
                <RadioGroup 
                  value={formData.helpType} 
                  onValueChange={(value) => setFormData({...formData, helpType: value})}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ampliacion" id="ampliacion" />
                    <Label htmlFor="ampliacion" className="text-sm">
                      Ampliación de vivienda (habitaciones, segundo piso, etc.)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="remodelacion" id="remodelacion" />
                    <Label htmlFor="remodelacion" className="text-sm">
                      Remodelación completa (baños, cocina, distribución)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="casa_nueva" id="casa_nueva" />
                    <Label htmlFor="casa_nueva" className="text-sm">
                      Casa nueva desde cero
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="permisos" id="permisos" />
                    <Label htmlFor="permisos" className="text-sm">
                      Solo necesito permisos y trámites legales
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="consulta" id="consulta" />
                    <Label htmlFor="consulta" className="text-sm">
                      Consulta arquitectónica (evaluar factibilidad)
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <Label>¿Cuándo quieres comenzar tu proyecto? *</Label>
                <RadioGroup 
                  value={formData.timeline} 
                  onValueChange={(value) => setFormData({...formData, timeline: value})}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="inmediato" id="inmediato" />
                    <Label htmlFor="inmediato" className="text-sm font-semibold text-primary">
                      🔥 Inmediato - Este mes (prioridad alta)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="3_meses" id="3_meses" />
                    <Label htmlFor="3_meses" className="text-sm">
                      En los próximos 1-3 meses
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="6_meses" id="6_meses" />
                    <Label htmlFor="6_meses" className="text-sm">
                      En 3-6 meses (planifico con tiempo)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mas_6_meses" id="mas_6_meses" />
                    <Label htmlFor="mas_6_meses" className="text-sm text-gray-500">
                      Más de 6 meses (solo información inicial)
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <Label htmlFor="message">¿Qué quieres realizar? Cuéntanos como podemos ayudarte *</Label>
                <Textarea 
                  id="message"
                  rows={4} 
                  required 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>

              {/* File Upload Section */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900 border-b pb-2">Documentos de Apoyo (Opcional)</h4>
                <p className="text-sm text-gray-600">
                  Puedes subir documentos como: Certificado de Informes Previos, planos existentes, fotografías del terreno, etc.
                </p>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                  <Label htmlFor="file-upload" className="cursor-pointer">
                    <span className="mt-2 block text-sm font-medium text-gray-900">
                      Haz clic para subir archivos
                    </span>
                    <span className="mt-1 block text-xs text-gray-500">
                      PDF, JPG, PNG, WEBP, DOC, DOCX hasta 10MB
                    </span>
                  </Label>
                  <Input
                    id="file-upload"
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                    disabled={isUploading}
                  />
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Archivos subidos:</Label>
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm bg-green-50 p-2 rounded">
                        <FileText className="h-4 w-4 text-green-600" />
                        <span className="text-green-700">Archivo {index + 1} subido correctamente</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setUploadedFiles(prev => prev.filter((_, i) => i !== index))}
                          className="ml-auto h-6 w-6 p-0 text-red-500 hover:text-red-700"
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                {isUploading && (
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 text-blue-600">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                      <span className="text-sm">Subiendo archivo...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Anti-Spam Section */}
              <div className="space-y-4 border-t pt-4">
                <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-500" />
                  Verificación Anti-Spam
                </h4>
                
                {/* Math Captcha */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Label htmlFor="math-captcha" className="text-sm font-medium">
                    {mathCaptcha.question} *
                  </Label>
                  <Input
                    id="math-captcha"
                    type="number"
                    required
                    placeholder="Ingresa tu respuesta"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    className="mt-2 w-32"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={generateMathCaptcha}
                    className="ml-3 mt-2"
                  >
                    Nueva pregunta
                  </Button>
                </div>

                {/* Human Verification Checkbox */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="anti-spam"
                    checked={antiSpamVerified}
                    onCheckedChange={(checked) => setAntiSpamVerified(checked as boolean)}
                  />
                  <Label
                    htmlFor="anti-spam"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Confirmo que soy una persona real y no un robot *
                  </Label>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex-1 bg-primary text-white hover:bg-secondary"
                >
                  {isSubmitting ? "Enviando..." : "Enviar Consulta"}
                </Button>
                <Button 
                  type="button" 
                  onClick={handleInstantConsult}
                  className="flex-1 bg-accent text-white hover:bg-yellow-500"
                >
                  Consultar de Inmediato
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
