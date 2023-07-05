export enum STATUS {
  SUCCESS = 200,
  CREATED = 201,
  ACCEPTED = 202,
  BAD_REQUEST = 400,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  TOO_MANY_REQUEST = 429,
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
}

export enum PulsarPlatformIds {
  TWITTER = 101,
  YOUTUBE = 111,
  INSTAGRAM = 114,
  TIKTOK = 118,
}

export enum OtpTypeEnum {
  reset_password_otp = 'reset_password_otp',
}
