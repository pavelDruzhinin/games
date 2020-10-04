import { BaseDrawObject, GameImage } from "../game-framework";
import { List } from "../../common/list";

export class Box extends BaseDrawObject {
  private _image: GameImage;
  private _startPositionX: number;
  private _startPositionY: number;
  private _interval: number;
  private _isShowImage: boolean;

  constructor(
    strategy: BaseBoxStrategy,
    sceneWidth: number,
    sceneHeight: number
  ) {
    super();

    this._startPositionX = Math.random() * sceneWidth;
    this._startPositionY = Math.random() * sceneHeight;
    this._interval = randomRange(150, 300);
    this._isShowImage = true;

    this._image = new GameImage(
      `/assets/img/${BoxTypeImage[strategy.imageType]}.png`
    );
  }

  draw(ctx: CanvasRenderingContext2D, deviceRatio: number): void {
    if (this._isShowImage) {
      ctx.drawImage(
        this._image,
        this._startPositionX,
        this._startPositionY,
        100,
        100
      );
    }

    this._isShowImage = !this._isShowImage;

    this._interval--;
  }
}

export function randomRange(min: number, max: number) {
  return ~~(Math.random() * (max - min + 1)) + min;
}

abstract class BaseBoxStrategy {
  protected _imageType: BoxTypeImage;
  public get imageType(): BoxTypeImage {
    return this._imageType;
  }

  constructor(imageType: BoxTypeImage) {
    this._imageType = imageType;
  }

  abstract apply(): void;
}

class WeaponBoxStrategy extends BaseBoxStrategy {
  apply(): void {
    throw new Error("Method not implemented.");
  }
}

class HealthBoxStrategy extends BaseBoxStrategy {
  apply(): void {
    throw new Error("Method not implemented.");
  }
}

class BoxStrategyFactory {
  static create(typeImage: BoxTypeImage) {
    switch (typeImage) {
      case BoxTypeImage.MinShrapnel:
      case BoxTypeImage.MaxShrapnel:
      case BoxTypeImage.MinPistols:
      case BoxTypeImage.MaxPistols:
        return new WeaponBoxStrategy(typeImage);
      case BoxTypeImage.MaxHealth:
      case BoxTypeImage.AverageHeath:
      case BoxTypeImage.MinHealth:
        return new HealthBoxStrategy(typeImage);
      default:
        throw new Error("Unknown BoxTypeImage");
    }
  }
}

export class BoxFactory {
  static create(sceneWidth: number, sceneHeight: number): List<Box> {
    const boxTypes = [
      BoxTypeImage.MinShrapnel,
      BoxTypeImage.MaxShrapnel,
      BoxTypeImage.MinPistols,
      BoxTypeImage.MaxPistols,
      BoxTypeImage.MaxHealth,
      BoxTypeImage.AverageHeath,
      BoxTypeImage.MinHealth,
    ];

    const boxLength = randomRange(15, 30);
    let boxes = new List<Box>();
    for (let i = 0; i < boxLength; i++) {
      const boxTypeIndex = randomRange(0, boxTypes.length - 1);
      const boxType = boxTypes[boxTypeIndex];

      boxes.push(
        new Box(BoxStrategyFactory.create(boxType), sceneWidth, sceneHeight)
      );
    }

    return boxes;
  }
}

enum BoxTypeImage {
  MinShrapnel = 10,
  MaxShrapnel = 30,
  MinPistols = 10,
  MaxPistols = 30,
  MinHealth = 25,
  AverageHeath = 50,
  MaxHealth = 100,
}
