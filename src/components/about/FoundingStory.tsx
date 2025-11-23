const FoundingStory = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">
              Our Story
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-8" />
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-foreground leading-relaxed mb-6">
              In 2015, The Financial Architects was founded on a simple yet powerful belief: every family deserves access to comprehensive, personalized financial guidance—not just the wealthy few.
            </p>
            
            <p className="text-lg text-foreground leading-relaxed mb-6">
              Our founders, seasoned financial professionals with decades of combined experience, recognized a troubling gap in the industry. Too many hardworking families were navigating complex financial decisions without proper guidance, while traditional wealth management firms focused exclusively on high-net-worth clients.
            </p>

            <p className="text-lg text-foreground leading-relaxed mb-6">
              We set out to change that. Starting with a single office and a commitment to education-first planning, we began building a different kind of financial services firm—one that puts family legacy before transactions, long-term relationships before quarterly quotas, and client education before product sales.
            </p>

            <p className="text-lg text-foreground leading-relaxed">
              Today, with 280+ licensed advisors across 29 nationwide locations, we remain true to that founding vision. We measure our success not in assets under management, but in the peace of mind our clients experience and the financial legacies they build for generations to come.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoundingStory;
