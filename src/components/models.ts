/**
 * Interface for the options given to the conversor.
 * `plans` is an array with the phone plans based on minutes that the user can use
 */
export interface IConversorOptions {
  call: Map<string, Map<string, number>>,
  plans: number[]
}
