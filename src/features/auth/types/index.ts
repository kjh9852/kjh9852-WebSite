export type UserProfile = {
  displayName: string;
  photoURL: string | null;
};

export type AuthUser = {
  uid: string;
  email: string | null;
  isAdmin: boolean;
} & UserProfile;

export type SignInType = {
  email: string;
  password: string;
};

export type SignUpType = {
  email: string;
  password: string;
} & UserProfile;
