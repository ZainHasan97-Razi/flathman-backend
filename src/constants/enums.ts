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

export enum OtpTypeEnum {
  reset_password_otp = 'reset_password_otp',
}

export enum SubscriptionTypeEnum {
  free_trial = 'free_trial', // Free trial hamesha times usage hogi
  times_usage = 'times_usage',
}

export enum SubscriptionStatusEnum {
  active = 'active',
  expired = 'expired',
  cancel = 'cancel',
}

export enum PlatformEnum {
  android = 'android',
  ios = 'ios',
}

export enum BundleStatusEnum {
  active = 'active',
  active_android = 'active_android',
  active_ios = 'active_ios',
  in_active = 'in_active',
}
