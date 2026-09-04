export interface Plan {
  id: 'standard' | 'advanced' | 'expert';
  name: string;
  tagline: string;
  price: string;
  priceNum?: number;
  popular?: boolean;
  features: string[];
  ctaText: string;
  description: string;
}
