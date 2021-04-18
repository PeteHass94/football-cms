export interface AuthData {
  username: string;
  userType: string;
  role: string;
  name: string;
  dob: Date;
  league: string;
  club: string;
  team: string;
  password: string;
}

export interface AuthDataLogin {
  username: string;
  password: string;
}

export interface AuthDataGov {
  username: string;
  userType: string;
  role: string;
  name: string;
  password: string;

}

export interface AuthDataLeague {
  username: string;
  userType: string;
  role: string;
  name: string;
  league: string;
  password: string;
}

export interface AuthDataClub {
  username: string;
  userType: string;
  role: string;
  name: string;
  club: string;
  password: string;
}

export interface AuthDataManager {
  username: string;
  userType: string;
  role: string;
  name: string;
  club: string;
  team: string;
  password: string;
}

export interface AuthDataPlayer {
  username: string;
  userType: string;
  role: string;
  name: string;
  dob: Date;
  club: string;
  password: string;
}
