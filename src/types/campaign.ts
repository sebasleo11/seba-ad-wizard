export interface CampaignData {
  objective: string;
  budget: number;
  audience: {
    location: string;
    ageRange: string[];
    interests: string[];
    gender: string[];
  };
  content: {
    autoGenerateText: boolean;
    customText: string;
    imageUrl: string | File;
    cta: string;
    destinationType: string;
    destinationUrl: string;
  };
}
