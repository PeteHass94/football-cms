export interface Team{
  _id: string;
  creator: string;
  clubName: string;
  teamName: string;
  managers: Array<string>,
  coaches: Array<string>,
  players: Array<string>,

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
