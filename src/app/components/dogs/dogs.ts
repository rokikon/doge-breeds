export interface Dog {
  id: number;
  breed: string;
  pictureLink?: string;
}

export interface DogListResponse {
  message: { [k: string]: string };
}

export interface DogPictureResponse {
  message: string;
}
