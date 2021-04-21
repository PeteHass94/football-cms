export interface Club{
  creator: string;
  clubName: string;
  teams: [{
    type: string
  }],
  players: [{
    type: string
  }]

}
