import { _decorator, Camera, Component, easing, instantiate, Node, Prefab, tween, Vec2, Vec3 } from 'cc';
import { NodeRef } from '../Common/NodeRef';
import { Ball } from './Ball';
import { Outline } from './Outline';
import { Debug } from '../../../Libraries/Debug';
import { Algorithm } from '../../../Libraries/Algorithm';
const { ccclass, property } = _decorator;

@ccclass('GameUICtrl')
export class GameUICtrl extends NodeRef
{

    @property(Prefab)
    private outlinePrefab: Prefab;
    private heroBall: Ball;
    private centerPointNode: Node;
    private camera: Camera;
    private centerPointLocalToBallPos: Vec3 = new Vec3();
    protected onLoad(): void
    {
        this.heroBall = this.GetVisual("GameRoot/Ball", Ball);
        this.camera = this.GetVisual("Camera", Camera);
        this.centerPointNode = this.GetNode("GameRoot/CenterPoint")
    }
    start()
    {
        this.centerPointLocalToBallPos = this.camera.convertToUINode(this.centerPointNode.worldPosition, this.heroBall.node)

    }
    public MiniCamera(scale: number = 2)
    {
        // this.camera.orthoHeight = this.camera.orthoHeight * scale;
        tween(this.camera)
            .to(1, { orthoHeight: this.camera.orthoHeight * scale }, { 'easing': 'smooth' })
            .to(1, { orthoHeight: this.camera.orthoHeight }, { 'easing': 'smooth' })
            .start();
    }
    public UpdateBallPos()
    {
        this.heroBall.UpdateBallPos();
    }
    public BallBeat()
    {
        const centerPos = new Vec3(this.heroBall.ballSpriteNode.position.x, this.heroBall.ballSpriteNode.position.y);
        const direction =centerPos.subtract(this.centerPointLocalToBallPos).normalize();

        this.heroBall.BallBeat(direction.multiplyScalar(10));
    }
    public UpdateBallScore()
    {
        this.heroBall.UpdateTipScore();
    }
    public UpdateBallScale()
    {
        this.heroBall.UpdateBallScale();
    }
    public CreateOutline(scale: number = 1)
    {
        var outlineNode: Node = instantiate(this.outlinePrefab);
        outlineNode.name = "Outline"+scale;
        this.GetNode("GameRoot").addChild(outlineNode);
        var outline: Outline = outlineNode.getComponent<Outline>(Outline);
        outline.scale = scale;
        outline.SetSpriteNodeScale(scale);
        outline.SetNodeAngle();
        outline.SetOutlineSpriteRotateSpeed(Algorithm.GetRandomNumber(3,0.5))
        // outline.level = Math.round(scale);
    }
}


