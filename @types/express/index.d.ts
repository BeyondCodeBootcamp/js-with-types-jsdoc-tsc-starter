// You can extend other types that you modify with middleware.
// Here we tell the linter to expect `user`, `authn`, and `query`
// to exist on Request objects, and a custom `result` handler to
// exist on Response objects.
declare namespace Express {
  export interface Request {
    query?: Record<string, string>;
    user?: any;
    authn?: any;
  }
  export interface Response {
    result?: (result: any) => void;
  }
}
