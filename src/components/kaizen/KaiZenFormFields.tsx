import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface KaiZenFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  ageRange: string;
  householdIncome: string;
}

interface KaiZenFormFieldsProps {
  formData: KaiZenFormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (name: string, value: string) => void;
}

const KaiZenFormFields = ({ formData, onInputChange, onSelectChange }: KaiZenFormFieldsProps) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-white/90">First Name *</Label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={onInputChange}
            required
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent/20"
            placeholder="John"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-white/90">Last Name *</Label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={onInputChange}
            required
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent/20"
            placeholder="Doe"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-white/90">Email Address *</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={onInputChange}
          required
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent/20"
          placeholder="john@example.com"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-white/90">Phone Number *</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={onInputChange}
          required
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent/20"
          placeholder="(555) 123-4567"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-white/90">Your Age Range *</Label>
          <Select
            value={formData.ageRange}
            onValueChange={(value) => onSelectChange("ageRange", value)}
          >
            <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-accent">
              <SelectValue placeholder="Select age range" />
            </SelectTrigger>
            <SelectContent className="bg-navy border-white/20 z-[150]">
              <SelectItem value="18-24" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">18-24</SelectItem>
              <SelectItem value="25-34" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">25-34</SelectItem>
              <SelectItem value="35-44" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">35-44</SelectItem>
              <SelectItem value="45-54" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">45-54</SelectItem>
              <SelectItem value="55-60" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">55-60</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-white/90">Household Income *</Label>
          <Select
            value={formData.householdIncome}
            onValueChange={(value) => onSelectChange("householdIncome", value)}
          >
            <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-accent">
              <SelectValue placeholder="Select income range" />
            </SelectTrigger>
            <SelectContent className="bg-navy border-white/20 z-[150]">
              <SelectItem value="100k-150k" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">$100,000 - $150,000</SelectItem>
              <SelectItem value="150k-250k" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">$150,000 - $250,000</SelectItem>
              <SelectItem value="250k-500k" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">$250,000 - $500,000</SelectItem>
              <SelectItem value="500k+" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">$500,000+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
};

export default KaiZenFormFields;
