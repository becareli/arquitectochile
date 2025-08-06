import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock, Phone, UserCheck, Target, TrendingUp } from "lucide-react";

interface KpiMetrics {
  totalLeads: number;
  primerContacto: {
    estructuraCorrecta: number;
    llamadaGrabada: number;
    lugarTranquilo: number;
    motivoPrincipal: number;
    eliminarObjeciones: number;
    enviarCasosExito: number;
    agendarSiguienteReunion: number;
    total: number;
  };
  llamadaCalificacion: {
    objecionesSolucionadas: number;
    propuestaAdecuada: number;
    confirmarPresentacion: number;
    total: number;
  };
  reunionPresentacion: {
    seguirEstructura: number;
    eliminarObjeciones: number;
    pedirCierre: number;
    llamadaGrabada: number;
    total: number;
  };
  reunionSeguimiento: {
    aclararDudas: number;
    resolverObjeciones: number;
    pedirCierre: number;
    bonoAccionRapida: number;
    total: number;
  };
}

// Criterios de KPI basados en el documento adjunto
const kpiCriteria = {
  primerContacto: [
    "Utilizar la estructura correspondiente",
    "Si no contesta insistir 1 vez más a la hora",
    "Si no atiende después de 3 llamados durante el día, dejarle un whatsapp",
    "-5 minutos antes de la llamada coordinada, dejarle un mensaje",
    "Grabar llamada para mejora y optimización",
    "Corroborar que la persona se encuentre en un lugar tranquilo",
    "Identificar motivo principal que mueve al prospecto",
    "Eliminar la objeción de la incertidumbre, del dinero, del tiempo",
    "Enviar casos de éxito y clientes más reconocidos/portafolio",
    "Agendar si o si la próxima reunión antes de colgar"
  ],
  llamadaCalificacion: [
    "Asegurarse de que las objeciones iniciales estén solucionadas",
    "Adecuar la propuesta y presentación a lo que desea el prospecto",
    "Confirmar presentación de propuesta 24 hs y 1 hs antes"
  ],
  reunionPresentacion: [
    "Aclarar si hay alguna duda antes de iniciar y despejarla",
    "Seguir estructura de llamada de Arquiboost",
    "Eliminar todas las objeciones",
    "Pedir el cierre: ¿desea iniciar ahora mismo o mañana?",
    "En caso de que el cliente aún tenga dudas, responderlas y volver al cierre",
    "Grabar llamada para feedback y optimización",
    "Si no queda otra opción como último recurso, agendar reunión de cierre/seg"
  ],
  reunionSeguimiento: [
    "Aclarar dudas",
    "Resolver objeciones si las hay",
    "Pedir el cierre",
    "Utilizar bono de acción rápida o escasez"
  ]
};

