import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useHoneypot, honeypotClassName } from "@/hooks/useHoneypot";
import { submitForm } from "@/lib/formSubmit";

type Lang = "en" | "es";

const COPY = {
  en: {
    firstName: "First Name", lastName: "Last Name", email: "Email", phone: "Phone",
    firstNamePh: "Your first name", lastNamePh: "Your last name", emailPh: "your@email.com", phonePh: "(555) 123-4567",
    maritalStatus: "Marital Status", ownsProperty: "Do you own real estate?",
    estateValue: "Estimated Estate Value", contactPref: "Preferred Contact Method",
    bestTime: "Best Time to Call (Optional)", additional: "Additional Information (Optional)",
    additionalPh: "Tell us about your estate planning goals or any specific concerns...",
    selectStatus: "Select status", selectOption: "Select option", selectRange: "Select range",
    selectPref: "Select preference", selectTime: "Select time",
    single: "Single", married: "Married", divorced: "Divorced", widowed: "Widowed",
    yes: "Yes", no: "No", multiple: "Yes, multiple properties",
    under250: "Under $250,000", r250_500: "$250,000 - $500,000", r500_1m: "$500,000 - $1,000,000",
    r1_2m: "$1,000,000 - $2,000,000", r2_5m: "$2,000,000 - $5,000,000", over5m: "Over $5,000,000",
    phoneCall: "Phone Call", emailOpt: "Email", textMsg: "Text Message",
    morning: "Morning (9am - 12pm)", afternoon: "Afternoon (12pm - 5pm)", evening: "Evening (5pm - 8pm)",
    submit: "Get Your Free Consultation", submitting: "Submitting...",
    disclaimer: "By submitting this form, you agree to be contacted by a TFA representative. Your information is secure and will never be shared.",
    successToast: "Thank you! An estate planning specialist will contact you shortly.",
    honeypotToast: "Thank you! We'll be in touch soon.",
    errorToast: "Something went wrong. Please try again or call us directly.",
    errFirst: "First name is required", errLast: "Last name is required",
    errEmail: "Valid email is required", errPhone: "Valid phone number is required",
    errMarital: "Please select your marital status", errOwns: "Please select an option",
    errEstate: "Please select an estate value range", errContact: "Please select contact preference",
    required: "*",
  },
  es: {
    firstName: "Nombre", lastName: "Apellido", email: "Correo electrónico", phone: "Teléfono",
    firstNamePh: "Su nombre", lastNamePh: "Su apellido", emailPh: "su@correo.com", phonePh: "(555) 123-4567",
    maritalStatus: "Estado Civil", ownsProperty: "¿Es dueño de bienes raíces?",
    estateValue: "Valor Estimado del Patrimonio", contactPref: "Método de Contacto Preferido",
    bestTime: "Mejor Hora para Llamar (Opcional)", additional: "Información Adicional (Opcional)",
    additionalPh: "Cuéntenos sobre sus metas de planificación patrimonial o cualquier inquietud específica...",
    selectStatus: "Seleccione estado", selectOption: "Seleccione una opción", selectRange: "Seleccione un rango",
    selectPref: "Seleccione preferencia", selectTime: "Seleccione hora",
    single: "Soltero(a)", married: "Casado(a)", divorced: "Divorciado(a)", widowed: "Viudo(a)",
    yes: "Sí", no: "No", multiple: "Sí, varias propiedades",
    under250: "Menos de $250,000", r250_500: "$250,000 - $500,000", r500_1m: "$500,000 - $1,000,000",
    r1_2m: "$1,000,000 - $2,000,000", r2_5m: "$2,000,000 - $5,000,000", over5m: "Más de $5,000,000",
    phoneCall: "Llamada Telefónica", emailOpt: "Correo Electrónico", textMsg: "Mensaje de Texto",
    morning: "Mañana (9am - 12pm)", afternoon: "Tarde (12pm - 5pm)", evening: "Noche (5pm - 8pm)",
    submit: "Obtenga su Consulta Gratuita", submitting: "Enviando...",
    disclaimer: "Al enviar este formulario, acepta ser contactado por un representante de TFA. Su información es segura y nunca será compartida.",
    successToast: "¡Gracias! Un especialista en planificación patrimonial se comunicará con usted en breve.",
    honeypotToast: "¡Gracias! Nos pondremos en contacto pronto.",
    errorToast: "Algo salió mal. Inténtelo de nuevo o llámenos directamente.",
    errFirst: "El nombre es obligatorio", errLast: "El apellido es obligatorio",
    errEmail: "Se requiere un correo válido", errPhone: "Se requiere un número de teléfono válido",
    errMarital: "Seleccione su estado civil", errOwns: "Seleccione una opción",
    errEstate: "Seleccione un rango de valor patrimonial", errContact: "Seleccione método de contacto",
    required: "*",
  },
} as const;

