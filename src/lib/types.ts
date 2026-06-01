// Shared domain types — mirror the backend data model (spac/001_poc.md §4).
// The organization panel reads/writes the buyer slice of the model: the market
// (listed credits + provenance), credits it owns, and retirement certificates.

export type Role = 'farmer' | 'platform' | 'org';

export type CreditStatus = 'issued' | 'listed' | 'sold' | 'retired' | 'reversed';

export type Tier = 'A' | 'B' | 'C';

/** A species the carbon formula knows how to price (spac/001_poc.md §5). */
export type Species = 'acacia' | 'teak' | 'eucalyptus' | 'mango' | 'bamboo';

export interface User {
  id: string;
  email: string;
  role: Role;
  name: string;
  created_at: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

/** A credit as owned by this org — the raw `credits` row (GET /credits/mine). */
export interface Credit {
  id: string;
  plot_id: string;
  tonnes_issued: number;
  tier: Tier;
  price_per_tonne: number;
  status: CreditStatus;
  owner_id: string | null;
  certificate_id: string | null;
  created_at: string;
}

/** A listed credit on the marketplace, joined with its plot provenance (GET /market). */
export interface MarketCredit extends Credit {
  plot_species: Species;
  plot_tree_count: number;
  plot_planting_date: string;
  farmer_name: string;
}

/** Full certificate detail (GET /certificates/:id). */
export interface Certificate extends Credit {
  plot_species: Species;
  plot_tree_count: number;
  plot_planting_date: string;
  farmer_name: string;
  owner_name: string | null;
  retired_at: string | null;
}
