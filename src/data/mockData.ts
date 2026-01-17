import { User, FamilyMember, AccessRecord, PartnerCompany, Token, BlueprintMetadata } from '@/types';

export const mockUser: User = {
  id: '1',
  name: 'Alex Chen',
  email: 'alex.chen@email.com',
  age: 32,
  country: 'United States',
  mobileNumber: '+1 555-0123',
  consentTimestamp: new Date('2024-01-15T10:30:00'),
  userId: 'USR-7X9K2M4P',
};

export const mockFamilyMembers: FamilyMember[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    relationship: 'Spouse',
    accessLevel: 'full',
    expiresAt: new Date('2025-12-31'),
    status: 'active',
  },
  {
    id: '2',
    name: 'James Chen',
    relationship: 'Parent',
    accessLevel: 'emergency',
    expiresAt: new Date('2025-06-30'),
    status: 'active',
  },
  {
    id: '3',
    name: 'Emily Chen',
    relationship: 'Sibling',
    accessLevel: 'limited',
    expiresAt: new Date('2024-12-01'),
    status: 'pending',
  },
];

export const mockAccessRecords: AccessRecord[] = [
  {
    id: '1',
    entity: 'Sarah Chen',
    entityType: 'person',
    accessGranted: new Date('2024-01-20'),
    accessExpires: new Date('2025-12-31'),
    dataCategories: ['Personal Info', 'Medical Records', 'Financial Data'],
    status: 'active',
  },
  {
    id: '2',
    entity: 'SecureBank Inc.',
    entityType: 'company',
    accessGranted: new Date('2024-02-15'),
    accessExpires: new Date('2025-02-15'),
    dataCategories: ['Financial Data', 'Identity Verification'],
    status: 'active',
  },
  {
    id: '3',
    entity: 'HealthFirst Insurance',
    entityType: 'company',
    accessGranted: new Date('2023-06-01'),
    accessExpires: new Date('2024-06-01'),
    dataCategories: ['Medical Records'],
    status: 'expired',
  },
];

export const mockPartnerCompanies: PartnerCompany[] = [
  {
    id: '1',
    name: 'SecureBank Inc.',
    verified: true,
    dataCategories: ['Financial Data', 'Identity Verification'],
    complianceStatus: 'compliant',
  },
  {
    id: '2',
    name: 'HealthFirst Insurance',
    verified: true,
    dataCategories: ['Medical Records', 'Personal Info'],
    complianceStatus: 'compliant',
  },
  {
    id: '3',
    name: 'TechCorp Solutions',
    verified: false,
    dataCategories: ['Employment Data'],
    complianceStatus: 'pending',
  },
];

export const mockTokens: Token[] = [
  {
    id: '1',
    action: 'Access Granted',
    timestamp: new Date('2024-01-20T14:30:00'),
    entityInvolved: 'Sarah Chen',
    dataCategory: 'Personal Info',
    tokenHash: '0x7f8a9b2c3d4e5f6a',
  },
  {
    id: '2',
    action: 'Data Accessed',
    timestamp: new Date('2024-02-15T09:15:00'),
    entityInvolved: 'SecureBank Inc.',
    dataCategory: 'Financial Data',
    tokenHash: '0x1a2b3c4d5e6f7g8h',
  },
  {
    id: '3',
    action: 'Access Revoked',
    timestamp: new Date('2024-03-01T16:45:00'),
    entityInvolved: 'TechCorp Solutions',
    dataCategory: 'Employment Data',
    tokenHash: '0x9i8h7g6f5e4d3c2b',
  },
  {
    id: '4',
    action: 'Consent Updated',
    timestamp: new Date('2024-03-10T11:00:00'),
    entityInvolved: 'HealthFirst Insurance',
    dataCategory: 'Medical Records',
    tokenHash: '0xab12cd34ef56gh78',
  },
];

export const mockBlueprintMetadata: BlueprintMetadata = {
  totalDataPoints: 47,
  encryptedFields: 42,
  lastUpdated: new Date('2024-03-15T08:00:00'),
  accessEvents: 156,
};
