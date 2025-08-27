// src/app/models/payment.model.ts
export interface InitiateResponse {
  iframeUrl: string;
}

export interface StatusResponse {
  status: 'pending' | 'confirmed' | 'cancelled';
}
