export class Boards {
  id: string;
  name: string;
  url: string;
  desc: string;
  idBoard:string
  constructor(id: string, name: string, url: string, desc: string, idBoard:string) {
    this.id = id;
    this.name = name;
    this.url = url;
    this.desc = desc;
    this.idBoard = idBoard
  }
}
