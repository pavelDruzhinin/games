export class GameData {
  constructor(
    public userId?: number,
    public type?: GameEventType,
    public data?: any
  ) {}
}

export type SocketListener = (data: GameData) => void;

export enum GameEventType {
  JoinPlayer,
  UnJoinPlayer,
  ChangePosition,
  NewBox,
}
