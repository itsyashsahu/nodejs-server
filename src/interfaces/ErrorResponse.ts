export default interface ErrorResponse {
  success:boolean, 
  message:string,
  stack?: string;
}