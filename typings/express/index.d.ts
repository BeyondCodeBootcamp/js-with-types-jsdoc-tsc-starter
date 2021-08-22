// You can extend other types that you modify with middleware.
declare namespace Express {
  // Here we tell the linter to expect `user`, `authn`, and `query`
  // to exist on Request objects, and a custom `result` handler to
  // exist on Response objects.
  export interface Request {
    query?: Record<string, string>;
    user?: User;
    authn?: any;
  }

  // Here we tell the linter about our special alternative to
  // res.result
  export interface Response {
    result?: (result: any) => void;
  }
}
