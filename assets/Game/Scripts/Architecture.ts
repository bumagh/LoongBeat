import { _decorator, assetManager, CCString, Component, director } from 'cc';
import { Debug } from '../../Library/Debug';

const { ccclass, property, executionOrder } = _decorator;

@ccclass('Architecture')
@executionOrder(-999)
export class Architecture extends Component
{
    public static instance: Architecture;
    @property([CCString])
    private consoleIgnores: string[] = [];
    protected onLoad(): void
    {
        Architecture.instance = this;
        Debug.SetIgnores(this.consoleIgnores);
    }
    protected onDestroy(): void
    {

    }

    protected start(): void
    {
    }

}