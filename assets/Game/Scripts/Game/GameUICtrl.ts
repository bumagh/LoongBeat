import { _decorator, Camera, Component, easing, instantiate, Node, Prefab, tween, Vec2, Vec3 } from 'cc';
import { NodeRef } from '../Common/NodeRef';
import { Ball } from './Ball';
import { Outline } from './Outline';
const { ccclass, property } = _decorator;

@ccclass('GameUICtrl')
export class GameUICtrl extends NodeRef
{
    @property(Prefab)
    private outlinePrefab: Prefab;
    private heroBall: Ball;
    private camera: Camera;
    protected onLoad(): void
    {
        this.heroBall = this.GetVisual("GameRoot/Ball", Ball);
        this.camera = this.GetVisual("Camera", Camera);
    }
    start()
    {

    }
    public MiniCamera(scale: number = 1)
    {
        // this.camera.orthoHeight = this.camera.orthoHeight * scale;
        tween(this.camera)
            .to(2, { orthoHeight: this.camera.orthoHeight * scale }, { 'easing': 'smooth' })
            .start();
    }
    update(deltaTime: number)
    {

    }
    public BallBeat()
    {
        this.heroBall.BallBeat();
    }
    public UpdateBallScore()
    {
        this.heroBall.UpdateTipScore();
    }
    public UpdateBallScale()
    {
        this.heroBall.UpdateBallScale();
    }
    public CreateOutline(scale: number = 1.2)
    {
        var outlineNode: Node = instantiate(this.outlinePrefab);
        this.GetNode("GameRoot").addChild(outlineNode);
        var outline: Outline = outlineNode.getComponent<Outline>(Outline);
        outline.SetSpriteNodeScale(scale);
        outline.SetNodeAngle();

    }
}


