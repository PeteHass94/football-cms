// const leagueSchema = mongoose.Schema({
//   creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   leagueName: { type: String, required: true},
//   teams: [{
//     team: {
//       name: {type: String},
//       points: {type: String}
//     }
//   }]


// });

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
