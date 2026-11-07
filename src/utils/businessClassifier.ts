/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type BusinessType = 'small_shop' | 'tech_startup';

export interface BusinessClassification {
  type: BusinessType;
  categoryName: string;
  matchedKeyword?: string;
  isShop: boolean;
  setupCostEstimate: string;
  dailyBreakEvenOrP99: string;
  marginOrMultiples: string;
  verdictSummary: string;
}

export function detectBusinessType(text: string): BusinessClassification {
  const lower = text.toLowerCase().trim();

  // Explicit tech keywords that override simple shop keywords
  // (e.g. "AI for coffee shops", "SaaS platform for bakeries", "Fintech app for chai stalls")
  const isTechOverride =
    lower.includes('ai ') ||
    lower.includes('ai-') ||
    lower.includes('saas') ||
    lower.includes('api') ||
    lower.includes('software') ||
    lower.includes('app for') ||
    lower.includes('platform for') ||
    lower.includes('algorithm') ||
    lower.includes('llm') ||
    lower.includes('deeptech') ||
    lower.includes('neural') ||
    lower.includes('robotics') ||
    lower.includes('cloud') ||
    lower.includes('database');

  // Small shop & local retail keywords
  const shopKeywords = [
    'chai',
    'tea stall',
    'tea shop',
    'coffee shop',
    'cafe',
    'bakery',
    'stall',
    'shop',
    'kiosk',
    'cart',
    'food truck',
    'street food',
    'dhaba',
    'barber',
    'salon',
    'parlor',
    'parlour',
    'boutique',
    'grocery',
    'kirana',
    'tailor',
    'laundromat',
    'laundry',
    'flower shop',
    'florist',
    'juice shop',
    'juice bar',
    'burger stall',
    'snack cart',
    'convenience store',
    'ice cream',
    'hardware store',
    'stationery',
    'pharmacy',
    'restaurant',
    'pizzeria',
    'tiffin'
  ];

  const matched = shopKeywords.find((k) => {
    const regex = new RegExp(`(^|\\s|\\b)${k}(\\b|\\s|$)`, 'i');
    return regex.test(lower);
  });

  if (matched && !isTechOverride) {
    let categoryName = 'Local Retail & Food Shop';
    if (lower.includes('chai') || lower.includes('tea')) {
      categoryName = 'Chai / Tea Stall';
    } else if (lower.includes('coffee') || lower.includes('cafe')) {
      categoryName = 'Specialty Coffee / Cafe';
    } else if (lower.includes('bakery')) {
      categoryName = 'Artisan Bakery';
    } else if (lower.includes('food') || lower.includes('truck') || lower.includes('cart')) {
      categoryName = 'Street Food & Quick Service';
    } else if (lower.includes('barber') || lower.includes('salon')) {
      categoryName = 'Grooming & Personal Care Shop';
    } else if (lower.includes('grocery') || lower.includes('kirana')) {
      categoryName = 'Neighborhood Grocery / Kirana';
    }

    return {
      type: 'small_shop',
      categoryName,
      matchedKeyword: matched,
      isShop: true,
      setupCostEstimate: '$400 – $1,200',
      dailyBreakEvenOrP99: '120 – 180 sales/day',
      marginOrMultiples: '70% – 82% Gross Margin',
      verdictSummary:
        'High daily cashflow retail model. Bypasses VC dilution. Focuses on peak morning/evening footfall, signature recipe, and instant digital payments.',
    };
  }

  // Default to tech startup
  return {
    type: 'tech_startup',
    categoryName: 'Venture-Backed Tech Startup',
    isShop: false,
    setupCostEstimate: '$1.5M Seed Round',
    dailyBreakEvenOrP99: '< 180ms P99 Latency',
    marginOrMultiples: '80%+ Software Gross Margin',
    verdictSummary:
      'High-velocity venture model. Requires multi-agent consensus across system architecture, customer acquisition payback, and investor defensibility.',
  };
}
