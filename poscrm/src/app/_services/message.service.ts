import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  

  constructor(private http: HttpClient) { }
  sendSMS(message: any) {
    var apiKey= 'EUiW1Q9nvHA-IRCxVcPutUM9MlNHvgXd8KxOcw8uJu';
    var hashcode='af48d5e5d0073466923e452d00c30fe4b3b6677796f928a56520320477083331';
    var sender= 'MoonMedia';
    var APIURL= 'https://api.txtlocal.com/send/';
    var messageResponse = {};
  
    let dataParams = {
    "apikey" : apiKey,
    "numbers" : message.numbers,
    "message" : message.message,
    "sender" : sender,
    "test": true,
    'username':'sentthill@gmail.com',
    'hash':hashcode,
    'password':'India$123',
    'unicode':true,
    }
    this.http.post(APIURL , dataParams).subscribe(data => {
      messageResponse = data;
    });
    return {
      numbers: message.numbers,
      message: message.message,
      response: messageResponse,
      status: true,
    }
  }
}
