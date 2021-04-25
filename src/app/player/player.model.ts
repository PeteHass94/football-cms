export interface Player{
  _id: string;
  creator: string;
  playerName: string,
  dob: Date,
  clubName: string;
  teams: Array<string>,
  stats: {
    appearances: number,
    goals: number,
    assists: number
  },

  trainings: Array<string>,
  matches: Array<string>

}
