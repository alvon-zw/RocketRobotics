export const SKILL_LEVELS = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Classroom",
] as const;
export type SkillLevel = (typeof SKILL_LEVELS)[number];

export const KIT_TYPES = [
  "Starter Kits",
  "Arduino Compatible",
  "Raspberry Pi",
  "AI & Machine Learning",
] as const;
export type KitType = (typeof KIT_TYPES)[number];

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  price: number;
  skill_level: SkillLevel;
  kit_type: KitType;
  image: string | null;
  is_featured: boolean;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  skill_level: SkillLevel;
}
