export interface Team{
  _id: string;
  creator: string;
  clubName: string;
  teamName: string;
  managers: Array<string>,
  coaches: Array<string>,
  players: Array<string>,

}

