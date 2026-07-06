import { Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Lock, Users, FileText, Scale, CheckCircle, ChevronRight } from "lucide-react";
import { EstatePlanningForm } from "@/components/estate-planning/EstatePlanningForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SEOHead, JsonLd } from "@/components/seo";
import { generateServiceSchema, generateFAQSchema, generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";

const estatePlanningFaqs = [
  { question: "¿Qué es un Fideicomiso en Vida (Living Trust)?", answer: "Un Fideicomiso en Vida es un documento legal que coloca sus bienes en un fideicomiso durante su vida. Usted mantiene el control total como fideicomisario y, al fallecer, sus bienes se transfieren directamente a sus beneficiarios sin pasar por el proceso de sucesión (probate)." },
  { question: "¿En qué se diferencia un Fideicomiso en Vida de un Testamento?", answer: "Aunque ambos documentos indican cómo distribuir sus bienes, un testamento debe pasar por la corte de sucesión: un proceso público, costoso y lento. Un Fideicomiso en Vida evita la sucesión por completo, manteniendo sus asuntos privados y permitiendo la transferencia inmediata de bienes." },
  { question: "¿Necesito un Fideicomiso en Vida si ya tengo un Testamento?", answer: "Un testamento por sí solo no evita la sucesión. Si posee bienes raíces, tiene activos superiores a $184,500 (en California) o valora la privacidad, un Fideicomiso en Vida ofrece ventajas significativas." },
  { question: "¿Cuánto cuesta la planificación patrimonial?", answer: "Los costos varían según la complejidad. Ofrecemos precios competitivos y podemos hablar de las opciones durante su consulta gratuita. Suele ser mucho menos de lo que su familia pagaría en gastos de sucesión." },
];

const EN_URL = `${siteConfig.url}/services/estate-planning`;
const ES_URL = `${siteConfig.url}/es/services/estate-planning`;

const EstatePlanningES = () => {
  const scrollToForm = () => {
    document.getElementById("consultation-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTrusts = () => {
    document.getElementById("living-trusts")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <SEOHead
        title="Planificación Patrimonial y Fideicomisos en Vida"
        description="Proteja su legado con planificación patrimonial y fideicomisos en vida. Evite la sucesión, mantenga la privacidad y asegure que se cumplan sus deseos. Consulta gratuita en Chino Hills."
        canonical={ES_URL}
        keywords="planificación patrimonial, fideicomiso en vida, evitar sucesión, testamentos, revisión de beneficiarios, planificación patrimonial en español"
      >
        <html lang="es" />
        <meta property="og:locale" content="es_US" />
        <link rel="alternate" hrefLang="en" href={EN_URL} />
        <link rel="alternate" hrefLang="es" href={ES_URL} />
        <link rel="alternate" hrefLang="x-default" href={EN_URL} />
      </SEOHead>
      <JsonLd data={[
        generateWebPageSchema("Planificación Patrimonial y Fideicomisos en Vida", "Servicios integrales de planificación patrimonial que incluyen fideicomisos en vida, testamentos y revisión de beneficiarios para proteger su legado.", ES_URL),
        generateServiceSchema("Planificación Patrimonial", "Planificación patrimonial y Fideicomisos en Vida que protegen a su familia, evitan la sucesión y aseguran que sus deseos se cumplan tal como los planeó.", ES_URL),
        generateBreadcrumbSchema([
          { name: "Inicio", url: siteConfig.url },
          { name: "Servicios", url: `${siteConfig.url}/services` },
          { name: "Planificación Patrimonial", url: ES_URL }
        ]),
        generateFAQSchema(estatePlanningFaqs)
      ]} />
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-24 pb-20 md:pt-32 md:pb-32 bg-gradient-to-b from-navy via-primary to-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(228,181,72,0.08),transparent_50%)]" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Language Toggle */}
            <div className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/5 backdrop-blur px-1 py-1 mb-6 text-sm">
              <Link to="/services/estate-planning" className="px-3 py-1 rounded-full text-white/70 hover:text-white transition-colors">EN</Link>
              <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground font-medium">ES</span>
            </div>
            <span className="inline-block px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6 ml-2">
              Planificación Patrimonial y Fideicomisos en Vida
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
              Proteja lo que ha construido.
              <br />
              <span className="text-accent">Planifique su legado.</span>
            </h1>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Planificación patrimonial y Fideicomisos en Vida que protegen a su familia,
              evitan la sucesión (probate) y aseguran que sus deseos se cumplan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={scrollToForm} size="lg" className="btn-primary-cta px-8 py-6 text-lg">
                Comience su Plan
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button onClick={scrollToTrusts} variant="hero" size="lg" className="px-8 py-6 text-lg">
                Conozca los Fideicomisos en Vida
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary/30 border-y border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">67%</div>
              <p className="text-muted-foreground text-sm">de los estadounidenses no tienen plan patrimonial</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">$50K+</div>
              <p className="text-muted-foreground text-sm">costo promedio de sucesión evitado</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">18 meses</div>
              <p className="text-muted-foreground text-sm">duración típica del proceso de sucesión</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">100%</div>
              <p className="text-muted-foreground text-sm">privado con un Fideicomiso en Vida</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Estate Planning Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-tight">
              Por qué es importante la planificación patrimonial
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Sin una planificación patrimonial adecuada, su familia puede enfrentar largos procesos judiciales,
              exposición pública de sus registros y gastos innecesarios. Un plan patrimonial bien elaborado
              protege a sus seres queridos y asegura que se cumplan sus deseos.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-2xl p-8 hover:border-accent/30 transition-colors">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                <Shield className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Proteja a su Familia</h3>
              <p className="text-muted-foreground">
                Asegure que sus seres queridos estén cuidados y reciban su herencia sin
                demoras ni complicaciones.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 hover:border-accent/30 transition-colors">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                <Lock className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Mantenga la Privacidad</h3>
              <p className="text-muted-foreground">
                Mantenga sus asuntos financieros privados. A diferencia de los testamentos, los fideicomisos
                no se convierten en registro público.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 hover:border-accent/30 transition-colors">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                <Scale className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Evite la Sucesión</h3>
              <p className="text-muted-foreground">
                Evite el costoso y prolongado proceso de sucesión, ahorrándole a su familia
                miles de dólares en gastos legales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-tight">
              Nuestros Servicios de Planificación Patrimonial
            </h2>
            <p className="text-lg text-muted-foreground">
              Soluciones integrales para proteger su legado y brindarle tranquilidad.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-card border border-border rounded-2xl p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <FileText className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Fideicomisos en Vida</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Evite la sucesión, mantenga la privacidad y conserve el control de sus bienes durante su vida
                y después.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Testamentos y Documentos de Legado</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Documente legalmente sus deseos con testamentos debidamente redactados,
                poderes notariales y directivas de atención médica.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Revisión de Beneficiarios</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Coordine sus cuentas y pólizas con su plan patrimonial para asegurar
                una transferencia de bienes sin contratiempos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Living Trust Deep Dive */}
      <section id="living-trusts" className="py-20 md:py-32 scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
              Servicio Destacado
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-tight">
              El Poder de un Fideicomiso en Vida
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Un Fideicomiso en Vida es una de las herramientas más eficaces para proteger sus bienes
              y garantizar la seguridad financiera de su familia.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                <Scale className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Evita la Sucesión</h3>
              <p className="text-muted-foreground text-sm">
                Sus bienes se transfieren directamente a los beneficiarios sin intervención judicial.
              </p>
            </div>

            <div className="bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                <Lock className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Protege la Privacidad</h3>
              <p className="text-muted-foreground text-sm">
                A diferencia de los testamentos, los fideicomisos no forman parte del registro público.
              </p>
            </div>

            <div className="bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Mantiene el Control</h3>
              <p className="text-muted-foreground text-sm">
                Usted conserva el control total de sus bienes durante toda su vida.
              </p>
            </div>

            <div className="bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Reduce el Estrés</h3>
              <p className="text-muted-foreground text-sm">
                Evítele a su familia la carga emocional de enfrentar la corte de sucesión.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-tight">
              Cómo Funciona
            </h2>
            <p className="text-lg text-muted-foreground">
              Comenzar su plan patrimonial es sencillo y directo.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="relative text-center">
              <div className="w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Consulta Gratuita</h3>
              <p className="text-muted-foreground">
                Conversaremos sobre su situación familiar, bienes y metas sin ningún compromiso.
              </p>
              <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-accent to-transparent" />
            </div>

            <div className="relative text-center">
              <div className="w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Plan Personalizado</h3>
              <p className="text-muted-foreground">
                Reciba recomendaciones de planificación patrimonial adaptadas a sus necesidades únicas.
              </p>
              <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-accent to-transparent" />
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Implementación</h3>
              <p className="text-muted-foreground">
                Trabaje con nuestros socios de confianza para ejecutar su plan y proteger a su familia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
                Preguntas Frecuentes
              </h2>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-card border border-border rounded-xl px-6">
                <AccordionTrigger className="text-left font-medium">
                  ¿Qué es un Fideicomiso en Vida?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Un Fideicomiso en Vida es un documento legal que coloca sus bienes en un fideicomiso durante su
                  vida. Usted mantiene el control total como fideicomisario y, al fallecer, sus
                  bienes se transfieren directamente a sus beneficiarios sin pasar por el proceso de sucesión.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-card border border-border rounded-xl px-6">
                <AccordionTrigger className="text-left font-medium">
                  ¿En qué se diferencia un Fideicomiso en Vida de un Testamento?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Aunque ambos documentos especifican cómo distribuir sus bienes, un testamento debe pasar por
                  la corte de sucesión: un proceso público, costoso y lento. Un Fideicomiso en Vida
                  evita la sucesión por completo, manteniendo sus asuntos privados y permitiendo la transferencia inmediata.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-card border border-border rounded-xl px-6">
                <AccordionTrigger className="text-left font-medium">
                  ¿Necesito un Fideicomiso en Vida si ya tengo un Testamento?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Un testamento por sí solo no evita la sucesión. Si posee bienes raíces, tiene activos superiores a $184,500
                  (en California) o valora la privacidad, un Fideicomiso en Vida ofrece ventajas significativas.
                  La mayoría de los planes patrimoniales completos incluyen ambos documentos trabajando juntos.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-card border border-border rounded-xl px-6">
                <AccordionTrigger className="text-left font-medium">
                  ¿Cuánto cuesta la planificación patrimonial?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Los costos varían según la complejidad, pero un paquete completo de Fideicomiso en Vida generalmente
                  cuesta entre $1,500 y $3,500. Compare esto con los costos de sucesión del 3% al 7% del valor de su patrimonio
                  —a menudo decenas de miles de dólares— y la inversión en una planificación adecuada se vuelve evidente.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-card border border-border rounded-xl px-6">
                <AccordionTrigger className="text-left font-medium">
                  ¿Quién debería tener un plan patrimonial?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Cualquier persona que posea bienes, tenga hijos o quiera proteger a su familia debería tener
                  un plan patrimonial. Es especialmente importante si está casado, es dueño de casa, tiene cuentas de retiro,
                  o desea asegurarse de que se respeten sus deseos médicos en caso de incapacidad.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="consultation-form" className="py-20 md:py-32 bg-gradient-to-b from-navy to-primary scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                Comience a Planificar su Legado Hoy
              </h2>
              <p className="text-lg text-white/80">
                Solicite su consulta gratuita y dé el primer paso para proteger a su familia.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 md:p-10">
              <EstatePlanningForm />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-background border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            No Deje el Futuro de su Familia al Azar
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Cada día sin un plan patrimonial es un día en que su familia no está protegida.
            Cambiemos eso juntos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button onClick={scrollToForm} className="btn-primary-cta px-8 py-6">
              Empiece Ahora
            </Button>
            <a href="tel:8883505396" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <Phone className="h-5 w-5" />
              <span className="font-medium">(888) 350-5396</span>
            </a>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default EstatePlanningES;