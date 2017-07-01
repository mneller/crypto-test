import { Action } from "redux";
/**
 * Created by eller on 01.07.17.
 */

export interface IAppState {
  activeComponent: string;
}

export const INIT_STATE: IAppState = {
  activeComponent: "HOME"
};

export function rootReducer (lastState: IAppState, action: Action): IAppState {

  return lastState;
}
