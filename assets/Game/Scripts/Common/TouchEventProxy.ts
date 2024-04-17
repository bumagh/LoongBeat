import { _decorator, CCBoolean, CCString, Component, EventTouch } from 'cc';
import { Validator } from '../../../Libraries/Validator';
import { EventManager } from '../../../Libraries/EventManager';


const { ccclass, property } = _decorator;

@ccclass('TouchEventProxy')
export class TouchEventProxy extends Component
{
    @property(CCBoolean)
    public interactable: boolean = true;

    @property(CCString)
    public touchType: string = "touch-end";

    @property(CCString)
    public eventName: string = "";

    @property(CCString)
    public eventArg: string = "";

    protected onEnable(): void
    {
        this.node.on(this.touchType, this.OnTouchEvent, this);
    }

    protected onDisable(): void
    {
        this.node.off(this.touchType, this.OnTouchEvent, this);
    }

    private OnTouchEvent(event: EventTouch): void
    {
        if (!this.interactable) return;
        if (Validator.IsStringIllegal(this.eventName, "this.eventName")) return;
        EventManager.Emit(this.eventName, this, event);
    }
}