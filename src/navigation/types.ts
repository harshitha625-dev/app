import { ProjectType } from "@/types";

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  OtpVerification: { email: string };
};

export type CreateStackParamList = {
  CreateHub: undefined;
  AIVideoGeneration: undefined;
  ImageToVideo: undefined;
  ReferenceVideo: undefined;
  ManualEdit: undefined;
  GenerationProgress: { projectId: string };
};

export type MainTabParamList = {
  Home: undefined;
  Projects: undefined;
  Create: undefined;
  Downloads: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Auth: undefined;
  Main: undefined;
  Wallet: undefined;
  Pricing: undefined;
  Notifications: undefined;
  Settings: undefined;
  CreateStack: { screen: keyof CreateStackParamList } | undefined;
};
