export const PLANS = [
  { id: 'single', name: 'Single Tour', price: '$19', period: 'per tour', features: ['One 3D virtual tour', 'HD quality output', 'Shareable link', 'Mobile responsive', '30-day support'], popular: false, stripeUrl: null },
  { id: 'pro', name: 'Agent Pro', price: '$99', period: '/month', features: ['Unlimited tours', 'Priority processing', 'Custom branding', 'Analytics dashboard', 'White-label option', '24/7 support'], popular: true, savings: 'Save $183', stripeUrl: null },
  { id: 'elite', name: 'Agency Elite', price: '$299', period: '/month', features: ['Everything in Pro', 'Team collaboration', 'API access', 'Advanced analytics', 'Dedicated support', 'Custom integrations'], popular: false, savings: 'Save $377', stripeUrl: null },
]

export const TOUR_STEPS = [
  { id: 1, name: 'Upload' },
  { id: 2, name: 'Explore' },
  { id: 3, name: 'Purchase' },
]

export const APP_NAME = 'TourGen Pro'
export const APP_TAGLINE = 'Professional 3D Virtual Tours'
