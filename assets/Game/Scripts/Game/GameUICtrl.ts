import { _decorator, Camera, Component, instantiate, Node, Prefab, Vec2, Vec3 } from 'cc';
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
    public MiniCamera(mini: boolean = true)
    {
        this.camera.orthoHeight = this.camera.orthoHeight + (mini ? 1 : -1)*100;
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

    public CreateOutline(scale: number = 1.2)
    {
        var outlineNode: Node = instantiate(this.outlinePrefab);
        outlineNode.setParent(this.GetNode("GameRoot"));
        var outline: Outline = outlineNode.getComponent<Outline>(Outline);
        outline.SetSpriteNodeScale(scale);
        outline.SetNodeAngle();
    }
}


