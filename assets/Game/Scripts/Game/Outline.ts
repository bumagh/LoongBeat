import { _decorator, BoxCollider2D, CircleCollider2D, Collider2D, Component, Contact2DType, IPhysics2DContact, Node, Quat, RigidBody2D, Tween, tween, Vec2, Vec3 } from 'cc';
import { NodeRef } from '../Common/NodeRef';
import { Algorithm } from '../../../Libraries/Algorithm';
import { EventManager } from '../../../Libraries/EventManager';
import { Debug } from '../../../Libraries/Debug';

const { ccclass, property } = _decorator;
export enum OutlineSpriteEnums
{
    OutlineSpriteThreeQuaters = "OutlineSpriteThreeQuaters",
    OutlineSpriteFill = "OutlineSpriteFill",
    OutlineSpriteHalfDoor = "OutlineSpriteHalfDoor",
}
@ccclass('Outline')
export class Outline extends NodeRef
{
    public outlineSpriteNode: Node;
    private doorCollider: Collider2D;
    private doorRgBody:RigidBody2D;
    private outlineCollider: Collider2D;
    private tweenAnim: Tween<Node>;
    public isContact: boolean = false;
    public rotateSpeed: number = 1;
    public level: number = 1;
    public scale: number = 1;
    protected onLoad(): void
    {
        this.Init(OutlineSpriteEnums.OutlineSpriteThreeQuaters);
    }
    private Init(outlineType: OutlineSpriteEnums)
    {
        this.outlineSpriteNode = this.GetNode(outlineType);
        this.outlineCollider = this.GetVisual(outlineType, Collider2D);
        if (outlineType != OutlineSpriteEnums.OutlineSpriteFill)
        {
            this.doorCollider = this.GetVisual(outlineType + "/Door", CircleCollider2D);
            this.doorRgBody = this.GetVisual(outlineType + "/Door", RigidBody2D);
            this.doorCollider.on(Contact2DType.END_CONTACT, this.OnDoorEndContact, this);
        }

        this.outlineCollider.on(Contact2DType.BEGIN_CONTACT, this.OnOutlineBeginContact, this)
    }
    public ChangeType(outlineType: OutlineSpriteEnums)
    {
       this.doorRgBody.enabledContactListener = false;
        this.outlineSpriteNode.active = false;
        this.Init(outlineType);
        this.SetSpriteNodeScale(this.scale);
        this.outlineSpriteNode.active = true;
    }
    protected onDestroy(): void
    {
        this.doorCollider.off(Contact2DType.END_CONTACT, this.OnDoorEndContact, this);
        this.outlineCollider.off(Contact2DType.END_CONTACT, this.OnOutlineBeginContact, this);
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

    public SetOutlineSpriteRotateSpeed(speed: number = 1)
    {
        this.rotateSpeed = speed;
    }
    private StartCircleAnim(node: Node): void
    {
        this.tweenAnim = tween(node)
            .by(0.02, {
                angle: this.rotateSpeed
            }).repeatForever().start();
    }
    OnDoorEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null)
    {
        // Debug.Log(this.node.name);
        // Debug.Log(selfCollider.node.parent.parent.name);
        if (this.isContact == true) return;
        this.isContact = true;
        Debug.Log("OnDoorEndContact")
        // this.tweenAnim.stop();
        // // this.SetNodeAngle();
        // EventManager.Emit("OnBallLeaveDoor", this.node, selfCollider, otherCollider, contact);
        // this.scheduleOnce(() =>
        // {
        //     this.ChangeType(OutlineSpriteEnums.OutlineSpriteFill);
        //     // this.node.removeFromParent();
        // });
    }
    OnOutlineBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null)
    {
        Debug.Log("OnOutlineBeginContact")
        // if (this.isContact == true) return;
        // this.isContact = true;
        // this.tweenAnim.stop();
        // this.SetNodeAngle();
        // EventManager.Emit("OnBallLeaveDoor", this.node, selfCollider, otherCollider, contact);
        // this.scheduleOnce(() =>
        // {
        //     this.node.removeFromParent();
        // });
    }

}