export default function KpiDashboard() {
  const [metrics, setMetrics] = useState<KpiMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular datos de KPI basados en leads reales
    // En producción, esto vendría de la API del CRM
    const mockMetrics: KpiMetrics = {
      totalLeads: 45,
      primerContacto: {
        estructuraCorrecta: 38,
        llamadaGrabada: 35,
        lugarTranquilo: 42,
        motivoPrincipal: 40,
        eliminarObjeciones: 33,
        enviarCasosExito: 37,
        agendarSiguienteReunion: 41,
        total: 45
      },
      llamadaCalificacion: {
        objecionesSolucionadas: 28,
        propuestaAdecuada: 31,
        confirmarPresentacion: 29,
        total: 35
      },
      reunionPresentacion: {
        seguirEstructura: 22,
        eliminarObjeciones: 20,
        pedirCierre: 25,
        llamadaGrabada: 24,
        total: 28
      },
      reunionSeguimiento: {
        aclararDudas: 15,
        resolverObjeciones: 13,
        pedirCierre: 16,
        bonoAccionRapida: 14,
        total: 18
      }
    };

    setTimeout(() => {
      setMetrics(mockMetrics);
      setIsLoading(false);
    }, 1000);
  }, []);

  const calculatePercentage = (value: number, total: number) => {
    return total > 0 ? Math.round((value / total) * 100) : 0;
  };

  const getStatusColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getStatusIcon = (percentage: number) => {
    if (percentage >= 90) return <CheckCircle className="h-4 w-4 text-green-600" />;
    if (percentage >= 70) return <Clock className="h-4 w-4 text-yellow-600" />;
    return <XCircle className="h-4 w-4 text-red-600" />;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!metrics) return null;

  const conversionRate = calculatePercentage(metrics.reunionSeguimiento.total, metrics.totalLeads);
  const qualificationRate = calculatePercentage(metrics.llamadaCalificacion.total, metrics.primerContacto.total);

  return (
    <div className="space-y-6">
      {/* Header KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex items-center p-4">
            <Phone className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Total Leads</p>
              <p className="text-2xl font-bold">{metrics.totalLeads}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-4">
            <UserCheck className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Calificados</p>
              <p className="text-2xl font-bold">{metrics.llamadaCalificacion.total}</p>
              <p className="text-xs text-gray-500">{qualificationRate}% de conversión</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-4">
            <Target className="h-8 w-8 text-purple-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">En Seguimiento</p>
              <p className="text-2xl font-bold">{metrics.reunionSeguimiento.total}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-4">
            <TrendingUp className="h-8 w-8 text-orange-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Tasa Conversión</p>
              <p className="text-2xl font-bold">{conversionRate}%</p>
              <p className="text-xs text-gray-500">Lead a Oportunidad</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed KPI Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Primer Contacto */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Primer Contacto
              <Badge variant="outline">{metrics.primerContacto.total} leads</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Estructura correcta</span>
                <div className="flex items-center gap-2">
                  {getStatusIcon(calculatePercentage(metrics.primerContacto.estructuraCorrecta, metrics.primerContacto.total))}
                  <span className={`text-sm font-medium ${getStatusColor(calculatePercentage(metrics.primerContacto.estructuraCorrecta, metrics.primerContacto.total))}`}>
                    {calculatePercentage(metrics.primerContacto.estructuraCorrecta, metrics.primerContacto.total)}%
                  </span>
                </div>
              </div>
              <Progress 
                value={calculatePercentage(metrics.primerContacto.estructuraCorrecta, metrics.primerContacto.total)} 
                className="h-2"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Llamada grabada</span>
                <div className="flex items-center gap-2">
                  {getStatusIcon(calculatePercentage(metrics.primerContacto.llamadaGrabada, metrics.primerContacto.total))}
                  <span className={`text-sm font-medium ${getStatusColor(calculatePercentage(metrics.primerContacto.llamadaGrabada, metrics.primerContacto.total))}`}>
                    {calculatePercentage(metrics.primerContacto.llamadaGrabada, metrics.primerContacto.total)}%
                  </span>
                </div>
              </div>
              <Progress 
                value={calculatePercentage(metrics.primerContacto.llamadaGrabada, metrics.primerContacto.total)} 
                className="h-2"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Lugar tranquilo verificado</span>
                <div className="flex items-center gap-2">
                  {getStatusIcon(calculatePercentage(metrics.primerContacto.lugarTranquilo, metrics.primerContacto.total))}
                  <span className={`text-sm font-medium ${getStatusColor(calculatePercentage(metrics.primerContacto.lugarTranquilo, metrics.primerContacto.total))}`}>
                    {calculatePercentage(metrics.primerContacto.lugarTranquilo, metrics.primerContacto.total)}%
                  </span>
                </div>
              </div>
              <Progress 
                value={calculatePercentage(metrics.primerContacto.lugarTranquilo, metrics.primerContacto.total)} 
                className="h-2"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Motivo principal identificado</span>
                <div className="flex items-center gap-2">
                  {getStatusIcon(calculatePercentage(metrics.primerContacto.motivoPrincipal, metrics.primerContacto.total))}
                  <span className={`text-sm font-medium ${getStatusColor(calculatePercentage(metrics.primerContacto.motivoPrincipal, metrics.primerContacto.total))}`}>
                    {calculatePercentage(metrics.primerContacto.motivoPrincipal, metrics.primerContacto.total)}%
                  </span>
                </div>
              </div>
              <Progress 
                value={calculatePercentage(metrics.primerContacto.motivoPrincipal, metrics.primerContacto.total)} 
                className="h-2"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Reunión agendada</span>
                <div className="flex items-center gap-2">
                  {getStatusIcon(calculatePercentage(metrics.primerContacto.agendarSiguienteReunion, metrics.primerContacto.total))}
                  <span className={`text-sm font-medium ${getStatusColor(calculatePercentage(metrics.primerContacto.agendarSiguienteReunion, metrics.primerContacto.total))}`}>
                    {calculatePercentage(metrics.primerContacto.agendarSiguienteReunion, metrics.primerContacto.total)}%
                  </span>
                </div>
              </div>
              <Progress 
                value={calculatePercentage(metrics.primerContacto.agendarSiguienteReunion, metrics.primerContacto.total)} 
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>

        {/* Llamada de Calificación */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5" />
              Llamada de Calificación
              <Badge variant="outline">{metrics.llamadaCalificacion.total} calificados</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Objeciones solucionadas</span>
                <div className="flex items-center gap-2">
                  {getStatusIcon(calculatePercentage(metrics.llamadaCalificacion.objecionesSolucionadas, metrics.llamadaCalificacion.total))}
                  <span className={`text-sm font-medium ${getStatusColor(calculatePercentage(metrics.llamadaCalificacion.objecionesSolucionadas, metrics.llamadaCalificacion.total))}`}>
                    {calculatePercentage(metrics.llamadaCalificacion.objecionesSolucionadas, metrics.llamadaCalificacion.total)}%
                  </span>
                </div>
              </div>
              <Progress 
                value={calculatePercentage(metrics.llamadaCalificacion.objecionesSolucionadas, metrics.llamadaCalificacion.total)} 
                className="h-2"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Propuesta adecuada</span>
                <div className="flex items-center gap-2">
                  {getStatusIcon(calculatePercentage(metrics.llamadaCalificacion.propuestaAdecuada, metrics.llamadaCalificacion.total))}
                  <span className={`text-sm font-medium ${getStatusColor(calculatePercentage(metrics.llamadaCalificacion.propuestaAdecuada, metrics.llamadaCalificacion.total))}`}>
                    {calculatePercentage(metrics.llamadaCalificacion.propuestaAdecuada, metrics.llamadaCalificacion.total)}%
                  </span>
                </div>
              </div>
              <Progress 
                value={calculatePercentage(metrics.llamadaCalificacion.propuestaAdecuada, metrics.llamadaCalificacion.total)} 
                className="h-2"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Presentación confirmada</span>
                <div className="flex items-center gap-2">
                  {getStatusIcon(calculatePercentage(metrics.llamadaCalificacion.confirmarPresentacion, metrics.llamadaCalificacion.total))}
                  <span className={`text-sm font-medium ${getStatusColor(calculatePercentage(metrics.llamadaCalificacion.confirmarPresentacion, metrics.llamadaCalificacion.total))}`}>
                    {calculatePercentage(metrics.llamadaCalificacion.confirmarPresentacion, metrics.llamadaCalificacion.total)}%
                  </span>
                </div>
              </div>
              <Progress 
                value={calculatePercentage(metrics.llamadaCalificacion.confirmarPresentacion, metrics.llamadaCalificacion.total)} 
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>

        {/* Reunión de Presentación */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Reunión de Presentación
              <Badge variant="outline">{metrics.reunionPresentacion.total} presentaciones</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Estructura seguida</span>
                <div className="flex items-center gap-2">
                  {getStatusIcon(calculatePercentage(metrics.reunionPresentacion.seguirEstructura, metrics.reunionPresentacion.total))}
                  <span className={`text-sm font-medium ${getStatusColor(calculatePercentage(metrics.reunionPresentacion.seguirEstructura, metrics.reunionPresentacion.total))}`}>
                    {calculatePercentage(metrics.reunionPresentacion.seguirEstructura, metrics.reunionPresentacion.total)}%
                  </span>
                </div>
              </div>
              <Progress 
                value={calculatePercentage(metrics.reunionPresentacion.seguirEstructura, metrics.reunionPresentacion.total)} 
                className="h-2"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Objeciones eliminadas</span>
                <div className="flex items-center gap-2">
                  {getStatusIcon(calculatePercentage(metrics.reunionPresentacion.eliminarObjeciones, metrics.reunionPresentacion.total))}
                  <span className={`text-sm font-medium ${getStatusColor(calculatePercentage(metrics.reunionPresentacion.eliminarObjeciones, metrics.reunionPresentacion.total))}`}>
                    {calculatePercentage(metrics.reunionPresentacion.eliminarObjeciones, metrics.reunionPresentacion.total)}%
                  </span>
                </div>
              </div>
              <Progress 
                value={calculatePercentage(metrics.reunionPresentacion.eliminarObjeciones, metrics.reunionPresentacion.total)} 
                className="h-2"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Cierre solicitado</span>
                <div className="flex items-center gap-2">
                  {getStatusIcon(calculatePercentage(metrics.reunionPresentacion.pedirCierre, metrics.reunionPresentacion.total))}
                  <span className={`text-sm font-medium ${getStatusColor(calculatePercentage(metrics.reunionPresentacion.pedirCierre, metrics.reunionPresentacion.total))}`}>
                    {calculatePercentage(metrics.reunionPresentacion.pedirCierre, metrics.reunionPresentacion.total)}%
                  </span>
                </div>
              </div>
              <Progress 
                value={calculatePercentage(metrics.reunionPresentacion.pedirCierre, metrics.reunionPresentacion.total)} 
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>

        {/* Reunión de Seguimiento/Cierre */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Reunión de Cierre/Seguimiento
              <Badge variant="outline">{metrics.reunionSeguimiento.total} seguimientos</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Dudas aclaradas</span>
                <div className="flex items-center gap-2">
                  {getStatusIcon(calculatePercentage(metrics.reunionSeguimiento.aclararDudas, metrics.reunionSeguimiento.total))}
                  <span className={`text-sm font-medium ${getStatusColor(calculatePercentage(metrics.reunionSeguimiento.aclararDudas, metrics.reunionSeguimiento.total))}`}>
                    {calculatePercentage(metrics.reunionSeguimiento.aclararDudas, metrics.reunionSeguimiento.total)}%
                  </span>
                </div>
              </div>
              <Progress 
                value={calculatePercentage(metrics.reunionSeguimiento.aclararDudas, metrics.reunionSeguimiento.total)} 
                className="h-2"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Objeciones resueltas</span>
                <div className="flex items-center gap-2">
                  {getStatusIcon(calculatePercentage(metrics.reunionSeguimiento.resolverObjeciones, metrics.reunionSeguimiento.total))}
                  <span className={`text-sm font-medium ${getStatusColor(calculatePercentage(metrics.reunionSeguimiento.resolverObjeciones, metrics.reunionSeguimiento.total))}`}>
                    {calculatePercentage(metrics.reunionSeguimiento.resolverObjeciones, metrics.reunionSeguimiento.total)}%
                  </span>
                </div>
              </div>
              <Progress 
                value={calculatePercentage(metrics.reunionSeguimiento.resolverObjeciones, metrics.reunionSeguimiento.total)} 
                className="h-2"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Cierre final</span>
                <div className="flex items-center gap-2">
                  {getStatusIcon(calculatePercentage(metrics.reunionSeguimiento.pedirCierre, metrics.reunionSeguimiento.total))}
                  <span className={`text-sm font-medium ${getStatusColor(calculatePercentage(metrics.reunionSeguimiento.pedirCierre, metrics.reunionSeguimiento.total))}`}>
                    {calculatePercentage(metrics.reunionSeguimiento.pedirCierre, metrics.reunionSeguimiento.total)}%
                  </span>
                </div>
              </div>
              <Progress 
                value={calculatePercentage(metrics.reunionSeguimiento.pedirCierre, metrics.reunionSeguimiento.total)} 
                className="h-2"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Bono acción rápida</span>
                <div className="flex items-center gap-2">
                  {getStatusIcon(calculatePercentage(metrics.reunionSeguimiento.bonoAccionRapida, metrics.reunionSeguimiento.total))}
                  <span className={`text-sm font-medium ${getStatusColor(calculatePercentage(metrics.reunionSeguimiento.bonoAccionRapida, metrics.reunionSeguimiento.total))}`}>
                    {calculatePercentage(metrics.reunionSeguimiento.bonoAccionRapida, metrics.reunionSeguimiento.total)}%
                  </span>
                </div>
              </div>
              <Progress 
                value={calculatePercentage(metrics.reunionSeguimiento.bonoAccionRapida, metrics.reunionSeguimiento.total)} 
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}