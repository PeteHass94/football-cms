export interface Club{
  _id: string;
  creator: string;
  clubName: string;
  teams: [{
    type: string
  }],
  players: [{
    type: string
  }]

}
