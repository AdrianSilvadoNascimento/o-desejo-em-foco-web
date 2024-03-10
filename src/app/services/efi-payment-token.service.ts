import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { CreditCardModel } from '../models/credit-card-model';

interface GnInterface {
  validForm: boolean;
  processed: boolean;
  done: any; // Aqui você pode ajustar o tipo conforme necessário
  ready: (fn: Function) => void;
}

declare global {
  interface Window {
    $gn: GnInterface;
  }
}

@Injectable({
  providedIn: 'root',
})
export class GerenciaNetService {
  private static readonly _PAYEE_CODE = environment.PAYEE_CODE;
  private static readonly _ENDPOINT = environment.production
    ? 'https://api.gerencianet.com.br/v1/cdn'
    : 'https://sandbox.gerencianet.com.br/v1/cdn';

  constructor() {}

  public getPaymentToken(creditCard: CreditCardModel): Promise<any> {
    return new Promise((resolve, reject) => {
      var s = document.createElement('script');
      s.type = 'text/javascript';

      var v = Math.random() * 1000000;
      s.src = `${GerenciaNetService._ENDPOINT}/${GerenciaNetService._PAYEE_CODE}/${v}`; // Correção aqui
      s.async = false;
      s.id = GerenciaNetService._PAYEE_CODE;

      if (!document.getElementById(GerenciaNetService._PAYEE_CODE)) {
        document.getElementsByTagName('head')[0].appendChild(s);
      }

      window['$gn'] = {
        validForm: true,
        processed: false,
        done: {},
        ready: function (fn: any) {
          window['$gn'].done = fn;
        },
      };

      window['$gn'].ready(
        (checkout: {
          getPaymentToken: (
            arg0: CreditCardModel,
            arg1: (error: any, response: any) => void
          ) => void;
        }) => {
          checkout.getPaymentToken(
            creditCard,
            (error: any, response: { data: { payment_token: any } }) => {
              if (error) {
                reject(error);
              } else {
                resolve(response.data.payment_token);
              }
            }
          );
        }
      );
    });
  }
}
