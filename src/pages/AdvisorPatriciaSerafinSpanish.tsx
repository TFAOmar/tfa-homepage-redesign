import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Calendar, 
  Mail, 
  MapPin, 
  Award, 
  Shield, 
  Users, 
  TrendingUp,
  Heart,
  Landmark,
  PiggyBank,
  Scale,
  Globe,
  ArrowRight,
  Languages,
  Target,
  Building2,
  Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SEOHead, JsonLd } from "@/components/seo";
import ScheduleModal from "@/components/advisors/ScheduleModal";
import ContactModal from "@/components/advisors/ContactModal";
import { generatePersonSchema, generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";
import patriciaSerafinImg from "@/assets/advisors/patricia-serafin.jpg";

const AdvisorPatriciaSerafinSpanish = () => {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const specialties = [
    { name: "Bilingüe • Bilingual", isBilingual: true },
    { name: "Educación Financiera", isBilingual: false },
    { name: "Planificación para el Retiro", isBilingual: false },
    { name: "Planificación Patrimonial", isBilingual: false },
    { name: "Estrategias Fiscales", isBilingual: false },
    { name: "Seguros de Vida", isBilingual: false },
    { name: "Planificación Financiera Familiar", isBilingual: false }
  ];

  const services = [
    {
      icon: Target,
      title: "Planificación para el Retiro",
      description: "Construya un plan de retiro seguro que asegure independencia financiera y tranquilidad para sus años dorados."
    },
    {
      icon: Shield,
      title: "Planificación Patrimonial",
      description: "Proteja los activos de su familia y asegure una transferencia de riqueza fluida a las futuras generaciones."
    },
    {
      icon: Building2,
      title: "Estrategias Fiscales",
      description: "Optimice su situación fiscal con estrategias legales que maximicen su patrimonio y minimicen su carga tributaria."
    },
    {
      icon: Heart,
      title: "Seguros de Vida",
      description: "Proteja el futuro financiero de su familia con soluciones de seguro de vida personalizadas a sus necesidades."
    },
    {
      icon: Users,
      title: "Planificación Financiera Familiar",
      description: "Estrategias financieras integrales diseñadas para proteger y hacer crecer la riqueza de su familia a través de generaciones."
    },
    {
      icon: Globe,
      title: "Servicios Bilingües",
      description: "Comunicación completa en inglés y español, asegurando que usted entienda completamente cada aspecto de su plan financiero."
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Llamada de Descubrimiento",
      description: "Comenzamos con una conversación para entender su situación actual, metas y preocupaciones. Sin presión, solo una conversación genuina."
    },
    {
      step: "02",
      title: "Análisis Personalizado",
      description: "Analizo su panorama financiero completo para identificar oportunidades y brechas en su estrategia actual."
    },
    {
      step: "03",
      title: "Presentación de Estrategia",
      description: "Presento un plan claro y personalizado con múltiples opciones, explicando cada recomendación en términos que usted entienda completamente."
    },
    {
      step: "04",
      title: "Implementación y Seguimiento",
      description: "Una vez que esté cómodo, implementamos su plan juntos y mantenemos revisiones regulares para asegurar que su estrategia evolucione con su vida."
    }
  ];

  return (
    <>
      <SEOHead
        title="Patricia Serafin - Estratega Financiera | Asesora Financiera Bilingüe en Chino Hills"
        description="Patricia Serafin es una estratega financiera bilingüe en Chino Hills, CA. Especializada en planificación de retiro, planificación patrimonial y seguros de vida para familias hispanas. Agende su consulta gratuita."
        keywords="asesora financiera bilingüe, planificación financiera en español, seguros de vida hispanos, planificación retiro español, asesora financiera Chino Hills, Patricia Serafin"
        canonical={`${siteConfig.url}/advisors/patricia-serafin/es`}
      />
      <JsonLd data={[
        generateWebPageSchema(
          "Patricia Serafin - Estratega Financiera | The Financial Architects",
          "Patricia Serafin es una estratega financiera bilingüe en Chino Hills, CA. Especializada en planificación de retiro, planificación patrimonial y seguros de vida para familias hispanas.",
          `${siteConfig.url}/advisors/patricia-serafin/es`
        ),
        generatePersonSchema(
          "Patricia Serafin",
          "Estratega Financiera",
          "Patricia Serafin es una estratega financiera bilingüe sirviendo a la comunidad hispana con casi una década de experiencia en planificación de retiro, planificación patrimonial y seguros de vida.",
          patriciaSerafinImg,
          `${siteConfig.url}/advisors/patricia-serafin/es`,
          specialties.map(s => s.name)
        ),
        generateBreadcrumbSchema([
          { name: "Inicio", url: siteConfig.url },
          { name: "Asesores", url: `${siteConfig.url}/advisors` },
          { name: "Patricia Serafin", url: `${siteConfig.url}/advisors/patricia-serafin/es` }
        ])
      ]} />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-slate-900 via-slate-800 to-primary/20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-white space-y-8">
              {/* Language Switcher */}
              <Link 
                to="/advisors/patricia-serafin" 
                className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
              >
                <Languages className="w-4 h-4" />
                <span>English Version</span>
              </Link>

              <div className="space-y-4">
                <Badge variant="secondary" className="bg-primary/20 text-primary-foreground border-primary/30 px-4 py-2">
                  Estratega Financiera • Bilingüe
                </Badge>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  Patricia<br />
                  <span className="text-primary">Serafin</span>
                </h1>
                <p className="text-xl md:text-2xl text-white/80 font-light">
                  Protegiendo Familias a Través de la Claridad Financiera
                </p>
              </div>

              <p className="text-lg text-white/70 leading-relaxed max-w-xl">
                Convirtiéndose en la defensora que deseaba que su familia tuviera—ayudando a individuos y familias a tomar decisiones financieras con confianza antes de que llegue una crisis.
              </p>

              {/* Quick Info */}
              <div className="flex flex-wrap gap-4 text-sm text-white/60">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>Chino Hills, California</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-primary" />
                  <span>Inglés y Español</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-primary" />
                  <span>Licenciada en Vida y Salud</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg"
                  onClick={() => setScheduleModalOpen(true)}
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Agendar Consulta
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg"
                  onClick={() => setContactModalOpen(true)}
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Contáctame
                </Button>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative z-10">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-2xl" />
                <img
                  src={patriciaSerafinImg}
                  alt="Patricia Serafin - Estratega Financiera"
                  className="relative rounded-2xl shadow-2xl w-full max-w-md mx-auto object-cover aspect-[3/4]"
                />
              </div>
              {/* Experience Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 z-20">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">~10</p>
                    <p className="text-sm text-muted-foreground">Años de Experiencia</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Sobre Patricia</Badge>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Una Misión Nacida de la Familia
              </h2>
            </div>
            
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p>
                El camino de Patricia Serafin hacia la industria financiera comenzó con una misión simple: proteger a su familia. Como mexicoamericana criada con fuertes valores familiares, vio de primera mano cómo la falta de educación financiera puede dejar a familias trabajadoras vulnerables, a menudo descubriendo sus opciones solo cuando ya es demasiado tarde.
              </p>
              <p>
                Originalmente siguiendo una carrera en derecho, Patricia se sintió llamada en una dirección diferente después de reconocer una brecha crítica en la industria financiera. Demasiadas personas estaban siendo aprovechadas, mal informadas, o dejadas sin soluciones reales. Cambió su camino hacia la estrategia financiera para convertirse en la defensora que deseaba que su propia familia hubiera tenido.
              </p>
              <p>
                Con casi una década de experiencia, Patricia es conocida por su habilidad para identificar las soluciones correctas para cada cliente—nunca soluciones genéricas, siempre intencionales. Su enfoque está arraigado en la educación, transparencia y pensamiento a largo plazo, empoderando a individuos y familias a tomar decisiones financieras con confianza antes de que llegue una crisis.
              </p>
              <p className="font-medium text-foreground">
                Fluida en inglés y español, Patricia sirve con orgullo a comunidades bilingües, asegurando que cada cliente se sienta comprendido, protegido y preparado. Su pasión radica en ayudar a las personas a construir claridad, seguridad y tranquilidad a través de una arquitectura financiera bien pensada.
              </p>
            </div>

            {/* Specialties */}
            <div className="mt-12">
              <h3 className="text-xl font-semibold text-foreground mb-4 text-center">Áreas de Especialización</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {specialties.map((specialty, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className={specialty.isBilingual 
                      ? "px-4 py-2 text-sm font-semibold bg-amber-500/20 text-amber-600 border-amber-500/40" 
                      : "px-4 py-2 text-sm bg-primary/10 text-primary border-primary/20"
                    }
                  >
                    {specialty.isBilingual && <Globe className="w-4 h-4 mr-1.5 inline" />}
                    {specialty.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Servicios</Badge>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Cómo Puedo Ayudarle
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Soluciones financieras personalizadas diseñadas para proteger y hacer crecer su legado familiar
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Proceso</Badge>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Trabajando Juntos
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Un proceso simple y transparente diseñado para brindarle claridad y confianza
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent -translate-x-4" />
                )}
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">{step.step}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-6">
              ¿Lista para Construir Claridad, Seguridad y Tranquilidad?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Agende una consulta gratuita y creemos un plan adaptado a sus metas.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg"
                onClick={() => setScheduleModalOpen(true)}
              >
                Agende Su Consulta Gratuita
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="px-8 py-6 text-lg"
                asChild
              >
                <Link to="/life-insurance-application">
                  <Shield className="w-5 h-5 mr-2" />
                  Solicitar Seguro de Vida
                </Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              Sin compromiso. Solo una conversación sobre su futuro.
            </p>
          </div>
        </div>
      </section>

      {/* Modals */}
      <ScheduleModal
        open={scheduleModalOpen}
        onOpenChange={setScheduleModalOpen}
        advisorName="Patricia Serafin"
        advisorImage={patriciaSerafinImg}
      />
      <ContactModal
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
        advisorName="Patricia Serafin"
        advisorEmail="patricia@tfainsuranceadvisors.com"
        advisorImage={patriciaSerafinImg}
      />
    </>
  );
};

export default AdvisorPatriciaSerafinSpanish;
