export type JwtExpiry =
  | `${number}s` // seconds
  | `${number}m` // minutes
  | `${number}h` // hours
  | `${number}d` // days
  | `${number}w`; // weeks (optional)
