import { _decorator, BoxCollider2D, Collider2D, Component, Contact2DType, IPhysics2DContact, Node, Quat, Tween, tween, Vec2, Vec3 } from 'cc';
import { NodeRef } from '../Common/NodeRef';
import { EventManager } from '../../../Library/EventManager';
import { Debug } from '../../../Library/Debug';
import { Algorithm } from '../../../Library/Algorithm';
const { ccclass, property } = _decorator;

@ccclass('Outline')
export class Outline extends NodeRef
{
    public outlineSpriteNode: Node;
    private doorCollider: BoxCollider2D;
    private tweenAnim: Tween<Node>;
    private isContact: boolean = false;
    protected onLoad(): void
    {
        this.outlineSpriteNode = this.GetNode("OutlineSprite");
        this.doorCollider = this.GetVisual("OutlineSprite/Door", BoxCollider2D);
        this.doorCollider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
    }
    protected onDestroy(): void
    {
        this.doorCollider.off(Contact2DType.END_CONTACT, this.onEndContact, this);

    }
    start()
    {
        this.StartCircleAnim(this.outlineSpriteNode);
    }
    public SetSpriteNodeScale(scale: number)
    {
        this.outlineSpriteNode.setScale(new Vec3(scale, scale, 1));
    }
    public SetNodeAngle()
    {
        this.node.angle = Algorithm.GetRandomNumber(360, 0);
    }
    update(deltaTime: number)
    {
    }
    private StartCircleAnim(node: Node): void
    {
        this.tweenAnim = tween(node)
            .by(0.02, {
                angle: 1
            }).repeatForever().start();
    }
    onEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null)
    {
        if (this.isContact == true) return;
        this.isContact = true;
        this.tweenAnim.stop();
        EventManager.Emit("OnBallLeaveDoor", selfCollider, otherCollider, contact);
        this.scheduleOnce(() =>
        {
            this.node.removeFromParent();
        }, 0.2);
    }
}


