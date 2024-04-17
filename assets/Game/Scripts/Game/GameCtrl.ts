import { _decorator, Component, EventTouch, Node } from 'cc';
import { EventManager } from '../../../Library/EventManager';
import { TouchEventProxy } from '../Common/TouchEventProxy';
import { GameUICtrl } from './GameUICtrl';
import { Ball } from './Ball';
const { ccclass, property } = _decorator;

@ccclass('GameCtrl')
export class GameCtrl extends Component
{
    @property(GameUICtrl)
    private gameUICtrl: GameUICtrl;
    private nextScale: number = 2;
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

        // for (let index = 0; index < 8; index++) {
        //     this.gameUICtrl.CreateOutline(index+3);
        // }
    }

    /**
     * 顺利从圈里出来
     */
    private OnBallLeaveDoor()
    {
        //todo 音效 分数 生成新的圈 球增大 相机变远
        this.gameUICtrl.UpdateBallScore();
        this.nextScale = this.nextScale + 1;
        this.gameUICtrl.CreateOutline(this.nextScale);
        this.gameUICtrl.MiniCamera();
    }
    private OnGameTouchEnd(proxy: TouchEventProxy, event: EventTouch)
    {
        this.gameUICtrl.BallBeat();
    }
}


