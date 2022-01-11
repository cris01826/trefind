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
          '/me/boards?fields=name,url,description&key=' +
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
