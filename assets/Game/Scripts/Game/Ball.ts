import { _decorator, Camera, Component, find, Label, Node, NodeSpace, Quat, RigidBody2D, tween, Vec2, Vec3 } from 'cc';
import { NodeRef } from '../Common/NodeRef';
const { ccclass, property } = _decorator;

@ccclass('Ball')
export class Ball extends NodeRef
{
    public ballSpriteNode: Node;
    private rgBody: RigidBody2D;
    private tipLabel: Label;
    private _score: number = -1;
    private angle: number = 0; // 当前角度
    private speed: number = 30; // 当前角度
    private radius: number = 2; // 当前角度

    public get score(): number
    {
        return this._score;
    }
    public set score(value: number)
    {
        this._score = value;
    }
    protected onLoad(): void
    {
        this.ballSpriteNode = this.GetNode("Sprite");
        this.rgBody = this.GetVisual("Sprite", RigidBody2D);
        this.tipLabel = this.GetVisual("Label", Label);
    }
    start()
    {
        this.UpdateTipScore();
    }

    public UpdateTipScore(scoreNum: number = 0)
    {
        this.score = scoreNum == 0 ? (this.score + 1) : scoreNum;
        this.tipLabel.string = `1:${this.score.toString()}分`;
    }
    update(deltaTime: number)
    {
        this.updateTextPosition();
        // this.angle += this.speed * deltaTime;

        // // 计算刚体的目标位置（圆周运动轨迹上的点）
        // const targetPosition = new Vec2(this.radius * Math.cos(this.angle), this.radius * Math.sin(this.angle)
        // );

        // // 计算朝向圆心的向量
        // const direction = targetPosition.subtract(new Vec2(this.ballSpriteNode.position.x, this.ballSpriteNode.position.y)).normalize();

        // // 计算冲量大小（使刚体保持圆周运动）
        // const impulseMagnitude = this.rgBody.getMass() * this.speed * this.radius;

        // // 应用冲量给刚体
        // this.rgBody.applyLinearImpulse(direction.multiplyScalar(impulseMagnitude), new Vec2(this.ballSpriteNode.position.x, this.ballSpriteNode.position.y), true);
        // find("Canvas/Camera").getComponent<Camera>(Camera).conve

    }
    public BallBeat(vec3: Vec3): void
    {
        var point = new Vec2();
        this.rgBody.getLocalCenter(point);
        // this.rgBody.applyLinearImpulse(new Vec2(0, 10 * this.node.scale.x), point, true);
        this.rgBody.applyLinearImpulse(new Vec2(vec3.x, vec3.y), point, true);
    }
    public UpdateBallScale()
    {
        // this.ballSpriteNode.setScale(new Vec3(this.ballSpriteNode.scale.x*1.5,));
        this.node.setScale(new Vec3(this.node.scale.x * 2, this.node.scale.y * 2, 1));
        this.rgBody.gravityScale = this.rgBody.gravityScale / (2);
    }
    public UpdateBallPos()
    {
        this.ballSpriteNode.position = new Vec3(0, 0, 0);
    }
    updateTextPosition()
    {
        // 获取目标节点的世界坐标
        const pos = new Vec3(this.ballSpriteNode.position.x, this.ballSpriteNode.position.y + 30, 0);
        // 将目标节点的世界坐标转换为文本节点的局部坐标
        // 更新文本节点的位置
        this.tipLabel.node.setPosition(pos);
    }

}




