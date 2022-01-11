import { Component, OnInit } from '@angular/core';
import { TrelloService } from 'src/app/services/trello/trello.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user: any;
  boards: any = [];
  constructor(public trelloService: TrelloService) {}

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.getBoards();
  }
  async getBoards() {
    await this.trelloService.getBoardsTrello().then((res: any) => {
      console.log(res);
      this.boards = [];
      for (let i = 0; i < res.length; i++) {
        const element = res[i];
        console.log(element);

        this.boards.push({
          id: element.id,
          name: element.name,
          url: element.url,
        });
      }
    });
  }

  public url(urllink: string) {
    window.open(urllink, "_blank");
  }
}
