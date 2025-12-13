export const testData = {
  validContact: {
    name: 'John Test User',
    email: 'john.test@example.com',
    phone: '(555) 123-4567',
    message: 'This is a test message for the contact form.',
  },
  invalidContact: {
    name: '',
    email: 'invalid-email',
    phone: '123',
    message: '',
  },
  calculatorInputs: {
    compoundGrowth: {
      initialInvestment: 10000,
      monthlyContribution: 500,
      annualReturn: 7,
      years: 30,
    },
    retirement: {
      currentAge: 35,
      retirementAge: 65,
      currentSavings: 50000,
      monthlyContribution: 1000,
    },
    kaiZen: {
      age: 45,
      gender: 'Male',
      contribution: 22000,
    },
  },
  advisorSearch: {
    validName: 'Manuel',
    validState: 'California',
    validSpecialty: 'Retirement Planning',
  },
};

export const routes = {
  home: '/',
  about: '/about',
  contact: '/contact',
  advisors: '/advisors',
  services: '/services',
  tools: '/tools',
  compoundGrowth: '/tools/compound-growth',
  retirementIncome: '/tools/retirement-income',
  taxImpact: '/tools/tax-impact',
  kaiZen: '/services/kai-zen',
  kaiZenCalculator: '/tools/kai-zen-calculator',
  bookConsultation: '/book-consultation',
  careers: '/careers',
  shop: '/shop',
  locations: '/locations',
  events: '/events',
  blog: '/blog',
};
