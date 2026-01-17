export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  country: string;
  mobileNumber: string;
  consentTimestamp: Date;
  userId: string; // Non-PII user ID
}

export interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  accessLevel: 'full' | 'limited' | 'emergency';
  expiresAt: Date;
  status: 'pending' | 'active' | 'expired';
}

export interface AccessRecord {
  id: string;
  entity: string;
  entityType: 'person' | 'company';
  accessGranted: Date;
  accessExpires: Date;
  dataCategories: string[];
  status: 'active' | 'revoked' | 'expired';
}

export interface PartnerCompany {
  id: string;
  name: string;
  logo?: string;
  verified: boolean;
  dataCategories: string[];
  complianceStatus: 'compliant' | 'pending' | 'non-compliant';
}

export interface Token {
  id: string;
  action: string;
  timestamp: Date;
  entityInvolved: string;
  dataCategory: string;
  tokenHash: string;
}

export interface BlueprintMetadata {
  totalDataPoints: number;
  encryptedFields: number;
  lastUpdated: Date;
  accessEvents: number;
}
