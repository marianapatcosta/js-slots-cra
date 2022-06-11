
import { settingsReducer, slotMachineReducer } from './reducers';
import type { SettingsAction, SlotMachineAction } from './reducers';

export interface State {
  readonly settings: ReturnType<typeof settingsReducer>;
  readonly slotMachine: ReturnType<typeof slotMachineReducer>;
}

export type Action = SettingsAction | SlotMachineAction;