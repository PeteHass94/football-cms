export interface Player{
  id: string;
  creator: string;
  playerName: string,
  dob: Date,
  clubName: string;
  teams: [{
    type: string
  }],
  stats: {
    appearances: number,
    goals: number,
    assists: number
  },

  trainings: [{
    type: string
  }]
  matches: [{
    type: string
  }]

}
