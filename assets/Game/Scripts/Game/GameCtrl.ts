import { _decorator, Collider2D, Component, EventTouch, IPhysics2DContact, Node } from 'cc';
import { TouchEventProxy } from '../Common/TouchEventProxy';
import { GameUICtrl } from './GameUICtrl';
import { Ball } from './Ball';
import { EventManager } from '../../../Libraries/EventManager';
import { Debug } from '../../../Libraries/Debug';
import { Outline } from './Outline';
const { ccclass, property } = _decorator;

@ccclass('GameCtrl')
export class GameCtrl extends Component
{
    @property(GameUICtrl)
    private gameUICtrl: GameUICtrl;
    private nextScale: number = 4;
    protected onLoad(): void
    {
        EventManager.On("OnGameTouchEnd", this.OnGameTouchEnd, this);
        EventManager.On("OnBallLeaveDoor", this.OnBallLeaveDoor, this);
    }
    protected onDestroy(): void
    {
        EventManager.Off("OnGameTouchEnd", this.OnGameTouchEnd, this);
        EventManager.Off("OnBallLeaveDoor", this.OnBallLeaveDoor, this);
    }
    start()
    {

        // this.gameUICtrl.CreateOutline(1);
        // this.gameUICtrl.CreateOutline(2);
        // this.gameUICtrl.CreateOutline(4);
    }

    /**
     * 顺利从圈里出来
     */
    private OnBallLeaveDoor(node: Node, selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null)
    {
        //todo 音效 分数 生成新的圈 球增大 相机变远

        this.scheduleOnce(() =>
        {
            this.gameUICtrl.UpdateBallPos();
            // this.gameUICtrl.UpdateBallScale();
            this.gameUICtrl.UpdateBallScore();
            this.nextScale = this.nextScale * 2;
            // this.gameUICtrl.CreateOutline(this.nextScale);
            // this.gameUICtrl.MiniCamera(2);
        });
    }
    private OnGameTouchEnd(proxy: TouchEventProxy, event: EventTouch)
    {

        this.gameUICtrl.BallBeat();
    }
}


