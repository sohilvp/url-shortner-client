export type ShortUrl = {
  _id: string | "";
  longUrl: string;
  shortUrl: string;
  clicks: number;
  qrCodeUrl: string;
};

export type LoginResponse = {
  user: {
    _id: string;
    email: string;
  };
  accessToken: string;
};
