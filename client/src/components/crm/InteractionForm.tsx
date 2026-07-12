import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const interactionFormSchema = z.object({
  customerId: z.number().min(1, "Debes seleccionar un cliente"),
  projectId: z.number().optional(),
  type: z.enum(["phone_call", "email", "meeting", "whatsapp", "video_call", "site_visit", "other"]),
  subject: z.string().min(3, "El asunto debe tener al menos 3 caracteres"),
  content: z.string().min(10, "El contenido debe tener al menos 10 caracteres"),
  date: z.string().min(1, "La fecha es requerida"),
  createdBy: z.string().default("patricio.becar"),
  followUpDate: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]).default("medium")
});

type InteractionFormData = z.infer<typeof interactionFormSchema>;

interface InteractionFormProps {
  onSuccess?: () => void;
  initialData?: Partial<InteractionFormData>;
  interactionId?: number;
  preSelectedCustomerId?: number;
  preSelectedProjectId?: number;
}

interface Customer {
  id: number;
  name: string;
  company?: string;
}

interface Project {
  id: number;
  title: string;
  customerId: number;
}

export function InteractionForm({ 
  onSuccess, 
  initialData, 
  interactionId,
  preSelectedCustomerId,
  preSelectedProjectId 
}: InteractionFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Queries para obtener datos
  const { data: customers = [] } = useQuery<Customer[]>({
    queryKey: ['/api/crm/customers'],
  });

  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: ['/api/crm/projects'],
  });

  const form = useForm<InteractionFormData>({
    resolver: zodResolver(interactionFormSchema),
    defaultValues: {
      customerId: initialData?.customerId || preSelectedCustomerId || 0,
      projectId: initialData?.projectId || preSelectedProjectId || undefined,
      type: initialData?.type || "phone_call",
      subject: initialData?.subject || "",
      content: initialData?.content || "",
      date: initialData?.date || new Date().toISOString().slice(0, 16),
      createdBy: initialData?.createdBy || "patricio.becar",
      followUpDate: initialData?.followUpDate || "",
      priority: initialData?.priority || "medium"
    }
  });

  const selectedCustomerId = form.watch("customerId");
  const customerProjects = projects.filter(p => p.customerId === selectedCustomerId);

  const createInteractionMutation = useMutation({
    mutationFn: (data: InteractionFormData) => 
      apiRequest('POST', '/api/crm/interactions', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/crm/interactions'] });
      queryClient.invalidateQueries({ queryKey: ['/api/crm/reports/dashboard'] });
      toast({
        title: "Interacción registrada",
        description: "La interacción ha sido registrada exitosamente."
      });
      form.reset();
      onSuccess?.();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "No se pudo registrar la interacción. Intenta nuevamente.",
        variant: "destructive"
      });
    }
  });

  const updateInteractionMutation = useMutation({
    mutationFn: (data: InteractionFormData) => 
      apiRequest('PUT', `/api/crm/interactions/${interactionId}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/crm/interactions'] });
      queryClient.invalidateQueries({ queryKey: ['/api/crm/reports/dashboard'] });
      toast({
        title: "Interacción actualizada",
        description: "Los cambios han sido guardados exitosamente."
      });
      onSuccess?.();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "No se pudo actualizar la interacción. Intenta nuevamente.",
        variant: "destructive"
      });
    }
  });

  const onSubmit = (data: InteractionFormData) => {
    setIsLoading(true);
    if (interactionId) {
      updateInteractionMutation.mutate(data);
    } else {
      createInteractionMutation.mutate(data);
    }
    setIsLoading(false);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{interactionId ? 'Editar Interacción' : 'Nueva Interacción'}</CardTitle>
        <CardDescription>
          {interactionId ? 'Actualiza los detalles de la interacción' : 'Registra una nueva interacción con el cliente'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="customerId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cliente *</FormLabel>
                    <Select onValueChange={(value) => field.onChange(Number(value))} value={field.value?.toString()}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona cliente" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {customers.map((customer) => (
                          <SelectItem key={customer.id} value={customer.id.toString()}>
                            {customer.name} {customer.company && `(${customer.company})`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="projectId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Proyecto (Opcional)</FormLabel>
                    <Select 
                      onValueChange={(value) => field.onChange(value ? Number(value) : undefined)} 
                      value={field.value?.toString() || ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona proyecto" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="">Sin proyecto específico</SelectItem>
                        {customerProjects.map((project) => (
                          <SelectItem key={project.id} value={project.id.toString()}>
                            {project.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Interacción *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="phone_call">Llamada Telefónica</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="meeting">Reunión Presencial</SelectItem>
                        <SelectItem value="whatsapp">WhatsApp</SelectItem>
                        <SelectItem value="video_call">Video Llamada</SelectItem>
                        <SelectItem value="site_visit">Visita a Terreno</SelectItem>
                        <SelectItem value="other">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prioridad</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Prioridad" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Baja</SelectItem>
                        <SelectItem value="medium">Media</SelectItem>
                        <SelectItem value="high">Alta</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha y Hora *</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="followUpDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha de Seguimiento</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Asunto *</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Seguimiento cotización proyecto Las Condes" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contenido *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe detalladamente la interacción..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-4">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => form.reset()}
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                disabled={isLoading || createInteractionMutation.isPending || updateInteractionMutation.isPending}
              >
                {isLoading ? "Guardando..." : (interactionId ? "Actualizar Interacción" : "Registrar Interacción")}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}