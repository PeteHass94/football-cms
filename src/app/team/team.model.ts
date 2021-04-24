export interface Team{
  id: string;
  creator: string;
  clubName: string;
  teamName: string;
  managers: [{
    type: string
  }],
  coaches: [{
    type: string
  }],
  players: [{
    type: string
  }]

}



// export interface Club{
//   id: string;
//   creator: string;
//   clubName: string;
//   teams: [{
//     type: string
//   }],
//   players: [{
//     type: string
//   }]

// }