interface EstatePlanningFormProps {
  lang?: Lang;
}

export const EstatePlanningForm = ({ lang = "en" }: EstatePlanningFormProps) => {
  const t = COPY[lang];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { honeypotProps, isBot, honeypotValue } = useHoneypot();

  const formSchema = useMemo(() => z.object({
    firstName: z.string().min(1, t.errFirst).max(50),
    lastName: z.string().min(1, t.errLast).max(50),
    email: z.string().email(t.errEmail).max(255),
    phone: z.string().min(10, t.errPhone).max(20),
    maritalStatus: z.string().min(1, t.errMarital),
    ownsProperty: z.string().min(1, t.errOwns),
    estateValue: z.string().min(1, t.errEstate),
    contactPreference: z.string().min(1, t.errContact),
    bestTimeToCall: z.string().optional(),
    additionalInfo: z.string().max(500).optional(),
  }), [t]);

  type FormData = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    if (isBot()) {
      toast.success(t.honeypotToast);
      reset();
      return;
    }

    setIsSubmitting(true);

    try {
      const notes = [
        `Marital Status: ${data.maritalStatus}`,
        `Owns Property: ${data.ownsProperty}`,
        `Estate Value: ${data.estateValue}`,
        `Contact Preference: ${data.contactPreference}`,
        data.bestTimeToCall ? `Best Time to Call: ${data.bestTimeToCall}` : null,
        data.additionalInfo ? `Additional Info: ${data.additionalInfo}` : null,
        `Language: ${lang === "es" ? "Spanish" : "English"}`,
      ].filter(Boolean).join("\n");

      const response = await submitForm({
        form_name: lang === "es" ? "Estate Planning Inquiry (Spanish)" : "Estate Planning Inquiry",
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        notes,
        tags: lang === "es" ? ["Estate Planning", "Spanish"] : ["Estate Planning"],
        honeypot: honeypotValue,
      });

      if (!response.ok) throw new Error(response.error);

      toast.success(t.successToast);
      reset();
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error(t.errorToast);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Honeypot field */}
      <div className={honeypotClassName}>
        <input
          type="text"
          name="website"
          {...honeypotProps}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-white/90">{t.firstName} *</Label>
          <Input
            id="firstName"
            {...register("firstName")}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent/20"
            placeholder={t.firstNamePh}
          />
          {errors.firstName && (
            <p className="text-red-400 text-sm">{errors.firstName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-white/90">{t.lastName} *</Label>
          <Input
            id="lastName"
            {...register("lastName")}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent/20"
            placeholder={t.lastNamePh}
          />
          {errors.lastName && (
            <p className="text-red-400 text-sm">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-white/90">{t.email} *</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent/20"
            placeholder={t.emailPh}
          />
          {errors.email && (
            <p className="text-red-400 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-white/90">{t.phone} *</Label>
          <Input
            id="phone"
            type="tel"
            {...register("phone")}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent/20"
            placeholder={t.phonePh}
          />
          {errors.phone && (
            <p className="text-red-400 text-sm">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-white/90">{t.maritalStatus} *</Label>
          <Select onValueChange={(value) => setValue("maritalStatus", value)}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-accent">
              <SelectValue placeholder={t.selectStatus} />
            </SelectTrigger>
            <SelectContent className="bg-navy border-white/20 z-[150]">
              <SelectItem value="single" className="text-white hover:bg-white/10">{t.single}</SelectItem>
              <SelectItem value="married" className="text-white hover:bg-white/10">{t.married}</SelectItem>
              <SelectItem value="divorced" className="text-white hover:bg-white/10">{t.divorced}</SelectItem>
              <SelectItem value="widowed" className="text-white hover:bg-white/10">{t.widowed}</SelectItem>
            </SelectContent>
          </Select>
          {errors.maritalStatus && (
            <p className="text-red-400 text-sm">{errors.maritalStatus.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-white/90">{t.ownsProperty} *</Label>
          <Select onValueChange={(value) => setValue("ownsProperty", value)}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-accent">
              <SelectValue placeholder={t.selectOption} />
            </SelectTrigger>
            <SelectContent className="bg-navy border-white/20 z-[150]">
              <SelectItem value="yes" className="text-white hover:bg-white/10">{t.yes}</SelectItem>
              <SelectItem value="no" className="text-white hover:bg-white/10">{t.no}</SelectItem>
              <SelectItem value="multiple" className="text-white hover:bg-white/10">{t.multiple}</SelectItem>
            </SelectContent>
          </Select>
          {errors.ownsProperty && (
            <p className="text-red-400 text-sm">{errors.ownsProperty.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-white/90">{t.estateValue} *</Label>
          <Select onValueChange={(value) => setValue("estateValue", value)}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-accent">
              <SelectValue placeholder={t.selectRange} />
            </SelectTrigger>
            <SelectContent className="bg-navy border-white/20 z-[150]">
              <SelectItem value="under-250k" className="text-white hover:bg-white/10">{t.under250}</SelectItem>
              <SelectItem value="250k-500k" className="text-white hover:bg-white/10">{t.r250_500}</SelectItem>
              <SelectItem value="500k-1m" className="text-white hover:bg-white/10">{t.r500_1m}</SelectItem>
              <SelectItem value="1m-2m" className="text-white hover:bg-white/10">{t.r1_2m}</SelectItem>
              <SelectItem value="2m-5m" className="text-white hover:bg-white/10">{t.r2_5m}</SelectItem>
              <SelectItem value="over-5m" className="text-white hover:bg-white/10">{t.over5m}</SelectItem>
            </SelectContent>
          </Select>
          {errors.estateValue && (
            <p className="text-red-400 text-sm">{errors.estateValue.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-white/90">{t.contactPref} *</Label>
          <Select onValueChange={(value) => setValue("contactPreference", value)}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-accent">
              <SelectValue placeholder={t.selectPref} />
            </SelectTrigger>
            <SelectContent className="bg-navy border-white/20 z-[150]">
              <SelectItem value="phone" className="text-white hover:bg-white/10">{t.phoneCall}</SelectItem>
              <SelectItem value="email" className="text-white hover:bg-white/10">{t.emailOpt}</SelectItem>
              <SelectItem value="text" className="text-white hover:bg-white/10">{t.textMsg}</SelectItem>
            </SelectContent>
          </Select>
          {errors.contactPreference && (
            <p className="text-red-400 text-sm">{errors.contactPreference.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-white/90">{t.bestTime}</Label>
        <Select onValueChange={(value) => setValue("bestTimeToCall", value)}>
          <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-accent">
            <SelectValue placeholder={t.selectTime} />
          </SelectTrigger>
          <SelectContent className="bg-navy border-white/20 z-[150]">
            <SelectItem value="morning" className="text-white hover:bg-white/10">{t.morning}</SelectItem>
            <SelectItem value="afternoon" className="text-white hover:bg-white/10">{t.afternoon}</SelectItem>
            <SelectItem value="evening" className="text-white hover:bg-white/10">{t.evening}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="additionalInfo" className="text-white/90">{t.additional}</Label>
        <Textarea
          id="additionalInfo"
          {...register("additionalInfo")}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent/20 min-h-[100px]"
          placeholder={t.additionalPh}
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-primary-cta py-6 text-lg"
      >
        {isSubmitting ? t.submitting : t.submit}
      </Button>

      <p className="text-white/60 text-xs text-center">
        {t.disclaimer}
      </p>
    </form>
  );
};