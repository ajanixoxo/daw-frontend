export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
}

export interface IMember {
  _id: string;
  userId: IUser; // populated user object
  joinDate: string;
  monthlyContribution: number;
  status: "active" | "inactive" | "pending";
  description?: string;
  emailSecondary?: string;
}
