
export interface League{
  creator: string;
  leagueName: string;
  teams: [{
    team: {
      clubName: string,
      teamName: string,
      points: number
    }
  }]

}
