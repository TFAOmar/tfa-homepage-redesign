import { Phone, Mail, Clock, MapPin } from "lucide-react";
import teamPhoto from "@/assets/team-photo.jpg";
import { Link } from "react-router-dom";

const ContactInfo = () => {
  return (
    <div className="space-y-8">
      {/* Team Photo */}
      <div className="glass rounded-2xl overflow-hidden">
        <img 
          src={teamPhoto} 
          alt="TFA Advisor Team" 
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h3 className="text-2xl font-bold text-navy mb-2">
            Our Expert Team
          </h3>
          <p className="text-muted-foreground">
            280+ licensed advisors ready to guide you toward financial success
          </p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="glass p-8 rounded-2xl space-y-6">
        <h3 className="text-2xl font-bold text-navy mb-4">
          Get In Touch
        </h3>

        {/* Phone */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
            <Phone className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">Phone</h4>
            <a 
              href="tel:8883505396" 
              className="text-lg text-accent hover:underline"
            >
              (888) 350-5396
            </a>
            <p className="text-sm text-muted-foreground">Toll-free nationwide</p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
            <Mail className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">Email</h4>
            <a 
              href="mailto:info@tfainsuranceadvisors.com" 
              className="text-lg text-accent hover:underline"
            >
              info@tfainsuranceadvisors.com
            </a>
            <p className="text-sm text-muted-foreground">We respond within 24 hours</p>
          </div>
        </div>

        {/* Business Hours */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
            <Clock className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">Business Hours</h4>
            <div className="space-y-1 text-foreground">
              <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
              <p>Saturday: 9:00 AM - 2:00 PM</p>
              <p className="text-sm text-muted-foreground">Closed Sundays</p>
            </div>
          </div>
        </div>

        {/* Headquarters */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
            <MapPin className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">Headquarters</h4>
            <p className="text-foreground">13890 Peyton Dr</p>
            <p className="text-foreground mb-2">Chino Hills, CA 91709</p>
            <Link 
              to="/locations"
              className="text-accent hover:underline text-sm font-medium"
            >
              View all 29 office locations →
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass p-6 rounded-xl text-center">
          <p className="text-3xl font-bold text-accent mb-1">280+</p>
          <p className="text-sm text-muted-foreground">Licensed Advisors</p>
        </div>
        <div className="glass p-6 rounded-xl text-center">
          <p className="text-3xl font-bold text-accent mb-1">29</p>
          <p className="text-sm text-muted-foreground">Office Locations</p>
        </div>
        <div className="glass p-6 rounded-xl text-center">
          <p className="text-3xl font-bold text-accent mb-1">10+</p>
          <p className="text-sm text-muted-foreground">Years Experience</p>
        </div>
        <div className="glass p-6 rounded-xl text-center">
          <p className="text-3xl font-bold text-accent mb-1">$2.5B+</p>
          <p className="text-sm text-muted-foreground">Assets Guided</p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
