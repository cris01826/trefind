import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TrelloService {
  api = environment.api;
  token = environment.token;
  keyapi = environment.keyApi;
  nameURL = '1/members';
  constructor() {}

  getBoardsTrello() {
    return axios
      .get(
        this.api +
          this.nameURL +
          '/me/boards?fields=name,url,desc,pinned,pos&boardStars=none&key=' +
          this.keyapi +
          '&token=' +
          this.token +
          ''
      )
      .then((res) => res.data)
      .catch((err) => {
        throw err.response.data;
      });
  }
  getBoardStar() {
    return axios
      .get(
        this.api +
          this.nameURL +
          '/me/boardStars?key=' +
          this.keyapi +
          '&token=' +
          this.token +
          ''
      )
      .then((res) => res.data)
      .catch((err) => {
        throw err.response.data;
      });
  }
  createStartBoard(idBoard: any, pos: any) {
    return axios
      .post(
        this.api +
          this.nameURL +
          '/me/boardStars?idBoard=' +
          idBoard +
          '&pos=' +
          pos +
          '&key=' +
          this.keyapi +
          '&token=' +
          this.token +
          ''
      )
      .then((res) => res.data)
      .catch((err) => {
        throw err.response.data;
      });
  }

  deleteStartBoard(idBoard: any) {
    return axios
      .delete(
        this.api +
          this.nameURL +
          '/me/boardStars/' +
          idBoard +
          '?key=' +
          this.keyapi +
          '&token=' +
          this.token +
          ''
      )
      .then((res) => res.data)
      .catch((err) => {
        throw err.response.data;
      });
  }
}
