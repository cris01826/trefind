import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Boards } from 'src/app/models/boards';
import { TrelloService } from 'src/app/services/trello/trello.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user: any;
  boards: any = [];
  boardsStars: any = [];
  boardsStarslist: any = [];
  constructor(
    public trelloService: TrelloService,
    public snackBar: MatSnackBar
  ) {}

  async ngOnInit(): Promise<void> {
    this.user = localStorage.getItem('user');
    await this.getBoardsstars();
    await this.getBoards();
  }
  async getBoardsstars() {
    await this.trelloService.getBoardStar().then((res: any) => {
      console.log(res);
      this.boardsStarslist = [];
      for (let i = 0; i < res.length; i++) {
        const element = res[i];
        console.log(element);

        this.boardsStarslist.push({
          id: element.id,
          idBoard: element.idBoard,
          pos: element.pos,
        });
      }
    });
  }

  async getBoards() {
    await this.trelloService.getBoardsTrello().then(async (res: any) => {
      console.log(res);
      this.boards = [];
      this.boardsStars = [];
      for (let i = 0; i < res.length; i++) {
        const element = res[i];
        console.log(this.boardsStarslist);

        const foundboardstar = await this.boardsStarslist.find(
          (star: any) => star.idBoard == element.id
        );
        console.log('found', foundboardstar);

        if (foundboardstar) {
          this.boardsStars.push({
            id: element.id,
            name: element.name,
            url: element.url,
            desc: element.desc,
          });
        } else {
          this.boards.push({
            id: element.id,
            name: element.name,
            url: element.url,
            desc: element.desc,
          });
        }
      }
    });
  }
  async createStar(idBoard: string) {
    await this.trelloService.createStartBoard(idBoard, 1).then((res: any) => {
      this.openSnackBar('Se ha agregado a Favoritos', 'Aceptar');
      this.ngOnInit();
    });
  }

  async deleteStar(idBoard: string) {
    await this.trelloService.deleteStartBoard(idBoard).then((res: any) => {
      this.openSnackBar('Se ha quitado de Favoritos', 'Aceptar');
      this.ngOnInit();
    });
  }
  public url(urllink: string) {
    window.open(urllink, '_blank');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
